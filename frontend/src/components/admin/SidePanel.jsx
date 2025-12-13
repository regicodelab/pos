import React from 'react'
import CustomButton from '../CustomButton'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const tabs = [
    {
        name: 'Products',
        path: '/products',
        icon: '📦'
    },
    {
        name: 'Staff',
        path: '/staff',
        icon: '👥'
    },
    {
        name: 'Tables',
        path: '/tablesadmin',
        icon: '🪑'
    },
    {
        name: 'Report',
        path: '/report',
        icon: '📊'
    },
    {
        name: 'Settings',
        path: '/settings',
        icon: '⚙️'
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
        <div className='w-64 h-screen bg-neutral-800 text-white flex flex-col sticky top-0 shadow-lg'>
            {/* Logo Section */}
            <div className='p-6 border-b border-neutral-700'>
                <div className='w-full h-16 bg-gradient-to-r from-active to-active-light rounded-lg flex items-center justify-center'>
                    <span className='text-2xl font-bold'>POS</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className='flex-1 py-6 px-4 space-y-2'>
                {tabs.map((tab, idx) => (
                    <Link
                        key={idx}
                        to={tab.path}
                        className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-700 transition-all duration-200 text-neutral-100 hover:text-white'
                    >
                        <span className='text-lg'>{tab.icon}</span>
                        <span className='font-medium'>{tab.name}</span>
                    </Link>
                ))}
            </nav>

            {/* Logout Button */}
            <div className='p-4 border-t border-neutral-700'>
                <CustomButton
                    title='Log Out'
                    onClick={handleLogOut}
                    variant='danger'
                    fullWidth
                />
            </div>
        </div>
    )
}

export default SidePanel