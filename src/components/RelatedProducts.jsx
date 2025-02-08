import React, { useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'
import { useProducts } from '../api/useProducts'

const RelatedProducts = ({ category, gender }) => {

  const {products} =  useProducts()
  const [related, setRelated] = useState([])

  console.log(related, category, gender, products, 'RELAYED')


  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice()

      productsCopy = productsCopy.filter((item) => category === item.category.name)
      // productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)

      setRelated(productsCopy.slice(0, 5))
    }
  }, [])

  return (
    <div className='my-24'>
      <div className="text-center text-3xl  py-2" >
        <Title className='mb-6' text1={'RELATED'} text2={'PRODUCTS'} />

      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          related.map((item) => {
            return <ProductItem key={item._id} id={item._id} name={item.name} newPrice={item.newPrice} oldPrice={item.oldPrice} images={item.images} description={item.description} />
          })
        }
      </div>
    </div>
  )
}

export default RelatedProducts