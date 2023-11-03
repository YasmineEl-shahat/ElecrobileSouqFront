import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { getProduct } from "../api/products";
import { addReview, getRatingReviews } from "../api/reviews";
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
import CustomModal from "../../src/sharedui/modal";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../../src/utils/helpers/getTotalPrice";
import { toast } from "react-toastify";
import { getMyCart, postCart } from "../api/cart";
import { getMyWishList, postWishList } from "../api/wishlist";
import ProductCard from "../../src/sharedui/productCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import Swiper core and required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { getSubCategoryProducts } from "../api/sub-categories";
import Image from "next/image";
import { updateFormattedBiddingTime } from "../../src/utils/helpers/updateFormattedBiddingTime";
import { postBidding } from "../api/bidding";
import { channel } from "../api/pusher";

export const getServerSideProps = async ({ query }) => {
  const { id } = query;
  let product = (await getProduct(id))?.data?.data?.data ?? {};

  let similarProducts =
    (await getSubCategoryProducts(product?.subCategory?._id, 20))?.data?.data
      ?.data ?? [];

  // setting price
  const { price: priceProb, totalPrice: totalPriceProb } =
    getTotalPrice(product);

  //  setting image
  let images = [];
  if (product?.variants[0]?.images)
    images = product?.variants[0]?.images?.map((image) => {
      return image_url + image;
    });
  let imagesProp = [image_url + product?.variants[0]?.imageCover, ...images];

  let colors = product?.variants?.map((variant) => variant?.color) ?? [];

  // setRating review
  let reviewData =
    (await getRatingReviews(id))?.data?.data?.ratingReviews ?? [];
  let reviews = [];
  for (let i = 5; i > 0; i--) {
    const review = reviewData.filter((review) => review.rating == i)?.[0];
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

  // set bidding data
  const currentDate = new Date();
  const isBidding =
    product?.isAction && new Date(product?.endDate) > currentDate;
  let endTimeProp = isBidding && updateFormattedBiddingTime(product?.endDate);

  return {
    props: {
      product,
      priceProb,
      totalPriceProb,
      imagesProp,
      colors,
      reviews,
      similarProducts,
      isBidding,
      endTimeProp,
    },
  };
};
const Product = ({
  product,
  priceProb,
  totalPriceProb,
  imagesProp,
  colors,
  reviews,
  similarProducts,
  isBidding,
  endTimeProp,
}) => {
  // --------------------------- state and vars -------------------------------------
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const router = useRouter();
  const { id, activeTab } = router.query;

  const user = useSelector((state) => state.auth.user);

  const [productReviews, setProductReviews] = useState(product?.reviews);

  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants[0] ?? null
  );
  const [price, setPrice] = useState(priceProb ?? 0);
  const [totalPrice, setTotalPrice] = useState(totalPriceProb ?? 0);

  const [selectedColor, setSelectedColor] = useState(
    product?.variants[0]?.color ?? null
  );
  const [images, setImages] = useState(imagesProp ?? []);
  const [selectedImg, setSelectedImg] = useState(
    image_url + product?.variants[0]?.imageCover ?? ""
  );

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isBiddingModalOpen, setIsBiddingModalOpen] = useState(false);

  const [isInCart, setIsInCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [isInWishList, setIsInWishList] = useState(false);
  const [wishList, setWishList] = useState([]);

  const [endTime, setEndTime] = useState(endTimeProp);
  const [bidAmount, setBidAmount] = useState(
    endTimeProp
      ? product?.variants[0]?.current_price
        ? product?.variants[0]?.current_price
        : product.price + product?.variants[0]?.extraPrice + product?.biddingGap
      : null
  );
  const [bidError, setBidError] = useState("");

  // --------------------------- handlers ------------------------------------------
  const changeColor = (color) => {
    // color
    setSelectedColor(color);

    // quantity
    setQuantity(1);

    // variant
    const variant = product.variants.find((variant) => variant.color === color);
    setSelectedVariant(variant);

    if (endTime) {
      setBidAmount(
        variant?.current_price
          ? variant?.current_price
          : product.price + variant?.extraPrice + product?.biddingGap
      );
    }
    getMyCart()
      .then((res) => {
        setCart(res?.data?.data?.cards);
        setIsInCart(
          res?.data?.data?.cards?.some(
            (card) => card?.variant?._id === variant?._id
          )
        );
      })
      .catch((error) => {});

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
    if (!isAuthenticated) setIsLoginModalOpen(true);
    else
      postWishList(
        JSON.stringify({
          product: product?._id,
        })
      )
        .then((res) => {
          setIsInWishList(true);
          // setWishList([res?.data?.data?.data, ...wishList]);
          toast.success("added to wishlist successfully");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
  };
  const addToCart = () => {
    if (!isAuthenticated) setIsLoginModalOpen(true);
    else
      postCart(
        JSON.stringify({
          variant: selectedVariant?._id,
          quantity,
        })
      )
        .then((res) => {
          setIsInCart(true);
          setCart([res?.data?.data?.data, ...cart]);
          toast.success("added to cart successfully");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
  };
  const bidHandler = () => {
    if (!isAuthenticated) setIsLoginModalOpen(true);
    else setIsBiddingModalOpen(true);
  };
  const addRate = () => {
    if (!isAuthenticated) setIsLoginModalOpen(true);
    else setIsReviewModalOpen(true);
  };

  const confirmReview = () => {
    const data = {
      rating,
      product: id,
      user: user.id,
      review: document.getElementById("reviewText").value,
    };
    addReview(JSON.stringify(data))
      .then((res) => {
        toast.success("review added successfully");
        setIsReviewModalOpen(false);
        setProductReviews([
          { ...res?.data?.data?.data, user: { image: user?.image } },
          ...productReviews,
        ]);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const confirmBidding = () => {
    const amount = document.getElementById("bidText").value;
    const data = {
      variant: selectedVariant?._id,
      amount,
    };
    postBidding(JSON.stringify(data))
      .then((res) => {
        toast.success("Bid amount added successfully");
        setIsBiddingModalOpen(false);
        channel.bind("current_price", (data) => {
          try {
            console.log("Received pusher response data:", data);
            setBidAmount(data?.current_price);
          } catch (error) {
            console.error("Error:", error);
          }
        });
      })
      .catch((error) => {
        setBidError(error?.response?.data?.message);
      });
  };
  const inCart = (variant_id) => {
    return cart?.some((card) => card?.variant?._id === variant_id);
  };
  // ------------------------------------------use effect -----------------------------------
  useEffect(() => {
    if (isAuthenticated) {
      getMyCart()
        .then((res) => {
          setCart(res?.data?.data?.cards);
          setIsInCart(
            res?.data?.data?.cards?.some(
              (card) => card?.variant?._id === selectedVariant?._id
            )
          );
        })
        .catch((error) => {});
      getMyWishList()
        .then((res) => {
          setWishList(res?.data?.data?.favorites);
          setIsInWishList(
            res?.data?.data?.favorites?.some(
              (wishlist) => wishlist?.product?._id === product?._id
            )
          );
        })
        .catch((error) => {});
    }
    let interval;
    if (endTimeProp) {
      let end = updateFormattedBiddingTime(product.endDate);
      setEndTime(end);
      interval = setInterval(() => {
        let end = updateFormattedBiddingTime(product.endDate, interval);
        setEndTime(end);
      }, interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    if (bidAmount) {
      channel.bind("current_price", (data) => {
        try {
          console.log("Received response data:", data?.current_price);
          setBidAmount(data?.current_price);
        } catch (error) {
          console.error("Error:", error);
        }
      });
    }

    return () => {
      channel.unbind("current_price");
    };
  }, [bidAmount]);

  return (
    <>
      <div className="d-flex justify-content-center mb-5">
        <main className="mainContainer">
          {/* sub header */}
          <ol className="breadcrumb my-5">
            {product?.subCategory?.category && (
              <li className="breadcrumb-item">
                <Link
                  href={`/products?category=${product?.subCategory?.category?.id}`}
                  passHref
                >
                  {product?.subCategory?.category?.name}
                </Link>
              </li>
            )}
            {product?.subCategory && (
              <li className="breadcrumb-item ">
                <Link
                  href={`/products?category=${product?.subCategory?.category?.id}&subCategory=${product?.subCategory?.id}`}
                  passHref
                >
                  {product?.subCategory?.name}
                </Link>
              </li>
            )}

            <li className="breadcrumb-item active">{product?.name}</li>
          </ol>
          {endTime && (
            <span className="btn--cart px-5 btn--bidding mb-3">
              Bidding{" "}
              <Image
                src="/assets/icons/judge.svg"
                width={20}
                height={20}
                alt="judge"
              />
            </span>
          )}
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
                <span className="rate-average">{product?.ratingsAverage}</span>
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
              <button
                className="btn--wishlist mb-5"
                onClick={addToWishList}
                disabled={isInWishList}
              >
                {isInWishList ? "In wishlist" : "Add to Wishlist"}{" "}
                <FilledHeartIcon />
              </button>
              {price !== totalPrice && (
                <h1 className="price prev-price">$ {price}</h1>
              )}
              <div className="d-flex justify-content-between">
                <h1 className="price total-price">$ {totalPrice} </h1>
                {endTime && (
                  <h1 className="price cart-header">
                    $ {bidAmount}{" "}
                    <Image
                      src="/assets/icons/judge.svg"
                      width={20}
                      height={20}
                      alt="judge"
                    />
                  </h1>
                )}
              </div>

              {!isInCart && !endTime && (
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
              )}
              {!endTime && (
                <button
                  className="btn--cart"
                  onClick={addToCart}
                  disabled={isInCart}
                >
                  {isInCart ? "In Cart" : "Add to Cart"} <CartIcon />
                </button>
              )}

              {endTime && (
                <>
                  <button
                    className="btn--cart btn--bidding my-4"
                    onClick={bidHandler}
                  >
                    Bid Now{" "}
                    <Image
                      src="/assets/icons/judge.svg"
                      width={20}
                      height={20}
                      alt="judge"
                    />
                  </button>
                  <h1 className="cart-header">{endTime}</h1>
                </>
              )}
            </div>
          </section>

          {similarProducts?.length > 0 && (
            <>
              <h3 className="heading-text">Similar Products</h3>
              <Swiper
                cssMode={true}
                navigation={true}
                pagination={{ clickable: true }}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="common-swiper mb-5"
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  1200: {
                    slidesPerView: 5,
                  },
                  1000: {
                    slidesPerView: 4,
                  },
                  800: {
                    slidesPerView: 3,
                  },
                  600: {
                    slidesPerView: 2,
                  },
                  300: {
                    slidesPerView: 1,
                  },
                }}
              >
                {similarProducts.map((item) => (
                  <SwiperSlide key={item.id}>
                    <ProductCard product={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}

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
                          {reviews?.map((rateReview, index) => (
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
                    {productReviews?.map((review) => (
                      <div
                        key={review?._id}
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
        </main>
      </div>
      {/* ------------------------------- login modal ------------------------------------ */}
      <CustomModal
        isModalOpen={isLoginModalOpen}
        handleCancel={() => setIsLoginModalOpen(false)}
      >
        <p className="text-center my-5 modal-text">
          You are not login , Please Login
        </p>
        <Link href="/auth/login" passHref>
          <button
            className="btn--cart w-100"
            onClick={() => setIsLoginModalOpen(false)}
          >
            LOGIN
          </button>
        </Link>
      </CustomModal>
      {/* ------------------------------- review modal ----------------------------------- */}
      <CustomModal
        isModalOpen={isReviewModalOpen}
        handleCancel={() => setIsReviewModalOpen(false)}
      >
        <p className="modal-text">Enter your review</p>
        <textarea
          className="text--global text--area text--secondary mb-3"
          id="reviewText"
          style={{ width: "280px" }}
        />
        <button className="btn--cart w-100" onClick={confirmReview}>
          Confirm review
        </button>
      </CustomModal>
      {/* ------------------------------- bidding modal ---------------------------------- */}

      <CustomModal
        isModalOpen={isBiddingModalOpen}
        handleCancel={() => setIsBiddingModalOpen(false)}
      >
        <p className="modal-text">Enter New Bid Amount</p>
        <input
          type="number"
          className="text--global text--secondary mb-3"
          id="bidText"
          min={product?.startBidding}
          style={{ width: "280px" }}
        />
        <h6 className="text-danger" style={{ width: "280px" }}>
          {bidError}
        </h6>
        <button className="btn--cart w-100" onClick={confirmBidding}>
          Bid Now
        </button>
      </CustomModal>
    </>
  );
};
Product.getLayout = function getLayout(page) {
  return <Layout title="Product">{page}</Layout>;
};
export default Product;
