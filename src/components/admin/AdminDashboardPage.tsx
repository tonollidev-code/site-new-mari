import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingsManager } from './BookingsManager';
import { ServicesManager } from './ServicesManager';
import { BusinessHoursManager } from './BusinessHoursManager';
import { StudioConfigManager } from './StudioConfigManager';
import { GlassLogoBackground } from '../GlassLogoBackground';
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  Clock,
  Settings,
  LogOut,
  ShieldCheck,
  TrendingUp,
  Clock3,
  CheckCircle2,
  CalendarDays,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { currentUser, logoutAdmin, navigate, bookings, services } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'services' | 'hours' | 'config'>(
    'dashboard'
  );

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;

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
    .slice(0, 4);

  const navTabs = [
    { id: 'dashboard' as const, label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'bookings' as const, label: 'Agendamentos', icon: Calendar, badge: pendingCount > 0 ? pendingCount : null },
    { id: 'services' as const, label: 'Serviços', icon: Sparkles },
    { id: 'hours' as const, label: 'Horários', icon: Clock },
    { id: 'config' as const, label: 'Ajustes', icon: Settings },
  ];

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#FCFAF7] text-[#3D2314] flex flex-col font-sans selection:bg-[#E5C158]/30">
      
      {/* Background Animated Golden Logo */}
      <GlassLogoBackground />

      {/* Top Admin Navigation Bar - Minimalist, Compact on Mobile */}
      <header className="relative z-30 bg-white/90 backdrop-blur-md border-b border-[#EADEDA]/80 sticky top-0 shadow-2xs w-full">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#3F2519] text-[#E5C158] flex items-center justify-center font-serif font-bold text-sm sm:text-base shadow-xs">
              M
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-xs sm:text-sm text-[#3F2519] leading-tight">
                  Mariana Leone
                </span>
                <span className="text-[9px] font-semibold text-[#8C6E5D] bg-[#F8F5F2] border border-[#DFD7CD] px-1.5 py-0.2 rounded-md uppercase tracking-wider hidden sm:inline-flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5 text-[#C5A059]" />
                  Admin
                </span>
              </div>
              <p className="text-[10px] text-[#8C6E5D] truncate max-w-[150px] sm:max-w-none">
                {currentUser?.email || 'mari@marianaleone.com.br'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="text-[11px] font-semibold text-[#523626] hover:text-[#3D2314] bg-[#F8F5F2] hover:bg-[#EADEDA]/60 border border-[#DFD7CD] px-2.5 sm:px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              title="Ir para o site público"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Ver Site</span>
            </button>

            <button
              onClick={() => logoutAdmin()}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Encerrar sessão"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation Menu - Clean, comfortable mobile pills without noisy emojis */}
        <nav aria-label="Navegação do painel" className="w-full border-t border-[#EADEDA]/60 bg-[#FAF7F3]/70 overflow-x-auto scrollbar-none py-1.5 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-1.5 min-w-max">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#3F2519] text-[#F5EFEB] shadow-xs'
                      : 'text-[#6E5343] hover:text-[#3F2519] hover:bg-white/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5C158]' : 'text-[#8C6E5D]'}`} />
                  <span>{tab.label}</span>
                  {tab.badge !== null && tab.badge !== undefined && (
                    <span className="bg-[#E5C158] text-[#3D2314] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full leading-tight">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content View with comfortable mobile padding */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4 sm:space-y-6">
            
            {/* Minimalist Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
              
              {/* Total Bookings */}
              <div className="bg-white/95 rounded-2xl p-3 sm:p-4 border border-[#DFD7CD] shadow-2xs">
                <div className="flex items-center justify-between text-[#8C6E5D] mb-1">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">Total</span>
                  <CalendarDays className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-[#3D2314]">
                  {bookings.length}
                </p>
                <span className="text-[10px] text-[#8C6E5D]">Histórico geral</span>
              </div>

              {/* Pending */}
              <div className="bg-white/95 rounded-2xl p-3 sm:p-4 border border-amber-200/90 shadow-2xs bg-gradient-to-br from-amber-50/40 to-transparent">
                <div className="flex items-center justify-between text-amber-700 mb-1">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">Pendentes</span>
                  <Clock3 className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-amber-900">
                  {pendingCount}
                </p>
                <span className="text-[10px] text-amber-700">Aguardando resposta</span>
              </div>

              {/* Confirmed */}
              <div className="bg-white/95 rounded-2xl p-3 sm:p-4 border border-emerald-200/80 shadow-2xs bg-gradient-to-br from-emerald-50/40 to-transparent">
                <div className="flex items-center justify-between text-emerald-700 mb-1">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">Confirmados</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-emerald-900">
                  {confirmedCount}
                </p>
                <span className="text-[10px] text-emerald-700">Na agenda</span>
              </div>

              {/* Completed */}
              <div className="bg-white/95 rounded-2xl p-3 sm:p-4 border border-[#DFD7CD] shadow-2xs">
                <div className="flex items-center justify-between text-[#8C6E5D] mb-1">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">Concluídos</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-[#3D2314]">
                  {completedCount}
                </p>
                <span className="text-[10px] text-[#8C6E5D]">Atendimentos feitos</span>
              </div>

              {/* Estimated Revenue */}
              <div className="bg-[#3F2519] text-[#F5EFEB] rounded-2xl p-3 sm:p-4 border border-[#C5A059]/40 shadow-xs col-span-2 sm:col-span-1">
                <div className="flex items-center justify-between text-[#E5C158] mb-1">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#E5C158]">Faturamento Est.</span>
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-white">
                  R$ {estimatedRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                </p>
                <span className="text-[10px] text-[#EADEDA]/80">Confirmados + Concluídos</span>
              </div>

            </div>

            {/* Upcoming Appointments Section */}
            <div className="bg-white/95 rounded-2xl p-4 sm:p-6 border border-[#DFD7CD] shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif font-bold text-base text-[#3F2519]">Próximos Atendimentos</h2>
                  <p className="text-[11px] text-[#8C6E5D]">Solicitações mais recentes da sua agenda</p>
                </div>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-semibold text-[#8C6E5D] hover:text-[#3F2519] flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todos ({bookings.length})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {upcomingBookings.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#8C6E5D] italic bg-[#FAF7F3] rounded-xl border border-[#EADEDA]/80">
                  Nenhum agendamento pendente no momento.
                </div>
              ) : (
                <div className="space-y-2">
                  {upcomingBookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 sm:p-3.5 rounded-xl bg-[#FAF7F3] hover:bg-[#F5EFE9] transition-colors border border-[#EADEDA]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#3F2519] text-xs sm:text-sm">{b.clientName}</span>
                          <span className="text-[9px] bg-white px-1.5 py-0.2 rounded border border-[#DFD7CD] text-[#8C6E5D] font-mono">
                            #{b.id.slice(0, 6)}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6E5343]">
                          <strong className="text-[#3D2314] font-medium">{b.serviceName}</strong> • {new Date(b.date + 'T00:00:00').toLocaleDateString('pt-BR')} às{' '}
                          <strong className="text-[#3D2314] font-medium">{b.timeSlot}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {b.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                        </span>
                        <button
                          onClick={() => setActiveTab('bookings')}
                          className="bg-white border border-[#DFD7CD] hover:border-[#3D2314] px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#3D2314] cursor-pointer shadow-2xs"
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

