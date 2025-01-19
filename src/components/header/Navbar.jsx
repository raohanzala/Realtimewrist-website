import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import NavList from "./NavList";
import Logo from "./Logo";
import NavSmall from "./NavSmall";
import TopBar from "./TopBar";

import { IoMdCart } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { CiFacebook } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { clearCart, openCart } from "../../store/slices/cartSlice";

const Navbar = ({ setShowSearch }) => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const {navigate } =
    useContext(ShopContext);

    const {totalItems} = useSelector((state)=> state.cart)


  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    setLastScrollTop(scrollTop);
  };

  const logOut = () => {
    navigate("/login");
    dispatch(logout());
    dispatch(clearCart());
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <>
      <div
        className={`flex flex-col bg-white w-full fixed shadow-md z-[99] transition-transform duration-300 ease-in-out ${
          scrolled ? "-translate-y-full" : "translate-y-0"
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
            <div className="text-xl  text-gray-100 hidden md:flex gap-3 items-center cursor-pointer ">
              <CiFacebook />
              <IoLogoInstagram />
              <AiOutlineYoutube />
              <FaWhatsapp />
            </div>

            <NavList />

            <div className="flex items-center">
              <div
                onClick={(e) => {
                  setShowSearch(true);
                  e.stopPropagation();
                }}
                className="cursor-pointer text-white text-xl pr-2"
              >
                <FiSearch />
              </div>
              <div className="group relative border-x-[0.5px] px-2">
                <div
                  className="text-white text-xl cursor-pointer"
                  onClick={() => (isLoggedIn ? null : navigate("/login"))}
                >
                  <IoMdPerson />
                </div>
                {isLoggedIn && (
                  <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-[99]">
                    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                      <p className="cursor-pointer hover:text-black">
                        {" "}
                        My Profile
                      </p>
                      <p
                        onClick={() => navigate("/orders")}
                        className="cursor-pointer hover:text-black"
                      >
                        Orders
                      </p>
                      <p
                        onClick={logOut}
                        className="cursor-pointer hover:text-black"
                      >
                        Logout
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div
                onClick={()=>dispatch(openCart())}
                className="relative pl-2 cursor-pointer"
              >
                <div className="text-white text-xl">
                  <IoMdCart />
                </div>
                <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[red] text-white aspect-square rounded-full text-[8px]">
                  {totalItems}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavSmall visible={visible} setVisible={setVisible} />
    </>
  );
};

export default Navbar;
