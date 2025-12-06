import { useEffect, useState } from 'react'
import SidePanel from '../../components/admin/SidePanel'
import CustomButton from '../../components/CustomButton'
import { toast } from 'react-hot-toast';
import { fetchTables, createTable } from '../../api/tables';

const TablesAdmin = () => {
  const [tables, setTables] = useState([]);

  const fetchTableData = async () => {
    const data = await fetchTables();
    setTables(data);
  };
  
  useEffect(() => {
    fetchTableData();
  }, []);

  async function addNewTable(tableNumber) {
    await createTable(tableNumber);
    fetchTableData();
    toast.success('Table created successfully');
  }

  return (
    <div className='flex'>
      <SidePanel />
      <div className='w-full py-10'>
        <div className="flex items-center justify-between mb-10 mx-12">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Tables
          </h1>
        </div>

        <div className='mx-12'>
          <CustomButton
            title="Add New Table"
            onClick={() => addNewTable(tables.length)}
          />
        </div>

        <div className='mx-12 mt-8 grid grid-cols-4 gap-6'>
          {tables.map((table) => (
            <div key={table.id} className='border p-4 rounded-lg shadow-sm'>
              <h2 className='text-lg font-semibold mb-2'>Table {table.number}</h2>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default TablesAdmin