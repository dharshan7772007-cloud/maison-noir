export type GenderCategory = 'women' | 'men' | 'all';

export type SubCategory = 
  | 'all'
  | 'outerwear'
  | 'tailoring'
  | 'knitwear'
  | 'dresses'
  | 'shirts'
  | 'leather'
  | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  gender: 'women' | 'men';
  category: SubCategory;
  price: number; // in INR
  originalPrice?: number;
  description: string;
  composition: string;
  origin: string;
  care: string[];
  fit: string;
  sizes: string[];
  colors: ProductColor[];
  images: string[];
  tag?: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  inStock: boolean;
  sku: string;
}

export interface CartItem {
  id: string; // unique item id based on product id + size + color
  productId: string;
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
}

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';

export interface FilterState {
  gender: GenderCategory;
  category: SubCategory;
  size: string;
  color: string;
  priceRange: [number, number];
  sortBy: SortOption;
  searchQuery: string;
}

export interface OrderCustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  giftPackaging: boolean;
  giftMessage?: string;
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod';
}

export interface OrderSummary {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: OrderCustomerDetails;
  trackingNumber: string;
  estimatedDelivery: string;
}

export type ActivePage = 'home' | 'collections' | 'about' | 'contact';
