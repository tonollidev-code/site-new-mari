import React from 'react';
import { useApp } from '../context/AppContext';
import { Instagram, ExternalLink } from 'lucide-react';

export const InstagramGrid: React.FC = () => {
  const { config } = useApp();

  const instaPosts = [
    {
      id: 1,
      image: 'https://i.postimg.cc/QdXTJRgT/Whats-App-Image-2026-08-09-at-19-27-35.jpg',
      title: 'Alongamento em Fibra de Vidro',
      likes: '412',
      comments: '38'
    },
    {
      id: 2,
      image: 'https://i.postimg.cc/RhBFVHGj/Whats-App-Image-2026-08-09-at-19-27-35-(1).jpg',
      title: 'Molde F1 com Acabamento Perfeito',
      likes: '528',
      comments: '45'
    },
    {
      id: 3,
      image: 'https://i.postimg.cc/6py9Kctn/Whats-App-Image-2026-08-09-at-19-27-36.jpg',
      title: 'Banho de Gel & Blindagem Natural',
      likes: '389',
      comments: '29'
    },
    {
      id: 4,
      image: 'https://i.postimg.cc/MZ5xjNGt/Whats-App-Image-2026-08-09-at-19-27-36-(1).jpg',
      title: 'Esmaltação em Gel Vermelho Luxo',
      likes: '601',
      comments: '52'
    }
  ];

  return (
    <section className="py-20 bg-[#FCFAF7] border-b border-[#EADEDA]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8F5F2] border border-[#D4AF37]/30 text-[#B8860B] text-xs font-bold uppercase tracking-widest mb-3">
            <Instagram className="w-4 h-4 text-[#D4AF37]" />
            <span>Redes Sociais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1810] mb-3">
            Acompanhe meu trabalho
          </h2>
          <p className="text-base text-[#7A6354] font-serif italic">
            Mais inspirações, novidades e resultados no Instagram {config.instagramHandle}.
          </p>
        </div>

        {/* 4 Grid Images */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-10">
          {instaPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/leonesnail"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden border border-[#EADEDA] shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />

              {/* Clean Hover Overlay with no text */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-3 rounded-full bg-white/90 text-[#2C1810] shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Instagram className="w-4 h-4 text-[#B8860B]" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="https://instagram.com/leonesnail"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#2C1810] hover:bg-[#D4AF37] text-white hover:text-[#2C1810] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md border border-[#D4AF37]/30"
          >
            <Instagram className="w-4 h-4 text-[#D4AF37]" />
            <span>Seguir no Instagram ({config.instagramHandle})</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
          </a>
        </div>

      </div>
    </section>
  );
};
