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

import { api_url } from "../config/config";
import { httpJson } from "../config/http";
import {
  getProduct,
  getProducts,
  getBrands,
  getBiddings,
} from "./api/products";
import { getCategories, getCategory } from "./api/categories";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { image_url } from "../config/config";
import Image from "next/image";
const Home = () => {
  // const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [biddings, setBiddings] = useState([]);

  useEffect(() => {
    getProducts(2)
      .then((response) => {
        setProducts(response.data.data.data);
        console.log(response.data.data.data);
      })

      .catch((error) => {
        console.log(error);
      });
    getCategories()
      .then((res) => {
        setCategories(res.data.data.data);
        console.log(res.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getBrands()
      .then((result) => {
        setBrands(result.data.data.data);
        console.log(result.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {/* top product */}
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

                <button className="btn--cart">find out</button>
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

      <div className="biddingContainer">
        <div className="">
          <h3 className="orangeText">Bidding Products</h3>
          <div className="biddings">
            {biddings.map((item) => (
              <div className="bidding-card">
                <p className="bidding-name">{item.name}</p>
                <img
                  className="bidding-image"
                  src={image_url + item.image}
                  width={150}
                  height={150}
                  alt="hi"
                ></img>
                {/* <div ><ArrowIcon className="arrow"/> </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* categories */}
      <div className="head">
        <h3 className="orangeText">Categories</h3>
        <div className="categories-container">
          {categories.map((item) => (
            <div className="card">
              <p className="categories-name">{item.name}</p>
              <img
                className="categories-image"
                src={image_url + item.image}
                width={150}
                height={150}
                alt="hi"
              ></img>
              <div>
                <ArrowIcon className="arrow" />{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* brands */}
      <div className="">
        <h3 className="orangeText">Popular Brands</h3>
        <div className="brands-container">
          {brands.map((item) => (
            <div className="">
              <img
                className="brand"
                src={image_url + item.image}
                width={150}
                height={150}
                alt="hi"
              ></img>
            </div>
          ))}
        </div>
      </div>

      <div className="">
        <h3 className="orangeText">BestSellers</h3>
        <div className="brands-container">
          {/* {brands.map((item)=> (
       <div className="">
      
          <img
          className=""
          src={image_url+item.image}
          width={150}
          height={150}
          alt="hi"
          >
          </img >
          </div>
       
      ))} */}
        </div>
      </div>
      <div className="">
        <h3 className="orangeText">Big Deals</h3>
        <div className="brands-container">
          {/* {brands.map((item)=> (
       <div className="">
      
          <img
          className=""
          src={image_url+item.image}
          width={150}
          height={150}
          alt="hi"
          >
          </img >
          </div>
       
      ))} */}
        </div>
      </div>

      <div className="firstOrder">
        <span>
          Subscribe to Our Newsletter - get a $20 Coupon for your first order!
        </span>
        <span className="email">
          <input type="email" placeholder="enter your email"></input>
        </span>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout title="home">{page}</Layout>;
};

export default Home;
