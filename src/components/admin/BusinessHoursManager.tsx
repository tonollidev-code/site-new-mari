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
    <div className="space-y-4 sm:space-y-5">
      
      {/* Schedule Settings */}
      <div className="bg-white/95 p-4 sm:p-6 rounded-2xl border border-[#DFD7CD] shadow-2xs">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-[#FAF7F3] border border-[#DFD7CD] flex items-center justify-center text-[#C5A059]">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-base text-[#3F2519]">Horário Geral de Atendimento</h2>
            <p className="text-xs text-[#8C6E5D]">
              Configure o horário de abertura, fechamento e intervalo de duração das sessões.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="mb-3.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Configurações de horários salvas com sucesso!</span>
          </div>
        )}

        <form onSubmit={handleSaveHours} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-[#523626] mb-1">
              Horário Inicial
            </label>
            <input
              type="time"
              required
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#DFD7CD] text-xs text-[#3D2314] bg-[#FAF7F3] focus:bg-white focus:border-[#3D2314] outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#523626] mb-1">
              Horário Final
            </label>
            <input
              type="time"
              required
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#DFD7CD] text-xs text-[#3D2314] bg-[#FAF7F3] focus:bg-white focus:border-[#3D2314] outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#523626] mb-1">
              Intervalo por Sessão (min)
            </label>
            <input
              type="number"
              step="15"
              required
              value={slotInterval}
              onChange={(e) => setSlotInterval(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-[#DFD7CD] text-xs text-[#3D2314] bg-[#FAF7F3] focus:bg-white focus:border-[#3D2314] outline-none"
            />
          </div>

          <div className="sm:col-span-3 pt-1 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#3F2519] hover:bg-[#2C1810] text-[#F5EFEB] px-4 py-2 rounded-xl font-semibold text-xs transition-colors cursor-pointer shadow-xs"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>

      {/* Slot Blocker Section */}
      <div className="bg-white/95 p-4 sm:p-6 rounded-2xl border border-[#DFD7CD] shadow-2xs">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-base text-[#3F2519]">Bloquear Horários Específicos</h2>
            <p className="text-xs text-[#8C6E5D]">
              Bloqueie horários em datas específicas para férias, imprevistos ou folgas pessoais.
            </p>
          </div>
        </div>

        {/* Add Block Form */}
        <form onSubmit={handleAddBlock} className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs mb-5 bg-[#FAF7F3] p-3 rounded-xl border border-[#DFD7CD]">
          <div>
            <label className="block text-[11px] font-semibold text-[#523626] mb-1">
              Data do Bloqueio *
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={blockDate}
              onChange={(e) => setBlockDate(e.target.value)}
              className="w-full p-2 rounded-lg border border-[#DFD7CD] bg-white text-[#3D2314] text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#523626] mb-1">
              Horário *
            </label>
            <select
              value={blockTime}
              onChange={(e) => setBlockTime(e.target.value)}
              className="w-full p-2 rounded-lg border border-[#DFD7CD] bg-white text-[#3D2314] text-xs"
            >
              {['09:00', '10:30', '12:00', '13:00', '14:30', '16:00', '17:30', '19:00'].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#523626] mb-1">
              Motivo (Opcional)
            </label>
            <input
              type="text"
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              placeholder="Ex: Almoço / Compromisso"
              className="w-full p-2 rounded-lg border border-[#DFD7CD] bg-white text-[#3D2314] text-xs"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Bloquear Slot</span>
            </button>
          </div>
        </form>

        {/* Blocked Slots List */}
        <div>
          <h3 className="font-serif font-bold text-xs sm:text-sm text-[#3F2519] mb-2.5">
            Horários Atualmente Bloqueados ({blockedSlots.length})
          </h3>

          {blockedSlots.length === 0 ? (
            <p className="text-xs text-[#8C6E5D] italic">
              Nenhum horário bloqueado no momento.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {blockedSlots.map((b) => (
                <div
                  key={b.id}
                  className="p-2.5 sm:p-3 rounded-xl bg-white border border-rose-200/80 shadow-2xs flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-1.5 text-[#3D2314]">
                      <Calendar className="w-3.5 h-3.5 text-rose-500" />
                      <strong className="font-bold">
                        {new Date(b.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                      </strong>
                      <span className="text-rose-700 font-semibold">às {b.timeSlot}</span>
                    </div>
                    {b.reason && <p className="text-[11px] text-[#8C6E5D] mt-0.5">{b.reason}</p>}
                  </div>
                  <button
                    onClick={() => removeBlockedSlot(b.id)}
                    className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors cursor-pointer"
                    title="Desbloquear horário"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
