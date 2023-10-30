import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { deleteCartItem, getMyCart, updateCartItem } from "./api/cart";
import Image from "next/image";
import { image_url } from "../config/config";
import Link from "next/link";
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "../src/assets/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getCheckout } from "./api/payment";

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
  const router = useRouter();
  const { payment_error } = router.query;

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

  const updateDate = (res, id) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: res?.data?.data?.card?.quantity,
            price: res.data?.data?.card?.price,
          }
        : item
    );
    setCartItems(updatedCartItems);
    calculateTotal(updatedCartItems);
  };
  const increaseQuantity = (id, quantity, variant_quantity) => {
    if (quantity < variant_quantity)
      updateCartItem(id, JSON.stringify({ quantity: quantity + 1 }))
        .then((res) => updateDate(res, id))
        .catch((error) => {
          console.log(error);
          toast.error("failed to increase");
        });
  };
  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1)
      updateCartItem(id, JSON.stringify({ quantity: quantity - 1 }))
        .then((res) => updateDate(res, id))
        .catch((error) => {
          console.log(error);
          toast.error("failed to decrease");
        });
  };

  const handleDelete = (id) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCartItems);
    calculateTotal(updatedCartItems);
    deleteCartItem(id)
      .then(() => toast.success("item deleted successfully"))
      .catch((error) => {
        console.log(error);
        toast.error("failed to delete item");
      });
  };

  const checkOut = () => {
    getCheckout(JSON.stringify({ cards: cartItems?.map((item) => item?._id) }))
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Checkout failed");
      });
  };
  useEffect(() => {
    if (payment_error) {
      toast.error("payment failed");
      setTimeout(() => {
        router.push("cart");
      }, 2000);
    }
    getData();
    // eslint-disable-next-line
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
                  <div key={item?._id} className="d-flex product-details">
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
                        <button onClick={() => handleDelete(item?._id)}>
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

                <button className="btn--cart" onClick={checkOut}>
                  Go to Checkout <ArrowRightIcon />
                </button>
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
