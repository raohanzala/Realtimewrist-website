import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';
import CartTotal from '../components/CartTotal'
import toast from 'react-hot-toast'
import { RxCross2 } from "react-icons/rx";
import QuantityInput from '../components/QuantityInput';
import Breadcrumb from '../components/Breadcrumb';


const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {

    if (products.length > 0) {


      const tempData = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]

            })
          }
        }
      }
      setCartData(tempData)
    }
    
  }, [cartItems, products])

  console.log(cartData)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Cart' } // No href, current page
  ];


  return (
    <div className='border-t pt-14 max-w-[1280px] mx-auto px-5'>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>

      <div className='border p-5'>
        {cartData.length > 0 ?
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)
            console.log(productData)
            return (
              <div className={`py-4 ${index !== cartData.length -1 && 'border-b'} text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4`} key={item._id}>
                <div className='flex items-start gap-6'>
                  <img src={productData.image[0]} className='size-20 object-cover rounded' alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.newPrice}</p>
                      {productData.sizes.length > 0 && <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>}
                    </div>
                  </div>
                </div>
               <QuantityInput item={item}/>
                {/* <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" /> */}
                <div onClick={() => updateQuantity(item._id, item.size, 0)} className='cursor-pointer'>

                <RxCross2 size={20} />
                </div>

              </div>
            )
          }) : <div className='py-9 flex items-center justify-center'>
            <p className='text-2xl text-[#d2d2d2]'>Your cart is empty</p>
          </div>
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => {
              toast.dismiss()
              if(cartData.length > 0){
                navigate('/place-order')
              }else{
                toast.error('Your cart is empty.')
              }
              }} className='bg-primary text-white text-sm my-8 px-8 py-3'>PROCEED TO CHEKOUT</button>
          </div>
        </div>
      </div>
                </div>
    </div>
  )
}

export default Cart