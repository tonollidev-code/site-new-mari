import React from 'react';
import { useApp } from '../context/AppContext';
import { Instagram, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { ProgressiveImage } from './ProgressiveImage';

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
    <section className="py-20 lg:py-24 bg-transparent border-b border-[#EADEDA]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DFD7CD] text-[#8C6E5D] text-[11px] font-bold uppercase tracking-[0.2em] mb-3 shadow-xs">
            <Instagram className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Inspirações Diárias</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3F2519] mb-3 tracking-tight">
            Acompanhe no Instagram
          </h2>
          <p className="text-base text-[#7A5E4F] font-serif italic font-normal">
            Mais inspirações, novidades e resultados no perfil {config.instagramHandle}.
          </p>
        </motion.div>

        {/* 4 Grid Images */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {instaPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://instagram.com/leonesnail"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-[#DFD7CD] shadow-luxury hover:shadow-luxury-hover transition-all duration-300"
            >
              <ProgressiveImage
                src={post.image}
                alt={post.title}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
              />

              {/* Clean Luxury Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-3 rounded-full bg-white/95 text-[#3F2519] shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Instagram className="w-4 h-4 text-[#C5A059]" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <a
            href="https://instagram.com/leonesnail"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#482D1F] hover:bg-[#3D2418] text-[#FCFAF7] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xs hover:shadow-md border border-[#482D1F] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-[#C5A059]" />
            <span>Seguir no Instagram ({config.instagramHandle})</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

