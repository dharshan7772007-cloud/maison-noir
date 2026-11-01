import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

interface BestSellersProps {
  onViewAll: () => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onViewAll }) => {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-24 sm:py-32 bg-[#0B0B0C] border-b border-[#1E1E24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-sans block mb-2">
              Sartorial Signatures
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF8F5] font-light">
              House Best Sellers
            </h2>
          </div>
          <button
            onClick={onViewAll}
            className="self-start sm:self-auto text-xs uppercase tracking-[0.25em] text-[#C5A880] hover:text-[#DFC5A2] transition-colors flex items-center gap-2 font-medium group"
          >
            <span>View All Compositions</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </button>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
