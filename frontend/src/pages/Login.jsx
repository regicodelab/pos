import React, { useState } from 'react'
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { toast } from 'react-hot-toast';

const Login = () => {
    const navigator = useNavigate();
    const [role, setRole] = useState('waiter');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin(){
        if(!username || !password) {
            toast.error('Please enter both username and password');
            return;
        }

        setLoading(true);
        try {
            const token = await loginUser(username, password);
            localStorage.setItem('authToken', token);
            toast.success('Login successful!');
            navigator('/products');
        } catch (error) {
            toast.error('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-neutral-100 to-neutral-200">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-active to-active-light p-8">
                        <h1 className="text-3xl font-bold text-white text-center">POS System</h1>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {/* Role Selection */}
                        <div className="mb-8">
                            <p className="text-sm font-medium text-neutral-600 mb-3">Select Role</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setRole('waiter')}
                                    className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                                        role === 'waiter'
                                            ? 'bg-active text-white shadow-lg'
                                            : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                                    }`}
                                >
                                    Waiter
                                </button>
                                <button
                                    onClick={() => setRole('admin')}
                                    className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                                        role === 'admin'
                                            ? 'bg-active text-white shadow-lg'
                                            : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                                    }`}
                                >
                                    Admin
                                </button>
                            </div>
                        </div>

                        {/* Admin Login Form */}
                        {role === 'admin' && (
                            <div className='space-y-4'>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className='w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent transition-all'
                                        placeholder='Enter your username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className='w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent transition-all'
                                        placeholder='Enter your password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>

                                <CustomButton
                                    title={loading ? 'Logging in...' : 'Log in'}
                                    onClick={handleLogin}
                                    variant='primary'
                                    disabled={loading}
                                    fullWidth
                                />
                            </div>
                        )}

                        {/* Waiter Quick Access */}
                        {role === 'waiter' && (
                            <div className="py-8">
                                <p className="text-center text-neutral-600 mb-6 text-sm">
                                    Access waiter panel without login
                                </p>
                                <CustomButton
                                    title='Open Panel'
                                    onClick={() => navigator('/waiter/tables')}
                                    variant='primary'
                                    fullWidth
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login