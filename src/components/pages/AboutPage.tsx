import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface AboutPageProps {
  onExploreCollections: () => void;
  onBookAppointment: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onExploreCollections,
  onBookAppointment
}) => {
  return (
    <div className="bg-[#0B0B0C] min-h-screen text-[#FAF8F5]">
      {/* Editorial Hero Header */}
      <section className="relative py-24 sm:py-32 border-b border-[#1E1E24] overflow-hidden bg-[#0E0E10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-sans block mb-3">
            The House Manifesto & Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#FAF8F5] tracking-tight font-light leading-tight">
            The Architecture of Permanence
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[#D6D0C5] max-w-2xl mx-auto font-light font-sans leading-relaxed">
            Maison Noir was founded on a singular principle: that true luxury is not ephemeral novelty, but enduring proportion, noble materials, and master tailoring.
          </p>
        </div>
      </section>

      {/* Chapter 1: The Founding Narrative */}
      <section className="py-20 sm:py-28 border-b border-[#1E1E24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-sans">
                Chapter 01 · Paris Origin
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-light leading-snug">
                Where French Haute Couture Meets Architectural Modernism
              </h2>
              <p className="text-xs sm:text-sm text-[#A0A0A8] font-sans leading-relaxed font-light">
                Born in the historic atelier district of the 8th arrondissement in Paris, Maison Noir was established by a collective of master cutters and textile purists. Frustrated by the accelerated waste of modern fast-fashion cycles, they returned to first principles: garments built to outlive their wearers.
              </p>
              <p className="text-xs sm:text-sm text-[#A0A0A8] font-sans leading-relaxed font-light">
                Every pattern is drafted by hand on heavy cardboard, shaped across anatomical curves, and cut individually with shears rather than automated laser stacks. The result is clothing with soul, breath, and structural dignity.
              </p>
              <div className="pt-4 border-t border-[#1E1E24] flex items-center gap-8">
                <div>
                  <span className="block font-serif text-2xl text-[#C5A880]">100%</span>
                  <span className="text-[10px] tracking-widest uppercase text-[#8E8E98]">Natural Fibres</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl text-[#C5A880]">38 Hrs</span>
                  <span className="text-[10px] tracking-widest uppercase text-[#8E8E98]">Hand Tailoring / Coat</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl text-[#C5A880]">Lifetime</span>
                  <span className="text-[10px] tracking-widest uppercase text-[#8E8E98]">Care Privilege</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-[#27272C] p-3 bg-[#0E0E10]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85"
                  alt="Maison Noir Atelier Suit Master"
                  aspectRatioClass="aspect-[4/3]"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Noble Sourcing */}
      <section className="py-20 sm:py-28 border-b border-[#1E1E24] bg-[#0E0E10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-sans block mb-2">
              Chapter 02 · Noble Provenance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
              Sourced Exclusively from Historic Craftsmen
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-[#A0A0A8] font-sans leading-relaxed font-light">
              We do not compromise on material origins. We partner directly with family-run European and Scottish heritage mills who hold centuries of textile mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cashmere */}
            <div className="bg-[#0B0B0C] border border-[#1E1E24] p-8 space-y-4">
              <span className="text-xs font-mono text-[#C5A880]">01 / SCOTLAND</span>
              <h3 className="font-serif text-xl text-white">Inner Mongolian Cashmere</h3>
              <p className="text-xs text-[#A0A0A8] leading-relaxed font-sans font-light">
                Virgin white underfleece gathered during natural springtime molting, spun in the soft pure waters of the Scottish Borders. 14.5-micron fineness for exceptional thermal warmth without heft.
              </p>
            </div>

            {/* Silk */}
            <div className="bg-[#0B0B0C] border border-[#1E1E24] p-8 space-y-4">
              <span className="text-xs font-mono text-[#C5A880]">02 / ITALY</span>
              <h3 className="font-serif text-xl text-white">30-Momme Como Silk</h3>
              <p className="text-xs text-[#A0A0A8] leading-relaxed font-sans font-light">
                Woven on slow shuttle looms on the shores of Lake Como. Heavyweight pure mulberry silk that falls with liquid drape, hand-rolled at the hem by third-generation needleworkers.
              </p>
            </div>

            {/* Leather */}
            <div className="bg-[#0B0B0C] border border-[#1E1E24] p-8 space-y-4">
              <span className="text-xs font-mono text-[#C5A880]">03 / FRANCE</span>
              <h3 className="font-serif text-xl text-white">French Box-Calf Leather</h3>
              <p className="text-xs text-[#A0A0A8] leading-relaxed font-sans font-light">
                Full-grain calfskin vegetable-tanned over six months with chestnut bark and mimosa extracts. Uncorrected grain that acquires a deep, lustrous patina with every year of ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: The Salons & Private Appointments */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[#0E0E10] border border-[#1E1E24] p-8 sm:p-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-sans block mb-3">
            Bespoke Fittings & Salons
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6 font-light">
            Experience Maison Noir in Person
          </h2>
          <p className="text-xs sm:text-sm text-[#A0A0A8] max-w-xl mx-auto font-sans leading-relaxed mb-8 font-light">
            Our private salons in New Delhi (The Chanakya), Mumbai (Bandra West), and Paris (Rue Saint-Honoré) offer personalized styling consultations, complimentary alterations, and bespoke private commissions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBookAppointment}
              className="px-8 py-3.5 bg-[#F5F2EB] hover:bg-[#C5A880] text-[#0B0B0C] font-semibold text-xs tracking-widest uppercase transition-colors"
            >
              Request Salon Consultation
            </button>
            <button
              onClick={onExploreCollections}
              className="px-8 py-3.5 border border-[#27272C] hover:border-white/40 text-xs tracking-widest uppercase text-white transition-colors"
            >
              Explore Collection Online
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
