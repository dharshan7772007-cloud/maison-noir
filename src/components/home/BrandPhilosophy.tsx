import React from 'react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface BrandPhilosophyProps {
  onLearnMore?: () => void;
}

export const BrandPhilosophy: React.FC<BrandPhilosophyProps> = ({ onLearnMore }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#0E0E10] border-b border-[#1E1E24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Image with Subtle Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-[#27272C] p-3 bg-[#0B0B0C]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1400&q=88"
                alt="Maison Noir Master Tailoring Atelier"
                aspectRatioClass="aspect-[3/4]"
                className="w-full h-full object-cover filter contrast-[1.08]"
              />
              <div className="absolute -bottom-4 -right-4 hidden sm:block bg-[#16161C] border border-[#C5A880]/30 p-5 max-w-xs shadow-2xl">
                <span className="block font-serif text-2xl text-[#C5A880] mb-1 font-light">
                  38 Hours
                </span>
                <p className="text-[11px] text-[#A0A0A8] leading-relaxed font-sans">
                  Average hand-needlework and tailoring required for a single Maison Noir double-breasted cashmere overcoat.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Manifesto and Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-sans block mb-4">
              The Architecture of Permanence
            </span>

            <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF8F5] leading-[1.18] font-light mb-8 text-balance">
              "In a culture conditioned to celebrate the fleeting, we construct permanence."
            </blockquote>

            <p className="text-sm text-[#A0A0A8] font-sans leading-relaxed mb-10 max-w-2xl font-light">
              Founded on the conviction that clothing is a private sanctuary, Maison Noir operates at the confluence of traditional French haute couture and architectural minimalism. We reject planned obsolescence in favor of garments that acquire poise and distinction with each passing decade.
            </p>

            {/* 3 Editorial Pillars */}
            <div className="space-y-6 border-t border-[#1E1E24] pt-8">
              <div>
                <h3 className="font-serif text-lg text-white mb-1.5 flex items-baseline gap-3">
                  <span className="text-xs font-mono text-[#C5A880]">01.</span>
                  <span>Noble Material Integrity</span>
                </h3>
                <p className="text-xs text-[#8E8E98] leading-relaxed pl-7 font-sans font-light">
                  We mill exclusively with historic partners: long-staple cashmere from Hawick, Scotland; 30-momme mulberry silks from Lake Como; and vegetable-tanned French box calfskin from Lyon.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg text-white mb-1.5 flex items-baseline gap-3">
                  <span className="text-xs font-mono text-[#C5A880]">02.</span>
                  <span>Full-Canvas Bespoke Architecture</span>
                </h3>
                <p className="text-xs text-[#8E8E98] leading-relaxed pl-7 font-sans font-light">
                  Never fused with synthetic bonding agents. Our suiting and coats employ floating horsehair and linen chest pieces that mold organically to your body heat, yielding unmatched structural balance.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg text-white mb-1.5 flex items-baseline gap-3">
                  <span className="text-xs font-mono text-[#C5A880]">03.</span>
                  <span>Generational Lifetime Care</span>
                </h3>
                <p className="text-xs text-[#8E8E98] leading-relaxed pl-7 font-sans font-light">
                  Every Maison Noir investment carries lifetime repair, restoration, and alteration privileges across our salons in Paris, New Delhi, and Mumbai.
                </p>
              </div>
            </div>

            {onLearnMore && (
              <div className="mt-10 pt-4">
                <button
                  onClick={onLearnMore}
                  className="text-xs uppercase tracking-[0.25em] text-[#C5A880] hover:text-[#DFC5A2] transition-colors underline underline-offset-8 font-medium"
                >
                  Read The House Heritage
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
