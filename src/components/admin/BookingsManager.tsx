import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingData } from '../../types';
import { Calendar, Clock, User, Phone, MessageCircle, Check, X, Ban, CheckCircle2, Search, ShieldCheck } from 'lucide-react';

export const BookingsManager: React.FC = () => {
  const { bookings, updateBookingStatus, getWhatsAppUrl } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [confirmModal, setConfirmModal] = useState<{
    id: string;
    clientName: string;
    newStatus: 'confirmed' | 'recused' | 'cancelled' | 'completed';
    label: string;
  } | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchesSearch =
      b.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.clientPhone.includes(searchTerm) ||
      b.serviceName.toLowerCase().includes(searchTerm) ||
      b.id.toLowerCase().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: BookingData['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Pendente</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 flex items-center gap-1 shrink-0">
            <Check className="w-3 h-3 text-emerald-600" />
            <span>Confirmado</span>
          </span>
        );
      case 'recused':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200/80 flex items-center gap-1 shrink-0">
            <X className="w-3 h-3 text-rose-600" />
            <span>Recusado</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-50 text-gray-700 border border-gray-200/80 flex items-center gap-1 shrink-0">
            <Ban className="w-3 h-3 text-gray-500" />
            <span>Cancelado</span>
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200/80 flex items-center gap-1 shrink-0">
            <CheckCircle2 className="w-3 h-3 text-purple-600" />
            <span>Concluído</span>
          </span>
        );
    }
  };

  const handleActionClick = (
    id: string,
    clientName: string,
    newStatus: 'confirmed' | 'recused' | 'cancelled' | 'completed',
    label: string
  ) => {
    setConfirmModal({ id, clientName, newStatus, label });
  };

  const executeStatusChange = async () => {
    if (!confirmModal) return;
    await updateBookingStatus(confirmModal.id, confirmModal.newStatus);
    setConfirmModal(null);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      
      {/* Filters and Search Bar - Clean & Minimalist */}
      <div className="bg-white/95 p-3 sm:p-4 rounded-2xl border border-[#DFD7CD] shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'Todos', count: bookings.length },
            { id: 'pending', label: 'Pendentes', count: bookings.filter((b) => b.status === 'pending').length },
            { id: 'confirmed', label: 'Confirmados', count: bookings.filter((b) => b.status === 'confirmed').length },
            { id: 'completed', label: 'Concluídos', count: bookings.filter((b) => b.status === 'completed').length },
            { id: 'recused', label: 'Recusados', count: bookings.filter((b) => b.status === 'recused').length },
            { id: 'cancelled', label: 'Cancelados', count: bookings.filter((b) => b.status === 'cancelled').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-[#3F2519] text-[#F5EFEB] shadow-xs'
                  : 'bg-[#FAF7F3] text-[#6E5343] hover:bg-[#F0EBE4]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                filterStatus === tab.id ? 'bg-[#5A3826] text-[#E5C158]' : 'bg-white text-gray-500 border border-[#DFD7CD]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-60">
          <Search className="w-3.5 h-3.5 text-[#8C6E5D] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, id..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#DFD7CD] text-xs focus:outline-none focus:border-[#3D2314] text-[#3D2314] bg-[#FAF7F3] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Bookings Grid */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white/95 rounded-2xl border border-[#DFD7CD] p-8 sm:p-10 text-center max-w-sm mx-auto shadow-2xs">
          <Calendar className="w-10 h-10 text-[#C5A059]/50 mx-auto mb-2.5" />
          <h3 className="text-base font-serif font-bold text-[#3F2519]">Nenhum agendamento encontrado</h3>
          <p className="text-xs text-[#8C6E5D] mt-1">
            Não há registros correspondentes aos filtros selecionados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white/95 rounded-2xl border border-[#DFD7CD] shadow-2xs hover:shadow-xs transition-shadow p-4 sm:p-4.5 flex flex-col justify-between"
            >
              <div>
                {/* Header: ID + Status */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-mono text-[#8C6E5D] bg-[#FAF7F3] px-2 py-0.5 rounded border border-[#DFD7CD]">
                    #{b.id.slice(0, 8)}
                  </span>
                  {getStatusBadge(b.status)}
                </div>

                {/* Service Name & Price */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#3F2519] leading-tight">
                    {b.serviceName}
                  </h4>
                  <span className="text-xs font-bold text-[#C5A059] shrink-0 font-sans">
                    {b.servicePrice}
                  </span>
                </div>

                {/* Date & Time Compact Row */}
                <div className="bg-[#FAF7F3] p-2.5 rounded-xl border border-[#EADEDA]/80 mb-3 flex items-center justify-between text-xs text-[#523626]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{new Date(b.date + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{b.timeSlot}</span>
                  </div>
                </div>

                {/* Client Info */}
                <div className="space-y-1.5 text-xs mb-3">
                  <div className="flex items-center gap-1.5 font-semibold text-[#3D2314]">
                    <User className="w-3.5 h-3.5 text-[#8C6E5D]" />
                    <span>{b.clientName}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#6E5343]">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#8C6E5D]" />
                      <span>{b.clientPhone}</span>
                    </div>
                    <a
                      href={getWhatsAppUrl(`Olá ${b.clientName}! Sobre seu agendamento #${b.id.slice(0, 6)} (${b.serviceName}) do dia ${b.date} às ${b.timeSlot}:`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 transition-colors"
                    >
                      <MessageCircle className="w-3 h-3 fill-current text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                  {b.notes && (
                    <p className="text-[11px] text-[#8C6E5D] bg-[#FAF7F3] p-2 rounded-lg mt-1 italic border border-[#EADEDA]/70">
                      "{b.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons - Comfortable Touch Targets */}
              <div className="pt-3 border-t border-[#EADEDA]/60 grid grid-cols-2 gap-2">
                {b.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleActionClick(b.id, b.clientName, 'confirmed', 'ACEITAR')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white h-9 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Aceitar</span>
                    </button>
                    <button
                      onClick={() => handleActionClick(b.id, b.clientName, 'recused', 'RECUSAR')}
                      className="bg-rose-600 hover:bg-rose-700 text-white h-9 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Recusar</span>
                    </button>
                  </>
                )}

                {b.status === 'confirmed' && (
                  <>
                    <button
                      onClick={() => handleActionClick(b.id, b.clientName, 'completed', 'CONCLUIR')}
                      className="bg-purple-600 hover:bg-purple-700 text-white h-9 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Concluir</span>
                    </button>
                    <button
                      onClick={() => handleActionClick(b.id, b.clientName, 'cancelled', 'CANCELAR')}
                      className="bg-gray-600 hover:bg-gray-700 text-white h-9 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Cancelar</span>
                    </button>
                  </>
                )}

                {(b.status === 'recused' || b.status === 'cancelled' || b.status === 'completed') && (
                  <button
                    onClick={() => handleActionClick(b.id, b.clientName, 'confirmed', 'REATIVAR')}
                    className="col-span-2 bg-[#FAF7F3] hover:bg-[#F0EBE4] text-[#3D2314] border border-[#DFD7CD] h-9 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Reativar Agendamento
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal - Clean & Ergonomic */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-[#DFD7CD] p-5 sm:p-6 max-w-sm w-full shadow-xl text-center">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F3] border border-[#DFD7CD] flex items-center justify-center mx-auto mb-3 text-[#C5A059]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#3F2519] mb-1.5">
              Confirmar Ação
            </h3>
            <p className="text-xs text-[#6E5343] mb-5 leading-relaxed">
              Deseja realmente <strong>{confirmModal.label}</strong> o agendamento de{' '}
              <strong className="text-[#3F2519]">{confirmModal.clientName}</strong>?
            </p>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 py-2 rounded-xl border border-[#DFD7CD] text-xs font-semibold text-[#6E5343] hover:bg-[#FAF7F3] cursor-pointer"
              >
                Voltar
              </button>
              <button
                onClick={executeStatusChange}
                className="flex-1 py-2 rounded-xl bg-[#3F2519] text-[#F5EFEB] text-xs font-semibold hover:bg-[#2F1B12] shadow-xs cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
