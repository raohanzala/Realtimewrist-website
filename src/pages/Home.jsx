import React, { useContext } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import Category from '../components/Category'
import SignupEmail from '../components/SignupEmail'
import ServiceSection from '../components/ServiceSection'
import CategoryCollection from '../components/CategoryCollection'
import TestimonialSection from '../components/TestimonialSection'

const Home = () => {

  return (
    <div>
      <Hero />
      <div className='max-w-screen-xl mx-auto px-5'>
        <Category />
        <LatestCollection />
        <BestSeller />
      </div>
      <CategoryCollection />
      <div className='max-w-screen-2xl mx-auto px-5'>

      <TestimonialSection />
      </div>
      <ServiceSection />
      <div className='px-5'>
        <NewsLetterBox />
      </div>
    </div>
  )
}

export default Home