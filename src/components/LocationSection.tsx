import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Clock, Phone, Instagram, Navigation, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export const LocationSection: React.FC = () => {
  const { config, scrollToSection } = useApp();

  return (
    <section id="location" className="py-20 lg:py-24 bg-transparent border-b border-[#EADEDA]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#C5A059] bg-[#F8F5F2] px-3.5 py-1 rounded-full border border-[#E5C158]/35 shadow-xs">
            Venha nos Visitar
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3F2519] mt-4 mb-3 tracking-tight">
            Onde estamos
          </h2>
          <p className="text-base text-[#7A5E4F] font-serif italic font-normal">
            Nosso estúdio está localizado em uma região acolhedora e de fácil acesso.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Information Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 bg-white p-7 sm:p-8 rounded-3xl border border-[#E5C158]/35 shadow-luxury space-y-6"
          >
            
            <div className="flex items-start gap-4 pb-5 border-b border-[#EADEDA]/70">
              <div className="w-11 h-11 rounded-2xl bg-[#FCFAF7] border border-[#E5C158]/35 text-[#C5A059] flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#3F2519] text-base mb-1">Endereço do Estúdio</h4>
                <p className="text-xs text-[#5C4538] leading-relaxed font-normal">{config.address}</p>
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

            <div className="flex items-start gap-4 pb-5 border-b border-[#EADEDA]/70">
              <div className="w-11 h-11 rounded-2xl bg-[#FCFAF7] border border-[#E5C158]/35 text-[#C5A059] flex items-center justify-center shrink-0 shadow-xs">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#3F2519] text-base mb-1">Horário de Atendimento</h4>
                <p className="text-xs text-[#5C4538] leading-relaxed font-normal">{config.operatingHours}</p>
                <p className="text-[11px] text-[#C5A059] font-semibold mt-1">Atendimento estritamente agendado</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-5 border-b border-[#EADEDA]/70">
              <div className="w-11 h-11 rounded-2xl bg-[#FCFAF7] border border-[#E5C158]/35 text-[#C5A059] flex items-center justify-center shrink-0 shadow-xs">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#3F2519] text-base mb-1">WhatsApp Oficial</h4>
                <p className="text-xs text-[#5C4538] leading-relaxed font-normal">{config.whatsappDisplay}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#FCFAF7] border border-[#E5C158]/35 text-[#C5A059] flex items-center justify-center shrink-0 shadow-xs">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#3F2519] text-base mb-1">Instagram</h4>
                <p className="text-xs text-[#5C4538] leading-relaxed font-normal">{config.instagramHandle}</p>
              </div>
            </div>

            <button
              onClick={() => scrollToSection('booking')}
              className="w-full bg-gradient-to-r from-[#E5C158] via-[#F5E5C9] to-[#C5A059] hover:from-[#C5A059] hover:to-[#E5C158] text-[#4A2E1F] py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Minha Visita</span>
            </button>

          </motion.div>

          {/* Embedded Map Frame */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 h-[420px] rounded-3xl overflow-hidden border border-[#E5C158]/35 shadow-luxury relative bg-[#EADEDA]"
          >
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
          </motion.div>

        </div>

      </div>
    </section>
  );
};
