import React, { useState } from 'react';
import { assets } from '../assets/assets';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

const TestimonialCard = ({ testimonial }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); 

  return (
    <div
  onClick={() => setIsLightboxOpen(true)}
  className="cursor-pointer relative rounded-sm shadow max-h-96 overflow-hidden transition-all duration-300"
>
  <img
    src={testimonial.image}
    alt="WhatsApp Review"
    className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

  <div className="absolute bottom-0 left-0 w-full p-5 text-white">
    <p className="text-sm leading-relaxed font-light opacity-90">
      "{testimonial.review}"
    </p>

    <hr className="my-3 border-gray-600 opacity-50" />

    <div className="flex justify-between items-center text-sm">
      <div className="flex gap-1">
        {Array.from({ length: testimonial.marks }).map((_, index) => (
          <img key={index} src={assets.star_icon} className="w-5 h-5 opacity-80" alt="Star Icon" />
        ))}
      </div>

      <div className="font-medium text-white opacity-90">
        {testimonial.name}
      </div>
    </div>
  </div>


      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={[{ src: testimonial.image }]} 
          plugins={[Fullscreen, Zoom, Thumbnails]}
        />
      )}
    </div>
  );
};

export default TestimonialCard;
