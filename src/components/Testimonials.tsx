import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AddTestimonialModal } from './AddTestimonialModal';
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquarePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Testimonials: React.FC = () => {
  const { testimonials } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-24 bg-[#F8F5F2]/80 backdrop-blur-[2px] border-b border-[#EADEDA] relative overflow-hidden">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#8C6E5D] bg-white px-3.5 py-1 rounded-full border border-[#DFD7CD] shadow-xs">
            Avaliações & Experiências
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1810] mt-4 mb-3 tracking-tight">
            O que dizem as clientes
          </h2>
          <p className="text-base text-[#735747] font-serif italic font-normal">
            Depoimentos reais de quem já viveu a experiência Mari Nail Designer.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Main Active Testimonial Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white p-7 sm:p-12 rounded-3xl border border-[#DFD7CD] shadow-luxury relative overflow-hidden min-h-[290px] flex flex-col justify-between"
          >
            
            <Quote className="absolute top-6 right-6 w-14 h-14 text-[#C5A059]/10 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="flex text-[#C5A059] gap-1 mb-5">
                  {[...Array(testimonials[currentIndex]?.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-base sm:text-lg lg:text-xl font-serif italic text-[#2C1810] leading-relaxed mb-6 font-normal">
                  “{testimonials[currentIndex]?.comment}”
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-[#EADEDA]/70">
                  <div>
                    <h4 className="font-serif font-bold text-base sm:text-lg text-[#2C1810]">
                      {testimonials[currentIndex]?.name}
                    </h4>
                    <p className="text-xs text-[#8A6D56]">
                      {testimonials[currentIndex]?.role} • <span className="text-[#C5A059] font-semibold">{testimonials[currentIndex]?.serviceDone}</span>
                    </p>
                  </div>

                  <span className="text-[11px] text-[#9E806D] font-medium">
                    {testimonials[currentIndex]?.date}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

          </motion.div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8">
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-6 bg-[#C5A059]'
                      : 'w-1.5 bg-[#DFD7CD] hover:bg-[#C5A059]/50'
                  }`}
                  aria-label={`Ver depoimento ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows & Add Review Button */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-white border border-[#DFD7CD] hover:border-[#C5A059] text-[#2C1810] hover:text-[#C5A059] transition-colors shadow-xs active:scale-95 cursor-pointer"
                aria-label="Depoimento Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-white border border-[#DFD7CD] hover:border-[#C5A059] text-[#2C1810] hover:text-[#C5A059] transition-colors shadow-xs active:scale-95 cursor-pointer"
                aria-label="Próximo Depoimento"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="ml-2 bg-[#2C1810] hover:bg-[#3D2314] text-[#FCFAF7] px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-xs hover:shadow-sm cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Deixar Depoimento</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      <AddTestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
