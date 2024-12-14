import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#232323] text-white">
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* About Section */}
        <div className="flex flex-col mb-8 sm:mb-0">
          <img src={assets.logo4} className="mb-5 w-52 h-12" alt="Logo" />
          <p className="text-[#969696] text-sm leading-relaxed">
          Affordable watches, from budget-friendly to luxury – find your perfect timepiece at Realtime Wrist!
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col mb-8 sm:mb-0">
          <p className="text-lg mb-4">Quick Links</p>
          <ul className="space-y-2 text-sm text-[#969696]">
            <li>
              <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors duration-300">About Us</Link>
            </li>
            <li>
              <Link to="/delivery" className="hover:text-white transition-colors duration-300">Delivery</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="flex flex-col mb-8 sm:mb-0">
          <p className="text-lg mb-4">Contact Info</p>
          <ul className="space-y-2 text-sm text-[#969696]">
            <li>Phone: +92-3278272361</li>
            <li>Email: realtimewrist@gmail.com</li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col mb-8 sm:mb-0">
          <p className="text-lg mb-4">Follow Us</p>
          <ul className="space-y-2 text-sm text-[#969696]">
            <li>
              <Link to="#" className="hover:text-white transition-colors duration-300">Facebook</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition-colors duration-300">Instagram</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition-colors duration-300">Twitter</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition-colors duration-300">LinkedIn</Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom Section */}
      <div className="bg-[#cba135] py-3">
        <p className="text-center text-sm">
          Copyright {currentYear} @
          <Link to="/" className="font-semibold hover:text-[#232323] transition-colors duration-200">
            {' '}realtimewrist.pk{' '}
          </Link>
          - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
