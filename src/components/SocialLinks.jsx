import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { useSocialLinks } from '../api/useSocialLinks'

const SocialLinks = ({ isSmall = false, size = 16, ...rest }) => {
  const { facebook, instagram, linkedin, whatsapp, youtube } = useSocialLinks()
  console.log(facebook, instagram, linkedin, whatsapp, youtube, 'SOCIAL')
  return (
    <div className={` space-x-3 ${isSmall ? 'hidden md:flex text-gray-300' : 'text-[#999]'} flex`} >
      <a
        href={facebook}
        target="_blank"
        className="transition"
      >
        <FaFacebookF size={size} />
      </a>
      <a
        href={instagram}
        target="_blank"
        className="transition"
      >
        <FaInstagram size={size} />
      </a>
      <a
        href={linkedin}
        target="_blank"
        className="transition"
      >
        <FaLinkedinIn size={size} />
      </a>
      <a
        href={whatsapp}
        target="_blank"
        className="transition"
      >
        <FaWhatsapp size={size} />
      </a>
      <a
        href={youtube}
        target="_blank"
        className="transition"
      >
        <FaYoutube size={size} />
      </a>
    </div>
  )
}

export default SocialLinks