import { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, setHasSeenModal, showModal } from "../store/slices/whatsappModalSlice";
import Button from "./Button";
import Modal from "./Modal";

const WhatsAppModal = () => {
  const dispatch = useDispatch();
  const { isOpen, hasSeenModal } = useSelector((state) => state.whatsApp);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (!hasSeenModal) {
      setTimeout(() => dispatch(showModal()), 10000); // Show modal after 2 seconds
    }
  }, [hasSeenModal, dispatch]);

  const closeModal = () => {
    dispatch(hideModal());
    if (dontShowAgain) {
      dispatch(setHasSeenModal()); // Prevent future pop-ups
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="bg-white max-w-[400px] ">

        {/* Header */}
        <h2 className="text-xl font-semibold text-gold-1 text-center">Save Our WhatsApp Number!</h2>
        <p className="text-gray-500 text-sm text-center mt-1">
          Get the latest updates & exclusive offers directly on WhatsApp.
        </p>

        {/* WhatsApp Number */}
        <div className="mt-4 flex items-center justify-center gap-3 py-3 px-4 bg-gray-100 rounded-lg">
          <BsWhatsapp size={28} className="text-green-500" />
          <p className="text-lg font-medium text-gold-1">+92 327 8272361</p>
        </div>

        {/* Save Number Reminder */}
        <p className="text-center text-sm text-gray-600 mt-2">
          <span className="font-medium text-gold-1">Please save our number</span> in your contacts to receive updates on our WhatsApp status.
        </p>

        <div className="mt-6 space-y-4">

          {/* Join WhatsApp Channel */}
          <div className="flex items-center gap-4 bg-blue-100 text-blue-800 py-3 px-3 rounded-lg border border-blue-300">
            <BsWhatsapp size={28} className="text-blue-600" />
            <p className="text-sm font-medium">
              <span className="font-semibold">Get the latest updates & exclusive offers!</span>
              <a
                href="https://whatsapp.com/channel/your-channel-link"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-700 hover:underline font-semibold"
              >
                Join our WhatsApp Channel
              </a>
            </p>
          </div>

          {/* View WhatsApp Catalogue */}
          <div className="flex items-center gap-4 bg-yellow-100 text-yellow-800 p-3 rounded-lg border border-yellow-300">
            <BsWhatsapp size={28} className="text-yellow-600" />
            <p className="text-sm font-medium">
              <span className="font-semibold">Explore our full collection:</span>
              <a
                href="https://wa.me/c/923278272361"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-yellow-700 hover:underline"
              >
                Check Our WhatsApp Catalogue
              </a>
            </p>
          </div>
        </div>

        {/* Don't Show Again */}
        <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
          <input
            type="checkbox"
            id="dontShowAgain"
            checked={dontShowAgain}
            onChange={() => setDontShowAgain(!dontShowAgain)}
            className="w-4 h-4 accent-gold-1 cursor-pointer"
          />
          <label htmlFor="dontShowAgain" className="cursor-pointer">Don't show again</label>
        </div>

        {/* Close Button */}
        <Button
          onClick={closeModal}
          variant="cancel"
          className="w-full mt-3"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default WhatsAppModal;
