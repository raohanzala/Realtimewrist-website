import React from 'react';
import { assets } from '../assets/assets';
import { Link } from "react-router-dom";
import { FaChevronRight } from 'react-icons/fa6';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const collections = [
  {
    id: 1,
    title: "Men's Collection",
    image: assets.rolex_yatch_master_1,
    link: "/mens-collection",
  },
  {
    id: 2,
    title: "Women's Collection",
    image: assets.rolex_yatch_master_1,
    link: "/womens-collection",
  },
  {
    id: 3,
    title: "Kid's Collection",
    image: assets.rolex_yatch_master_1,
    link: "/kids-collection",
  },
];

const CategoryCollection = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
      {collections.map((collection) => (
        <div key={collection.id} className="overflow-hidden relative group h-96 max-h-96">
          <Link to={collection.link}>
            <div className="relative w-full h-full transform group-hover:scale-110 duration-300 flex items-center justify-center">
              <LazyLoadImage
                effect="blur"
                src={collection.image}
                className="max-w-full max-h-full object-center"
                alt={collection.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
            </div>


            <div className="absolute flex flex-col items-center justify-center bottom-4 left-[50%] top-[80%] -translate-x-[50%] -translate-y-[50%] text-white w-full">
              <div className='flex items-center mb-4'>
                <h2 className='lg:text-xl text-gray-50 font-medium tracking-widest uppercase'>
                  {collection.title}
                </h2>
                <div className='text-lg text-gray-50 transform translate-x-10 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100'>
                  <FaChevronRight />
                </div>
              </div>
              <button className='border py-1 px-3 border-white hover:bg-white transition-all duration-100 hover:text-[#232323]'>Explore more</button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryCollection;
