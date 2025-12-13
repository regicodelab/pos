import React from 'react'
import SidePanel from '../../components/admin/SidePanel'
import CustomButton from '../../components/CustomButton'
import { useEffect } from 'react'
import { fetchProducts, addNewProduct } from '../../api/products';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const categoryData = {
  icon: '🧊',
  name: 'Cold Drinks',
  code: 'ftohta'
}

const TeFtohta = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [newProductsModalOpen, setNewProductsModalOpen] = React.useState(false);
  const [newProductName, setNewProductName] = React.useState('');
  const [newProductPrice, setNewProductPrice] = React.useState(0);
  const [newProductEntrance, setNewProductEntrance] = React.useState(0);
  const [newProductCurrentlyAvailable, setNewProductCurrentlyAvailable] = React.useState(0);

  const fetchProductsData = async () => {
    const data = await fetchProducts(categoryData.code);
    setProducts(data);
  }

  useEffect(()=>{
    fetchProductsData();
  }, []);

  function handleAddNewProduct() {
    setNewProductsModalOpen(true);
  }

  function closeNewProductModal() {
    setNewProductsModalOpen(false);
    setNewProductName('');
    setNewProductPrice(0);
    setNewProductEntrance(0);
    setNewProductCurrentlyAvailable(0);
  }

  async function handleNewProductSave() {
    if (!newProductName || newProductPrice <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await addNewProduct({
        name: newProductName,
        price: newProductPrice,
        category: categoryData.code,
        entrance: newProductEntrance,
        currentlyAvailable: newProductCurrentlyAvailable
      });
      closeNewProductModal();
      fetchProductsData();
      toast.success('Product added successfully');
    } catch (error) {
      toast.error('Failed to add product');
    }
  }


  return (
    <div className='flex bg-neutral-50'>
      <SidePanel />

      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <div className='bg-white border-b border-neutral-200 p-8'>
          <div className="flex items-center justify-between">
            <div className='flex items-center gap-4'>
              <div className='w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center'>
                <span className='text-3xl'>{categoryData.icon}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">{categoryData.name}</h1>
                <p className='text-neutral-600 text-sm mt-1'>Manage products in this category</p>
              </div>
            </div>

            <div className='flex gap-3'>
              <button
                onClick={() => navigate('/products')}
                className='px-4 py-2 rounded-lg border-2 border-active text-active cursor-pointer hover:text-white font-semibold transition-colors'
              >
                ← Back
              </button>
              <CustomButton
                title="+ Add Product"
                variant="success"
                onClick={handleAddNewProduct}
              />
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="bg-white rounded-xl shadow-md border border-neutral-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-100 border-b border-neutral-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">#</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Product Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Stock In</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Available</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {products.map((product, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-neutral-600">{idx + 1}</td>
                      <td className="px-6 py-4 text-sm text-neutral-900 font-medium">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-neutral-700">{product.price.toFixed(2)} ALL</td>
                      <td className="px-6 py-4 text-sm text-neutral-700">{product.entrance}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.currentlyAvailable > 0 ? 'bg-success-light text-success-text' : 'bg-error-light text-error-text'
                        }`}>
                          {product.currentlyAvailable}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {products.length === 0 && (
              <div className="flex items-center justify-center h-64 text-neutral-500">
                No products in this category yet
              </div>
            )}
          </div>
        </div>

        {/* Add Product Modal */}
        {newProductsModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-neutral-200 flex flex-col gap-6">

              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Add New Product</h2>
                <p className="text-neutral-600 text-sm mt-1">{categoryData.name} category</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    className='w-full px-4 py-2.5 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-active transition-colors'
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Price (ALL)</label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    className='w-full px-4 py-2.5 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-active transition-colors'
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Stock In</label>
                  <input
                    type="number"
                    placeholder="Enter stock quantity"
                    className='w-full px-4 py-2.5 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-active transition-colors'
                    value={newProductEntrance}
                    onChange={(e) => setNewProductEntrance(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Currently Available</label>
                  <input
                    type="number"
                    placeholder="Enter available quantity"
                    className='w-full px-4 py-2.5 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-active transition-colors'
                    value={newProductCurrentlyAvailable}
                    onChange={(e) => setNewProductCurrentlyAvailable(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  className="px-4 py-2 text-sm rounded-lg border-2 border-neutral-400 text-neutral-800 hover:bg-neutral-100 transition-colors font-semibold"
                  onClick={closeNewProductModal}
                >
                  Cancel
                </button>

                <CustomButton
                  title="Add Product"
                  variant="success"
                  onClick={handleNewProductSave}
                />
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeFtohta