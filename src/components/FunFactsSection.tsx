import React, { useState, useEffect, useRef } from 'react';
import { FUN_FACTS } from '../data/content';
import { FunFact } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FunFactsSection: React.FC = () => {
  const [activeFact, setActiveFact] = useState<FunFact | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-funfact-card',
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="benefits" className="w-full bg-[#181B19] py-20 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 border-b border-white/5 text-stone-200">
      <div className="max-w-[1520px] mx-auto">
        {/* Pill Badge */}
        <div>
          <span className="inline-block border border-white/20 text-stone-300 text-[11px] sm:text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full font-medium">
            Discover Our Benefits
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide uppercase">
          FUNFACT ABOUT <span className="text-[#6D726F]">MATCHA</span>
        </h2>

        {/* Section Subtitle */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-stone-400 font-normal tracking-wide max-w-4xl leading-relaxed">
          Unlock The Secrets Behind The World's Most Revered Green Tea. Here's What Makes Matcha A True Wellness Powerhouse
        </p>

        {/* 3-Card Grid */}
        <div ref={gridRef} className="mt-10 sm:mt-12 md:mt-12 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 lg:gap-8 xl:gap-10">
          {FUN_FACTS.map((fact) => (
            <div
              key={fact.id}
              onClick={() => setActiveFact(fact)}
              className="gsap-funfact-card group relative h-80 sm:h-96 md:h-[400px] lg:h-[500px] xl:h-[580px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl border border-white/10"
            >
              {/* Card Background Image */}
              <img
                src={fact.image}
                alt={`${fact.title} ${fact.subtitle}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.85] group-hover:brightness-[0.75]"
              />

              {/* Dark Vignette & Atmospheric Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 group-hover:via-black/50 transition-colors" />

              {/* Centered Bold Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-3 lg:p-8 select-none pointer-events-none">
                <span className="text-xl sm:text-2xl md:text-xl lg:text-3xl xl:text-5xl font-extrabold tracking-[0.06em] lg:tracking-[0.12em] text-white uppercase drop-shadow-lg">
                  {fact.title}
                </span>
                <span className="text-xl sm:text-2xl md:text-xl lg:text-3xl xl:text-5xl font-extrabold tracking-[0.06em] lg:tracking-[0.12em] text-white uppercase drop-shadow-lg mt-1 lg:mt-1.5">
                  {fact.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fact Detail Modal */}
      <AnimatePresence>
        {activeFact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-[#1F2321] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-stone-200"
            >
              <button
                id="close-fact-modal-btn"
                onClick={() => setActiveFact(null)}
                className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#8BA753]" />
                <span className="text-xs uppercase tracking-widest text-[#8BA753] font-semibold">
                  Matcha Wellness Fact
                </span>
              </div>

              <h3 className="text-2xl font-bold uppercase tracking-wider text-white mt-3">
                {activeFact.title} {activeFact.subtitle}
              </h3>

              <div className="w-full h-44 rounded-xl overflow-hidden my-5 border border-white/10">
                <img
                  src={activeFact.image}
                  alt={activeFact.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-stone-300">
                {activeFact.detail}
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveFact(null)}
                  className="px-5 py-2 rounded-full bg-[#86A352] hover:bg-[#96B55E] text-[#111413] text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Close Fact
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
