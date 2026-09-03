import React from 'react';
import { useApp } from '../context/AppContext';
import { Eye, CheckCircle2, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  const { scrollToSection } = useApp();

  return (
    <section id="about" className="py-20 lg:py-24 bg-[#F8F5F2]/80 backdrop-blur-[2px] relative overflow-hidden border-b border-[#EADEDA]">
      {/* Subtle organic warmth */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5C158]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Photo Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative bg-white p-2.5 sm:p-3 rounded-3xl border border-[#E5C158]/35 shadow-luxury transition-all duration-500 hover:shadow-luxury-hover">
                <div className="relative overflow-hidden rounded-2xl bg-[#EADEDA]/40">
                  <img
                    src="https://i.postimg.cc/sx0cCTDJ/Whats-App-Image-2026-08-08-at-16-40-36.jpg"
                    referrerPolicy="no-referrer"
                    alt="Mariana Leone - Especialista em unhas sofisticadas"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[430px] sm:h-[480px] object-cover transition-transform duration-700 ease-out hover:scale-103"
                  />
                </div>
              </div>

            </div>
          </motion.div>

          {/* Text Content Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DFD7CD] text-[#8C6E5D] text-[11px] font-bold uppercase tracking-[0.2em] mb-4 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>Conheça a Mari</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3F2519] mb-6 leading-tight tracking-tight">
              Muito prazer, <br />
              <span className="font-serif italic font-normal text-[#C5A059]">eu sou a Mari.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#73503D] leading-relaxed mb-6 font-normal italic">
              “Mais do que cuidar das suas unhas, meu objetivo é proporcionar um momento de autocuidado, beleza e autoestima. Cada atendimento é feito com atenção aos detalhes para que você saia daqui se sentindo ainda mais confiante.”
            </p>

            <p className="text-sm text-[#73594A] leading-relaxed mb-8 font-normal">
              Com especializações em simetria de fibra de vidro, molde F1 e esmaltação em gel de alta durabilidade, dedico minha carreira a transformar a saúde e a beleza das mãos das minhas clientes. No meu estúdio, você não encontra apenas um serviço estético, mas sim uma experiência completa de carinho, renovação e elegância.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#DFD7CD] text-xs font-semibold text-[#3F2519] transition-all hover:border-[#C5A059]/60 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Atendimento Individual & Pontual</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#DFD7CD] text-xs font-semibold text-[#3F2519] transition-all hover:border-[#C5A059]/60 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Técnicas Indolores & Seguras</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#DFD7CD] text-xs font-semibold text-[#3F2519] transition-all hover:border-[#C5A059]/60 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Materiais 100% Esterilizados</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#DFD7CD] text-xs font-semibold text-[#3F2519] transition-all hover:border-[#C5A059]/60 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Consultoria de Formato & Cor</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('gallery')}
                className="bg-[#482D1F] hover:bg-[#3D2418] text-[#FCFAF7] px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <Eye className="w-4 h-4 text-[#C5A059]" />
                <span>Conheça Meu Trabalho</span>
              </button>

              <button
                onClick={() => scrollToSection('booking')}
                className="bg-white hover:bg-[#F5EFEB] text-[#482D1F] border border-[#DFD7CD] hover:border-[#C5A059]/60 px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 shadow-xs hover:shadow-sm"
              >
                <Heart className="w-4 h-4 text-[#C5A059]" />
                <span>Agendar Horário</span>
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
