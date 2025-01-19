import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import toast from 'react-hot-toast'
import { MdOutlineCancel } from "react-icons/md";
import QuantityInput from '../components/QuantityInput';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import { CURRENCY } from '../utils/contants';
import { formatAmount } from '../helpers';
import { useSelector } from 'react-redux'
import { removeFromCart } from '../store/slices/cartSlice'
import { useNavigate } from 'react-router-dom'


const Cart = () => {

  const navigate = useNavigate()
  const {items : cartItems} = useSelector((state)=> state.cart)


  const handleCheckout = ()=> {
      toast.dismiss()
      if (cartItems.length > 0) navigate('/place-order')
      else  toast.error('Your cart is empty.')
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Cart' }
  ];

  return (
    <div className='border-t pt-14 max-w-[1280px] mx-auto px-5'>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5'>
        <div className='max-h-[60vh] overflow-y-scroll'>
          {cartItems.length > 0 ?
            cartItems.map((item, index) => {
              return (
                <div className={`py-4 ${index !== item.length - 1 && 'border-b'} border-y py-5 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4`} key={item._id}>
                  <div className='flex items-start gap-6'>
                    <img src={item.images[0]} className='size-16 object-cover rounded-sm' alt="" />
                    <div>
                      <p className='text-xs sm:text-lg font-semibold uppercase'>{item.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{CURRENCY}{formatAmount(item.newPrice)}</p>
                      </div>
                    </div>
                  </div>
                  <QuantityInput item={item} />
                  <div onClick={() => removeFromCart({itemId : item._id})} className='cursor-pointer'>
                    <MdOutlineCancel size={25} className='opacity-30 hover:opacity-90' />
                  </div>

                </div>
              )
            }) : <div className='py-9 flex items-center justify-center'>
              <p className='text-2xl text-[#d2d2d2]'>Your cart is empty</p>
            </div>
          }
        </div>

        <div className='ml-auto'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <div className='my-8 flex justify-end'>
              <Button onClick={handleCheckout} variant='primaryBig' >PROCEED TO CHEKOUT</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart