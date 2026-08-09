import React from 'react';
import { useApp } from '../context/AppContext';
import { Eye, CheckCircle2, Heart } from 'lucide-react';

export const About: React.FC = () => {
  const { scrollToSection } = useApp();

  return (
    <section id="about" className="py-20 bg-[#F8F5F2] relative overflow-hidden border-b border-[#EADEDA]">
      {/* Decorative Gold Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-[#E5C158]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Photo Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Backing Accent Card */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#E5C158]/20 via-[#F5E5C9]/20 to-transparent border border-[#E5C158]/30 transform -rotate-2 pointer-events-none" />

              <div className="relative bg-white p-3 rounded-3xl border border-[#E5C158]/40 shadow-xl overflow-hidden">
                <img
                  src="https://i.postimg.cc/sx0cCTDJ/Whats-App-Image-2026-08-08-at-16-40-36.jpg"
                  referrerPolicy="no-referrer"
                  alt="Mari Nail Designer - Especialista em unhas sofisticadas"
                  className="w-full h-[450px] object-cover rounded-2xl shadow-xs"
                />
              </div>

            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5C158]/40 text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-4">
              <span>Sobre A Profissional</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#523626] mb-6 leading-tight">
              Muito prazer, <br />
              <span className="text-gold-gradient font-serif italic">eu sou a Mari.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#6E4936] leading-relaxed mb-6 font-medium">
              “Mais do que cuidar das suas unhas, meu objetivo é proporcionar um momento de autocuidado, beleza e autoestima. Cada atendimento é feito com atenção aos detalhes para que você saia daqui se sentindo ainda mais confiante.”
            </p>

            <p className="text-sm text-[#7D5E4D] leading-relaxed mb-8">
              Com especializações em simetria de fibra de vidro, molde F1 e esmaltação em gel de alta durabilidade, dedico minha carreira a transformar a saúde e a beleza das mãos das minhas clientes. No meu estúdio, você não encontra apenas um serviço estético, mas sim uma experiência completa de carinho, renovação e elegância.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#EADEDA] text-xs font-semibold text-[#523626]">
                <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />
                <span>Atendimento Individual & Pontual</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#EADEDA] text-xs font-semibold text-[#523626]">
                <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />
                <span>Técnicas Indolores & Seguras</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#EADEDA] text-xs font-semibold text-[#523626]">
                <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />
                <span>Materiais 100% Esterilizados</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#EADEDA] text-xs font-semibold text-[#523626]">
                <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />
                <span>Consultoria de Formato & Cor</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('gallery')}
                className="bg-gradient-to-r from-[#E5C158] via-[#F5E5C9] to-[#C5A059] hover:from-[#C5A059] hover:to-[#E5C158] text-[#3D2314] px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg shadow-[#E5C158]/20 transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>Conheça Meu Trabalho</span>
              </button>

              <button
                onClick={() => scrollToSection('booking')}
                className="bg-white hover:bg-[#FCFAF7] text-[#523626] border border-[#E5C158]/50 px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-[#C5A059]" />
                <span>Agendar Horário</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
