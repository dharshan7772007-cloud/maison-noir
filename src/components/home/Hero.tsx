import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface HeroProps {
  onShopClick: () => void;
  onExploreCampaign: () => void;
  onSelectCategory?: (gender: 'women' | 'men') => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onShopClick, 
  onExploreCampaign,
  onSelectCategory 
}) => {
  return (
    <section className="relative min-h-[92vh] lg:min-h-[96vh] flex items-center justify-center overflow-hidden bg-[#0B0B0C]">
      {/* Background Cinematic Visual with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2560&q=90"
          alt="Maison Noir Haute Couture Autumn Winter 2026 Campaign"
          aspectRatioClass="h-full w-full"
          className="w-full h-full object-cover object-center filter brightness-[0.68] contrast-[1.14] scale-[1.01] transition-transform duration-1000 ease-out"
        />
        {/* Subtle Luxury Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/45 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/70 via-transparent to-[#0B0B0C]/70" />
      </div>

      {/* Floating Editorial Badges */}
      <div className="absolute top-8 left-6 sm:left-12 z-10 hidden sm:block">
        <div className="bg-[#0B0B0C]/80 backdrop-blur-sm border border-[#222228] px-4 py-2.5 text-left">
          <span className="block text-[9px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            Campaign Frame 01
          </span>
          <span className="block text-xs font-serif text-[#FAF8F5] tracking-wide italic">
            The Sovereign Double-Breasted Cashmere
          </span>
        </div>
      </div>

      <div className="absolute top-8 right-6 sm:right-12 z-10 hidden sm:block">
        <div className="bg-[#0B0B0C]/80 backdrop-blur-sm border border-[#222228] px-4 py-2.5 text-right">
          <span className="block text-[9px] uppercase tracking-[0.3em] text-[#8E8E98] font-mono">
            Paris Atelier · 8e
          </span>
          <span className="block text-xs font-serif text-[#FAF8F5] tracking-wide">
            Haute Couture & Ready-to-Wear
          </span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 flex flex-col items-center">
        {/* Season Kicker */}
        <div className="inline-flex items-center gap-3 mb-6 text-xs sm:text-sm tracking-[0.35em] uppercase font-sans text-[#C5A880] border-b border-[#C5A880]/30 pb-2.5">
          <span className="font-medium">Haute Couture</span>
          <span aria-hidden="true" className="text-[#6E6E78]">·</span>
          <span>Autumn / Winter 2026 Presentation</span>
        </div>

        {/* Main Cinematic Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FAF8F5] tracking-tight font-light leading-[1.0] max-w-5xl text-balance">
          Elegance in <span className="italic font-serif font-normal text-[#EDE7DC]">Every Detail</span>
        </h1>

        {/* Editorial Subtitle */}
        <p className="mt-8 text-sm sm:text-base md:text-lg text-[#D6D0C5] max-w-2xl font-light font-sans leading-relaxed tracking-wide">
          Sculpted silhouettes, Scottish cashmere, and Lake Como silks crafted for those who view attire as architectural art.
        </p>

        {/* CTA Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={onShopClick}
            className="w-full sm:w-auto px-10 py-4 bg-[#F5F2EB] hover:bg-[#C5A880] text-[#0B0B0C] font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5 shadow-2xl"
          >
            <span>Shop Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreCampaign}
            className="w-full sm:w-auto px-8 py-4 border border-[#FAF8F5]/30 hover:border-[#C5A880] hover:text-[#C5A880] text-[#FAF8F5] text-xs tracking-[0.25em] uppercase transition-all duration-300 bg-[#0B0B0C]/50 backdrop-blur-sm"
          >
            <span>Explore Campaign</span>
          </button>
        </div>

        {/* Quick Capsule Shortcuts */}
        {onSelectCategory && (
          <div className="mt-8 flex items-center gap-4 text-xs font-sans tracking-widest uppercase text-[#8E8E98]">
            <button
              onClick={() => onSelectCategory('women')}
              className="hover:text-[#C5A880] transition-colors border-b border-transparent hover:border-[#C5A880] pb-0.5"
            >
              Women's Line
            </button>
            <span className="text-[#3E3E48]">/</span>
            <button
              onClick={() => onSelectCategory('men')}
              className="hover:text-[#C5A880] transition-colors border-b border-transparent hover:border-[#C5A880] pb-0.5"
            >
              Men's Sartorial
            </button>
          </div>
        )}

        {/* Quiet Editorial Baseline Markers */}
        <div className="mt-16 sm:mt-24 pt-6 border-t border-white/10 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] uppercase tracking-[0.2em] text-[#8E8E98] font-sans">
          <div className="text-center sm:text-left">
            <span className="text-[#C5A880] font-mono">01</span> · Hand-Finished in Paris
          </div>
          <div className="text-center">
            <span className="text-[#C5A880] font-mono">02</span> · Grade-A Natural Fibres
          </div>
          <div className="text-center sm:text-right">
            <span className="text-[#C5A880] font-mono">03</span> · Complimentary Alterations
          </div>
        </div>
      </div>
    </section>
  );
};
