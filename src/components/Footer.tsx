import React from 'react';
import { useApp } from '../context/AppContext';
import { Instagram, MapPin, Phone, Clock, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, scrollToSection, isAuthorizedAdmin, navigate } = useApp();

  const quickLinks = [
    { label: 'Início', id: 'hero' },
    { label: 'Sobre', id: 'about' },
    { label: 'Serviços', id: 'services' },
    { label: 'Galeria', id: 'gallery' },
    { label: 'Agendamento', id: 'booking' },
    { label: 'Contato', id: 'location' },
  ];

  return (
    <footer className="bg-[#523626] text-[#EADEDA] pt-16 pb-8 border-t border-[#FFC800]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#6E4936]">
          
          {/* Logo & Slogan Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://i.postimg.cc/y6wg2q7F/Whats-App-Image-2026-08-08-at-21-38-19.jpg"
                referrerPolicy="no-referrer"
                alt="Mari Nail Designer Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#FFC800] shadow-md"
              />
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold tracking-wider uppercase text-white">
                  Mari <span className="text-[#FFC800]">Nail Designer</span>
                </span>
                <span className="text-[10px] tracking-[0.3em] text-[#FFC800] uppercase font-sans font-medium">
                  Premium
                </span>
              </div>
            </div>

            <p className="text-serif italic text-[#FFC800] text-sm">
              “Beleza em cada detalhe.”
            </p>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Atendimento exclusivo e de altíssimo nível para mulheres que valorizam elegância, sofisticação e biossegurança na saúde das suas unhas.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-widest text-[#FFC800]">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs text-gray-200">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-[#FFC800] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-widest text-[#FFC800]">
              Contato & Localização
            </h4>
            <div className="space-y-2.5 text-xs text-gray-200">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFC800] shrink-0 mt-0.5" />
                <span>{config.address}</span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFC800] shrink-0" />
                <span>WhatsApp: {config.whatsappDisplay}</span>
              </p>

              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#FFC800] shrink-0" />
                <span>Instagram: {config.instagramHandle}</span>
              </p>

              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FFC800] shrink-0" />
                <span>{config.operatingHours}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Copyright Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>© 2026 Mari Nail Designer. Todos os direitos reservados.</p>
            {isAuthorizedAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D2314] hover:bg-[#2C1810] text-[#E5C158] text-[11px] font-bold uppercase tracking-wider border border-[#E5C158]/40 shadow-sm transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Painel Administrativo</span>
              </button>
            )}
          </div>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> para realçar sua beleza.
          </p>
        </div>

      </div>
    </footer>
  );
};
