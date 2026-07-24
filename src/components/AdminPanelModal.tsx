import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  LogOut, 
  ShoppingBag, 
  Box, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Save, 
  RotateCcw, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertTriangle, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Download, 
  Upload, 
  Eye, 
  Sparkles,
  ChevronDown,
  Image as ImageIcon
} from 'lucide-react';
import { Product, Order, OrderStatus, CategoryId, BrandId } from '../types';
import { 
  getStoredProducts, 
  saveStoredProducts, 
  resetStoredProducts, 
  addStoredProduct, 
  updateStoredProduct, 
  deleteStoredProduct, 
  getStoredOrders, 
  updateOrderStatus, 
  deleteOrder, 
  clearAllOrders 
} from '../lib/storage';

const formatPrice = (val: any): string => {
  if (val === null || val === undefined) return '0.00';
  const num = Number(val);
  return isNaN(num) ? '0.00' : num.toFixed(2);
};

const formatDate = (dateStr?: string | number | null): string => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return String(dateStr);
    return d.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }) + ' ' + d.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return String(dateStr || '');
  }
};

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductsUpdated?: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  onProductsUpdated,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [passwordInput, setPasswordInput] = useState<string>('admin');
  const [authError, setAuthError] = useState<string>('');

  // Active Tab: 'orders' | 'products' | 'stats'
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'stats'>('orders');

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [productSearch, setProductSearch] = useState<string>('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState<boolean>(false);

  // Product Form State
  const [copiedLabel, setCopiedLabel] = useState<boolean>(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    brand: 'Nike',
    category: 'sneakers',
    subCategory: 'Sneakers',
    price: 99.99,
    originalPrice: 120.00,
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    description: '',
    availableSizes: [39, 40, 41, 42, 43, 44],
    isNew: false,
    isBestSeller: false,
    discountPercentage: 0,
  });

  // Custom Confirmation Modal State (replaces native window.confirm which is blocked in iframes)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
  } | null>(null);

  // Load data when modal opens and subscribe to storage events
  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
    const handleDataChange = () => {
      if (isOpen) {
        refreshData();
      }
    };
    window.addEventListener('solevault_data_updated', handleDataChange);
    window.addEventListener('storage', handleDataChange);
    return () => {
      window.removeEventListener('solevault_data_updated', handleDataChange);
      window.removeEventListener('storage', handleDataChange);
    };
  }, [isOpen]);

  const refreshData = () => {
    try {
      const updatedProds = getStoredProducts();
      const updatedOrds = getStoredOrders();
      const safeProds = Array.isArray(updatedProds) ? updatedProds : [];
      const safeOrds = Array.isArray(updatedOrds) ? updatedOrds : [];
      setProducts(safeProds);
      setOrders(safeOrds);
      // If selected order was modified, sync it
      setSelectedOrder(prev => {
        if (!prev) return null;
        return safeOrds.find(o => o && o.id === prev.id) || null;
      });
    } catch (err) {
      console.error('Error refreshing admin data:', err);
    }
  };

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin' || passwordInput === 'admin123' || passwordInput === 'shoes2026') {
      setIsAuthenticated(true);
      localStorage.setItem('shoes_admin_session', 'true');
      setAuthError('');
      setPasswordInput('');
      refreshData();
    } else {
      setAuthError('Password errata! Riprova (password default: admin)');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('shoes_admin_session');
  };

  // Order Status update handler
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updated = updateOrderStatus(orderId, newStatus);
    setOrders(updated);
  };

  // Delete Order
  const handleDeleteOrder = (orderId: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Elimina Ordine Cliente',
      message: `Sei sicuro di voler eliminare definitivamente l'ordine #${orderId}? Tutti i dati di spedizione del cliente verranno rimossi.`,
      confirmText: 'Sì, Elimina Ordine',
      onConfirm: () => {
        const updated = deleteOrder(orderId);
        setOrders(updated);
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(null);
        }
        setConfirmModal(null);
      }
    });
  };

  // Edit product trigger
  const handleStartEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({ ...prod });
    setIsCreatingProduct(false);
  };

  // Create new product trigger
  const handleStartCreateProduct = () => {
    setEditingProduct(null);
    setProductForm({
      id: `prod-${Date.now()}`,
      name: 'Nuova Sneaker Exclusive',
      brand: 'Nike',
      category: 'sneakers',
      subCategory: 'Edizione Limitata',
      price: 129.99,
      originalPrice: 150.00,
      rating: 5.0,
      reviewCount: 1,
      isNew: true,
      isBestSeller: false,
      discountPercentage: 0,
      colors: [{ id: 'c1', name: 'Original', hex: '#1A1A1A' }],
      availableSizes: [38, 39, 40, 41, 42, 43, 44, 45],
      description: 'Nuovo modello dal design moderno e materiali di alta qualità.',
      features: ['Lavorazione artigianale', 'Suola ammortizzata', 'Design traspirante'],
      materials: { upper: 'Pelle / Mesh', lining: 'Tessuto', sole: 'Gomma Vulcanizzata' },
      defaultCustomColors: {
        upper: '#FFFFFF',
        midsole: '#FFFFFF',
        outsole: '#1A1A1A',
        swoosh: '#FF3E00',
        laces: '#FFFFFF',
        heel: '#1A1A1A',
        tongue: '#FFFFFF',
        inner: '#1A1A1A',
      },
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      galleryUrls: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
      reviews: []
    });
    setIsCreatingProduct(true);
  };

  const [formError, setFormError] = useState<string>('');

  // Save product (create or update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!productForm.name || !productForm.price || !productForm.imageUrl) {
      setFormError('Inserisci un nome, un prezzo e un URL di immagine valido.');
      return;
    }

    const newProduct: Product = {
      id: productForm.id || `prod-${Date.now()}`,
      name: productForm.name || 'Prodotto',
      brand: (productForm.brand as BrandId) || 'Nike',
      category: (productForm.category as CategoryId) || 'sneakers',
      subCategory: productForm.subCategory || 'Scarpa',
      price: Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
      rating: productForm.rating || 4.8,
      reviewCount: productForm.reviewCount || 10,
      isNew: Boolean(productForm.isNew),
      isBestSeller: Boolean(productForm.isBestSeller),
      discountPercentage: productForm.discountPercentage ? Number(productForm.discountPercentage) : undefined,
      colors: productForm.colors || [{ id: 'default', name: 'Color', hex: '#1A1A1A' }],
      availableSizes: productForm.availableSizes || [39, 40, 41, 42, 43],
      description: productForm.description || '',
      features: productForm.features || ['Materiale di qualità', 'Suola resistente'],
      materials: productForm.materials || { upper: 'Pelle', lining: 'Tessuto', sole: 'Gomma' },
      defaultCustomColors: productForm.defaultCustomColors || {
        upper: '#FFFFFF', midsole: '#FFFFFF', outsole: '#1A1A1A', swoosh: '#FF3E00',
        laces: '#FFFFFF', heel: '#1A1A1A', tongue: '#FFFFFF', inner: '#1A1A1A'
      },
      imageUrl: productForm.imageUrl || '',
      galleryUrls: productForm.galleryUrls?.length ? productForm.galleryUrls : [productForm.imageUrl || ''],
      reviews: productForm.reviews || []
    };

    if (isCreatingProduct) {
      addStoredProduct(newProduct);
    } else if (editingProduct) {
      updateStoredProduct(newProduct);
    }

    refreshData();
    setEditingProduct(null);
    setIsCreatingProduct(false);
    if (onProductsUpdated) onProductsUpdated();
  };

  // Delete Product
  const handleDeleteProduct = (productId: string, productName?: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Elimina Scheda Prodotto',
      message: `Sei sicuro di voler eliminare "${productName || 'questo prodotto'}" dal catalogo? Questa azione rimuoverà permanentemente la scheda e le informazioni del prodotto.`,
      confirmText: 'Sì, Elimina Prodotto',
      onConfirm: () => {
        deleteStoredProduct(productId);
        refreshData();
        if (onProductsUpdated) onProductsUpdated();
        setConfirmModal(null);
      }
    });
  };

  // Reset Catalog to Default
  const handleResetCatalog = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Ripristina Catalogo Predefinito',
      message: 'Vuoi ripristinare il catalogo con i prodotti originali predefiniti? Le eventuali modifiche apportate ai prodotti verranno ripristinate ai valori iniziali.',
      confirmText: 'Sì, Ripristina Ora',
      onConfirm: () => {
        resetStoredProducts();
        refreshData();
        if (onProductsUpdated) onProductsUpdated();
        setConfirmModal(null);
      }
    });
  };

  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeProducts = Array.isArray(products) ? products : [];

  // Filtered Orders logic
  const filteredOrders = safeOrders.filter(ord => {
    if (!ord) return false;
    const searchLower = (orderSearch || '').toLowerCase();
    const customerName = ord.customer?.fullName || '';
    const customerEmail = ord.customer?.email || '';
    const customerCity = ord.customer?.city || '';
    const orderId = ord.id || '';

    const matchSearch = 
      orderId.toLowerCase().includes(searchLower) ||
      customerName.toLowerCase().includes(searchLower) ||
      customerEmail.toLowerCase().includes(searchLower) ||
      customerCity.toLowerCase().includes(searchLower);
    
    if (orderStatusFilter === 'all') return matchSearch;
    return matchSearch && ord.status === orderStatusFilter;
  });

  // Filtered Products logic
  const filteredProducts = safeProducts.filter(p => {
    if (!p) return false;
    const searchLower = (productSearch || '').toLowerCase();
    return (
      (p.name || '').toLowerCase().includes(searchLower) ||
      (p.brand || '').toLowerCase().includes(searchLower) ||
      (p.category || '').toLowerCase().includes(searchLower)
    );
  });

  // Financial Stats calculation
  const totalRevenue = safeOrders.reduce((acc, ord) => acc + Number(ord?.grandTotal || 0), 0);
  const pendingCount = safeOrders.filter(ord => ord?.status === 'In Attesa' || ord?.status === 'In Lavorazione').length;
  const completedCount = safeOrders.filter(ord => ord?.status === 'Consegnato' || ord?.status === 'Spedito').length;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-[#1A1A1A] border-2 border-white rounded-3xl w-full max-w-7xl h-[92vh] flex flex-col overflow-hidden shadow-2xl text-white">
        
        {/* Top Header Bar */}
        <div className="bg-[#121212] px-6 py-4 flex items-center justify-between border-b-2 border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF3E00] text-white flex items-center justify-center font-black border border-white">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-lg tracking-tight uppercase">Pannello Amministrazione</span>
                <span className="bg-[#00F0FF] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-black">
                  Riservato Admin
                </span>
              </div>
              <p className="text-xs text-gray-400 font-bold">Gestione catalogo, prezzi, foto ed ordini clienti</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 text-xs bg-[#262626] hover:bg-[#FF3E00] text-white font-black px-3.5 py-2 rounded-xl border border-white/20 uppercase transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Esci</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#262626] text-white hover:bg-[#FF3E00] border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOGIN SCREEN IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-[#121212]">
            <div className="bg-[#1A1A1A] border-2 border-white/20 rounded-3xl p-8 max-w-md w-full space-y-6 text-center artistic-shadow-lg">
              <div className="w-16 h-16 bg-[#FF3E00] rounded-2xl border-2 border-white flex items-center justify-center mx-auto text-white">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight">Accesso Riservato</h3>
                <p className="text-xs text-gray-400 mt-1 font-medium">
                  Inserisci la password dell'amministratore per accedere al pannello ordini e gestione prezzi.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Password Admin (default: admin)"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-[#262626] text-white font-bold text-center text-sm p-4 rounded-xl border-2 border-white/20 focus:border-[#FF3E00] focus:outline-none placeholder-gray-500"
                    autoFocus
                  />
                  {authError && (
                    <p className="text-xs text-[#FF3E00] font-bold mt-2 flex items-center justify-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{authError}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF3E00] hover:bg-white hover:text-[#1A1A1A] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl border-2 border-white transition-all artistic-shadow"
                >
                  Accedi al Pannello Admin
                </button>
              </form>

              <div className="text-[11px] text-gray-500 font-mono">
                Password di default per il test: <span className="text-[#00F0FF] font-bold">admin</span>
              </div>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Dashboard Navigation Tabs */}
            <div className="bg-[#121212] px-6 py-2 border-b border-white/20 flex items-center space-x-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all border ${
                  activeTab === 'orders'
                    ? 'bg-[#FF3E00] text-white border-white shadow-md'
                    : 'bg-[#1A1A1A] text-gray-300 border-white/10 hover:border-white/40'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Ordini Clienti ({safeOrders.length})</span>
                {pendingCount > 0 && (
                  <span className="bg-[#00F0FF] text-black text-[10px] px-2 py-0.5 rounded-full font-black">
                    {pendingCount} nuovi
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all border ${
                  activeTab === 'products'
                    ? 'bg-[#FF3E00] text-white border-white shadow-md'
                    : 'bg-[#1A1A1A] text-gray-300 border-white/10 hover:border-white/40'
                }`}
              >
                <Box className="w-4 h-4" />
                <span>Gestione Prodotti ({safeProducts.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all border ${
                  activeTab === 'stats'
                    ? 'bg-[#FF3E00] text-white border-white shadow-md'
                    : 'bg-[#1A1A1A] text-gray-300 border-white/10 hover:border-white/40'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Statistiche & Backup</span>
              </button>
            </div>

            {/* TAB 1: ORDINI CLIENTI */}
            {activeTab === 'orders' && (
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden p-6 gap-6 bg-[#161616]">
                
                {/* Orders List Sidebar */}
                <div className="lg:col-span-5 flex flex-col space-y-4 overflow-hidden border-r-2 border-white/10 pr-0 lg:pr-6">
                  
                  {/* Top Search & Filter Bar */}
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Cerca ordine (Nome, Email, ID)..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="w-full bg-[#262626] text-white text-xs p-3 pl-10 rounded-xl border border-white/20 focus:border-[#FF3E00] focus:outline-none"
                      />
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    </div>

                    <div className="flex items-center space-x-1 overflow-x-auto pb-1 no-scrollbar text-[11px] font-bold">
                      {['all', 'In Attesa', 'In Lavorazione', 'Spedito', 'Consegnato', 'Annullato'].map(status => (
                        <button
                          key={status}
                          onClick={() => setOrderStatusFilter(status)}
                          className={`px-3 py-1 rounded-lg uppercase tracking-wider whitespace-nowrap border ${
                            orderStatusFilter === status
                              ? 'bg-[#00F0FF] text-black border-black font-black'
                              : 'bg-[#262626] text-gray-300 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {status === 'all' ? 'Tutti' : status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Orders List Items */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {filteredOrders.length === 0 ? (
                      <div className="p-8 text-center text-gray-400 text-xs bg-[#222] rounded-2xl border border-white/10">
                        Nessun ordine trovato.
                      </div>
                    ) : (
                      filteredOrders.map(ord => {
                        const isSelected = selectedOrder?.id === ord.id;
                        return (
                          <div
                            key={ord.id}
                            onClick={() => setSelectedOrder(ord)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                              isSelected
                                ? 'bg-[#FF3E00] border-white text-white shadow-lg'
                                : 'bg-[#222] border-white/10 text-gray-200 hover:border-white/40'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-black text-xs">{ord.id}</span>
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                                ord.status === 'Consegnato' ? 'bg-emerald-500 text-black' :
                                ord.status === 'Spedito' ? 'bg-blue-500 text-white' :
                                ord.status === 'In Lavorazione' ? 'bg-amber-500 text-black' : 'bg-zinc-700 text-white'
                              }`}>
                                {ord.status}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                              <div className="font-bold">{ord?.customer?.fullName || 'Cliente Sconosciuto'}</div>
                              <div className="font-black text-[#00F0FF]">{formatPrice(ord?.grandTotal || 0)}€</div>
                            </div>

                            <div className="text-[11px] text-gray-300 flex items-center justify-between font-mono">
                              <span>{formatDate(ord?.createdAt)}</span>
                              <span>{ord?.items?.length || 0} articoli</span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                </div>

                {/* Selected Order Detailed View */}
                <div className="lg:col-span-7 flex flex-col justify-between bg-[#222] p-6 rounded-3xl border-2 border-white/10 overflow-y-auto">
                  {selectedOrder ? (
                    <div className="space-y-6">
                      
                      {/* Order Header & Status Selector */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                        <div>
                          <div className="text-[10px] font-black text-[#00F0FF] uppercase tracking-widest">Dettaglio Ordine Cliente</div>
                          <h3 className="text-2xl font-black font-mono">{selectedOrder.id}</h3>
                          <p className="text-xs text-gray-400">
                            Ricevuto il {formatDate(selectedOrder.createdAt)}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <label className="text-xs font-bold uppercase text-gray-300">Stato:</label>
                          <select
                            value={selectedOrder.status}
                            onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                            className="bg-[#1A1A1A] text-white text-xs font-black p-2.5 rounded-xl border border-white/20 focus:outline-none uppercase"
                          >
                            <option value="In Attesa">In Attesa</option>
                            <option value="In Lavorazione">In Lavorazione</option>
                            <option value="Spedito">Spedito</option>
                            <option value="Consegnato">Consegnato</option>
                            <option value="Annullato">Annullato</option>
                          </select>

                          <button
                            onClick={() => handleDeleteOrder(selectedOrder.id)}
                            className="p-2.5 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors border border-red-500/30"
                            title="Elimina Ordine"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Customer Info Card */}
                      <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-white/10 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <div className="text-xs font-black uppercase text-[#FF3E00] flex items-center space-x-1.5">
                            <User className="w-4 h-4" />
                            <span>Scheda Spedizione Cliente</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const labelText = `DESTINATARIO: ${selectedOrder.customer?.fullName || ''}\nTELEFONO: ${selectedOrder.customer?.phone || ''}\nEMAIL: ${selectedOrder.customer?.email || ''}\nINDIRIZZO: ${selectedOrder.customer?.address || ''}\nCITTA': ${selectedOrder.customer?.city || ''} (${selectedOrder.customer?.postalCode || ''}), ${selectedOrder.customer?.country || ''}\nCORRIERE: ${selectedOrder.customer?.deliveryMethod || ''}\nNOTE: ${selectedOrder.notes || 'Nessuna'}`;
                              if (navigator.clipboard) {
                                navigator.clipboard.writeText(labelText);
                              }
                              setCopiedLabel(true);
                              setTimeout(() => setCopiedLabel(false), 2000);
                            }}
                            className="bg-[#00F0FF] hover:bg-white text-black font-black text-[11px] px-3 py-1.5 rounded-xl uppercase transition-colors flex items-center space-x-1 border border-black cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{copiedLabel ? '✓ Etichetta Copiata!' : 'Copia Etichetta Spedizione'}</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase font-bold">Cliente:</span>
                            <span className="font-bold text-white text-sm">{selectedOrder.customer?.fullName || 'N/D'}</span>
                          </div>

                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase font-bold">Email:</span>
                            <a href={`mailto:${selectedOrder.customer?.email || ''}`} className="font-bold text-[#00F0FF] hover:underline flex items-center space-x-1 truncate">
                              <Mail className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{selectedOrder.customer?.email || 'N/D'}</span>
                            </a>
                          </div>

                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase font-bold">Telefono:</span>
                            <a href={`tel:${selectedOrder.customer?.phone || ''}`} className="font-bold text-emerald-400 hover:underline flex items-center space-x-1">
                              <Phone className="w-3 h-3 flex-shrink-0" />
                              <span>{selectedOrder.customer?.phone || 'N/D'}</span>
                            </a>
                          </div>

                          <div className="sm:col-span-2">
                            <span className="text-gray-400 block text-[10px] uppercase font-bold">Indirizzo di Consegna:</span>
                            <span className="font-bold text-white flex items-center space-x-1">
                              <MapPin className="w-3.5 h-3.5 text-[#FF3E00] flex-shrink-0" />
                              <span>{selectedOrder.customer?.address || ''}, {selectedOrder.customer?.city || ''} ({selectedOrder.customer?.postalCode || ''}), {selectedOrder.customer?.country || ''}</span>
                            </span>
                          </div>

                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase font-bold">Corriere / Spedizione:</span>
                            <span className="font-bold text-amber-300 flex items-center space-x-1">
                              <Truck className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{selectedOrder.customer?.deliveryMethod || 'Standard'}</span>
                            </span>
                          </div>

                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase font-bold">Metodo Pagamento:</span>
                            <span className="font-bold text-white uppercase">{selectedOrder.customer?.paymentMethod || 'N/D'}</span>
                          </div>

                          {selectedOrder.notes && (
                            <div className="sm:col-span-3 bg-zinc-900/80 p-2.5 rounded-xl border border-amber-500/30 text-[11px]">
                              <span className="text-amber-400 font-bold block uppercase text-[9px]">Note & Istruzioni Corriere:</span>
                              <span className="text-gray-200 font-medium">{selectedOrder.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Items Ordered List */}
                      <div>
                        <div className="text-xs font-black uppercase text-gray-300 mb-3 flex items-center space-x-1.5">
                          <ShoppingBag className="w-4 h-4 text-[#00F0FF]" />
                          <span>Articoli Acquistati ({(selectedOrder.items || []).length})</span>
                        </div>

                        <div className="space-y-2">
                          {(selectedOrder.items || []).map((item, idx) => {
                            if (!item) return null;
                            const unitPrice = Number(item.price) || 0;
                            const qty = Number(item.quantity) || 1;
                            const lineTotal = unitPrice * qty;
                            return (
                              <div
                                key={idx}
                                className="bg-[#1A1A1A] p-3 rounded-2xl border border-white/10 flex items-center justify-between gap-3 text-xs"
                              >
                                <div className="flex items-center space-x-3">
                                  <img 
                                    src={item.imageUrl || 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'} 
                                    alt={item.productName || 'Prodotto'} 
                                    className="w-12 h-12 object-cover rounded-xl border border-white/20"
                                  />
                                  <div>
                                    <div className="font-black text-white uppercase">{item.productName || 'Prodotto'}</div>
                                    <div className="text-gray-400 text-[11px] font-medium">
                                      Brand: <strong>{item.brand || 'N/D'}</strong> | Taglia: <strong className="text-[#00F0FF]">{item.selectedSize || 'N/D'} EU</strong> | Colore: <strong>{item.selectedColorName || 'Standard'}</strong>
                                    </div>
                                  </div>
                                </div>

                                <div className="text-right font-mono">
                                  <div className="font-black text-white">{formatPrice(unitPrice)}€ x {qty}</div>
                                  <div className="text-[#00F0FF] font-bold">{formatPrice(lineTotal)}€</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Order Total Breakdown */}
                      <div className="bg-[#121212] p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
                        <div className="flex justify-between text-gray-400">
                          <span>Subtotale Articoli:</span>
                          <span>{formatPrice(selectedOrder.subtotal)}€</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Spedizione:</span>
                          <span>{formatPrice(selectedOrder.shippingCost)}€</span>
                        </div>
                        <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                          <span>Totale Ordine:</span>
                          <span className="text-[#FF3E00]">{formatPrice(selectedOrder.grandTotal)}€</span>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-center p-12 text-gray-400 text-xs">
                      Seleziona un ordine dalla lista a sinistra per visualizzarne i dettagli completi, i prodotti e l'indirizzo di spedizione.
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 2: GESTIONE PRODOTTI & PREZZI */}
            {activeTab === 'products' && (
              <div className="flex-1 flex flex-col overflow-hidden bg-[#161616] p-6 space-y-4">
                
                {/* Actions & Search Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      placeholder="Cerca per nome o marca..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full bg-[#262626] text-white text-xs p-3 pl-10 rounded-xl border border-white/20 focus:border-[#FF3E00] focus:outline-none"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleResetCatalog}
                      className="flex items-center space-x-1.5 text-xs bg-[#262626] hover:bg-[#FF3E00] text-white font-bold px-4 py-2.5 rounded-xl border border-white/20 uppercase transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Ripristina Default</span>
                    </button>

                    <button
                      onClick={handleStartCreateProduct}
                      className="flex items-center space-x-1.5 text-xs bg-[#FF3E00] hover:bg-white hover:text-[#1A1A1A] text-white font-black px-5 py-2.5 rounded-xl border-2 border-white uppercase transition-all artistic-shadow"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Aggiungi Prodotto</span>
                    </button>
                  </div>
                </div>

                {/* Edit or Create Form Drawer Modal */}
                {(isCreatingProduct || editingProduct) && (
                  <div className="bg-[#222] p-6 rounded-3xl border-2 border-[#FF3E00] space-y-4 animate-fade-in artistic-shadow-lg">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h4 className="font-black text-sm uppercase text-[#00F0FF] flex items-center space-x-2">
                        <Edit3 className="w-4 h-4 text-[#FF3E00]" />
                        <span>{isCreatingProduct ? 'Aggiungi Nuovo Prodotto' : `Modifica: ${editingProduct?.name}`}</span>
                      </h4>
                      <button 
                        onClick={() => { setIsCreatingProduct(false); setEditingProduct(null); }}
                        className="p-1 rounded-lg bg-zinc-800 text-gray-300 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {formError && (
                      <div className="bg-red-500/20 border border-red-500/50 text-red-300 font-bold text-xs p-3 rounded-xl flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-400" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <form onSubmit={handleSaveProduct} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                      <div className="sm:col-span-2">
                        <label className="font-bold text-gray-300 block mb-1">Nome Prodotto</label>
                        <input
                          type="text"
                          required
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          className="w-full bg-[#1A1A1A] text-white p-2.5 rounded-xl border border-white/20 focus:border-[#FF3E00] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-gray-300 block mb-1">Marca / Brand</label>
                        <select
                          value={productForm.brand}
                          onChange={(e) => setProductForm({ ...productForm, brand: e.target.value as BrandId })}
                          className="w-full bg-[#1A1A1A] text-white p-2.5 rounded-xl border border-white/20 focus:outline-none"
                        >
                          {['Nike', 'Adidas', 'Jordan', 'New Balance', 'Puma', 'Salomon', 'Dr. Martens', 'Converse', 'Vans', 'Asics'].map(b => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-gray-300 block mb-1">Categoria</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value as CategoryId })}
                          className="w-full bg-[#1A1A1A] text-white p-2.5 rounded-xl border border-white/20 focus:outline-none"
                        >
                          <option value="sneakers">Sneakers</option>
                          <option value="men">Uomo</option>
                          <option value="women">Donna</option>
                          <option value="kids">Bambino</option>
                          <option value="running">Running</option>
                          <option value="boots">Stivali & Boots</option>
                          <option value="sale">Offerta %</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-gray-300 block mb-1">Prezzo Attuale (€)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) })}
                          className="w-full bg-[#1A1A1A] text-[#00F0FF] font-black p-2.5 rounded-xl border border-white/20 focus:border-[#FF3E00] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-gray-300 block mb-1">Prezzo Originale / Senza Sconto (€)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.originalPrice || ''}
                          onChange={(e) => setProductForm({ ...productForm, originalPrice: parseFloat(e.target.value) || undefined })}
                          className="w-full bg-[#1A1A1A] text-gray-300 p-2.5 rounded-xl border border-white/20 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-bold text-gray-300 block mb-1">URL Immagine Principale (Foto Prodotto)</label>
                        <input
                          type="text"
                          required
                          value={productForm.imageUrl}
                          onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                          className="w-full bg-[#1A1A1A] text-white p-2.5 rounded-xl border border-white/20 focus:border-[#FF3E00] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-4">
                        <label className="font-bold text-gray-300 block mb-1">Descrizione del Prodotto</label>
                        <textarea
                          rows={2}
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          className="w-full bg-[#1A1A1A] text-white p-2.5 rounded-xl border border-white/20 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-4 flex items-center justify-end space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={() => { setIsCreatingProduct(false); setEditingProduct(null); }}
                          className="px-5 py-2.5 rounded-xl bg-[#1A1A1A] text-gray-300 font-bold uppercase"
                        >
                          Annulla
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-[#00F0FF] text-black font-black uppercase border border-black hover:bg-white"
                        >
                          Salva Modifiche Prodotto
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Product List Table */}
                <div className="flex-1 overflow-y-auto bg-[#222] rounded-3xl border-2 border-white/10 p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map(product => (
                      <div
                        key={product.id}
                        className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-4 flex flex-col justify-between space-y-3 hover:border-white/40 transition-all group"
                      >
                        <div className="space-y-2">
                          <div className="relative h-40 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <span className="absolute top-2 left-2 bg-black/80 text-white font-black text-[10px] px-2 py-0.5 rounded uppercase">
                              {product.brand}
                            </span>
                            {product.discountPercentage && (
                              <span className="absolute top-2 right-2 bg-[#FF3E00] text-white font-black text-[10px] px-2 py-0.5 rounded uppercase">
                                -{product.discountPercentage}%
                              </span>
                            )}
                          </div>

                          <div className="font-black text-xs text-white uppercase truncate">{product.name}</div>
                          
                          <div className="flex items-center space-x-2 text-xs">
                            <span className="text-[#00F0FF] font-black text-sm">{formatPrice(product.price)}€</span>
                            {product.originalPrice && (
                              <span className="text-gray-500 line-through text-[11px]">{formatPrice(product.originalPrice)}€</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
                          <button
                            onClick={() => handleStartEditProduct(product)}
                            className="flex-1 bg-[#262626] hover:bg-[#FF3E00] text-white text-xs font-bold py-2 rounded-xl border border-white/20 transition-colors uppercase flex items-center justify-center space-x-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Modifica</span>
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            className="p-2.5 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-all border border-red-500/30 flex items-center justify-center cursor-pointer"
                            title="Elimina Scheda Prodotto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: STATISTICHE & BACKUP */}
            {activeTab === 'stats' && (
              <div className="flex-1 overflow-y-auto bg-[#161616] p-6 space-y-6">
                
                {/* Metrics Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#222] p-5 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-gray-400 text-xs font-bold uppercase">Fatturato Totale</div>
                    <div className="text-[#00F0FF] text-3xl font-black">{formatPrice(totalRevenue)}€</div>
                    <div className="text-[10px] text-gray-500 font-mono">Calcolato su tutti gli ordini ricevuti</div>
                  </div>

                  <div className="bg-[#222] p-5 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-gray-400 text-xs font-bold uppercase">Totale Ordini Clienti</div>
                    <div className="text-3xl font-black text-white">{safeOrders.length}</div>
                    <div className="text-[10px] text-gray-500 font-mono">{pendingCount} da processare</div>
                  </div>

                  <div className="bg-[#222] p-5 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-gray-400 text-xs font-bold uppercase">Prodotti in Catalogo</div>
                    <div className="text-3xl font-black text-[#FF3E00]">{safeProducts.length}</div>
                    <div className="text-[10px] text-gray-500 font-mono">Modificabili in tempo reale</div>
                  </div>

                  <div className="bg-[#222] p-5 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-gray-400 text-xs font-bold uppercase">Ordini Consegnati</div>
                    <div className="text-3xl font-black text-emerald-400">{completedCount}</div>
                    <div className="text-[10px] text-gray-500 font-mono">Tutti i dati memorizzati in locale</div>
                  </div>
                </div>

                {/* Backup & Export Controls */}
                <div className="bg-[#222] p-6 rounded-3xl border border-white/10 space-y-4">
                  <h4 className="text-sm font-black uppercase text-white flex items-center space-x-2">
                    <Download className="w-4 h-4 text-[#00F0FF]" />
                    <span>Backup Database e Ripristino</span>
                  </h4>

                  <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">
                    Tutti i dati sugli ordini dei clienti e sulle foto/prezzi dei prodotti restano memorizzati sul browser. Puoi scaricare un file JSON di backup per conservare uno storico completo o per trasferire i dati.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ products, orders }, null, 2));
                        const downloadAnchor = document.createElement('a');
                        downloadAnchor.setAttribute("href", dataStr);
                        downloadAnchor.setAttribute("download", `shoes_fr_backup_${new Date().toISOString().slice(0,10)}.json`);
                        document.body.appendChild(downloadAnchor);
                        downloadAnchor.click();
                        downloadAnchor.remove();
                      }}
                      className="bg-[#00F0FF] text-black font-black text-xs px-5 py-3 rounded-xl border border-black uppercase flex items-center space-x-2 hover:bg-white"
                    >
                      <Download className="w-4 h-4" />
                      <span>Esporta Backup JSON</span>
                    </button>

                    <button
                      onClick={() => {
                        setConfirmModal({
                          isOpen: true,
                          title: 'Svuota Storico Ordini',
                          message: 'Sei sicuro di voler cancellare TUTTI gli ordini dei clienti salvati finora? Questa azione non può essere annullata.',
                          confirmText: 'Sì, Svuota Tutti gli Ordini',
                          onConfirm: () => {
                            clearAllOrders();
                            refreshData();
                            setSelectedOrder(null);
                            setConfirmModal(null);
                          }
                        });
                      }}
                      className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white font-bold text-xs px-5 py-3 rounded-xl border border-red-500/30 uppercase flex items-center space-x-2 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Svuota Storico Ordini</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* CUSTOM CONFIRMATION DIALOG (In-UI modal, iframe resilient) */}
        {confirmModal && confirmModal.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
            <div className="bg-[#1A1A1A] border-2 border-red-500 rounded-3xl p-6 max-w-md w-full space-y-5 text-center shadow-2xl artistic-shadow-lg text-white">
              <div className="w-14 h-14 bg-red-600/20 text-red-500 border border-red-500/40 rounded-2xl flex items-center justify-center mx-auto">
                <Trash2 className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase text-white tracking-tight">{confirmModal.title}</h3>
                <p className="text-xs text-gray-300 font-medium leading-relaxed">{confirmModal.message}</p>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmModal(null)}
                  className="flex-1 py-3 rounded-xl bg-zinc-800 text-gray-300 hover:text-white font-black text-xs uppercase tracking-wider transition-colors border border-white/10 cursor-pointer"
                >
                  Annulla
                </button>

                <button
                  type="button"
                  onClick={() => {
                    confirmModal.onConfirm();
                  }}
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider transition-all border border-red-400 shadow-lg cursor-pointer"
                >
                  {confirmModal.confirmText}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
