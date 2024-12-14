import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className='max-w-[1280px] mx-auto'>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 mb-12 flex flex-col justify-center md:flex-row gap-16'>
        <img src={assets.logo4} className='w-full md:max-w-[450px] py-24 px-8 bg-[#232323]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis laudantium dolorum eveniet expedita reiciendis consectetur blanditiis minima est veniam distinctio.</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis laudantium dolorum eveniet expedita reiciendis consectetur blanditiis minima est veniam distinctio.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur nobis, hic quam vel voluptas esse optio eligendi sunt laboriosam beatae cum quia quae ex repellendus fugit doloribus voluptates molestiae adipisci?</p>
        </div>
      </div>

      <div className='text-xl py-4 px-5'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <h2 className='text-base font-semibold'>Quality Assurance:</h2>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, fuga.</p>
        </div>



        <div className='border border-l-0 border-r-0 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <h2 className='text-base font-semibold'>Convenience:</h2>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, fuga.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <h2 className='text-base font-semibold'>Exceptional Customer Service:</h2>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, fuga.</p>
        </div>
      </div>

    <NewsLetterBox/>

    </div>
  )
}

export default About