import React from 'react';
import Title from './Title';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import TestimonialCard from './TestimonialCard';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';

const TestimonialSection = () => {
  return (
    <div className='py-10 px-8'>
      <div className="text-center text-3xl pb-8">
        <Title text1={'CUSTOMERS'} text2={'FEEDBACK'} />
      </div>

      <div className="relative group">
        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow]}
          effect="coverflow"
          centeredSlides={true}
          coverflowEffect={{
            rotate: 0, // No rotation
            stretch: 0, // No stretching
            depth: 50, // Distance perspective
            modifier: 2, // Scaling intensity
            slideShadows: false, // Remove shadows
          }}
          spaceBetween={50}
          breakpoints={{
            // 640: { slidesPerView: 1 },
            // 768: { slidesPerView: 3 },
            // 1024: { slidesPerView: 5 },
          }}
          slidesPerView={4} // Center and 2 on each side
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
        >
          {[...Array(8)].map((_, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="custom-prev opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <button className="absolute text-2xl z-30 text-[#cba135] p-1 rounded-full -left-2 top-1/2 transform -translate-y-1/2">
            <IoIosArrowBack />
          </button>
        </div>
        <div className="custom-next opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <button className="absolute text-2xl z-30 text-[#cba135] p-1 rounded-full -right-2 top-1/2 transform -translate-y-1/2">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
