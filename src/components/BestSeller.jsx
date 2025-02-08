import { useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'
import { useProducts } from '../api/useProducts'

const BestSeller = () => {
  const { products, status } = useProducts();

  // Derive bestSeller directly (No need for useState + useEffect)
  const bestSeller = products.filter((item) => item.bestSeller).slice(0, 10);

  return (
    <div className='my-10'>
      <div className='text-center pb-8 '>
        <Title text1='BEST' text2={'SELLERS'}/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 gap-y-4 sm:gap-y-6'>
        {status === 'pending' ? <ProductSkeleton/> :
          bestSeller.map((item, index)=>(
            <ProductItem key={index} id={item._id} images={item.images} name={item.name} newPrice={item.newPrice} oldPrice={item.oldPrice} description={item.description} availability={item.availability}/>
          ))
        }
      </div>
    </div>
  )
}

const ProductSkeleton = () => {
  const skeletons = Array(10).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <div key={index} className="flex relative w-full h-auto flex-col text-gray-700 cursor-pointer bg-white overflow-hidden transform transition-all border rounded animate-pulse">

          <div className="relative overflow-hidden aspect-w-1 aspect-h-1 w-full">
            <div className="absolute w-full h-full object-cover bg-gray-300"></div>
          </div>

          <div className="text-center relative py-3 px-2 z-10">
            <div className="h-4 bg-gray-200 rounded-sm w-32 mb-1 mx-auto"></div>
            <div className="h-3 bg-gray-200 rounded-sm w-24 mb-2 mx-auto"></div>
            <div className="flex gap-2 justify-center items-center mt-2">
              <div className="h-4 bg-gray-200 rounded-sm w-16"></div>
              <div className="h-4 bg-gray-200 rounded-sm w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BestSeller