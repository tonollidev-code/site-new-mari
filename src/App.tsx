/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider } from './context/AppContext';
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
import { AdminModal } from './components/AdminModal';

export default function App() {
  return (
    <AppProvider>
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

        {/* Floating Widgets & Modals */}
        <WhatsAppFloatingButton />
        <GalleryLightbox />
        <AdminModal />
      </div>
    </AppProvider>
  );
}
