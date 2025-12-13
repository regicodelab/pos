import React, { useState } from 'react'
import SidePanel from '../../components/admin/SidePanel'
import CategoriesSidePanel from '../../components/admin/CategoriesSidePanel'
import { Link } from 'react-router-dom'

const categories = [
  {
    name: 'Hot Drinks',
    icon: '☕',
    path: '/tengrohta'
  },
  {
    name: 'Cold Drinks',
    icon: '🧊',
    path: '/teftohta'
  },
  {
    name: 'Kitchen',
    icon: '🍽️',
    path: '/kuzhina'
  },
  {
    name: 'Promotions',
    icon: '🎉',
    path: '/promocionale'
  },
]

const Products = () => {
  return (
    <div className='flex bg-neutral-50'>
      <SidePanel />

      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <div className='bg-white border-b border-neutral-200 p-8'>
          <h1 className='text-3xl font-bold text-neutral-900'>Products</h1>
          <p className='text-neutral-600 mt-1'>Select a category to manage products</p>
        </div>

        {/* Categories Grid */}
        <div className='flex-1 flex items-center justify-center p-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full'>
            {categories.map((category, idx) => (
              <Link
                key={idx}
                to={category.path}
                className='group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border-2 border-neutral-200 hover:border-active transition-all duration-200 flex flex-col items-center gap-6'
              >
                <div className='w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center group-hover:bg-active-light group-hover:scale-110 transition-all duration-200'>
                  <span className='text-4xl'>{category.icon}</span>
                </div>

                <h2 className='text-2xl font-bold text-neutral-900 group-hover:text-active transition-colors text-center'>
                  {category.name}
                </h2>

                <p className='text-neutral-600 text-sm text-center'>
                  Manage {category.name.toLowerCase()} and pricing
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products