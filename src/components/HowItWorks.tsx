import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Calendar, Clock, CheckCircle } from 'lucide-react';

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
    <section className="py-20 bg-[#F8F5F2] border-b border-[#EADEDA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#B8860B] bg-white px-4 py-1.5 rounded-full border border-[#D4AF37]/30">
            Passo a Passo Simples
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1810] mt-4 mb-3">
            Como funciona o agendamento
          </h2>
          <p className="text-base text-[#7A6354] font-serif italic">
            Em apenas 3 passos rápidos seu momento de beleza estará garantido.
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-8 border border-[#EADEDA] hover:border-[#D4AF37] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-serif font-extrabold text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#F8F5F2] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#2C1810] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#5C4538] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EADEDA]/60 text-[11px] font-bold uppercase tracking-wider text-[#B8860B] flex items-center gap-1">
                  <span>Etapa {idx + 1} de 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => scrollToSection('booking')}
            className="bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#D4AF37]/20 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>AGENDAR AGORA</span>
          </button>
        </div>

      </div>
    </section>
  );
};
