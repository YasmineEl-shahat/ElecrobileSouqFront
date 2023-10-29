import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getMyCart, updateCartItem } from "./api/cart";
import Image from "next/image";
import { image_url } from "../config/config";
import Link from "next/link";
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "../src/assets/icons";

export async function getServerSideProps() {
  return {
    props: {
      privateRoute: true,
    },
  };
}

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const getData = () => {
    getMyCart()
      .then((res) => {
        setCartItems(res?.data?.data?.cards);
        calculateTotal(res?.data?.data?.cards);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateTotal = (items) => {
    let totalPrice = 0;
    for (const item of items) {
      totalPrice += item.price;
    }
    setTotal(totalPrice);
  };

  const increaseQuantity = (id, quantity, variant_quantity) => {
    if (quantity < variant_quantity)
      updateCartItem(
        id,
        JSON.stringify({ quantity: quantity + 1 })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          })
      );
  };
  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1)
      updateCartItem(
        id,
        JSON.stringify({ quantity: quantity - 1 })
          .then((res) => {})
          .catch((error) => {
            console.log(error);
          })
      );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="d-flex justify-content-center">
      <div className="mainContainer my-5">
        {cartItems?.length > 0 ? (
          <>
            <h1 className="cart-header mb-4">Your Cart</h1>
            <div className="cart-container">
              <div className="main">
                {cartItems?.map((item) => (
                  <div key={item?._id} className="d-flex product-details ">
                    <article className="img-container">
                      <Image
                        src={image_url + item?.variant?.imageCover}
                        width={60}
                        height={60}
                        alt="variant"
                      />
                    </article>
                    <article className="d-flex justify-content-between w-100">
                      <div className="d-flex justify-content-between flex-column">
                        <section>
                          <Link
                            href={`/products/${item?.variant?.product?._id}`}
                            passHref
                          >
                            <h2>{item?.variant?.product?.name}</h2>
                          </Link>
                          <h6>color: {item?.variant?.color}</h6>
                        </section>
                        <h2>$ {item?.price}</h2>
                      </div>
                      <div className="d-flex justify-content-between flex-column align-items-end">
                        <button>
                          <TrashIcon className="text-danger" size={18} />
                        </button>
                        <section className="quantity-container rounded-pill">
                          <button
                            onClick={() =>
                              decreaseQuantity(item?._id, item?.quantity)
                            }
                            disabled={item?.quantity === 1}
                          >
                            <MinusIcon />
                          </button>
                          {item?.quantity}
                          <button
                            onClick={() =>
                              increaseQuantity(
                                item?._id,
                                item?.quantity,
                                item?.variant?.quantity
                              )
                            }
                            disabled={
                              item?.quantity === item?.variant?.quantity
                            }
                          >
                            <PlusIcon />
                          </button>
                        </section>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
              <div className="aside">
                <h1 className="cart-header mb-4">Order Summary</h1>
                <article className="d-flex justify-content-between">
                  <p>Total</p>
                  <h3>${total}</h3>
                </article>
                <Link href={""} passHref>
                  <button className="btn--cart">
                    Go to Checkout <ArrowRightIcon />
                  </button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </main>
  );
};

Cart.getLayout = function getLayout(page) {
  return <Layout title="Cart">{page}</Layout>;
};

export default Cart;
