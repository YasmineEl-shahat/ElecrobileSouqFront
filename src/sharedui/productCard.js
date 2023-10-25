import { image_url } from "../../config/config";
import { CartIcon } from "../assets/icons";
import Link from "next/link";

const ProductCard = ({ product }) => {
  // setting price
  let totalPrice = product?.price;
  if (product?.variants[0]?.extraPrice) {
    if (product?.priceDiscount?.type == "fixed")
      totalPrice =
        product?.price +
        product?.variants[0]?.extraPrice -
        product?.priceDiscount?.value;
    else
      totalPrice =
        product?.price +
        product?.variants[0]?.extraPrice -
        (product?.priceDiscount?.value *
          (product.price + product.variants[0]?.extraPrice)) /
          100;
  } else totalPrice = product?.price;

  return (
    <Link href={`/products/${product?._id}`} passHref>
      <div className="col">
        <div className="card product-card">
          <p className="product-category">
            {product?.subCategory?.category?.name}
          </p>
          <p className="product-name">{product?.name}</p>
          {/* eslint-disable */}
          <img
            src={image_url + product?.variants[0]?.imageCover}
            alt={product?.name}
          />
          <div className="d-flex justify-content-between align-items-center">
            <span className="product-price">${totalPrice}</span>
            <button className="btn--card">
              <CartIcon size={15} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
