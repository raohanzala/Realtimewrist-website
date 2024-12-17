import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { assets } from '../assets/assets'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { MdOutlineArrowBack, MdOutlineArrowForward } from 'react-icons/md'

const LatestCollection = ({ }) => {

  const { products } = useContext(ShopContext)
  console.log(products)

  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])

  console.log(products)


  return (
    <div className='my-10'>
      <div className='text-center pb-8 text-3xl '>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
      </div>


      <div className="relative group">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={5}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          breakpoints={{
            320: { slidesPerView: 2 }, // matches grid-cols-2
            640: { slidesPerView: 3 }, // matches sm:grid-cols-3
            768: { slidesPerView: 4 }, // matches md:grid-cols-4
            1024: { slidesPerView: 5 }, // matches lg:grid-cols-5
          }}
          autoplay={{ delay: 5000 }}
          >
          
          {latestProducts.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductItem key={index} id={item._id} description={item.description} image={item.image} name={item.name} newPrice={item.newPrice} oldPrice={item.oldPrice} />
            </SwiperSlide>
            ))}
        </Swiper>
        <div className="custom-prev custom-prev opacity-0 z-50 group-hover:opacity-100 transition-opacity duration-400 ease-in-out">
          <button className="absolute text-xl z-30 text-primary  group-hover:translate-x-0 -translate-x-14 bg-white shadow-2xl border  p-1  rounded-full duration-300 ease-in-out -left-2 top-1/2 transform -translate-y-1/2  ">
          <MdOutlineArrowBack />

          </button>
        </div>
        <div className=" custom-next custom-prev opacity-0 z-50 group-hover:opacity-100 transition-opacity duration-400 ease-in-out">
          <button className="absolute text-xl z-30 group-hover:translate-x-0 translate-x-14  bg-white shadow-2xl border p-1 rounded-full duration-300 ease-in-out -right-2 text-primary top-1/2 transform -translate-y-1/2 ">
          <MdOutlineArrowForward />


          </button>
        </div>
      </div>

    </div>
  )
}

export default LatestCollection