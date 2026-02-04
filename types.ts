
export enum MenuCategory {
  APPETIZER = 'Appetizer',
  SOUP = 'Soup',
  MAIN = 'Main Course',
  DESSERT = 'Dessert',
  BEVERAGE = 'Beverage'
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  pricePerUnit: number;
}

export interface Venue {
  id: string;
  name: string;
  capacity: number;
  minTables: number;
  maxTables: number;
  basePrice: number;
}

export interface BanquetPlan {
  id: string;
  name: string;
  pricePerTable: number;
  minTables: number;
  maxTables: number;
  description: string;
  menuItems: string[]; // IDs of MenuItems
}

export interface Quotation {
  id: string;
  customerName: string;
  eventDate: string;
  venueId: string;
  planId: string;
  tableCount: number;
  status: 'Draft' | 'Sent' | 'Confirmed';
  totalAmount: number;
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
