import Layout from "../components/Layout";
import { ArrowIcon } from "../src/assets/icons";

// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  Keyboard,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { getProducts, getBrands, getBiddings } from "./api/products";
import { getCategories } from "./api/categories";
import { useEffect, useState } from "react";
import { image_url } from "../config/config";
import Image from "next/image";
import Link from "next/link";

export const getServerSideProps = async () => {
  let products = (await getProducts(2))?.data?.data?.data ?? [];
  let categories = (await getCategories())?.data?.data?.data ?? [];
  let brands = (await getBrands())?.data?.data?.data ?? [];
  // let bestSellers = (await getBestSellers())?.data?.data?.data ?? [];
  // let bigDeals = (await getBigDeals())?.data?.data?.data ?? [];
  let bestSellers = [];
  let bigDeals = [];

  return {
    props: { products, categories, brands, bestSellers, bigDeals },
  };
};
const Home = ({ products, categories, brands, bestSellers, bigDeals }) => {
  const [biddings, setBiddings] = useState([]);

  useEffect(() => {
    // getBiddings()
    //   .then((response) => {
    //     setBiddings(response?.data?.data?.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);
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
          <SwiperSlide key={item.id} className="slide">
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
            <div className="biddings">
              {biddings.map((item) => (
                <div className="bidding-card" key={item.id}>
                  <p className="bidding-name">{item.name}</p>
                  <Image
                    src={image_url + item.image}
                    width={150}
                    height={150}
                    alt="bidding product"
                  />
                </div>
              ))}
            </div>
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
          </div>
        </div>
      )}

      {bigDeals.length > 0 && (
        <div className="d-flex justify-content-center">
          <div className="mainContainer">
            <h3 className="heading-text">Big Deals</h3>
          </div>
        </div>
      )}

      <div className="firstOrder d-flex justify-content-center py-4 mb-3">
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
      </div>
    </main>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
