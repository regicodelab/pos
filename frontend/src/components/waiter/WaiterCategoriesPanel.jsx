import React, { isValidElement, useEffect, useState } from 'react'
import { fetchProducts } from '../../api/products';
import CustomButton from '../CustomButton'
import {useNavigate} from 'react-router-dom'
import {addNewOrder} from '../../api/orders'

const categories = [
    { name: 'Te ngrohta', categoryCode: 'ngrohta' },
    { name: 'Te ftohta', categoryCode: 'ftohta' },
    { name: 'Kuzhina', categoryCode: 'kuzhina' },
    { name: 'Promocione', categoryCode: 'promocionale' }
]

let currentTime = new Date();

const WaiterCategoriesPanel = ({title, onClick, color}) => {
    const queryParams = new URLSearchParams(window.location.search);
    const tableNumber = queryParams.get('table');
    const navigator = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);

    const [invoice, setInvoice] = useState({
        table: tableNumber,
        products: [],
        total: 0
    });

    async function fetchProductsByCategory(categoryCode) {
        const data = await fetchProducts(categoryCode);
        setProducts(data);
    }

    useEffect(() => {
        if(selectedCategory === '') return;
        fetchProductsByCategory(selectedCategory);
    }, [selectedCategory]);

    const groupedProducts = invoice.products.reduce((acc, item) => {
        const existing = acc.find(p => p.productId === item.productId);
        if (existing) {
            existing.quantity += item.quantity;
            existing.total = existing.quantity * existing.price;
        } else {
            acc.push({ ...item, total: item.quantity * item.price });
        }
        return acc;
    }, []);

    const handleIncrease = (id) => {
        const newInvoice = { ...invoice };
        const item = newInvoice.products.find(p => p.productId === id);
        newInvoice.products.push({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: 1
        });
        newInvoice.total += item.price;
        setInvoice(newInvoice);
    };

    const handleDecrease = (id) => {
        const newInvoice = { ...invoice };
        const index = newInvoice.products.findIndex(p => p.productId === id);
        if (index !== -1) {
            const price = newInvoice.products[index].price;
            newInvoice.products.splice(index, 1);
            newInvoice.total -= price;
        }
        setInvoice(newInvoice);
    };

    const handleInvoiceSave = async () => {
        await addNewOrder({
            table: invoice.table,
            total: invoice.total,
            products: invoice.products
        });

        navigator('/waiter/tables');
    }

    return (
        <div className='w-full flex'>

            <div className='w-1/2 h-screen bg-gray-700 flex justify-between items-center'>
                <div className='flex flex-col justify-around items-center h-full w-1/3 border-r-2 border-gray-500'>
                    {categories.map((category, idx) => (
                        <div
                            key={idx}
                            className={`text-4xl hover:text-gray-300 cursor-pointer my-4 border-b-2 border-gray-500 pb-2 ${selectedCategory === category.categoryCode ? 'text-red-600' : 'text-white'}`}
                            onClick={()=> setSelectedCategory(category.categoryCode)}
                        >
                            {
                                category.categoryCode === 'promocionale' ? 

                                    currentTime.getHours() >= 6 && currentTime.getHours() < 10 ? 
                                    '' :
                                    <div className='flex w-full justify-between'>
                                        <img width={50} height={50} src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Fig._29_-_Divieto_di_accesso_-_1959.svg" alt="" />
                                        <img 
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGQARYK9tpBfHq10xo_CsQZ7lnVgJaOh2WkA&s" 
                                            alt="" 
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                : ''
                            }
                            {category.name}
                        </div>
                    ))}
                </div>

                <div className='flex flex-col text-black justify-around items-center h-full w-2/3 bg-blue-400 px-8'>
                    {products.map((product, idx) => (
                        <div
                            key={idx}
                            className='text-4xl hover:text-gray-300 cursor-pointer my-4 border-b-2 border-gray-500 pb-2'
                            onClick={()=> {
                                const newInvoice = {...invoice};
                                newInvoice.products.push({
                                    productId: product._id,
                                    name: product.name,
                                    price: product.price,
                                    quantity: 1
                                });
                                newInvoice.total = newInvoice.total + product.price;
                                setInvoice(newInvoice);
                            }}
                        >
                            {product.name}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-100 p-6 w-1/2">
                <h1 className="text-3xl font-bold mb-6">Invoice: Table {invoice.table}</h1>

                <div className="space-y-4">
                    {groupedProducts.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-3 rounded shadow">
                            <div className="text-xl flex-1">{item.name}</div>

                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => handleDecrease(item.productId)}
                                    className="text-2xl font-bold px-3 cursor-pointer"
                                >
                                    -
                                </button>

                                <span className="text-xl font-semibold w-6 text-center">
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() => handleIncrease(item.productId)}
                                    className="text-2xl font-bold px-3 cursor-pointer"
                                >
                                    +
                                </button>
                            </div>

                            <div className="text-xl font-semibold w-24 text-right">
                                {item.total} ALL
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-right mt-6 text-2xl font-bold">
                    Total: {invoice.total} ALL
                </div>

                {
                    invoice.products.length > 0 ? 
                        <CustomButton
                            title='Printo faturen'
                            onClick={handleInvoiceSave}
                        />
                    : ''
                }
            </div>
        </div>
    )
}

export default WaiterCategoriesPanel
