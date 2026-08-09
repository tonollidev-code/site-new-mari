import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { faqs, getWhatsAppUrl } = useApp();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleAccordion = (id: string) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-[#F8F5F2] border-b border-[#EADEDA] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#B8860B] bg-white px-4 py-1.5 rounded-full border border-[#D4AF37]/30">
            Tire suas Dúvidas
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1810] mt-4 mb-3">
            Perguntas Frequentes
          </h2>
          <p className="text-base text-[#7A6354] font-serif italic">
            Tudo o que você precisa saber sobre nossos procedimentos e atendimentos.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#EADEDA] hover:border-[#D4AF37]/50 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-5 text-left font-serif font-bold text-base sm:text-lg text-[#2C1810] flex items-center justify-between gap-4 hover:text-[#B8860B] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#5C4538] leading-relaxed border-t border-[#F8F5F2] pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Support Card */}
        <div className="mt-12 text-center bg-white p-6 rounded-3xl border border-[#D4AF37]/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif font-bold text-[#2C1810] text-base">
              Ainda ficou com alguma dúvida?
            </h4>
            <p className="text-xs text-[#5C4538]">
              Fale diretamente com a Mari pelo WhatsApp. Estamos à disposição!
            </p>
          </div>

          <a
            href={getWhatsAppUrl('Olá, Mari! Tenho uma dúvida sobre um procedimento.')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm shrink-0 transition-transform hover:scale-102"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Perguntar no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
