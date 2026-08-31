import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Eye, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { scrollToSection } = useApp();

  return (
    <section id="hero" className="relative overflow-hidden bg-transparent pt-10 pb-16 lg:py-24 border-b border-[#EADEDA]/60">
      {/* Subtle organic light accent */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#F5E5C9]/30 rounded-full blur-[100px] pointer-events-none -z-0" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EFEB] border border-[#C5A059]/30 text-[#8C6E5D] text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>Studio Nail Designer • Atendimento Exclusivo</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2C1810] leading-[1.12] mb-6 tracking-tight">
              Suas unhas merecem um <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#C5A059]">toque de elegância.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-serif italic text-[#735747] mb-4 font-normal">
              Realce sua beleza com unhas feitas especialmente para você.
            </p>

            {/* Short Description */}
            <p className="text-base text-[#6E5648] max-w-xl mb-8 leading-relaxed font-normal">
              Na <strong className="text-[#2C1810] font-semibold">Mariana Leone</strong>, cada detalhe é pensado para proporcionar uma experiência única, sofisticada e personalizada em um ambiente acolhedor.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-4">
              <button
                onClick={() => scrollToSection('booking')}
                className="group relative bg-[#2C1810] hover:bg-[#3D2314] text-[#FCFAF7] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-[#2C1810]"
              >
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>Agendar Meu Horário</span>
              </button>

              <button
                onClick={() => scrollToSection('gallery')}
                className="bg-white hover:bg-[#F5EFEB] text-[#2C1810] border border-[#DFD7CD] hover:border-[#C5A059]/60 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xs hover:shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
              >
                <Eye className="w-4 h-4 text-[#C5A059]" />
                <span>Ver Meus Trabalhos</span>
              </button>
            </div>

          </motion.div>

          {/* Right Image Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Subtle Frame */}
              <div className="relative bg-white p-2.5 sm:p-3 rounded-3xl border border-[#E5C158]/35 shadow-luxury transition-all duration-500 hover:shadow-luxury-hover">
                
                {/* Hero Image Container */}
                <div className="relative overflow-hidden rounded-2xl bg-[#F8F5F2]">
                  <img
                    src="https://i.postimg.cc/wTrHCqHZ/Whats-App-Image-2026-08-13-at-09-55-45.jpg"
                    referrerPolicy="no-referrer"
                    alt="Unhas em gel com durabilidade feitas por Mariana Leone"
                    className="w-full h-[390px] sm:h-[470px] object-cover transition-transform duration-700 ease-out hover:scale-103"
                  />

                  {/* Refined Glassmorphism Badge Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-5 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E5C158]/40 shadow-sm flex items-center justify-center gap-2 transition-all">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059] shrink-0 opacity-90" />
                    <span className="font-delicate italic text-sm sm:text-base md:text-lg font-normal text-[#2C1810] tracking-wide">
                      Unhas em gel com durabilidade
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
