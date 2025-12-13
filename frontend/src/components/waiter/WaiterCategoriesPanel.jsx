import React, { isValidElement, useEffect, useState } from 'react'
import { fetchProducts } from '../../api/products';
import CustomButton from '../CustomButton'
import {useNavigate} from 'react-router-dom'
import {addNewOrder} from '../../api/orders'
import {fetchBusinessesFromAPI} from '../../api/business';
import { toast } from 'react-hot-toast';

const categories = [
    { name: 'Hot Drinks', categoryCode: 'ngrohta', icon: '☕' },
    { name: 'Cold Drinks', categoryCode: 'ftohta', icon: '🧊' },
    { name: 'Kitchen', categoryCode: 'kuzhina', icon: '🍽️' },
    { name: 'Promotions', categoryCode: 'promocionale', icon: '🎉' }
]

let currentTime = new Date();

const WaiterCategoriesPanel = ({title, onClick, color}) => {
    const queryParams = new URLSearchParams(window.location.search);
    const tableNumber = queryParams.get('table');
    const navigator = useNavigate();
    const [businessData, setBusinessData] = useState({
        id: '',
        name: '',
        address: '',
        nipt: '',
        wifiPassword: '',
        phoneNumber: '',
        openingHours: '',
        logoUrl: '',
        euroExchangeRate: '',
        moreSettings: false
    });

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
        const waiterPin = prompt('Vendos pinin');
        saveOrderInDb(waiterPin);
    }

    async function fetchBusinessDetails() {
        const data = await fetchBusinessesFromAPI();
        setBusinessData({
            id: data._id,
            name: data.name,
            address: data.address,
            nipt: data.nipt,
            wifiPassword: data.wifi,
            phoneNumber: data.phone,
            openingHours: data.opening_hours,
            logoUrl: data.logo_url,
            euroExchangeRate: data.euro_exchange_rate,
            moreSettings: data.more_settings
        });
    }

    useEffect(() => {
        fetchBusinessDetails();
    }, []);

    function handleInvoicePrint(savedOrder) {
        toast('Printing invoice...');
        let qrCode;

        if(businessData.moreSettings){
            qrCode = "Linku tatimeve";
        }else{
            qrCode = "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg";
        }
        

        const invoiceWindow = window.open('', 'Print Invoice', 'width=300,height=800');
        invoiceWindow.document.write('<html><head><title>Invoice</title></head><body style="display: flex; flex-direction: column; align-items: center; justify-content:center; font-family: Arial, sans-serif;">');
        invoiceWindow.document.write('<h1>Invoice #' + savedOrder._id.slice(20, 25) + '</h1>');
        invoiceWindow.document.write('<p>' + businessData.address + '</p>');
        invoiceWindow.document.write('<p>' + businessData.nipt + '</p>');
        invoiceWindow.document.write('<p>Date: ' + new Date(savedOrder.createdAt).toLocaleString() + '</p>');
        invoiceWindow.document.write('<table border="1" cellpadding="5" cellspacing="0"><tr><th>Item</th><th>Quantity</th><th>Price</th></tr>');
        savedOrder.products.forEach(item => {
            invoiceWindow.document.write('<tr><td>' + item.name + '</td><td>' + item.quantity + '</td><td>' + item.price.toFixed(2) + '</td></tr>');
        });
        invoiceWindow.document.write('</table>');
        invoiceWindow.document.write('<p>Total before VAT: ' + savedOrder.total * 0.8 + '</p>');
        invoiceWindow.document.write('<p>VAT: ' + savedOrder.total * 0.2 + '</p>');
        invoiceWindow.document.write('<h3>Total after VAT: ' + savedOrder.total + '</h3>');
        invoiceWindow.document.write('<img src="' + qrCode +  '" width="100px" height="100px">');
        invoiceWindow.window.write('<p>Thank you!</p>');
        invoiceWindow.document.write('</body></html>');
        invoiceWindow.document.close();
        invoiceWindow.print();
    }

    const saveOrderInDb = async (waiterPin) =>{
        const savedOrder = await addNewOrder({
            waiterPin: waiterPin,
            table: invoice.table,
            total: invoice.total,
            products: invoice.products
        });

        if(!savedOrder || savedOrder.error || !savedOrder._id){
            return;
        }

        handleInvoicePrint(savedOrder);
        navigator('/waiter/tables');
    }

    return (
        <div className='w-full h-screen flex bg-neutral-50'>

            {/* Categories & Products Section */}
            <div className='flex-1 flex overflow-hidden'>
                {/* Category Sidebar */}
                <div className='w-24 bg-neutral-800 text-white flex flex-col border-r border-neutral-300'>
                    {categories.map((category, idx) => {
                        const isPromoDisabled = category.categoryCode === 'promocionale' && 
                            !(currentTime.getHours() >= 6 && currentTime.getHours() < 10);
                        
                        return (
                            <button
                                key={idx}
                                onClick={() => !isPromoDisabled && setSelectedCategory(category.categoryCode)}
                                disabled={isPromoDisabled}
                                className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 border-b border-neutral-700 transition-all duration-200 ${
                                    selectedCategory === category.categoryCode
                                        ? 'bg-active text-white'
                                        : 'hover:bg-neutral-700'
                                } ${isPromoDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                                title={isPromoDisabled ? 'Available after 6 AM' : category.name}
                            >
                                <span className='text-3xl'>{category.icon}</span>
                                <span className='text-xs text-center px-1'>{category.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Products Grid */}
                <div className='flex-1 overflow-y-auto p-6'>
                    {selectedCategory ? (
                        <div>
                            <h2 className='text-2xl font-bold text-neutral-900 mb-6'>
                                {categories.find(c => c.categoryCode === selectedCategory)?.name}
                            </h2>
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                                {products.map((product, idx) => {
                                    const categoryIcon = categories.find(c => c.categoryCode === selectedCategory)?.icon || '🍴';
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => {
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
                                            className='group flex flex-col items-center justify-center gap-3 p-4 bg-white rounded-xl border-2 border-neutral-200 hover:border-active hover:shadow-lg transition-all duration-200 text-center'
                                        >
                                            <div className='w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-active-light transition-colors'>
                                                <span className='text-2xl'>{categoryIcon}</span>
                                            </div>
                                            <h3 className='text-sm font-semibold text-neutral-900 line-clamp-2'>{product.name}</h3>
                                            <p className='text-lg font-bold text-active'>{product.price.toFixed(2)} ALL</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className='flex items-center justify-center h-full'>
                            <p className='text-neutral-500 text-lg'>Select a category to get started</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Invoice Section */}
            <div className="w-80 bg-white border-l border-neutral-300 flex flex-col overflow-hidden">
                {/* Header */}
                <div className='bg-gradient-to-r from-neutral-800 to-neutral-700 text-white p-6'>
                    <h1 className="text-2xl font-bold">Invoice</h1>
                    <p className="text-neutral-300 mt-1">Table {invoice.table}</p>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {groupedProducts.length > 0 ? (
                        groupedProducts.map((item, idx) => (
                            <div key={idx} className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-medium text-neutral-900 text-sm">{item.name}</span>
                                    <span className="text-lg font-bold text-neutral-700">{item.total.toFixed(2)}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleDecrease(item.productId)}
                                            className="w-6 h-6 flex items-center justify-center bg-error hover:bg-error-dark text-white rounded text-sm font-bold transition-colors"
                                        >
                                            −
                                        </button>

                                        <span className="text-sm font-semibold w-6 text-center text-neutral-700">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => handleIncrease(item.productId)}
                                            className="w-6 h-6 flex items-center justify-center bg-success hover:bg-success-dark text-white rounded text-sm font-bold transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="text-xs text-neutral-600">{item.price.toFixed(2)} each</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full text-neutral-400">
                            <p className="text-center text-sm">No items added yet</p>
                        </div>
                    )}
                </div>

                {/* Total & Action */}
                <div className="border-t border-neutral-300 p-4 space-y-4">
                    <div className="bg-neutral-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <span className="text-neutral-700 font-medium">Total:</span>
                            <span className="text-2xl font-bold text-active">{invoice.total.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">ALL</p>
                    </div>

                    {invoice.products.length > 0 && (
                        <CustomButton
                            title='Print Invoice'
                            onClick={handleInvoiceSave}
                            variant='success'
                            fullWidth
                        />
                    )}
                    
                    <button
                        onClick={() => navigator('/waiter/tables')}
                        className='w-full px-4 py-2 rounded-lg border-2 border-neutral-300 text-neutral-700 cursor-pointer font-medium transition-colors'
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WaiterCategoriesPanel
