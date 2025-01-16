import React from 'react'
import { assets } from '../../assets/assets'
import {Link} from 'react-router-dom'

import { BsEnvelope } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";



const LogoBlack = () => {
  return (
    <div className='flex items-center sm:justify-between justify-center p-2 px-5'>
      <div className='sm:flex hidden items-center'>

        <div className='text-2xl text-[#cba135] mr-2'>
          <IoCallOutline />
        </div>

        <div className='pl-2 border-l-2 text-white'>
          <h2 className='text-sm'>HELPLINE :</h2>
          <p className='text-xs font-semibold'>+92-3249221933</p>
        </div>

      </div>

<div className='md:w-[200px] md:h-[48px] w-[180px] h-[80px] py-2'>

<Link to={'/'}>
     <img src={assets.bg_logo_remove} className='w-full h-full ' alt="" />
</Link>
</div>

      <div className='sm:flex hidden items-center '>

        <div className='text-2xl text-[#cba135] mr-2'>
          <BsEnvelope />
        </div>

        <div className='pl-2 border-l-2 text-white'>
          <h2 className='text-sm'>EMAIL US :</h2>
          <p className='text-xs font-semibold'>realtimewrist@gmail.com</p>
        </div>

      </div>
    </div>
  )
}

export default LogoBlack