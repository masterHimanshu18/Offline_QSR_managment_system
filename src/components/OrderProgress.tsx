import React from 'react'
import { useOrders } from '../context/OrderContext'
import { OrderCard } from './OrderCard'

export const OrderProgress: React.FC = () => {
  const { orders } = useOrders()

  const preparingOrders = orders.filter(o => o.status === 'preparing')
  const servedOrders = orders.filter(o => o.status === 'served')
  const completedOrders = orders.filter(o => o.status === 'paid' || o.status === 'unpaid')

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-4 text-white">
          🔥 Preparing ({preparingOrders.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {preparingOrders.length === 0 ? (
            <p className="text-gray-50 col-span-full text-center py-8">No orders being prepared</p>
          ) : (
            preparingOrders.map(order => <OrderCard key={order.id} order={order} />)
          )}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4 text-white">
          🍽️ Served ({servedOrders.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servedOrders.length === 0 ? (
            <p className="text-gray-50 col-span-full text-center py-8">No served orders</p>
          ) : (
            servedOrders.map(order => <OrderCard key={order.id} order={order} />)
          )}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4 text-white">
          ✅ Completed ({completedOrders.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedOrders.length === 0 ? (
            <p className="text-gray-50 col-span-full text-center py-8">No completed orders</p>
          ) : (
            completedOrders.map(order => <OrderCard key={order.id} order={order} />)
          )}
        </div>
      </div>
    </div>
  )
}
