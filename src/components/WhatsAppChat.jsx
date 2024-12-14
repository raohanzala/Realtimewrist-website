import React, { useState } from 'react';

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* 🔥 Floating WhatsApp Icon */}
      <button 
        onClick={toggleChat} 
        className="fixed bottom-5 right-5 z-50 bg-gradient-to-r from-green-400 to-green-600 p-3 rounded-full shadow-xl hover:scale-110 transition-transform transform hover:rotate-12 hover:shadow-2xl"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp Chat" 
          className="w-9 h-9 animate-pulse" 
        />
      </button>

      {/* 🔥 Popup Chat Window */}
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
            <button onClick={toggleChat} className="text-white text-2xl hover:scale-125 transition-transform">&times;</button>
          </div>

          {/* Chat Body */}
          <div className="p-4">
            <p className="text-sm mb-3">Hi there! 👋<br/>How can we help you today?</p>
            
            <a 
              href="https://wa.me/923001234567?text=Hi!%20I%20need%20help%20with%20your%20products." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2 rounded-lg mt-3 hover:bg-green-700 transition-transform transform hover:scale-105"
            >
              Start Chat
            </a>
          </div>

          {/* Footer */}
          <div className="p-3 text-center bg-gray-100 text-xs text-gray-500">
            Powered by Realtime Wrist
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChat;
