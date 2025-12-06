import React from 'react'
import SidePanel from '../../components/admin/SidePanel'
import CustomButton from '../../components/CustomButton'
import { useEffect } from 'react'
import { fetchProducts, addNewProduct } from '../../api/products';
import CategoriesDropdown from '../../components/admin/CategoriesDropdown';

const Kuzhina = () => {
  const [products, setProducts] = React.useState([]);
  const [newProductsModalOpen, setNewProductsModalOpen] = React.useState(false);
  const [newProductName, setNewProductName] = React.useState('');
  const [newProductPrice, setNewProductPrice] = React.useState(0);
  const [newProductEntrance, setNewProductEntrance] = React.useState(0);
  const [newProductCurrentlyAvailable, setNewProductCurrentlyAvailable] = React.useState(0);

  const fetchProductsData = async () => {
    const data = await fetchProducts('kuzhina');
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
  }

  async function handleNewProductSave() {
    await addNewProduct({
      name: newProductName,
      price: newProductPrice,
      category: 'kuzhina',
      entrance: newProductEntrance,
      currentlyAvailable: newProductCurrentlyAvailable
    });

    closeNewProductModal();
    fetchProductsData();
  }

  return (
    <div className='flex'>
      <SidePanel />

      <div className="flex flex-col w-full py-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10 mx-12">
          <h1 className="flex items-center text-2xl font-bold text-gray-800 tracking-tight">
            <img
              src="https://blog.clover.com/wp-content/uploads/2023/01/staff-cooking-in-restaurant-commercial-kitchen.jpg"
              className='w-[100px] h-[100px] rounded-full mx-12'
              alt=""
            />
            <CategoriesDropdown />
          </h1>

          <CustomButton
            title="+ Add New"
            color="green"
            onClick={handleAddNewProduct}
          />
        </div>

        {/* Content Card */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden mx-12">
          <div className="grid grid-cols-5 px-6 py-3 bg-gray-100 text-gray-700 font-medium text-sm border-b">
            <div>#</div>
            <div>Emri</div>
            <div>Cmimi</div>
            <div>Stocku</div>
            <div>Sasia aktuale</div>
          </div>

          <div className="divide-y divide-gray-100">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="grid grid-cols-5 px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <div className="text-gray-500">{idx + 1}</div>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>{product.entrance}</div>
                <div>{product.currentlyAvailable}</div>
              </div>
            ))}
          </div>
        </div>
        
        {newProductsModalOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[350px] p-6 rounded-xl shadow-xl border border-gray-200 flex flex-col gap-4">

            <h2 className="text-lg font-semibold text-gray-800">
              Add new product
            </h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              onChange={(e) => setNewProductName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              onChange={(e) => setNewProductPrice(e.target.value)}
            />

            <input
              type="number"
              placeholder="Entrance"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              onChange={(e) => setNewProductEntrance(e.target.value)}
            />

            <input
              type="number"
              placeholder="Currently Available"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              onChange={(e) => setNewProductCurrentlyAvailable(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                onClick={closeNewProductModal}
              >
                Cancel
              </button>

              <button
                className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
                onClick={handleNewProductSave}
              >
                Save
              </button>
            </div>

          </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default Kuzhina