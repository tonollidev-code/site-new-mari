import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Phone, MapPin, Instagram, Clock, Map, Check, Save } from 'lucide-react';

export const StudioConfigManager: React.FC = () => {
  const { config, updateStudioConfig } = useApp();

  const [whatsappNumber, setWhatsappNumber] = useState(config.whatsappNumber);
  const [whatsappDisplay, setWhatsappDisplay] = useState(config.whatsappDisplay);
  const [instagramHandle, setInstagramHandle] = useState(config.instagramHandle);
  const [address, setAddress] = useState(config.address);
  const [operatingHours, setOperatingHours] = useState(config.operatingHours);
  const [googleMapsEmbedUrl, setGoogleMapsEmbedUrl] = useState(config.googleMapsEmbedUrl);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStudioConfig({
      whatsappNumber,
      whatsappDisplay,
      instagramHandle,
      address,
      addressShort: address,
      operatingHours,
      googleMapsEmbedUrl,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#E5C158]/40 shadow-[0_10px_25px_rgba(44,24,16,0.04)] max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#F8F5F2] border border-[#E5C158]/40 flex items-center justify-center text-[#C5A059] shadow-xs">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-lg text-[#523626]">Configurações do Estúdio</h3>
          <p className="text-xs text-[#8C6E5D]">
            Altere as informações de contato, WhatsApp, endereço e horário de funcionamento exibidos no site.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Informações do estúdio salvas com sucesso!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#523626] mb-1">
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Número do WhatsApp (Com DDI) *</span>
            </label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="5511995866952"
              className="w-full p-3 rounded-2xl border border-[#EADEDA] text-sm text-[#523626] bg-white/95 focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#523626] mb-1">
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Exibição do WhatsApp *</span>
            </label>
            <input
              type="text"
              required
              value={whatsappDisplay}
              onChange={(e) => setWhatsappDisplay(e.target.value)}
              placeholder="(11) 99586-6952"
              className="w-full p-3 rounded-2xl border border-[#EADEDA] text-sm text-[#523626] bg-white/95 focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#523626] mb-1">
              <Instagram className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Instagram @ *</span>
            </label>
            <input
              type="text"
              required
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value)}
              placeholder="@leonesnail"
              className="w-full p-3 rounded-2xl border border-[#EADEDA] text-sm text-[#523626] bg-white/95 focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#523626] mb-1">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Texto dos Horários de Funcionamento</span>
            </label>
            <input
              type="text"
              required
              value={operatingHours}
              onChange={(e) => setOperatingHours(e.target.value)}
              placeholder="Terça a Sábado: 09h às 19h"
              className="w-full p-3 rounded-2xl border border-[#EADEDA] text-sm text-[#523626] bg-white/95 focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#523626] mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Endereço Completo do Estúdio *</span>
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Rua São Vicente das Minas, 47"
            className="w-full p-3 rounded-2xl border border-[#EADEDA] text-sm text-[#523626] bg-white/95 focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#523626] mb-1">
            <Map className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>URL de Embed do Google Maps</span>
          </label>
          <input
            type="url"
            value={googleMapsEmbedUrl}
            onChange={(e) => setGoogleMapsEmbedUrl(e.target.value)}
            placeholder="https://maps.google.com/..."
            className="w-full p-3 rounded-2xl border border-[#EADEDA] text-xs text-[#523626] bg-white/95 focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#E5C158] via-[#FFD700] to-[#C5A059] hover:from-[#C5A059] hover:to-[#E5C158] text-[#3D2314] px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs shadow-md shadow-[#E5C158]/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#3D2314]" />
            <span>Salvar Informações</span>
          </button>
        </div>
      </form>
    </div>
  );
};
