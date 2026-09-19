export interface Product {
  id: string;
  category: 'powder' | 'kit' | 'drink' | 'cake';
  title: string;
  subtitle: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  tastingNotes?: string[];
  features: string[];
  options?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  rating: number;
  location?: string;
  verified?: boolean;
}

export interface FunFact {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  detail: string;
}

export interface ShippingMethod {
  id: 'standard' | 'express' | 'coldchain';
  name: string;
  time: string;
  description: string;
  price: number;
  minFreeThreshold?: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentDetails {
  method: 'card' | 'apple_pay' | 'google_pay' | 'shop_pay';
  cardNumber: string;
  expiry: string;
  cvc: string;
  cardholderName: string;
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  trackingNumber: string;
  estimatedDelivery: string;
}
