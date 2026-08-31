import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingData } from '../../types';
import { Calendar, Clock, User, Phone, MessageCircle, Check, X, Ban, CheckCircle2, Search, Filter, ShieldCheck } from 'lucide-react';

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
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 w-max">
            <Clock className="w-3.5 h-3.5" />
            <span>Pendente</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 w-max">
            <Check className="w-3.5 h-3.5" />
            <span>Confirmado</span>
          </span>
        );
      case 'recused':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1.5 w-max">
            <X className="w-3.5 h-3.5" />
            <span>Recusado</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-300 flex items-center gap-1.5 w-max">
            <Ban className="w-3.5 h-3.5" />
            <span>Cancelado</span>
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300 flex items-center gap-1.5 w-max">
            <CheckCircle2 className="w-3.5 h-3.5" />
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
    <div className="space-y-6">
      
      {/* Filters and Search Bar */}
      <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-[#E5C158]/40 shadow-[0_10px_25px_rgba(44,24,16,0.04)] flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
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
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-[#523626] text-[#F5E5C9] shadow-sm border border-[#E5C158]/50'
                  : 'bg-[#F8F5F2]/90 text-[#7D5E4D] hover:bg-[#EADEDA]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                filterStatus === tab.id ? 'bg-[#3D2314] text-[#E5C158]' : 'bg-white text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#C5A059] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, id..."
            className="w-full pl-9 pr-4 py-2 rounded-2xl border border-[#EADEDA] text-xs focus:outline-none focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] text-[#523626] bg-white/90"
          />
        </div>
      </div>

      {/* Bookings Grid */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-[#EADEDA] p-12 text-center max-w-md mx-auto shadow-sm">
          <Calendar className="w-12 h-12 text-[#C5A059]/40 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-[#523626]">Nenhum agendamento encontrado</h3>
          <p className="text-xs text-[#8C6E5D] mt-1">
            Não há registros correspondentes aos filtros selecionados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white/95 backdrop-blur-md rounded-3xl border border-[#E5C158]/35 shadow-md p-6 flex flex-col justify-between hover:shadow-xl hover:border-[#E5C158]/60 transition-all relative overflow-hidden"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-bold text-[#8C6E5D] uppercase tracking-wider bg-[#F8F5F2] px-2.5 py-1 rounded-full border border-[#E5C158]/30 font-mono">
                    #{b.id}
                  </span>
                  {getStatusBadge(b.status)}
                </div>

                {/* Service */}
                <h4 className="font-serif font-bold text-base text-[#523626] mb-1">
                  {b.serviceName}
                </h4>
                <p className="text-xs text-[#C5A059] font-bold mb-4">{b.servicePrice}</p>

                {/* Date & Time */}
                <div className="bg-[#F8F5F2]/90 p-3.5 rounded-2xl border border-[#EADEDA] mb-4 space-y-1.5 text-xs text-[#523626]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>
                      Data: <strong>{new Date(b.date + 'T00:00:00').toLocaleDateString('pt-BR')}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>
                      Horário: <strong>{b.timeSlot}</strong>
                    </span>
                  </div>
                </div>

                {/* Client Info */}
                <div className="space-y-1.5 text-xs text-[#523626] mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#8C6E5D]" />
                    <span className="font-bold">{b.clientName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#8C6E5D]" />
                      <span>{b.clientPhone}</span>
                    </div>
                    <a
                      href={getWhatsAppUrl(`Olá ${b.clientName}! Sobre seu agendamento #${b.id} (${b.serviceName}) do dia ${b.date} às ${b.timeSlot}:`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 text-[11px] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-xs"
                    >
                      <MessageCircle className="w-3 h-3 fill-current" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                  {b.notes && (
                    <p className="text-[11px] text-[#8C6E5D] bg-[#F8F5F2]/80 p-2.5 rounded-xl mt-2 italic border border-[#EADEDA]">
                      Obs: "{b.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#EADEDA]/60 grid grid-cols-2 gap-2">
                {b.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleActionClick(b.id, b.clientName, 'confirmed', 'ACEITAR')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>ACEITAR</span>
                    </button>
                    <button
                      onClick={() => handleActionClick(b.id, b.clientName, 'recused', 'RECUSAR')}
                      className="bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>RECUSAR</span>
                    </button>
                  </>
                )}

                {b.status === 'confirmed' && (
                  <>
                    <button
                      onClick={() => handleActionClick(b.id, b.clientName, 'completed', 'CONCLUIR')}
                      className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>CONCLUIR</span>
                    </button>
                    <button
                      onClick={() => handleActionClick(b.id, b.clientName, 'cancelled', 'CANCELAR')}
                      className="bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>CANCELAR</span>
                    </button>
                  </>
                )}

                {(b.status === 'recused' || b.status === 'cancelled' || b.status === 'completed') && (
                  <button
                    onClick={() => handleActionClick(b.id, b.clientName, 'confirmed', 'REATIVAR/CONFIRMAR')}
                    className="col-span-2 bg-[#523626] hover:bg-[#3D2314] text-[#F5E5C9] py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    Alterar Status
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-[#E5C158]/50 p-6 sm:p-7 max-w-sm w-full shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] border border-[#E5C158]/40 flex items-center justify-center mx-auto mb-4 text-[#C5A059] shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#523626] mb-2">
              Confirmar Ação
            </h3>
            <p className="text-xs text-[#7D5E4D] mb-6 leading-relaxed">
              Deseja realmente <strong>{confirmModal.label}</strong> o agendamento de{' '}
              <strong className="text-[#523626]">{confirmModal.clientName}</strong>?
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 py-2.5 rounded-full border border-[#EADEDA] text-xs font-bold text-[#7D5E4D] hover:bg-gray-50 cursor-pointer"
              >
                Voltar
              </button>
              <button
                onClick={executeStatusChange}
                className="flex-1 py-2.5 rounded-full bg-[#523626] text-[#F5E5C9] text-xs font-bold hover:bg-[#3D2314] shadow-md border border-[#E5C158]/40 cursor-pointer"
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
