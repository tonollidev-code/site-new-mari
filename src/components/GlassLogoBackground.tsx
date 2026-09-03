import React from 'react';
import { motion } from 'motion/react';

export const GlassLogoBackground: React.FC = () => {
  const logoUrl = "https://i.postimg.cc/y6wg2q7F/Whats-App-Image-2026-08-08-at-21-38-19.jpg";

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none flex items-center justify-center will-change-transform transform-gpu"
    >
      {/* 1. Central Radiant Aura Glow */}
      <motion.div
        animate={{
          scale: [0.96, 1.06, 0.96],
          opacity: [0.12, 0.25, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[220px] sm:w-[380px] md:w-[460px] lg:w-[540px] h-[220px] sm:h-[380px] md:h-[460px] lg:h-[540px] rounded-full bg-gradient-to-r from-[#FFD700]/12 via-[#E5C158]/10 to-[#C5A059]/8 sm:from-[#FFD700]/20 sm:via-[#E5C158]/16 sm:to-[#C5A059]/12 blur-2xl sm:blur-3xl transform-gpu"
      />

      {/* 2. Secondary Ambient Soft Lighting */}
      <div className="absolute top-1/4 right-1/4 w-[180px] sm:w-[280px] h-[180px] sm:h-[280px] rounded-full bg-[#FFD700]/6 sm:bg-[#FFD700]/10 blur-2xl sm:blur-3xl transform-gpu" />
      <div className="absolute bottom-1/4 left-1/4 w-[180px] sm:w-[280px] h-[180px] sm:h-[280px] rounded-full bg-[#E5C158]/6 sm:bg-[#E5C158]/10 blur-2xl sm:blur-3xl transform-gpu" />

      {/* 3. CENTERED WATERMARK LOGO EMBLEM */}
      <div className="relative flex items-center justify-center transform-gpu">
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, 0.5, -0.5, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-[190px] h-[190px] sm:w-[290px] sm:h-[290px] md:w-[360px] md:h-[360px] lg:w-[410px] lg:h-[410px] flex items-center justify-center transform-gpu"
        >
          {/* Outer Golden Ray Ring */}
          <div className="absolute -inset-3 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#FFD700]/14 via-[#E5C158]/10 to-transparent animate-spin [animation-duration:30s] blur-md sm:blur-xl opacity-25 sm:opacity-40 transform-gpu" />

          {/* Animated Gentle Pulsing Border */}
          <motion.div
            animate={{
              scale: [0.98, 1.02, 0.98],
              opacity: [0.20, 0.45, 0.20],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-1.5 sm:-inset-3 rounded-full border border-[#E5C158]/25 sm:border-[#E5C158]/45 shadow-[0_0_10px_rgba(229,193,88,0.1)] sm:shadow-[0_0_18px_rgba(229,193,88,0.2)] transform-gpu"
          />

          {/* Rotating Subtle Dashed Orbit */}
          <div className="absolute -inset-0.5 sm:-inset-1 rounded-full border border-dashed border-[#E5C158]/20 sm:border-[#E5C158]/35 animate-spin [animation-duration:45s] [animation-direction:reverse] transform-gpu" />

          {/* Glass Medallion Body */}
          <div className="relative w-full h-full rounded-full p-2.5 sm:p-4 md:p-5 bg-white/50 sm:bg-white/35 backdrop-blur-[1px] border border-[#E5C158]/25 sm:border-[#E5C158]/40 shadow-[0_4px_16px_rgba(69,42,28,0.03),0_0_12px_rgba(229,193,88,0.1)] sm:shadow-[0_8px_30px_rgba(69,42,28,0.05),0_0_18px_rgba(229,193,88,0.16)] flex items-center justify-center overflow-hidden transform-gpu">
            
            {/* Shimmering Soft Light Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_6s_infinite_ease-in-out] transform-gpu pointer-events-none" />

            {/* Inner Ring Bevel */}
            <div className="absolute inset-1.5 sm:inset-3.5 rounded-full border border-[#E5C158]/20 sm:border-[#E5C158]/35 shadow-[inset_0_0_10px_rgba(229,193,88,0.08)] sm:shadow-[inset_0_0_14px_rgba(229,193,88,0.15)] pointer-events-none" />

            {/* Watermark Logo - Calibrated to look equally soft on Mobile and PC */}
            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={logoUrl}
                referrerPolicy="no-referrer"
                alt=""
                decoding="async"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover rounded-full opacity-25 sm:opacity-50 mix-blend-multiply filter sepia-[35%] sm:sepia-[60%] saturate-[115%] sm:saturate-[170%] brightness-[1.12] sm:brightness-[0.98] contrast-[95%] sm:contrast-[110%] pointer-events-none transition-all"
              />

              {/* Soft Golden Tint Overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E5C158]/12 sm:from-[#E5C158]/20 via-transparent to-[#C5A059]/12 sm:to-[#C5A059]/20 mix-blend-color pointer-events-none" />
              
              {/* Glass Specular Highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/35 sm:from-white/30 via-transparent to-white/10 pointer-events-none" />
              <div className="absolute top-0 inset-x-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/30 sm:from-white/25 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
