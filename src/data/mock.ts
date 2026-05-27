import { Product, Vendor, Category, Review, Order, Address } from '@/types';

export const categories: Category[] = [
  { id: 'cat-1', name: 'Electronics', slug: 'electronics', icon: '💻', sortOrder: 1 },
  { id: 'cat-2', name: 'Fashion', slug: 'fashion', icon: '👗', sortOrder: 2 },
  { id: 'cat-3', name: 'Home & Garden', slug: 'home-garden', icon: '🏠', sortOrder: 3 },
  { id: 'cat-4', name: 'Sports & Outdoors', slug: 'sports-outdoors', icon: '⚽', sortOrder: 4 },
  { id: 'cat-5', name: 'Beauty & Health', slug: 'beauty-health', icon: '💄', sortOrder: 5 },
  { id: 'cat-6', name: 'Books & Media', slug: 'books-media', icon: '📚', sortOrder: 6 },
  { id: 'cat-7', name: 'Toys & Games', slug: 'toys-games', icon: '🎮', sortOrder: 7 },
  { id: 'cat-8', name: 'Food & Groceries', slug: 'food-groceries', icon: '🍎', sortOrder: 8 },
  { id: 'cat-9', name: 'Automotive', slug: 'automotive', icon: '🚗', sortOrder: 9 },
  { id: 'cat-10', name: 'Pet Supplies', slug: 'pet-supplies', icon: '🐾', sortOrder: 10 },
];

export const vendors: Vendor[] = [
  {
    id: 'v-1', businessName: 'Aussie Tech Co', description: 'Premium Australian technology and electronics retailer.', bannerUrl: 'https://picsum.photos/seed/techbanner/1200/300', logoUrl: 'https://picsum.photos/seed/techlogo/200/200', state: 'NSW', ratingAvg: 4.7, productCount: 45, status: 'approved', slug: 'aussie-tech-co',
  },
  {
    id: 'v-2', businessName: 'Melbourne Fashion Hub', description: 'Curated fashion from Melbourne\'s best independent designers.', bannerUrl: 'https://picsum.photos/seed/fashionbanner/1200/300', logoUrl: 'https://picsum.photos/seed/fashionlogo/200/200', state: 'VIC', ratingAvg: 4.8, productCount: 120, status: 'approved', slug: 'melbourne-fashion-hub',
  },
  {
    id: 'v-3', businessName: 'Bondi Home & Living', description: 'Beach-inspired home décor and lifestyle products.', bannerUrl: 'https://picsum.photos/seed/homebanner/1200/300', logoUrl: 'https://picsum.photos/seed/homelogo/200/200', state: 'NSW', ratingAvg: 4.5, productCount: 78, status: 'approved', slug: 'bondi-home-living',
  },
  {
    id: 'v-4', businessName: 'Outback Sports', description: 'Quality sports and outdoor gear for the Australian adventurer.', bannerUrl: 'https://picsum.photos/seed/sportsbanner/1200/300', logoUrl: 'https://picsum.photos/seed/sportslogo/200/200', state: 'QLD', ratingAvg: 4.6, productCount: 92, status: 'approved', slug: 'outback-sports',
  },
  {
    id: 'v-5', businessName: 'Natural Beauty AU', description: 'Natural and organic beauty products made in Australia.', bannerUrl: 'https://picsum.photos/seed/beautybanner/1200/300', logoUrl: 'https://picsum.photos/seed/beautylogo/200/200', state: 'NSW', ratingAvg: 4.9, productCount: 56, status: 'approved', slug: 'natural-beauty-au',
  },
];

