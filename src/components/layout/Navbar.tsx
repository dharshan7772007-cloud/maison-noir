import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ActivePage, GenderCategory, Product } from '../../types';
import { PRODUCTS, formatINR } from '../../data/products';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, genderFilter?: GenderCategory, showWishlist?: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const { cartCount, wishlist, openCart, setSelectedProductForModal } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  // Close search & mobile menu on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search filtering
  const searchResults: Product[] = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const handleNavLink = (page: ActivePage, gender?: GenderCategory, showWishlist?: boolean) => {
    onNavigate(page, gender, showWishlist);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. Announcement Bar */}
      {!announcementDismissed && (
        <div className="bg-[#121215] text-[#C8A97E] text-[11px] tracking-[0.2em] uppercase font-sans border-b border-[#232328] py-2 px-4 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="w-6" /> {/* spacer */}
            <div className="text-center font-medium truncate px-2">
              <span>Complimentary White-Glove Delivery on Orders Over ₹25,000</span>
              <span className="hidden sm:inline mx-3 text-[#5A5A64]">·</span>
              <span className="hidden sm:inline text-[#E6E2DB]">The Autumn/Winter 2026 Presentation</span>
            </div>
            <button
              onClick={() => setAnnouncementDismissed(true)}
              aria-label="Dismiss announcement"
              className="text-[#71717A] hover:text-[#C8A97E] transition-colors p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Top Bar (Strict 3-Zone Contract) */}
      <header className="sticky top-0 z-40 bg-[#0B0B0C]/95 backdrop-blur-md border-b border-[#1E1E24] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="md:hidden p-2 text-[#A0A0A8] hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavLink('home')}
            className="text-left whitespace-nowrap shrink-0 group focus:outline-none"
            aria-label="Maison Noir Home"
          >
            <span className="font-serif tracking-[0.28em] text-xl sm:text-2xl text-[#F7F5F0] group-hover:text-[#C8A97E] transition-colors uppercase">
              MAISON NOIR
            </span>
            <span className="block text-[8px] tracking-[0.38em] uppercase text-[#8E8E98] font-sans -mt-0.5">
              HAUTE COUTURE · PARIS
            </span>
          </button>

          {/* Zone 2: 4–5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-sans text-[#C2BDB5]">
            <button
              onClick={() => handleNavLink('collections', 'all')}
              className={`hover:text-[#C8A97E] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                activePage === 'collections' ? 'text-[#C8A97E] font-medium' : ''
              }`}
            >
              Collections
              {activePage === 'collections' && (
                <span className="absolute bottom-0 inset-x-0 h-[1px] bg-[#C8A97E]" />
              )}
            </button>

            <button
              onClick={() => handleNavLink('collections', 'women')}
              className="hover:text-[#C8A97E] transition-colors whitespace-nowrap shrink-0 relative py-1"
            >
              Women
            </button>

            <button
              onClick={() => handleNavLink('collections', 'men')}
              className="hover:text-[#C8A97E] transition-colors whitespace-nowrap shrink-0 relative py-1"
            >
              Men
            </button>

            <button
              onClick={() => handleNavLink('about')}
              className={`hover:text-[#C8A97E] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                activePage === 'about' ? 'text-[#C8A97E] font-medium' : ''
              }`}
            >
              The Atelier
              {activePage === 'about' && (
                <span className="absolute bottom-0 inset-x-0 h-[1px] bg-[#C8A97E]" />
              )}
            </button>

            <button
              onClick={() => handleNavLink('contact')}
              className={`hover:text-[#C8A97E] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                activePage === 'contact' ? 'text-[#C8A97E] font-medium' : ''
              }`}
            >
              Concierge
              {activePage === 'contact' && (
                <span className="absolute bottom-0 inset-x-0 h-[1px] bg-[#C8A97E]" />
              )}
            </button>
          </nav>

          {/* Zone 3: 1 primary action or essential functional tools */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search catalog"
              className="p-2 text-[#C2BDB5] hover:text-[#C8A97E] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Link/Indicator */}
            <button
              onClick={() => handleNavLink('collections', 'all', true)}
              aria-label={`Wishlist (${wishlist.length} saved)`}
              className="relative p-2 text-[#C2BDB5] hover:text-[#C8A97E] transition-colors hidden sm:block"
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-[#C8A97E] text-[#C8A97E]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C8A97E]" />
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={openCart}
              aria-label={`Shopping bag with ${cartCount} items`}
              className="flex items-center gap-2.5 px-3.5 py-2 border border-[#27272C] hover:border-[#C8A97E] text-xs font-sans tracking-widest uppercase transition-colors text-[#F7F5F0]"
            >
              <ShoppingBag className="w-4 h-4 text-[#C8A97E]" />
              <span className="font-mono tabular-nums text-xs font-semibold">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#0E0E10] border-r border-[#27272C] p-6 flex flex-col justify-between text-[#F7F5F0]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#1E1E24]">
                <div>
                  <span className="font-serif tracking-[0.25em] text-lg text-[#F7F5F0] uppercase">
                    MAISON NOIR
                  </span>
                  <span className="block text-[8px] tracking-[0.3em] uppercase text-[#8E8E98]">
                    PARIS ATELIER
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-[#A0A0A8] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-5 text-sm tracking-[0.2em] uppercase font-sans">
                <button
                  onClick={() => handleNavLink('home')}
                  className="block w-full text-left hover:text-[#C8A97E] transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavLink('collections', 'all')}
                  className="block w-full text-left hover:text-[#C8A97E] transition-colors"
                >
                  All Collections
                </button>
                <button
                  onClick={() => handleNavLink('collections', 'women')}
                  className="block w-full text-left text-[#C8A97E] hover:text-[#DFC5A2] transition-colors"
                >
                  Women's Ready-to-Wear
                </button>
                <button
                  onClick={() => handleNavLink('collections', 'men')}
                  className="block w-full text-left text-[#C8A97E] hover:text-[#DFC5A2] transition-colors"
                >
                  Men's Sartorial Line
                </button>
                <button
                  onClick={() => handleNavLink('collections', 'all', true)}
                  className="flex items-center justify-between w-full text-left text-[#F7F5F0] hover:text-[#C8A97E] transition-colors"
                >
                  <span>Saved Wishlist</span>
                  <span className="font-mono text-xs px-2 py-0.5 border border-[#C8A97E] text-[#C8A97E]">
                    {wishlist.length}
                  </span>
                </button>
                <button
                  onClick={() => handleNavLink('about')}
                  className="block w-full text-left hover:text-[#C8A97E] transition-colors"
                >
                  The Atelier & Heritage
                </button>
                <button
                  onClick={() => handleNavLink('contact')}
                  className="block w-full text-left hover:text-[#C8A97E] transition-colors"
                >
                  Concierge & Salons
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1E1E24] text-xs text-[#8E8E98] space-y-2">
              <p className="font-serif italic text-white">Private Concierge Appointments</p>
              <p>Chanakyapuri, New Delhi · Bandra, Mumbai</p>
              <p className="font-mono text-[#C8A97E]">+91 (0) 22 6940 8800</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Instant Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#0E0E10] border border-[#27272C] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#27272C]">
              <div className="flex items-center gap-3 flex-1">
                <Search className="w-5 h-5 text-[#C8A97E]" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pieces, cashmere, silk gowns, tailoring..."
                  className="w-full bg-transparent text-sm sm:text-base text-white placeholder-[#71717A] focus:outline-none font-sans"
                />
              </div>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                aria-label="Close search"
                className="p-2 text-[#A0A0A8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Instant Results */}
            <div className="mt-4">
              {searchQuery.trim() === '' ? (
                <div className="py-6 text-center text-xs text-[#8E8E98]">
                  <span>Curated Searches: </span>
                  {['Cashmere Coat', 'Silk Gown', 'Tuxedo', 'Trench', 'Box-Calf Bag'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="mx-1.5 underline hover:text-[#C8A97E] text-white"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              ) : searchResults.length > 0 ? (
                <div className="divide-y divide-[#1E1E24]">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedProductForModal(item);
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="py-3 flex items-center justify-between hover:bg-[#141418] px-2 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-16 shrink-0 overflow-hidden bg-[#18181D]">
                          <ImageWithFallback
                            src={item.images[0]}
                            alt={item.name}
                            aspectRatioClass="aspect-[3/4]"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] tracking-widest uppercase text-[#8E8E98] block">
                            {item.gender === 'women' ? "Women's" : "Men's"} · {item.category}
                          </span>
                          <h4 className="font-serif text-sm text-white">{item.name}</h4>
                          <span className="font-mono text-xs text-[#C8A97E]">{formatINR(item.price)}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#8E8E98]" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-[#8E8E98]">
                  No commission matches "{searchQuery}". Please consult our concierge for bespoke requests.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
