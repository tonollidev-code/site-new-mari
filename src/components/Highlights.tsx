import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, Gem } from 'lucide-react';

export const Highlights: React.FC = () => {
  const differentials = [
    {
      icon: Sparkles,
      title: 'Atendimento Personalizado',
      description: 'Atendimento exclusivo focado em entender seu estilo, rotina e preferências para cada unha.',
      tag: 'Exclusividade'
    },
    {
      icon: Gem,
      title: 'Acabamento Impecável',
      description: 'Acabamento limpo e preciso, alinhamento de simetria e simbiose natural entre a fibra e o gel.',
      tag: 'Perfeição'
    },
    {
      icon: HeartHandshake,
      title: 'Ambiente Acolhedor',
      description: 'Espaço climatizado, reservado, com cafézinho, aromas suaves e o máximo de conforto.',
      tag: 'Conforto & Paz'
    },
    {
      icon: ShieldCheck,
      title: 'Produtos de Qualidade',
      description: 'Insumos homologados, géis de alta durabilidade e total esterilização em autoclave.',
      tag: 'Biossegurança'
    }
  ];

  return (
    <section className="py-12 bg-white relative border-b border-[#EADEDA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-[#FCFAF7] border border-[#EADEDA] hover:border-[#D4AF37] hover:bg-white shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F8F5F2] border border-[#D4AF37]/30 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#B8860B] bg-[#F8F5F2] px-2.5 py-1 rounded-full border border-[#D4AF37]/20">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-2 group-hover:text-[#B8860B] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#666666] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EADEDA]/40 flex items-center text-[11px] font-semibold text-[#D4AF37]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mr-2"></span>
                  Garantia de Satisfação
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