export const products: Product[] = [
  {
    id: 'p-1', name: 'Wireless Noise-Cancelling Headphones', slug: 'wireless-noise-cancelling-headphones', description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and ultra-comfortable memory foam ear cushions. Perfect for commuting, working, or relaxing.\n\nFeatures:\n• Active Noise Cancellation (ANC)\n• 30-hour battery life\n• Bluetooth 5.3\n• Memory foam ear cushions\n• Foldable design\n• Built-in microphone', price: 249.99, comparePrice: 349.99, categoryId: 'cat-1', category: 'Electronics', images: ['https://picsum.photos/seed/headphones1/600/600', 'https://picsum.photos/seed/headphones2/600/600', 'https://picsum.photos/seed/headphones3/600/600'], vendor: 'Aussie Tech Co', vendorSlug: 'aussie-tech-co', stockQty: 45, ratingAvg: 4.7, reviewCount: 128, status: 'active', featured: true, createdAt: '2024-11-15',
  },
  {
    id: 'p-2', name: 'Organic Cotton T-Shirt', slug: 'organic-cotton-t-shirt', description: 'Made from 100% Australian organic cotton. Breathable, soft, and sustainably produced. Available in multiple colours.\n\n• 100% Organic Cotton\n• Pre-shrunk\n• Australian made\n• Available in 6 colours', price: 39.95, comparePrice: 59.95, categoryId: 'cat-2', category: 'Fashion', images: ['https://picsum.photos/seed/tshirt1/600/600', 'https://picsum.photos/seed/tshirt2/600/600'], vendor: 'Melbourne Fashion Hub', vendorSlug: 'melbourne-fashion-hub', stockQty: 200, ratingAvg: 4.5, reviewCount: 89, status: 'active', featured: true, createdAt: '2024-12-01',
  },
  {
    id: 'p-3', name: 'Handcrafted Ceramic Mug Set', slug: 'handcrafted-ceramic-mug-set', description: 'Set of 4 handcrafted ceramic mugs, each uniquely glazed by Australian artisans. Microwave and dishwasher safe.\n\n• Set of 4 mugs\n• Handcrafted in Australia\n• 350ml capacity each\n• Dishwasher & microwave safe', price: 64.00, comparePrice: 89.00, categoryId: 'cat-3', category: 'Home & Garden', images: ['https://picsum.photos/seed/mugs1/600/600', 'https://picsum.photos/seed/mugs2/600/600'], vendor: 'Bondi Home & Living', vendorSlug: 'bondi-home-living', stockQty: 35, ratingAvg: 4.8, reviewCount: 56, status: 'active', featured: true, createdAt: '2024-11-20',
  },
  {
    id: 'p-4', name: 'Portable Bluetooth Speaker', slug: 'portable-bluetooth-speaker', description: 'Waterproof portable speaker with 360-degree sound. 20-hour battery. Perfect for beach days and outdoor adventures.\n\n• IPX7 Waterproof\n• 20-hour battery\n• 360° sound\n• Built-in USB-C charging', price: 129.00, comparePrice: 179.00, categoryId: 'cat-1', category: 'Electronics', images: ['https://picsum.photos/seed/speaker1/600/600', 'https://picsum.photos/seed/speaker2/600/600'], vendor: 'Aussie Tech Co', vendorSlug: 'aussie-tech-co', stockQty: 78, ratingAvg: 4.4, reviewCount: 204, status: 'active', featured: true, createdAt: '2024-10-15',
  },
  {
    id: 'p-5', name: 'Natural Skincare Bundle', slug: 'natural-skincare-bundle', description: 'Complete skincare routine with cleanser, toner, serum, and moisturiser. Made with native Australian botanicals.\n\n• 4-piece set\n• Native Australian ingredients\n• Cruelty-free\n• Suitable for all skin types', price: 119.00, comparePrice: 159.00, categoryId: 'cat-5', category: 'Beauty & Health', images: ['https://picsum.photos/seed/skincare1/600/600', 'https://picsum.photos/seed/skincare2/600/600'], vendor: 'Natural Beauty AU', vendorSlug: 'natural-beauty-au', stockQty: 42, ratingAvg: 4.9, reviewCount: 67, status: 'active', featured: true, createdAt: '2024-12-05',
  },
  {
    id: 'p-6', name: 'Ergonomic Office Chair', slug: 'ergonomic-office-chair', description: 'Premium ergonomic office chair with lumbar support, adjustable armrests, and breathable mesh back. Designed for all-day comfort.\n\n• Adjustable lumbar support\n• Breathable mesh\n• 4D armrests\n• Weight capacity: 150kg', price: 599.00, comparePrice: 899.00, categoryId: 'cat-3', category: 'Home & Garden', images: ['https://picsum.photos/seed/chair1/600/600', 'https://picsum.photos/seed/chair2/600/600'], vendor: 'Bondi Home & Living', vendorSlug: 'bondi-home-living', stockQty: 15, ratingAvg: 4.6, reviewCount: 43, status: 'active', featured: true, createdAt: '2024-11-10',
  },
  {
    id: 'p-7', name: 'Smart Watch Pro', slug: 'smart-watch-pro', description: 'Advanced smartwatch with health monitoring, GPS, and 5-day battery. Water-resistant to 50m.\n\n• Heart rate & SpO2 monitoring\n• Built-in GPS\n• 5-day battery life\n• 50m water resistance', price: 449.00, comparePrice: 549.00, categoryId: 'cat-1', category: 'Electronics', images: ['https://picsum.photos/seed/watch1/600/600', 'https://picsum.photos/seed/watch2/600/600'], vendor: 'Aussie Tech Co', vendorSlug: 'aussie-tech-co', stockQty: 62, ratingAvg: 4.3, reviewCount: 156, status: 'active', featured: false, createdAt: '2024-10-25',
  },
  {
    id: 'p-8', name: 'Recycled Canvas Backpack', slug: 'recycled-canvas-backpack', description: 'Durable backpack made from recycled materials. Features padded laptop compartment and multiple organisation pockets.\n\n• Recycled canvas\n• Fits 15" laptop\n• Multiple pockets\n• Water-resistant coating', price: 89.95, comparePrice: 120.00, categoryId: 'cat-4', category: 'Sports & Outdoors', images: ['https://picsum.photos/seed/backpack1/600/600', 'https://picsum.photos/seed/backpack2/600/600'], vendor: 'Outback Sports', vendorSlug: 'outback-sports', stockQty: 55, ratingAvg: 4.5, reviewCount: 91, status: 'active', featured: true, createdAt: '2024-11-28',
  },
  {
    id: 'p-9', name: 'Yoga Mat Premium', slug: 'yoga-mat-premium', description: 'Extra thick 6mm natural rubber yoga mat with alignment guides. Non-slip surface, eco-friendly materials.\n\n• 6mm thick\n• Natural rubber\n• Alignment guides\n• 183cm x 68cm', price: 79.00, comparePrice: 110.00, categoryId: 'cat-4', category: 'Sports & Outdoors', images: ['https://picsum.photos/seed/yoga1/600/600'], vendor: 'Outback Sports', vendorSlug: 'outback-sports', stockQty: 90, ratingAvg: 4.7, reviewCount: 112, status: 'active', featured: false, createdAt: '2024-12-10',
  },
  {
    id: 'p-10', name: 'USB-C Hub Multiport', slug: 'usb-c-hub-multiport', description: '7-in-1 USB-C hub with HDMI 4K, USB 3.0, SD card reader, and 100W power delivery pass-through.\n\n• HDMI 4K@60Hz\n• USB 3.0 x 2\n• SD/TF card reader\n• 100W PD passthrough', price: 69.95, comparePrice: 99.95, categoryId: 'cat-1', category: 'Electronics', images: ['https://picsum.photos/seed/usbhub1/600/600'], vendor: 'Aussie Tech Co', vendorSlug: 'aussie-tech-co', stockQty: 120, ratingAvg: 4.2, reviewCount: 78, status: 'active', featured: true, createdAt: '2024-11-05',
  },
  {
    id: 'p-11', name: 'Scented Candle Collection', slug: 'scented-candle-collection', description: 'Set of 3 hand-poured soy wax candles with native Australian scents: Eucalyptus, Lemon Myrtle, and Bush Flower.\n\n• 3-candle set\n• Soy wax\n• 40-hour burn time each\n• Australian made', price: 54.00, comparePrice: 75.00, categoryId: 'cat-3', category: 'Home & Garden', images: ['https://picsum.photos/seed/candles1/600/600'], vendor: 'Bondi Home & Living', vendorSlug: 'bondi-home-living', stockQty: 68, ratingAvg: 4.8, reviewCount: 134, status: 'active', featured: false, createdAt: '2024-12-15',
  },
  {
    id: 'p-12', name: 'Stainless Steel Water Bottle', slug: 'stainless-steel-water-bottle', description: 'Double-walled insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. 750ml capacity.\n\n• 750ml capacity\n• Double-wall insulation\n• BPA-free\n• Keeps cold 24hrs / hot 12hrs', price: 34.95, comparePrice: 49.95, categoryId: 'cat-4', category: 'Sports & Outdoors', images: ['https://picsum.photos/seed/bottle1/600/600'], vendor: 'Outback Sports', vendorSlug: 'outback-sports', stockQty: 150, ratingAvg: 4.6, reviewCount: 189, status: 'active', featured: true, createdAt: '2024-10-30',
  },
];

