import React from 'react'
import SidePanel from '../../components/admin/SidePanel'
import { fetchUsersFromAPI } from '../../api/staff';
import { fetchReportFromAPI } from '../../api/reports';
import { addNewOrder } from '../../api/orders';

const Report = () => {
  const [waiters, setWaiters] = React.useState([]);
  const [filters, setFilters] = React.useState({
    waiterId: '',
    startDateTime: '',
    endDateTime: ''
  });
  const [report, setReport] = React.useState({
    orders: [],
    product_sales: {},
    total_products_sold: 0,
    total_amount: 0
  });

  const fetchWaiters = async () => {
    const all_users = await fetchUsersFromAPI();
    const waiters_only = all_users.filter(user => user.role === 'waiter');
    setWaiters(waiters_only);
  }

  React.useEffect(() => {
    fetchWaiters();
  }, [])

  const handleGenerateReport = async () => {
    const reportData = await fetchReportFromAPI(filters);
    setReport(reportData);
  }

  const handleOrderClick = async (order) => {
    const pin = prompt('Admin or Hall Manager PIN required to reverse this order:');
    await addNewOrder({
      waiterPin: pin,
      table: order.table,
      total: -order.total,
      waiterId: order.waiterId,
      waiterName: order.waiterName,
      products: order.products.map(prod => ({
        productId: prod.productId,
        name: prod.name,
        quantity: -prod.quantity,
        price: -prod.price
      }))
    });
  }

  return (
    <div className="flex">
      <SidePanel />
      <div className="w-full p-6 bg-gray-50">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Reports</h1>

        <div className="bg-white p-2 rounded-lg shadow-md mb-2">
          <h2 className="text-xl font-semibold mb-2">Filters</h2>
          <div className="space-y-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="datetime-local"
                  value={filters.startDateTime}
                  onChange={(e) => setFilters({ ...filters, startDateTime: e.target.value })}
                  className="mt-2 block w-full h-10 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="datetime-local"
                  value={filters.endDateTime}
                  onChange={(e) => setFilters({ ...filters, endDateTime: e.target.value })}
                  className="mt-2 block w-full h-10 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className='flex gap-4 items-center justify-between'>
              <select
                className="mt-2 block w-full h-10 border border-gray-300 rounded-md"
                onChange={(e) => setFilters({ ...filters, waiterId: e.target.value })}
              >
                <option value="">Select a waiter</option>
                {waiters.map((waiter) => (
                  <option key={waiter._id} value={waiter._id}>
                    {waiter.first_name} {waiter.last_name}
                  </option>
                ))}
              </select>

            <button
              onClick={handleGenerateReport}
              className="cursor-pointer mt-2 bg-blue-600 text-white w-40 h-10 rounded-md hover:bg-blue-700"
            >
              Generate Report
            </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 px-6 pt-4 mt-2 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Report Results</h2>

          <div>
            <h3 className="text-lg font-semibold">Orders List</h3>
            <div className="space-y-4 overflow-y-auto max-h-80">
              {report.orders.map((order) => (
                <div
                 key={order._id} 
                 className={`p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50 ${order.total < 0 ? 'border-l-4 border-red-500' : ''}`}
                 onClick={() => handleOrderClick(order)}
                 >
                  <p className="text-sm text-gray-600">Order ID: <span className="font-medium">{order._id}</span></p>
                  <p className="text-sm text-gray-600">Total: <span className="font-medium">ALL {order.total.toFixed(2)}</span></p>
                  <p className="text-sm text-gray-600">Created At: <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span></p>
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold">Products:</h4>
                    <div className="space-y-2">
                      {order.products.map((item, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          <p>{item.name} - Quantity: {item.quantity} - Price: ALL {item.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-lg font-semibold">Total Products Sold: <span className="font-normal">{report.total_products_sold}</span></p>
            <p className="text-lg font-semibold">Total Amount: <span className="font-normal">ALL {report.total_amount.toFixed(2)}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
