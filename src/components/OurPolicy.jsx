import React from 'react'
import { assets } from '../assets/assets'
import { BiSupport } from "react-icons/bi";
import { LuBadgeCheck } from "react-icons/lu";
import { RiExchangeFundsFill } from "react-icons/ri";

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:textsm md:text-base text-gray-700'>

      <div>
        <div className='text-6xl  inline-block m-auto mb-4'>
          <RiExchangeFundsFill/>
        </div>
        <p className='font-semibold  text-[#cba035a6]'>Easy Exchange Policy</p>
        <p className='text-gray-400 '> We offer hassle free exhange</p>
      </div>
      <div>
        <div>
<div className='text-6xl inline-block m-auto mb-4'>
<LuBadgeCheck/>
</div>
        </div>
        <p className='font-semibold text-[#cba035a6]'>7 Days Return Policy</p>
        <p className='text-gray-400'> We offer 7 days return policy</p>
      </div>
      <div>
        <div className='text-6xl inline-block m-auto mb-4'>
        <BiSupport/>
        </div>
        <p className='font-semibold text-[#cba035a6]'>Best Customer Support</p>
        <p className='text-gray-400'> We provide 24/7 cusotmer support</p>
      </div>
      <div>
        <div className='text-6xl inline-block m-auto mb-4'>
        <BiSupport/>
        </div>
        <p className='font-semibold text-[#cba035a6]'>Best Customer Support</p>
        <p className='text-gray-400'> We provide 24/7 cusotmer support</p>
      </div>

    </div>
  )
}

export default OurPolicy