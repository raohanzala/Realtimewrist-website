import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { FaChevronRight } from "react-icons/fa6";

const CategoryItem23 = ({ category }) => {
  return (
    <div className='relative group'>
      <Link to={`/product/${78}`} className='block overflow-hidden shadow-lg  hover:tracking-wider duration-500'>
        <div className='overflow-hidden max-h-28'>
          <img
            src={assets.rolex_yatch_master_1}
            alt={category}
            className='w-full h-full object-bottom object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent      opacity-70 transition-opacity duration-300 group-hover:opacity-90"></div>
        <div className="absolute flex items-center gap-1 bottom-4 left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-white">
          <div>
            <h2 className='text-xl md:text-2xl lg:text-xl text-gray-100 font-semibold uppercase'>{category}</h2>
          </div>
          <div className='text-lg text-gray-50 transform translate-x-10 opacity-0      transition-all             duration-500 group-hover:translate-x-0 group-hover:opacity-100'>
            <FaChevronRight />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CategoryItem23
