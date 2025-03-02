import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import CategoryItem from './CategoryItem';
import { useCategories } from '../api/useCategories';

const Category = () => {

  const {isPending, error, categories, totalCategories } = useCategories(true);

  return (
    <div className="pt-6 pb-1 md:pb-1">
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
          {isPending ? <CategorySkeleton/> :
            categories?.map((category, index) => (
              <SwiperSlide key={index}>
                <CategoryItem categoryImg={category.image}  categoryName={category.name} totalCategories={totalCategories} link={category._id}  key={index} />
              </SwiperSlide>
            ))
          }

        </Swiper>
      </div>
    </div>
  )
}

const CategorySkeleton = () => {
  const getSkeletonCount = () => {
    if (window.innerWidth >= 1280) return 7;
    if (window.innerWidth >= 1024) return 6;
    if (window.innerWidth >= 768) return 5;
    if (window.innerWidth >= 480) return 4;
    return 3;
  };

  return (
    <div className="flex gap-3 justify-between md:gap-6">
      {Array.from({ length: getSkeletonCount() }).map((_, index) => (
        <div key={index} className="w-24 h-24 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gray-200 animate-pulse rounded-full"></div>
      ))}
    </div>
  );
};



export default Category