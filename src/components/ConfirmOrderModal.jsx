import React from 'react'
import Modal from './Modal'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const ConfirmOrderModal = () => {
  return (
    <Modal isOpen={true} className="order-success-modal">
          <div className="flex justify-center items-center flex-col  text-center">
          <AiFillCheckCircle className="text-green-500 w-14 h-14 mb-4" />
          <h2 className="text-gray-900 text-2xl font-semibold mb-2">
            Order Successful
          </h2>
          <p className="text-gray-700 text-lg mb-3">
            Thank you for your purchase!
          </p>
          <p className="text-gray-600 text-sm mb-4">
            We will confirm your order on WhatsApp at:
            <br />
            <span className="font-medium">032492218933</span>
          </p>
          <Link 
            to={'/orders'} 
            className="text-primary-1 font-medium underline hover:text-primary-2 transition-colors"
          >
            View my orders
          </Link>
        </div>
        </Modal>
  )
}

export default ConfirmOrderModal