import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import SignupEmail from '../components/SignupEmail'

const Contact = () => {
  return (
    <div className='px-3'>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 sm:mb-16 mb-5'>
          <img src={assets.logo4} className='w-full md:max-w-[480px] py-24 px-8 bg-dark-2' alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>74400 Saddar <br /> CO-Operative Market, karachi</p>
          <div className='flex flex-col'>

          <a href="tel:+923278272361" className='text-gray-500'>WhatsApp : +92-3278272361</a>
          <a href="mailto:realtimewrist@gmail.com" className='text-gray-500'>Email: realtimewrist@gmail.com</a>
          </div>
          <p className='font-semibold text-xl text-gray-600'>Careers at Realtimewrist</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm cursor-not-allowed hover:bg-[#cba035a6] hover:border-opacity-0 hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact