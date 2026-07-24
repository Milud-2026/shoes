import React from 'react';
import { FilterState, BrandId, CategoryId } from '../types';
import { BRANDS, COLOR_PALETTE } from '../data/products';
import { SlidersHorizontal, RotateCcw, Search, Sparkles } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChangeFilters,
  onResetFilters,
  totalResults,
}) => {
  const categories: { id: CategoryId; label: string }[] = [
    { id: 'all', label: 'Tutti i Prodotti' },
    { id: 'men', label: 'Uomo' },
    { id: 'women', label: 'Donna' },
    { id: 'kids', label: 'Bambino' },
    { id: 'sneakers', label: 'Sneakers 3D' },
    { id: 'running', label: 'Performance' },
    { id: 'boots', label: 'Stivali & Boots' },
    { id: 'sale', label: 'In Offerta' },
  ];

  const availableSizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];

  const handleBrandToggle = (brand: BrandId) => {
    const updated = filters.selectedBrands.includes(brand)
      ? filters.selectedBrands.filter((b) => b !== brand)
      : [...filters.selectedBrands, brand];
    onChangeFilters({ ...filters, selectedBrands: updated });
  };

  const handleSizeToggle = (size: number) => {
    const updated = filters.selectedSizes.includes(size)
      ? filters.selectedSizes.filter((s) => s !== size)
      : [...filters.selectedSizes, size];
    onChangeFilters({ ...filters, selectedSizes: updated });
  };

  return (
    <aside className="w-full lg:w-72 bg-white border-2 border-[#1A1A1A] rounded-3xl p-6 space-y-6 artistic-shadow">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] pb-4">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-[#FF3E00]" />
          <h3 className="font-black text-[#1A1A1A] text-base uppercase tracking-tight">Filtri Catalogo</h3>
          <span className="text-[10px] bg-[#1A1A1A] text-white px-2 py-0.5 rounded font-black">
            {totalResults}
          </span>
        </div>

        <button
          onClick={onResetFilters}
          className="text-xs text-[#888] hover:text-[#FF3E00] flex items-center space-x-1 font-bold transition-colors uppercase tracking-wider"
          title="Ripristina Filtri"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort By Dropdown */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-[#999] uppercase tracking-[0.2em] block">Ordinamento</label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChangeFilters({ ...filters, sortBy: e.target.value as any })}
          className="w-full bg-[#EEEAE3] text-[#1A1A1A] text-xs font-black uppercase p-3 rounded-xl border-2 border-[#1A1A1A] focus:outline-none focus:bg-white"
        >
          <option value="featured">Più Rilevanti</option>
          <option value="price-asc">Prezzo: Crescente</option>
          <option value="price-desc">Prezzo: Decrescente</option>
          <option value="rating">Valutazione Clienti</option>
          <option value="newest">Novità 2026</option>
        </select>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-[#999] uppercase tracking-[0.2em] block">Categoria</label>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChangeFilters({ ...filters, category: cat.id })}
              className={`w-full text-left text-xs px-3 py-2 rounded-xl transition-all font-black uppercase tracking-wider flex items-center justify-between border-2 ${
                filters.category === cat.id
                  ? 'bg-[#FF3E00] text-white border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]'
                  : 'bg-transparent border-transparent text-[#1A1A1A] hover:bg-[#EEEAE3] hover:border-[#1A1A1A]'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brands Filter */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-[#999] uppercase tracking-[0.2em] block">Marchi (Brands)</label>
        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
          {BRANDS.map((brand) => {
            const isChecked = filters.selectedBrands.includes(brand.id);
            return (
              <label
                key={brand.id}
                className="flex items-center space-x-2.5 text-xs text-[#1A1A1A] cursor-pointer hover:text-[#FF3E00] font-bold uppercase tracking-wider select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleBrandToggle(brand.id)}
                  className="rounded border-2 border-[#1A1A1A] text-[#FF3E00] focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <span className={isChecked ? 'font-black text-[#FF3E00]' : ''}>{brand.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-black uppercase">
          <span className="text-[#999] tracking-wider text-[10px]">Fascia Prezzo</span>
          <span className="text-[#FF3E00]">{filters.minPrice}€ - {filters.maxPrice}€</span>
        </div>
        <input
          type="range"
          min="30"
          max="300"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => onChangeFilters({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-[#FF3E00] cursor-pointer"
        />
      </div>

      {/* Sizes Selection */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-[#999] uppercase tracking-[0.2em] block">Taglia (EU)</label>
        <div className="grid grid-cols-4 gap-1.5">
          {availableSizes.map((sz) => {
            const isSelected = filters.selectedSizes.includes(sz);
            return (
              <button
                key={sz}
                onClick={() => handleSizeToggle(sz)}
                className={`py-1.5 text-xs rounded-xl font-black border-2 transition-all uppercase ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[2px_2px_0px_#FF3E00]'
                    : 'bg-[#EEEAE3] text-[#1A1A1A] border-[#1A1A1A] hover:bg-white'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Feature Toggles */}
      <div className="space-y-2 pt-2 border-t-2 border-[#E5E1DA]">
        <label className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#1A1A1A] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.onlyCustomizable}
            onChange={(e) => onChangeFilters({ ...filters, onlyCustomizable: e.target.checked })}
            className="rounded border-2 border-[#1A1A1A] text-[#FF3E00] focus:ring-0 w-4 h-4 cursor-pointer"
          />
          <Sparkles className="w-3.5 h-3.5 text-[#FF3E00]" />
          <span>Solo Custom 3D</span>
        </label>

        <label className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#FF3E00] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.onlySale}
            onChange={(e) => onChangeFilters({ ...filters, onlySale: e.target.checked })}
            className="rounded border-2 border-[#1A1A1A] text-[#FF3E00] focus:ring-0 w-4 h-4 cursor-pointer"
          />
          <span>% Solo in Sconto</span>
        </label>
      </div>

    </aside>
  );
};

