import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const { getWhatsAppUrl } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      
      {/* Tooltip on hover */}
      <div className="absolute bottom-full right-0 mb-3 hidden group-hover:block whitespace-nowrap bg-[#1A1A1A] text-[#E5C158] text-xs font-bold py-2 px-4 rounded-2xl shadow-xl border border-[#E5C158]/40 animate-in fade-in slide-in-from-bottom-2 duration-200">
        Agendar pelo WhatsApp 💅✨
      </div>

      {/* Floating Button */}
      <a
        href={getWhatsAppUrl('Olá, Mari! Vim pelo seu site e gostaria de agendar um horário. 💅✨')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp com Mari Nail Designer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ring-4 ring-white/30 relative"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping pointer-events-none" />
        
        <MessageCircle className="w-7 h-7 fill-current relative z-10" />
      </a>
    </div>
  );
};
