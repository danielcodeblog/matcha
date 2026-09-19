import React from 'react';
import { ASSETS } from '../data/content';

export const WherePurityBeginsSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#121513] overflow-hidden text-center">
      {/* Background Image Container */}
      <div className="relative w-full h-[420px] sm:h-[500px] md:h-[560px] lg:h-[760px] xl:h-[860px]">
        <img
          src={ASSETS.plantation}
          alt="Lush green tea leaves at sunrise in Japanese tea plantation"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.08]"
        />

        {/* Gradient overlays for lighting & smooth blend to footer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#101211]" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/70" />

        {/* Centered Slogan */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black tracking-[0.10em] sm:tracking-[0.14em] text-white uppercase drop-shadow-2xl">
            WHERE <span className="text-[#8BA753]">PURITY</span> BEGINS
          </h2>
        </div>

        {/* Giant MATCHANOVA Watermark Typography at bottom */}
        <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 lg:bottom-10 left-0 right-0 overflow-hidden select-none pointer-events-none">
          <div className="text-[38px] sm:text-[60px] md:text-[80px] lg:text-[140px] xl:text-[200px] font-black tracking-[0.14em] sm:tracking-[0.18em] lg:tracking-[0.22em] text-white/10 uppercase whitespace-nowrap text-center transform translate-y-2 sm:translate-y-4 md:translate-y-6 lg:translate-y-8">
            MATCHANOVA
          </div>
        </div>
      </div>
    </section>
  );
};
