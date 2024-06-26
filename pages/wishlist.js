import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getMyCart, postCart } from "./api/cart";
import { deleteWishListItem, getMyWishList } from "./api/wishlist";
import Image from "next/image";
import { image_url } from "../config/config";
import Link from "next/link";
import { toast } from "react-toastify";
import { getProduct } from "./api/products";
import Rating from "../src/sharedui/Rating";
import { CartIcon, TrashIcon } from "../src/assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItemThunk,
  calculateTotal,
  getCartThunk,
} from "../src/redux/reducers/cartSlice";
import Spinner from "../components/Spinner";

export async function getServerSideProps() {
  return {
    props: {
      privateRoute: true,
    },
  };
}

const Wishlist = () => {
  const dispatch = useDispatch();
  const [wishListItems, setWishListItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // const cartItems = useSelector((state) => state.cart.cart);

  const getData = () => {
    getMyCart()
      .then((res) => {
        const cart = res?.data?.data?.cards;
        getMyWishList()
          .then(async (res) => {
            const wishList = res?.data?.data?.favorites;

            const updatedWishList = await Promise.all(
              wishList.map(async (item) => {
                const isInCart = cart?.some(
                  (card) => card?.variant?.product?._id === item?.product?._id
                );

                const productId = item?.product?._id;
                const variant = productId
                  ? (await getProduct(productId))?.data?.data?.data?.variants[0]
                  : null;

                return {
                  ...item,
                  variant,
                  isInCart,
                };
              })
            );
            setWishListItems(updatedWishList);
            setLoading(false);
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message);
          });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };
  const handleDelete = (id) => {
    const updatedWishListItems = wishListItems.filter(
      (item) => item._id !== id
    );
    setWishListItems(updatedWishListItems);
    deleteWishListItem(id)
      .then(() => toast.success("item deleted successfully"))
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const addToCartHandler = (item) => {
    // Prepare the data for adding to cart
    const cartItemData = {
      variant: item.variant._id,
      quantity: 1,
    };

    // updateWishlist
    const updatedWishList = wishListItems.map((wish) =>
      wish.variant?._id === item.variant._id
        ? { ...wish, isInCart: true }
        : wish
    );
    setWishListItems(updatedWishList);

    dispatch(addCartItemThunk(cartItemData))
      .then(() => toast.success("Item added to cart successfully"))
      .then(() => dispatch(getCartThunk()))
      .then(() => dispatch(calculateTotal()))
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <main className="d-flex justify-content-center wish">
      {loading ? (
        <Spinner />
      ) : (
        <div className="mainContainer my-5">
          {wishListItems?.length > 0 ? (
            <div className="wish-wrapper">
              <h1 className="cart-header mb-4">Wishlist</h1>
              {wishListItems?.map((item) => (
                <div
                  key={item._id}
                  className="wishlist-container mb-5 d-flex align-items-center"
                >
                  <Image
                    src={image_url + item?.variant?.imageCover}
                    alt={item?.product?.name}
                    width={140}
                    height={140}
                  />
                  <div className=" details-wrapper w-100">
                    <div className="product-details">
                      <h6 className="mb-3">
                        {item?.product?.subCategory?.category && (
                          <span>
                            {item?.product?.subCategory?.category?.name},
                          </span>
                        )}
                        <span> {item?.product?.subCategory?.name}</span>
                      </h6>
                      <Link href={`/products/${item?.product?._id}`} passHref>
                        <h2 className="mb-3">
                          {item?.product?.name.substring(0, 20)}
                          {item?.product?.name?.length > 20 && "..."}
                        </h2>
                      </Link>

                      <article className="d-flex align-items-center">
                        <Rating
                          ratingsAverage={item?.product?.ratingsAverage}
                        />
                        <span className="rate-average">
                          {item?.product?.ratingsAverage}
                        </span>
                        <span className="rate-quantity">
                          ({item?.product?.ratingsQuantity})
                        </span>
                      </article>
                      <pre className="my-4 rate-quantity">
                        {item?.product?.description?.substring(0, 100)}
                        {item?.product?.description?.length > 100 && "..."}
                      </pre>
                    </div>
                    <div className="d-flex justify-content-between flex-column align-items-end">
                      <button onClick={() => handleDelete(item._id)}>
                        <TrashIcon
                          className="text-danger btn--trash"
                          size={18}
                        />
                      </button>
                      <button
                        onClick={() => addToCartHandler(item)}
                        className="btn--cart d-flex align-items-center"
                        disabled={item?.isInCart}
                      >
                        {item?.isInCart ? "In Cart " : "Add to Cart "}{" "}
                        <CartIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Your wishlist is empty</p>
          )}
        </div>
      )}
    </main>
  );
};

Wishlist.getLayout = function getLayout(page) {
  return <Layout title="Wishlist">{page}</Layout>;
};

export default Wishlist;
