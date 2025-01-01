import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import axios from 'axios'
import { CURRENCY } from '../utils/contants';
import { formatAmount } from '../helpers';

const Order = () => {

    const {backendUrl, token, currency} = useContext(ShopContext)

    const [orderData, setOrderData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const loadOrderData = async ()=> {

      try {
        if(!token){
          return null
        }

        const response = await axios.post(backendUrl+'/api/order/userorders', {}, {headers : {token}})
        
        if(response.data.success){
          let allOrdersItem = []
          response.data.orders.map((order)=> {
            order.items.map((item)=> {
              item['status'] = order.status
              item['payment'] = order.payment
              item['paymentMethod'] = order.paymentMethod
              item['date'] = order.date
              allOrdersItem.push(item)
            })
          })
          console.log(allOrdersItem)
          setOrderData(allOrdersItem.reverse())
        }

      } catch (error) {
        console.log(error)
      }finally{
        setIsLoading(false)
      }

    }

    useEffect(()=> {
      loadOrderData()
    }, [token])

    console.log(orderData, 'DATAORDER')


  return (
    <div className='border-t pt-16 max-w-[1180px] mx-auto px-5'>

<div className='text-2xl'>
  <Title text1={'MY'} text2={'ORDERS'}/>
</div>

<div>
  {isLoading ? <SkeletonRow/> : orderData.length > 0 ? orderData.map((item, index)=>(

    <div key={item._id} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
       <div className='flex items-start gap-6 text-sm'>
        <img  className='size-16 object-cover rounded-sm' src={item?.images?.[0]} alt="" />
        <div>
          <p className='sm:text-base font-medium'>{item.name}</p>
          <div className='flex items-center gap-3 text-base text-gray-700'>
            <p>{CURRENCY}{formatAmount(item.newPrice)}</p>
            <p>Quantity : {item.quantity}</p>
          </div>
          <div className='flex gap-2 text-sm'>
          <p >Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
          <p >Payment : <span className='text-gray-400'>{item.paymentMethod}</span></p>
          </div>
        </div>
       </div>

       <div className='md:w-1/2 flex justify-between'>
       <div className='flex items-center gap-2'>
        <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
        <p className='text-sm md:text-base'>{item.status}</p>
       </div>
       <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
       </div>
    </div>
  )) : <div className='py-9 flex items-center justify-center'>
  <p className='text-xl text-[#d2d2d2]'>You have no orders yet.</p>
</div>}
</div>

    </div>
  )
}

const SkeletonRow = () => {

  const skeletons = Array(3).fill(0);

  return (
    <>
    {skeletons.map((_, index) => (
      <div key={index} className="py-4 border-t border-b text-gray-300 animate-pulse flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Image Placeholder */}
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 bg-gray-200 rounded-sm"></div>
        <div>
          {/* Text placeholders */}
          <div className="h-4 bg-gray-200 rounded-sm w-36 mb-2"></div>
          <div className="flex items-center gap-3">
            <div className="h-4 bg-gray-200 rounded-sm w-16"></div>
            <div className="h-4 bg-gray-200 rounded-sm w-24"></div>
          </div>
          <div className="flex gap-2 mt-2">
            <div className="h-4 bg-gray-200 rounded-sm w-28"></div>
            <div className="h-4 bg-gray-200 rounded-sm w-32"></div>
          </div>
        </div>
      </div>

      {/* Status and Button Placeholder */}
      <div className="md:w-1/2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded-sm w-24"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded-sm w-28"></div>
      </div>
    </div>))}
      </>
  );
};


export default Order