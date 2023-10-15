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
import Tab from "../../src/sharedui/Tab";
import AddRate from "../../src/sharedui/AddRate";
import { getRatingReviews } from "../api/reviews";
import CustomModal from "../../src/sharedui/modal";
import { savedToken } from "../../config/http";

const Product = () => {
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
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
  const [rating, setRating] = useState(0);
  const [ratingReviews, setRatingReviews] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      getProduct(id)
        .then((response) => {
          // extracting data and setting variant
          const data = response.data.data.data;

          setProduct(data);
          setSelectedVariant(data.variants[0]);

          // setting price
          if (data.variants[0]?.extraPrice) {
            setPrice(data.price + data.variants[0]?.extraPrice);
            if (data?.priceDiscount?.type == "fixed")
              setTotalPrice(
                data.price +
                  data.variants[0]?.extraPrice -
                  data?.priceDiscount?.value
              );
            else
              setTotalPrice(
                data.price +
                  data.variants[0]?.extraPrice -
                  (data?.priceDiscount?.value *
                    (data.price + data.variants[0]?.extraPrice)) /
                    100
              );
          } else {
            setPrice(data.price);
            setTotalPrice(data.price);
          }

          // setting color
          setSelectedColor(data.variants[0]?.color);
          setColors(data?.variants?.map((variant) => variant?.color));

          //  setting image
          setSelectedImg(image_url + data.variants[0]?.imageCover);
          let images = [];
          if (data?.variants[0]?.images)
            images = data?.variants[0]?.images?.map((image) => {
              return image_url + image;
            });
          setImages([image_url + data.variants[0]?.imageCover, ...images]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });

      // setRating review
      getRatingReviews(id)
        .then((res) => {
          const reviewData = res?.data?.data?.ratingReviews;
          let reviews = [];
          for (let i = 5; i > 0; i--) {
            const review = reviewData.filter(
              (review) => review.rating == i
            )?.[0];
            if (review)
              reviews.push({
                rate: i,
                quantity: review.nunmberOfRating,
              });
            else
              reviews.push({
                rate: i,
                quantity: 0,
              });
          }
          setRatingReviews(reviews);
        })
        .catch((error) => console.log(error));
    }

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
    setPrice(product.price + variant?.extraPrice);
    if (product?.priceDiscount?.type == "fixed")
      setTotalPrice(
        product.price + variant?.extraPrice - product?.priceDiscount?.value
      );
    else
      setTotalPrice(
        product.price +
          variant?.extraPrice -
          (product?.priceDiscount?.value *
            (product.price + variant?.extraPrice)) /
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

  const addToWishList = () => {
    if (!savedToken) setIsLoginModalOpen(true);
    else {
    }
  };
  const addToCart = () => {
    if (!savedToken) setIsLoginModalOpen(true);
    else {
    }
  };
  const addRate = () => {
    if (!savedToken) setIsLoginModalOpen(true);
    else {
    }
  };

  return (
    <>
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
                {product?.subCategory && (
                  <li className="breadcrumb-item ">
                    <Link
                      href={`/search?category=${product?.subCategory?.category?.id}&sub-category=${product?.subCategory?.id}`}
                      passHref
                    >
                      {product?.subCategory?.name}
                    </Link>
                  </li>
                )}

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
                    <span className="rate-average">
                      {" "}
                      {selectedVariant?.sku}
                    </span>
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
                  <button
                    className="btn--wishlist mb-5"
                    onClick={addToWishList}
                  >
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

                  <button className="btn--cart" onClick={addToCart}>
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
                      <pre className="rate-quantity">
                        {product?.description}
                      </pre>
                    ),
                  },
                  {
                    label: "reviews",
                    content: (
                      <section className="reviews-wrapper">
                        <article className="row preview">
                          <div className="col-12 col-sm-6">
                            <span className="rate-average">
                              {product?.ratingsAverage}
                            </span>
                            <span className="rate-quantity">
                              ({product?.ratingsQuantity} reviews)
                            </span>

                            <section>
                              {ratingReviews?.map((rateReview, index) => (
                                <div
                                  key={"review" + index}
                                  className="d-flex align-items-center"
                                >
                                  <Rating ratingsAverage={rateReview.rate} />
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      style={{
                                        width:
                                          (rateReview.quantity /
                                            product?.ratingsQuantity) *
                                            100 +
                                          "%",
                                      }}
                                    ></div>
                                  </div>
                                  {rateReview.quantity}
                                </div>
                              ))}
                            </section>
                          </div>
                          <div className="col-12 col-sm-6 mt-2 mt-md-0">
                            <p className="rate-average">
                              <b>Add Your Review</b>
                            </p>
                            <AddRate rating={rating} setRating={setRating} />
                            <button
                              className="btn--primary"
                              disabled={rating < 1}
                              onClick={addRate}
                            >
                              Add a Review
                            </button>
                          </div>
                        </article>

                        <hr className="mx-2" />
                        {product?.reviews.map((review) => (
                          <div
                            key={review._id}
                            className="d-flex align-items-center my-4 review"
                          >
                            <article className="me-2 d-flex flex-column align-items-center">
                              <img
                                src={image_url + review?.user?.image}
                                width={50}
                                height={50}
                                className=""
                              />
                              <p className="rate-average text-capitalize ">
                                {review?.user?.name}
                              </p>
                              <p className="rate-quantity">
                                {new Date(review?.updatedAt).toLocaleString(
                                  "en-US",
                                  dateOptions
                                )}
                              </p>
                            </article>
                            <div>
                              <Rating ratingsAverage={review.rating} />
                              <pre className="rate-quantity mt-2">
                                {review.review}
                              </pre>
                            </div>
                          </div>
                        ))}
                      </section>
                    ),
                  },
                ]}
              />
            </>
          )}
        </main>
      </div>
      <CustomModal
        isModalOpen={isLoginModalOpen}
        handleCancel={() => setIsLoginModalOpen(false)}
      >
        <p className="text-center my-5 modal-text">
          You are not login , Please Login
        </p>
        <Link href="/login" passHref>
          <button className="btn--cart w-100">LOGIN</button>
        </Link>
      </CustomModal>
    </>
  );
};
Product.getLayout = function getLayout(page) {
  return <Layout title="Product">{page}</Layout>;
};
export default Product;
