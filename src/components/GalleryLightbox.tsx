import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar } from 'lucide-react';

export const GalleryLightbox: React.FC = () => {
  const { lightboxImage, setLightboxImage, setSelectedServiceForBooking, services, scrollToSection } = useApp();

  if (!lightboxImage) return null;

  const handleBookLook = () => {
    const service = services.find(s => s.category === lightboxImage.category) || services[0];
    setSelectedServiceForBooking(service);
    setLightboxImage(null);
    scrollToSection('booking');
  };

  return (
    <div
      onClick={() => setLightboxImage(null)}
      className="fixed inset-0 z-50 bg-[#1A0C06]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#2C1810] rounded-3xl max-w-3xl w-full border border-[#C5A059]/40 shadow-2xl overflow-hidden relative flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={() => setLightboxImage(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Frame */}
        <div className="bg-black flex items-center justify-center relative min-h-[350px] max-h-[70vh]">
          <img
            src={lightboxImage.imageUrl}
            alt="Trabalho de Nail Art em destaque"
            className="w-full h-full object-contain max-h-[70vh]"
          />
        </div>

        {/* Minimal Action Bar */}
        <div className="p-4 sm:p-6 bg-[#2C1810] flex items-center justify-between gap-4 border-t border-[#DFD7CD]/20">
          <button
            onClick={handleBookLook}
            className="w-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#1A0C06] py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-luxury flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#1A0C06]" />
            <span>Agendar Este Modelo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

