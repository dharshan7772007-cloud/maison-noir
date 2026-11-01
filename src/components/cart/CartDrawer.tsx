import React, { useState } from 'react';
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight, Gift, Tag, Check, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../data/products';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface CartDrawerProps {
  onExploreCollections?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onExploreCollections }) => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTotal,
    freeShippingThreshold,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    appliedPromo,
    promoError,
    applyPromoCode,
    removePromoCode,
    openCheckout,
    giftPackaging,
    setGiftPackaging,
    giftMessage,
    setGiftMessage
  } = useCart();

  const [promoInput, setPromoInput] = useState('');

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      const success = applyPromoCode(promoInput);
      if (success) {
        setPromoInput('');
      }
    }
  };

  const progressToFreeShipping = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100)
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <aside 
        aria-label="Shopping Bag"
        className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10"
      >
        <div className="w-screen max-w-md bg-[#0E0E10] border-l border-[#27272C] text-[#F7F5F0] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#1E1E24] flex items-center justify-between bg-[#0B0B0C]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#C8A97E]" />
              <h2 className="font-serif text-lg tracking-wide">
                Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close bag"
              className="p-2 text-[#A0A0A8] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          {cart.length > 0 && (
            <div className="bg-[#141418] px-5 py-3.5 border-b border-[#1E1E24] text-xs">
              <div className="flex justify-between text-[#A0A0A8] mb-2 font-sans">
                {cartSubtotal >= freeShippingThreshold ? (
                  <span className="text-[#C8A97E] flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    Complimentary White-Glove Shipping Unlocked
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-white font-mono">{formatINR(remainingForFreeShipping)}</strong> for Complimentary Delivery
                  </span>
                )}
                <span className="font-mono tabular-nums text-[#C8A97E] font-medium">{progressToFreeShipping}%</span>
              </div>
              <div className="w-full bg-[#27272C] h-1.5 overflow-hidden">
                <div
                  className="bg-[#C8A97E] h-full transition-all duration-500 ease-out"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Content Body */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#1E1E24]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 border border-[#27272C] flex items-center justify-center font-serif text-[#C8A97E] text-xl mb-4">
                  MN
                </div>
                <h3 className="font-serif text-xl text-white mb-2">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#A0A0A8] max-w-xs mb-6 font-sans leading-relaxed">
                  Discover our Autumn/Winter 2026 collection, bespoke evening suiting, and noble knitwear.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    if (onExploreCollections) onExploreCollections();
                  }}
                  className="px-6 py-3 bg-[#C8A97E] hover:bg-[#DFC5A2] text-[#0B0B0C] font-semibold text-xs tracking-widest uppercase transition-colors"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 first:pt-0">
                  {/* Thumbnail */}
                  <div className="w-20 h-26 shrink-0 overflow-hidden bg-[#141418] border border-[#27272C]">
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      aspectRatioClass="aspect-[3/4]"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm text-white line-clamp-1 pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-[#71717A] hover:text-rose-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-3 text-xs text-[#A0A0A8] font-sans">
                        <span>Size: <strong className="text-[#E6E2DB] font-normal">{item.size}</strong></span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 inline-block border border-white/20"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          {item.color.name}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#27272C] bg-[#141418]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-1.5 text-[#A0A0A8] hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-xs tabular-nums text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="p-1.5 text-[#A0A0A8] hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total for Item */}
                      <span className="font-mono tabular-nums text-xs font-semibold text-white">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Controls & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#1E1E24] bg-[#0B0B0C] space-y-4">
              {/* Gift Packaging Toggle */}
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs text-[#A0A0A8] cursor-pointer hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={giftPackaging}
                    onChange={(e) => setGiftPackaging(e.target.checked)}
                    className="accent-[#C8A97E] w-3.5 h-3.5 rounded-none"
                  />
                  <Gift className="w-3.5 h-3.5 text-[#C8A97E]" />
                  <span>Complimentary archival gift box & calligraphy note</span>
                </label>

                {giftPackaging && (
                  <textarea
                    rows={2}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Enter your personalized gift note message..."
                    className="w-full bg-[#141418] border border-[#27272C] p-2 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#C8A97E] font-sans"
                  />
                )}
              </div>

              {/* Promo Code Accordion */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-[#141418] border border-[#C8A97E]/30 p-2.5 text-xs">
                    <div className="flex items-center gap-2 text-[#C8A97E]">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedPromo.label} ({appliedPromo.code})</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-[#A0A0A8] hover:text-white underline font-mono"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Privilege Code (e.g. NOIR10)"
                        className="flex-1 bg-[#141418] border border-[#27272C] px-3 py-2 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#C8A97E] uppercase font-mono tracking-wider"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#27272C] hover:bg-[#383842] text-xs text-white uppercase tracking-wider transition-colors font-medium"
                      >
                        Apply
                      </button>
                    </form>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-[#A0A0A8]">
                      <span>Try code:</span>
                      <button
                        type="button"
                        onClick={() => applyPromoCode('NOIR10')}
                        className="underline text-[#C8A97E] hover:text-white font-mono"
                      >
                        NOIR10
                      </button>
                      <span>(10% off)</span>
                    </div>
                  </div>
                )}
                {promoError && (
                  <p className="mt-1.5 text-[11px] text-rose-400 font-sans">{promoError}</p>
                )}
              </div>

              {/* Cost Summary Breakdown */}
              <div className="space-y-1.5 text-xs border-t border-[#1E1E24] pt-3 text-[#A0A0A8]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-white">{formatINR(cartSubtotal)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#C8A97E]">
                    <span>Privilege Benefit</span>
                    <span className="font-mono tabular-nums">-{formatINR(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>White-Glove Shipping</span>
                  <span className="font-mono tabular-nums text-white">
                    {shippingFee === 0 ? 'Complimentary' : formatINR(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-[#1E1E24]">
                  <span className="font-serif">Total Due</span>
                  <span className="font-mono tabular-nums text-base text-[#C8A97E]">{formatINR(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={openCheckout}
                className="w-full py-3.5 bg-[#C8A97E] hover:bg-[#DFC5A2] text-[#0B0B0C] font-semibold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[10px] text-[#71717A] uppercase tracking-widest font-sans">
                Encrypted Checkout · Insured Courier Delivery
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
