import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Order, OrderItem, AddOnCount } from '../types'
import { getTodayOrders, saveTodayOrders, getNextOrderId } from '../utils/storage'

interface OrderContextType {
  orders: Order[]
  addOrder: (phone: string, items: OrderItem[]) => void
  updateOrderStatus: (orderId: number, status: Order['status'], unpaidReason?: string, preparationTime?: number) => void
  markOrderItemServed: (orderId: number, itemIdx: number, served: boolean) => void // <-- NEW
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
    const todayOrders = getTodayOrders()
    setOrders(todayOrders)
  }, [])

  // Save orders whenever they change
  useEffect(() => {
    if (orders.length > 0) {
      saveTodayOrders(orders)
    }
  }, [orders])

  const calculateTotal = (items: OrderItem[]): number => {
    return items.reduce((total, item) => {
      let itemPrice = 0
      if (item.size === 'half' && item.menuItem.halfPrice !== undefined) {
        itemPrice = item.menuItem.halfPrice
      } else if (item.size === 'full' && item.menuItem.fullPrice !== undefined) {
        itemPrice = item.menuItem.fullPrice
      } else {
        itemPrice = item.menuItem.price || 0
      }
      const itemTotal = itemPrice * item.quantity
      const addOnsTotal = item.addOns.reduce((sum, addOn: AddOnCount) =>
        sum + (addOn.addOn.price * addOn.count), 0)
      return total + itemTotal + addOnsTotal
    }, 0)
  }

  const addOrder = (phone: string, items: OrderItem[]) => {
    // Initialize items' served to false if not provided
    const newItems = items.map(i => ({
      ...i,
      served: i.served ?? false
    }))
    const newOrder: Order = {
      id: getNextOrderId(),
      phone,
      items: newItems,
      status: 'preparing',
      paid: false,
      total: calculateTotal(newItems),
      createdAt: Date.now()
    }
    setOrders(prev => [...prev, newOrder])
    setCurrentOrder([])
  }

  // NEW: Mark a single order item's served state as true/false and persist
  const markOrderItemServed = (orderId: number, itemIdx: number, served: boolean) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order
        const updatedItems = order.items.map((item, idx) =>
          idx === itemIdx ? { ...item, served } : item
        )
        return { ...order, items: updatedItems }
      })
    )
  }
  // End NEW

  const updateOrderStatus = (orderId: number, status: Order['status'], unpaidReason?: string, preparationTime?: number) => {
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
      markOrderItemServed, // <-- NEW
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
