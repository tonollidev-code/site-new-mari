/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
import { FAQSection } from './components/FAQSection';
import { LocationSection } from './components/LocationSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { GalleryLightbox } from './components/GalleryLightbox';
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { AdminDashboardPage } from './components/admin/AdminDashboardPage';
import { Sparkles } from 'lucide-react';

function MainContent() {
  const { currentPath, isAuthorizedAdmin, authLoading } = useApp();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#E5C158] border-t-transparent animate-spin mb-4" />
        <p className="font-serif text-sm font-bold text-[#523626]">Mari Nail Designer</p>
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
    <div className="min-h-screen bg-[#FCFAF7] text-[#593E30] font-sans flex flex-col selection:bg-[#FFD700]/30 selection:text-[#B37E00]">
      {/* Fixed Navigation Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <Highlights />
        <About />
        <Services />
        <Gallery />
        <BeforeAfter />
        <InstagramGrid />
        <HowItWorks />
        <BookingSection />
        <FAQSection />
        <LocationSection />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />

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
