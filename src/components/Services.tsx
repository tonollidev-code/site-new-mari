import React from 'react';
import { useApp } from '../context/AppContext';
import { ServiceItem } from '../types';
import { Clock, Calendar, Sparkles, ShieldCheck, Palette, RefreshCw, Gem, Scissors } from 'lucide-react';
import { motion } from 'motion/react';
import { ProgressiveImage } from './ProgressiveImage';

export const Services: React.FC = () => {
  const { services, setSelectedServiceForBooking, scrollToSection } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-[#E5C158]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-[#E5C158]" />;
      case 'Palette': return <Palette className="w-4 h-4 text-[#E5C158]" />;
      case 'RefreshCw': return <RefreshCw className="w-4 h-4 text-[#E5C158]" />;
      case 'Gem': return <Gem className="w-4 h-4 text-[#E5C158]" />;
      case 'Scissors': return <Scissors className="w-4 h-4 text-[#E5C158]" />;
      default: return <Sparkles className="w-4 h-4 text-[#E5C158]" />;
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceForBooking(service);
    scrollToSection('booking');
  };

  return (
    <section id="services" className="py-20 lg:py-24 bg-transparent border-b border-[#EADEDA]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#8C6E5D] bg-white px-3.5 py-1 rounded-full border border-[#DFD7CD] shadow-xs">
            Procedimentos Exclusivos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3F2519] mt-4 mb-3 tracking-tight">
            Menu de Serviços
          </h2>
          <p className="text-base text-[#7A5E4F] font-serif italic font-normal">
            Escolha o cuidado perfeito para realçar a beleza e a saúde das suas unhas.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`group bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between relative shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1 ${
                service.popular
                  ? 'border-[#C5A059]/60 ring-1 ring-[#C5A059]/20'
                  : 'border-[#EADEDA]/80 hover:border-[#C5A059]/40'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 right-6 bg-[#482D1F] text-[#F5EFEB] text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-[#C5A059]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>Mais Pedido</span>
                </div>
              )}

              <div>
                {/* Service Card Image or Icon Banner */}
                {service.image ? (
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 border border-[#EADEDA]/60 bg-[#F8F5F2]">
                    <ProgressiveImage
                      src={service.image}
                      alt={service.name}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs p-2 rounded-xl border border-[#DFD7CD] shadow-xs z-20">
                      {getIcon(service.iconName)}
                    </div>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-[#F8F5F2] border border-[#DFD7CD] flex items-center justify-center mb-5">
                    {getIcon(service.iconName)}
                  </div>
                )}

                {/* Service Info */}
                <h3 className="text-xl font-serif font-bold text-[#3F2519] mb-2 group-hover:text-[#C5A059] transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs text-[#73594A] leading-relaxed mb-6 min-h-[40px] font-normal">
                  {service.description}
                </p>
              </div>

              <div>
                {/* Footer details: Duration & Price */}
                <div className="pt-4 border-t border-[#EADEDA]/60 flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#8C6E5D]">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{service.duration}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-[#9E806D] block font-medium">Investimento</span>
                    <span className="text-lg font-serif font-bold text-[#C5A059]">
                      {service.price}
                    </span>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => handleSelectService(service)}
                  className="w-full bg-[#F8F5F2] group-hover:bg-[#482D1F] text-[#482D1F] group-hover:text-[#FCFAF7] border border-[#DFD7CD] group-hover:border-[#482D1F] py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-98 shadow-xs cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#C5A059] transition-colors" />
                  <span>Agendar Este Serviço</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note About Prices */}
        <div className="mt-12 text-center text-xs text-[#888888] italic font-normal">
          * Preços sujeitos a avaliação personalizada de tamanho e arte escolhida. Para orçamentos de Nail Arts complexas, entre em contato via WhatsApp.
        </div>

      </div>
    </section>
  );
};
