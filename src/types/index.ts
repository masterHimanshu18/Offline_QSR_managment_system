export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price?: number;
  halfPrice?: number;
  fullPrice?: number;
  image?: string;
  isVeg?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface AddOnCount {
  addOn: AddOn;
  count: number;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  size?: 'half' | 'full'; // For sandwiches with half/full pricing
  addOns: AddOnCount[];
}

export interface Order {
  id: number;
  phone: string;
  items: OrderItem[];
  status: 'preparing' | 'served' | 'paid' | 'unpaid';
  paid: boolean;
  unpaidReason?: string;
  total: number;
  createdAt: number;
  servedAt?: number;
  paidAt?: number;
  preparationTime?: number;
}
