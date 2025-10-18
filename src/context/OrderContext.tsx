import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Order, OrderItem, AddOnCount } from '../types'
import { getTodayOrders, saveTodayOrders, getNextOrderId } from '../utils/storage'

interface OrderContextType {
  orders: Order[]
  addOrder: (phone: string, items: OrderItem[]) => void
  updateOrderStatus: (orderId: number, status: Order['status'], unpaidReason?: string, preparationTime?: number) => void
  currentOrder: OrderItem[]
  setCurrentOrder: React.Dispatch<React.SetStateAction<OrderItem[]>>
  calculateTotal: (items: OrderItem[]) => number
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([])
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([])

  // Load orders on mount
  useEffect(() => {
    console.log('🔄 Loading orders from localStorage...')
    const todayOrders = getTodayOrders()
    console.log('✅ Loaded orders:', todayOrders)
    setOrders(todayOrders)
  }, [])

  // Save orders whenever they change
  useEffect(() => {
    if (orders.length > 0) {
      console.log('💾 Saving orders to localStorage:', orders)
      saveTodayOrders(orders)
      console.log('✅ Orders saved successfully')
    }
  }, [orders])

  const calculateTotal = (items: OrderItem[]): number => {
    return items.reduce((total, item) => {
      const itemTotal = item.menuItem.price * item.quantity
      const addOnsTotal = item.addOns.reduce((sum, addOn: AddOnCount) =>
        sum + (addOn.addOn.price * addOn.count), 0)
      return total + itemTotal + addOnsTotal
    }, 0)
  }

  const addOrder = (phone: string, items: OrderItem[]) => {
    const newOrder: Order = {
      id: getNextOrderId(),
      phone,
      items,
      status: 'preparing',
      paid: false,
      total: calculateTotal(items),
      createdAt: Date.now()
    }
    console.log('➕ Adding new order:', newOrder)
    setOrders(prev => [...prev, newOrder])
    setCurrentOrder([])
  }

  const updateOrderStatus = (orderId: number, status: Order['status'], unpaidReason?: string, preparationTime?: number) => {
    console.log(`🔄 Updating order ${orderId} to status: ${status}`)
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updated: Order = { ...order, status }
        
        if (status === 'served') {
          updated.servedAt = Date.now()
          if (preparationTime !== undefined) {
            updated.preparationTime = preparationTime
          }
        }
        
        if (status === 'paid') {
          updated.paid = true
          updated.paidAt = Date.now()
        }
        
        if (status === 'unpaid' && unpaidReason) {
          updated.unpaidReason = unpaidReason
        }
        
        return updated
      }
      return order
    }))
  }

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      currentOrder,
      setCurrentOrder,
      calculateTotal
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider')
  }
  return context
}
