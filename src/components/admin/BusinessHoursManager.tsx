import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, Calendar, Lock, Unlock, Plus, Trash2, Check, Sparkles } from 'lucide-react';

export const BusinessHoursManager: React.FC = () => {
  const { businessHours, updateBusinessHours, blockedSlots, addBlockedSlot, removeBlockedSlot } = useApp();

  const [openTime, setOpenTime] = useState(businessHours?.openTime || '09:00');
  const [closeTime, setCloseTime] = useState(businessHours?.closeTime || '19:00');
  const [slotInterval, setSlotInterval] = useState(businessHours?.slotInterval || 90);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New Blocked Slot form
  const [blockDate, setBlockDate] = useState(new Date().toISOString().split('T')[0]);
  const [blockTime, setBlockTime] = useState('09:00');
  const [blockReason, setBlockReason] = useState('Folga / Intervalo');

  useEffect(() => {
    if (businessHours) {
      setOpenTime(businessHours.openTime);
      setCloseTime(businessHours.closeTime);
      setSlotInterval(businessHours.slotInterval);
    }
  }, [businessHours]);

  const handleSaveHours = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBusinessHours({
      openTime,
      closeTime,
      slotInterval: Number(slotInterval),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockDate || !blockTime) return;
    await addBlockedSlot(blockDate, blockTime, blockReason);
    setBlockReason('Folga / Intervalo');
  };

  return (
    <div className="space-y-8">
      
      {/* Schedule Settings */}
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#E5C158]/40 shadow-[0_10px_25px_rgba(44,24,16,0.04)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#F8F5F2] border border-[#E5C158]/40 flex items-center justify-center text-[#C5A059] shadow-xs">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[#523626]">Horário Geral de Atendimento</h3>
            <p className="text-xs text-[#8C6E5D]">
              Configure o horário de abertura, fechamento e intervalo de duração das sessões.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Configurações de horários atualizadas com sucesso!</span>
          </div>
        )}

        <form onSubmit={handleSaveHours} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-[#523626] mb-1">
              Horário Inicial
            </label>
            <input
              type="time"
              required
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className="w-full p-3 rounded-2xl border border-[#EADEDA] text-sm text-[#523626] bg-white/95 focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[#523626] mb-1">
              Horário Final
            </label>
            <input
              type="time"
              required
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="w-full p-3 rounded-2xl border border-[#EADEDA] text-sm text-[#523626] bg-white/95 focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[#523626] mb-1">
              Intervalo por Sessão (min)
            </label>
            <input
              type="number"
              step="15"
              required
              value={slotInterval}
              onChange={(e) => setSlotInterval(Number(e.target.value))}
              className="w-full p-3 rounded-2xl border border-[#EADEDA] text-sm text-[#523626] bg-white/95 focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none"
            />
          </div>

          <div className="sm:col-span-3 pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#523626] hover:bg-[#3D2314] text-[#F5E5C9] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-md border border-[#E5C158]/40 transition-all cursor-pointer"
            >
              Salvar Alterações de Horário
            </button>
          </div>
        </form>
      </div>

      {/* Slot Blocker Section */}
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#E5C158]/40 shadow-[0_10px_25px_rgba(44,24,16,0.04)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-xs">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[#523626]">Bloquear Horários Específicos</h3>
            <p className="text-xs text-[#8C6E5D]">
              Bloqueie horários em datas específicas para férias, imprevistos ou folgas pessoais.
            </p>
          </div>
        </div>

        {/* Add Block Form */}
        <form onSubmit={handleAddBlock} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs mb-8 bg-[#F8F5F2]/90 p-4 rounded-2xl border border-[#EADEDA]">
          <div>
            <label className="block font-bold uppercase tracking-wider text-[#523626] mb-1">
              Data do Bloqueio *
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={blockDate}
              onChange={(e) => setBlockDate(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#EADEDA] bg-white text-[#523626]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[#523626] mb-1">
              Horário *
            </label>
            <select
              value={blockTime}
              onChange={(e) => setBlockTime(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#EADEDA] bg-white text-[#523626]"
            >
              {['09:00', '10:30', '12:00', '13:00', '14:30', '16:00', '17:30', '19:00'].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[#523626] mb-1">
              Motivo (Opcional)
            </label>
            <input
              type="text"
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              placeholder="Ex: Almoço / Compromisso"
              className="w-full p-2.5 rounded-xl border border-[#EADEDA] bg-white text-[#523626]"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Bloquear Slot</span>
            </button>
          </div>
        </form>

        {/* Blocked Slots List */}
        <div>
          <h4 className="font-serif font-bold text-sm text-[#523626] mb-3">
            Horários Atualmente Bloqueados ({blockedSlots.length})
          </h4>

          {blockedSlots.length === 0 ? (
            <p className="text-xs text-[#8C6E5D] italic">
              Nenhum horário bloqueado no momento.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {blockedSlots.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-2xl bg-white/95 border border-rose-200 shadow-sm flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[#523626]">
                      <Calendar className="w-3.5 h-3.5 text-rose-500" />
                      <strong className="font-bold">
                        {new Date(b.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                      </strong>
                      <span className="text-rose-600 font-bold">às {b.timeSlot}</span>
                    </div>
                    {b.reason && <p className="text-[11px] text-gray-500 mt-0.5">{b.reason}</p>}
                  </div>
                  <button
                    onClick={() => removeBlockedSlot(b.id)}
                    className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors cursor-pointer"
                    title="Desbloquear horário"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
