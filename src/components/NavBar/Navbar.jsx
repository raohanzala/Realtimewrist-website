import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import NavList from './NavList'
import Logo from './Logo'
import NavSmall from './NavSmall'
import TopBar from './TopBar'

import { IoMdCart } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { CiFacebook } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineMenu } from "react-icons/md";
import SearchBar from '../SearchBar'
import CartDrawer from '../CartDrawer'



const Navbar = ({ showSearch, setShowSearch }) => {

  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isOpen, setIsOpen] = useState(false)


  const { getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)
  console.log(getCartCount())

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    setLastScrollTop(scrollTop)
  };

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <div className={`flex flex-col bg-white w-full fixed shadow-md z-[99] transition-transform duration-300 ease-in-out ${scrolled ? '-translate-y-full' : 'translate-y-0'}`}>
      <TopBar />
      <Logo />

      {/*  ------------- Social Icons ----------------- */}
      <div className='flex items-center justify-between p-2 sm:p-3 px-5 font-medium bg-[#232323]'>
        <div onClick={() => setVisible(true)} className='cursor-pointer pl-2 text-white flex md:hidden text-2xl'>
          <MdOutlineMenu />
        </div>
        <div className='text-xl  text-gray-100 hidden md:flex gap-3 cursor-pointer '>
          <CiFacebook />
          <IoLogoInstagram />
          <AiOutlineYoutube />
          <FaWhatsapp />
        </div>

        {/* -------------- Menu List ------------------- */}
        <NavList />

        {/* ---------------- Cart, Search & Proile ----------------- */}
        <div className='flex items-center'>
          <div onClick={() => setShowSearch(true)} className='cursor-pointer text-white text-xl pr-2'>
            <FiSearch />
          </div>
          <div className='group relative border-x-[0.5px] px-2'>
            <div className='text-white text-xl cursor-pointer' onClick={() => token ? null : navigate('/login')}>
              <IoMdPerson />
            </div>
            {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-[99]'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <p className='cursor-pointer hover:text-black'> My Profile</p>
                <p onClick={()=> navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black' >Logout</p>
                {localStorage.getItem('auth-token') ? <p onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }} className='cursor-pointer hover:text-black'>Logout </p> : ''}
              </div>
            </div>}
          </div>

          <div onClick={()=> setIsOpen(true)}  className='relative pl-2'>
            <div className='text-white text-xl'>
              <IoMdCart />
            </div>
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[red] text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
          </div>
        </div>

        <CartDrawer isOpen={isOpen} />


        {/* ------------- Navbar for Small Screens --------------- */}

        <NavSmall visible={visible} setVisible={setVisible} />
      </div>
    </div>
  )
}

export default Navbar