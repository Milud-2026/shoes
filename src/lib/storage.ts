import { Product, Order, OrderStatus } from '../types';
import { PRODUCTS } from '../data/products';

const PRODUCTS_STORAGE_KEY = 'shoes_fr_admin_products_v1';
const ORDERS_STORAGE_KEY = 'shoes_fr_admin_orders_v1';

// Initial sample orders so the admin panel has mock data right away if empty
const INITIAL_SAMPLE_ORDERS: Order[] = [
  {
    id: 'SHOES-FR-883921',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(), // 2 days ago
    customer: {
      fullName: 'Marco Rossi',
      email: 'marco.rossi@example.it',
      phone: '+39 347 1234567',
      address: 'Via Montenapoleone 15',
      city: 'Milano',
      postalCode: '20121',
      country: 'Italia',
      deliveryMethod: 'Chronopost Express (24h)',
      paymentMethod: 'Carta di Credito',
    },
    items: [
      {
        productId: 'nike-air-force-1-3d',
        productName: "Nike Air Force 1 '07 Edition",
        brand: 'Nike',
        imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
        selectedSize: 42,
        selectedColorName: 'Triple White',
        price: 119.99,
        quantity: 1,
      },
      {
        productId: 'jordan-1-retro-high',
        productName: 'Air Jordan 1 Retro High OG',
        brand: 'Jordan',
        imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
        selectedSize: 42,
        selectedColorName: 'Chicago Red',
        price: 189.99,
        quantity: 1,
      }
    ],
    subtotal: 309.98,
    discountAmount: 0,
    shippingCost: 9.99,
    grandTotal: 319.97,
    status: 'In Lavorazione',
    notes: 'Consegnare al citofono Rossi.',
  },
  {
    id: 'SHOES-FR-771204',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
    customer: {
      fullName: 'Sophie Laurent',
      email: 'sophie.laurent@example.fr',
      phone: '+33 6 12 34 56 78',
      address: '45 Boulevard Haussmann',
      city: 'Paris',
      postalCode: '75009',
      country: 'France',
      deliveryMethod: 'Colissimo Standard (48h)',
      paymentMethod: 'PayPal',
    },
    items: [
      {
        productId: 'salomon-xt6-advanced',
        productName: 'Salomon XT-6 Mindful Outdoor',
        brand: 'Salomon',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        selectedSize: 39,
        selectedColorName: 'Vanilla / Almond',
        price: 199.99,
        quantity: 1,
      }
    ],
    subtotal: 199.99,
    discountAmount: 19.99,
    shippingCost: 0,
    grandTotal: 180.00,
    status: 'In Attesa',
    notes: 'Confezione regalo richiesta.',
  }
];

/**
 * Products Storage Operations
 */
export function getStoredProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(PRODUCTS));
      return PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(PRODUCTS));
      return PRODUCTS;
    }
    return parsed as Product[];
  } catch (err) {
    console.error('Failed to load stored products:', err);
    return PRODUCTS;
  }
}

export const loadProducts = getStoredProducts;

export function saveStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('solevault_data_updated'));
  } catch (err) {
    console.error('Failed to save products:', err);
  }
}

export function resetStoredProducts(): Product[] {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(PRODUCTS));
    window.dispatchEvent(new CustomEvent('solevault_data_updated'));
    return PRODUCTS;
  } catch (err) {
    console.error('Failed to reset products:', err);
    return PRODUCTS;
  }
}

export function addStoredProduct(product: Product): Product[] {
  const current = getStoredProducts();
  const updated = [product, ...current];
  saveStoredProducts(updated);
  return updated;
}

export function updateStoredProduct(updatedProduct: Product): Product[] {
  const current = getStoredProducts();
  const updated = current.map(p => p.id === updatedProduct.id ? updatedProduct : p);
  saveStoredProducts(updated);
  return updated;
}

export function deleteStoredProduct(productId: string): Product[] {
  const current = getStoredProducts();
  const updated = current.filter(p => p.id !== productId);
  saveStoredProducts(updated);
  return updated;
}

/**
 * Orders Storage Operations
 */
export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_ORDERS));
      return INITIAL_SAMPLE_ORDERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_ORDERS));
      return INITIAL_SAMPLE_ORDERS;
    }
    return parsed as Order[];
  } catch (err) {
    console.error('Failed to load stored orders:', err);
    return INITIAL_SAMPLE_ORDERS;
  }
}

export function saveOrder(order: Order): Order[] {
  const current = getStoredOrders();
  const updated = [order, ...current];
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('solevault_data_updated'));
  } catch (err) {
    console.error('Failed to save new order:', err);
  }
  return updated;
}

export function updateOrderStatus(orderId: string, status: OrderStatus): Order[] {
  const current = getStoredOrders();
  const updated = current.map(ord => ord.id === orderId ? { ...ord, status } : ord);
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('solevault_data_updated'));
  } catch (err) {
    console.error('Failed to update order status:', err);
  }
  return updated;
}

export function deleteOrder(orderId: string): Order[] {
  const current = getStoredOrders();
  const updated = current.filter(ord => ord.id !== orderId);
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('solevault_data_updated'));
  } catch (err) {
    console.error('Failed to delete order:', err);
  }
  return updated;
}

export function clearAllOrders(): Order[] {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent('solevault_data_updated'));
  } catch (err) {
    console.error('Failed to clear orders:', err);
  }
  return [];
}