export const sampleReviews: Review[] = [
  { id: 'r-1', productId: 'p-1', buyerName: 'Sarah M.', rating: 5, title: 'Best headphones I\'ve owned', comment: 'The noise cancellation is incredible. I use these daily for work calls and commuting. Battery lasts forever!', createdAt: '2024-12-10' },
  { id: 'r-2', productId: 'p-1', buyerName: 'James K.', rating: 4, title: 'Great sound, slightly heavy', comment: 'Sound quality is fantastic but they can feel a bit heavy after a few hours. Still highly recommend.', createdAt: '2024-12-05' },
  { id: 'r-3', productId: 'p-1', buyerName: 'Emma L.', rating: 5, title: 'Perfect for travel', comment: 'Used these on a long-haul flight to London. The noise cancellation made the flight so much more bearable.', createdAt: '2024-11-28' },
  { id: 'r-4', productId: 'p-2', buyerName: 'Chloe T.', rating: 5, title: 'Super soft and comfy', comment: 'The organic cotton feels amazing. Ordered two more in different colours!', createdAt: '2024-12-08' },
  { id: 'r-5', productId: 'p-3', buyerName: 'David R.', rating: 5, title: 'Beautiful craftsmanship', comment: 'Each mug is unique. The glazes are gorgeous. Makes morning coffee feel special.', createdAt: '2024-12-01' },
  { id: 'r-6', productId: 'p-5', buyerName: 'Lisa W.', rating: 5, title: 'My skin has never looked better', comment: 'The serum is incredible. Noticed a difference within a week. Love that it\'s all natural ingredients.', createdAt: '2024-12-12' },
  { id: 'r-7', productId: 'p-6', buyerName: 'Mark P.', rating: 4, title: 'Worth the investment', comment: 'Assembly was a bit tricky but once together, this chair is incredibly comfortable. My back pain has improved significantly.', createdAt: '2024-11-25' },
  { id: 'r-8', productId: 'p-8', buyerName: 'Amy S.', rating: 4, title: 'Great everyday backpack', comment: 'Love that it\'s made from recycled materials. Fits my laptop perfectly and has great organisation.', createdAt: '2024-12-02' },
];

