import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, Calendar, MapPin, Phone, Instagram, Sparkles, Settings } from 'lucide-react';

export const Header: React.FC = () => {
  const { config, scrollToSection, setIsAdminOpen, isAuthorizedAdmin } = useApp();
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Início', id: 'hero' },
    { label: 'Sobre', id: 'about' },
    { label: 'Serviços', id: 'services' },
    { label: 'Galeria', id: 'gallery' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contato', id: 'location' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      {/* Top Banner Info Bar */}
      <div id="top-bar" className="bg-[#523626] text-[#EADEDA] text-[11px] sm:text-xs py-2 px-4 border-b border-[#E5C158]/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <span className="flex items-center gap-1.5 text-gray-200">
              <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
              <span className="truncate max-w-[280px] sm:max-w-none">{config.addressShort}</span>
            </span>
            <span className="hidden md:inline text-gray-400">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-gray-200">
              <Phone className="w-3.5 h-3.5 text-[#E5C158]" />
              {config.whatsappDisplay}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden lg:inline text-gray-300">Atendimento com hora marcada</span>
            <a
              href={`https://instagram.com/leonesnail`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#E5C158] hover:text-[#F5E5C9] transition-colors font-medium"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{config.instagramHandle}</span>
            </a>
            {isAuthorizedAdmin && (
              <button
                onClick={() => setIsAdminOpen(true)}
                className="ml-2 px-2 py-0.5 rounded bg-[#6E4936] hover:bg-[#825741] text-[#E5C158] text-[10px] uppercase tracking-wider border border-[#E5C158]/30 flex items-center gap-1 transition-colors"
                title="Painel Administrativo"
              >
                <Settings className="w-3 h-3" />
                <span>Painel</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#E5C158]/20 py-3'
            : 'bg-white border-b border-[#EADEDA]/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 group text-left"
          >
            <img
              src="https://i.postimg.cc/y6wg2q7F/Whats-App-Image-2026-08-08-at-21-38-19.jpg"
              referrerPolicy="no-referrer"
              alt="Mari Nail Designer Logo"
              className="w-11 h-11 rounded-full object-cover border-2 border-[#E5C158] shadow-xs group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-serif font-bold tracking-wider uppercase text-[#523626] leading-tight">
                Mari <span className="text-[#C5A059]">Nail Designer</span>
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#A38675] uppercase font-sans font-medium">
                Premium
              </span>
            </div>
          </button>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#6B5345]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="hover:text-[#C5A059] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E5C158] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="header-booking-btn"
              onClick={() => handleNavClick('booking')}
              className="bg-gradient-to-r from-[#E5C158] via-[#F5E5C9] to-[#C5A059] hover:from-[#C5A059] hover:to-[#E5C158] text-[#3D2314] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg shadow-[#E5C158]/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Horário</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('booking')}
              className="bg-[#E5C158] text-[#3D2314] px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#523626] hover:bg-[#F8F5F2] transition-colors"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#E5C158]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Over Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-[#22120B]/50 backdrop-blur-xs flex justify-end">
            <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#EADEDA]">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://i.postimg.cc/y6wg2q7F/Whats-App-Image-2026-08-08-at-21-38-19.jpg"
                      referrerPolicy="no-referrer"
                      alt="Mari Nail Designer Logo"
                      className="w-10 h-10 rounded-full object-cover border border-[#E5C158]"
                    />
                    <div className="flex flex-col">
                      <span className="font-serif font-bold text-base text-[#523626] leading-tight">
                        Mari <span className="text-[#C5A059]">Nail Designer</span>
                      </span>
                      <span className="text-[9px] tracking-[0.25em] text-[#A38675] uppercase font-sans font-medium">
                        Premium
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="py-6 flex flex-col gap-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="text-left py-2.5 px-3 rounded-xl hover:bg-[#F8F5F2] text-sm font-semibold uppercase tracking-wider text-[#523626] flex items-center justify-between hover:text-[#C5A059] transition-all"
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
                  className="w-full bg-[#E5C158] hover:bg-[#C5A059] text-[#3D2314] py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Meu Horário</span>
                </button>

                {isAuthorizedAdmin && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsAdminOpen(true);
                    }}
                    className="w-full bg-[#F8F5F2] hover:bg-[#EADEDA] text-[#523626] py-2.5 rounded-full font-bold text-xs uppercase tracking-wider border border-[#E5C158]/30 flex items-center justify-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Painel Administrativo</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
