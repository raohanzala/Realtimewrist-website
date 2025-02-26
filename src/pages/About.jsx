import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div className='max-w-[1280px] mx-auto px-5'>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 mb-12 flex flex-col justify-center md:flex-row gap-16'>
        <img src={assets.logo4} className='w-full md:max-w-[450px] py-24 px-8 bg-dark-2' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            At <strong>Realtime Wrist (RTW)</strong>, we offer luxury watches combining craftsmanship and style. Each piece is carefully selected to ensure precision and elegance, making them timeless accessories for every occasion.
          </p>
          <p>
            Our mission is to provide high-quality, affordable watches that elevate your lifestyle, with excellent customer service and easy returns.
          </p>
        </div>
      </div>

      <div className='text-xl py-4 px-5'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <h2 className='text-base font-semibold'>Quality Assurance:</h2>
          <p className='text-gray-600'>
            We guarantee the highest quality, with each watch undergoing rigorous testing for durability and precision.
          </p>
        </div>

        <div className='border border-l-0 border-r-0 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <h2 className='text-base font-semibold'>Convenience:</h2>
          <p className='text-gray-600'>
            Enjoy a seamless shopping experience with fast shipping and easy returns.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <h2 className='text-base font-semibold'>Customer Service:</h2>
          <p className='text-gray-600'>
            Our team is always ready to assist with any inquiries, ensuring a smooth shopping experience.
          </p>
        </div>
      </div>

      <div className='text-xl py-4 px-5'>
        <Title text1={'OUR'} text2={'COMMITMENT'} />
      </div>

      <div className='border px-6 md:px-16 py-8 sm:py-20'>
        <h2 className='text-base font-semibold'>Sustainability:</h2>
        <p className='text-gray-600'>
          We are committed to eco-friendly practices, from sourcing materials to offering sustainable packaging.
        </p>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
