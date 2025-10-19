import React, { useState } from 'react'
import { ShoppingCart, Phone, User } from 'lucide-react'
import { useOrders } from '../context/OrderContext'

export const OrderForm: React.FC = () => {
  const { currentOrder, addOrder, calculateTotal } = useOrders()
  const [customerInfo, setCustomerInfo] = useState('')

  const total = calculateTotal(currentOrder)

  const handleCreateOrder = () => {
    if (!customerInfo.trim()) {
      alert('Please enter customer name or phone number')
      return
    }

    if (currentOrder.length === 0) {
      alert('Please add items to the order')
      return
    }

    addOrder(customerInfo, currentOrder)
    
    // Only send WhatsApp if valid 10-digit phone
    const isValidPhone = /^\d{10}$/.test(customerInfo)
    if (isValidPhone) {
      const message = generateWhatsAppMessage()
      const whatsappUrl = `https://wa.me/91${customerInfo}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    }
    
    setCustomerInfo('')
  }

  const generateWhatsAppMessage = () => {
    let message = '=============================\n'
    message += '          FAT BREAD\n'
    message += '=============================\n\n'
    message += 'ORDER CONFIRMATION\n\n'
    message += '-----------------------------\n'
    message += 'ITEMS:\n'
    message += '-----------------------------\n'
    
    currentOrder.forEach(item => {
      // Display size info for half/full items
      const sizeText = item.size ? ` (${item.size.toUpperCase()})` : ''
      message += `${item.menuItem.name}${sizeText} x${item.quantity}\n`
      
      // Calculate correct price based on size
      let itemPrice = 0
      if (item.size === 'half' && item.menuItem.halfPrice !== undefined) {
        itemPrice = item.menuItem.halfPrice
      } else if (item.size === 'full' && item.menuItem.fullPrice !== undefined) {
        itemPrice = item.menuItem.fullPrice
      } else {
        itemPrice = item.menuItem.price || 0
      }
      
      message += `  Price: Rs.${itemPrice * item.quantity}\n`
      
      if (item.addOns.length > 0) {
        message += `  Add-ons:\n`
        item.addOns.forEach(a => {
          message += `    - ${a.addOn.name} x${a.count} (+Rs.${a.addOn.price * a.count})\n`
        })
      }
      message += '\n'
    })
    
    message += '-----------------------------\n'
    message += `TOTAL: Rs.${total}\n`
    message += '=============================\n\n'
    message += 'Your order is being prepared!\n'
    message += 'We will notify you when ready.\n\n'
    message += 'Thank you for your order!'
    
    return message
  }

  if (currentOrder.length === 0) {
    return null
  }

  const isValidPhone = /^\d{10}$/.test(customerInfo)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <ShoppingCart className="text-blue-600" />
        Current Order
      </h3>

      <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
        {currentOrder.map((item, index) => {
          // Calculate correct display price
          let displayPrice = 0
          if (item.size === 'half' && item.menuItem.halfPrice !== undefined) {
            displayPrice = item.menuItem.halfPrice
          } else if (item.size === 'full' && item.menuItem.fullPrice !== undefined) {
            displayPrice = item.menuItem.fullPrice
          } else {
            displayPrice = item.menuItem.price || 0
          }

          const sizeText = item.size ? ` (${item.size.toUpperCase()})` : ''

          return (
            <div key={index} className="border-b pb-2">
              <div className="flex justify-between font-medium">
                <span>{item.menuItem.name}{sizeText} x{item.quantity}</span>
                <span>₹{displayPrice * item.quantity}</span>
              </div>
              {item.addOns.length > 0 && (
                <div className="text-sm text-gray-600 ml-2">
                  + {item.addOns.map(a => `${a.addOn.name} x${a.count} (₹${a.addOn.price * a.count})`).join(', ')}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span className="text-green-600">₹{total}</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          {isValidPhone ? <Phone size={16} className="inline mr-2" /> : <User size={16} className="inline mr-2" />}
          Customer Phone or Name
        </label>
        <input
          type="text"
          value={customerInfo}
          onChange={(e) => setCustomerInfo(e.target.value)}
          placeholder="Enter phone number or name"
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        {customerInfo && !isValidPhone && customerInfo.length < 3 && (
          <p className="text-xs text-gray-500 mt-1">Enter at least 3 characters for name</p>
        )}
        {isValidPhone && (
          <p className="text-xs text-green-600 mt-1">✓ Valid phone - WhatsApp bill will be sent</p>
        )}
      </div>

      <button
        onClick={handleCreateOrder}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg"
      >
        {isValidPhone ? 'Create Order & Send Bill' : 'Create Order'}
      </button>
    </div>
  )
}
