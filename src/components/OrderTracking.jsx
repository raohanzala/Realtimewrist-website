import React from "react";
import Button from "./Button";

const OrderTracking = ({ order, onClose }) => {
  const trackingSteps = [
    "Pending",
    "Order Confirmed",
    "Processing",
    "Out for Delivery",
    "Delivered",
    "Canceled"
  ];

  const currentStep = trackingSteps.indexOf(order.status);

  return (
    <div className="px-3">
      <h2 className="text-lg font-semibold mb-2">Order Tracking</h2>
      <p className="text-sm text-gray-600">Order ID: <span className="font-medium">{order._id}</span></p>

      <div className="mt-4">
        {trackingSteps.map((step, index) => (
          <div key={index} className={`flex items-center gap-2 py-1 ${index <= currentStep ? "text-green-600" : "text-gray-400"}`}>
            <span className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold 
              ${index <= currentStep ? "bg-green-500 text-white" : "bg-gray-300"}`}>
              {index + 1}
            </span>
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>

      <p className="text-sm mt-3">
        Need help? WhatsApp us at: <span className="font-medium text-blue-600">03278272361</span>
      </p>

      <Button variant="cancel" className="mt-5 w-full" onClick={onClose}>
        Close
      </Button>
    </div>
  );
};

export default OrderTracking;
