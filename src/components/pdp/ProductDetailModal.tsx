import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Ruler, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { Product, ProductColor } from '../../types';
import { formatINR } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { SizeGuideModal } from '../common/SizeGuideModal';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Accordion states
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    details: true,
    composition: false,
    care: false,
    delivery: false
  });

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [product, onClose]);

  // Sync state when product opens
  React.useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0] || null);
      setQuantity(1);
      setSizeError(false);
      setAddedNotice(false);
      setIsZoomed(false);
    }
  }, [product]);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    const colorToUse = selectedColor || product.colors[0];
    addToCart(product, selectedSize, colorToUse, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 2500);
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdp-modal-title"
      >
        <div className="relative w-full max-w-5xl bg-[#0E0E10] border border-[#27272C] text-[#F7F5F0] shadow-2xl min-h-screen md:min-h-0 my-auto flex flex-col md:block">
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close product view"
            className="absolute top-4 right-4 z-20 p-2.5 bg-[#0B0B0C]/85 hover:bg-[#C8A97E] hover:text-[#0B0B0C] border border-[#27272C] text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-4 md:p-8 flex flex-col bg-[#0B0B0C] border-b md:border-b-0 md:border-r border-[#1E1E24]">
              {/* Main Active Image with Zoom/Inspect feature */}
              <div 
                className="relative overflow-hidden mb-4 bg-[#141418] cursor-zoom-in group"
                onClick={() => setIsZoomed(!isZoomed)}
                title="Click to toggle detailed view"
              >
                <ImageWithFallback
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={`${product.name} - View ${activeImageIndex + 1}`}
                  fallbackTitle={product.name}
                  fallbackCategory={product.category}
                  aspectRatioClass="aspect-[3/4]"
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isZoomed ? 'scale-125' : 'group-hover:scale-105'
                  }`}
                />

                {product.tag && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#C8A97E] bg-[#0B0B0C]/90 px-3 py-1 border border-[#C8A97E]/30">
                      {product.tag}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3 right-3 z-10 p-2 bg-[#0B0B0C]/80 border border-[#27272C] text-[#A0A0A8] opacity-75 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-[#C8A97E]" />
                </div>
              </div>

              {/* Thumbnails Strip */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setIsZoomed(false);
                      }}
                      className={`relative aspect-[3/4] overflow-hidden border transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#C8A97E] ring-1 ring-[#C8A97E]'
                          : 'border-[#27272C] opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`View angle ${idx + 1}`}
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        aspectRatioClass="aspect-[3/4]"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Purchase & Details Column */}
            <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
              <div>
                {/* Taxonomy & SKU */}
                <div className="flex items-center justify-between text-xs text-[#8E8E98] tracking-[0.2em] uppercase font-sans mb-2">
                  <span>{product.gender === 'women' ? "Women's Collection" : "Men's Collection"} · {product.category}</span>
                  <span className="font-mono text-[10px] text-[#6A6A74]">{product.sku}</span>
                </div>

                {/* Title */}
                <h1 id="pdp-modal-title" className="font-serif text-2xl md:text-3xl text-[#F7F5F0] leading-tight">
                  {product.name}
                </h1>

                {/* Subtitle */}
                <p className="mt-1 text-sm text-[#A0A0A8] font-sans font-light">
                  {product.subtitle}
                </p>

                {/* Price */}
                <div className="mt-4 pb-4 border-b border-[#1E1E24] flex items-baseline gap-3">
                  <span className="font-mono tabular-nums text-xl md:text-2xl font-semibold text-[#F7F5F0]">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono tabular-nums text-sm text-[#71717A] line-through">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-[11px] text-[#8E8E98] tracking-wider uppercase">
                    Tax Included · Insured Delivery
                  </span>
                </div>

                {/* Color Selection */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-2">
                    <span className="text-[#A0A0A8]">Shade:</span>
                    <span className="text-[#F7F5F0] font-medium font-serif">
                      {selectedColor?.name || product.colors[0]?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor?.name === color.name;
                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`relative p-0.5 transition-all ${
                            isSelected ? 'ring-2 ring-[#C8A97E]' : 'hover:ring-1 hover:ring-white/40'
                          }`}
                          title={color.name}
                          aria-label={`Select ${color.name}`}
                        >
                          <span
                            className="block w-6 h-6 border border-[#27272C]"
                            style={{ backgroundColor: color.hex }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-2">
                    <span className="text-[#A0A0A8]">Size:</span>
                    <button
                      type="button"
                      onClick={() => setSizeGuideOpen(true)}
                      className="text-[#C8A97E] hover:underline flex items-center gap-1.5 transition-colors font-sans"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => {
                            setSelectedSize(size);
                            setSizeError(false);
                          }}
                          className={`py-2 px-2 text-xs tracking-wider transition-colors border font-sans ${
                            isSelected
                              ? 'border-[#C8A97E] bg-[#C8A97E]/10 text-[#C8A97E] font-medium'
                              : 'border-[#27272C] text-[#C2BDB5] hover:border-white/50'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                  {sizeError && (
                    <p className="mt-2 text-xs text-rose-400 font-sans">
                      Please select your tailored size before adding to bag.
                    </p>
                  )}
                </div>

                {/* Quantity & Actions */}
                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between border border-[#27272C] px-3 py-2.5 bg-[#141418] w-full sm:w-32">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      className="text-[#A0A0A8] hover:text-white disabled:opacity-30 transition-colors p-1"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-sm tabular-nums text-white font-medium">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                      disabled={quantity >= 5}
                      aria-label="Increase quantity"
                      className="text-[#A0A0A8] hover:text-white disabled:opacity-30 transition-colors p-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-6 bg-[#C8A97E] hover:bg-[#DFC5A2] text-[#0B0B0C] font-semibold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Shopping Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Acquire Piece</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                    className="p-3 border border-[#27272C] bg-[#141418] hover:border-white/50 text-white transition-colors flex items-center justify-center"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? 'fill-[#C8A97E] text-[#C8A97E]' : 'text-[#A0A0A8]'
                      }`}
                    />
                  </button>
                </div>

                {/* Maison Assurance Strip */}
                <div className="mt-6 grid grid-cols-3 gap-2 border-y border-[#1E1E24] py-3 text-[11px] text-[#A0A0A8]">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#C8A97E] shrink-0" />
                    <span>White-Glove Courier</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-[#C8A97E] shrink-0" />
                    <span>14-Day Salon Returns</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C8A97E] shrink-0" />
                    <span>Authenticity Guaranteed</span>
                  </div>
                </div>

                {/* Collapsible Accordions */}
                <div className="mt-4 divide-y divide-[#1E1E24] text-xs">
                  {/* Section 1: Details */}
                  <div className="py-3">
                    <button
                      type="button"
                      onClick={() => toggleSection('details')}
                      className="w-full flex items-center justify-between text-left font-serif text-sm tracking-wide text-[#F7F5F0] hover:text-[#C8A97E] transition-colors"
                    >
                      <span>Design & Silhouette Notes</span>
                      {openSections.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {openSections.details && (
                      <div className="mt-2 text-[#A0A0A8] leading-relaxed font-sans space-y-2">
                        <p>{product.description}</p>
                        <p className="text-[#C8A97E]/90 italic font-serif text-xs">
                          Silhouette & Fit: {product.fit}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Section 2: Composition */}
                  <div className="py-3">
                    <button
                      type="button"
                      onClick={() => toggleSection('composition')}
                      className="w-full flex items-center justify-between text-left font-serif text-sm tracking-wide text-[#F7F5F0] hover:text-[#C8A97E] transition-colors"
                    >
                      <span>Noble Composition & Provenance</span>
                      {openSections.composition ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {openSections.composition && (
                      <div className="mt-2 text-[#A0A0A8] leading-relaxed font-sans space-y-1">
                        <p><strong className="text-white">Fabrication:</strong> {product.composition}</p>
                        <p><strong className="text-white">Crafted In:</strong> {product.origin}</p>
                      </div>
                    )}
                  </div>

                  {/* Section 3: Care */}
                  <div className="py-3">
                    <button
                      type="button"
                      onClick={() => toggleSection('care')}
                      className="w-full flex items-center justify-between text-left font-serif text-sm tracking-wide text-[#F7F5F0] hover:text-[#C8A97E] transition-colors"
                    >
                      <span>Atelier Preservation & Care</span>
                      {openSections.care ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {openSections.care && (
                      <ul className="mt-2 text-[#A0A0A8] space-y-1.5 list-disc list-inside font-sans">
                        {product.care.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Section 4: Delivery */}
                  <div className="py-3">
                    <button
                      type="button"
                      onClick={() => toggleSection('delivery')}
                      className="w-full flex items-center justify-between text-left font-serif text-sm tracking-wide text-[#F7F5F0] hover:text-[#C8A97E] transition-colors"
                    >
                      <span>Complimentary Shipping & Salon Returns</span>
                      {openSections.delivery ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {openSections.delivery && (
                      <div className="mt-2 text-[#A0A0A8] leading-relaxed font-sans space-y-1.5">
                        <p>
                          Delivered in signature Maison Noir archival preservation boxes tied with grosgrain silk ribbon.
                        </p>
                        <p>
                          Domestic express transit takes 2–4 business days across India. Complimentary in-person alterations available at our New Delhi and Mumbai salons.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        defaultGender={product.gender}
      />
    </>
  );
};
