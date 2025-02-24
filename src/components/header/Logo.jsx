import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

import { BsEnvelope } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";



const Logo = () => {
  return (
    <div className='flex items-center justify-between  p-2 px-5 max-w-screen-2xl w-full mx-auto'>
      <a href="tel:+923278272361" className='flex  items-center'>

      <a  className="text-2xl text-[#cba135] mr-2">
        <IoCallOutline />
      </a>

        <div className=' sm:block hidden pl-2 border-l-2 '>
          <h2 className='text-sm'>HELPLINE :</h2>
          <p className='text-xs font-semibold'>+92-3278272361</p>
        </div>

      </a>
      <Link to={'/'}>
        <img
          src={assets.logo2}
          alt="Logo"
          className="w-full max-w-[180px] h-auto sm:max-w-[200px] sm:h-[55px]"
        />
      </Link>

      <a className='flex  items-center ' href="mailto:realtimewrist@gmail.com">
        <div className='text-2xl text-[#cba135] mr-2'>
          <BsEnvelope />
        </div>

        <div className='sm:block hidden pl-2 border-l-2'>
          <h2 className='text-sm'>EMAIL US :</h2>
          <p className='text-xs font-semibold'>realtimewrist@gmail.com</p>
        </div>
      </a>
    </div>
  )
}

export default Logo