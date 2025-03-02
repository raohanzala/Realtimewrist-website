import Title from "./Title";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import TestimonialCard from "./TestimonialCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import { assets } from "../assets/assets";

const testimonials = [
  {
    image: assets.feedback_1,
    review:
      "“G watch ahci hai.”",
    name: "Umar Sheikh",
    marks: 4,
  },
  {
    image: assets.feedback_2,
    review: "“Outstandng Quality and finishing for the price. Have been searching for such an article with suc quality in low price for quite a while.”",
    name: "Kashif Ameen",
    marks: 5,
  },
  {
    image: assets.feedback_3,
    review:
      "“Arrived today very pleased with how it looks and feels.”",
    name: "Kashif Ameen",
    marks: 2,
  },
  {
    image: assets.feedback_4,
    review:
      "“Very good quality.”",
    name: "Kashif Ameen",
    marks: 2,
  },
  {
    image: assets.feedback_5,
    review:
      "“Best quality in this price range. Good product highly recommended.”",
    name: "Kashif Ameen",
    marks: 2,
  },
  {
    image: assets.feedback_9,
    review:
      "“Watch is so beautiful and qulaity is outstanding. In tis price range it is the best thing you can get.”",
    name: "Mehver Mirza",
    marks: 4,
  },
  {
    image: assets.feedback_8,
    review:
      "“Salam bhai ap jo cheez bheji hai woh bht umda hai bhai shukriya.”",
    name: "Kashif Ameen",
    marks: 2,
  },
];

const images = testimonials.map((testimonial) => testimonial.image);

console.log(images);

const TestimonialSection = () => {

  return (
    <div className="py-10 px-8">
      <div className="text-center text-3xl pb-8">
        <Title text1={"CUSTOMERS"} text2={"FEEDBACK"} />
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
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          slidesPerView={4} // Center and 2 on each side
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard
                testimonial={testimonial}
                testimonials={testimonials}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="custom-prev  transition-opacity duration-300 ease-in-out">
          <button className="absolute text-2xl z-30 text-[#cba135] p-1 rounded-full -left-8 top-1/2 transform -translate-y-1/2">
            <IoIosArrowBack />
          </button>
        </div>
        <div className="custom-next  transition-opacity duration-300 ease-in-out">
          <button className="absolute text-2xl z-30 text-[#cba135] p-1 rounded-full -right-8 top-1/2 transform -translate-y-1/2">
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {/* <ImageGallery images={images} setPhotoIndex={setPhotoIndex} isLightboxOpen={isLightboxOpen} setIsLightboxOpen={setIsLightboxOpen} photoIndex={photoIndex}/> */}
    </div>
  );
};

export default TestimonialSection;
