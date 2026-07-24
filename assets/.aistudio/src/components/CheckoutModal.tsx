import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  PackageCheck,
  ShoppingBag
} from 'lucide-react';
import { CartItem, Order } from '../types';
import { saveOrder } from '../lib/storage';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountPercent: number;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountPercent,
  onClearCart,
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [formData, setFormData] = useState({
    fullName: 'Marco Rossi',
    email: 'marco.rossi@example.it',
    phone: '+39 347 123 4567',
    address: 'Via Montenapoleone 15',
    city: 'Milano',
    postalCode: '20121',
    country: 'Italia',
    notes: 'Citofono Rossi - Piano 3',
    deliveryMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
  });

  const [orderId, setOrderId] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.product.price + (item.customColors ? 15 : 0);
    return acc + itemPrice * item.quantity;
  }, 0);

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingCost = formData.deliveryMethod === 'express' ? 9.99 : (subtotal > 50 ? 0 : 4.99);
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `SV-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    // Save order object to localStorage for Admin Panel
    const newOrder: Order = {
      id: generatedId,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || '+39 000 000 0000',
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country || 'Italia',
        deliveryMethod: formData.deliveryMethod === 'express' ? 'Chronopost Express (24h)' : 'Colissimo Standard (48h)',
        paymentMethod: formData.paymentMethod.toUpperCase(),
      },
      items: cartItems.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        brand: item.product.brand,
        imageUrl: item.product.imageUrl,
        selectedSize: item.selectedSize,
        selectedColorName: item.selectedColor.name,
        price: item.product.price + (item.customColors ? 15 : 0),
        quantity: item.quantity,
      })),
      subtotal,
      discountAmount,
      shippingCost,
      grandTotal,
      status: 'In Attesa',
      notes: formData.notes,
    };

    saveOrder(newOrder);

    setStep('success');
    onClearCart();

    // Trigger celebration confetti explosion
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-zinc-900 text-white px-6 py-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500 text-black flex items-center justify-center font-bold text-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-tight">Cassa Sicura SoleVault</h3>
              <p className="text-[11px] text-gray-400">Transazione protetta con crittografia SSL 256-bit</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800 text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Breadcrumbs */}
        {step !== 'success' && (
          <div className="bg-gray-50 dark:bg-zinc-900 px-6 py-3 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-around text-xs font-bold">
            <div className={`flex items-center space-x-2 ${step === 'shipping' ? 'text-cyan-600 dark:text-cyan-400' : 'text-gray-400'}`}>
              <Truck className="w-4 h-4" />
              <span>1. Spedizione & Indirizzo</span>
            </div>
            <div className={`flex items-center space-x-2 ${step === 'payment' ? 'text-cyan-600 dark:text-cyan-400' : 'text-gray-400'}`}>
              <CreditCard className="w-4 h-4" />
              <span>2. Pagamento Sicuro</span>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'shipping' && (
            <form onSubmit={() => setStep('payment')} className="space-y-4">
              <h4 className="font-extrabold text-gray-900 dark:text-white text-base">Informazioni di Consegna</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Nome e Cognome *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-zinc-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Email di Conferma *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-zinc-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Telefono / Cellulare *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-zinc-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Paese *</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-zinc-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Indirizzo di Spedizione e Civico *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-zinc-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Città *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-zinc-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">CAP / Codice Postale *</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-zinc-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Note per la Spedizione / Citofono (Opzionale)</label>
                  <input
                    type="text"
                    placeholder="Es. Citofono 12B, lasciare dal portinaio, ecc."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-zinc-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery Method Options */}
              <div className="pt-2">
                <label className="font-bold text-gray-700 dark:text-gray-300 text-xs block mb-2">Modalità di Spedizione</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between ${formData.deliveryMethod === 'standard' ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30' : 'border-gray-200 dark:border-zinc-800'}`}>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={formData.deliveryMethod === 'standard'}
                        onChange={() => setFormData({ ...formData, deliveryMethod: 'standard' })}
                      />
                      <div>
                        <div className="font-bold">Colissimo Standard (48h)</div>
                        <div className="text-[11px] text-gray-500">Consegna in 2-3 giorni lavorativi</div>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-600">GRATIS</span>
                  </label>

                  <label className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between ${formData.deliveryMethod === 'express' ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30' : 'border-gray-200 dark:border-zinc-800'}`}>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={formData.deliveryMethod === 'express'}
                        onChange={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                      />
                      <div>
                        <div className="font-bold">Chronopost Express (24h)</div>
                        <div className="text-[11px] text-gray-500">Consegna garantita entro domani</div>
                      </div>
                    </div>
                    <span className="font-bold">9.99€</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-cyan-500 text-black font-extrabold text-sm px-8 py-3.5 rounded-2xl hover:bg-cyan-400 transition-all flex items-center space-x-2"
                >
                  <span>Prosegui al Pagamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handleCompleteOrder} className="space-y-4">
              <h4 className="font-extrabold text-gray-900 dark:text-white text-base">Scegli il Metodo di Pagamento</h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {['card', 'paypal', 'applepay', 'klarna'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method })}
                    className={`p-3 rounded-xl border font-bold text-center uppercase tracking-wider transition-all ${
                      formData.paymentMethod === method
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                        : 'border-gray-200 dark:border-zinc-800 text-gray-600'
                    }`}
                  >
                    {method === 'card' && 'Carta di Credito'}
                    {method === 'paypal' && 'PayPal'}
                    {method === 'applepay' && 'Apple Pay'}
                    {method === 'klarna' && 'Klarna 3x'}
                  </button>
                ))}
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="space-y-3 bg-gray-50 dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Numero Carta</label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-white dark:bg-zinc-800 text-gray-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-zinc-700 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Scadenza (MM/YY)</label>
                      <input
                        type="text"
                        required
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="w-full bg-white dark:bg-zinc-800 text-gray-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-zinc-700 font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">CVC / CVV</label>
                      <input
                        type="text"
                        required
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full bg-white dark:bg-zinc-800 text-gray-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-zinc-700 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Total Summary */}
              <div className="bg-zinc-900 text-white p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Totale Articoli ({cartItems.length}):</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Spedizione ({formData.deliveryMethod}):</span>
                  <span>{shippingCost.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-base font-black pt-2 border-t border-zinc-800">
                  <span>Totale da Pagare:</span>
                  <span className="text-cyan-400">{grandTotal.toFixed(2)}€</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  ← Torna a Indirizzo
                </button>

                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-lg transition-transform active:scale-95"
                >
                  Conferma e Paga {grandTotal.toFixed(2)}€
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  Ordine Confermato con Successo! 🎉
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Grazie per il tuo acquisto su Shoes.fr. Abbiamo inviato un'email di conferma a <strong className="text-gray-800 dark:text-gray-200">{formData.email}</strong>.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 text-xs max-w-md mx-auto text-left space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Numero Tracciamento Ordine:</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Consegna Stimata:</span>
                  <span className="font-bold text-gray-900 dark:text-white">24/25 Luglio 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Indirizzo:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formData.address}, {formData.city}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-sm px-8 py-3.5 rounded-2xl hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors shadow-lg"
              >
                Torna al Catalogo Shoes.fr
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
