import React, { useEffect, useRef } from 'react';
import { ASSETS } from '../data/content';
import gsap from 'gsap';

interface HeroProps {
  onDiscover: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscover }) => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Kinetic Staggered Reveal inspired by Lando Norris website
      tl.fromTo(
        '.gsap-hero-word',
        {
          y: 45,
          opacity: 0,
          rotateX: -25,
          skewY: 2,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          skewY: 0,
          duration: 0.9,
          stagger: 0.08,
          delay: 0.1,
        }
      );

      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );

      tl.fromTo(
        buttonRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.6)' },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[640px] sm:min-h-[740px] md:min-h-[840px] lg:min-h-[90vh] flex items-center justify-center text-center overflow-hidden bg-[#111413]"
    >
      {/* Background Image Filling the Hero */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={ASSETS.heroBowl}
          alt="Artisanal ceramic Japanese tea bowl overflowing with velvety emerald green matcha powder"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-bottom sm:object-center filter brightness-[0.88] contrast-[1.06]"
        />
        {/* Cinematic dark gradients to guarantee supreme text legibility and smooth edge transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111413]/95 via-[#111413]/45 to-[#111413]/90" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Hero Foreground Content with GSAP Kinetic Animation */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-4 sm:px-8 md:px-12 py-16 sm:py-24 md:py-28 lg:py-36 flex flex-col items-center">
        {/* Main Display Headline with Split Words for GSAP Kinetic Entrance */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-black tracking-[0.06em] text-white uppercase drop-shadow-2xl overflow-hidden flex flex-wrap justify-center gap-x-3 sm:gap-x-5 md:gap-x-6"
        >
          <span className="gsap-hero-word inline-block">THE</span>
          <span className="gsap-hero-word inline-block text-[#8BA753]">ART</span>
          <span className="gsap-hero-word inline-block">OF</span>
          <span className="gsap-hero-word inline-block">MATCHA</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-5 sm:mt-6 md:mt-6 lg:mt-8 text-sm sm:text-base md:text-base lg:text-xl text-stone-200 font-normal tracking-wide max-w-2xl lg:max-w-3xl mx-auto drop-shadow-md leading-relaxed"
        >
          From Ancient Traditions To Your Modern Lifestyle, Redefine Your Daily Wellness
        </p>

        {/* Discover Button */}
        <div
          ref={buttonRef}
          className="mt-6 sm:mt-8 md:mt-8 lg:mt-10"
        >
          <button
            id="hero-discover-btn"
            onClick={onDiscover}
            className="inline-flex items-center justify-center bg-[#86A352] hover:bg-[#96B55E] text-[#111413] text-xs sm:text-sm font-bold tracking-[0.18em] uppercase px-10 py-4 rounded-none transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-2xl cursor-pointer border border-[#9DC064]"
          >
            Discover Matchanova
          </button>
        </div>
      </div>
    </section>
  );
};
