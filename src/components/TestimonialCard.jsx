import React from 'react';
import { assets } from '../assets/assets';

const TestimonialCard = () => {
  return (
    <div className="bg-white rounded-md shadow-lg w-full max-w-[280px] border border-gray-300 overflow-hidden">
      {/* WhatsApp Screenshot */}
      <div className="relative h-[140px] bg-gray-50">
        <img
          src={assets.feedback_2} // Replace with your WhatsApp screenshot path
          alt="WhatsApp Review"
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <p className="text-xs text-white px-2 text-center font-medium">
            "Excellent quality and service! Will definitely buy again."
          </p>
        </div> */}
      </div>

      {/* Review Content */}
      <div className="p-4">
        {/* Review Text */}
        <p className="text-sm text-gray-700 leading-relaxed">
          “I absolutely love the product! It exceeded my expectations in both quality”
        </p>

        {/* Separator */}
        <hr className="my-3" />

        {/* Rating and Details */}
        <div className="flex justify-between items-center text-sm">
          {/* Rating */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <img
                key={index}
                src={assets.star_icon}
                className="w-4 h-4"
                alt="Star Icon"
              />
            ))}
          </div>

          {/* Verified Tag */}
          <div className="text-gray-500 font-medium">
           Kashif Ameen
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
