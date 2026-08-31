import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar as CalendarIcon, Clock, User, Phone, FileText, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const BookingSection: React.FC = () => {
  const { services, selectedServiceForBooking, setSelectedServiceForBooking, addBooking, getWhatsAppUrl } = useApp();

  const [serviceId, setServiceId] = useState<string>(selectedServiceForBooking?.id || services[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [createdBookingId, setCreatedBookingId] = useState<string>('');

  // Synchronize when selectedServiceForBooking changes externally
  useEffect(() => {
    if (selectedServiceForBooking) {
      setServiceId(selectedServiceForBooking.id);
    }
  }, [selectedServiceForBooking]);

  // Helper to find the next valid working day (Tuesday to Saturday)
  const getNextWorkingDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    // If Sunday (0), advance by 2 days to Tuesday (2)
    if (d.getDay() === 0) {
      d.setDate(d.getDate() + 2);
    }
    // If Monday (1), advance by 1 day to Tuesday (2)
    else if (d.getDay() === 1) {
      d.setDate(d.getDate() + 1);
    }
    return d.toISOString().split('T')[0];
  };

  // Set default date to next working day if none selected
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(getNextWorkingDate());
    }
  }, [selectedDate]);

  const activeService = services.find(s => s.id === serviceId) || services[0];

  // Calculate day of week for selected date
  // 0 = Dom, 1 = Seg, 2 = Ter, 3 = Qua, 4 = Qui, 5 = Sex, 6 = Sáb
  const dayOfWeek = selectedDate ? new Date(selectedDate + 'T00:00:00').getDay() : -1;
  const isWeekendClosed = dayOfWeek === 0 || dayOfWeek === 1; // Dom e Seg
  const isSaturday = dayOfWeek === 6;
  const isWeekday = dayOfWeek >= 2 && dayOfWeek <= 5; // Terça a Sexta

  const availableTimeSlots = isSaturday
    ? ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30']
    : isWeekday
    ? ['14:00', '15:30', '17:00', '18:30', '20:00']
    : [];

  // Reset selected time if not in current day's available slots
  useEffect(() => {
    if (selectedTime && !availableTimeSlots.includes(selectedTime)) {
      setSelectedTime('');
    }
  }, [selectedDate, availableTimeSlots, selectedTime]);

  const calculateFinalPrice = () => {
    if (!activeService) return '';
    return activeService.price;
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !selectedDate || !selectedTime) return;

    setErrorMessage(null);

    const res = await addBooking({
      serviceId: activeService.id,
      serviceName: activeService.name,
      servicePrice: calculateFinalPrice(),
      date: selectedDate,
      timeSlot: selectedTime,
      clientName,
      clientPhone,
      notes
    });

    if (res.error) {
      setErrorMessage(res.error);
      return;
    }

    if (res.booking) {
      setCreatedBookingId(res.booking.id);
      setIsSubmitted(true);
    }
  };

  const formatWhatsAppMessage = () => {
    const formattedDate = selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR') : selectedDate;
    let msg = `Olá, Mariana Leone! Gostaria de confirmar meu agendamento feito pelo site.\n\n`;
    msg += `💅 *Serviço:* ${activeService?.name}\n`;
    msg += `📅 *Data:* ${formattedDate}\n`;
    msg += `⏰ *Horário:* ${selectedTime}\n`;
    msg += `👤 *Nome:* ${clientName}\n`;
    msg += `📱 *WhatsApp:* ${clientPhone}\n`;
    msg += `💰 *Valor Estimado:* ${calculateFinalPrice()}\n`;
    if (notes) {
      msg += `📝 *Observação:* ${notes}\n`;
    }
    msg += `\nCódigo do Agendamento: #${createdBookingId}`;
    return msg;
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setClientName('');
    setClientPhone('');
    setNotes('');
    setSelectedTime('');
    setSelectedServiceForBooking(null);
  };

  return (
    <section id="booking" className="py-20 lg:py-24 bg-[#FCFAF7] border-b border-[#EADEDA]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#8C6E5D] bg-white px-3.5 py-1 rounded-full border border-[#DFD7CD] shadow-xs">
            Agendamento Rápido & Fácil
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1810] mt-4 mb-3 tracking-tight">
            Garanta seu Horário
          </h2>
          <p className="text-base text-[#735747] font-serif italic font-normal">
            Escolha os detalhes do seu procedimento e receba confirmação no WhatsApp.
          </p>
        </motion.div>

        {/* Booking Card */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#DFD7CD] shadow-luxury p-6 sm:p-10 relative"
        >
          
          {isSubmitted ? (
            /* Success Screen */
            <div className="text-center py-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-[#F8F5F2] border border-[#DFD7CD] text-[#C5A059] rounded-full flex items-center justify-center mx-auto mb-5 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C6E5D] bg-[#F8F5F2] px-3 py-1 rounded-full border border-[#DFD7CD]">
                Agendamento Registrado • #{createdBookingId}
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C1810] mt-4 mb-2 tracking-tight">
                Agendamento solicitado com sucesso!
              </h3>

              <p className="text-xs sm:text-sm text-[#6E5648] max-w-md mx-auto mb-8 leading-relaxed font-normal">
                Em breve entraremos em contato pelo WhatsApp para confirmar seu horário e enviar as instruções pré-atendimento.
              </p>

              {/* Summary Details */}
              <div className="bg-[#FCFAF7] p-5 rounded-2xl border border-[#EADEDA]/80 max-w-md mx-auto text-left mb-8 space-y-2 text-xs text-[#2C1810]">
                <p><strong>Procedimento:</strong> {activeService?.name}</p>
                <p><strong>Data & Horário:</strong> {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR') : ''} às {selectedTime}</p>
                <p><strong>Cliente:</strong> {clientName} ({clientPhone})</p>
                <p><strong>Valor Estimado:</strong> <span className="text-[#C5A059] font-bold">{calculateFinalPrice()}</span></p>
              </div>

              {/* WhatsApp Redirect Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={getWhatsAppUrl(formatWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xs flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Confirmar pelo WhatsApp Agora</span>
                </a>

                <button
                  onClick={handleResetForm}
                  className="w-full sm:w-auto bg-white border border-[#DFD7CD] hover:border-[#C5A059] text-[#6E5648] px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:bg-[#FCFAF7] cursor-pointer"
                >
                  Fazer Novo Agendamento
                </button>
              </div>
            </div>
          ) : (
            /* Form Screen */
            <form onSubmit={handleSubmit} className="space-y-6">

              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold animate-in fade-in">
                  ⚠️ {errorMessage}
                </div>
              )}
              
              {/* Step 1: Select Service */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>1. Escolha o Serviço *</span>
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border border-[#DFD7CD] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none text-sm bg-white font-medium text-[#2C1810] transition-all"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — {s.price} ({s.duration})
                    </option>
                  ))}
                </select>
                {activeService && (
                  <p className="text-xs text-[#8C6E5D] mt-2 ml-1 font-normal">
                    {activeService.description}
                  </p>
                )}
              </div>

              {/* Step 2 & 3: Date & Time Slot Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>2. Escolha a Data *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-[#DFD7CD] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none text-sm bg-white font-medium text-[#2C1810] transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C1810]">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>3. Escolha o Horário *</span>
                    </label>
                    <span className="text-[10px] text-[#8C6E5D] font-medium hidden sm:inline">
                      {isSaturday ? 'Sáb: a partir das 09h' : 'Ter a Sex: a partir das 14h'}
                    </span>
                  </div>

                  {isWeekendClosed ? (
                    <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs font-medium leading-relaxed">
                      ⚠️ Estúdio fechado neste dia. Atendimento de <strong>terça a sexta (a partir das 14h)</strong> e <strong>sábado (a partir das 09h)</strong>.
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                            selectedTime === time
                              ? 'bg-[#2C1810] text-[#FCFAF7] border border-[#2C1810] shadow-xs'
                              : 'bg-[#F8F5F2] text-[#6E5648] border border-[#DFD7CD] hover:border-[#C5A059]/60 hover:bg-white'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Step 4: Client Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 border-t border-[#EADEDA]/60">
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-2">
                    <User className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Seu Nome Completo *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Fernanda Oliveira"
                    className="w-full px-4 py-3 rounded-2xl border border-[#DFD7CD] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none text-sm text-[#2C1810] transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-2">
                    <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>WhatsApp para Contato *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="(11) 97403-0615"
                    className="w-full px-4 py-3 rounded-2xl border border-[#DFD7CD] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none text-sm text-[#2C1810] transition-all"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-2">
                  <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Observações (Opcional)</span>
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Alguma observação, alergia ou preferência de formato?"
                  className="w-full px-4 py-3 rounded-2xl border border-[#DFD7CD] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none text-sm text-[#2C1810] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#2C1810] hover:bg-[#3D2314] text-[#FCFAF7] py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer border border-[#2C1810]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Confirmar Agendamento</span>
              </button>

            </form>
          )}

        </motion.div>

      </div>
    </section>
  );
};
