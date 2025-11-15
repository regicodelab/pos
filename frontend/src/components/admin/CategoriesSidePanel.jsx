import React, { useState } from 'react'

const categories = [
    {
        name: 'Te ngohta',
        img: 'https://www.gaggia.com/app/uploads/2021/10/780x520-2.jpg'
    },
    {
        name: 'Te ftohta',
        img: 'https://tiimg.tistatic.com/fp/1/005/740/coca-cola-cold-drink-717.jpg'
    },
    {
        name: 'Kuzhina',
        img: 'https://blog.clover.com/wp-content/uploads/2023/01/staff-cooking-in-restaurant-commercial-kitchen.jpg'
    },
    {
        name: 'Promocionale',
        img: 'https://www.rivercreeresort.com/wp-content/uploads/2024/08/Kitchen-Half-Off-PPT-Internal-july.webp'
    },
]

const CategoriesSidePanel = () => {
    return (
        <div className='w-[130px] h-screen bg-red-700 flex flex-col justify-evenly items-center'>
            {
                categories.map((category, idx) => {
                    return (
                        <div
                            key={idx}
                            className='font-bold text-white hover:text-gray-300 cursor-pointer flex flex-col justify-center items-center'
                        >
                            {category.name}

                            <img
                                className='w-[50px] h-[50px] rounded-full'
                                src={category.img}
                                alt={category.name}
                            />
                        </div>
                    )
                })
            }

        </div>
    )
}

export default CategoriesSidePanel