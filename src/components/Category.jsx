import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CategorySection from './CategoryItem';
import { assets } from '../assets/assets';
import CategoryItem from './CategoryItem';

const Category = () => {

  const { category } = useContext(ShopContext)

  const categories = [
    {
      id: 1,
      title: "automatic",
      image: assets.rolex_yatch_master_1,
      link: "/automatic",
    },
    {
      id: 4,
      title: "Luxury",
      image: assets.rolex_yatch_master_1,
      link: "/luxury",
    },
    {
      id: 6,
      title: "Leather",
      image: assets.rolex_yatch_master_1,
      link: "/leather",
    },
    {
      id: 6,
      title: "Sports",
      image: assets.rolex_yatch_master_1,
      link: "/sports",
    },
  ];

  return (
    <div className="py-12">
      <div className="relative group">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          breakpoints={{
            320: { slidesPerView: 3 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 7 },
          }}
          slidesPerView={7}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          autoplay={{ delay: 2000 }}
        >
          {
            categories.map((category, index) => (
              <SwiperSlide key={index}>
                <CategoryItem categoryImg={category.image} categoryName={category.title} key={index} />
              </SwiperSlide>
            ))
          }

          {/* Custom Navigation Buttons */}
        </Swiper>
        <div className="custom-prev custom-prev  transition-opacity duration-300 ease-in-out">
          <button className="absolute text-xl z-30  text-[#cba135]  p-[2px] rounded-full -left-3 top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowBack />
          </button>
        </div>
        <div className=" custom-next custom-prev transition-opacity duration-300 ease-in-out">
          <button className="absolute text-xl z-30  p-[2px] rounded-full -right-3 text-[#cba135] top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Category