import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface LookbookItem {
  id: string;
  title: string;
  description: string;
  silhouette: string;
  image: string;
  credits: string;
}

const LOOKS: LookbookItem[] = [
  {
    id: 'look-01',
    title: 'Look 01 · The Sovereign Cashmere Cloak',
    description: 'Double-faced cashmere worn over sheer Como silk crepe trousers. Photographed at the Palais de Tokyo, Paris.',
    silhouette: 'Oversized column silhouette with structured dropped shoulders.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=88',
    credits: 'Photographed by Jean-Luc Vaneau'
  },
  {
    id: 'look-02',
    title: 'Look 02 · Midnight Grosgrain Tailoring',
    description: 'Merino Super 160s bespoke dinner suit paired with concealed placket evening shirt in Egyptian cotton poplin.',
    silhouette: 'Sharp European taper with 11cm peak grosgrain lapels.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1600&q=88',
    credits: 'Photographed at Hôtel de Crillon'
  },
  {
    id: 'look-03',
    title: 'Look 03 · Liquid Bias Silk & Charcoal Knit',
    description: '30-momme champagne silk evening slip gown layered with 7-gauge undyed Mongolian cashmere cowl drape.',
    silhouette: 'Fluid sensuality juxtaposed against dense architectural texture.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=88',
    credits: 'Photographed in Normandy'
  }
];

interface EditorialCampaignProps {
  onShopEditorial?: () => void;
}

export const EditorialCampaign: React.FC<EditorialCampaignProps> = ({ onShopEditorial }) => {
  const [activeLook, setActiveLook] = useState(0);

  return (
    <section id="campaign" className="py-24 sm:py-32 bg-[#0B0B0C] border-b border-[#1E1E24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-sans block mb-2">
              Autumn / Winter 2026 Lookbook
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF8F5] font-light">
              Editorial Campaign
            </h2>
          </div>
          <p className="text-xs text-[#8E8E98] font-mono tracking-widest uppercase">
            FRAME {activeLook + 1} OF {LOOKS.length}
          </p>
        </div>

        {/* Big Editorial Split Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#0E0E10] border border-[#1E1E24] p-4 sm:p-8">
          {/* Main Visual */}
          <div className="lg:col-span-8 overflow-hidden bg-[#141418] relative">
            <ImageWithFallback
              src={LOOKS[activeLook].image}
              alt={LOOKS[activeLook].title}
              aspectRatioClass="aspect-[16/10] sm:aspect-[16/9]"
              className="w-full h-full object-cover transition-all duration-700 filter brightness-95"
            />
            <div className="absolute bottom-4 left-4 z-10 bg-[#0B0B0C]/85 px-3.5 py-1.5 border border-[#27272C] text-[10px] tracking-widest text-[#E6E2DB] uppercase font-mono">
              {LOOKS[activeLook].credits}
            </div>
          </div>

          {/* Details & Navigation */}
          <div className="lg:col-span-4 flex flex-col justify-between p-3 sm:p-5">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-sans block mb-2">
                Silhouette Study
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-4 font-light">
                {LOOKS[activeLook].title}
              </h3>
              <p className="text-xs text-[#A0A0A8] leading-relaxed font-sans mb-5 font-light">
                {LOOKS[activeLook].description}
              </p>
              <div className="p-4 bg-[#141418] border border-[#27272C] text-xs text-[#C5A880] font-serif italic mb-6">
                "{LOOKS[activeLook].silhouette}"
              </div>
            </div>

            {/* Look Selector tabs */}
            <div>
              <div className="flex gap-2 mb-6">
                {LOOKS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveLook(idx)}
                    className={`flex-1 h-1 transition-all ${
                      activeLook === idx ? 'bg-[#C5A880]' : 'bg-[#27272C] hover:bg-[#3E3E48]'
                    }`}
                    aria-label={`View look ${idx + 1}`}
                  />
                ))}
              </div>

              {onShopEditorial && (
                <button
                  type="button"
                  onClick={onShopEditorial}
                  className="w-full py-3.5 bg-[#27272C] hover:bg-[#C5A880] hover:text-[#0B0B0C] text-white text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <span>Acquire Runway Pieces</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
