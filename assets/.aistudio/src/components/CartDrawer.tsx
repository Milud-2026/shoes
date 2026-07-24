import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Tag 
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (appliedDiscount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>('');
  const [couponSuccess, setCouponSuccess] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.product.price + (item.customColors ? 15 : 0);
    return acc + itemPrice * item.quantity;
  }, 0);

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingCost = subtotal > 50 || cartItems.length === 0 ? 0 : 4.99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const code = couponCode.trim().toUpperCase();
    if (code === 'SHOES3D10') {
      setDiscountPercent(10);
      setCouponSuccess('Codice SHOES3D10 applicato! Sconto del 10%');
    } else if (code === 'WELCOME20') {
      setDiscountPercent(20);
      setCouponSuccess('Codice WELCOME20 applicato! Sconto del 20%');
    } else {
      setCouponError('Codice promozionale non valido');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-950 border-l border-gray-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500 text-black flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-base tracking-tight">Il tuo Carrello</h2>
                <p className="text-xs text-gray-400">{cartItems.length} articoli selezionati</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-800 text-gray-300 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-cyan-50 dark:bg-cyan-950/40 border-b border-cyan-100 dark:border-cyan-900/50 p-3 px-6 text-xs text-cyan-900 dark:text-cyan-300">
            {subtotal >= 50 ? (
              <div className="flex items-center space-x-2 font-bold text-emerald-600 dark:text-emerald-400">
                <Truck className="w-4 h-4" />
                <span>Complimenti! Hai ottenuto la Spedizione GRATUITA.</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Aggiungi ancora {(50 - subtotal).toFixed(2)}€ per Spedizione Gratis</span>
                  <span>{Math.min(100, Math.round((subtotal / 50) * 100))}%</span>
                </div>
                <div className="w-full h-1.5 bg-cyan-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }} 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items Scroll Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-gray-100 dark:divide-zinc-800">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 dark:text-white text-base">Carrello Vuoto</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">Non hai ancora aggiunto nessuna scarpa o creazione 3D al tuo carrello.</p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-cyan-500 text-black font-bold text-xs px-6 py-2.5 rounded-full hover:bg-cyan-400 transition-colors"
                >
                  Continua lo Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemPrice = item.product.price + (item.customColors ? 15 : 0);
                return (
                  <div key={item.id} className="pt-4 first:pt-0 flex space-x-4">
                    {/* Item Image */}
                    <div className="w-20 h-20 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 overflow-hidden flex-shrink-0 relative">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover" 
                      />
                      {item.customColors && (
                        <span className="absolute bottom-1 right-1 bg-cyan-500 text-black text-[9px] font-black px-1 rounded shadow">
                          3D
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-extrabold text-xs text-gray-900 dark:text-white truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-gray-400 hover:text-rose-500 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-[11px] text-gray-500 dark:text-gray-400 space-y-0.5 mt-0.5">
                          <div>Brand: <strong className="text-gray-800 dark:text-gray-200">{item.product.brand}</strong> | Taglia: <strong className="text-gray-800 dark:text-gray-200">EU {item.selectedSize}</strong></div>
                          {item.customColors ? (
                            <div className="text-cyan-600 dark:text-cyan-400 font-semibold flex items-center space-x-1">
                              <Sparkles className="w-3 h-3" />
                              <span>Design 3D Personalizzato</span>
                            </div>
                          ) : (
                            <div>Colore: {item.selectedColor.name}</div>
                          )}
                        </div>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-zinc-800 rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-gray-900 dark:text-white px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-black text-sm text-gray-900 dark:text-white">
                          {(itemPrice * item.quantity).toFixed(2)}€
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Coupon Code Section */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-gray-50 dark:bg-zinc-900/60 border-t border-gray-200 dark:border-zinc-800 space-y-2">
              <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Codice Promozionale (Es. SHOES3D10)"
                    className="w-full bg-white dark:bg-zinc-800 text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 uppercase font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                  <Tag className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3" />
                </div>
                <button
                  type="submit"
                  className="bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-zinc-800"
                >
                  Applica
                </button>
              </form>
              {couponSuccess && <p className="text-[11px] text-emerald-600 font-semibold">{couponSuccess}</p>}
              {couponError && <p className="text-[11px] text-rose-500 font-semibold">{couponError}</p>}
            </div>
          )}

          {/* Checkout Footer Breakdown */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotale Articoli:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{subtotal.toFixed(2)}€</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Sconto Promo ({discountPercent}%):</span>
                    <span>-{discountAmount.toFixed(2)}€</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Spedizione:</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-500 uppercase">Gratuita</strong> : `${shippingCost.toFixed(2)}€`}</span>
                </div>
                <div className="flex justify-between text-base font-black text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-zinc-800">
                  <span>Totale Ordine:</span>
                  <span className="text-cyan-600 dark:text-cyan-400">{grandTotal.toFixed(2)}€</span>
                </div>
              </div>

              <button
                onClick={() => onProceedToCheckout(discountPercent)}
                className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-sm py-4 rounded-2xl shadow-xl shadow-cyan-500/20 flex items-center justify-center space-x-2 transition-transform active:scale-95"
              >
                <span>Procedi al Cassa Sicura</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Pagamento Sicuro SSL Encrypted (Credit Card, PayPal, Apple Pay, Klarna)</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
