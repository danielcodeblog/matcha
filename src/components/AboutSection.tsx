import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ASSETS } from '../data/content';

interface AboutSectionProps {
  onExplorePhilosophy: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExplorePhilosophy }) => {
  return (
    <section id="about" className="w-full bg-[#181B19] py-20 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 border-b border-white/5 text-stone-200">
      <div className="max-w-[1480px] mx-auto">
        {/* Pill Badge */}
        <div>
          <span className="inline-block border border-white/20 text-stone-300 text-[11px] sm:text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full font-medium">
            About Us
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="mt-5 text-3xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-7xl font-extrabold tracking-wide uppercase">
          WHAT IS <span className="text-[#6D726F]">MATCHANOVA?</span>
        </h2>

        {/* Content Grid: Square Image on Left, Story on Right */}
        <div className="mt-10 sm:mt-14 md:mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-16 items-center">
          {/* Left Square Image */}
          <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-start">
            <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-full md:max-w-[260px] lg:max-w-[360px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
              <img
                src={ASSETS.whiskedCup}
                alt="Freshly whisked ceremonial matcha tea with fine jade foam bubbles"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Text Block & Philosophy Link */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between h-full space-y-6 lg:space-y-8">
            <p className="text-sm sm:text-base md:text-base lg:text-xl xl:text-2xl leading-relaxed md:leading-[1.7] lg:leading-[1.8] text-stone-300 font-light tracking-wide">
              At MatchaNova, We Believe In The Power Of True Matcha. Our Premium Matcha Powder Is Rich In Antioxidants, Provides A Calm, Focused Energy Without The Jitters, And Supports Overall Well-Being. We Bring You The Purest Form Of This Ancient Superfood, Carefully Crafted To Help You Unwind, Thrive, And Experience A Moment Of Serenity In Your Busy Day.
            </p>

            <div className="pt-2 sm:pt-4 flex justify-end">
              <button
                id="explore-philosophy-btn"
                onClick={onExplorePhilosophy}
                className="group inline-flex items-center gap-3 text-xs sm:text-sm md:text-sm lg:text-base font-semibold tracking-wider text-stone-200 hover:text-white transition-colors cursor-pointer"
              >
                <span>Explore Our Philosophy</span>
                <span className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full border border-white/20 group-hover:border-[#8BA753] group-hover:bg-[#8BA753] group-hover:text-[#111413] flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
