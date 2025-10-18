export interface MenuItem {
  id: number
  name: string
  price: number
  category: string
  image?: string
}

export interface AddOn {
  id: number
  name: string
  price: number
}

export interface AddOnCount {
  addOn: AddOn
  count: number
}

export interface OrderItem {
  menuItem: MenuItem
  quantity: number
  addOns: AddOnCount[]
}

export type OrderStatus = 'preparing' | 'served' | 'paid' | 'unpaid'

export interface Order {
  id: number
  phone: string
  items: OrderItem[]
  status: OrderStatus
  paid: boolean
  unpaidReason?: string
  total: number
  createdAt: number
  servedAt?: number
  paidAt?: number
  preparationTime?: number  // NEW: time in seconds to prepare
}

export interface OrdersByDate {
  [dateString: string]: Order[]
}
