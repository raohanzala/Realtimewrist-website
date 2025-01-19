import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { useSelector } from 'react-redux'
import { CURRENCY } from '../utils/contants'

const CartTotal = ({isHeading = true}) => {

const {currency, delivery_fee, getCartAmount}  = useContext(ShopContext)

const {totalValue} = useSelector((state)=> state.cart)

  return (
    <div className='w-full'>
      {isHeading && <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'}/>
      </div>}

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{CURRENCY}{totalValue}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p className='text-primary-2'>Free Delivery</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{CURRENCY} {totalValue + delivery_fee}.00</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal








