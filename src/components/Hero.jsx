import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { assets } from "../assets/assets";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const slideList = [
  {
    title: "Massive Discount",
    subtitle: "Get up to 50% off on all luxury watches!",
    image: assets.hero_img2,
    link: "/all-collection",
    buttonText: "Shop Now",
  },
  {
    title: "Men's Collection",
    subtitle: "Exclusive styles for modern gentlemen.",
    image: assets.hero_img5,
    link: "/gender/men",
    buttonText: "Shop Men's",
  },
  {
    title: "Women's Collection",
    subtitle: "Elegant timepieces for sophisticated women.",
    image: assets.hero_img6,
    link: "/gender/women",
    buttonText: "Shop Women's",
  },
];


const Hero = () => {
  // Create references for navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          // Assign buttons after Swiper is initialized
          setTimeout(() => {
            if (swiper?.params?.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
        className="relative w-full sm:h-screen h-[400px] overflow-hidden"
      >
        {slideList.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
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
                className="mt-4 bg-gold bg-[#cba135] text-black font-semibold px-6 py-3 rounded-full transition animate-bounce"
              >
                {slide.buttonText}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Left Navigation Arrow */}
      <button
        ref={prevRef}
        className="absolute text-xl z-30 text-white bg-black/50 shadow-lg p-2 rounded-full left-4 top-1/2 transform -translate-y-1/2 hover:bg-black/80 transition"
      >
        <IoIosArrowBack />
      </button>

      {/* Right Navigation Arrow */}
      <button
        ref={nextRef}
        className="absolute text-xl z-30 text-white bg-black/50 shadow-lg p-2 rounded-full right-4 top-1/2 transform -translate-y-1/2 hover:bg-black/80 transition"
      >
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