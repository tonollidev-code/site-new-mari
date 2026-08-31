import React, { useState, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, MoveHorizontal, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export const BeforeAfter: React.FC = () => {
  const { scrollToSection } = useApp();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  return (
    <section className="py-20 lg:py-24 bg-transparent border-b border-[#EADEDA]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#8C6E5D] bg-white px-3.5 py-1 rounded-full border border-[#DFD7CD] shadow-xs">
            Resultados Reais
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1810] mt-4 mb-3 tracking-tight">
            Transformações que inspiram
          </h2>
          <p className="text-base text-[#735747] font-serif italic font-normal">
            Arraste o controle para comparar o Antes e Depois do procedimento.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            className="relative w-full h-[360px] sm:h-[480px] rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-luxury select-none cursor-ew-resize bg-[#2C1810]"
          >
            {/* After Image (Background Full View) */}
            <img
              src="https://i.postimg.cc/g0zHrxt1/Whats-App-Image-2026-08-08-at-16-40-35.jpg"
              alt="Depois - Unhas Perfeitas por Mariana Leone"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            
            <div className="absolute top-4 right-4 bg-[#2C1810]/90 backdrop-blur-md text-[#F5EFEB] border border-[#C5A059]/40 text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1.5 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>DEPOIS (Transformação Gel)</span>
            </div>

            {/* Before Image (Clipped View) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none border-r-2 border-white shadow-2xl"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="https://i.postimg.cc/QtnFmwdQ/Whats-App-Image-2026-08-09-at-19-26-22.jpg"
                alt="Antes - Unhas curtas e quebradiças antes do procedimento"
                className="absolute inset-y-0 left-0 max-w-none h-full object-cover filter contrast-90 brightness-90"
                style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
              />

              <div className="absolute top-4 left-4 bg-[#1A0C06]/85 backdrop-blur-md text-white border border-white/20 text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md z-10 pointer-events-none">
                ANTES (Unhas Quebradiças)
              </div>
            </div>

            {/* Draggable Divider Bar */}
            <div
              className="absolute top-0 bottom-0 z-30 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-[2px] h-full bg-[#C5A059] shadow-sm" />
              <div className="absolute w-10 h-10 rounded-full bg-[#2C1810] border-2 border-[#C5A059] text-[#C5A059] shadow-xl flex items-center justify-center transform -translate-x-1/2">
                <MoveHorizontal className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Bottom Interactive Guidance */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#DFD7CD] shadow-xs"
          >
            <div className="text-left">
              <h4 className="font-serif font-bold text-[#2C1810] text-lg">
                Suas unhas também podem viver essa transformação!
              </h4>
              <p className="text-xs text-[#6E5648] font-normal">
                Recupere a resistência, o formato perfeito e a autoestima das suas mãos.
              </p>
            </div>

            <button
              onClick={() => scrollToSection('booking')}
              className="bg-[#2C1810] hover:bg-[#3D2314] text-[#FCFAF7] px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#C5A059]" />
              <span>Quero Minha Transformação</span>
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
