import React, { useState, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, MoveHorizontal, Calendar } from 'lucide-react';

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
    <section className="py-20 bg-[#FCFAF7] border-b border-[#EADEDA]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#B8860B] bg-[#F8F5F2] px-4 py-1.5 rounded-full border border-[#D4AF37]/30">
            Resultados Reais
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1810] mt-4 mb-3">
            Transformações que fazem a diferença.
          </h2>
          <p className="text-base text-[#7A6354] font-serif italic">
            Arraste o controle para comparar o Antes e Depois da restauração em gel.
          </p>
        </div>

        {/* Slider Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            className="relative w-full h-[350px] sm:h-[480px] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl select-none cursor-ew-resize bg-[#2C1810]"
          >
            {/* After Image (Background Full View) */}
            <img
              src="https://i.postimg.cc/g0zHrxt1/Whats-App-Image-2026-08-08-at-16-40-35.jpg"
              alt="Depois - Unhas Perfeitas por Mari Nail Designer"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            
            <div className="absolute top-4 right-4 bg-[#2C1810]/90 backdrop-blur-md text-[#E5C158] border border-[#D4AF37]/50 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg z-10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
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

              <div className="absolute top-4 left-4 bg-[#1A0C06]/80 backdrop-blur-md text-white border border-white/30 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg z-10">
                ANTES (Unhas Fracas/Quebradiças)
              </div>
            </div>

            {/* Draggable Divider Bar */}
            <div
              className="absolute top-0 bottom-0 z-30 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-1 h-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              <div className="absolute w-12 h-12 rounded-full bg-[#2C1810] border-2 border-[#D4AF37] text-[#E5C158] shadow-2xl flex items-center justify-center transform -translate-x-1/2">
                <MoveHorizontal className="w-6 h-6 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Bottom Interactive Guidance */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EADEDA]">
            <div className="text-left">
              <h4 className="font-serif font-bold text-[#2C1810] text-lg">
                Suas unhas também podem viver essa transformação!
              </h4>
              <p className="text-xs text-[#5C4538]">
                Recupere a resistência, o formato perfeito e a autoestima das suas mãos.
              </p>
            </div>

            <button
              onClick={() => scrollToSection('booking')}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-md transition-all flex items-center gap-2 shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Quero Minha Transformação</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
