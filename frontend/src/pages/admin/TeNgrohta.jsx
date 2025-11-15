import React from 'react'
import SidePanel from '../../components/admin/SidePanel'
import CustomButton from '../../components/CustomButton'

const products = [
  {
    name: 'Kafe',
    price: '80',
    supply: 140,
    currentQuantity: 100,
  },
  {
    name: 'Makiato',
    price: '90',
    supply: 120,
    currentQuantity: 60,
  },
  {
    name: 'Kakao',
    price: '120',
    supply: 50,
    currentQuantity: 12,
  }
]

const TeNgrohta = () => {

  function handleAddNewProduct() { }

  return (
    <div className='flex'>
      <SidePanel />

      <div className="flex flex-col w-full px-12 py-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="flex items-center text-2xl font-semibold text-gray-800 tracking-tight">
            <img
              src="https://www.gaggia.com/app/uploads/2021/10/780x520-2.jpg"
              className='w-[100px] h-[100px] rounded-full mx-12'
              alt=""
            />
            Te ngrohta
          </h1>

          <CustomButton
            title="+ Add New"
            color="green"
            onClick={handleAddNewProduct}
          />
        </div>

        {/* Content Card */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-5 px-6 py-3 bg-gray-100 text-gray-700 font-medium text-sm border-b">
            <div>#</div>
            <div>Emri</div>
            <div>Cmimi</div>
            <div>Stocku</div>
            <div>Sasia aktuale</div>
          </div>

          <div className="divide-y divide-gray-100">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="grid grid-cols-5 px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <div className="text-gray-500">{idx + 1}</div>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>{product.supply}</div>
                <div>{product.currentQuantity}</div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default TeNgrohta