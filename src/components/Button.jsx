import React from 'react'

const Button = ({ children, startIcon, variant = 'primary', ...rest }) => {

  const baseStyles = 'flex items-center text-nowrap justify-center rounded-sm disabled:cursor-not-allowed text-sm py-2 px-4 space-x-2 transition-all  sm:min-w-[160px] min-w-[120px]'

  const variantStyles = {
    primary: 'bg-dark-2 text-white hover:bg-dark-1',
    primaryBig: 'bg-dark-2 text-white hover:bg-dark-1 py-3 px-8 uppercase',
    secondary : 'bg-primary-1 hover:bg-primary-2 text-[#fff] disabled:opacity-75',
    cancel: 'bg-white border-2 border-[#cccc] text-dark-3 min-w-[80px]',
  }

  return (
    <button
    {...rest}
      className={`${baseStyles} ${variantStyles[variant]} ${rest.className}`}
      >
      {startIcon && <span className='mr-2'>{startIcon}</span>} 
        {children}
    </button>
  )
}

export default Button