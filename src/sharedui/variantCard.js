import { image_url } from "../../config/config";
import { CartIcon } from "../assets/icons";
import Link from "next/link";
import { getVariantPrice } from "../utils/helpers/getVariantPrice";

const VariantCard = ({ product, variant }) => {
  const { totalPrice } = getVariantPrice(product, variant);

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
            <button className="btn--card">
              <CartIcon size={15} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VariantCard;
