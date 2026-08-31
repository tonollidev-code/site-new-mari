import React from 'react';
import { motion } from 'motion/react';

export const GlassLogoBackground: React.FC = () => {
  const logoUrl = "https://i.postimg.cc/y6wg2q7F/Whats-App-Image-2026-08-08-at-21-38-19.jpg";

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none flex items-center justify-center will-change-transform transform-gpu"
    >
      {/* 1. Central Radiant Golden Aura Glow */}
      <motion.div
        animate={{
          scale: [0.96, 1.08, 0.96],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[260px] sm:w-[380px] md:w-[460px] lg:w-[540px] h-[260px] sm:h-[380px] md:h-[460px] lg:h-[540px] rounded-full bg-gradient-to-r from-[#FFD700]/25 via-[#E5C158]/20 to-[#C5A059]/15 blur-2xl sm:blur-3xl transform-gpu"
      />

      {/* 2. Secondary Ambient Golden Lighting */}
      <div className="absolute top-1/4 right-1/4 w-[240px] sm:w-[300px] h-[240px] sm:h-[300px] rounded-full bg-[#FFD700]/10 blur-2xl sm:blur-3xl transform-gpu" />
      <div className="absolute bottom-1/4 left-1/4 w-[240px] sm:w-[300px] h-[240px] sm:h-[300px] rounded-full bg-[#E5C158]/10 blur-2xl sm:blur-3xl transform-gpu" />

      {/* 3. CENTERED GOLDEN LOGO EMBLEM */}
      <div className="relative flex items-center justify-center transform-gpu">
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 0.6, -0.6, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-[210px] h-[210px] sm:w-[290px] sm:h-[290px] md:w-[360px] md:h-[360px] lg:w-[410px] lg:h-[410px] flex items-center justify-center transform-gpu"
        >
          {/* Outer Golden Glow Ray Ring */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#FFD700]/25 via-[#E5C158]/15 to-transparent animate-spin [animation-duration:25s] blur-lg sm:blur-xl opacity-60 transform-gpu" />

          {/* Animated Pulsing Golden Border */}
          <motion.div
            animate={{
              scale: [0.98, 1.02, 0.98],
              opacity: [0.6, 0.85, 0.6],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-2 sm:-inset-3 rounded-full border-2 border-[#FFD700]/60 shadow-[0_0_20px_rgba(255,215,0,0.3)] transform-gpu"
          />

          {/* Rotating Dashed Golden Orbit */}
          <div className="absolute -inset-1 rounded-full border border-dashed border-[#E5C158]/60 animate-spin [animation-duration:40s] [animation-direction:reverse] transform-gpu" />

          {/* Glass & Golden Medallion Body */}
          <div className="relative w-full h-full rounded-full p-3 sm:p-4 md:p-5 bg-[#FAF6F0]/40 backdrop-blur-sm sm:backdrop-blur-md border-2 border-[#E5C158]/50 shadow-[0_10px_30px_rgba(44,24,16,0.06),0_0_20px_rgba(229,193,88,0.25)] flex items-center justify-center overflow-hidden transform-gpu">
            
            {/* Shimmering Golden Light Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/25 to-transparent -translate-x-full animate-[shimmer_5s_infinite_ease-in-out] transform-gpu" />

            {/* Inner Golden Ring Bevel */}
            <div className="absolute inset-2 sm:inset-3.5 rounded-full border border-[#FFD700]/50 shadow-[inset_0_0_15px_rgba(229,193,88,0.2)] pointer-events-none" />

            {/* Pure Golden Watermark Logo */}
            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={logoUrl}
                referrerPolicy="no-referrer"
                alt=""
                decoding="async"
                className="w-full h-full object-cover rounded-full mix-blend-multiply opacity-80 filter sepia-[85%] saturate-[250%] hue-rotate-[5deg] brightness-[0.92] contrast-[115%] pointer-events-none transition-all"
              />

              {/* Golden Color Tint Overlay Layer */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E5C158]/35 via-[#FFD700]/25 to-[#C5A059]/30 mix-blend-color pointer-events-none" />
              
              {/* Glass Specular Reflection Highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/50 via-transparent to-[#E5C158]/30 pointer-events-none" />
              <div className="absolute top-0 inset-x-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
