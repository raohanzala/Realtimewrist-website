import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import CartTotal from '../components/CartTotal';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IoCloseSharp } from 'react-icons/io5';
import { ImCancelCircle } from "react-icons/im";
import { IoMdCart, IoMdCash } from "react-icons/io";
import QuantityInput from './QuantityInput';
import Button from './Button';
import { formatAmount } from '../helpers';
import { CURRENCY } from '../utils/contants';


const CartDrawer = () => {
  const { products, currency, cartItems, updateQuantity, getCartCount, navigate, isCartOpen, setIsCartOpen } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  console.log(cartItems, 'cartItems')
  console.log(cartItems, 'cartData')

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = ''; 
    }

    return () => {
      document.body.style.overflow = ''; 
    };
  }, [isCartOpen]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              quantity: cartItems[items][item]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const handleCheckout = () => {
    toast.dismiss();
    if (cartData.length > 0) {
      setIsCartOpen(false)
      navigate('/place-order');
    } else {
      toast.error('Your cart is empty.');
    }
  };

  const handleViewCart = () => {
    setIsCartOpen(false)
    navigate('/cart');
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[9999] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 w-full max-w-md min-h-screen h-full bg-white z-[9999] shadow-lg transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='flex flex-col justify-between h-full'>
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Your Cart ({getCartCount()})</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-900">
              <IoCloseSharp size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cartData.length === 0 ? (
              <div className="py-20 flex gap-1 h-full items-center justify-center text-gray-300">
                <IoMdCart size={30}/>
                <p className="text-xl ">Your cart is empty</p>
              </div>
            ) : (
              cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                return (
                    <div key={index} className="p-2 rounded-sm my-3 border text-gray-700 flex relative items-center gap-4">
                      <img
                        src={productData?.images[0]}
                        className="w-16 h-16 object-cover rounded"
                        alt={productData?.name}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{productData?.name}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">{CURRENCY}{formatAmount(productData?.newPrice) || 8999}</p>
                          
                        </div>
                      </div>
                      <QuantityInput item={item}/>
                      <button className='absolute -top-1 -right-1 bg-white '>
                        <ImCancelCircle size={14} className='text-gray-500 hover:text-black' onClick={() => updateQuantity(item._id, 0)} />
                      </button>
                    </div>
                );
              })
            )}
          </div>

          <div className="sm:p-4 p-2 border-t mt-auto">
            <CartTotal isHeading={false} />
            <div className="flex sm:gap-4 gap-2 mt-4">
              <Button variant='secondary' className={`w-full relative`} onClick={handleViewCart} startIcon={<IoMdCart className='text-xl' />}>
                  View Cart
                <p className='absolute right-[-5px] -top-1 w-4 text-center leading-4 bg-[red] text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
              </Button>
              <Button
                disabled={cartData.length === 0}
                className={`w-full`}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
