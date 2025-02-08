import React from "react";
import Modal from "./Modal";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const ConfirmOrderModal = () => {
  return (
    <div className="flex flex-col items-center text-center px-4 py-2">
      {/* Success Icon */}
      <AiFillCheckCircle className="text-green-500 w-16 h-16 mb-4 animate-bounce" />

      {/* Success Message */}
      <h2 className="text-gray-900 text-2xl font-semibold">
        Your Order Has Been Placed! 🎉
      </h2>

      <p className="text-gray-700 text-base mt-2">
        Thank you for shopping with us!
      </p>

      {/* Order Confirmation Details */}
      <p className="text-gray-600 text-sm mt-4">
        Our agent will contact you soon to confirm your order.
        <br />
        For assistance, call: 
        <span className="font-semibold text-gray-900"> 0327-8272361</span>
      </p>

      {/* View Orders Button */}
      <Link
        to="/orders"
        className="mt-5 bg-primary-1 text-white px-5 py-2 rounded text-sm font-medium shadow-md hover:bg-primary-2 transition duration-300"
      >
        View My Orders
      </Link>
    </div>
  );
};

export default ConfirmOrderModal;
