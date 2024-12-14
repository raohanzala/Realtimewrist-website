import React from "react";

function LoadingSpinner({ className, color = '#e2c765', type, ...rest }) {
  return (
    <div className={` w-full h-full flex justify-center z-50 items-center ${type === 'full' && 'bg-[rgba(0,0,0,0.3)] fixed inset-0 backdrop-blur '} `}>
        <div className={`size-10 border-4 border-primary border-solid rounded-full animate-spin border-t-transparent ${className} ${color && `border-${color}`}`} {...rest}></div>
    </div>
  );
}

export default LoadingSpinner;
