import React from 'react'
import { ImSpinner8 } from 'react-icons/im'

const Spinner = ({variant, size = 20, ...rest}) => {
  return (
    <ImSpinner8 {...rest} size={size} className={`animate-spin text-xl ${variant === 'secondary' ? 'text-primary-1' : ''}`} color={variant === 'secondary' ? 'primary-1' : ''} />
  )
}

export default Spinner