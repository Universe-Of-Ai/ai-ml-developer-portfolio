export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  categoryId: string;
  category?: string;
  images: string[];
  vendor: string;
  vendorSlug: string;
  stockQty: number;
  ratingAvg: number;
  reviewCount: number;
  status: string;
  featured: boolean;
  createdAt: string;
}

export interface Vendor {
  id: string;
  businessName: string;
  description: string;
  bannerUrl: string;
  logoUrl: string;
  state: string;
  ratingAvg: number;
  productCount: number;
  status: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  icon: string;
  sortOrder: number;
}

export interface Order {
  id: string;
  status: string;
  subtotal: number;
  shippingAud: number;
  gstAud: number;
  totalAud: number;
  items: OrderItem[];
  createdAt: string;
  trackingNumber?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  variant?: string;
  subtotal: number;
  image: string;
}

export interface Review {
  id: string;
  productId: string;
  buyerName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}

export interface Address {
  id: string;
  label?: string;
  name: string;
  phone: string;
  line1: string;
  suburb: string;
  state: string;
  postcode: string;
  isDefault: boolean;
}
