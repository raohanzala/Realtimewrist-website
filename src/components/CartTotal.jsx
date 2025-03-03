import Title from './Title'
import { useSelector } from 'react-redux'
import { CURRENCY, DELIVERY_FEE } from '../utils/contants'
import { formatAmount } from '../helpers'

const CartTotal = ({isHeading = true}) => {

const {totalValue} = useSelector((state)=> state.cart)

  return (
    <div className='w-full'>
      {isHeading && <div className='mb-5'>
        <Title size='small' text1={'CART'} text2={'TOTALS'}/>
      </div>}

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{CURRENCY}{formatAmount(totalValue)}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p className=''>{CURRENCY}{formatAmount(DELIVERY_FEE)}</p>
        </div>
        <hr />
        <div className='flex justify-between '>
          <b>Total</b>
          <b className='text-primary-2'>{CURRENCY} {formatAmount(totalValue + DELIVERY_FEE)}.00</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal








