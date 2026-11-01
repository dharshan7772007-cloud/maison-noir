import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FEATURED_COLLECTIONS } from '../../data/products';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { SubCategory } from '../../types';

interface FeaturedCollectionsProps {
  onSelectCollection: (categoryTarget: SubCategory) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  onSelectCollection
}) => {
  return (
    <section className="py-24 sm:py-32 bg-[#0E0E10] border-b border-[#1E1E24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-sans block mb-2">
              Curated Chapters
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF8F5] font-light">
              Featured Collections
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#A0A0A8] max-w-md font-sans leading-relaxed">
            Every seasonal capsule is developed around singular noble fibres and architectural silhouettes that transcend the transient fashion calendar.
          </p>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_COLLECTIONS.map((col, idx) => (
            <div
              key={col.id}
              onClick={() => onSelectCollection(col.categoryTarget as SubCategory)}
              className="group cursor-pointer flex flex-col bg-[#0B0B0C] border border-[#1E1E24] hover:border-[#3E3E48] transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/5] bg-[#141418]">
                <ImageWithFallback
                  src={col.image}
                  alt={col.title}
                  aspectRatioClass="aspect-[4/5]"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity" />

                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs font-mono text-[#C5A880] tracking-widest">
                    0{idx + 1}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#E6E2DB] bg-[#0B0B0C]/80 px-2.5 py-1 border border-white/10 font-mono">
                    {col.itemCount} Pieces
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-sans block mb-1.5">
                    {col.season}
                  </span>
                  <h3 className="font-serif text-2xl text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors font-light">
                    {col.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-[#A0A0A8] font-sans leading-relaxed line-clamp-2">
                    {col.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1C1C22] flex items-center justify-between text-xs tracking-widest uppercase font-sans text-white group-hover:text-[#C5A880] transition-colors">
                  <span>Explore Capsule</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
