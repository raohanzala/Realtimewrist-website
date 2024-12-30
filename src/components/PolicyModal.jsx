import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import ReactDOM from 'react-dom';
import Button from './Button'
import toast from 'react-hot-toast';

const PolicyModal = ({ isCheckboxChecked, setIsModalOpen, setIsCheckboxChecked, productId, handleCheckboxChange }) => {

  const { addToCart } = useContext(ShopContext)

  const handleContinueClick = () => {
    if (isCheckboxChecked) {
      addToCart(productId);
      setIsModalOpen(false);
      setIsCheckboxChecked(true);
    } else {
      toast.error('Please agree to the terms and conditions before continuing.');
    }
  };

  return ReactDOM.createPortal(
    <div>
      <div
        className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-40"
        onClick={() => setIsModalOpen(false)}
      ></div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded shadow-lg p-8 w-11/12 max-w-md relative">
          <h2 className="text-xl font-bold mb-4">Important Information</h2>
          <p className="text-sm text-gray-700">
            Please note that by adding this product to the cart, you are agreeing to the following terms:
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
              <span className="text-sm text-gray-700">I agree to the terms and conditions.</span>
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant='primary'
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinueClick}
              disabled={!isCheckboxChecked}
              variant='secondary'
              // className={`py-2 px-4 rounded text-white ${isCheckboxChecked ? 'bg-primary ' : 'bg-gray-500 cursor-not-allowed'}`}
            >
              Agree & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default PolicyModal