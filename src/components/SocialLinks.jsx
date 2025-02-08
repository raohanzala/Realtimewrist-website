import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { useSocialLinks } from '../api/useSocialLinks'

const SocialLinks = ({size = 16}) => {
  const {facebook , instagram, linkedin, whatsapp, youtube}  = useSocialLinks()
  console.log(facebook , instagram, linkedin, whatsapp, youtube, 'SOCIAL')
  return (
    <div className=" space-x-3 hidden md:flex">
                  <a
                    href={facebook}
                    target="_blank"
                    className="text-gray-300 hover:text-white transition"
                  >
                    <FaFacebookF size={size} />
                  </a>
                  <a
                    href={instagram}
                    target="_blank"
                    className="text-gray-300 hover:text-white transition"
                  >
                    <FaInstagram size={size} />
                  </a>
                  <a
                    href={linkedin}
                    target="_blank"
                    className="text-gray-300 hover:text-white transition"
                  >
                    <FaLinkedinIn size={size} />
                  </a>
                  <a
                    href={whatsapp}
                    target="_blank"
                    className="text-gray-300 hover:text-white transition"
                  >
                    <FaWhatsapp size={size} />
                  </a>
                  <a
                    href={youtube}
                    target="_blank"
                    className="text-gray-300 hover:text-white transition"
                  >
                    <FaYoutube size={size} />
                  </a>
                </div>
  )
}

export default SocialLinks