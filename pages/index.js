import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { HeartIcon, UserIcon } from "../src/assets/icons";
import { getProducts } from "./api/products";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";


const Home = () => {

  const [records,setRecords]= useState([])
  useEffect(()=>{
    fetch('http://localhost:3001/api/v1/products')
    .then(response => response.json())
    .then(data=> setRecords(data))
    .catch(err=> console.log(err))
  },[])
  // useEffect(() => {
  //   getProducts()
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // const homeSlider = [
  //   {
  //     name: "slide1",
  //     number: 1,
  //     image: "/assets/logo.png",
  //   },
  //   {
  //     name: "slide2",
  //     number: 2,
  //     image: "/assets/logo.png",
  //   },
  // ];
  return (
    <>
      <div>
        <ul>
          {records.map((list,index)=>(
            <li>{list.id}</li>
          ))}
        </ul>
      </div>
      {/* <Swiper
        // modules={[Navigation, Autoplay]}
        className="homePageSlider"
        navigation={homeSlider && homeSlider.length > 1 ? true : false}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        dir="ltr"
      >
        {homeSlider && homeSlider.length > 0 ? (
          homeSlider.map((slide, i) => {
            return (
              <SwiperSlide
                key={i}
                // style={{ backgroundImage: `url(${slide.image})` }}
              >
                <img src={slide.image} />
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide className="bg-dark"></SwiperSlide>
        )}
      </Swiper> */}
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout title="home">{page}</Layout>;
};

export default Home;
