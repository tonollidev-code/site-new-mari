import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem } from '../../types';
import { Plus, Edit3, Trash2, Sparkles, Clock, DollarSign, Image, Tag, X, Check } from 'lucide-react';

export const ServicesManager: React.FC = () => {
  const { services, addService, updateService, deleteService } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceItem['category']>('alongamento');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('90 min');
  const [price, setPrice] = useState('R$ 150,00');
  const [numericPrice, setNumericPrice] = useState(150);
  const [popular, setPopular] = useState(false);
  const [image, setImage] = useState('');

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingService(null);
    setName('');
    setCategory('alongamento');
    setDescription('');
    setDuration('90 min');
    setPrice('R$ 150,00');
    setNumericPrice(150);
    setPopular(false);
    setImage('');
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setName(service.name);
    setCategory(service.category);
    setDescription(service.description);
    setDuration(service.duration);
    setPrice(service.price);
    setNumericPrice(service.numericPrice || 0);
    setPopular(Boolean(service.popular));
    setImage(service.image || '');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !duration) return;

    if (editingService) {
      await updateService(editingService.id, {
        name,
        category,
        description,
        duration,
        price,
        numericPrice: Number(numericPrice),
        popular,
        image: image || undefined,
      });
    } else {
      await addService({
        name,
        category,
        description,
        duration,
        price,
        numericPrice: Number(numericPrice),
        popular,
        iconName: 'Sparkles',
        image: image || undefined,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteService(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header action */}
      <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#E5C158]/40 shadow-sm">
        <div>
          <h3 className="font-serif font-bold text-lg text-[#523626]">Gerenciamento de Serviços</h3>
          <p className="text-xs text-[#8C6E5D]">
            Adicione, edite valores, durações ou remova serviços do catálogo do estúdio.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-gradient-to-r from-[#E5C158] via-[#F5E5C9] to-[#C5A059] hover:from-[#C5A059] hover:to-[#E5C158] text-[#3D2314] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-2 transition-transform transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Serviço</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl border border-[#E5C158]/30 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div>
              {/* Image Banner */}
              {service.image ? (
                <div className="h-44 w-full overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  {service.popular && (
                    <span className="absolute top-3 left-3 bg-[#E5C158] text-[#3D2314] text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm">
                      Destaque
                    </span>
                  )}
                </div>
              ) : (
                <div className="h-32 bg-[#F8F5F2] flex items-center justify-center text-[#C5A059] relative">
                  <Sparkles className="w-8 h-8 opacity-40" />
                </div>
              )}

              {/* Details */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-serif font-bold text-base text-[#523626]">{service.name}</h4>
                  <span className="text-[10px] font-bold text-[#C5A059] uppercase bg-[#F8F5F2] px-2 py-0.5 rounded-md border border-[#E5C158]/20 shrink-0">
                    {service.category}
                  </span>
                </div>

                <p className="text-xs text-[#8C6E5D] leading-relaxed line-clamp-2">
                  {service.description}
                </p>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#EADEDA]/60">
                  <div className="flex items-center gap-1.5 text-[#523626]">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="font-bold text-[#C5A059] text-sm">
                    {service.price}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-[#F8F5F2] border-t border-[#EADEDA]/60 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(service)}
                className="bg-white hover:bg-[#EADEDA] text-[#523626] border border-[#EADEDA] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Editar</span>
              </button>
              <button
                onClick={() => setDeleteConfirmId(service.id)}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Excluir</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Service Modal (Add / Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#E5C158] p-6 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-xl text-[#523626] mb-1">
              {editingService ? 'Editar Serviço' : 'Novo Serviço'}
            </h3>
            <p className="text-xs text-[#8C6E5D] mb-6">
              Preencha as informações do serviço oferecido.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#523626] mb-1">
                  Nome do Serviço *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Alongamento em Fibra de Vidro"
                  className="w-full p-3 rounded-2xl border border-[#EADEDA] text-sm text-[#523626]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#523626] mb-1">
                    Categoria
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-3 rounded-2xl border border-[#EADEDA] text-xs text-[#523626] bg-white"
                  >
                    <option value="alongamento">Alongamento</option>
                    <option value="gel">Gel / Blindagem</option>
                    <option value="manutencao">Manutenção</option>
                    <option value="nailart">Nail Art</option>
                    <option value="manicure">Manicure</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#523626] mb-1">
                    Duração Estimada *
                  </label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Ex: 90 min"
                    className="w-full p-3 rounded-2xl border border-[#EADEDA] text-xs text-[#523626]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#523626] mb-1">
                    Preço Exibido (Texto) *
                  </label>
                  <input
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ex: A partir de R$ 180,00"
                    className="w-full p-3 rounded-2xl border border-[#EADEDA] text-xs text-[#523626]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#523626] mb-1">
                    Valor Numérico (R$)
                  </label>
                  <input
                    type="number"
                    value={numericPrice}
                    onChange={(e) => setNumericPrice(Number(e.target.value))}
                    placeholder="180"
                    className="w-full p-3 rounded-2xl border border-[#EADEDA] text-xs text-[#523626]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#523626] mb-1">
                  Descrição do Serviço
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva a técnica, durabilidade e benefícios..."
                  className="w-full p-3 rounded-2xl border border-[#EADEDA] text-xs text-[#523626]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#523626] mb-1">
                  URL da Imagem de Capa
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-3 rounded-2xl border border-[#EADEDA] text-xs text-[#523626]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="popularCheck"
                  checked={popular}
                  onChange={(e) => setPopular(e.target.checked)}
                  className="w-4 h-4 text-[#E5C158] rounded border-gray-300 focus:ring-[#E5C158]"
                />
                <label htmlFor="popularCheck" className="text-xs font-bold text-[#523626]">
                  Marcar como Serviço em Destaque
                </label>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-full border border-[#EADEDA] text-xs font-bold text-[#7D5E4D]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#E5C158] to-[#C5A059] text-[#3D2314] text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Salvar Serviço
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#E5C158] p-6 max-w-sm w-full shadow-2xl text-center">
            <h3 className="font-serif font-bold text-lg text-[#523626] mb-2">Excluir Serviço</h3>
            <p className="text-xs text-[#7D5E4D] mb-6">
              Tem certeza que deseja remover este serviço do catálogo? Esta ação não pode ser desfeita.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-full border border-[#EADEDA] text-xs font-bold text-[#7D5E4D]"
              >
                Voltar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-full bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-md"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
