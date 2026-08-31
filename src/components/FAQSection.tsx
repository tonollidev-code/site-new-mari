import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FAQSection: React.FC = () => {
  const { faqs, getWhatsAppUrl } = useApp();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleAccordion = (id: string) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-24 bg-[#F8F5F2]/80 backdrop-blur-[2px] border-b border-[#EADEDA] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#8C6E5D] bg-white px-3.5 py-1 rounded-full border border-[#DFD7CD] shadow-xs">
            Tire suas Dúvidas
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1810] mt-4 mb-3 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-base text-[#735747] font-serif italic font-normal">
            Tudo o que você precisa saber sobre nossos procedimentos e atendimentos.
          </p>
        </motion.div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl border border-[#DFD7CD] hover:border-[#C5A059]/50 shadow-luxury transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-5 text-left font-serif font-bold text-base sm:text-lg text-[#2C1810] flex items-center justify-between gap-4 hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C5A059] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm text-[#6E5648] leading-relaxed border-t border-[#F8F5F2] pt-4 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Extra Support Card */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 bg-white p-6 sm:p-7 rounded-3xl border border-[#DFD7CD] shadow-luxury flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="text-left">
            <h4 className="font-serif font-bold text-[#2C1810] text-base">
              Ainda ficou com alguma dúvida?
            </h4>
            <p className="text-xs text-[#6E5648] mt-1 font-normal">
              Fale diretamente com a Mari pelo WhatsApp. Estamos à disposição!
            </p>
          </div>

          <a
            href={getWhatsAppUrl('Olá, Mari! Tenho uma dúvida sobre um procedimento.')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs shrink-0 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Perguntar no WhatsApp</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};
