
import Layout from "../components/Layout";
import { HeartIcon, UserIcon } from "../src/assets/icons";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { api_url } from "../config/config";
import { httpJson } from "../config/http";
import { getProduct, getProducts } from "./api/products";
import {getCategories,getCategory} from "./api/categories";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { image_url } from "../config/config";
const Home = () => {

 // const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  //const { limit } = router.query;
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
      .then((res)=>{
        setCategories(res.data.data.data);
        console.log(res.data.data.data);
      })
    },[]);
  return (
    <>

<Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      

    </Swiper>
    {/* top product */}
     <Swiper 
     spaceBetween={10}
     slidesPerView={1}
     onSlideChange={() => console.log('slide change')}
     onSwiper={(swiper) => console.log(swiper)}>
      {products.map((item)=> (
        <SwiperSlide
         key={item.id}
         className="">
          <p>{item.name}</p><br/>
          <img
          src={image_url+item.variants[0].imageCover}
          width={150}
          height={150}
          alt="hi"
          >

          </img>
        </SwiperSlide>
      ))}
     </Swiper>

{/* categories */}
<div className="head">
     <h3 className="orangeText">categories</h3>
     <div className="categories-container">
      {categories.map((item)=> (
       <div className="card">
       <p className="categories-name">{item.name}</p>
          <img
          src={image_url+item.image}
          width={100}
          height={100}
          alt="hi"
          >
          </img>
          <div> arrow</div>
          </div>
       
      ))}
     </div>
     </div>
      
      
      {/* <Swiper
        // modules={[Navigation, Autoplay]}
        className="homePageSlider"
        navigation={products && products > 1 ? true : false}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        dir="ltr"
      >
        {products && products.length > 0 ? (
          products.map((slide, i) => {
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
