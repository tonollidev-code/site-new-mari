import React from 'react';
import { motion } from 'motion/react';

export const GlassLogoBackground: React.FC = () => {
  const logoUrl = "https://i.postimg.cc/y6wg2q7F/Whats-App-Image-2026-08-08-at-21-38-19.jpg";

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none flex items-center justify-center"
    >
      {/* 1. Large Central Radiant Golden Aura Glow */}
      <motion.div
        animate={{
          scale: [0.95, 1.12, 0.95],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[260px] sm:w-[380px] md:w-[460px] lg:w-[540px] h-[260px] sm:h-[380px] md:h-[460px] lg:h-[540px] rounded-full bg-gradient-to-r from-[#FFD700]/30 via-[#E5C158]/25 to-[#C5A059]/20 blur-[70px] sm:blur-[110px]"
      />

      {/* 2. Secondary Ambient Golden Lighting */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#FFD700]/15 blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#E5C158]/15 blur-[100px]" />

      {/* 3. CENTERED GOLDEN LOGO EMBLEM */}
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 0.7, -0.7, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-[210px] h-[210px] sm:w-[290px] sm:h-[290px] md:w-[360px] md:h-[360px] lg:w-[410px] lg:h-[410px] flex items-center justify-center"
        >
          {/* Outer Golden Glow Ray Ring */}
          <div className="absolute -inset-6 sm:-inset-8 rounded-full bg-gradient-to-tr from-[#FFD700]/35 via-[#E5C158]/25 to-transparent animate-spin [animation-duration:25s] blur-xl opacity-70" />

          {/* Animated Pulsing Golden Border */}
          <motion.div
            animate={{
              scale: [0.97, 1.03, 0.97],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-2.5 sm:-inset-3.5 rounded-full border-2 border-[#FFD700]/60 shadow-[0_0_30px_rgba(255,215,0,0.35),inset_0_0_15px_rgba(229,193,88,0.25)]"
          />

          {/* Rotating Dashed Golden Orbit */}
          <div className="absolute -inset-1 rounded-full border border-dashed border-[#E5C158]/70 animate-spin [animation-duration:40s] [animation-direction:reverse]" />

          {/* Glass & Golden Medallion Body */}
          <div className="relative w-full h-full rounded-full p-3 sm:p-4 md:p-5 bg-[#FAF6F0]/40 backdrop-blur-md border-2 border-[#E5C158]/50 shadow-[0_15px_40px_rgba(44,24,16,0.08),0_0_25px_rgba(229,193,88,0.3),inset_0_2px_4px_rgba(255,255,255,0.8)] flex items-center justify-center overflow-hidden">
            
            {/* Shimmering Golden Light Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent -translate-x-full animate-[shimmer_5s_infinite_ease-in-out]" />

            {/* Inner Golden Ring Bevel */}
            <div className="absolute inset-2 sm:inset-3.5 rounded-full border border-[#FFD700]/50 shadow-[inset_0_0_18px_rgba(229,193,88,0.25)] pointer-events-none" />

            {/* Pure Golden Watermark Logo */}
            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={logoUrl}
                referrerPolicy="no-referrer"
                alt=""
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
