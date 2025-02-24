import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { useAddUserCart } from "../api/useAddToCart";

const PolicyModal = ({
  isCheckboxChecked,
  setIsModalOpen,
  setIsCheckboxChecked,
  product,
  handleCheckboxChange,
}) => {
  console.log(product);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.user);
  const { userAddCart, isPending } = useAddUserCart();

  const onClose = ()=> {
    setIsModalOpen(false); setIsCheckboxChecked(false);
  }
  

  const handleContinueClick = async () => {
    setIsLoading(true);
    if (isCheckboxChecked) {
      if (isLoggedIn) {
        await userAddCart({ itemId: product._id, item: product, quantity: 1 }, {onSuccess:()=>onClose() });
      } else {
        dispatch(addToCart({ itemId: product._id, item: product, quantity: 1 }));
        onClose()
      }
    } else {
      setIsLoading(false);
      toast.error(
        "Please agree to the terms and conditions before continuing."
      );
    }
  };

  return (
   <div>
      <div className="flex items-center justify-center z-50">
        <div className="w-11/12 max-w-md">
          <h2 className="text-xl font-bold mb-4">Important Information</h2>
          <p className="text-sm text-gray-700">
            Please note that by adding this product to the cart, you are
            agreeing to the following terms:
          </p>
          <ul className="list-disc list-inside mt-4 text-sm text-gray-700">
            <li>This is a 100% original product.</li>
            <li>Cash on delivery is available for this product.</li>
            <li>You can return or exchange this product within 7 days.</li>
          </ul>

          <div className="mt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
              />
              <span className="text-sm text-gray-700">
                I agree to the terms and conditions.
              </span>
            </label>
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <Button onClick={() => setIsModalOpen(false)} variant="cancel">
              Cancel
            </Button>
            <Button
              onClick={handleContinueClick}
              disabled={!isCheckboxChecked}
              variant="secondary"
            >
              {!isPending || !isLoading  ? "Agree & Continue" : <Spinner />}
            </Button>
          </div>
        </div>
      </div>
   </div>
  );
};

export default PolicyModal;
