import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CategoryItem from './CategoryItem';
import { useCategories } from '../api/useCategories';

const Category = () => {

  const { isLoading, error, categories } = useCategories();

  return (
    <div className="pt-12 pb-3 md:pb-6">
      <div className="relative group">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween:10 },
            480: { slidesPerView: 4,  },
            768: { slidesPerView: 5, spaceBetween : 20 },
            1024: { slidesPerView: 6, spaceBetween: 30 },
            1280: { slidesPerView: 7 },
          }}
          slidesPerView={5}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          autoplay={{ delay: 2000 }}
        >
          {isLoading ? <ProductSkeleton/> :
            categories?.map((category, index) => (
              <SwiperSlide key={index}>
                <CategoryItem categoryImg={category.image} categoryName={category.name} link={category._id}  key={index} />
              </SwiperSlide>
            ))
          }

        </Swiper>
        <div className="custom-prev custom-prev  z-50 transition-opacity duration-400 ease-in-out">
          <button className="absolute text-2xl z-30 duration-500 ease-in-out  text-[#cba135]   p-[2px] rounded-full  -left-4 top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowBack />
          </button>
        </div>
        <div className=" custom-next custom-prev z-50 transition-opacity duration-400 ease-in-out">
          <button className="absolute text-2xl z-30 duration-500 ease-in-out  p-[2px] rounded-full  -right-4 text-[#cba135] top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  )
}

const ProductSkeleton = () => {
  const skeletons = Array(4).fill(0);

  return (
    <div className=" flex gap-4">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="flex relative w-full hover:shadow-md h-auto flex-col text-gray-700 cursor-pointer bg-white overflow-hidden transform transition-all border rounded animate-pulse"
        >
          <div className="relative overflow-hidden h-24 w-full">
            <div className="absolute w-full h-full object-cover bg-gray-300"></div>
          </div>

          {/* <div className="text-center relative py-3 px-2 z-10">
            <div className="h-4 bg-gray-200 rounded-sm w-32 mb-1 mx-auto"></div>
            <div className="h-3 bg-gray-200 rounded-sm w-24 mb-2 mx-auto"></div>
            <div className="flex gap-2 justify-center items-center mt-2">
              <div className="h-4 bg-gray-200 rounded-sm w-16"></div>
              <div className="h-4 bg-gray-200 rounded-sm w-24"></div>
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
};


export default Category