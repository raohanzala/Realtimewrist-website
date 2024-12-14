import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { assets } from '../assets/assets'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

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
          // autoplay={{ delay: 1500 }}
          >
          
          {latestProducts.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductItem key={index} id={item._id} description={item.description} image={item.image} name={item.name} newPrice={item.newPrice} oldPrice={item.oldPrice} />
            </SwiperSlide>
            ))}
        </Swiper>
        <div className="custom-prev custom-prev opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <button className="absolute text-2xl z-30 text-[#cba135]  p-1 rounded-full -left-2 top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowBack />
          </button>
        </div>
        <div className=" custom-next custom-prev opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <button className="absolute text-2xl z-30  p-1 rounded-full -right-2 text-[#cba135] top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowForward />
          </button>
        </div>
      </div>

    </div>
  )
}

export default LatestCollection