import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, DollarSign, Settings, Tag, Users, BookOpen, Check, Trash2, Edit3, Plus, Sparkles, ShieldCheck } from 'lucide-react';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    bookings,
    updateBookingStatus,
    services,
    updateServicePrice,
    config,
    updateStudioConfig,
    blogPosts
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'prices' | 'config' | 'blog' | 'loyalty'>('bookings');

  // Config Form state
  const [waNumber, setWaNumber] = useState(config.whatsappNumber);
  const [waDisplay, setWaDisplay] = useState(config.whatsappDisplay);
  const [instaHandle, setInstaHandle] = useState(config.instagramHandle);
  const [address, setAddress] = useState(config.address);
  const [configSaved, setConfigSaved] = useState(false);

  // Price Edit State
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPriceText, setTempPriceText] = useState('');
  const [tempPriceNum, setTempPriceNum] = useState(0);

  if (!isAdminOpen) return null;

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudioConfig({
      whatsappNumber: waNumber,
      whatsappDisplay: waDisplay,
      instagramHandle: instaHandle,
      address
    });
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  const handleStartEditPrice = (id: string, currentPrice: string, currentNum: number) => {
    setEditingPriceId(id);
    setTempPriceText(currentPrice);
    setTempPriceNum(currentNum);
  };

  const handleSavePrice = (id: string) => {
    updateServicePrice(id, tempPriceText, tempPriceNum);
    setEditingPriceId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A0C06]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full h-[85vh] border border-[#D4AF37]/50 shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-[#2C1810] text-white p-6 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#2C1810] flex items-center justify-center font-bold font-serif text-xl">
              M
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#E5C158]">
                Painel do Estúdio — Mari Nail Designer
              </h3>
              <p className="text-xs text-gray-300">
                Gestão de agendamentos, preços e configurações do site
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-[#3D2314] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#F8F5F2] px-6 border-b border-[#EADEDA] flex items-center gap-2 overflow-x-auto text-xs font-bold uppercase tracking-wider text-[#5C4538]">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'border-[#D4AF37] text-[#2C1810] bg-white'
                : 'border-transparent hover:text-[#2C1810]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>Agendamentos ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('prices')}
            className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'prices'
                ? 'border-[#D4AF37] text-[#2C1810] bg-white'
                : 'border-transparent hover:text-[#2C1810]'
            }`}
          >
            <DollarSign className="w-4 h-4 text-[#D4AF37]" />
            <span>Preços e Serviços</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'config'
                ? 'border-[#D4AF37] text-[#2C1810] bg-white'
                : 'border-transparent hover:text-[#2C1810]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#D4AF37]" />
            <span>Configurações</span>
          </button>

          <button
            onClick={() => setActiveTab('loyalty')}
            className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'loyalty'
                ? 'border-[#D4AF37] text-[#2C1810] bg-white'
                : 'border-transparent hover:text-[#2C1810]'
            }`}
          >
            <Users className="w-4 h-4 text-[#D4AF37]" />
            <span>Fidelidade & Clientes</span>
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'blog'
                ? 'border-[#D4AF37] text-[#2C1810] bg-white'
                : 'border-transparent hover:text-[#2C1810]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>Blog & Cuidados</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#FCFAF7]">
          
          {/* TAB 1: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-lg text-[#2C1810]">
                  Solicitações de Agendamento
                </h4>
                <span className="text-xs text-gray-500">
                  Total de Agendamentos: {bookings.length}
                </span>
              </div>

              {bookings.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-[#EADEDA] text-center text-gray-400">
                  <Calendar className="w-12 h-12 text-[#D4AF37] mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-semibold">Nenhum agendamento realizado até o momento.</p>
                  <p className="text-xs">Os novos agendamentos das clientes pelo site aparecerão aqui instantaneamente.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white p-5 rounded-2xl border border-[#EADEDA] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-serif font-bold text-base text-[#2C1810]">
                            {booking.clientName}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            booking.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : booking.status === 'cancelled'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {booking.status === 'confirmed' ? 'Confirmado' : booking.status === 'cancelled' ? 'Cancelado' : 'Pendente'}
                          </span>
                          <span className="text-xs text-gray-400">#{booking.id}</span>
                        </div>

                        <p className="text-xs text-[#5C4538] font-medium">
                          <strong>Serviço:</strong> {booking.serviceName} ({booking.servicePrice})
                        </p>
                        <p className="text-xs text-[#5C4538]">
                          <strong>Data/Horário:</strong> {booking.date} às {booking.timeSlot} | <strong>WhatsApp:</strong> {booking.clientPhone}
                        </p>
                        {booking.notes && (
                          <p className="text-xs text-gray-500 italic mt-1">
                            "Obs: {booking.notes}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRICES & SERVICES */}
          {activeTab === 'prices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#2C1810]">
                    Tabela de Serviços e Preços
                  </h4>
                  <p className="text-xs text-gray-500">
                    Altere os preços exibidos nos cards do site em tempo real.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#EADEDA] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F5F2] border-b border-[#EADEDA] text-[#2C1810] font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Serviço</th>
                      <th className="p-4">Duração</th>
                      <th className="p-4">Preço Exibido</th>
                      <th className="p-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EADEDA]">
                    {services.map((service) => (
                      <tr key={service.id} className="hover:bg-[#FCFAF7]">
                        <td className="p-4 font-serif font-bold text-[#2C1810] text-sm">
                          {service.name}
                        </td>
                        <td className="p-4 text-gray-600">{service.duration}</td>
                        <td className="p-4 font-bold text-[#B8860B]">
                          {editingPriceId === service.id ? (
                            <input
                              type="text"
                              value={tempPriceText}
                              onChange={(e) => setTempPriceText(e.target.value)}
                              className="px-2 py-1 border border-[#D4AF37] rounded text-xs font-bold text-[#2C1810]"
                            />
                          ) : (
                            service.price
                          )}
                        </td>
                        <td className="p-4 text-right">
                          {editingPriceId === service.id ? (
                            <button
                              onClick={() => handleSavePrice(service.id)}
                              className="px-3 py-1 bg-emerald-600 text-white rounded font-bold text-xs"
                            >
                              Salvar
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStartEditPrice(service.id, service.price, service.numericPrice)}
                              className="px-3 py-1 bg-[#2C1810] text-[#E5C158] rounded font-bold text-xs hover:bg-[#D4AF37] hover:text-[#2C1810] transition-colors"
                            >
                              Editar Preço
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CONFIG */}
          {activeTab === 'config' && (
            <form onSubmit={handleSaveConfig} className="bg-white p-6 rounded-2xl border border-[#EADEDA] space-y-4 max-w-2xl">
              <h4 className="font-serif font-bold text-lg text-[#2C1810] mb-4">
                Configurações Gerais do Estúdio
              </h4>

              {configSaved && (
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Configurações atualizadas com sucesso no site!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-[#5C4538] mb-1">
                  Número do WhatsApp (Apenas dígitos com DDD)
                </label>
                <input
                  type="text"
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-sm"
                  placeholder="5511974030615"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#5C4538] mb-1">
                  Exibição do WhatsApp
                </label>
                <input
                  type="text"
                  value={waDisplay}
                  onChange={(e) => setWaDisplay(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-sm"
                  placeholder="(11) 97403-0615"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#5C4538] mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={instaHandle}
                  onChange={(e) => setInstaHandle(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-sm"
                  placeholder="@leonesnail"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#5C4538] mb-1">
                  Endereço do Estúdio
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-sm"
                />
              </div>

              <button
                type="submit"
                className="bg-[#2C1810] text-[#E5C158] hover:bg-[#D4AF37] hover:text-[#2C1810] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Salvar Alterações
              </button>
            </form>
          )}

          {/* TAB 4: LOYALTY */}
          {activeTab === 'loyalty' && (
            <div className="bg-white p-6 rounded-2xl border border-[#EADEDA]">
              <h4 className="font-serif font-bold text-lg text-[#2C1810] mb-2">Programa de Fidelidade VIP</h4>
              <p className="text-xs text-gray-500 mb-6">
                A cada 5 atendimentos realizados no estúdio, a cliente ganha 1 Banho de Gel ou Spa de Cutículas gratuito!
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#F8F5F2] border border-[#D4AF37]/30 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-[#2C1810]">Camila Alencar</p>
                    <p className="text-xs text-gray-500">4 Atendimentos concluídos</p>
                  </div>
                  <span className="text-xs font-bold text-[#B8860B] bg-white px-3 py-1 rounded-full border border-[#D4AF37]">
                    Falta 1 para recompensa!
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F5F2] border border-[#D4AF37]/30 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-[#2C1810]">Beatriz Vasconcelos</p>
                    <p className="text-xs text-gray-500">5 Atendimentos concluídos</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    🎁 Recompensa Liberada!
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BLOG */}
          {activeTab === 'blog' && (
            <div className="bg-white p-6 rounded-2xl border border-[#EADEDA]">
              <h4 className="font-serif font-bold text-lg text-[#2C1810] mb-4">Dicas & Artigos de Cuidados</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blogPosts.map((post) => (
                  <div key={post.id} className="p-4 rounded-xl border border-[#EADEDA] space-y-2">
                    <span className="text-[10px] font-bold text-[#B8860B] uppercase">{post.date}</span>
                    <h5 className="font-serif font-bold text-sm text-[#2C1810]">{post.title}</h5>
                    <p className="text-xs text-gray-600">{post.snippet}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
