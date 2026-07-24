import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  SlidersHorizontal, 
  Sparkles, 
  Box, 
  Globe, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  ChevronDown,
  X,
  Menu,
  Download,
  Lock
} from 'lucide-react';
import { CategoryId, Currency, Language, Product } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  activeCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenDeployModal: () => void;
  onOpenAdmin: () => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  language: Language;
  onLanguageChange: (l: Language) => void;
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onToggleMobileFilter?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenDeployModal,
  onOpenAdmin,
  currency,
  onCurrencyChange,
  language,
  onLanguageChange,
  products,
  onSelectProduct,
  onToggleMobileFilter,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = translations[language] || translations['EN'];

  // Search autocomplete matching
  const searchResults = searchQuery.trim().length >= 2
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const categories: { id: CategoryId; label: string; badge?: string }[] = [
    { id: 'all', label: t.categories.all },
    { id: 'men', label: t.categories.men },
    { id: 'women', label: t.categories.women },
    { id: 'kids', label: t.categories.kids },
    { id: 'sneakers', label: t.categories.sneakers },
    { id: 'running', label: t.categories.running },
    { id: 'boots', label: t.categories.boots },
    { id: 'sale', label: t.categories.sale, badge: 'HOT' },
  ];

  const languagesList: { code: Language; name: string; flag: string }[] = [
    { code: 'AR', name: 'العربية / الدارجة', flag: '🇲🇦' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
  ];

  const currenciesList: { code: Currency; label: string }[] = [
    { code: 'EUR', label: '€ EUR' },
    { code: 'MAD', label: 'DH MAD' },
    { code: 'USD', label: '$ USD' },
    { code: 'GBP', label: '£ GBP' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b-2 border-[#1A1A1A] transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-[#1A1A1A] text-white text-xs py-2 px-4 border-b border-[#333]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center space-x-4 sm:space-x-6 text-[11px] text-zinc-300 font-bold uppercase tracking-wider">
            <span className="flex items-center space-x-1.5 text-white">
              <Truck className="w-3.5 h-3.5 text-[#FF3E00]" />
              <span>{t.freeShipping}</span>
            </span>
            <span className="hidden sm:flex items-center space-x-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>{t.easyReturns}</span>
            </span>
            <span className="hidden md:flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF3E00]" />
              <span>{t.guaranteedOriginal}</span>
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 text-[11px] font-bold">
            
            {/* Deploy & Download GitHub / Vercel Trigger */}
            <button
              onClick={onOpenDeployModal}
              className="bg-[#FF3E00] text-white hover:bg-white hover:text-[#1A1A1A] px-2.5 py-0.5 rounded-lg border border-white font-black uppercase text-[10px] tracking-wider transition-all flex items-center space-x-1 shadow-sm"
            >
              <Download className="w-3 h-3" />
              <span>{t.deployButton}</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative group flex items-center space-x-1 cursor-pointer hover:text-[#FF3E00] transition-colors">
              <Globe className="w-3.5 h-3.5 text-[#FF3E00]" />
              <span className="font-extrabold uppercase">{language}</span>
              <ChevronDown className="w-3 h-3" />
              <div className="absolute right-0 top-full hidden group-hover:block bg-[#1A1A1A] border-2 border-[#FF3E00] rounded-2xl shadow-2xl p-1.5 z-50 text-white min-w-[140px] text-left">
                {languagesList.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`flex items-center space-x-2 w-full text-left px-3 py-1.5 text-xs rounded-xl hover:bg-[#FF3E00] hover:text-white transition-colors ${
                      language === lang.code ? 'bg-[#2A2A2A] text-[#00F0FF] font-black' : 'font-semibold'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Currency Selector Dropdown */}
            <div className="relative group flex items-center space-x-1 cursor-pointer hover:text-[#FF3E00] transition-colors">
              <span className="font-extrabold">{currenciesList.find(c => c.code === currency)?.label}</span>
              <ChevronDown className="w-3 h-3" />
              <div className="absolute right-0 top-full hidden group-hover:block bg-[#1A1A1A] border-2 border-[#FF3E00] rounded-2xl shadow-2xl p-1.5 z-50 text-white min-w-[90px] text-left">
                {currenciesList.map(curr => (
                  <button
                    key={curr.code}
                    onClick={() => onCurrencyChange(curr.code)}
                    className={`block w-full text-left px-3 py-1.5 text-xs rounded-xl hover:bg-[#FF3E00] hover:text-white transition-colors ${
                      currency === curr.code ? 'text-[#00F0FF] font-black' : ''
                    }`}
                  >
                    {curr.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl border-2 border-[#1A1A1A] text-[#1A1A1A] bg-white hover:bg-[#FF3E00] hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo - Shoes.fr 3D Artistic Theme */}
        <div 
          onClick={() => onSelectCategory('all')} 
          className="flex items-center space-x-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 bg-[#FF3E00] border-2 border-[#1A1A1A] text-white flex items-center justify-center font-black rounded-xl artistic-shadow group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-2xl sm:text-3xl tracking-tighter italic uppercase text-[#1A1A1A]">
                SOLE<span className="text-[#FF3E00]">VAULT</span>
              </span>
              <span className="bg-[#1A1A1A] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md uppercase tracking-widest border border-[#1A1A1A]">
                PRO
              </span>
            </div>
            <p className="text-[9px] text-[#888] tracking-[0.2em] uppercase font-black">
              Exclusive Footwear
            </p>
          </div>
        </div>

        {/* Search Bar with Live Instant Autocomplete */}
        <div className="relative flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-[#EEEAE3] text-[#1A1A1A] font-bold pl-10 pr-10 py-2.5 rounded-full text-xs uppercase tracking-tight border-2 border-transparent focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all placeholder-[#888]"
            />
            <Search className="w-4 h-4 text-[#1A1A1A] absolute left-3.5 top-3" />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-3 text-[#1A1A1A] hover:text-[#FF3E00]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Results Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#1A1A1A] rounded-2xl artistic-shadow-lg overflow-hidden z-50 animate-fade-in">
              <div className="p-2 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3">
                Suggested Results
              </div>
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    setIsSearchFocused(false);
                  }}
                  className="flex items-center space-x-3 p-3 hover:bg-[#EEEAE3] cursor-pointer transition-colors border-b border-[#E5E1DA] last:border-none"
                >
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-12 h-12 object-cover rounded-xl border border-[#1A1A1A]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-[#1A1A1A] uppercase tracking-tight truncate">
                      {product.name}
                    </div>
                    <div className="text-[11px] text-[#666] font-bold flex items-center space-x-2">
                      <span>{product.brand}</span>
                      <span>•</span>
                      <span className="text-[#FF3E00] font-black">{product.price.toFixed(2)}€</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#FF3E00] text-white font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    3D Render
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons: Wishlist, Cart */}
        <div className="flex items-center space-x-3">
          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative w-10 h-10 border-2 border-[#1A1A1A] bg-white rounded-full flex items-center justify-center font-bold hover:bg-[#1A1A1A] hover:text-white transition-all text-[#1A1A1A]"
            title={t.wishlist}
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF3E00] text-white text-[10px] font-black w-5 h-5 rounded-full border border-[#1A1A1A] flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative px-4 py-2.5 bg-[#1A1A1A] text-white rounded-full flex items-center space-x-2 border-2 border-[#1A1A1A] font-black text-xs uppercase tracking-wider hover:bg-[#FF3E00] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{t.cart}</span>
            {cartCount > 0 && (
              <span className="bg-[#FF3E00] text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="border-t border-[#E5E1DA] bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar flex items-center justify-between py-2.5 text-xs font-bold uppercase tracking-widest space-x-1">
          <div className="flex items-center space-x-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full border-2 transition-all flex items-center space-x-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-[#FF3E00] text-white border-[#1A1A1A] font-black shadow-[2px_2px_0px_#1A1A1A]'
                    : 'bg-transparent text-[#1A1A1A] border-transparent hover:border-[#1A1A1A] hover:bg-[#EEEAE3]'
                }`}
              >
                <span>{cat.label}</span>
                {cat.badge && (
                  <span className="bg-[#1A1A1A] text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                    {cat.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Filter Toggle */}
          {onToggleMobileFilter && (
            <button
              onClick={onToggleMobileFilter}
              className="md:hidden flex items-center space-x-1 px-3 py-1.5 rounded-full border-2 border-[#1A1A1A] bg-white text-xs font-bold uppercase"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b-2 border-[#1A1A1A] bg-[#FDFBF7] p-4 space-y-4 animate-fade-in">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-[#EEEAE3] text-[#1A1A1A] font-bold text-xs uppercase p-3 rounded-full border-2 border-[#1A1A1A] pl-10"
            />
            <Search className="w-4 h-4 text-[#1A1A1A] absolute left-3.5 top-3.5" />
          </div>

          {/* Mobile Export button */}
          <button
            onClick={() => {
              onOpenDeployModal();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center space-x-2 bg-[#1A1A1A] text-white font-black py-3 rounded-xl border-2 border-[#1A1A1A] text-xs uppercase tracking-widest"
          >
            <Download className="w-4 h-4 text-[#FF3E00]" />
            <span>{t.deployButton}</span>
          </button>
        </div>
      )}
    </header>
  );
};
