// components/Layout.js
import React from 'react';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import { useEffect } from 'react';
import CartDrawer from './components/CartDrawer';
import WhatsAppChat from './components/WhatsAppChat'

const AppLayout = ({ children }) => {


  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    // Apply no-scroll class to body when search bar is shown
    if (showSearch) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [showSearch]);


  return (
    <div>
      <Navbar  setShowSearch={setShowSearch} showSearch={showSearch} />
      <CartDrawer />
      {showSearch && <SearchBar  setShowSearch={setShowSearch}/>}

      <div className="pt-[125px] pb-24 overflow-x-hidden w-[100%]">
        <ToastContainer />
        {children}
      </div>
      <WhatsAppChat />   
      <Footer />
    </div>
  );
};

export default AppLayout;
