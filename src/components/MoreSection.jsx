import React from 'react'
import { assets } from '../assets/assets'

const MoreSection = () => {
  return (
    <div className='flex justify-between gap-5 bg-[#232323] py-12 px-5 w-full'>
      <p className='text-sm flex-1 text-white text-right'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis laudantium dolorum eveniet expedita reiciendis consectetur blanditiis minima est veniam distinctio.

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis laudantium dolorum eveniet expedita reiciendis consectetur blanditiis minima est veniam distinctio.</p>

      <img src={assets.logo4} className='w-1/3 py-5' alt="" />

      
      <p className='text-sm text-white text-left flex-1 '>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis laudantium dolorum eveniet expedita reiciendis consectetur blanditiis minima est veniam distinctio.

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis laudantium dolorum eveniet expedita reiciendis consectetur blanditiis minima est veniam distinctio.</p>
    </div>
  )
}

export default MoreSection