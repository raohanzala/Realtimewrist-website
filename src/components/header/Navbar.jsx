import React, {
  forwardRef,
  useEffect,
  useState,
} from "react";
import NavList from "./NavList";
import Logo from "./Logo";
import NavSmall from "./NavSmall";
import TopBar from "./TopBar";

import { IoMdArrowDropdown, IoMdCart } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import {  IoLogOutOutline, IoPersonCircleOutline } from "react-icons/io5";

import { MdOutlineMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { clearCart, openCart } from "../../store/slices/cartSlice";
import Login from "../../pages/Login";
import Modal from "../Modal";
import { useSocialLinks } from "../../api/useSocialLinks";
import SocialLinks from "../SocialLinks";
import { useRef } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Navbar = forwardRef(({ setShowSearch }, ref) => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isDropDown, setIsDropDown] =  useState(false)

  const navigate = useNavigate()

  const dropdownRef = useRef(null);

  const { totalItems } = useSelector((state) => state.cart);
  const {facebook , instagram, linkedin, whatsapp, youtube}  = useSocialLinks()

  const dispatch = useDispatch();
  const { isLoggedIn, userData } = useSelector((state) => state.user);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    setLastScrollTop(scrollTop);
  };

  const dropDownToggle = ()=> {
    setIsDropDown((prev)=> !prev)
  }

  const logOut = () => {
    navigate("/login");
    dispatch(logout());
    dispatch(clearCart());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <>
      <div
        ref={ref} // Forward the ref to this div element
        className={`flex flex-col bg-white w-full fixed shadow-md z-[99] transition-transform duration-300 ease-in-out ${scrolled ? "-translate-y-full" : "translate-y-0"
          }`}
      >
        <TopBar />
        <Logo />

        {/*  ------------- Social Icons ----------------- */}
        <div className="w-full bg-dark-2">
          <div className="flex items-center justify-between p-2 sm:p-3 px-5 font-medium bg-dark-2 max-w-screen-2xl mx-auto w-full">
            <div
              onClick={() => setVisible(true)}
              className="cursor-pointer pl-2 text-white flex md:hidden text-2xl"
            >
              <MdOutlineMenu />
            </div>
            <SocialLinks isSmall={true}/>

            <NavList />

            <div className="flex items-center">
              <div
                onClick={(e) => {
                  setShowSearch(true);
                  e.stopPropagation();
                }}
                className="cursor-pointer text-white text-lg sm:text-xl pr-2"
              >
                <FiSearch />
              </div>

              {/* User Avatar */}
              <div className="group relative border-x-[0.5px] px-2" ref={dropdownRef}>
                <div
                  className="flex items-center space-x-1 text-white text-xl cursor-pointer"
                  onClick={(e) => { (isLoggedIn ? null : navigate('/login')) }}
                >
                  {isLoggedIn ?
                    <div className="w-7 h-7 rounded-full uppercase bg-gray-400 text-white flex items-center justify-center">
                      {userData?.name?.split(" ")[0][0]}
                    </div> : (
                      <div className="text-2xl flex gap-2 items-center">
                        <IoPersonCircleOutline />

                      </div>
                    )
                  }
                  {isLoggedIn && (
                    <div  onClick={dropDownToggle}  >
                      <IoMdArrowDropdown className={`text-white text-lg transition-transform duration-300 ${isDropDown ? 'rotate-180' : ''}`} />
                    </div>
                  )}
                </div>

                {isDropDown && (
                  <div className="absolute dropdown-menu right-0 pt-4 z-[99]">
                    <div className="flex flex-col w-36 bg-white text-gray-500 rounded-sm shadow-lg">
                      <p
                        onClick={() => {navigate("/orders"); dropDownToggle()}}
                        className="cursor-pointer hover:text-gray-700 hover:bg-gray-50 flex items-center gap-2 px-3 py-2"
                      >
                        <AiOutlineShopping className=" text-xl" />
                        My Orders
                      </p>
                      <p
                        onClick={()=>{logOut(); dropDownToggle()}}
                        className="cursor-pointer text-red-400 hover:text-red-600 px-3 py-2 hover:bg-red-50 flex items-center gap-2"
                      >
                        <IoLogOutOutline className=" text-xl" />
                        Logout
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div
                onClick={() => dispatch(openCart())}
                className="relative pl-2 cursor-pointer"
              >
                <div className="text-white text-xl">
                  <IoMdCart />
                </div>
                <p className="absolute right-[-5px] bottom-[-5px] size-4 text-center leading-4 bg-[red] text-white aspect-square rounded-full text-[8px]">
                  {totalItems}
                </p>
              </div>
            </div>
          
          </div>
        </div>
      </div>

      {
        isLoginModal && <Modal isOpen={isLoginModal} onClose={() => setIsLoginModal(false)}>
          <Login />
        </Modal>
      }
      <NavSmall visible={visible} setVisible={setVisible} />
    </>
  );
});

export default Navbar;
