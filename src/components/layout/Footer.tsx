import React from 'react';
import { ActivePage, GenderCategory } from '../../types';

interface FooterProps {
  onNavigate: (page: ActivePage, genderFilter?: GenderCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#08080A] text-[#8E8E98] border-t border-[#1C1C22] text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="space-y-1">
              <span className="font-serif tracking-[0.28em] text-2xl text-[#FAF8F5] uppercase block font-light">
                MAISON NOIR
              </span>
              <span className="block text-[8px] tracking-[0.38em] uppercase text-[#C5A880]">
                HAUTE COUTURE & READY-TO-WEAR · PARIS
              </span>
            </div>
            <p className="text-xs text-[#A0A0A8] max-w-sm leading-relaxed font-light">
              Timeless silhouettes hand-tailored from noble woolens, Scottish cashmeres, and Lake Como mulberry silks. Operating private appointment salons in Paris, New Delhi, and Mumbai.
            </p>
            <div className="pt-2 text-[11px] text-[#71717A]">
              <span>Concierge Direct: </span>
              <span className="text-white font-mono">+91 (0) 22 6940 8800</span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#FAF8F5] font-medium mb-5">
              Collections
            </h4>
            <ul className="space-y-3 font-light">
              <li>
                <button
                  onClick={() => onNavigate('collections', 'women')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Women's Ready-to-Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections', 'men')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Men's Sartorial Line
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Cashmere Outerwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Como Silk Eveningwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  French Box-Calf Leather
                </button>
              </li>
            </ul>
          </div>

          {/* The House */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#FAF8F5] font-medium mb-5">
              The House
            </h4>
            <ul className="space-y-3 font-light">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Atelier Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Noble Fibre Provenance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Lifetime Care Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Private Salon Appointments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Press & Editorial Requests
                </button>
              </li>
            </ul>
          </div>

          {/* Flagship Salons */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#FAF8F5] font-medium mb-5">
              Boutiques & Salons
            </h4>
            <div className="space-y-4 text-[11px] font-light">
              <div>
                <strong className="text-white block font-normal">New Delhi Flagship</strong>
                <span className="text-[#8E8E98]">The Chanakya, Chanakyapuri</span>
              </div>
              <div>
                <strong className="text-white block font-normal">Mumbai Salon Privé</strong>
                <span className="text-[#8E8E98]">Waterfield Road, Bandra West</span>
              </div>
              <div>
                <strong className="text-white block font-normal">Historic Paris Atelier</strong>
                <span className="text-[#8E8E98]">28 Rue du Faubourg Saint-Honoré</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-[#1C1C22] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#71717A]">
          <div>
            © {new Date().getFullYear()} MAISON NOIR PARIS S.A. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>Complimentary Insured Shipping Across India</span>
            <span>·</span>
            <span>UPI · RuPay · Visa · Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
