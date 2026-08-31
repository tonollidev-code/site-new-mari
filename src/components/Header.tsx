import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, Calendar, MapPin, Phone, Instagram, Sparkles, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { config, scrollToSection, isAuthorizedAdmin, navigate } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Início', id: 'hero' },
    { label: 'Sobre', id: 'about' },
    { label: 'Serviços', id: 'services' },
    { label: 'Galeria', id: 'gallery' },
    { label: 'Contato', id: 'location' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      scrollToSection(id);
    }, 60);
  };

  return (
    <>
      {/* Top Banner Info Bar - Visible on Desktop only */}
      <div id="top-bar" className="hidden md:block relative z-40 bg-[#523626] text-[#EADEDA] text-xs py-2 px-4 border-b border-[#E5C158]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-200">
              <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>{config.addressShort}</span>
            </span>
            <span className="text-gray-400">•</span>
            <span className="flex items-center gap-1.5 text-gray-200">
              <Phone className="w-3.5 h-3.5 text-[#E5C158]" />
              {config.whatsappDisplay}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-300">Atendimento com hora marcada</span>
            <a
              href={`https://instagram.com/leonesnail`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#E5C158] hover:text-[#F5E5C9] transition-colors font-medium"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{config.instagramHandle}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header - Always Sticky on Top */}
      <header
        id="main-header"
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5C158]/30 py-3'
            : 'bg-white border-b border-[#EADEDA]/70 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer"
          >
            <img
              src="https://i.postimg.cc/y6wg2q7F/Whats-App-Image-2026-08-08-at-21-38-19.jpg"
              referrerPolicy="no-referrer"
              alt="Mariana Leone Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-[#E5C158]/60 shadow-xs group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="text-sm sm:text-lg font-serif font-bold tracking-wider uppercase text-[#523626] leading-tight">
                Mariana <span className="text-[#C5A059]">Leone</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-[#A38675] uppercase font-sans font-medium">
                Nail Designer
              </span>
            </div>
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold uppercase tracking-wider text-[#6B5345]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="hover:text-[#C5A059] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E5C158] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="header-booking-btn"
              onClick={() => handleNavClick('booking')}
              className="bg-gradient-to-r from-[#E5C158] via-[#F5E5C9] to-[#C5A059] hover:from-[#C5A059] hover:to-[#E5C158] text-[#3D2314] px-5 lg:px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg shadow-[#E5C158]/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Horário</span>
            </button>
          </div>

          {/* Mobile Navigation Toggle (Only on Mobile) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('booking')}
              className="bg-gradient-to-r from-[#E5C158] to-[#C5A059] text-[#3D2314] px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-transform"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FAF6F0] hover:bg-[#F0EAE1] active:bg-[#EADEDA] border border-[#E5C158]/50 text-[#3D2314] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              aria-label={mobileMenuOpen ? "Fechar Menu" : "Abrir Menu Principal"}
              title="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#3D2314]" />
              ) : (
                <Menu className="w-6 h-6 text-[#3D2314]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer (Rendered outside header to avoid backdrop-filter stacking trapping) */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-[100] bg-[#22120B]/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-[#E5C158]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#EADEDA]">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://i.postimg.cc/y6wg2q7F/Whats-App-Image-2026-08-08-at-21-38-19.jpg"
                    referrerPolicy="no-referrer"
                    alt="Mariana Leone Logo"
                    className="w-10 h-10 rounded-full object-cover border border-[#E5C158] shadow-2xs"
                  />
                  <div className="flex flex-col">
                    <span className="font-serif font-bold text-base text-[#523626] leading-tight">
                      Mariana <span className="text-[#C5A059]">Leone</span>
                    </span>
                    <span className="text-[9px] tracking-[0.25em] text-[#A38675] uppercase font-sans font-medium">
                      Nail Designer
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-[#FAF6F0] hover:bg-gray-100 flex items-center justify-center text-[#3D2314] cursor-pointer transition-colors border border-[#EADEDA]"
                  aria-label="Fechar Menu"
                >
                  <X className="w-5 h-5 text-[#3D2314]" />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="text-left py-3.5 px-4 rounded-2xl hover:bg-[#F8F5F2] active:bg-[#EADEDA] text-xs font-bold uppercase tracking-wider text-[#523626] flex items-center justify-between hover:text-[#C5A059] transition-all cursor-pointer border border-transparent hover:border-[#E5C158]/20"
                  >
                    <span>{item.label}</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#EADEDA] flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('booking')}
                className="w-full bg-gradient-to-r from-[#E5C158] via-[#FFD700] to-[#C5A059] hover:from-[#C5A059] hover:to-[#E5C158] text-[#3D2314] py-3.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-transform"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Meu Horário</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
