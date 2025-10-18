import React, { useState } from 'react'
import { BarChart3, Download, Filter } from 'lucide-react'
import { useOrders } from '../context/OrderContext'
import { exportOrdersAsJSON, exportOrdersAsCSV } from '../utils/storage'

export const Reports: React.FC = () => {
  const { orders } = useOrders()
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all')

  const filteredOrders = orders.filter(order => {
    if (filter === 'paid') return order.paid
    if (filter === 'unpaid') return !order.paid
    return true
  })

  const totalRevenue = orders.filter(o => o.paid).reduce((sum, o) => sum + o.total, 0)
  const totalOrders = orders.length
  const paidOrders = orders.filter(o => o.paid).length
  const unpaidOrders = orders.filter(o => !o.paid).length

  const formatPrepTime = (seconds?: number) => {
    if (!seconds) return 'N/A'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex items-center gap-2 text-white">
          <BarChart3/>
          Reports
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total Orders</p>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Paid Orders</p>
          <p className="text-3xl font-bold text-green-600">{paidOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm">Unpaid Orders</p>
          <p className="text-3xl font-bold text-red-600">{unpaidOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold text-purple-600">₹{totalRevenue}</p>
        </div>
      </div>

        <div className="flex gap-2">
            <button
            onClick={() => exportOrdersAsJSON()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg flex items-center gap-2 transition"
            >
            <Download size={18} />
            Export JSON
            </button>
            <button
            onClick={() => exportOrdersAsCSV()}
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-2 transition"
            >
            <Download size={18} />
            Export CSV
            </button>
        </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4 mb-4">
          <Filter size={20} />
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'paid' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Paid Only
            </button>
            <button
              onClick={() => setFilter('unpaid')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'unpaid' ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Unpaid Only
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Phone/Name</th>
                <th className="px-4 py-2 text-left">Order_Items Detail</th>
                <th className="px-4 py-2 text-left">Prep Time</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-bold">#{order.id}</td>
                  <td className="px-4 py-2">{order.phone}</td>
                  <td className="px-4 py-2 text-sm">
                    {order.items.map(item => {
                      let itemStr = `${item.menuItem.name} x${item.quantity}`
                      if (item.addOns.length > 0) {
                        itemStr += ` (+ ${item.addOns.map(a => `${a.addOn.name} x${a.count}`).join(', ')})`
                      }
                      return itemStr
                    }).join(' | ')}
                  </td>
                  <td className="px-4 py-2 font-mono text-sm">{formatPrepTime(order.preparationTime)}</td>
                  <td className="px-4 py-2 font-bold text-green-600">₹{order.total}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.paid
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.paid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
