import { image_url } from "../../config/config";
import { CartIcon } from "../assets/icons";
import Link from "next/link";
import { getTotalPrice } from "../utils/helpers/getTotalPrice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCartThunk } from "../redux/reducers/cartSlice";
import Image from "next/image";

const ProductCard = ({ product, isBigDeal, isBidding }) => {
  const { price, totalPrice } = getTotalPrice(product);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isInCart, setIsInCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  useEffect(() => {
    if (isAuthenticated)
      dispatch(getCartThunk())
        .then(() => {
          setIsInCart(
            cartItems.some(
              (card) => card?.variant?._id === product?.variants[0]?._id
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });

    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <Link href={`/products/${product?._id}`} passHref>
      <div className="col">
        <div className="card product-card">
          <p className="product-category">
            {product?.subCategory?.category?.name}
          </p>
          <p className={`product-name ${isBidding && "mb-0"}`}>
            {product?.name.substring(0, 20)}
            {product?.name?.length > 20 && "..."}
          </p>
          {isBidding && (
            <div className="d-flex justify-content-end mb-2">
              <span className="btn--cart btn--bidding px-3 py-2">
                Bidding{" "}
                <Image
                  src="/assets/icons/judge.svg"
                  width={10}
                  height={10}
                  alt="judge"
                />
              </span>
            </div>
          )}
          {/* eslint-disable */}
          <img
            src={image_url + product?.variants[0]?.imageCover}
            alt={product?.name}
            className={isBidding && "bid-image"}
          />
          <div className="d-flex justify-content-between align-items-center">
            {isBigDeal ? (
              <div>
                <h2 className="product-price deal-price">$ {totalPrice}</h2>
                <h6 className="product-price prev-deal-price">$ {price}</h6>
              </div>
            ) : isBidding ? (
              <div>
                <h2 className="product-price">$ {totalPrice}</h2>
                <h6 className="product-price bid-price">
                  ${" "}
                  {product?.variants[0]?.current_price
                    ? product?.variants[0]?.current_price
                    : product.price +
                      product?.variants[0]?.extraPrice +
                      product?.biddingGap}
                </h6>
              </div>
            ) : (
              <span className="product-price">${totalPrice}</span>
            )}

            <button
              className={isInCart ? "btn--card btn--incart" : "btn--card"}
            >
              <CartIcon size={15} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
