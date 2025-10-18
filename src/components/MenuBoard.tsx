// src/components/MenuBoard.tsx

import React, { useState } from 'react'
import { Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react'
import { menuItems, addOns } from '../data/menue'
import { useOrders } from '../context/OrderContext'
import type { MenuItem, AddOn } from '../types'

export const MenuBoard: React.FC = () => {
  const { currentOrder, setCurrentOrder } = useOrders()

  // Accordion state per category
  const [openCategory, setOpenCategory] = useState<{ [category: string]: boolean }>({})

  // Find order item for a menu item
  const findOrderItem = (menuItem: MenuItem) => {
    return currentOrder.find(item => item.menuItem.id === menuItem.id)
  }

  // Update quantity and sync add-on limits
  const updateQuantity = (menuItem: MenuItem, delta: number) => {
    setCurrentOrder(prev => {
      const existing = prev.find(item => item.menuItem.id === menuItem.id)
      if (existing) {
        const newQty = existing.quantity + delta
        if (newQty <= 0) {
          return prev.filter(item => item.menuItem.id !== menuItem.id)
        }
        // Truncate add-on counts if newQty drops
        return prev.map(item => {
          if (item.menuItem.id === menuItem.id) {
            return { ...item, quantity: newQty, addOns: item.addOns }
          }
          return item
        })
      } else if (delta > 0) {
        return [...prev, { menuItem, quantity: 1, addOns: [] }]
      }
      return prev
    })
  }

  // Add-on Counter Handler (per item)
  const updateAddOnCount = (menuItem: MenuItem, addOn: AddOn, newCount: number) => {
    setCurrentOrder(prev => prev.map(item => {
      if (item.menuItem.id !== menuItem.id) return item
      let newAddOns = [...item.addOns]
      const addOnIdx = newAddOns.findIndex(a => a.addOn.id === addOn.id)
      if (addOnIdx >= 0) {
        if (newCount <= 0) {
          newAddOns.splice(addOnIdx, 1)
        } else {
          newAddOns[addOnIdx].count = newCount
        }
      } else if (newCount > 0) {
        newAddOns.push({ addOn, count: newCount })
      }
      return { ...item, addOns: newAddOns }
    }))
  }

  const categories = Array.from(new Set(menuItems.map(item => item.category)))

  return (
    <div className="space-y-4">
      {categories.map(category => (
        <div key={category} className="mb-2">
          <h3
            className="text-xl font-bold mb-1 text-white bg-gray-900 cursor-pointer flex items-center justify-between px-4 py-3 rounded-lg shadow"
            onClick={() =>
              setOpenCategory(prev => ({
                ...prev,
                [category]: !prev[category],
              }))
            }
          >
            <span>{category}</span>
            <span>
              {openCategory[category] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </h3>
          {openCategory[category] && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems
                .filter(item => item.category === category)
                .map(item => {
                  const orderItem = findOrderItem(item)
                  const quantity = orderItem?.quantity || 0

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg p-3 transition border border-gray-200 shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{item.name}</h4>
                          <p className="text-green-600 font-bold">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-yellow-400 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item, -1)}
                            className="p-1 hover:bg-red-200 rounded-full transition"
                            disabled={quantity === 0}
                          >
                            <Minus size={16} className={quantity === 0 ? 'text-gray-400' : 'text-red-600'} />
                          </button>
                          <span className="font-bold w-8 text-center">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(item, 1)}
                            className="p-1 hover:bg-green-200 rounded-full transition"
                          >
                            <Plus size={16} className="text-green-600" />
                          </button>
                        </div>
                      </div>
                      {quantity > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm font-medium text-gray-700 mb-2">Add-ons:</p>
                          <div className="flex flex-wrap gap-3">
                            {addOns.map(addOn => {
                              const currCount = orderItem?.addOns.find(a => a.addOn.id === addOn.id)?.count || 0
                              return (
                                <div key={addOn.id} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                                  <span className="text-xs">{addOn.name} (+₹{addOn.price})</span>
                                  <button
                                    onClick={() => updateAddOnCount(item, addOn, currCount - 1)}
                                    className="px-2 py-1 text-xs rounded-full bg-red-200"
                                    disabled={currCount <= 0}
                                  >–</button>
                                  <span className="w-5 text-center">{currCount}</span>
                                  <button
                                    onClick={() => updateAddOnCount(item, addOn, currCount + 1)}
                                    className="px-2 py-1 text-xs rounded-full bg-green-200"
                                    // Set a reasonable max, or remove entirely
                                    disabled={false}
                                  >+</button>

                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

