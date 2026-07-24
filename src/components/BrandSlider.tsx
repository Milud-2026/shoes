import React from 'react';
import { BRANDS } from '../data/products';
import { BrandId } from '../types';

interface BrandSliderProps {
  selectedBrands: BrandId[];
  onToggleBrand: (brand: BrandId) => void;
}

export const BrandSlider: React.FC<BrandSliderProps> = ({ selectedBrands, onToggleBrand }) => {
  return (
    <section className="bg-gray-100 dark:bg-zinc-900/60 border-y border-gray-200 dark:border-zinc-800/80 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            I Migliori Brands su Shoes.fr
          </h3>
          <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
            Seleziona per filtrare
          </span>
        </div>

        <div className="flex items-center space-x-3 overflow-x-auto pb-2 no-scrollbar">
          {BRANDS.map((brand) => {
            const isSelected = selectedBrands.includes(brand.id);
            return (
              <button
                key={brand.id}
                onClick={() => onToggleBrand(brand.id)}
                className={`flex-shrink-0 flex flex-col items-center justify-center px-5 py-3 rounded-2xl border transition-all select-none min-w-[120px] ${
                  isSelected
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-lg scale-105'
                    : 'bg-white dark:bg-zinc-950 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-zinc-800 hover:border-cyan-500 dark:hover:border-cyan-400'
                }`}
              >
                <span className="font-extrabold text-sm tracking-tight">{brand.name}</span>
                <span className={`text-[9px] uppercase tracking-widest font-semibold mt-0.5 ${
                  isSelected ? 'text-cyan-400 dark:text-cyan-600' : 'text-gray-400'
                }`}>
                  {brand.logoText}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
