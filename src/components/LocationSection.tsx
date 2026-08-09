import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Clock, Phone, Instagram, Navigation, Calendar } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { config, scrollToSection } = useApp();

  return (
    <section id="location" className="py-20 bg-[#FCFAF7] border-b border-[#EADEDA]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C5A059] bg-[#F8F5F2] px-4 py-1.5 rounded-full border border-[#E5C158]/30">
            Venha nos Visitar
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1810] mt-4 mb-3">
            Onde estamos
          </h2>
          <p className="text-base text-[#7A6354] font-serif italic">
            Nosso estúdio está localizado em uma região acolhedora e de fácil acesso.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Information Column */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-[#E5C158]/30 shadow-xl space-y-6">
            
            <div className="flex items-start gap-4 pb-6 border-b border-[#EADEDA]">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F5F2] border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#2C1810] text-lg mb-1">Endereço do Estúdio</h4>
                <p className="text-xs text-[#5C4538] leading-relaxed">{config.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(config.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C5A059] hover:underline mt-2"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Abrir Rotas no GPS</span>
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-6 border-b border-[#EADEDA]">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F5F2] border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#2C1810] text-lg mb-1">Horário de Atendimento</h4>
                <p className="text-xs text-[#5C4538] leading-relaxed">{config.operatingHours}</p>
                <p className="text-[11px] text-[#C5A059] font-semibold mt-1">Atendimento estritamente agendado</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-6 border-b border-[#EADEDA]">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F5F2] border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#2C1810] text-lg mb-1">WhatsApp Oficial</h4>
                <p className="text-xs text-[#5C4538] leading-relaxed">{config.whatsappDisplay}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F5F2] border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center shrink-0">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#2C1810] text-lg mb-1">Instagram</h4>
                <p className="text-xs text-[#5C4538] leading-relaxed">{config.instagramHandle}</p>
              </div>
            </div>

            <button
              onClick={() => scrollToSection('booking')}
              className="w-full bg-gradient-to-r from-[#E5C158] via-[#F5E5C9] to-[#C5A059] hover:from-[#C5A059] hover:to-[#E5C158] text-[#3D2314] py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 pt-4"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Minha Visita</span>
            </button>

          </div>

          {/* Embedded Map Frame */}
          <div className="lg:col-span-7 h-[420px] rounded-3xl overflow-hidden border-2 border-[#E5C158]/30 shadow-xl relative bg-[#EADEDA]">
            <iframe
              src={config.googleMapsEmbedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(config.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Estúdio"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
