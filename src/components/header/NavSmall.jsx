import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiFacebook } from "react-icons/ci";
import { IoIosArrowDown, IoLogoInstagram } from "react-icons/io";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { useCategories } from "../../api/useCategories";
import { IoChevronBackSharp } from "react-icons/io5";

const NavSmall = ({ visible, setVisible }) => {
  const { isLoading, error, categories } = useCategories();
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // Disable scrolling when drawer is open
  // useEffect(() => {
  //   document.body.style.overflow = visible ? "hidden" : "";
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [visible]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Collection", path: "/all-collection" },
    { name: "Men's", path: "/gender/Men" },
    { name: "Women's", path: "/gender/Women" },
  ];

  return (
    <div
      className={`fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 z-[9999] w-full h-full transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={() => setVisible(false)}
    >
      {/* Sidebar */}
      <div
        className={`absolute top-0 right-0 shadow-xl max-w-[300px] w-full h-screen bg-dark-2 transition-all ${visible ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col text-gray-50 h-full">
          {/* Close Button */}
          <div onClick={() => setVisible(false)} className="flex items-center gap-1 p-3 cursor-pointer text-lg border-b border-gray-700">
            <IoChevronBackSharp />
            <p>Back</p>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                onClick={() => setVisible(false)}
                className="py-3 px-6 border-b border-gray-700 hover:bg-gray-700 transition-all"
                to={item.path}
              >
                {item.name.toUpperCase()}
              </NavLink>
            ))}

            {/* Categories Dropdown */}
            <div>
              <button
                className="flex uppercase items-center justify-between py-3 px-6 w-full border-b border-gray-700 hover:bg-gray-700 transition-all"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
              >
                Categories
                <IoIosArrowDown className={`transition-transform ${categoriesOpen ? "rotate-180" : ""}`} />
              </button>

              {categoriesOpen && (
                <div className="pl-6 py-2 flex flex-col gap-2 bg-dark-2 text-gray-400">
                  {isLoading && <p className="text-sm">Loading...</p>}
                  {error && <p className="text-sm text-red-400">Error loading categories</p>}
                  {categories?.map((category) => (
                    <NavLink
                      key={category._id}
                      to={`/category/${category.name}/${category._id}`}
                      onClick={() => setVisible(false)}
                      className="hover:text-white text-sm uppercase"
                    >
                      {category.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Extra Pages */}
            <NavLink
              onClick={() => setVisible(false)}
              className="py-3 px-6 border-b border-gray-700 hover:bg-gray-700 transition-all"
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-3 px-6 border-b border-gray-700 hover:bg-gray-700 transition-all"
              to="/contact"
            >
              CONTACT
            </NavLink>
          </nav>

          {/* Social Links */}
          <div className="text-center mt-auto mb-10">
            <div className="text-gray-300 uppercase text-base mb-3">
            Follow Us
            </div>
          <div className="flex space-x-4 justify-center">
            <Link to="#" className="text-gray-400 hover:text-white transition">
              <FaFacebookF size={20} />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition">
              <FaInstagram size={20} />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition">
              <FaLinkedinIn size={20} />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition">
              <FaWhatsapp size={20} />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition">
              <FaYoutube size={20} />
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavSmall;
