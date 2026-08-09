import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Sparkles, Heart } from 'lucide-react';

export const CTASection: React.FC = () => {
  const { scrollToSection } = useApp();

  return (
    <section className="py-20 bg-gradient-to-r from-[#523626] via-[#6E4936] to-[#523626] text-white relative overflow-hidden border-t border-[#E5C158]/40">
      
      {/* Decorative Gold Stars Background */}
      <div 
        className="absolute inset-0 opacity-[0.10] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#E5C158 0.85px, transparent 0.85px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C158]/15 border border-[#E5C158]/50 text-[#F5E5C9] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Experiência Exclusiva</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold leading-tight mb-4">
          Pronta para deixar suas unhas <br className="hidden sm:inline" />
          ainda mais <span className="text-gold-gradient italic font-serif">incríveis?</span>
        </h2>

        <p className="text-base sm:text-xl font-serif italic text-[#EADEDA] mb-8 max-w-2xl mx-auto">
          “Seu próximo momento de beleza, cuidado e autoestima começa aqui.”
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection('booking')}
            className="w-full sm:w-auto bg-gradient-to-r from-[#E5C158] via-[#F5E5C9] to-[#C5A059] hover:from-[#C5A059] hover:to-[#E5C158] text-[#3D2314] px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-2xl shadow-[#E5C158]/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            <Calendar className="w-5 h-5 text-[#3D2314]" />
            <span>QUERO AGENDAR MEU HORÁRIO</span>
          </button>

          <button
            onClick={() => scrollToSection('about')}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-[#E5C158]/50 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 text-[#F5E5C9]" />
            <span>Conheça o Estúdio</span>
          </button>
        </div>

      </div>
    </section>
  );
};
