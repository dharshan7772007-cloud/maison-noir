import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  Grid3X3, 
  Grid2X2, 
  X, 
  RotateCcw, 
  ChevronDown 
} from 'lucide-react';
import { GenderCategory, SubCategory, SortOption, Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useCart } from '../../context/CartContext';

interface CollectionsPageProps {
  initialGender?: GenderCategory;
  initialCategory?: SubCategory;
  initialWishlistOnly?: boolean;
  onSelectProduct?: (product: Product) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({
  initialGender = 'all',
  initialCategory = 'all',
  initialWishlistOnly = false,
  onSelectProduct
}) => {
  const { wishlist, isInWishlist } = useCart();
  const [selectedGender, setSelectedGender] = useState<GenderCategory>(initialGender);
  const [selectedCategory, setSelectedCategory] = useState<SubCategory>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(130000);
  const [gridColumns, setGridColumns] = useState<3 | 4>(3);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [wishlistOnly, setWishlistOnly] = useState<boolean>(initialWishlistOnly);

  // Sync initial props if changed from navigation
  React.useEffect(() => {
    if (initialGender) setSelectedGender(initialGender);
  }, [initialGender]);

  React.useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  React.useEffect(() => {
    setWishlistOnly(initialWishlistOnly);
  }, [initialWishlistOnly]);

  const categories: { label: string; value: SubCategory }[] = [
    { label: 'All Silhouettes', value: 'all' },
    { label: 'Outerwear & Coats', value: 'outerwear' },
    { label: 'Sartorial Tailoring', value: 'tailoring' },
    { label: 'Cashmere Knitwear', value: 'knitwear' },
    { label: 'Como Silk Gowns', value: 'dresses' },
    { label: 'Evening Shirts', value: 'shirts' },
    { label: 'Box-Calf Leather', value: 'leather' },
    { label: 'Accessories', value: 'accessories' }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Wishlist filter
      if (wishlistOnly && !isInWishlist(product.id)) {
        return false;
      }
      // Gender filter
      if (selectedGender !== 'all' && product.gender !== selectedGender) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedGender, selectedCategory, maxPrice, sortBy, wishlistOnly, wishlist, isInWishlist]);

  const resetFilters = () => {
    setSelectedGender('all');
    setSelectedCategory('all');
    setMaxPrice(130000);
    setSortBy('featured');
    setWishlistOnly(false);
  };

