import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useProducts } from "../api/useProducts";

const LatestCollection = () => {
  // const { products } = useContext(ShopContext);

  const { products, status } = useProducts();

  // No need for useEffect
  const latestProducts = products.slice(0, 10);

  return (
    <div className="my-10">
      <div className="text-center pb-8 text-3xl ">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
      </div>

      <div className="relative group">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={5}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          autoplay={{ delay: 5000 }}
        >
          {status === 'pending' ? <ProductSkeleton/> : latestProducts.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductItem
                key={index}
                id={item._id}
                description={item.description}
                images={item.images}
                name={item.name}
                newPrice={item.newPrice}
                oldPrice={item.oldPrice}
                availability={item.availability}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-prev custom-prev opacity-0 z-50 group-hover:opacity-100 transition-opacity duration-400 ease-in-out">
          <button className="absolute text-xl z-30 text-primary-1  group-hover:translate-x-0 -translate-x-14 bg-white shadow-2xl border  p-1  rounded-full duration-500 ease-in-out -left-2 top-1/2 transform -translate-y-1/2  ">
            <IoIosArrowBack />
          </button>
        </div>
        <div className=" custom-next custom-prev opacity-0 z-50 group-hover:opacity-100 transition-opacity duration-400 ease-in-out">
          <button className="absolute text-xl z-30 group-hover:translate-x-0 translate-x-14  bg-white shadow-2xl border p-1 rounded-full duration-500 ease-in-out -right-2 text-primary-1 top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductSkeleton = () => {
  const skeletons = Array(5).fill(0);

  return (
    <>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 gap-y-4 sm:gap-y-6'>

      {skeletons.map((_, index) => (
        <div key={index} className="flex relative w-full h-auto flex-col text-gray-700 cursor-pointer bg-white overflow-hidden transform transition-all border rounded animate-pulse">

          <div className="relative overflow-hidden aspect-w-1 aspect-h-1 w-full">
            <div className="absolute w-full h-full object-cover bg-gray-300"></div>
          </div>

          <div className="text-center relative py-3 px-2 z-10">
            <div className="h-4 bg-gray-200 rounded-sm w-32 mb-1 mx-auto"></div>
            <div className="h-3 bg-gray-200 rounded-sm w-24 mb-2 mx-auto"></div>
            <div className="flex gap-2 justify-center items-center mt-2">
              <div className="h-4 bg-gray-200 rounded-sm w-16"></div>
              <div className="h-4 bg-gray-200 rounded-sm w-24"></div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

export default LatestCollection;
