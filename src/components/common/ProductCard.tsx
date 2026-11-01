import React, { useState } from 'react';
import { Heart, Eye, ArrowUpRight } from 'lucide-react';
import { Product } from '../../types';
import { formatINR } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct
}) => {
  const { toggleWishlist, isInWishlist, setSelectedProductForModal } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      setSelectedProductForModal(product);
    }
  };

  const currentImage = isHovered && product.images.length > 1
    ? product.images[1]
    : product.images[0];

  return (
    <div
      className="group relative flex flex-col bg-[#0E0E10] border border-[#1E1E24] hover:border-[#3E3E48] transition-all duration-300 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Strict 3:4 Aspect Ratio */}
      <div 
        onClick={handleCardClick}
        className="relative overflow-hidden cursor-pointer aspect-[3/4] bg-[#141418]"
      >
        <ImageWithFallback
          src={currentImage}
          alt={product.name}
          fallbackTitle={product.name}
          fallbackCategory={product.category}
          aspectRatioClass="aspect-[3/4]"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute top-3 right-3 z-10 p-2.5 bg-[#0B0B0C]/75 backdrop-blur-md hover:bg-[#0B0B0C] border border-[#27272C] text-white transition-all shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#C8A97E] text-[#C8A97E]' : 'text-white/80 hover:text-white'
            }`}
          />
        </button>

        {/* Zero-Pill Subtle Text Tag */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[9px] tracking-[0.25em] uppercase font-sans font-medium text-[#C8A97E] bg-[#0B0B0C]/85 px-2.5 py-1 border border-[#C8A97E]/30">
              {product.tag}
            </span>
          </div>
        )}

        {/* Quick View Overlay on Desktop */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="w-full py-2.5 px-4 bg-[#F7F5F0] hover:bg-[#C8A97E] text-[#0B0B0C] text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Discover Piece</span>
          </button>
        </div>
      </div>

      {/* Product Details - Fixed Spacing & Uniform Typography */}
      <div 
        onClick={handleCardClick}
        className="p-4 sm:p-5 flex flex-col flex-1 justify-between cursor-pointer"
      >
        <div>
          {/* Category & Origin Line */}
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#8E8E98] tracking-[0.2em] uppercase font-sans mb-1.5">
            <span>{product.gender === 'women' ? "Women's" : "Men's"}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg text-[#F7F5F0] group-hover:text-[#C8A97E] transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="mt-1 text-xs text-[#A0A0A8] line-clamp-1 font-sans font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Available Color Swatches */}
        <div className="mt-4 pt-3 border-t border-[#1C1C22] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono tabular-nums text-sm sm:text-base font-semibold text-[#F7F5F0]">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-mono tabular-nums text-xs text-[#71717A] line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Indicators */}
          <div className="flex items-center gap-1.5" title={`${product.colors.length} shades available`}>
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-2.5 h-2.5 border border-[#3A3A42]"
                style={{ backgroundColor: c.hex }}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
