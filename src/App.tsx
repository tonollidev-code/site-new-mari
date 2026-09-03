/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Highlights } from './components/Highlights';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { BeforeAfter } from './components/BeforeAfter';
import { InstagramGrid } from './components/InstagramGrid';
import { HowItWorks } from './components/HowItWorks';
import { BookingSection } from './components/BookingSection';
import { LocationSection } from './components/LocationSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { GalleryLightbox } from './components/GalleryLightbox';
import { GlassLogoBackground } from './components/GlassLogoBackground';
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { AdminDashboardPage } from './components/admin/AdminDashboardPage';
import { preloadImagesInBatches } from './utils/imagePreloader';

function MainContent() {
  const { currentPath, isAuthorizedAdmin, authLoading, services, gallery } = useApp();

  // Background non-blocking pre-caching for all site images
  useEffect(() => {
    const mediaUrls = [
      'https://i.postimg.cc/wTrHCqHZ/Whats-App-Image-2026-08-13-at-09-55-45.jpg',
      'https://i.postimg.cc/y6wg2q7F/Whats-App-Image-2026-08-08-at-21-38-19.jpg',
      'https://i.postimg.cc/sx0cCTDJ/Whats-App-Image-2026-08-08-at-16-40-36.jpg',
      ...services.map((s) => s.image).filter(Boolean) as string[],
      'https://i.postimg.cc/g0zHrxt1/Whats-App-Image-2026-08-08-at-16-40-35.jpg',
      'https://i.postimg.cc/QtnFmwdQ/Whats-App-Image-2026-08-09-at-19-26-22.jpg',
      ...gallery.map((g) => g.imageUrl).filter(Boolean),
      'https://i.postimg.cc/QdXTJRgT/Whats-App-Image-2026-08-09-at-19-27-35.jpg',
      'https://i.postimg.cc/RhBFVHGj/Whats-App-Image-2026-08-09-at-19-27-35-(1).jpg',
      'https://i.postimg.cc/6py9Kctn/Whats-App-Image-2026-08-09-at-19-27-36.jpg',
      'https://i.postimg.cc/MZ5xjNGt/Whats-App-Image-2026-08-09-at-19-27-36-(1).jpg',
    ];
    preloadImagesInBatches(mediaUrls, 4, 80);
  }, [services, gallery]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#E5C158] border-t-transparent animate-spin mb-4" />
        <p className="font-serif text-sm font-bold text-[#523626]">Mariana Leone</p>
        <p className="text-xs text-[#8C6E5D]">Carregando ambiente seguro...</p>
      </div>
    );
  }

  // Admin Login Route
  if (currentPath === '/admin/login') {
    if (isAuthorizedAdmin) {
      return <AdminDashboardPage />;
    }
    return <AdminLoginPage />;
  }

  // Protected Admin Route
  if (currentPath === '/admin') {
    if (isAuthorizedAdmin) {
      return <AdminDashboardPage />;
    }
    // Strict Backend Security Fallback: Unauthenticated or non-admin clients are shown the login page
    return <AdminLoginPage />;
  }

  // Public Website View
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#FCFAF7] text-[#593E30] font-sans flex flex-col selection:bg-[#FFD700]/30 selection:text-[#B37E00]">
      {/* Glassmorphic Animated Golden Logo Background */}
      <GlassLogoBackground />

      {/* Fixed Navigation Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="relative z-10 flex-1 w-full max-w-full overflow-x-hidden">
        <Hero />
        <Highlights />
        <About />
        <Services />
        <Gallery />
        <BeforeAfter />
        <InstagramGrid />
        <HowItWorks />
        <BookingSection />
        <LocationSection />
        <CTASection />
      </main>

      {/* Footer */}
      <div className="relative z-10 w-full max-w-full overflow-x-hidden">
        <Footer />
      </div>

      {/* Floating Widgets & Lightbox */}
      <WhatsAppFloatingButton />
      <GalleryLightbox />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
