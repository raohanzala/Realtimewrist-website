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
          {isLoading ? 'Loading' :
            categories?.map((category, index) => (
              <SwiperSlide key={index}>
                <CategoryItem categoryImg={category.image} categoryName={category.name} link={category._id}  key={index} />
              </SwiperSlide>
            ))
          }

        </Swiper>
        <div className="custom-prev custom-prev  z-50 transition-opacity duration-400 ease-in-out">
          <button className="absolute text-2xl z-30 duration-500 ease-in-out  text-[#cba135]   p-[2px] rounded-full -left-8 top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowBack />
          </button>
        </div>
        <div className=" custom-next custom-prev z-50 transition-opacity duration-400 ease-in-out">
          <button className="absolute text-2xl z-30 duration-500 ease-in-out  p-[2px] rounded-full -right-8 text-[#cba135] top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Category