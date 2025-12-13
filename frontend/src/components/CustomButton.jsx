import React from 'react'

const CustomButton = ({ title, onClick, variant = 'primary', disabled = false, fullWidth = false }) => {
  const baseStyles = 'flex items-center justify-center px-4 py-2.5 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-active text-active-text hover:bg-active-light focus:ring-active-light',
    secondary: 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 focus:ring-neutral-300',
    success: 'bg-green-600 text-white hover:bg-success-dark focus:ring-success',
    danger: 'bg-error text-white hover:bg-error-dark focus:ring-error',
    warning: 'bg-warning text-white hover:bg-warning-dark focus:ring-warning',
    outline: 'border-2 border-active text-active hover:bg-active-light hover:text-active-text focus:ring-active-light',
  }

  const widthStyle = fullWidth ? 'w-full' : 'w-auto'
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthStyle}`}
    >
      {title}
    </button>
  )
}

export default CustomButton