import React from 'react'
import CustomButton from '../CustomButton'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const tabs = [
    {
        name: 'Products',
        path: '/products'
    },
    {
        name: 'Staff',
        path: '/staff'
    },
    {
        name: 'Tables',
        path: '/tablesadmin'
    },
    {
        name: 'Report',
        path: '/report'
    },
    {
        name: 'Settings',
        path: '/settings'
    },
]

const SidePanel = () => {
    const navigation = useNavigate()

    if (!localStorage.getItem('authToken')) {
        navigation('/');
        toast.error('Please log in to access the admin panel.');
    }

    function handleLogOut() {
        localStorage.removeItem('authToken');
        navigation('/');
        toast.success('Logged out successfully.');
    }

    return (
        <div className='w-1/5 h-screen bg-gray-700 flex flex-col justify-around items-center'>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Y_3YVd32BYixRwRItDgas63OTEPtaGKbtA&s"
                className='w-[100px] h-[100px] bg-cover bg-center'
                alt="Bar logo"
            />

            {
                tabs.map((tab, idx) => {
                    return (
                        <Link
                            key={idx}
                            className='text-4xl text-white hover:text-gray-300 cursor-pointer'
                            to={tab.path}
                        >
                            {tab.name}
                        </Link>
                    )
                })
            }

            <div
                className='w-full h-[200px]'
            ></div>

            <CustomButton
                title='Log out'
                onClick={handleLogOut}
            />
        </div>
    )
}

export default SidePanel