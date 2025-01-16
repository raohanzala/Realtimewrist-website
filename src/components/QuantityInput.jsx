import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const QuantityInput = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const { updateQuantity } = useContext(ShopContext);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(item._id, newQuantity);
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(item._id, newQuantity);
  };

  return (
    <div className="flex gap-2 items-center">
      {/* Decrease Button */}
      <button
        onClick={handleDecrease}
        className="flex justify-center items-center size-7 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 active:bg-gray-400 transition-colors"
      >
        -
      </button>

      {/* Quantity Display */}
      <div 
        className="w-9 h-8 flex justify-center items-center text-center border border-gray-300 rounded-md bg-white"
      >
        {quantity}
      </div>

      {/* Increase Button */}
      <button
        onClick={handleIncrease}
        className="flex justify-center items-center size-7 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 active:bg-gray-400 transition-colors"
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
