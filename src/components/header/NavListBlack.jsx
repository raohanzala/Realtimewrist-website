import React from 'react'
import { NavLink } from 'react-router-dom'

const NavListBlack = () => {
  

  return (
    <ul className='hidden md:flex gap-5  text-[#333] text-xs z-[999]' >
      <NavLink to='/' className='flex flex-col items-center gap-1'>
        <p>HOME</p>
        {/* <hr className='w-full border-none h-[1.5px] bg-goldPrimary hidden' /> */}
      </NavLink>
      <NavLink to='/collection' className='flex flex-col items-center gap-1'>
        <p>ALL COLLECTION</p>
        {/* <hr className='w-full border-none h-[1.5px] bg-goldPrimary hidden' /> */}
      </NavLink>

      <div className='group relative'>
        <NavLink to='/midrange' className=' flex flex-col items-center gap-1'>
          <p className='hover:text-gray-300  duration-200'>MIDRANGE</p>
          {/* <hr className='w-full border-none h-[1.5px] bg-goldPrimary hidden' /> */}
        </NavLink>
        <div className='group-hover:block hidden absolute dropdown-menu shadow-md left-0 pt-3 z-[99]'>
          <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-500'>
            <p className='cursor-pointer hover:text-black'> Automatic</p>
            <p className='cursor-pointer hover:text-black'>Quartz</p>
            <p className='cursor-pointer hover:text-black'>Leather Strap</p>
            <p className='cursor-pointer hover:text-black'>Chain Strap</p>
          </div>
        </div>
      </div>
      <div className='group relative'>
        <NavLink to='/original' className=' flex flex-col items-center gap-1'>
          <p >ORIGINAL</p>
          {/* <hr className='w-full border-none h-[1.5px] bg-goldPrimary hidden' /> */}
        </NavLink>
        <div className='group-hover:block hidden absolute dropdown-menu shadow-md left-0 pt-3 z-[99]'>
          <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-500'>
            <p className='cursor-pointer hover:text-black'>Fitron</p>
            <p className='cursor-pointer hover:text-black'>Proking</p>
            <p className='cursor-pointer hover:text-black'>Casio</p>
            <p className='cursor-pointer hover:text-black'>Citizen</p>
          </div>
        </div>
      </div>

    
      <NavLink to='/about' className='flex flex-col items-center gap-1'>
        <p>ABOUT</p>
        {/* <hr className='w-full border-none h-[1.5px] bg-goldPrimary hidden' /> */}
      </NavLink>
      <NavLink to='/contact' className='flex flex-col items-center gap-1'>
        <p>CONTACT</p>
        {/* <hr className='w-full border-none h-[1.5px] bg-goldPrimary hidden' /> */}
      </NavLink>

    </ul>
  )
}

export default NavListBlack