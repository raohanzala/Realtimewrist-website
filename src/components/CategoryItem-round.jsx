import React from "react";
// import SeactionHeading from "./SeactionHeading";
import CategoryCard from "./CategoryItem";
import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CategoryItemRound() {
  return (
    <div className="py-12">
      {/* <SeactionHeading heading="Shop by category" /> */}
      <div className="relative group">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={6}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          autoplay={{ delay: 2000 }}
        >
          {[...Array(8)].map((_, index) => (
            <SwiperSlide key={index}>
              <CategoryCard />
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons */}
        </Swiper>
        <div className="custom-prev custom-prev opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <button className="absolute text-2xl z-30 text-[#cba135]  p-1 rounded-full -left-3 top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowBack />
          </button>
        </div>
        <div className=" custom-next custom-prev opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <button className="absolute text-2xl z-30  p-1 rounded-full -right-3 text-[#cba135] top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryItemRound;
