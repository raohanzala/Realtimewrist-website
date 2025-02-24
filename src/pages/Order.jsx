import Title from "../components/Title";
import { useState } from "react";
import { useEffect } from "react";
import { useOrders } from "../api/useOrders";
import { formatAmount, formatTimestamp, timestampToShortDate } from "../helpers";
import Modal from "../components/Modal";
import OrderTracking from "../components/OrderTracking";

const Order = () => {
  const { data, isPending } = useOrders();
  const [orderData, setOrderData] = useState();
  const [selectedOrder, setSelectedOrder] = useState(null);
const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  useEffect(() => {
    setOrderData(data?.orders);
  }, [data?.orders]);

  console.log(orderData, 'ORDERDATA')


const handleTrackOrder = ( order) => {
  setSelectedOrder(order);
  setIsTrackingOpen(true);
};

  return (
    <div className="border-t pt-16 max-w-[1180px] mx-auto px-5">
      <div className="mb-5">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {isPending ? (
          <SkeletonRow />
        ) : orderData?.length > 0 ? (
          orderData?.map((order, index) => {
            return (
              <div className={`border-b mb-5`} key={index}>
                <div className="flex flex-wrap gap-2 justify-between items-center mb-4 w-full bg-gray-100 py-2 px-4 rounded-sm shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-lg font-semibold text-gray-800">
                      Amount: <span className="text-green-600">{formatAmount(order?.amount)}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>Date: <span className="font-medium text-gray-700">{timestampToShortDate(order?.date)}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="text-gray-500">
                      Payment Method: <span className="font-medium text-gray-700">{order.paymentMethod}</span>
                    </div>
                    <div className="text-gray-500">
                      Status: <span className={`text-sm font-medium ${order.status === "Completed" ? "text-green-500" : "text-yellow-500"}`}>{order.status}</span>
                    </div>
                  </div>
                </div>
          
                {/* Items */}
                {order.items.map((item, idx) => (
                  <div key={item._id} className="py-4 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t pt-4">
                    <div className="flex items-start gap-6 text-sm">
                      <img
                        className="w-16 h-16 object-cover rounded-sm"
                        src={item?.images?.[0]}
                        alt={item?.name}
                      />
                      <div>
                        <p className="text-base font-medium">{item.name}</p>
                        <div className="flex items-center gap-3 text-base text-gray-700">
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="flex gap-2 text-sm text-gray-500">
                          <p>
                            Price: <span className="text-gray-400">{formatAmount(item?.newPrice)}</span>
                          </p>
                        </div>
                      </div>
                    </div>
          
                    <div className="md:w-1/2 flex justify-between items-center">
                    <div className="flex items-center gap-2">
  <div className={`w-2 h-2 rounded-full ${
    {
      "Pending": "bg-gray-400",
      "Order Confirmed": "bg-blue-500",
      "Processing": "bg-yellow-500",
      "Out for Delivery": "bg-orange-500",
      "Delivered": "bg-green-500",
      "Canceled": "bg-red-500",
    }[order.status] || "bg-gray-400"
  }`}></div>
  <p className={`text-sm md:text-base ${
    {
      "Pending": "text-gray-800",
      "Order Confirmed": "text-blue-800",
      "Processing": "text-yellow-800",
      "Out for Delivery": "text-orange-800",
      "Delivered": "text-green-800",
      "Canceled": "text-red-800",
    }[order.status] || "text-gray-800"
  }`}>
    {order.status}
  </p>
</div>

                      <button className="border px-4 py-2 text-sm font-medium rounded-sm " onClick={(e) => {e.stopPropagation();  handleTrackOrder(order)}}>
                        Track Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })
          
        ) : (
          <div className="py-9 flex items-center justify-center">
            <p className="text-xl text-[#d2d2d2]">You have no orders yet.</p>
          </div>
        )}
      </div>

      <Modal isOpen={isTrackingOpen} onClose={()=>setIsTrackingOpen(false)}>
        <OrderTracking order={selectedOrder} onClose={() => setIsTrackingOpen(false)}  />
      </Modal>
    </div>
  );
};

const SkeletonRow = () => {
  const skeletons = Array(3).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="py-4 border-t border-b text-gray-300 animate-pulse flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          {/* Image Placeholder */}
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gray-200 rounded-sm"></div>
            <div>
              {/* Text placeholders */}
              <div className="h-4 bg-gray-200 rounded-sm w-36 mb-2"></div>
              <div className="flex items-center gap-3">
                <div className="h-4 bg-gray-200 rounded-sm w-16"></div>
                <div className="h-4 bg-gray-200 rounded-sm w-24"></div>
              </div>
              <div className="flex gap-2 mt-2">
                <div className="h-4 bg-gray-200 rounded-sm w-28"></div>
                <div className="h-4 bg-gray-200 rounded-sm w-32"></div>
              </div>
            </div>
          </div>

          {/* Status and Button Placeholder */}
          <div className="md:w-1/2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded-sm w-24"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded-sm w-28"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Order;