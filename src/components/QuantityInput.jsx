import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
} from "../store/slices/cartSlice";
import { useUpdateQuantity } from "../api/useUpdateQuantity";

const QuantityInput = ({ item }) => {
  const { updateQuantity } = useUpdateQuantity();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const handleIncrement = () => {
    dispatch(incrementQuantity({ itemId: item._id }));
    if (isLoggedIn) {
      const newQuantity = item.quantity + 1;
      updateQuantity({ itemId: item._id, quantity: newQuantity });
    }
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity({ itemId: item._id }));
    if (isLoggedIn) {
      const newQuantity = Math.max(item.quantity - 1, 1);
      updateQuantity({ itemId: item._id, quantity: newQuantity });
    }
  };

  return (
    <div
      className="flex gap-2 items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={(e) => {
          handleDecrement();
          e.stopPropagation();
        }}
        className={`flex justify-center items-center size-7 rounded-md transition-colors ${
          item.quantity === 1
            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-600 hover:bg-gray-300 active:bg-gray-400"
        }`}
        disabled={item.quantity === 1}
      >
        -
      </button>
      <div className="w-9 h-8 flex justify-center items-center text-center border border-gray-300 rounded-md bg-white font-medium text-gray-700">
        {item.quantity}
      </div>

      <button
        onClick={(e) => {
          handleIncrement();
          e.stopPropagation();
        }}
        className="flex justify-center items-center size-7 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 active:bg-gray-400 transition-colors"
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
