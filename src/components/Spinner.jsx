import React from 'react'
import { CgSpinner } from 'react-icons/cg'
import { ImSpinner8 } from 'react-icons/im'

const Spinner = ({variant, ...rest}) => {
  return (
    <ImSpinner8 {...rest} className={`animate-spin text-xl ${variant === 'secondary' ? 'text-primary-1' : ''}`} color={variant === 'secondary' ? 'primary-1' : ''} />
  )
}

export default Spinner