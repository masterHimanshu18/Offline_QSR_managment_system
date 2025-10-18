import React, { useState, useEffect } from 'react'
import { Clock, Check, DollarSign, XCircle } from 'lucide-react'
import type { Order } from '../types'
import { useOrders } from '../context/OrderContext'

interface OrderCardProps {
  order: Order
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { updateOrderStatus } = useOrders()
  const [timer, setTimer] = useState(0)
  const [showUnpaidModal, setShowUnpaidModal] = useState(false)
  const [unpaidReason, setUnpaidReason] = useState('')

  useEffect(() => {
    // Only run timer if order is still preparing
    if (order.status !== 'preparing') {
      if (order.preparationTime) {
        setTimer(order.preparationTime)
      }
      return
    }

    const interval = setInterval(() => {
      setTimer(Math.floor((Date.now() - order.createdAt) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [order.createdAt, order.status, order.preparationTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleMarkServed = () => {
    // Save preparation time when marking served
    updateOrderStatus(order.id, 'served', undefined, timer)
  }

  const handleUnpaid = () => {
    if (!unpaidReason.trim()) {
      alert('Please enter a reason')
      return
    }
    updateOrderStatus(order.id, 'unpaid', unpaidReason)
    setShowUnpaidModal(false)
    setUnpaidReason('')
  }

  const getStatusColor = () => {
    switch (order.status) {
      case 'preparing': return 'bg-yellow-100 border-yellow-400'
      case 'served': return 'bg-blue-100 border-blue-400'
      case 'paid': return 'bg-green-100 border-green-400'
      case 'unpaid': return 'bg-red-100 border-red-400'
      default: return 'bg-gray-100 border-gray-400'
    }
  }

  return (
    <>
      <div className={`rounded-lg shadow-md p-4 border-2 ${getStatusColor()} transition`}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-bold text-lg">Order #{order.id}</h4>
            <p className="text-sm text-gray-600">📱 {order.phone}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} />
            <span className="font-mono font-bold">{formatTime(timer)}</span>
            {order.status !== 'preparing' && <span className="text-xs text-gray-500">(prep time)</span>}
          </div>
        </div>

        <div className="mb-3 space-y-1">
          {order.items.map((item, idx) => (
            <div key={idx} className="text-sm">
              <span className="font-medium">{item.menuItem.name} x{item.quantity}</span>
              {item.addOns.length > 0 && (
                <span className="text-gray-600 text-xs ml-2">
                  + {item.addOns.map(a => `${a.addOn.name} x${a.count}`).join(', ')}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="border-t pt-2 mb-3">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span className="text-green-600">₹{order.total}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {order.status === 'preparing' && (
            <button
              onClick={handleMarkServed}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <Check size={18} />
              Mark Served
            </button>
          )}

          {order.status === 'served' && (
            <>
              <button
                onClick={() => updateOrderStatus(order.id, 'paid')}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <DollarSign size={18} />
                Mark Paid
              </button>
              <button
                onClick={() => setShowUnpaidModal(true)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <XCircle size={18} />
                Not Paid
              </button>
            </>
          )}

          {(order.status === 'paid' || order.status === 'unpaid') && (
            <div className="flex-1 text-center py-2 font-bold">
              {order.status === 'paid' ? '✅ Completed' : '❌ Unpaid'}
              {order.unpaidReason && (
                <p className="text-xs text-gray-600 mt-1">Reason: {order.unpaidReason}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {showUnpaidModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Reason for Non-Payment</h3>
            <textarea
              value={unpaidReason}
              onChange={(e) => setUnpaidReason(e.target.value)}
              placeholder="Enter reason..."
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg mb-4 h-24 focus:outline-none focus:border-blue-500"
            />
            <div className="flex gap-3">
              <button
                onClick={handleUnpaid}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
              >
                Submit
              </button>
              <button
                onClick={() => setShowUnpaidModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
