import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { IoMdCart } from "react-icons/io";
import QuantityInput from "./QuantityInput";
import Button from "./Button";
import { CURRENCY } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  closeCart,
  removeFromCart,
} from "../store/slices/cartSlice";
import { Link, useLocation } from "react-router-dom";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useRemoveFromCart } from "../api/useRemoveFromCart";
import { formatAmount } from "../helpers";

const CartDrawer = () => {
  const { navigate } = useContext(ShopContext);

  const {
    items: cartItems,
    totalItems,
    isCartOpen,
  } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { isPending, removeFromCart: removeFromUserCart } = useRemoveFromCart();

  const location = useLocation();

  useEffect(() => {
    dispatch(closeCart());
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    toast.dismiss();
    if (cartItems.length > 0) {
      navigate("/place-order");
    } else {
      toast.error("Your cart is empty.");
    }
  };

  const handleRemoveFromCart = (itemId) => {
    if(!isPending) dispatch(removeFromCart({ itemId }));
    if (isLoggedIn) {
      removeFromUserCart(itemId);
    }
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 z-[9999] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch(closeCart())}
      />

      <div
        className={`fixed top-0 right-0 shadow-xl sm:max-w-md max-w-[350px] w-full h-screen bg-white z-[9999] transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Your Cart ({totalItems})</h2>
            <button
              onClick={(e) => {dispatch(closeCart()); e.stopPropagation()}}
              className="text-gray-500 hover:text-gray-900"
            >
              <IoCloseSharp size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="py-20 flex gap-1 h-full items-center justify-center text-gray-300">
                <MdRemoveShoppingCart size={30} />

                <p className="text-xl ">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item, index) => {
                return (
                  <div onClick={(e)=>{e.stopPropagation(); navigate(`/product/${item._id}`)} } key={item._id}>
                  <div
                    key={index}
                    className={`p-2 rounded my-3 border text-gray-700 flex relative items-center gap-4 hover:shadow hover:opacity-85 transition-opacity duration-100 cursor-pointer ${isPending ? 'opacity-70 hover:shadow-none hover:cursor-not-allowed' : ''}`}
                  >
                    <img
                      src={item?.images?.[0]}
                      className="w-16 h-16 object-cover rounded"
                      alt={item?.name}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item?.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">
                          {CURRENCY}
                          {formatAmount(item?.newPrice)}
                        </p>
                      </div>
                    </div>
                    <QuantityInput item={item} />
                    <button className="absolute -top-1 -right-1 bg-white ">
                      <ImCancelCircle
                        size={14}
                        className="text-gray-500 hover:text-black"
                        onClick={(e) => {
                          handleRemoveFromCart(item._id);
                          e.stopPropagation()
                        }}
                      />
                    </button>
                  </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="sm:p-4 p-3 border-t mt-auto">
            <CartTotal isHeading={false} />
            <div className="flex sm:gap-4 gap-2 mt-4">
              <Button
                variant="secondary"
                className={`w-full relative`}
                onClick={handleViewCart}
                startIcon={<IoMdCart className="text-xl" />}
              >
                View Cart
                <p className="absolute right-[-5px] -top-1 w-4 text-center leading-4 bg-[red] text-white rounded-full text-[8px]">
                  {totalItems}
                </p>
              </Button>
              <Button
                disabled={cartItems.length === 0}
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
