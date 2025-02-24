import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { assets } from "../assets/assets";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css'; 


const slideList = [
  {
    title: "Massive Discount",
    subtitle: "Get up to 20% off on all luxury watches!",
    image: 'https://images.unsplash.com/photo-1486490686828-196042a38646?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: "/all-collection",
    buttonText: "Shop Now",
  },
  {
    title: "Men's Collection",
    subtitle: "Exclusive styles for modern gentlemen.",
    image: 'https://images.unsplash.com/photo-1482954363933-4bed6bbea570?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: "/gender/men",
    buttonText: "Shop Men's",
  },
  {
    title: "Women's Collection",
    subtitle: "Elegant timepieces for sophisticated women.",
    image: 'https://images.unsplash.com/photo-1451477334999-a9321157a431?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: "/gender/women",
    buttonText: "Shop Women's",
  },
];

const Hero = () => {
  return (
    <div className="relative w-full sm:h-[80vh] h-[400px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        className="relative w-full h-full overflow-hidden"
      >
        {slideList.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full flex animate-fade-in">
            {/* Background Image */}
            <LazyLoadImage
              src={slide.image}
              alt={slide.title}
              effect="blur"
              className=" h-[80vh] w-screen object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 sm:px-12">
              <h2 className="text-3xl sm:text-5xl font-bold animate-fade-in">
                {slide.title}
              </h2>
              <p className="text-lg sm:text-xl mt-2 animate-slide-up">
                {slide.subtitle}
              </p>
              <Link
                to={slide.link}
                className="mt-4 bg-[#cba135] text-white text-sm font-semibold px-6 py-3 rounded transition hover:scale-110 hover:shadow-lg "
              >
                {slide.buttonText}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Left Navigation Arrow */}
      <button className="custom-prev sm:block hidden  absolute text-xl z-30 text-white bg-black/50 shadow-lg p-2 rounded-full left-4 sm:top-1/2 top-[60%] transform -translate-y-1/2 hover:bg-black/80 transition">
        <IoIosArrowBack />
      </button>

      {/* Right Navigation Arrow */}
      <button className="custom-next sm:block hidden  absolute text-xl z-30 text-white bg-black/50 shadow-lg p-2 rounded-full right-4 sm:top-1/2 top-[60%] transform -translate-y-1/2 hover:bg-black/80 transition">
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Hero;



 {/* <SwiperSlide className="relative">
          <img src={assets.hero_img5} alt="Slide 1" className="w-full h-full object-cover" />
          <div className="absolute top-[50%] translate-y-[-50%] left-14  bg-black bg-opacity-30 text-white p-4 rounded-lg">
            <h1 className=' text-6xl font-semibold'>SUMMER SALE</h1>
            <h2 className="text-xl font-semibold tracking-wider mb-7">Massive Discount</h2>
            <button className='text-lg py-2 px-5 bg-[red]'>Discover Now !</button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <img src={assets.rolex_yatch_master_1} alt="Slide 2" className="w-full h-full object-cover" />
          <div className="absolute top-[50%] translate-y-[-50%] left-14   bg-black bg-opacity-30 text-white p-4 rounded-lg">
            <h3 className='text-sm font-semibold italic mb-3'>NEW COLLECTION</h3>
            <h2 className="text-3xl font-semibold tracking-tight">upto 70% OFF</h2>
            <h1 className='tracking-wider text-6xl font-semibold mb-7'>BIGGEST SALE</h1>
            <button className='text-lg py-2 px-5 bg-[red]'>Discover Now !</button>
          </div>
        </SwiperSlide> */}