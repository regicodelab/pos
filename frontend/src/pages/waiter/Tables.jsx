import React, { useEffect, useState } from 'react'
import { fetchTables } from '../../api/tables';
import { useNavigate } from 'react-router-dom';

const Tables = () => {
    const navigate = useNavigate();
    const [tables, setTables] = useState([]);

    const fetchTablesData = async () => {
        const data = await fetchTables();
        setTables(data);
    }

    useEffect(() => {
        fetchTablesData();
    }, []);

    const handleTableClick = (tableNumber) => {
        navigate(`/waiter/order?table=${tableNumber}`);
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div>
                    <div
                        className='border p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-lg flex flex-col items-center'
                        onClick={()=>{handleTableClick(0)}}
                    >
                        <h2 className='text-lg font-semibold mb-2'>STAFF</h2>
                        <img
                            src="https://media.istockphoto.com/id/913547020/vector/table-and-chairs-icon.jpg?s=612x612&w=0&k=20&c=vcV8Ah5AWR7S4gtqaw1jaqMOT-GEsgEBY_0eOAF0CFQ="
                            width={130}
                            height={130}
                        />
                    </div>

                <div className='mx-12 mt-8 grid grid-cols-5 gap-6'>
                {tables.slice(1).map((table, idx) => (
                    <div
                        key={idx}
                        className='border p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-lg flex flex-col items-center'
                        onClick={()=>{handleTableClick(table.number)}}
                    >
                                <h2 className='text-lg font-semibold mb-2'>Table {table.number}</h2>
                                <img
                                    src="https://media.istockphoto.com/id/913547020/vector/table-and-chairs-icon.jpg?s=612x612&w=0&k=20&c=vcV8Ah5AWR7S4gtqaw1jaqMOT-GEsgEBY_0eOAF0CFQ="
                                    width={130}
                                    height={130}
                                />
                    </div>
                ))}
                </div>

            </div>
        </div>
    )
}

export default Tables