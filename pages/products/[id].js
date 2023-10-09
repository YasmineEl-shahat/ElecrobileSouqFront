import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { getProduct } from "../api/products";
import Layout from "../../components/Layout";
import { image_url } from "../../config/config";
import Rating from "../../src/sharedui/Rating";
import {
  CartIcon,
  CheckIcon,
  FilledHeartIcon,
  MinusIcon,
  PlusIcon,
} from "../../src/assets/icons";
import Image from "next/image";
import Tab from "../../src/sharedui/Tab";

const Product = () => {
  const router = useRouter();
  const { id, activeTab } = router.query;

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState("");
  const [images, setImages] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [colors, setColors] = useState([]);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id !== undefined)
      getProduct(id)
        .then((response) => {
          // extracting data and setting variant
          const data = response.data.data.data;
          console.log(data);
          setProduct(data);
          setSelectedVariant(data.variants[0]);

          // setting price
          setPrice(data.price + data.variants[0].extraPrice);
          if (data?.priceDiscount?.type == "fixed")
            setTotalPrice(
              data.price +
                data.variants[0].extraPrice -
                data?.priceDiscount?.value
            );
          else
            setTotalPrice(
              data.price +
                data.variants[0].extraPrice -
                (data?.priceDiscount?.value *
                  (data.price + data.variants[0].extraPrice)) /
                  100
            );

          // setting color
          setSelectedColor(data.variants[0].color);
          setColors(data.variants.map((variant) => variant.color));

          //  setting image
          setSelectedImg(image_url + data.variants[0].imageCover);
          const images = data.variants[0].images.map((image) => {
            return image_url + image;
          });
          setImages([image_url + data.variants[0].imageCover, ...images]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    // eslint-disable-next-line
  }, [id]);

  const changeColor = (color) => {
    // color
    setSelectedColor(color);

    // quantity
    setQuantity(1);

    // variant
    const variant = product.variants.find((variant) => variant.color === color);
    setSelectedVariant(variant);

    // images
    setSelectedImg(image_url + variant.imageCover);
    const images = variant.images.map((image) => {
      return image_url + image;
    });
    setImages([image_url + variant.imageCover, ...images]);

    // price
    setPrice(product.price + variant.extraPrice);
    if (product?.priceDiscount?.type == "fixed")
      setTotalPrice(
        product.price + variant.extraPrice - product?.priceDiscount?.value
      );
    else
      setTotalPrice(
        product.price +
          variant.extraPrice -
          (product?.priceDiscount?.value *
            (product.price + variant.extraPrice)) /
            100
      );
  };
  const changeImg = (e) => {
    let mainContainer = document.getElementsByClassName("iiz__img")[0];
    mainContainer.src = e.target.src;
    setSelectedImg(e.target.src);
  };
  const changeZoom = () => {
    let src = document.getElementsByClassName("iiz__img")[0].src;
    let mainContainer = document.getElementsByClassName("iiz__zoom-img")[0];
    mainContainer.src = src;
  };

  const increaseQuantity = () => {
    if (quantity < selectedVariant?.quantity) setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  return (
    <div className="d-flex justify-content-center mb-5">
      <main className="mainContainer">
        {!loading && (
          <>
            {/* sub header */}
            <ol className="breadcrumb my-5">
              {product?.subCategory?.category && (
                <li className="breadcrumb-item">
                  <Link
                    href={`/search?category=${product?.subCategory?.category?.id}`}
                    passHref
                  >
                    {product?.subCategory?.category?.name}
                  </Link>
                </li>
              )}
              <li className="breadcrumb-item ">
                <Link
                  href={`/search?category=${product?.subCategory?.category?.id}&sub-category=${product?.subCategory?.id}`}
                  passHref
                >
                  {product?.subCategory?.name}
                </Link>
              </li>
              <li className="breadcrumb-item active">{product?.name}</li>
            </ol>

            {/* Product Details */}
            <section className="product-choose-wrapper">
              <div>
                <InnerImageZoom
                  afterZoomIn={() => {
                    changeZoom();
                  }}
                  src={`${images?.[0]}`}
                  zoomSrc={`${images?.[0]}`}
                  alt="prod"
                  zoomType="click"
                  zoomScale={1.5}
                  width={410}
                  height={500}
                />
                <section className="product-choose">
                  {/* eslint-disable */}
                  {images?.map((image, index) => (
                    <img
                      key={`image ${index}`}
                      onClick={(e) => {
                        changeImg(e);
                      }}
                      src={image}
                      alt="product image"
                      className={image == selectedImg && "selected"}
                    />
                  ))}
                </section>
              </div>

              <div className="product-details">
                <h6 className="mb-5">
                  {product?.subCategory?.category && (
                    <span>{product?.subCategory?.category?.name},</span>
                  )}
                  <span> {product?.subCategory?.name}</span>
                </h6>
                <h2 className="mb-5">{product?.name}</h2>
                <article className="d-flex align-items-center">
                  <Rating ratingsAverage={product?.ratingsAverage} />
                  <span className="rate-average">
                    {product?.ratingsAverage}
                  </span>
                  <span className="rate-quantity">
                    ({product?.ratingsQuantity})
                  </span>
                </article>
                <pre className="my-4 rate-quantity">
                  {product?.description?.substring(0, 100)}
                  {product?.description?.length > 100 && "..."}
                </pre>

                <h5 className="mb-4">
                  <span className="rate-quantity">SKU : </span>
                  <span className="rate-average"> {selectedVariant?.sku}</span>
                </h5>

                <h5 className="mb-4 rate-average mx-0">
                  <b>Brand</b>
                </h5>

                <img
                  width={100}
                  height={70}
                  className="brand mb-5"
                  alt="brand"
                  src={image_url + product?.brand?.image}
                />

                {colors?.length > 0 && (
                  <>
                    <h5 className="mb-4 rate-average mx-0">
                      <b>Colors</b>
                    </h5>
                    <article className="d-flex">
                      {colors.map((color) => (
                        <div
                          className="color"
                          key={color}
                          style={{ background: color }}
                          onClick={() => changeColor(color)}
                        >
                          {color == selectedColor && (
                            <CheckIcon
                              size={20}
                              style={{
                                color: color != "white" && "white",
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </article>
                  </>
                )}
              </div>

              <div className="p-4">
                <button className="btn--wishlist mb-5">
                  Wishlist <FilledHeartIcon />
                </button>
                {price !== totalPrice && (
                  <h1 className="price prev-price">$ {price}</h1>
                )}
                <h1 className="price total-price ">$ {totalPrice}</h1>

                <section className="quantity-container my-4">
                  <button
                    onClick={() => decreaseQuantity()}
                    disabled={quantity === 1}
                  >
                    <MinusIcon />
                  </button>
                  {quantity}
                  <button
                    onClick={() => increaseQuantity()}
                    disabled={quantity === selectedVariant?.quantity}
                  >
                    <PlusIcon />
                  </button>
                </section>

                <button className="btn--cart">
                  Add to Cart <CartIcon />
                </button>
              </div>
            </section>

            {/* description and reviews */}
            <Tab
              propActiveTab={activeTab}
              id={id}
              tabs={[
                {
                  label: "description",
                  content: (
                    <pre className="rate-quantity">{product?.description}</pre>
                  ),
                },
                {
                  label: "reviews",
                  content: <pre className="rate-quantity">reviews</pre>,
                },
              ]}
            />
          </>
        )}
      </main>
    </div>
  );
};
Product.getLayout = function getLayout(page) {
  return <Layout title="Product">{page}</Layout>;
};
export default Product;
