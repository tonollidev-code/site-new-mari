import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Eye, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollToSection } = useApp();

  return (
    <section id="hero" className="relative overflow-hidden bg-[#FCFAF7] pt-8 pb-16 lg:py-24 border-b border-[#EADEDA]/40">
      {/* Background Decorative Gold Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#E5C158 0.85px, transparent 0.85px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Decorative Gold Glow Orb */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#E5C158]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[#F5E5C9]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8F5F2] border border-[#E5C158]/40 text-[#C5A059] text-xs font-semibold uppercase tracking-widest mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Studio Nail Designer Premium</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#523626] leading-[1.12] mb-6">
              Suas unhas merecem um <br className="hidden sm:inline" />
              <span className="text-gold-gradient font-serif italic">toque de elegância.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-serif italic text-[#9E7B68] mb-4 font-medium">
              Realce sua beleza com unhas feitas especialmente para você.
            </p>

            {/* Short Description */}
            <p className="text-base text-[#7D5E4D] max-w-xl mb-8 leading-relaxed">
              Na <strong className="text-[#523626] font-semibold">Mari Nail Designer</strong>, cada detalhe é pensado para proporcionar uma experiência única, sofisticada e personalizada em um ambiente acolhedor.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => scrollToSection('booking')}
                className="bg-gradient-to-r from-[#523626] via-[#6E4936] to-[#523626] hover:from-[#C5A059] hover:to-[#E5C158] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl shadow-[#523626]/10 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 border border-[#E5C158]/40"
              >
                <Calendar className="w-4 h-4 text-[#E5C158]" />
                <span>Agendar Meu Horário</span>
              </button>

              <button
                onClick={() => scrollToSection('gallery')}
                className="bg-white hover:bg-[#F8F5F2] text-[#C5A059] border-2 border-[#E5C158]/60 hover:border-[#E5C158] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xs transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Eye className="w-4 h-4" />
                <span>Ver Meus Trabalhos</span>
              </button>
            </div>

          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Frame */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#E5C158]/30 via-transparent to-[#F5E5C9]/30 blur-md pointer-events-none" />
              
              <div className="relative bg-white p-3 rounded-3xl border-2 border-[#E5C158]/40 shadow-2xl overflow-hidden">
                {/* Hero Image */}
                <img
                  src="https://i.postimg.cc/wTrHCqHZ/Whats-App-Image-2026-08-13-at-09-55-45.jpg"
                  referrerPolicy="no-referrer"
                  alt="Unhas em gel com durabilidade feitas pela Mari Nail Designer"
                  className="w-full h-[380px] sm:h-[460px] object-cover rounded-2xl transform hover:scale-102 transition-transform duration-700"
                />

                {/* Badge Overlay */}
                <div className="absolute bottom-5 left-5 right-5 sm:left-6 sm:right-6 bg-white/92 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#E5C158]/40 shadow-lg flex items-center justify-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] shrink-0 opacity-80" />
                  <span className="font-delicate italic text-sm sm:text-base md:text-lg font-normal text-[#2C1810] tracking-wider">
                    Unhas em gel com durabilidade
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
