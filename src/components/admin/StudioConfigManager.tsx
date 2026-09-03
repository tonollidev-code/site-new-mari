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
    <div className="bg-white/95 p-4 sm:p-6 rounded-2xl border border-[#DFD7CD] shadow-2xs max-w-2xl mx-auto space-y-4 sm:space-y-5">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-[#FAF7F3] border border-[#DFD7CD] flex items-center justify-center text-[#C5A059]">
          <Settings className="w-4 h-4" />
        </div>
        <div>
          <h2 className="font-serif font-bold text-base text-[#3F2519]">Configurações do Estúdio</h2>
          <p className="text-xs text-[#8C6E5D]">
            Altere informações de contato, WhatsApp, endereço e horários exibidos no site.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Informações do estúdio salvas com sucesso!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#523626] mb-1">
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Número do WhatsApp (Com DDI) *</span>
            </label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="5511995866952"
              className="w-full p-2.5 rounded-xl border border-[#DFD7CD] text-xs text-[#3D2314] bg-[#FAF7F3] focus:bg-white focus:border-[#3D2314] outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#523626] mb-1">
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Exibição do WhatsApp *</span>
            </label>
            <input
              type="text"
              required
              value={whatsappDisplay}
              onChange={(e) => setWhatsappDisplay(e.target.value)}
              placeholder="(11) 99586-6952"
              className="w-full p-2.5 rounded-xl border border-[#DFD7CD] text-xs text-[#3D2314] bg-[#FAF7F3] focus:bg-white focus:border-[#3D2314] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#523626] mb-1">
              <Instagram className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Instagram @ *</span>
            </label>
            <input
              type="text"
              required
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value)}
              placeholder="@leonesnail"
              className="w-full p-2.5 rounded-xl border border-[#DFD7CD] text-xs text-[#3D2314] bg-[#FAF7F3] focus:bg-white focus:border-[#3D2314] outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#523626] mb-1">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Texto dos Horários de Funcionamento</span>
            </label>
            <input
              type="text"
              required
              value={operatingHours}
              onChange={(e) => setOperatingHours(e.target.value)}
              placeholder="Terça a Sábado: 09h às 19h"
              className="w-full p-2.5 rounded-xl border border-[#DFD7CD] text-xs text-[#3D2314] bg-[#FAF7F3] focus:bg-white focus:border-[#3D2314] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#523626] mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Endereço Completo do Estúdio *</span>
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Rua São Vicente das Minas, 47"
            className="w-full p-2.5 rounded-xl border border-[#DFD7CD] text-xs text-[#3D2314] bg-[#FAF7F3] focus:bg-white focus:border-[#3D2314] outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#523626] mb-1">
            <Map className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>URL de Embed do Google Maps</span>
          </label>
          <input
            type="url"
            value={googleMapsEmbedUrl}
            onChange={(e) => setGoogleMapsEmbedUrl(e.target.value)}
            placeholder="https://maps.google.com/..."
            className="w-full p-2.5 rounded-xl border border-[#DFD7CD] text-xs text-[#3D2314] bg-[#FAF7F3] focus:bg-white focus:border-[#3D2314] outline-none"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#3F2519] hover:bg-[#2C1810] text-[#F5EFEB] px-5 py-2.5 rounded-xl font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#E5C158]" />
            <span>Salvar Informações</span>
          </button>
        </div>
      </form>
    </div>
  );
};
