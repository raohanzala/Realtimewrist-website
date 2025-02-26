import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-2 text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Section */}
        <div className="space-y-4">
          <img
            src={assets.logo4}
            className="w-48 h-12"
            alt="Realtime Wrist Logo"
          />
          <p className="text-gray-400 text-sm leading-relaxed">
            Affordable watches, from budget-friendly to luxury – find your
            perfect timepiece at Realtime Wrist!
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Contact Info</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <span className="font-medium text-white">Phone:</span>{" "}
              <a href="tel:+923278272361">
              +92-3278272361
              </a>
            </li>
            <li>
              <span className="font-medium text-white">Email:</span>{" "}
              <a href="mailto:realtimewrist@gmail.com">
              realtimewrist@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Follow Us</h4>
          {/* <div className="flex space-x-4">
            <Link to="#" className="text-gray-400 hover:text-white transition">
              <FaFacebookF size={20} />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition">
              <FaInstagram size={20} />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition">
              <FaTwitter size={20} />
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
          </div> */}
          <SocialLinks size={20}/>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-primary-2 py-3">
        <p className="text-center text-sm">
          Copyright {currentYear} &copy;{" "}
          <Link to="/" className="font-semibold hover:text-gray-900 transition">
            realtimewrist.pk
          </Link>{" "}
          - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
