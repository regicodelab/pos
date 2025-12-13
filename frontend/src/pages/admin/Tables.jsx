import { useEffect, useState } from 'react'
import SidePanel from '../../components/admin/SidePanel'
import CustomButton from '../../components/CustomButton'
import { toast } from 'react-hot-toast';
import { fetchTables, createTable } from '../../api/tables';

const TablesAdmin = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const data = await fetchTables();
      setTables(data);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTableData();
  }, []);

  async function addNewTable() {
    try {
      await createTable(tables.length);
      fetchTableData();
      toast.success('Table created successfully');
    } catch (error) {
      toast.error('Failed to create table');
    }
  }

  return (
    <div className='flex bg-neutral-50'>
      <SidePanel />
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <div className='bg-white border-b border-neutral-200 p-8'>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Tables</h1>
              <p className='text-neutral-600 mt-1'>Manage restaurant tables</p>
            </div>
            <CustomButton
              title="+ Add Table"
              onClick={addNewTable}
              variant='success'
            />
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 p-8'>
          {loading ? (
            <div className='flex items-center justify-center h-full'>
              <div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-4 border-active border-t-transparent mx-auto mb-4'></div>
                <p className='text-neutral-600'>Loading tables...</p>
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
              {tables.map((table) => (
                <div 
                  key={table.id} 
                  className='group flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-md border-2 border-neutral-200 hover:border-active hover:shadow-lg transition-all duration-200'
                >
                  <div className='w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-active-light group-hover:scale-110 transition-all duration-200'>
                    <span className='text-3xl'>🪑</span>
                  </div>
                  <h2 className='text-lg font-semibold text-neutral-900'>Table {table.number}</h2>
                  <p className='text-sm text-neutral-500'>Ready to serve</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TablesAdmin