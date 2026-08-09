import React from 'react';
import { useApp } from '../context/AppContext';
import { Maximize2 } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { gallery, setLightboxImage, scrollToSection } = useApp();

  return (
    <section id="gallery" className="py-20 bg-[#F8F5F2] border-b border-[#EADEDA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C5A059] bg-white px-4 py-1.5 rounded-full border border-[#E5C158]/30">
            Portfólio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1810] mt-4 mb-3">
            Galeria de Fotos
          </h2>
        </div>

        {/* Gallery Grid - Only Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-[#EADEDA] shadow-xs hover:shadow-2xl cursor-pointer transition-all duration-500 hover:-translate-y-1"
            >
              <div className="aspect-[4/5] w-full overflow-hidden relative bg-[#EADEDA]">
                <img
                  src={item.imageUrl}
                  alt="Trabalho de Nail Art"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Subtle Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3.5 rounded-full bg-white/90 text-[#2C1810] shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Callout */}
        <div className="mt-12 text-center bg-white p-6 rounded-3xl border border-[#E5C158]/30 max-w-xl mx-auto shadow-sm">
          <button
            onClick={() => scrollToSection('booking')}
            className="text-xs font-bold uppercase tracking-widest text-[#C5A059] hover:text-[#1A1A1A] transition-colors"
          >
            Agendar Horário →
          </button>
        </div>

      </div>
    </section>
  );
};