  const hasActiveFilters = selectedGender !== 'all' || selectedCategory !== 'all' || maxPrice < 130000 || wishlistOnly;

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-[#F7F5F0]">
      {/* Header Banner */}
      <div className="py-16 sm:py-20 border-b border-[#1E1E24] bg-[#0E0E10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C8A97E] font-sans block mb-2">
            The Permanent Archive & Seasonal Capsules
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F7F5F0] tracking-tight">
            {wishlistOnly
              ? 'Your Atelier Wishlist'
              : selectedGender === 'women'
              ? "Women's Collection"
              : selectedGender === 'men'
              ? "Men's Sartorial Line"
              : 'The Maison Noir Collection'}
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-[#A0A0A8] max-w-xl mx-auto font-sans leading-relaxed">
            {wishlistOnly
              ? 'Your handpicked silhouettes, timeless tailored pieces, and runway selections preserved for your private consultation.'
              : 'Every garment embodies the uncompromising standards of French haute couture. Hand-cut woolens, fluid silks, and whisper-weight cashmeres.'}
          </p>

          {/* Gender & Wishlist Segmented Switch */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center p-1 bg-[#141418] border border-[#27272C]">
            <button
              onClick={() => {
                setWishlistOnly(false);
                setSelectedGender('all');
              }}
              className={`px-5 py-2 text-xs uppercase tracking-widest font-sans transition-colors ${
                !wishlistOnly && selectedGender === 'all'
                  ? 'bg-[#C8A97E] text-[#0B0B0C] font-semibold'
                  : 'text-[#A0A0A8] hover:text-white'
              }`}
            >
              All Pieces
            </button>
            <button
              onClick={() => {
                setWishlistOnly(false);
                setSelectedGender('women');
              }}
              className={`px-5 py-2 text-xs uppercase tracking-widest font-sans transition-colors ${
                !wishlistOnly && selectedGender === 'women'
                  ? 'bg-[#C8A97E] text-[#0B0B0C] font-semibold'
                  : 'text-[#A0A0A8] hover:text-white'
              }`}
            >
              Women
            </button>
            <button
              onClick={() => {
                setWishlistOnly(false);
                setSelectedGender('men');
              }}
              className={`px-5 py-2 text-xs uppercase tracking-widest font-sans transition-colors ${
                !wishlistOnly && selectedGender === 'men'
                  ? 'bg-[#C8A97E] text-[#0B0B0C] font-semibold'
                  : 'text-[#A0A0A8] hover:text-white'
              }`}
            >
              Men
            </button>
            <button
              onClick={() => setWishlistOnly(!wishlistOnly)}
              className={`px-5 py-2 text-xs uppercase tracking-widest font-sans transition-colors flex items-center gap-1.5 ${
                wishlistOnly
                  ? 'bg-[#C8A97E] text-[#0B0B0C] font-semibold'
                  : 'text-[#A0A0A8] hover:text-white'
              }`}
            >
              <span>Saved Wishlist</span>
              <span className="font-mono text-[10px] px-1.5 py-0.2 border border-current">
                {wishlist.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar & Filter Controls */}
      <div className="sticky top-20 z-30 bg-[#0E0E10]/95 backdrop-blur-md border-b border-[#1E1E24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none flex-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 text-xs whitespace-nowrap uppercase tracking-wider font-sans transition-colors border ${
                  selectedCategory === cat.value
                    ? 'border-[#C8A97E] text-[#C8A97E] bg-[#C8A97E]/10 font-medium'
                    : 'border-transparent text-[#A0A0A8] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right Controls: Filters toggle, Sort, Grid toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors ${
                isFilterPanelOpen || hasActiveFilters
                  ? 'border-[#C8A97E] text-[#C8A97E] bg-[#C8A97E]/10'
                  : 'border-[#27272C] text-[#A0A0A8] hover:border-white/40'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters ? '•' : ''}</span>
            </button>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-[#141418] border border-[#27272C] px-3 py-1.5 text-xs text-[#E6E2DB] focus:outline-none focus:border-[#C8A97E] uppercase tracking-wider appearance-none pr-8 cursor-pointer font-sans"
              >
                <option value="featured">Featured Order</option>
                <option value="newest">New Arrivals First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3 h-3 text-[#A0A0A8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Grid Toggle (Desktop) */}
            <div className="hidden lg:flex items-center border border-[#27272C] p-0.5 bg-[#141418]">
              <button
                onClick={() => setGridColumns(3)}
                aria-label="3 Column Grid"
                className={`p-1.5 transition-colors ${
                  gridColumns === 3 ? 'bg-[#27272C] text-[#C8A97E]' : 'text-[#71717A] hover:text-white'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridColumns(4)}
                aria-label="4 Column Grid"
                className={`p-1.5 transition-colors ${
                  gridColumns === 4 ? 'bg-[#27272C] text-[#C8A97E]' : 'text-[#71717A] hover:text-white'
                }`}
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Filters Drawer */}
        {isFilterPanelOpen && (
          <div className="border-t border-[#1E1E24] bg-[#0E0E10] px-4 sm:px-6 lg:px-8 py-5">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 text-xs">
              {/* Max Price Slider */}
              <div className="flex-1 min-w-[240px]">
                <div className="flex justify-between text-[#A0A0A8] mb-2 font-mono">
                  <span>Price Ceiling:</span>
                  <span className="text-[#C8A97E] font-semibold">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={15000}
                  max={130000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#C8A97E] bg-[#27272C] h-1 cursor-pointer"
                />
              </div>

              {/* Reset Action */}
              <div className="flex items-center gap-3">
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1.5 text-xs text-[#A0A0A8] hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                )}
                <button
                  onClick={() => setIsFilterPanelOpen(false)}
                  className="px-4 py-1.5 bg-[#C8A97E] text-[#0B0B0C] font-semibold uppercase tracking-wider"
                >
                  Apply & Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Active Filters / Count status */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1E1E24] text-xs text-[#8E8E98] font-sans">
          <span>
            Displaying <strong className="text-white font-mono">{filteredProducts.length}</strong> creations
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-[#C8A97E] hover:underline flex items-center gap-1"
            >
              <span>Clear filters</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              gridColumns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            } gap-6 sm:gap-8`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-24 text-center">
            <div className="w-16 h-16 border border-[#27272C] mx-auto flex items-center justify-center font-serif text-[#C8A97E] text-xl mb-4">
              MN
            </div>
            <h2 className="font-serif text-2xl text-white mb-2">
              {wishlistOnly ? 'Your Wishlist is Empty' : 'No matching pieces discovered'}
            </h2>
            <p className="text-xs text-[#A0A0A8] max-w-sm mx-auto mb-6 font-sans">
              {wishlistOnly
                ? 'You have not saved any creations yet. Explore our archive and tap the heart icon on any silhouette to curate your private collection.'
                : 'No creations currently correspond with your selected filters and price parameters.'}
            </p>
            <button
              onClick={() => {
                if (wishlistOnly) {
                  setWishlistOnly(false);
                } else {
                  resetFilters();
                }
              }}
              className="px-6 py-2.5 bg-[#C8A97E] hover:bg-[#DFC5A2] text-[#0B0B0C] font-semibold text-xs tracking-widest uppercase transition-colors"
            >
              {wishlistOnly ? 'Explore Full Archive' : 'Reset Filters'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
