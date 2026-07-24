/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Product, 
  CategoryId, 
  BrandId, 
  FilterState, 
  CartItem, 
  ColorOption, 
  Currency, 
  Language 
} from './types';
import { loadProducts } from './lib/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandSlider } from './components/BrandSlider';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { DeployModal } from './components/DeployModal';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { translations } from './data/translations';
import { Box } from 'lucide-react';

export default function App() {
  // Products from localStorage / default
  const [productsList, setProductsList] = useState<Product[]>([]);

  useEffect(() => {
    setProductsList(loadProducts());
    const handleUpdate = () => {
      setProductsList(loadProducts());
    };
    window.addEventListener('solevault_data_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('solevault_data_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const refreshProducts = () => {
    setProductsList(loadProducts());
  };

  // State
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [language, setLanguage] = useState<Language>('IT');

  // Modals & Drawers
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['nike-air-force-1-3d']);

  const t = translations[language] || translations['EN'];

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    selectedBrands: [],
    minPrice: 30,
    maxPrice: 300,
    selectedSizes: [],
    selectedColors: [],
    onlyCustomizable: false,
    onlySale: false,
    sortBy: 'featured',
  });

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return productsList.filter((p) => {
      // Category match
      if (filters.category !== 'all') {
        if (filters.category === 'sale' && !p.discountPercentage) return false;
        if (filters.category !== 'sale' && p.category !== filters.category) return false;
      }

      // Search match
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchBrand = p.brand.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchCategory) return false;
      }

      // Brand match
      if (filters.selectedBrands.length > 0 && !filters.selectedBrands.includes(p.brand)) {
        return false;
      }

      // Price match
      if (p.price < filters.minPrice || p.price > filters.maxPrice) {
        return false;
      }

      // Size match
      if (filters.selectedSizes.length > 0) {
        const hasSize = filters.selectedSizes.some((sz) => p.availableSizes.includes(sz));
        if (!hasSize) return false;
      }

      // Sale toggle
      if (filters.onlySale && !p.discountPercentage) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default order
    });
  }, [filters, productsList]);

  // Wishlist toggle handler
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    selectedSize: number,
    selectedColor: ColorOption
  ) => {
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor.id}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedSize,
          selectedColor,
          quantity: 1,
        },
      ];
    });

    setIsCartOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove Cart Item
  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Brand toggle from BrandSlider
  const handleToggleBrandFilter = (brand: BrandId) => {
    setFilters((prev) => {
      const updated = prev.selectedBrands.includes(brand)
        ? prev.selectedBrands.filter((b) => b !== brand)
        : [...prev.selectedBrands, brand];
      return { ...prev, selectedBrands: updated };
    });
  };

  return (
    <div 
      dir={language === 'AR' ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] flex flex-col font-sans transition-colors"
    >
      
      {/* Top Navbar */}
      <Navbar
        activeCategory={filters.category}
        onSelectCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setFilters((prev) => ({ ...prev, category: 'all', searchQuery: '' }))}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        currency={currency}
        onCurrencyChange={setCurrency}
        language={language}
        onLanguageChange={setLanguage}
        products={productsList}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
        onToggleMobileFilter={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Main Hero Showcase */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('catalog-grid');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          language={language}
        />

        {/* Brands Slider Row */}
        <BrandSlider
          selectedBrands={filters.selectedBrands}
          onToggleBrand={handleToggleBrandFilter}
        />

        {/* Main Catalog Section */}
        <section id="catalog-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b-2 border-[#1A1A1A] pb-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-black text-[#FF3E00] uppercase tracking-[0.2em]">
                <Box className="w-4 h-4" />
                <span>SoleVault Official Catalog</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-[#1A1A1A] mt-1">
                {filters.category === 'all' && t.categories.all}
                {filters.category === 'men' && t.categories.men}
                {filters.category === 'women' && t.categories.women}
                {filters.category === 'kids' && t.categories.kids}
                {filters.category === 'sneakers' && t.categories.sneakers}
                {filters.category === 'running' && t.categories.running}
                {filters.category === 'boots' && t.categories.boots}
                {filters.category === 'sale' && t.categories.sale}
              </h2>
            </div>

            <div className="flex items-center space-x-3 text-xs font-black uppercase tracking-wider text-[#666]">
              <span>Modelli trovati: <strong className="text-[#FF3E00]">{filteredProducts.length}</strong></span>
            </div>
          </div>

          {/* Catalog Layout Grid (Sidebar + Products) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Filter Sidebar */}
            <div className={`lg:col-span-3 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
              <FilterSidebar
                filters={filters}
                onChangeFilters={setFilters}
                onResetFilters={() =>
                  setFilters({
                    searchQuery: '',
                    category: 'all',
                    selectedBrands: [],
                    minPrice: 30,
                    maxPrice: 300,
                    selectedSizes: [],
                    selectedColors: [],
                    onlyCustomizable: false,
                    onlySale: false,
                    sortBy: 'featured',
                  })
                }
                totalResults={filteredProducts.length}
              />
            </div>

            {/* Right Product Grid */}
            <div className="lg:col-span-9">
              {filteredProducts.length === 0 ? (
                <div className="bg-white border-2 border-[#1A1A1A] rounded-3xl p-12 text-center space-y-4 artistic-shadow">
                  <div className="w-16 h-16 bg-[#EEEAE3] border-2 border-[#1A1A1A] rounded-2xl flex items-center justify-center mx-auto text-[#1A1A1A]">
                    <Box className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-black uppercase text-[#1A1A1A]">Nessuna scarpa trovata</h3>
                  <p className="text-xs text-[#666] font-medium max-w-sm mx-auto">Prova a reimpostare i filtri o la ricerca.</p>
                  <button
                    onClick={() =>
                      setFilters({
                        searchQuery: '',
                        category: 'all',
                        selectedBrands: [],
                        minPrice: 30,
                        maxPrice: 300,
                        selectedSizes: [],
                        selectedColors: [],
                        onlyCustomizable: false,
                        onlySale: false,
                        sortBy: 'featured',
                      })
                    }
                    className="bg-[#FF3E00] text-white font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl border-2 border-[#1A1A1A] artistic-shadow hover:bg-[#1A1A1A]"
                  >
                    Reset Tutti i Filtri
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenDetail={(p) => setSelectedProductDetail(p)}
                      onAddToCart={handleAddToCart}
                      isWishlisted={wishlistIds.includes(product.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Modals & Overlays */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProductDetail ? wishlistIds.includes(selectedProductDetail.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <ErrorBoundary fallbackTitle="Errore Pannello Admin">
        <AdminPanelModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          onProductsUpdated={refreshProducts}
        />
      </ErrorBoundary>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={(discountPct) => {
          setAppliedDiscountPercent(discountPct);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountPercent={appliedDiscountPercent}
        onClearCart={() => setCartItems([])}
      />

      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        language={language}
      />

    </div>
  );
}
