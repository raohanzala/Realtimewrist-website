import React from "react";
import { IoShirtSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaChevronRight } from "react-icons/fa6";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function CategoryItem({categoryName, categoryImg}) {
  return (
    <Link>
      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden relative m-auto">
        <div className="relative w-full h-full flex items-center justify-center hover:scale-110 duration-300">
          <LazyLoadImage
            effect="blur"
            src={categoryImg}
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent hover:opacity-30 opacity-70 transition-opacity duration-300"></div>
        </div>
        <div className="bg-[rgba(0,0,0,0.7)] w-full ">
        <div className="absolute  text-center flex items-center bottom-4 left-[50%] top-[75%] -translate-x-[50%] -translate-y-[50%] text-white">
          <div>
            <h2 className='lg:text-sm text-gray-50 font-semibold uppercase'>{categoryName}</h2>
          </div>
        </div>
        </div>
      </div>
    </Link>
  );
}

export default CategoryItem;
