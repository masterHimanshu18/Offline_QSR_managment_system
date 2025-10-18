import type { Order, OrdersByDate } from '../types'

const STORAGE_KEY = 'qsr_orders'

export const getOrdersByDate = (): OrdersByDate => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : {}
}

export const saveOrdersByDate = (orders: OrdersByDate): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

export const getTodayOrders = (): Order[] => {
  const today = new Date().toISOString().split('T')[0]
  const allOrders = getOrdersByDate()
  return allOrders[today] || []
}

export const saveTodayOrders = (orders: Order[]): void => {
  const today = new Date().toISOString().split('T')[0]
  const allOrders = getOrdersByDate()
  allOrders[today] = orders
  saveOrdersByDate(allOrders)
}

export const getNextOrderId = (): number => {
  const todayOrders = getTodayOrders()
  return todayOrders.length > 0 
    ? Math.max(...todayOrders.map(o => o.id)) + 1 
    : 1
}

export const exportOrdersAsJSON = (date?: string): void => {
  const allOrders = getOrdersByDate()
  const targetDate = date || new Date().toISOString().split('T')[0]
  const orders = allOrders[targetDate] || []
  
  const dataStr = JSON.stringify(orders, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `orders_${targetDate}.json`
  link.click()
  URL.revokeObjectURL(url)
}

export const exportOrdersAsCSV = (date?: string): void => {
  const allOrders = getOrdersByDate()
  const targetDate = date || new Date().toISOString().split('T')[0]
  const orders = allOrders[targetDate] || []
  
  if (orders.length === 0) {
    alert('No orders to export')
    return
  }
  
  const headers = ['Order ID', 'Phone/Name', 'Items', 'Prep Time', 'Total', 'Status', 'Paid', 'Unpaid Reason', 'Created At']
  const rows = orders.map(order => {
    const prepTime = order.preparationTime 
      ? `${Math.floor(order.preparationTime / 60)}:${(order.preparationTime % 60).toString().padStart(2, '0')}`
      : 'N/A'
    
    return [
      order.id,
      order.phone,
      order.items.map(item => {
        let itemStr = `${item.menuItem.name} x${item.quantity}`
        if (item.addOns.length > 0) {
          itemStr += ` (+ ${item.addOns.map(a => `${a.addOn.name} x${a.count}`).join(', ')})`
        }
        return itemStr
      }).join(' | '),
      prepTime,
      order.total,
      order.status,
      order.paid ? 'Yes' : 'No',
      order.unpaidReason || '',
      new Date(order.createdAt).toLocaleString()
    ]
  })
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `orders_${targetDate}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
