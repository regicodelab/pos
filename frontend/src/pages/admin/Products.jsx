import React, { useState } from 'react'
import SidePanel from '../../components/admin/SidePanel'
import CategoriesSidePanel from '../../components/admin/CategoriesSidePanel'
import { Link } from 'react-router-dom'

const categories = [
  {
    name: 'Te ngohta',
    img: 'https://www.gaggia.com/app/uploads/2021/10/780x520-2.jpg',
    path: '/tengrohta'
  },
  {
    name: 'Te ftohta',
    img: 'https://tiimg.tistatic.com/fp/1/005/740/coca-cola-cold-drink-717.jpg',
    path: '/teftohta'
  },
  {
    name: 'Kuzhina',
    img: 'https://blog.clover.com/wp-content/uploads/2023/01/staff-cooking-in-restaurant-commercial-kitchen.jpg',
    path: '/kuzhina'
  },
  {
    name: 'Promocionale',
    img: 'https://www.rivercreeresort.com/wp-content/uploads/2024/08/Kitchen-Half-Off-PPT-Internal-july.webp',
    path: '/promocionale'
  },
]

const Products = () => {
  return (
    <div className='flex'>
      <SidePanel />
      {/* <CategoriesSidePanel /> */}

      <div className='w-full flex flex-col justify-center items-center'>
        <div className='mb-24 w-full flex justify-center items-center text-4xl font-bold'>
          Zgjidh nje kategori
        </div>

        <div className='grid grid-cols-2 gap-36'>
          {
            categories.map((category, idx) => {
              return (
                <Link
                  key={idx}
                  className='bg-gray-700 p-8 rounded-3xl font-bold text-white hover:text-gray-300 cursor-pointer flex flex-col justify-center items-center'
                  to={category.path}
                >
                  <img
                    className='w-[100px] h-[100px] rounded-full mb-12'
                    src={category.img}
                    alt={category.name}
                  />

                  {category.name}
                </Link>
              )
            })
          }
        </div>
      </div>

    </div>
  )
}

export default Products