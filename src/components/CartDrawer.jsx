import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import toast from 'react-hot-toast';
import { IoCloseSharp } from 'react-icons/io5'; // Close icon
import { ImCancelCircle } from "react-icons/im";
import { IoMdCart } from "react-icons/io";


const CartDrawer = () => {
  const { products, currency, cartItems, updateQuantity,getCartCount, navigate, isCartOpen, setIsCartOpen } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // Update cartData whenever cartItems or products change
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
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
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[9999] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-in Cart Drawer */}
      <div
        className={`fixed top-0 right-0 w-full max-w-md min-h-screen h-full bg-white z-[9999] shadow-lg transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='flex flex-col justify-between h-full'>
          {/* Cart Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Your Cart (<span className='text-primary'>{getCartCount()}</span>)</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-700 hover:text-gray-900">
              <IoCloseSharp size={20} />
            </button>
          </div>

          {/* Cart Items Section */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartData.length === 0 ? (
              <div className="py-20 flex items-center justify-center">
                <p className="text-xl text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                return (
                  <div key={index} className="p-2 rounded-sm my-3 border text-gray-700 flex relative items-center gap-4">
                    <img
                      src={productData?.image }
                      className="w-16 h-16 object-cover rounded"
                      alt={productData?.name }
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{productData?.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{currency}{productData?.price || 8999}</p>
                        {productData?.sizes?.length > 0 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 border rounded">{item.size}</span>
                        )}
                      </div>
                    </div>
                    <div className='flex gap-1 items-center '>
                      <div className='bg-gray-200 rounded px-2 cursor-pointer'>-</div>
                      <input
                        onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                        className="w-5 text-center rounded"
                        type="number"
                        min={1}
                        defaultValue={item.quantity || 1}
                      />
                      <div className='bg-gray-200 rounded px-2 cursor-pointer'>+</div>
                    </div>
                    <button className='absolute -top-1 -right-1 bg-white '>

                      <ImCancelCircle size={14} className='text-gray-500 hover:text-black' onClick={() => updateQuantity(item._id, item.size, 0)} />

                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Cart Footer */}
          <div className="p-4 border-t mt-auto">
            <CartTotal isHeading={false} />
            <div className="flex gap-4 mt-4">
              <button className='relative flex-1 py-2 rounded bg-gray-300 cursor-pointer' onClick={handleViewCart}>
                <div className='flex gap-1 text-sm justify-center items-center'>

                <IoMdCart className='text-xl' />
                View Cart
                </div>
                <p className='absolute right-[-5px] -top-1 w-4 text-center leading-4 bg-[red] text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
              </button>
              <button
                disabled={cartData.length === 0}
                onClick={handleCheckout}
                className={`flex-1 text-sm py-2 rounded text-center tracking-wider transition-colors ${cartData.length === 0
                  ? 'bg-primary cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-gray-800'
                  }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
