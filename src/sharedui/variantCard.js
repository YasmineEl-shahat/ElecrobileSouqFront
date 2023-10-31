import { image_url } from "../../config/config";
import { CartIcon } from "../assets/icons";
import Link from "next/link";
import { getVariantPrice } from "../utils/helpers/getVariantPrice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCartThunk } from "../redux/reducers/cartSlice";

const VariantCard = ({ product, variant }) => {
  const { totalPrice } = getVariantPrice(product, variant);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isInCart, setIsInCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (isAuthenticated)
      dispatch(getCartThunk())
        .then(() => {
          setIsInCart(
            cartItems.some((card) => card?.variant?._id === variant?._id)
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
          <p className="product-name">{product?.name}</p>
          {/* eslint-disable */}
          <img src={image_url + variant?.imageCover} alt={product?.name} />
          <div className="d-flex justify-content-between align-items-center">
            <span className="product-price">${totalPrice}</span>
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

export default VariantCard;
