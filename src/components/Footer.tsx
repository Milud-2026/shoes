import React, { useState } from 'react';
import { 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  Headphones, 
  Mail, 
  Box, 
  Send, 
  Check 
} from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-white border-t-4 border-[#1A1A1A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Service Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-3xl bg-[#262626] border-2 border-white/20 artistic-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF3E00] text-white flex items-center justify-center flex-shrink-0 font-black border border-white/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-black text-xs text-white uppercase tracking-wider">Spedizione Express</h5>
              <p className="text-[11px] text-gray-300">Gratuita per ordini sopra i 50€</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#00F0FF] text-[#1A1A1A] flex items-center justify-center flex-shrink-0 font-black border border-white/20">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-black text-xs text-white uppercase tracking-wider">Reso Facile 30G</h5>
              <p className="text-[11px] text-gray-300">Cambio taglia e reso gratuito</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF3E00] text-white flex items-center justify-center flex-shrink-0 font-black border border-white/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-black text-xs text-white uppercase tracking-wider">Prodotti Originali</h5>
              <p className="text-[11px] text-gray-300">Garanzia al 100% dai marchi ufficiali</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#7000FF] text-white flex items-center justify-center flex-shrink-0 font-black border border-white/20">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-black text-xs text-white uppercase tracking-wider">Assistenza Clienti</h5>
              <p className="text-[11px] text-gray-300">Attivo Lun-Sab dalle 9:00 alle 19:00</p>
            </div>
          </div>
        </div>

        {/* Links & Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF3E00] flex items-center justify-center text-white border border-white">
                <Box className="w-5 h-5" />
              </div>
              <span className="font-black text-3xl tracking-tighter italic uppercase text-white">
                SOLE<span className="text-[#FF3E00]">VAULT</span> <span className="text-xs bg-white text-[#1A1A1A] px-2 py-0.5 rounded font-black tracking-widest">PRO</span>
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed text-xs">
              SoleVault è la destinazione premium per calzature e sneakers esclusive dei brand più desiderati. Spedizione express 24h e 100% prodotti autentici garantiti.
            </p>

            {/* Newsletter Form */}
            <div className="space-y-2 pt-2">
              <span className="font-black text-white uppercase tracking-wider block text-xs">
                Iscriviti e ricevi il 10% di sconto (Codice: SOLEVAULT10)
              </span>
              <form onSubmit={handleSubscribe} className="flex space-x-2 max-w-sm">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Inserisci la tua email..."
                  className="bg-white text-[#1A1A1A] font-bold px-3.5 py-2.5 rounded-xl text-xs flex-1 border-2 border-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#FF3E00] text-white font-black px-4 py-2.5 rounded-xl border-2 border-white hover:bg-white hover:text-[#1A1A1A] transition-colors flex items-center space-x-1 uppercase tracking-wider"
                >
                  {subscribed ? <Check className="w-4 h-4 text-white" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
              {subscribed && <p className="text-[#00F0FF] font-black text-[11px] uppercase tracking-wider">Iscrizione completata! Usa il codice SOLEVAULT10 al carrello.</p>}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-3">
            <h5 className="font-black text-[#FF3E00] uppercase tracking-wider text-xs">Categorie</h5>
            <ul className="space-y-2 text-gray-300 font-bold uppercase text-[11px] tracking-wide">
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Sneakers Uomo 3D</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Sneakers Donna</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Running Performance</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Stivali & Boots</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Bambino</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Offerte Speciali</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-3">
            <h5 className="font-black text-[#FF3E00] uppercase tracking-wider text-xs">Top Brands</h5>
            <ul className="space-y-2 text-gray-300 font-bold uppercase text-[11px] tracking-wide">
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Nike Air Force & Jordan</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">adidas Originals</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">New Balance 550</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Salomon Outdoor</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Converse Chuck 70</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Puma Suede</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="space-y-3">
            <h5 className="font-black text-[#FF3E00] uppercase tracking-wider text-xs">Servizio Clienti</h5>
            <ul className="space-y-2 text-gray-300 font-bold uppercase text-[11px] tracking-wide">
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Traccia il tuo Ordine</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Politica di Reso & Cambio</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Guida alle Taglie 3D</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Domande Frequenti (FAQ)</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Contatta il Supporto</a></li>
              <li><a href="#" className="hover:text-[#FF3E00] transition-colors">Termini e Condizioni</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright and Payment Logos */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-gray-400 text-[11px] font-bold gap-4 uppercase tracking-wider">
          <div className="flex items-center space-x-1.5 flex-wrap">
            <span>© 2026 SoleVault - Tutti i diritti riservati.</span>
            <div className="group inline-flex items-center space-x-1">
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-gray-400 hover:text-[#00F0FF] transition-colors cursor-pointer text-[11px] font-bold uppercase focus:outline-none"
                title="P.IVA 09283409182"
              >
                P.IVA 09283409182
              </button>
              <button
                type="button"
                onClick={onOpenAdmin}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#00F0FF] hover:underline text-[10px] font-mono flex items-center space-x-0.5 cursor-pointer"
                title="Accedi al Pannello Admin"
              >
                <span>🔒</span>
                <span>Admin</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-white font-black">
            <span className="bg-[#262626] px-2 py-1 rounded border border-white/20">VISA</span>
            <span className="bg-[#262626] px-2 py-1 rounded border border-white/20">MasterCard</span>
            <span className="bg-[#262626] px-2 py-1 rounded border border-white/20">PayPal</span>
            <span className="bg-[#262626] px-2 py-1 rounded border border-white/20">Apple Pay</span>
            <span className="bg-[#262626] px-2 py-1 rounded border border-white/20">Klarna</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

