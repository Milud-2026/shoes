export type CategoryId = 'all' | 'men' | 'women' | 'kids' | 'sneakers' | 'boots' | 'running' | 'sale';

export type BrandId = 
  | 'Nike' 
  | 'Adidas' 
  | 'New Balance' 
  | 'Jordan' 
  | 'Puma' 
  | 'Converse' 
  | 'Salomon' 
  | 'Dr. Martens' 
  | 'Vans' 
  | 'Asics';

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  secondaryHex?: string;
}

export interface ShoeCustomPartColors {
  upper: string;
  midsole: string;
  outsole: string;
  swoosh: string;
  laces: string;
  heel: string;
  tongue: string;
  inner: string;
  engravingText?: string;
  materialFinish?: 'leather' | 'suede' | 'patent' | 'canvas' | 'metallic';
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: BrandId;
  category: CategoryId;
  subCategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isCustomizable?: boolean;
  discountPercentage?: number;
  colors: ColorOption[];
  availableSizes: number[];
  description: string;
  features: string[];
  materials: {
    upper: string;
    lining: string;
    sole: string;
  };
  defaultCustomColors: ShoeCustomPartColors;
  imageUrl: string;
  galleryUrls: string[];
  reviews: ProductReview[];
}

export interface CartItem {
  id: string; // Unique cart item ID (product ID + size + color hash)
  product: Product;
  selectedSize: number;
  selectedColor: ColorOption;
  customColors?: ShoeCustomPartColors;
  customName?: string;
  quantity: number;
}

export type OrderStatus = 'In Attesa' | 'In Lavorazione' | 'Spedito' | 'Consegnato' | 'Annullato';

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  imageUrl: string;
  selectedSize: number;
  selectedColorName: string;
  price: number;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryMethod: string;
  paymentMethod: string;
}

export interface Order {
  id: string;
  createdAt: string; // ISO date string
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  grandTotal: number;
  status: OrderStatus;
  notes?: string;
}

export interface FilterState {
  searchQuery: string;
  category: CategoryId;
  selectedBrands: BrandId[];
  minPrice: number;
  maxPrice: number;
  selectedSizes: number[];
  selectedColors: string[];
  onlyCustomizable: boolean;
  onlySale: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export type Currency = 'EUR' | 'USD' | 'GBP' | 'MAD';
export type Language = 'AR' | 'FR' | 'EN' | 'ES' | 'IT';
