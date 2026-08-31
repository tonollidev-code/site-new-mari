import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem } from '../../types';
import {
  Plus,
  Edit3,
  Trash2,
  Sparkles,
  Clock,
  Upload,
  Link,
  Image as ImageIcon,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  Eye,
  CheckCircle2,
} from 'lucide-react';

// Preset professional nail photos by Mariana Leone
const PRESET_SERVICE_IMAGES = [
  {
    label: 'Alongamento em Fibra',
    url: 'https://i.postimg.cc/brszvv8Q/Whats-App-Image-2026-08-08-at-16-40-37.jpg',
  },
  {
    label: 'Molde F1 em Gel',
    url: 'https://i.postimg.cc/Hx7mGhtN/Whats-App-Image-2026-08-08-at-16-42-50.jpg',
  },
  {
    label: 'Banho de Gel / Blindagem',
    url: 'https://i.postimg.cc/pLGMmHcV/Whats-App-Image-2026-08-08-at-16-43-22.jpg',
  },
  {
    label: 'Manutenção Perfeita',
    url: 'https://i.postimg.cc/fbtpk00Y/Whats-App-Image-2026-08-08-at-21-38-19-(1).jpg',
  },
  {
    label: 'Esmaltação em Gel',
    url: 'https://i.postimg.cc/wjPbKTb9/Whats-App-Image-2026-08-08-at-21-38-20.jpg',
  },
  {
    label: 'Francesinha Reversa com Ouro',
    url: 'https://i.postimg.cc/C1nDfww3/Whats-App-Image-2026-08-08-at-16-40-35-(2).jpg',
  },
  {
    label: 'Nude Minimalista Rosé',
    url: 'https://i.postimg.cc/5y10NJjW/Whats-App-Image-2026-08-08-at-16-40-36-(1).jpg',
  },
  {
    label: 'Encapsulada com Glitter',
    url: 'https://i.postimg.cc/QxCDgC2k/Whats-App-Image-2026-08-08-at-16-40-36-(2).jpg',
  },
];

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

  // Image Upload / Mode Tab
  const [imageTab, setImageTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Success Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

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
    setUploadError(null);
    setImageTab('upload');
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
    setUploadError(null);
    setImageTab(service.image?.startsWith('data:') ? 'upload' : 'url');
    setIsModalOpen(true);
  };

  // Process and optimize image file to fast WebP/JPEG base64
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor selecione um arquivo de imagem válido (JPG, PNG, WEBP).');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 900;
        const MAX_HEIGHT = 900;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setImage(dataUrl);
          setIsUploading(false);
        } else {
          setImage(readerEvent.target?.result as string);
          setIsUploading(false);
        }
      };
      img.onerror = () => {
        setUploadError('Não foi possível carregar a imagem selecionada.');
        setIsUploading(false);
      };
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = () => {
      setUploadError('Erro ao ler arquivo.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
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
        image: image.trim() || undefined,
      });
      showToast(`Serviço "${name}" e foto atualizados com sucesso!`);
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
        image: image.trim() || undefined,
      });
      showToast(`Novo serviço "${name}" adicionado com sucesso!`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    const target = services.find((s) => s.id === id);
    await deleteService(id);
    setDeleteConfirmId(null);
    showToast(`Serviço "${target?.name || ''}" removido com sucesso.`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C1810] text-[#E5C158] border border-[#E5C158]/50 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#E5C158]" />
          <span className="text-xs font-bold text-white">{toastMessage}</span>
        </div>
      )}

      {/* Header action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-[#E5C158]/40 shadow-[0_10px_25px_rgba(44,24,16,0.04)]">
        <div>
          <h3 className="font-serif font-bold text-lg text-[#523626]">Gerenciamento de Serviços & Fotos</h3>
          <p className="text-xs text-[#8C6E5D]">
            Adicione, altere fotos de capa, edite valores ou remova procedimentos do catálogo.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-gradient-to-r from-[#E5C158] via-[#FFD700] to-[#C5A059] hover:from-[#C5A059] hover:to-[#E5C158] text-[#3D2314] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md shadow-[#E5C158]/20 flex items-center gap-2 transition-transform transform hover:-translate-y-0.5 cursor-pointer self-stretch sm:self-auto justify-center"
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
            className="bg-white/95 backdrop-blur-md rounded-3xl border border-[#E5C158]/35 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#E5C158]/60 transition-all"
          >
            <div>
              {/* Image Banner */}
              {service.image ? (
                <div className="h-48 w-full overflow-hidden relative bg-[#F8F5F2]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {service.popular && (
                    <span className="absolute top-3 left-3 bg-[#E5C158] text-[#3D2314] text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-sm border border-white/50">
                      Destaque
                    </span>
                  )}
                  <button
                    onClick={() => openEditModal(service)}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-[#523626] p-1.5 rounded-full shadow-xs backdrop-blur-xs transition-transform hover:scale-105 cursor-pointer"
                    title="Trocar Foto"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
                  </button>
                </div>
              ) : (
                <div className="h-32 bg-[#F8F5F2]/80 flex flex-col items-center justify-center text-[#C5A059] relative gap-1">
                  <Sparkles className="w-7 h-7 opacity-40" />
                  <span className="text-[10px] text-[#A38675] font-medium">Sem imagem de capa</span>
                </div>
              )}

              {/* Details */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-serif font-bold text-base text-[#523626] leading-tight">{service.name}</h4>
                  <span className="text-[10px] font-bold text-[#8C6E5D] uppercase bg-[#F8F5F2] px-2.5 py-0.5 rounded-full border border-[#E5C158]/30 shrink-0">
                    {service.category}
                  </span>
                </div>

                <p className="text-xs text-[#8C6E5D] leading-relaxed line-clamp-2">
                  {service.description}
                </p>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-[#EADEDA]/60">
                  <div className="flex items-center gap-1.5 text-[#523626] font-medium">
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
            <div className="p-4 bg-[#F8F5F2]/80 border-t border-[#EADEDA]/60 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(service)}
                className="bg-white hover:bg-[#EADEDA] text-[#523626] border border-[#EADEDA] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Editar / Trocar Foto</span>
              </button>
              <button
                onClick={() => setDeleteConfirmId(service.id)}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-[#E5C158]/50 p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-[#8C6E5D] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-xl text-[#523626] mb-1">
              {editingService ? 'Editar Serviço e Foto' : 'Novo Serviço'}
            </h3>
            <p className="text-xs text-[#8C6E5D] mb-6">
              Preencha os dados e escolha a foto de exibição do procedimento.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* IMAGE SELECTION SECTION */}
              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E5C158]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold uppercase tracking-wider text-[#523626] flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#C5A059]" />
                    <span>Foto de Capa do Serviço</span>
                  </label>

                  {image && (
                    <button
                      type="button"
                      onClick={() => setImage('')}
                      className="text-[11px] text-rose-600 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                      Remover foto
                    </button>
                  )}
                </div>

                {/* Tabs to Choose How to Add Image */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#EADEDA]">
                  <button
                    type="button"
                    onClick={() => setImageTab('upload')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-center font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      imageTab === 'upload'
                        ? 'bg-[#523626] text-white shadow-xs'
                        : 'text-[#8C6E5D] hover:text-[#523626]'
                    }`}
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload de Foto</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setImageTab('url')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-center font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      imageTab === 'url'
                        ? 'bg-[#523626] text-white shadow-xs'
                        : 'text-[#8C6E5D] hover:text-[#523626]'
                    }`}
                  >
                    <Link className="w-3 h-3" />
                    <span>Colar Link (URL)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setImageTab('presets')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-center font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      imageTab === 'presets'
                        ? 'bg-[#523626] text-white shadow-xs'
                        : 'text-[#8C6E5D] hover:text-[#523626]'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-[#E5C158]" />
                    <span>Fotos Prontas</span>
                  </button>
                </div>

                {/* TAB 1: FILE UPLOAD (DRAG & DROP) */}
                {imageTab === 'upload' && (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#E5C158]/60 hover:border-[#523626] bg-white rounded-2xl p-4 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#FAF6F0] group-hover:bg-[#523626] group-hover:text-[#E5C158] flex items-center justify-center text-[#523626] transition-colors">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[#523626]">
                          {isUploading ? 'Processando imagem...' : 'Clique para selecionar ou arraste uma foto'}
                        </p>
                        <p className="text-[10px] text-[#A38675] mt-0.5">
                          Suporta arquivos JPG, PNG ou WEBP do seu celular ou computador
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: URL INPUT */}
                {imageTab === 'url' && (
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://exemplo.com/foto-unha.jpg"
                      className="w-full p-2.5 rounded-xl border border-[#EADEDA] text-xs text-[#523626] bg-white focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none"
                    />
                    <p className="text-[10px] text-[#8C6E5D]">
                      Cole o link direto da imagem (PostImage, Imgur, Unsplash, etc.)
                    </p>
                  </div>
                )}

                {/* TAB 3: PRESET PHOTOS GALLERY */}
                {imageTab === 'presets' && (
                  <div className="space-y-2">
                    <p className="text-[10px] text-[#8C6E5D]">
                      Selecione uma foto profissional pronta do catálogo:
                    </p>
                    <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1">
                      {PRESET_SERVICE_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setImage(preset.url)}
                          className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer group ${
                            image === preset.url
                              ? 'border-[#523626] ring-2 ring-[#E5C158]'
                              : 'border-transparent hover:border-[#E5C158]'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          {image === preset.url && (
                            <div className="absolute inset-0 bg-[#523626]/50 flex items-center justify-center text-[#E5C158]">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {uploadError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[11px] flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Live Image Preview */}
                {image && (
                  <div className="pt-2 border-t border-[#EADEDA]/60 flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#E5C158] shrink-0 bg-black/5 shadow-xs">
                      <img
                        src={image}
                        alt="Prévia"
                        className="w-full h-full object-cover"
                        onError={() => setUploadError('Link da imagem inválido ou inacessível.')}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-block mb-1">
                        ✓ Imagem Carregada
                      </span>
                      <p className="text-[11px] text-[#523626] truncate font-mono">
                        {image.startsWith('data:') ? 'Arquivo enviado do dispositivo' : image}
                      </p>
                    </div>
                  </div>
                )}
              </div>

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
                  className="w-full p-3 rounded-2xl border border-[#EADEDA] text-sm text-[#523626] bg-white/95 focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158] outline-none"
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
                    className="w-full p-3 rounded-2xl border border-[#EADEDA] text-xs text-[#523626] bg-white/95 focus:border-[#E5C158] outline-none"
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
                    className="w-full p-3 rounded-2xl border border-[#EADEDA] text-xs text-[#523626] bg-white/95 focus:border-[#E5C158] outline-none"
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
                    className="w-full p-3 rounded-2xl border border-[#EADEDA] text-xs text-[#523626] bg-white/95 focus:border-[#E5C158] outline-none"
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
                    className="w-full p-3 rounded-2xl border border-[#EADEDA] text-xs text-[#523626] bg-white/95 focus:border-[#E5C158] outline-none"
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
                  className="w-full p-3 rounded-2xl border border-[#EADEDA] text-xs text-[#523626] bg-white/95 focus:border-[#E5C158] outline-none"
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
                <label htmlFor="popularCheck" className="text-xs font-bold text-[#523626] cursor-pointer">
                  Marcar como Serviço em Destaque
                </label>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-full border border-[#EADEDA] text-xs font-bold text-[#7D5E4D] hover:bg-gray-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#E5C158] via-[#FFD700] to-[#C5A059] hover:from-[#C5A059] hover:to-[#E5C158] text-[#3D2314] text-xs font-bold uppercase tracking-wider shadow-md shadow-[#E5C158]/20 cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-[#E5C158]/50 p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-4 text-rose-600 shadow-xs">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#523626] mb-2">Excluir Serviço</h3>
            <p className="text-xs text-[#7D5E4D] mb-6">
              Tem certeza que deseja remover este serviço do catálogo? Esta ação não pode ser desfeita.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-full border border-[#EADEDA] text-xs font-bold text-[#7D5E4D] hover:bg-gray-50 cursor-pointer"
              >
                Voltar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-full bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-md cursor-pointer"
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
