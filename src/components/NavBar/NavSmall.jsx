import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { IoChevronBackSharp } from "react-icons/io5";


const NavSmall = ({ visible, setVisible }) => {

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = ''; 
    }

    return () => {
      document.body.style.overflow = ''; 
    };
  }, [visible]);

  return (
    <div
    className={`fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 z-[9999] w-full h-full  transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
    onClick={() => setVisible(false)}
    >

    <div className={`absolute top-0 right-0 shadow-xl max-w-[300px] w-full h-screen z-[9999] overflow-hidden bg-dark-2 transition-all ${visible ? 'translate-x-0' : 'translate-x-full'}`}
    onClick={(e)=> e.stopPropagation()}
    >

      <div className='flex flex-col text-gray-50'>
        <div onClick={() => setVisible(false)} className='flex items-center gap-1 p-3 cursor-pointer mb-5'>
          
          <IoChevronBackSharp className='' />
          <p>Back</p>
        </div>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b border-[hsla(0,0%,100%,.2)]' to='/'>HOME</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b border-[hsla(0,0%,100%,.2)]' to='/collection'>ALL COLLECTION</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b border-[hsla(0,0%,100%,.2)]' to='/midrange'>MIDRANGE</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b border-[hsla(0,0%,100%,.2)]' to='/original'>ORIGINAL</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b border-[hsla(0,0%,100%,.2)]' to='/about'>ABOUT</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b border-[hsla(0,0%,100%,.2)]' to='/contact'>CONTACT</NavLink>
      </div>
    </div>
    </div>
  )
}

export default NavSmall