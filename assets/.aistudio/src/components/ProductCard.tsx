import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { Product, ColorOption } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onAddToCart: (product: Product, size: number, color: ColorOption) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0] || { id: 'default', name: 'Default', hex: '#FFFFFF' });
  const [selectedSize] = useState<number>(product.availableSizes[2] || 42);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div 
      onClick={() => onOpenDetail(product)}
      className="group relative bg-white border-2 border-[#1A1A1A] rounded-3xl overflow-hidden artistic-shadow hover:shadow-[10px_10px_0px_#1A1A1A] transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-[#EEEAE3] border-b-2 border-[#1A1A1A] overflow-hidden flex items-center justify-center p-4">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 items-start">
          {product.isBestSeller && (
            <span className="bg-[#1A1A1A] text-white font-black text-[10px] uppercase px-2.5 py-0.5 rounded-md border border-[#1A1A1A] shadow-[2px_2px_0px_#FF3E00] tracking-wider">
              Bestseller
            </span>
          )}
          {product.discountPercentage && (
            <span className="bg-[#FF3E00] text-white font-black text-[10px] px-2.5 py-0.5 rounded-md border border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-[#FF3E00] text-white shadow-[2px_2px_0px_#1A1A1A]'
              : 'bg-white text-[#1A1A1A] hover:bg-[#FF3E00] hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-2xl"
        />
      </div>

      {/* Product Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div>
          {/* Brand & Subcategory */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-black text-[#1A1A1A] uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="text-[10px] font-bold text-[#888] uppercase">{product.subCategory}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-black text-[#1A1A1A] text-base leading-snug line-clamp-1 uppercase group-hover:text-[#FF3E00] transition-colors">
            {product.name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center space-x-1.5 mt-1.5">
            <div className="flex items-center text-[#FF3E00]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-black text-[#1A1A1A]">
              {product.rating}
            </span>
            <span className="text-xs text-[#888] font-bold">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Color Swatch Dots */}
        <div className="flex items-center space-x-2 pt-1" onClick={(e) => e.stopPropagation()}>
          {product.colors.map((col) => (
            <button
              key={col.id}
              onClick={() => setSelectedColor(col)}
              className={`w-5 h-5 rounded-full border-2 transition-transform p-0.5 ${
                selectedColor.id === col.id
                  ? 'border-[#1A1A1A] scale-125 shadow-[2px_2px_0px_#FF3E00]'
                  : 'border-transparent hover:scale-110'
              }`}
              title={col.name}
            >
              <span 
                className="block w-full h-full rounded-full border border-black/20" 
                style={{ backgroundColor: col.hex }} 
              />
            </button>
          ))}
        </div>

        {/* Price & Quick Add to Bag Bar */}
        <div className="flex items-center justify-between pt-3 border-t-2 border-[#E5E1DA]">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-black text-[#FF3E00]">
                {product.price.toFixed(2)}€
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#888] font-bold line-through">
                  {product.originalPrice.toFixed(2)}€
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`px-3 py-2 rounded-xl border-2 border-[#1A1A1A] font-black text-xs uppercase tracking-wider transition-all flex items-center space-x-1 ${
              isAdded
                ? 'bg-[#00F0FF] text-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]'
                : 'bg-[#1A1A1A] text-white hover:bg-[#FF3E00] hover:text-white shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Aggiunto</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">+Carrello</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

