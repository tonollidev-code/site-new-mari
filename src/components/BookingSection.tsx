import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar as CalendarIcon, Clock, User, Phone, FileText, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';

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

  // Set default date to tomorrow if none selected
  useEffect(() => {
    if (!selectedDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [selectedDate]);

  const activeService = services.find(s => s.id === serviceId) || services[0];

  const availableTimeSlots = [
    '09:00', '10:30', '13:00', '14:30', '16:00', '17:30'
  ];

  const calculateFinalPrice = () => {
    if (!activeService) return '';
    return activeService.price;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !selectedDate || !selectedTime) return;

    const newBooking = addBooking({
      serviceId: activeService.id,
      serviceName: activeService.name,
      servicePrice: calculateFinalPrice(),
      date: selectedDate,
      timeSlot: selectedTime,
      clientName,
      clientPhone,
      notes
    });

    setCreatedBookingId(newBooking.id);
    setIsSubmitted(true);
  };

  const formatWhatsAppMessage = () => {
    const formattedDate = selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR') : selectedDate;
    let msg = `Olá, Mari! Gostaria de confirmar meu agendamento feito pelo site.\n\n`;
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
    <section id="booking" className="py-20 bg-[#FCFAF7] border-b border-[#EADEDA]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C5A059] bg-[#F8F5F2] px-4 py-1.5 rounded-full border border-[#E5C158]/40">
            Agendamento Rápido & Fácil
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#523626] mt-4 mb-3">
            Garanta seu Horário
          </h2>
          <p className="text-base text-[#8C6E5D] font-serif italic">
            Escolha os detalhes do seu procedimento e receba confirmação no WhatsApp.
          </p>
        </div>

        {/* Booking Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#E5C158]/40 shadow-2xl p-6 sm:p-10 relative">
          
          {isSubmitted ? (
            /* Success Screen */
            <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-[#F8F5F2] border-2 border-[#E5C158] text-[#E5C158] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] bg-[#F8F5F2] px-3 py-1 rounded-full">
                Agendamento Registrado • #{createdBookingId}
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#523626] mt-3 mb-2">
                Agendamento solicitado com sucesso! 💅
              </h3>

              <p className="text-sm text-[#7D5E4D] max-w-md mx-auto mb-8 leading-relaxed">
                Em breve entraremos em contato pelo WhatsApp para confirmar seu horário e enviar as instruções pré-atendimento.
              </p>

              {/* Summary Details */}
              <div className="bg-[#F8F5F2] p-5 rounded-2xl border border-[#EADEDA] max-w-md mx-auto text-left mb-8 space-y-2 text-xs text-[#523626]">
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
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl flex items-center justify-center gap-2 transition-transform transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Confirmar pelo WhatsApp Agora</span>
                </a>

                <button
                  onClick={handleResetForm}
                  className="w-full sm:w-auto bg-white border border-[#EADEDA] hover:border-[#E5C158] text-[#7D5E4D] px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Fazer Novo Agendamento
                </button>
              </div>
            </div>
          ) : (
            /* Form Screen */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Select Service */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#523626] mb-2">
                  <Sparkles className="w-4 h-4 text-[#E5C158]" />
                  <span>1. Escolha o Serviço *</span>
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#EADEDA] focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none text-sm bg-white font-medium text-[#523626]"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — {s.price} ({s.duration})
                    </option>
                  ))}
                </select>
                {activeService && (
                  <p className="text-xs text-[#8C6E5D] mt-1.5 ml-1">
                    {activeService.description}
                  </p>
                )}
              </div>

              {/* Step 2 & 3: Date & Time Slot Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#523626] mb-2">
                    <CalendarIcon className="w-4 h-4 text-[#E5C158]" />
                    <span>2. Escolha a Data *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-[#EADEDA] focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none text-sm bg-white font-medium text-[#523626]"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#523626] mb-2">
                    <Clock className="w-4 h-4 text-[#E5C158]" />
                    <span>3. Escolha o Horário *</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedTime === time
                            ? 'bg-[#523626] text-[#F5E5C9] border border-[#E5C158] shadow-sm'
                            : 'bg-[#F8F5F2] text-[#7D5E4D] border border-[#EADEDA] hover:border-[#E5C158]'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 4: Client Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[#EADEDA]/60">
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#523626] mb-2">
                    <User className="w-4 h-4 text-[#E5C158]" />
                    <span>Seu Nome Completo *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Fernanda Oliveira"
                    className="w-full px-4 py-3 rounded-2xl border border-[#EADEDA] focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none text-sm text-[#523626]"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#523626] mb-2">
                    <Phone className="w-4 h-4 text-[#E5C158]" />
                    <span>WhatsApp para Contato *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="(11) 97403-0615"
                    className="w-full px-4 py-3 rounded-2xl border border-[#EADEDA] focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none text-sm text-[#523626]"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#523626] mb-2">
                  <FileText className="w-4 h-4 text-[#E5C158]" />
                  <span>Observações (Opcional)</span>
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Alguma observação, alergia ou preferência de formato?"
                  className="w-full px-4 py-3 rounded-2xl border border-[#EADEDA] focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none text-sm text-[#523626]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E5C158] via-[#F5E5C9] to-[#C5A059] hover:from-[#C5A059] hover:to-[#E5C158] text-[#3D2314] py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl shadow-[#E5C158]/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-[#3D2314]" />
                <span>CONFIRMAR AGENDAMENTO</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
