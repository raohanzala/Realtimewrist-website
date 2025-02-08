import React from 'react';
import { assets } from '../assets/assets';

const LoadingLogo = () => {
  return (
    <div className="flex items-center justify-center z-[999] fixed inset-0 h-full w-full bg-gray-100">
      <div className="relative w-64 h-64">
        <img
          src={assets.logo2}
          alt="Logo"
          className="w-full h-full object-contain animate-pulse"
        />
        
        {/* <div className='w-full bg-primary-2'><div className='text-xl text-center'>Loading...</div></div> */}
      </div>
    </div>
  );
};

export default LoadingLogo;
