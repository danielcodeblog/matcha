import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../data/content';
import { Product } from '../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CollectionsSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({ onSelectProduct }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-collection-card',
        {
          opacity: 0,
          y: 45,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="collections" className="w-full bg-[#EFECE6] py-20 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 text-[#181B19]">
      <div className="max-w-[1520px] mx-auto">
        {/* Top Pill Badge */}
        <div>
          <span className="inline-block border border-[#222523]/30 text-[#222523] text-[11px] sm:text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full font-medium">
            Shop
          </span>
        </div>

        {/* Header Row */}
        <div className="mt-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase text-[#181B19]">
            MATCHA COLLECTIONS
          </h2>
          <div className="text-left md:text-right text-xs sm:text-sm md:text-base text-[#4E524F] font-normal leading-relaxed tracking-wide">
            <p>Experience The Authentic Taste</p>
            <p>And Benefits Of Premium Matcha</p>
          </div>
        </div>

        {/* 2x2 Grid of Dark Cards */}
        <div ref={gridRef} className="mt-10 sm:mt-12 md:mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 lg:gap-10">
          {PRODUCTS.map((product) => {
            // Label for the explore button matching exact copy
            const exploreLabel =
              product.category === 'powder'
                ? 'Explore Powder'
                : product.category === 'kit'
                ? 'Explore Kit'
                : product.category === 'drink'
                ? 'Explore Matcha Drink'
                : 'Explore Matcha Cake';

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="gsap-collection-card group relative bg-[#1B1E1C] hover:bg-[#202422] text-white rounded-2xl p-6 sm:p-8 md:p-6 lg:p-10 xl:p-12 shadow-2xl border border-black/5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer min-h-[280px] sm:min-h-[320px] md:min-h-[300px] lg:min-h-[360px]"
              >
                {/* Top Info & Right Floating Visual */}
                <div className="flex justify-between items-start gap-4 sm:gap-6 md:gap-4 lg:gap-6">
                  <div className="flex-1 min-w-0 z-10">
                    <h3 className="text-lg sm:text-xl md:text-lg lg:text-2xl xl:text-3xl font-bold tracking-wider uppercase text-white group-hover:text-[#A7C769] transition-colors">
                      {product.title}
                    </h3>
                    <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm md:text-xs lg:text-base text-stone-300/90 leading-relaxed font-normal line-clamp-3 md:line-clamp-none">
                      {product.subtitle}
                    </p>
                    <div className="mt-3.5 sm:mt-5 text-sm sm:text-base md:text-sm lg:text-base font-bold tracking-wider text-[#8BA753]">
                      From ${product.price}.00 USD
                    </div>
                  </div>

                  {/* Circular / Clipped Product Visual on Right */}
                  <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-28 md:h-28 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden shrink-0 shadow-2xl border-2 border-white/10 group-hover:border-[#8BA753]/40 group-hover:scale-105 transition-all duration-500">
                    <img
                      src={product.image}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Bottom Explore Link with Arrow */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/5 z-10 flex items-center justify-between text-xs sm:text-sm md:text-xs lg:text-base font-semibold tracking-wider text-stone-300 group-hover:text-white transition-colors">
                  <span>{exploreLabel}</span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-stone-400 group-hover:text-[#8BA753]" />
                </div>

                {/* Subtle dark glow accent */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#7D9B4A]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#7D9B4A]/25 transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
