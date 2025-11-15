import React from 'react'

const CustomButton = ({title, onClick, color}) => {
  return (
    <div
      style={{
        backgroundColor: color ? color : ''
      }}
      className='flex items-center justify-center w-[120px] h-[45px] cursor-pointer bg-red-900 text-white hover:bg-gray-700 rounded-2xl p-2 font-semibold'
      onClick={onClick}
    >
        {title}
    </div>
  )
}

export default CustomButton