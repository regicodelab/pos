import React, { useEffect, useState } from 'react'
import { fetchTables } from '../../api/tables';
import { useNavigate } from 'react-router-dom';

const Tables = () => {
    const navigate = useNavigate();
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTablesData = async () => {
        setLoading(true);
        try {
            const data = await fetchTables();
            setTables(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTablesData();
    }, []);

    const handleTableClick = (tableNumber) => {
        navigate(`/waiter/order?table=${tableNumber}`);
    }

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-neutral-50">
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-4 border-active border-t-transparent mx-auto mb-4'></div>
                    <p className='text-neutral-600'>Loading tables...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-neutral-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className='text-4xl font-bold text-neutral-900 mb-2'>Select a Table</h1>
                    <p className='text-neutral-600'>Choose a table to place an order</p>
                </div>

                {/* Staff Button */}
                <div className='mb-8'>
                    <button
                        onClick={() => handleTableClick(0)}
                        className='group flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-md hover:shadow-xl border-2 border-neutral-200 hover:border-warning transition-all duration-200 cursor-pointer'
                    >
                        <div className='w-24 h-24 bg-warning-light rounded-full flex items-center justify-center group-hover:bg-warning group-hover:scale-110 transition-all duration-200'>
                            <span className='text-4xl'>👨‍💼</span>
                        </div>
                        <h2 className='text-2xl font-bold text-neutral-900'>STAFF</h2>
                    </button>
                </div>

                {/* Tables Grid */}
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {tables.slice(1).map((table, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleTableClick(table.number)}
                            className='group flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-md hover:shadow-lg border-2 border-neutral-200 hover:border-active transition-all duration-200'
                        >
                            <div className='w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center group-hover:bg-active group-hover:scale-110 transition-all duration-200'>
                                <span className='text-3xl group-hover:text-white'>🪑</span>
                            </div>
                            <h2 className='text-lg font-semibold text-neutral-900 group-hover:text-active transition-colors'>
                                Table {table.number}
                            </h2>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tables