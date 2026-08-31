import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Calendar, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const HowItWorks: React.FC = () => {
  const { scrollToSection } = useApp();

  const steps = [
    {
      number: '01',
      title: 'Escolha seu serviço',
      description: 'Escolha o procedimento que deseja realizar: Alongamento em molde F1, Banho de Gel, Esmaltação ou Manutenção.',
      icon: Sparkles
    },
    {
      number: '02',
      title: 'Escolha seu horário',
      description: 'Selecione no calendário o melhor dia e horário disponível que melhor se encaixe na sua rotina.',
      icon: Clock
    },
    {
      number: '03',
      title: 'Confirme seu agendamento',
      description: 'Informe seus dados de contato e receba a confirmação instantânea direto no seu WhatsApp.',
      icon: CheckCircle
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#F8F5F2]/50 backdrop-blur-[2px] border-b border-[#EADEDA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#8C6E5D] bg-white px-3.5 py-1 rounded-full border border-[#DFD7CD] shadow-xs">
            Passo a Passo Simples
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1810] mt-4 mb-3 tracking-tight">
            Como funciona o agendamento
          </h2>
          <p className="text-base text-[#735747] font-serif italic font-normal">
            Em apenas 3 passos rápidos seu momento de beleza estará garantido.
          </p>
        </motion.div>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-3xl p-8 border border-[#DFD7CD] hover:border-[#C5A059]/50 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-serif font-bold text-[#C5A059]">
                      {step.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#F8F5F2] border border-[#DFD7CD] text-[#C5A059] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#2C1810] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#6E5648] leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EADEDA]/60 text-[11px] font-semibold tracking-wider text-[#8C6E5D] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>Etapa {idx + 1} de 3</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <button
            onClick={() => scrollToSection('booking')}
            className="bg-[#2C1810] hover:bg-[#3D2314] text-[#FCFAF7] px-9 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2.5 cursor-pointer border border-[#2C1810]"
          >
            <Calendar className="w-4 h-4 text-[#C5A059]" />
            <span>Agendar Agora</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

