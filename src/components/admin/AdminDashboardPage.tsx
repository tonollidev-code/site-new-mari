import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingsManager } from './BookingsManager';
import { ServicesManager } from './ServicesManager';
import { BusinessHoursManager } from './BusinessHoursManager';
import { StudioConfigManager } from './StudioConfigManager';
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  Clock,
  Settings,
  LogOut,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Clock3,
  XCircle,
  DollarSign,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { currentUser, logoutAdmin, navigate, bookings, services } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'services' | 'hours' | 'config'>(
    'dashboard'
  );

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;
  const recusedCount = bookings.filter((b) => b.status === 'recused').length;
  const cancelledCount = bookings.filter((b) => b.status === 'cancelled').length;

  // Calculate estimated total revenue from confirmed & completed bookings
  const estimatedRevenue = bookings
    .filter((b) => b.status === 'confirmed' || b.status === 'completed')
    .reduce((acc, b) => {
      const matchSrv = services.find((s) => s.id === b.serviceId);
      const val = matchSrv?.numericPrice || 150;
      return acc + val;
    }, 0);

  const upcomingBookings = bookings
    .filter((b) => b.status === 'pending' || b.status === 'confirmed')
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#523626] flex flex-col font-sans selection:bg-[#E5C158]/30">
      
      {/* Top Admin Navigation Bar */}
      <header className="bg-white border-b border-[#E5C158]/30 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#523626] text-[#E5C158] flex items-center justify-center font-serif font-bold text-lg shadow-sm border border-[#E5C158]/30">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-base sm:text-lg text-[#523626] leading-tight">
                  Mari Nail Designer
                </h1>
                <span className="bg-[#F8F5F2] text-[#C5A059] border border-[#E5C158]/40 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
                  Painel Admin
                </span>
              </div>
              <p className="text-[11px] text-[#8C6E5D] font-medium hidden sm:block">
                Sessão do Administrador ({currentUser?.email})
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="text-xs font-bold text-[#8C6E5D] hover:text-[#523626] border border-[#EADEDA] hover:border-[#E5C158] px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5"
              title="Ir para o site público"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Ver Site Público</span>
            </button>

            <button
              onClick={() => logoutAdmin()}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto border-t border-[#EADEDA]/60 py-2 scrollbar-none">
          {[
            { id: 'dashboard', label: '📊 Dashboard', icon: LayoutDashboard },
            { id: 'bookings', label: '📅 Agendamentos', icon: Calendar, badge: pendingCount ? pendingCount : null },
            { id: 'services', label: '💅 Serviços', icon: Sparkles },
            { id: 'hours', label: '🕐 Horários', icon: Clock },
            { id: 'config', label: '⚙️ Configurações', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#523626] text-[#F5E5C9] shadow-md border border-[#E5C158]/40'
                    : 'bg-white text-[#7D5E4D] hover:bg-[#F8F5F2] border border-[#EADEDA]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5C158]' : 'text-[#C5A059]'}`} />
                <span>{tab.label}</span>
                {tab.badge !== null && tab.badge !== undefined && (
                  <span className="bg-amber-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in">
            
            {/* Top Metric Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              
              <div className="bg-white p-5 rounded-3xl border border-[#E5C158]/30 shadow-sm">
                <div className="flex items-center justify-between text-amber-600 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Pendentes</span>
                  <Clock3 className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#523626]">{pendingCount}</p>
                <p className="text-[11px] text-[#8C6E5D] mt-1">Aguardando aceite</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-[#E5C158]/30 shadow-sm">
                <div className="flex items-center justify-between text-emerald-600 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Confirmados</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#523626]">{confirmedCount}</p>
                <p className="text-[11px] text-[#8C6E5D] mt-1">Horários garantidos</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-[#E5C158]/30 shadow-sm">
                <div className="flex items-center justify-between text-purple-600 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Concluídos</span>
                  <Sparkles className="w-4 h-4 text-purple-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#523626]">{completedCount}</p>
                <p className="text-[11px] text-[#8C6E5D] mt-1">Atendimentos feitos</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-[#E5C158]/30 shadow-sm">
                <div className="flex items-center justify-between text-rose-600 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Recusados/Canc.</span>
                  <XCircle className="w-4 h-4 text-rose-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#523626]">{recusedCount + cancelledCount}</p>
                <p className="text-[11px] text-[#8C6E5D] mt-1">Indisponíveis</p>
              </div>

              <div className="bg-[#523626] text-[#F5E5C9] p-5 rounded-3xl border border-[#E5C158]/40 shadow-md col-span-2 md:col-span-1">
                <div className="flex items-center justify-between text-[#E5C158] mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Faturamento Est.</span>
                  <TrendingUp className="w-4 h-4" />
                </div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  R$ {estimatedRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[10px] opacity-75 mt-1">Confirmados + Concluídos</p>
              </div>

            </div>

            {/* Upcoming Appointments Table / Cards */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5C158]/40 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#523626]">Próximos Atendimentos Solicitados</h3>
                  <p className="text-xs text-[#8C6E5D]">Agendamentos recentes pendentes ou confirmados</p>
                </div>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-bold text-[#C5A059] hover:underline flex items-center gap-1"
                >
                  <span>Ver todos ({bookings.length})</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {upcomingBookings.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#8C6E5D] italic bg-[#F8F5F2] rounded-2xl">
                  Nenhum agendamento pendente no momento.
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingBookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-2xl bg-[#F8F5F2] border border-[#EADEDA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-[#523626] text-sm">{b.clientName}</span>
                          <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border text-gray-600">
                            #{b.id}
                          </span>
                        </div>
                        <p className="text-[#8C6E5D]">
                          <strong>{b.serviceName}</strong> • {new Date(b.date + 'T00:00:00').toLocaleDateString('pt-BR')} às{' '}
                          <strong>{b.timeSlot}</strong> ({b.clientPhone})
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {b.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                        </span>
                        <button
                          onClick={() => setActiveTab('bookings')}
                          className="bg-white border border-[#EADEDA] hover:border-[#E5C158] px-3 py-1 rounded-full text-[11px] font-bold text-[#523626]"
                        >
                          Gerenciar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: BOOKINGS */}
        {activeTab === 'bookings' && <BookingsManager />}

        {/* TAB 3: SERVICES */}
        {activeTab === 'services' && <ServicesManager />}

        {/* TAB 4: HOURS & SLOTS */}
        {activeTab === 'hours' && <BusinessHoursManager />}

        {/* TAB 5: STUDIO CONFIG */}
        {activeTab === 'config' && <StudioConfigManager />}

      </main>

    </div>
  );
};
