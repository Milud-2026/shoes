import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Truck, Award } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, language }) => {
  return (
    <section className="relative overflow-hidden bg-[#FDFBF7] text-[#1A1A1A] py-12 lg:py-20 border-b-2 border-[#1A1A1A]">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EEEAE3] rounded-full blur-[100px] opacity-60 pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-96 h-96 bg-gradient-to-tr from-[#00F0FF] to-[#FF3E00] rounded-full blur-3xl opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & CTA Column */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-[#1A1A1A] text-white px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_#FF3E00]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF3E00]" />
              <span>Nuova Collezione 2026</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.88] tracking-tighter italic uppercase text-[#1A1A1A]">
              SoleVault<br />
              <span className="text-[#FF3E00]">Exclusive</span>
            </h1>

            <p className="text-[#555] text-sm sm:text-base leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
              Scopri le migliori sneakers originali dei brand più iconici: Nike, Air Jordan, Adidas, New Balance, Salomon e molto altro. Spedizione express 24h e garanzia 100% originale.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-3 gap-3 text-xs font-bold text-[#1A1A1A] pt-1">
              <div className="flex flex-col items-center sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2 bg-white p-3 rounded-2xl border-2 border-[#1A1A1A] artistic-shadow text-center sm:text-left">
                <Truck className="w-4 h-4 text-[#FF3E00] shrink-0" />
                <span>Spedizione Express</span>
              </div>
              <div className="flex flex-col items-center sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2 bg-white p-3 rounded-2xl border-2 border-[#1A1A1A] artistic-shadow text-center sm:text-left">
                <ShieldCheck className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span>100% Originale</span>
              </div>
              <div className="flex flex-col items-center sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2 bg-white p-3 rounded-2xl border-2 border-[#1A1A1A] artistic-shadow text-center sm:text-left">
                <Award className="w-4 h-4 text-[#7000FF] shrink-0" />
                <span>Reso Facile 30gg</span>
              </div>
            </div>

            {/* Primary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 bg-[#FF3E00] text-white font-black uppercase text-xs tracking-widest border-2 border-[#1A1A1A] transform -skew-x-12 shadow-[6px_6px_0px_#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all active:translate-x-1 active:translate-y-1 flex items-center justify-center space-x-2"
              >
                <div className="transform skew-x-12 flex items-center space-x-2">
                  <span>Sfoglia il Catalogo</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Showcase Hero Image Grid */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-[540px]">
              {/* Artistic frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#00F0FF] via-[#FF3E00] to-[#1A1A1A] rounded-[40px] opacity-25 transform rotate-3 scale-95 pointer-events-none" />

              <div className="relative bg-white border-4 border-[#1A1A1A] rounded-[32px] artistic-shadow-lg overflow-hidden p-6 space-y-4">
                <div className="relative h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border-2 border-[#1A1A1A] group">
                  <img
                    src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80"
                    alt="Nike Air Force 1 Edition"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating price badge */}
                  <div className="absolute top-4 left-4 bg-[#1A1A1A] text-white px-4 py-2 rounded-xl border-2 border-white shadow-md font-mono">
                    <span className="text-[10px] text-gray-300 block uppercase font-bold">Top Seller</span>
                    <span className="text-lg font-black text-[#00F0FF]">119.99€</span>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-[#FF3E00] text-white px-4 py-1.5 rounded-full border border-white text-xs font-black uppercase tracking-wider shadow-lg">
                    Nike Air Force 1
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="h-20 rounded-xl overflow-hidden border-2 border-[#1A1A1A]">
                    <img 
                      src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=500&q=80" 
                      alt="Jordan 1" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-20 rounded-xl overflow-hidden border-2 border-[#1A1A1A]">
                    <img 
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80" 
                      alt="Salomon XT6" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-20 rounded-xl overflow-hidden border-2 border-[#1A1A1A]">
                    <img 
                      src="https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=500&q=80" 
                      alt="New Balance" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
