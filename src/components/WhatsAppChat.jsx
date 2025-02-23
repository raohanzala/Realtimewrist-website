import React, { useState } from 'react';

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 flex items-center justify-center z-50">
    {/* Ping Effect */}
    <div className="absolute bottom-0 right-0 h-14 w-14 rounded-full bg-green-500 opacity-75 animate-ping"></div>

    {/* WhatsApp Button */}
    <button
      onClick={toggleChat}
      className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-xl transition-transform transform hover:scale-110 hover:rotate-12 hover:shadow-2xl"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp Chat"
        className="w-8 h-8"
      />
    </button>

      {isOpen && (
        <div
          className={`fixed bottom-20 right-5 bg-white w-72 shadow-xl rounded-lg z-50 overflow-hidden border-gray-200 transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Chat with Us</h3>
              <p className="text-sm">We typically reply within a few minutes</p>
            </div>
            <button onClick={toggleChat} className="text-white text-2xl -translate-y-4 hover:scale-125 transition-transform">&times;</button>
          </div>

          {/* Chat Body */}
          <div className="p-4">
            <p className="text-sm mb-3">Hi there! 👋<br />How can we help you today?</p>

            <a
              href="https://wa.me/923278272361?text=Hi!%20I%20need%20help%20with%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2 rounded-lg mt-3 hover:bg-green-700 transition-transform transform hover:scale-105"
            >
              Start Chat
            </a>
          </div>

          {/* Footer */}
          <div className="p-3 text-center bg-gray-100 text-xs text-gray-500">
            Powered by <span className='font-semibold'>Realtime Wrist</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChat;
