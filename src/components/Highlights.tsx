import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, Gem } from 'lucide-react';
import { motion } from 'motion/react';

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
    <section className="py-14 bg-white/70 backdrop-blur-[3px] relative border-b border-[#EADEDA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group p-6 rounded-2xl bg-[#FCFAF7] border border-[#EADEDA]/80 hover:border-[#E5C158]/70 hover:bg-white transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-luxury-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#DFD7CD] text-[#C5A059] group-hover:bg-[#482D1F] group-hover:text-[#F5EFEB] group-hover:border-[#482D1F] flex items-center justify-center transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#8C6E5D] bg-white px-2.5 py-0.5 rounded-full border border-[#DFD7CD]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-[#3F2519] mb-2 group-hover:text-[#C5A059] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#73594A] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#EADEDA]/60 flex items-center text-[11px] font-semibold text-[#8C6E5D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mr-2 transition-transform duration-300 group-hover:scale-125"></span>
                  Garantia de Satisfação
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
