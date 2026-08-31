import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, Sparkles, Send } from 'lucide-react';

export const AddTestimonialModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { addTestimonial, services } = useApp();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [comment, setComment] = useState('');
  const [serviceDone, setServiceDone] = useState(services[0]?.name || 'Alongamento em Molde F1');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    addTestimonial({
      name,
      role: role || 'Cliente Especial',
      comment,
      rating,
      serviceDone
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setComment('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A0C06]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#D4AF37]/40 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7A6354] hover:text-[#2C1810] rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-[#F8F5F2] border border-[#DFD7CD] text-[#C5A059] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xs">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2C1810] mb-2">Muito Obrigada!</h3>
            <p className="text-sm text-[#6E5648]">Seu depoimento foi enviado com sucesso e ajudará outras clientes a conhecerem nosso trabalho.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left mb-6">
              <span className="text-[11px] uppercase font-bold text-[#8C6E5D] tracking-[0.2em]">Sua Opinião Importa</span>
              <h3 className="text-2xl font-serif font-bold text-[#2C1810] mt-1">Deixar um Depoimento</h3>
            </div>

            {/* Rating Stars */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-2">Sua Avaliação</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'text-[#C5A059] fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-1">Seu Nome *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Amanda Silva"
                className="w-full px-4 py-2.5 rounded-xl border border-[#DFD7CD] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none text-sm text-[#2C1810]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-1">Profissão / Bairro (Opcional)</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Ex: Arquiteta - Bela Vista"
                className="w-full px-4 py-2.5 rounded-xl border border-[#DFD7CD] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none text-sm text-[#2C1810]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-1">Serviço Realizado</label>
              <select
                value={serviceDone}
                onChange={(e) => setServiceDone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#DFD7CD] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none text-sm bg-white text-[#2C1810]"
              >
                {services.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-1">Seu Depoimento *</label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Conte como foi sua experiência no estúdio..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#DFD7CD] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none text-sm text-[#2C1810]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2C1810] hover:bg-[#3D2314] text-[#FCFAF7] py-3.5 rounded-full font-bold uppercase tracking-widest text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#C5A059]" />
              <span>Publicar Depoimento</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
