import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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
    {
      id: 6,
      title: "Sports",
      image: assets.rolex_yatch_master_1,
      link: "/sports",
    },
    {
      id: 6,
      title: "Sports",
      image: assets.rolex_yatch_master_1,
      link: "/sports",
    },
    {
      id: 6,
      title: "Sports",
      image: assets.rolex_yatch_master_1,
      link: "/sports",
    },
    {
      id: 6,
      title: "Sports",
      image: assets.rolex_yatch_master_1,
      link: "/sports",
    },
    {
      id: 6,
      title: "Sports",
      image: assets.rolex_yatch_master_1,
      link: "/sports",
    },
    {
      id: 6,
      title: "Sports",
      image: assets.rolex_yatch_master_1,
      link: "/sports",
    },
    {
      id: 6,
      title: "Sports",
      image: assets.rolex_yatch_master_1,
      link: "/sports",
    },
  ];

  return (
    <div className="pt-12 pb-3 md:pb-6">
      <div className="relative group">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          breakpoints={{
            320: { slidesPerView: 3 },
            480: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
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
        <div className="custom-prev custom-prev  opacity-0 z-50 group-hover:opacity-100 transition-opacity duration-400 ease-in-out">
          <button className="absolute text-2xl z-30 duration-500 ease-in-out  text-[#cba135] group-hover:translate-x-0 -translate-x-8  p-[2px] rounded-full -left-3 top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowBack />
          </button>
        </div>
        <div className=" custom-next custom-prev opacity-0 z-50 group-hover:opacity-100 transition-opacity duration-400 ease-in-out">
          <button className="absolute text-2xl z-30 duration-500 ease-in-out  p-[2px] rounded-full -right-3 text-[#cba135] top-1/2 transform -translate-y-1/2 group-hover:translate-x-0 translate-x-8">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Category