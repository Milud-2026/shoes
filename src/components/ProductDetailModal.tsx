import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  ShoppingBag, 
  Check, 
  Heart, 
  Ruler
} from 'lucide-react';
import { Product, ColorOption } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: number, color: ColorOption) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0] || { id: 'def', name: 'Standard', hex: '#FFFFFF' });
  const [selectedSize, setSelectedSize] = useState<number>(product.availableSizes[2] || 42);
  const [activeImage, setActiveImage] = useState<string>(product.imageUrl);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 p-6 lg:p-8 gap-8">
          
          {/* Left Photo Column */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Stage Container */}
            <div className="aspect-square w-full rounded-3xl bg-gray-50 dark:bg-zinc-900 overflow-hidden border border-gray-200 dark:border-zinc-800 relative">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`absolute top-4 right-4 z-10 p-3 rounded-full border shadow-md transition-colors ${
                  isWishlisted
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white/80 dark:bg-zinc-900/80 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-zinc-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Gallery Thumbnail Row */}
            {product.galleryUrls && product.galleryUrls.length > 0 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-1 no-scrollbar">
                {product.galleryUrls.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-2xl border-2 overflow-hidden flex-shrink-0 ${
                      activeImage === img ? 'border-[#FF3E00] ring-2 ring-[#FF3E00]/30' : 'border-gray-200 dark:border-zinc-800'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Brand & Category */}
              <div>
                <span className="text-xs font-black text-[#FF3E00] uppercase tracking-widest">
                  {product.brand} • {product.category}
                </span>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight mt-1">
                  {product.name}
                </h2>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviewCount} recensioni verificate)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3 py-2 border-y border-gray-100 dark:border-zinc-800">
                <span className="text-3xl font-black text-[#FF3E00]">
                  {product.price.toFixed(2)}€
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice.toFixed(2)}€
                  </span>
                )}
                <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full">
                  In Stock • Consegna 24/48h
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>

              {/* Color Swatch Picker */}
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">
                  Colore: <span className="text-gray-900 dark:text-white font-semibold">{selectedColor.name}</span>
                </label>
                <div className="flex items-center space-x-2">
                  {product.colors.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => setSelectedColor(col)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform p-0.5 ${
                        selectedColor.id === col.id
                          ? 'border-[#FF3E00] scale-125 shadow-md'
                          : 'border-transparent hover:scale-110'
                      }`}
                    >
                      <span className="block w-full h-full rounded-full border border-gray-300" style={{ backgroundColor: col.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Seleziona Taglia (EU)
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-xs text-[#FF3E00] font-semibold flex items-center space-x-1 hover:underline"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Guida Taglie</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                        selectedSize === size
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-black border-zinc-900 dark:border-white shadow-md'
                          : 'bg-gray-50 dark:bg-zinc-900 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-zinc-800 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Breakdown */}
              <div className="bg-gray-50 dark:bg-zinc-900/60 p-4 rounded-2xl text-xs space-y-1.5 border border-gray-200/80 dark:border-zinc-800">
                <div className="font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1">
                  Specifiche Materiale:
                </div>
                <div className="text-gray-600 dark:text-gray-400">Tomaia: <strong className="text-gray-800 dark:text-gray-200">{product.materials.upper}</strong></div>
                <div className="text-gray-600 dark:text-gray-400">Fodera: <strong className="text-gray-800 dark:text-gray-200">{product.materials.lining}</strong></div>
                <div className="text-gray-600 dark:text-gray-400">Suola: <strong className="text-gray-800 dark:text-gray-200">{product.materials.sole}</strong></div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 text-[11px] text-gray-500 pt-2">
                <div className="flex items-center space-x-1.5">
                  <Truck className="w-4 h-4 text-[#FF3E00]" />
                  <span>Spedizione 24h</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <RefreshCw className="w-4 h-4 text-emerald-500" />
                  <span>Reso 30 giorni</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>100% Originale</span>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 rounded-2xl font-black text-sm transition-all flex items-center justify-center space-x-2 shadow-xl ${
                  isAdded
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#FF3E00] text-white hover:bg-[#1A1A1A]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Aggiunto al Carrello!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Aggiungi al Carrello ({product.price.toFixed(2)}€)</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
