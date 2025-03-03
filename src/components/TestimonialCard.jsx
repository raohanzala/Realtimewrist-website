import React, { useState } from "react";
import { assets } from "../assets/assets";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const TestimonialCard = ({ testimonial, testimonials }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <div
      onClick={() => setIsLightboxOpen(true)}
      className="cursor-pointer relative rounded shadow-lg overflow-hidden group transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
    >
      {/* Testimonial Image */}
      <img
        src={testimonial.image}
        alt="WhatsApp Review"
        className="w-full h-80 object-cover transition-all duration-500 group-hover:scale-110"
        onClick={()=>setPhotoIndex(index)}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-white bg-black/30 backdrop-blur-sm transition-all duration-300">
        <p className="text-sm leading-relaxed font-light opacity-90">
          {testimonial.review}
        </p>

        <hr className="my-3 border-gray-500 opacity-50" />

        <div className="flex justify-between items-center text-sm">
          {/* Rating Stars */}
          <div className="flex gap-1">
            {Array.from({ length: testimonial.marks }).map((_, index) => (
              <img
                key={index}
                src={assets.star_icon}
                className="w-4 h-4 opacity-90"
                alt="Star Icon"
              />
            ))}
          </div>

          {/* User Name */}
          <div className="font-medium text-white opacity-90">
            {testimonial.name}
          </div>
        </div>
      </div>

      {/* Lightbox for Image Preview */}
      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={testimonials?.map((testimonial) => ({ src: testimonial.image }))}
          index={photoIndex}
          on={{
            view: ({ index }) => setPhotoIndex(index),
          }}
        />
      )}
    </div>
  );
};

export default TestimonialCard;
