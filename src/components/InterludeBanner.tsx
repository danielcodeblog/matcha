import React from 'react';
import { ASSETS } from '../data/content';

export const InterludeBanner: React.FC = () => {
  return (
    <section className="w-full bg-[#EFECE6] py-10 sm:py-14 md:py-16 lg:py-24 text-center px-4 sm:px-8 md:px-12 overflow-hidden border-y border-stone-300/40">
      <div className="max-w-[1520px] mx-auto flex flex-col items-center justify-center">
        {/* Line 1: PREMIUM (Real Matcha Picture Badge) MATCHA */}
        <div className="flex items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-5 lg:gap-x-8 text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-black tracking-[0.06em] sm:tracking-[0.08em] md:tracking-[0.10em] lg:tracking-[0.14em] text-[#858A83] uppercase leading-none sm:leading-tight whitespace-nowrap">
          <span>PREMIUM</span>

          {/* Real Matcha Picture Badge */}
          <span className="inline-flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-18 lg:h-18 rounded-full overflow-hidden border-2 border-[#7D9B4A]/70 shadow-md relative my-0.5 select-none shrink-0 ring-2 sm:ring-4 ring-black/5 bg-[#181B19]">
            <img
              src={ASSETS.badgeLeaf}
              alt="Real Japanese matcha tea leaf with fresh morning dew"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform scale-110 filter brightness-[1.02] contrast-[1.08]"
            />
          </span>

          <span>MATCHA</span>
        </div>

        {/* Line 2: SUSTAINED FOCUS */}
        <div className="mt-2.5 sm:mt-4 md:mt-4 lg:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-black tracking-[0.06em] sm:tracking-[0.08em] md:tracking-[0.10em] lg:tracking-[0.14em] text-[#858A83] uppercase leading-none sm:leading-tight whitespace-nowrap">
          SUSTAINED FOCUS
        </div>
      </div>
    </section>
  );
};
