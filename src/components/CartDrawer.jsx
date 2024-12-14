import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import toast from 'react-hot-toast';
import { IoCloseSharp } from 'react-icons/io5'; // Close icon

const CartDrawer = ({ isOpen, onClose }) => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

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
    toast.dismiss()
    if (cartData.length > 0) {
      navigate('/place-order');
    } else {
      toast.error('Your cart is empty.');
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-full max-w-md h-full bg-white z-[9999] shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <Title text1='YOUR' text2='CART' />
        <button onClick={onClose} className="text-gray-700 hover:text-gray-900">
          <IoCloseSharp size={28} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div key={index} className="py-4 border-b text-gray-700 flex items-center gap-4">
                <img src={productData?.image} className="w-16 h-16 rounded-md object-cover" alt={productData?.name} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{productData?.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-sm font-semibold">{currency}{productData?.newPrice}</p>
                    {productData?.sizes.length > 0 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 border rounded">{item.size}</span>
                    )}
                  </div>
                </div>
                <input
                  onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                  className="w-12 text-center border rounded"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <button onClick={() => updateQuantity(item._id, item.size, 0)}>
                  <img className='w-5' src={assets.bin_icon} alt="Remove" />
                </button>
              </div>
            );
          })
        ) : (
          <div className="py-20 flex items-center justify-center">
            <p className="text-xl text-gray-400">Your cart is empty</p>
          </div>
        )}
      </div>

      <div className="p-4 bottom-0 m-auto border-t">
        <CartTotal />
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 mt-4 text-center uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;