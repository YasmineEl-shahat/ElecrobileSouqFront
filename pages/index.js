import Layout from "../components/Layout";
import { ArrowIcon } from "../src/assets/icons";

// import Swiper core and required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import {
  getProducts,
  getBrands,
  getBigDeals,
  getBestSellers,
} from "./api/products";
import { getCategories } from "./api/categories";
import { image_url } from "../config/config";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "../src/sharedui/productCard";
import VariantCard from "../src/sharedui/variantCard";
import { searchProduct } from "./api/search";

export const getServerSideProps = async () => {
  let products = (await getProducts(3))?.data?.data?.data ?? [];
  let categories = (await getCategories())?.data?.data?.data ?? [];
  let brands = (await getBrands())?.data?.data?.data ?? [];
  let bigDeals = (await getBigDeals(20))?.data?.data?.products ?? [];
  let bestSellers = (await getBestSellers(20))?.data?.data?.variants ?? [];
  let biddings =
    (
      await searchProduct({
        category: "6517dbc538001813b052bd73",
        isAction: true,
      })
    )?.data?.data?.data ?? [];

  const currentDate = new Date();
  const filteredBiddingProducts = biddings.filter((product) => {
    const endDate = new Date(product.endDate);
    return endDate > currentDate; // Filter products with endDate greater than current date
  });

  biddings = filteredBiddingProducts;
  return {
    props: { products, categories, brands, bestSellers, bigDeals, biddings },
  };
};
const Home = ({
  products,
  categories,
  brands,
  bestSellers,
  bigDeals,
  biddings,
}) => {
  return (
    <main>
      {/* top product swiper */}
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="top-swiper"
        spaceBetween={10}
        slidesPerView={1}
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="top-product-container pt-5 ">
              <section className="d-flex flex-column justify-content-center">
                <p className="top-product-name">
                  {item.name} <br />
                  coming soon
                </p>

                <button className="btn--cart">
                  <Link href={`/products/${item.id}`} passHref>
                    find out
                  </Link>
                </button>
              </section>
              <Image
                width={600}
                height={300}
                src={image_url + item?.variants?.[0]?.imageCover}
                alt="product"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* bidding products */}
      {biddings.length > 0 && (
        <div className="d-flex justify-content-center biddingContainer mb-4">
          <div className="mainContainer">
            <h3 className="heading-text">Bidding Products</h3>
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
              {biddings.map((item) => (
                <SwiperSlide key={item.id}>
                  <ProductCard product={item} isBidding={true} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* categories */}
      {categories.length > 0 && (
        <div className="categoriesContainer d-flex justify-content-center">
          <div className="mainContainer">
            <h3 className="heading-text">Categories</h3>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-md-3 g-4">
              {categories.map((item) => (
                <div key={item.id} className="col">
                  <div className="card">
                    <p className="category-name">{item.name}</p>
                    <Image
                      src={image_url + item.image}
                      width={150}
                      height={150}
                      alt="category-image"
                    />
                    <Link href={`/products?category=${item?.id}`} passHref>
                      <button>
                        <ArrowIcon className="arrow" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* brands */}
      {brands.length > 0 && (
        <div className="d-flex justify-content-center my-5">
          <section className="mainContainer">
            <h3 className="text-center mb-5 brand-heading">Popular Brands</h3>
            <div className="brands-container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
              {brands.map((item) => (
                <div className="col" key={item._id}>
                  <Link href={`/products?brand=${item._id}`} passHref>
                    <Image
                      src={image_url + item.image}
                      height={40}
                      width={100}
                      alt="brand"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {bestSellers?.length > 0 && (
        <div className="d-flex justify-content-center">
          <div className="mainContainer">
            <h3 className="heading-text">BestSellers</h3>
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
              {bestSellers?.map((item) => (
                <SwiperSlide key={item?.variant?._id}>
                  <VariantCard
                    product={item?.variant?.product}
                    variant={item?.variant}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {bigDeals.length > 0 && (
        <div className="d-flex justify-content-center">
          <div className="mainContainer">
            <h3 className="heading-text">Big Deals</h3>
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
              {bigDeals.map((item) => (
                <SwiperSlide key={item.id}>
                  <ProductCard product={item} isBigDeal={true} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* <div className="firstOrder d-flex justify-content-center py-4 mb-3">
        <div className="mainContainer d-flex justify-content-between flex-wrap align-items-center">
          <span>
            Subscribe to Our Newsletter - get a $20 Coupon for your first order!
          </span>
          <form className="email-form">
            <input
              type="email"
              className="text--global"
              placeholder="Enter your email address"
            ></input>
          </form>
        </div>
      </div> */}
    </main>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
