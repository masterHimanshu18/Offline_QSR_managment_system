import type { MenuItem, AddOn } from '../types'

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Classic Burger',
    price: 59,
    category: 'Burgers'
  },
  {
    id: 2,
    name: 'Cheese Burger',
    price: 79,
    category: 'Burgers'
  },
  {
    id: 3,
    name: 'Grilled Sandwich',
    price: 79,
    category: 'Sandwiches'
  },
  {
    id: 4,
    name: 'Club Sandwich',
    price: 99,
    category: 'Sandwiches'
  },
  {
    id: 5,
    name: 'French Fries',
    price: 69,
    category: 'Sides'
  },
  {
    id: 6,
    name: 'Cold Coffee',
    price: 59,
    category: 'Beverages'
  },
  {
    id: 7,
    name: 'Chocolate Shake',
    price: 89,
    category: 'Beverages'
  }
]

export const addOns: AddOn[] = [
  { id: 1, name: 'Extra Cheese', price: 20 },
  { id: 2, name: 'Extra Patty', price: 40 },
  { id: 3, name: 'Extra Mayo', price: 10 },
  { id: 4, name: 'Extra Veggies', price: 15 }
]
