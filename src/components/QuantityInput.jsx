import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity } from '../store/slices/cartSlice';

const QuantityInput = ({ item }) => {

  const dispatch = useDispatch()

  console.log(item)


  return (
    <div className="flex gap-2 items-center">
      {/* Decrease Button */}
      <button
        onClick={()=> dispatch(decrementQuantity({itemId : item._id}))}
        className="flex justify-center items-center size-7 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 active:bg-gray-400 transition-colors"
      >
        -
      </button>

      {/* Quantity Display */}
      <div 
        className="w-9 h-8 flex justify-center items-center text-center border border-gray-300 rounded-md bg-white"
      >
        {item.quantity}
      </div>

      {/* Increase Button */}
      <button
        onClick={()=> dispatch(incrementQuantity({itemId : item._id}))}
        className="flex justify-center items-center size-7 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 active:bg-gray-400 transition-colors"
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
