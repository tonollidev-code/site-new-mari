import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AddTestimonialModal } from './AddTestimonialModal';
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquarePlus } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { testimonials } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-[#F8F5F2] border-b border-[#EADEDA] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C5A059] bg-white px-4 py-1.5 rounded-full border border-[#E5C158]/30">
            Avaliações & Experiências
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1810] mt-4 mb-3">
            O que minhas clientes dizem
          </h2>
          <p className="text-base text-[#7A6354] font-serif italic">
            Depoimentos reais de quem já viveu a experiência Mari Nail Designer.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Main Active Testimonial Card */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E5C158]/40 shadow-xl relative overflow-hidden transition-all duration-500">
            
            <Quote className="absolute top-6 right-6 w-16 h-16 text-[#E5C158]/15 pointer-events-none" />

            <div className="flex text-[#E5C158] gap-1 mb-6">
              {[...Array(testimonials[currentIndex]?.rating || 5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            <p className="text-base sm:text-xl font-serif italic text-[#3D2314] leading-relaxed mb-8 font-medium">
              “{testimonials[currentIndex]?.comment}”
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#EADEDA]">
              <div>
                <h4 className="font-serif font-bold text-lg text-[#2C1810]">
                  {testimonials[currentIndex]?.name}
                </h4>
                <p className="text-xs text-[#8A6D56]">
                  {testimonials[currentIndex]?.role} • <span className="text-[#C5A059] font-semibold">{testimonials[currentIndex]?.serviceDone}</span>
                </p>
              </div>

              <span className="text-xs text-gray-400 font-medium">
                {testimonials[currentIndex]?.date}
              </span>
            </div>

          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8">
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-[#E5C158]'
                      : 'w-2.5 bg-[#EADEDA] hover:bg-[#E5C158]/50'
                  }`}
                  aria-label={`Ver depoimento ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows & Add Review Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white border border-[#EADEDA] hover:border-[#E5C158] text-[#2C1810] hover:text-[#C5A059] transition-colors shadow-xs"
                aria-label="Depoimento Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white border border-[#EADEDA] hover:border-[#E5C158] text-[#2C1810] hover:text-[#C5A059] transition-colors shadow-xs"
                aria-label="Próximo Depoimento"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="ml-2 bg-[#2C1810] hover:bg-[#E5C158] text-white hover:text-[#2C1810] px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <MessageSquarePlus className="w-4 h-4 text-[#E5C158]" />
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
