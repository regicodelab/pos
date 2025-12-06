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

    async function handleLogin(){
        if(!username || !password) {
            toast('Please enter both username and password');
            return;
        }

        const token = await loginUser(username, password);
        localStorage.setItem('authToken', token);
        toast.success('Login successful!');

        navigator('/products');
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1543007630-9710e4a00a20?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFyfGVufDB8fDB8fHww')]">
            <div className="w-1/5 h-[300px] rounded-3xl 
                bg-white/20 
                backdrop-blur-md 
                border border-white/30 
                shadow-lg"
            >
                <div className='w-full h-[100px] flex justify-around items-center'>
                    <CustomButton
                        title='Waiter'
                        onClick={() => setRole('waiter')}
                    />
                    <CustomButton
                        title='Admin'
                        onClick={() => setRole('admin')}
                    />
                </div>

                {
                    role == 'admin' ?
                        <div className='w-full flex flex-col justify-center items-center gap-6'>
                            <input
                                type="text"
                                className='w-3/4 h-[45px] bg-gray-300 rounded-2xl p-4'
                                placeholder='Enter your username'
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input
                                type="password"
                                className='w-3/4 h-[45px] bg-gray-300 rounded-2xl p-4'
                                placeholder='Enter your password'
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <CustomButton
                                title='Log in'
                                onClick={handleLogin}
                            />
                        </div>
                        :
                        <div className='w-full flex justify-center items-center mt-12'>
                            <CustomButton
                                title='Open panel'
                                onClick={() => navigator('/waiter/tables')}
                            />
                        </div>
                }

            </div>
        </div>
    )
}

export default Login