import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, DollarSign, Settings, Check, ShieldCheck, Lock, LogOut, AlertCircle } from 'lucide-react';

const ALLOWED_ADMIN_EMAIL = 'tonollibrenno@gmail.com';

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
    adminEmail,
    isAuthorizedAdmin,
    loginAdmin,
    logoutAdmin
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'prices' | 'config'>('bookings');

  // Authentication State
  const [googleEmailInput, setGoogleEmailInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

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

  const handleGoogleSignIn = (emailToTest: string) => {
    setAuthError('');
    setIsAuthenticating(true);

    setTimeout(() => {
      const success = loginAdmin(emailToTest);
      if (success) {
        setAuthError('');
      } else {
        setAuthError(`Acesso negado para "${emailToTest}". Apenas a conta de e-mail autorizada (${ALLOWED_ADMIN_EMAIL}) tem acesso ao painel.`);
      }
      setIsAuthenticating(false);
    }, 600);
  };

  const handleLogout = () => {
    logoutAdmin();
    setGoogleEmailInput('');
    setAuthError('');
  };

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

  // If user is NOT authenticated with the allowed email, show the Google Login Screen
  const isAuthorized = isAuthorizedAdmin;

  return (
    <div className="fixed inset-0 z-50 bg-[#1A0C06]/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full h-[85vh] border border-[#D4AF37]/50 shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-[#2C1810] text-white p-6 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#2C1810] flex items-center justify-center font-bold font-serif text-xl">
              M
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#E5C158]">
                Painel do Estúdio — Mariana Leone
              </h3>
              <p className="text-xs text-gray-300">
                {isAuthorized ? `Autenticado como: ${ALLOWED_ADMIN_EMAIL}` : 'Acesso Restrito — Autenticação Google'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthorized && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-rose-900/50 hover:bg-rose-800 text-rose-200 text-xs font-bold flex items-center gap-1.5 border border-rose-500/30 transition-colors"
                title="Sair do painel"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-[#3D2314] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {!isAuthorized ? (
          /* Google Authentication Screen */
          <div className="flex-1 bg-[#FCFAF7] p-8 flex flex-col items-center justify-center text-center overflow-y-auto">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#EADEDA] shadow-lg space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#F8F5F2] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck className="w-9 h-9 text-[#B8860B]" />
              </div>

              <div>
                <h4 className="font-serif font-bold text-xl text-[#2C1810] mb-2">
                  Acesso Restrito do Administrador
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Este painel é protegido e configurado para acesso <strong>exclusivo</strong> via Conta do Google.
                </p>
              </div>

              <div className="bg-[#F8F5F2] p-3.5 rounded-2xl border border-[#D4AF37]/30 text-left flex items-start gap-3">
                <Lock className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold text-[#2C1810] uppercase tracking-wider">
                    Conta Google Autorizada
                  </p>
                  <p className="text-xs text-[#B8860B] font-mono font-bold mt-0.5 break-all">
                    {ALLOWED_ADMIN_EMAIL}
                  </p>
                </div>
              </div>

              {/* Direct Quick Google Login Button */}
              <button
                onClick={() => handleGoogleSignIn(ALLOWED_ADMIN_EMAIL)}
                disabled={isAuthenticating}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs py-3.5 px-4 rounded-xl border border-gray-300 shadow-sm flex items-center justify-center gap-3 transition-all hover:shadow-md active:scale-98"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{isAuthenticating ? 'Autenticando no Google...' : `Entrar como ${ALLOWED_ADMIN_EMAIL}`}</span>
              </button>

              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-gray-200 w-full"></div>
                <span className="bg-white px-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider absolute">
                  ou verificar outra conta
                </span>
              </div>

              {/* Form to test other Google email accounts */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (googleEmailInput) {
                    handleGoogleSignIn(googleEmailInput);
                  }
                }}
                className="space-y-3 text-left"
              >
                <div>
                  <label className="block text-[11px] font-bold text-[#5C4538] uppercase mb-1">
                    Digitar E-mail do Google
                  </label>
                  <input
                    type="email"
                    value={googleEmailInput}
                    onChange={(e) => setGoogleEmailInput(e.target.value)}
                    placeholder="seuemail@gmail.com"
                    className="w-full p-3 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full bg-[#2C1810] text-[#E5C158] hover:bg-[#3D2314] font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verificar Permissão de Acesso</span>
                </button>
              </form>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs text-left flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <p className="leading-snug">{authError}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Authorized Dashboard */
          <>
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
                      placeholder="5511995866952"
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
                      placeholder="(11) 99586-6952"
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

            </div>
          </>
        )}

      </div>
    </div>
  );
};

