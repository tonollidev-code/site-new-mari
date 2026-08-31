import React from 'react';
import { useApp } from '../context/AppContext';
import { Maximize2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Gallery: React.FC = () => {
  const { gallery, setLightboxImage, scrollToSection } = useApp();

  return (
    <section id="gallery" className="py-20 lg:py-24 bg-[#F8F5F2]/80 backdrop-blur-[2px] border-b border-[#EADEDA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#8C6E5D] bg-white px-3.5 py-1 rounded-full border border-[#DFD7CD] shadow-xs">
            Portfólio & Nail Art
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1810] mt-4 mb-3 tracking-tight">
            Galeria de Trabalhos
          </h2>
        </motion.div>

        {/* Gallery Grid - Only Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightboxImage(item)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-[#EADEDA]/80 shadow-luxury hover:shadow-luxury-hover cursor-pointer transition-all duration-500 hover:-translate-y-1 p-2"
            >
              <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl relative bg-[#EADEDA]/50">
                <img
                  src={item.imageUrl}
                  alt="Trabalho de Nail Art"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Refined Subtle Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-[#2C1810]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="p-3.5 rounded-full bg-white/95 text-[#2C1810] shadow-md group-hover:scale-105 transition-transform duration-300 border border-[#E5C158]/30">
                    <Maximize2 className="w-4 h-4 text-[#C5A059]" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 text-center bg-white py-3.5 px-8 rounded-full border border-[#DFD7CD] max-w-xs mx-auto shadow-xs hover:shadow-sm transition-all duration-300"
        >
          <button
            onClick={() => scrollToSection('booking')}
            className="text-xs font-bold uppercase tracking-[0.18em] text-[#2C1810] hover:text-[#C5A059] transition-colors flex items-center justify-center gap-2 w-full cursor-pointer"
          >
            <span>Agendar Horário</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

