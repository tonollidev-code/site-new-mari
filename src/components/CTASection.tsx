import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export const CTASection: React.FC = () => {
  const { scrollToSection } = useApp();

  return (
    <section className="py-20 lg:py-24 bg-[#3F2519] text-[#FCFAF7] relative overflow-hidden border-t border-[#DFD7CD]/20 w-full max-w-full">
      
      {/* Subtle ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] md:w-[600px] h-[280px] sm:h-[500px] md:h-[600px] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none max-w-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#C5A059]/30 text-[#C5A059] text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Experiência Exclusiva</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4"
        >
          Pronta para transformar suas unhas <br className="hidden sm:inline" />
          com elegância e sofisticação?
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base sm:text-lg font-serif italic text-[#DFD7CD] mb-10 max-w-xl mx-auto font-normal leading-relaxed"
        >
          “Seu próximo momento de beleza, cuidado e autoestima começa aqui.”
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection('booking')}
            className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#D4AF37] text-[#1A0C06] px-9 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-luxury hover:shadow-luxury-hover transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#1A0C06]" />
            <span>Agendar Meu Horário</span>
          </button>

          <button
            onClick={() => scrollToSection('about')}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-[#C5A059]" />
            <span>Conheça o Estúdio</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};
