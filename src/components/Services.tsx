import React from 'react';
import { useApp } from '../context/AppContext';
import { ServiceItem } from '../types';
import { Clock, Calendar, Sparkles, ShieldCheck, Palette, RefreshCw, Gem, Scissors, Check } from 'lucide-react';

export const Services: React.FC = () => {
  const { services, setSelectedServiceForBooking, scrollToSection } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#E5C158]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#E5C158]" />;
      case 'Palette': return <Palette className="w-5 h-5 text-[#E5C158]" />;
      case 'RefreshCw': return <RefreshCw className="w-5 h-5 text-[#E5C158]" />;
      case 'Gem': return <Gem className="w-5 h-5 text-[#E5C158]" />;
      case 'Scissors': return <Scissors className="w-5 h-5 text-[#E5C158]" />;
      default: return <Sparkles className="w-5 h-5 text-[#E5C158]" />;
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceForBooking(service);
    scrollToSection('booking');
  };

  return (
    <section id="services" className="py-20 bg-[#FCFAF7] border-b border-[#EADEDA]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C5A059] bg-[#F8F5F2] px-4 py-1.5 rounded-full border border-[#E5C158]/40">
            Procedimentos Exclusivos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#523626] mt-4 mb-3">
            Todos os Serviços
          </h2>
          <p className="text-base text-[#8C6E5D] font-serif italic">
            Escolha o cuidado perfeito para suas unhas.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`group bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between relative shadow-xs hover:shadow-2xl hover:-translate-y-1 ${
                service.popular
                  ? 'border-[#E5C158] ring-1 ring-[#E5C158]/40'
                  : 'border-[#EADEDA] hover:border-[#E5C158]/50'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#E5C158] via-[#F5E5C9] to-[#C5A059] text-[#3D2314] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#3D2314]" />
                  <span>Mais Pedido</span>
                </div>
              )}

              <div>
                {/* Service Card Image or Icon Banner */}
                {service.image ? (
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 border border-[#EADEDA]/60">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs p-2 rounded-xl border border-[#E5C158]/40">
                      {getIcon(service.iconName)}
                    </div>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-[#F8F5F2] border border-[#E5C158]/40 flex items-center justify-center mb-5">
                    {getIcon(service.iconName)}
                  </div>
                )}

                {/* Service Info */}
                <h3 className="text-xl font-serif font-bold text-[#523626] mb-2 group-hover:text-[#C5A059] transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs text-[#7D5E4D] leading-relaxed mb-6 min-h-[40px]">
                  {service.description}
                </p>
              </div>

              <div>
                {/* Footer details: Duration & Price */}
                <div className="pt-4 border-t border-[#EADEDA]/60 flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#8C6E5D]">
                    <Clock className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>{service.duration}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-[#9E806D] block font-medium">Investimento</span>
                    <span className="text-lg font-serif font-bold text-[#C5A059]">
                      {service.price}
                    </span>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => handleSelectService(service)}
                  className="w-full bg-[#F8F5F2] hover:bg-[#523626] text-[#523626] hover:text-[#F5E5C9] border border-[#E5C158]/50 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-[#523626] group-hover:text-[#F5E5C9]"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Agendar Este Serviço</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Note About Prices */}
        <div className="mt-12 text-center text-xs text-[#888888] italic">
          * Preços sujeitos a avaliação personalizada de tamanho e arte escolhida. Para orçamentos de Nail Arts complexas, entre em contato via WhatsApp.
        </div>

      </div>
    </section>
  );
};
