import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function CategoryItem({ categoryName, categoryImg, link }) {
  return (
    <Link to={`/category/${categoryName}/${link}`} className="flex flex-col gap-4 items-center justify-center">
      <div >
        <div className=" rounded-full max-h-36 max-w-36 overflow-hidden m-auto shadow">
          <div className="relative w-full h-full flex items-center justify-center hover:scale-110 duration-300">
            <LazyLoadImage
              effect="blur"
              src={categoryImg}
              className="w-full h-full object-cover"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent hover:opacity-30 opacity-70 transition-opacity duration-300"></div>
          </div>
          <div className="bg-[rgba(0,0,0,0.7)] w-full ">
            <div className="absolute  text-center flex items-center bottom-4 left-[50%] top-[75%] -translate-x-[50%] -translate-y-[50%] text-white">
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-sm text-dark-1 uppercase'>{categoryName}</h2>
      </div>
    </Link>
  );
}

export default CategoryItem;
