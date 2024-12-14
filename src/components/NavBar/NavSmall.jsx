import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoChevronBackSharp } from "react-icons/io5";


const NavSmall = ({ visible, setVisible }) => {
  return (
    <div className={`absolute top-0 right-0 bottom-0 h-screen z-[9999] overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>

      <div className='flex flex-col text-gray-600'>
        <div onClick={() => setVisible(false)} className='flex items-center gap-1 p-3 cursor-pointer'>
          

          <IoChevronBackSharp className='' />
          <p>Back</p>
        </div>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>ALL COLLECTION</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/midrange'>MIDRANGE</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/original'>ORIGINAL</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
      </div>
    </div>
  )
}

export default NavSmall