export const sampleOrders: Order[] = [
  {
    id: 'ord-001', status: 'delivered', subtotal: 289.94, shippingAud: 0, gstAud: 28.99, totalAud: 318.93,
    items: [
      { id: 'oi-1', name: 'Wireless Noise-Cancelling Headphones', price: 249.99, qty: 1, subtotal: 249.99, image: 'https://picsum.photos/seed/headphones1/600/600' },
      { id: 'oi-2', name: 'Organic Cotton T-Shirt', price: 39.95, qty: 1, subtotal: 39.95, image: 'https://picsum.photos/seed/tshirt1/600/600' },
    ],
    createdAt: '2024-12-01', trackingNumber: 'AUS123456789',
  },
  {
    id: 'ord-002', status: 'shipped', subtotal: 179.00, shippingAud: 12.99, gstAud: 17.90, totalAud: 209.89,
    items: [
      { id: 'oi-3', name: 'Natural Skincare Bundle', price: 119.00, qty: 1, subtotal: 119.00, image: 'https://picsum.photos/seed/skincare1/600/600' },
      { id: 'oi-4', name: 'Scented Candle Collection', price: 54.00, qty: 1, subtotal: 54.00, variant: 'Eucalyptus', image: 'https://picsum.photos/seed/candles1/600/600' },
    ],
    createdAt: '2024-12-15', trackingNumber: 'AUS987654321',
  },
  {
    id: 'ord-003', status: 'processing', subtotal: 69.95, shippingAud: 12.99, gstAud: 6.99, totalAud: 89.93,
    items: [
      { id: 'oi-5', name: 'USB-C Hub Multiport', price: 69.95, qty: 1, subtotal: 69.95, image: 'https://picsum.photos/seed/usbhub1/600/600' },
    ],
    createdAt: '2024-12-20',
  },
];

export const sampleAddresses: Address[] = [
  { id: 'addr-1', label: 'Home', name: 'Jessie Ablene', phone: '0412 345 678', line1: '42 Harbour View Drive', suburb: 'Darling Point', state: 'NSW', postcode: '2027', isDefault: true },
  { id: 'addr-2', label: 'Work', name: 'Jessie Ablene', phone: '02 9876 5432', line1: '15 Martin Place, Level 8', suburb: 'Sydney', state: 'NSW', postcode: '2000', isDefault: false },
];

export const AU_STATES = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'] as const;

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(price);
};

export const getDiscountPercent = (price: number, comparePrice?: number) => {
  if (!comparePrice || comparePrice <= price) return 0;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
};
