import React, { useState, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { MoveHorizontal, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export const BeforeAfter: React.FC = () => {
  const { scrollToSection } = useApp();
  const [sliderPosition, setSliderPosition] = useState(50);
  const isPointerDown = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDown.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDown.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-transparent border-b border-[#EADEDA]/60 relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#8C6E5D] bg-white px-3.5 py-1 rounded-full border border-[#DFD7CD] shadow-xs">
            Resultados Reais
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3F2519] mt-3 sm:mt-4 mb-2 sm:mb-3 tracking-tight">
            Transformações que inspiram
          </h2>
          <p className="text-sm sm:text-base text-[#7A5E4F] font-serif italic font-normal">
            Arraste o controle para comparar o Antes e Depois do procedimento.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{ touchAction: 'none' }}
            className="relative w-full h-[320px] sm:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-luxury select-none touch-none cursor-ew-resize bg-[#3D251A]"
          >
            {/* After Image (Background Full View) */}
            <img
              src="https://i.postimg.cc/g0zHrxt1/Whats-App-Image-2026-08-08-at-16-40-35.jpg"
              alt="Depois - Unhas Perfeitas por Mariana Leone"
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />
            
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#482D1F]/90 backdrop-blur-md text-[#F5EFEB] border border-[#C5A059]/40 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-md z-10 flex items-center gap-1.5 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>DEPOIS (Transformação Gel)</span>
            </div>

            {/* Before Image (Hardware Accelerated Clipped View) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src="https://i.postimg.cc/QtnFmwdQ/Whats-App-Image-2026-08-09-at-19-26-22.jpg"
                alt="Antes - Unhas curtas e quebradiças antes do procedimento"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none filter contrast-90 brightness-90"
              />

              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#3D251A]/85 backdrop-blur-md text-white border border-white/20 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-md z-10 pointer-events-none">
                ANTES (Unhas Quebradiças)
              </div>
            </div>

            {/* Draggable Divider Bar */}
            <div
              className="absolute top-0 bottom-0 z-30 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-[2px] h-full bg-[#C5A059] shadow-sm" />
              <div className="absolute w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#482D1F] border-2 border-[#C5A059] text-[#C5A059] shadow-xl flex items-center justify-center transform -translate-x-1/2">
                <MoveHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
          </motion.div>

          {/* Bottom Interactive Guidance */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#DFD7CD] shadow-xs"
          >
            <div className="text-center sm:text-left">
              <h4 className="font-serif font-bold text-[#3F2519] text-base sm:text-lg">
                Suas unhas também podem viver essa transformação!
              </h4>
              <p className="text-xs text-[#73594A] font-normal mt-0.5 sm:mt-0">
                Recupere a resistência, o formato perfeito e a autoestima das suas mãos.
              </p>
            </div>

            <button
              onClick={() => scrollToSection('booking')}
              className="w-full sm:w-auto bg-[#482D1F] hover:bg-[#3D2418] text-[#FCFAF7] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
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
