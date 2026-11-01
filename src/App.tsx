/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { ActivePage, GenderCategory, SubCategory, Product } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { FeaturedCollections } from './components/home/FeaturedCollections';
import { BestSellers } from './components/home/BestSellers';
import { BrandPhilosophy } from './components/home/BrandPhilosophy';
import { EditorialCampaign } from './components/home/EditorialCampaign';
import { Newsletter } from './components/home/Newsletter';
import { CollectionsPage } from './components/pages/CollectionsPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { ProductDetailModal } from './components/pdp/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';

function AppContent() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [targetGender, setTargetGender] = useState<GenderCategory>('all');
  const [targetCategory, setTargetCategory] = useState<SubCategory>('all');
  const [wishlistOnly, setWishlistOnly] = useState<boolean>(false);

  const {
    selectedProductForModal,
    setSelectedProductForModal,
    isCheckoutOpen,
    closeCheckout
  } = useCart();

  const handleNavigate = (page: ActivePage, genderFilter?: GenderCategory, showWishlist?: boolean) => {
    setActivePage(page);
    if (showWishlist) {
      setWishlistOnly(true);
      setTargetGender('all');
      setTargetCategory('all');
    } else {
      setWishlistOnly(false);
      if (genderFilter) {
        setTargetGender(genderFilter);
        setTargetCategory('all');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFeaturedCollection = (category: SubCategory) => {
    setWishlistOnly(false);
    setTargetCategory(category);
    setTargetGender('all');
    setActivePage('collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCampaign = () => {
    const el = document.getElementById('campaign');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActivePage('home');
      setTimeout(() => {
        document.getElementById('campaign')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#F7F5F0] flex flex-col font-sans selection:bg-[#C8A97E]/30 selection:text-white">
      {/* Top Navbar & Announcement */}
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <Hero
              onShopClick={() => handleNavigate('collections', 'all')}
              onExploreCampaign={handleExploreCampaign}
              onSelectCategory={(gender) => handleNavigate('collections', gender)}
            />
            <FeaturedCollections onSelectCollection={handleSelectFeaturedCollection} />
            <BestSellers onViewAll={() => handleNavigate('collections', 'all')} />
            <BrandPhilosophy onLearnMore={() => handleNavigate('about')} />
            <EditorialCampaign onShopEditorial={() => handleNavigate('collections', 'all')} />
            <Newsletter />
          </>
        )}

        {activePage === 'collections' && (
          <CollectionsPage
            initialGender={targetGender}
            initialCategory={targetCategory}
            initialWishlistOnly={wishlistOnly}
            onSelectProduct={(prod: Product) => setSelectedProductForModal(prod)}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onExploreCollections={() => handleNavigate('collections', 'all')}
            onBookAppointment={() => handleNavigate('contact')}
          />
        )}

        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Luxury House Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />

      {/* Global Slide-Over Shopping Bag Drawer */}
      <CartDrawer onExploreCollections={() => handleNavigate('collections', 'all')} />

      {/* Global Demo Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
        onOrderSuccess={(order) => {
          console.info('Order placed successfully:', order.orderId);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
