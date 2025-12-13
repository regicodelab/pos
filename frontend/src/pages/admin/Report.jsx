import React from 'react'
import SidePanel from '../../components/admin/SidePanel'
import CustomButton from '../../components/CustomButton'
import { fetchUsersFromAPI } from '../../api/staff';
import { fetchReportFromAPI } from '../../api/reports';
import { addNewOrder } from '../../api/orders';
import { toast } from 'react-hot-toast';

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
  const [loading, setLoading] = React.useState(false);

  const fetchWaiters = async () => {
    const all_users = await fetchUsersFromAPI();
    const waiters_only = all_users.filter(user => user.role === 'waiter');
    setWaiters(waiters_only);
  }

  React.useEffect(() => {
    fetchWaiters();
  }, [])

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const reportData = await fetchReportFromAPI(filters);
      setReport(reportData);
      toast.success('Report generated successfully');
    } catch (error) {
      toast.error('Failed to generate report');
    } finally {
      setLoading(false);
    }
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
    <div className="flex bg-neutral-50">
      <SidePanel />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className='bg-white border-b border-neutral-200 p-8'>
          <h1 className="text-3xl font-bold text-neutral-900">Sales Report</h1>
          <p className='text-neutral-600 mt-1'>View sales and order analytics</p>
        </div>

        <div className="flex-1 overflow-auto p-8 space-y-6">
          {/* Filters Card */}
          <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Waiter</label>
                <select
                  className="w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent"
                  onChange={(e) => setFilters({ ...filters, waiterId: e.target.value })}
                  value={filters.waiterId}
                >
                  <option value="">All Waiters</option>
                  {waiters.map((waiter) => (
                    <option key={waiter._id} value={waiter._id}>
                      {waiter.first_name} {waiter.last_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Start Date</label>
                <input
                  type="datetime-local"
                  value={filters.startDateTime}
                  onChange={(e) => setFilters({ ...filters, startDateTime: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">End Date</label>
                <input
                  type="datetime-local"
                  value={filters.endDateTime}
                  onChange={(e) => setFilters({ ...filters, endDateTime: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <CustomButton
                title={loading ? 'Generating...' : 'Generate Report'}
                variant="success"
                onClick={handleGenerateReport}
                disabled={loading}
              />
            </div>
          </div>

          {/* Summary Cards */}
          {report.orders.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6">
                <p className="text-neutral-600 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-neutral-900 mt-2">{report.orders.length}</p>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6">
                <p className="text-neutral-600 text-sm font-medium">Total Products Sold</p>
                <p className="text-3xl font-bold text-neutral-900 mt-2">{report.total_products_sold}</p>
              </div>

              <div className="bg-success-light rounded-xl shadow-md border border-success p-6">
                <p className="text-success-text text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-success mt-2">{report.total_amount.toFixed(2)} ALL</p>
              </div>
            </div>
          )}

          {/* Orders Table */}
          {report.orders.length > 0 && (
            <div className="bg-white rounded-xl shadow-md border border-neutral-200 overflow-hidden">
              <div className="p-6 border-b border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-700">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-700">Table</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-700">Waiter</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-700">Items</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-neutral-700">Amount</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-neutral-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {report.orders.map((order, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-neutral-600">{new Date(order.createdAt).toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-neutral-900 font-medium">Table {order.table}</td>
                        <td className="px-6 py-4 text-sm text-neutral-600">{order.waiterName || '-'}</td>
                        <td className="px-6 py-4 text-sm text-neutral-600">{order.products.length} items</td>
                        <td className="px-6 py-4 text-sm text-right font-semibold text-neutral-900">{order.total.toFixed(2)} ALL</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleOrderClick(order)}
                            className="px-3 py-1.5 text-sm rounded-lg bg-error text-white hover:bg-error-dark transition-colors"
                          >
                            Reverse
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Empty State */}
          {report.orders.length === 0 && (
            <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-neutral-200">
              <p className="text-neutral-500 text-lg">Generate a report to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Report