export interface MenuItem {
  id: string
  name: string
  category: string
  price?: number
  halfPrice?: number
  fullPrice?: number
  image?: string
  isVeg?: boolean
}

export interface AddOn {
  id: string
  name: string
  price: number
}

export const menuItems: MenuItem[] = [
  // 1. FAT STACK (Sandwiches with Half/Full pricing)
  { id: 'fs1', name: 'Classic Cheese Grilled', category: 'Fat Stack', halfPrice: 49, fullPrice: 89, isVeg: true },
  { id: 'fs2', name: 'Cringy Cheese Corn',    category: 'Fat Stack', halfPrice: 49, fullPrice: 89, isVeg: true },
  { id: 'fs3', name: 'Mix Veggies',            category: 'Fat Stack', halfPrice: 49, fullPrice: 89, isVeg: true },
  { id: 'fs4', name: 'Bombay to Delhi',        category: 'Fat Stack', halfPrice: 59, fullPrice: 99, isVeg: true },
  { id: 'fs5', name: 'Paneer Melt',            category: 'Fat Stack', halfPrice: 59, fullPrice: 109, isVeg: true },
  { id: 'fs6', name: 'Chicken Kebab',          category: 'Fat Stack', halfPrice: 69, fullPrice: 139, isVeg: false },
  { id: 'fs7', name: 'Chicken Pulled',         category: 'Fat Stack', halfPrice: 69, fullPrice: 129, isVeg: false },

  // 2. BURGERS
  { id: 'b1', name: 'Veggie Licious Burger',      category: 'Burgers', price: 69,  isVeg: true },
  { id: 'b2', name: 'Chicken Goddamn Burger',     category: 'Burgers', price: 109, isVeg: false },

  // 3. RUSH HOURS (Fries)
  { id: 'rh1', name: 'Peri Peri Fries',            category: 'Rush Hours', price: 69,  isVeg: true },
  { id: 'rh2', name: 'Cheesy Fries',               category: 'Rush Hours', price: 79,  isVeg: true },
  { id: 'rh3', name: 'Chicken Overloaded Fries',   category: 'Rush Hours', price: 109, isVeg: false },
  { id: 'rh4', name: 'Chicken Popcorn',            category: 'Rush Hours', price: 109, isVeg: false },

  // 4. WRAPS
  { id: 'w1', name: 'Paneer Tikka Wrap',           category: 'Wraps', price: 109, isVeg: true },
  { id: 'w2', name: 'Sikhi Kebab Wrap',            category: 'Wraps', price: 139, isVeg: false },
  { id: 'w3', name: 'Chicken Loaded Wrap',         category: 'Wraps', price: 139, isVeg: false },

  // 5. COLD COFFEE
  { id: 'cc1', name: 'Cold Love Coffee',            category: 'Cold Coffee', price: 69,  isVeg: true },
  { id: 'cc2', name: 'Simping Hazelnut Coffee',     category: 'Cold Coffee', price: 89,  isVeg: true },
  { id: 'cc3', name: 'Green Flag Caramel Coffee',   category: 'Cold Coffee', price: 99,  isVeg: true },

  // 6. ICED COFFEE
  { id: 'ic1', name: 'Iced Americano',              category: 'Iced Coffee', price: 79,  isVeg: true },
  { id: 'ic2', name: 'Iced Latte',                  category: 'Iced Coffee', price: 89,  isVeg: true },
  { id: 'ic3', name: 'Iced Mocha',                  category: 'Iced Coffee', price: 89,  isVeg: true },
  { id: 'ic4', name: 'Iced Caramel',                category: 'Iced Coffee', price: 99,  isVeg: true },
  { id: 'ic5', name: 'Iced Caramel Macchiato',      category: 'Iced Coffee', price: 109, isVeg: true },

  // 7. MOCKTAILS
  { id: 'm1',  name: 'Lime Soda',                   category: 'Mocktails', price: 59,  isVeg: true },
  { id: 'm2',  name: 'Blue Lagoon',                category: 'Mocktails', price: 69,  isVeg: true },
  { id: 'm3',  name: 'Mint Mojito',                category: 'Mocktails', price: 79,  isVeg: true },
  { id: 'm4',  name: 'Green Apple',                category: 'Mocktails', price: 79,  isVeg: true },

  // 8. ICE TEA
  { id: 'it1', name: 'Peach Ice Tea',               category: 'Ice Tea', price: 69,  isVeg: true },
  { id: 'it2', name: 'Lemon Ice Tea',               category: 'Ice Tea', price: 69,  isVeg: true },
]

export const addOns: AddOn[] = [
  { id: 'addon1', name: 'Extra Cheese',       price: 15 },
  { id: 'addon2', name: 'Extra Paneer',       price: 20 },
]
