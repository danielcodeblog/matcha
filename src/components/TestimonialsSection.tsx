import React from 'react';
import { TESTIMONIALS } from '../data/content';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#181B19] py-20 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 border-b border-white/5 text-stone-200">
      <div className="max-w-[1520px] mx-auto">
        {/* Pill Badge */}
        <div>
          <span className="inline-block border border-white/20 text-stone-300 text-[11px] sm:text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full font-medium">
            Hear From Our Community
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide uppercase leading-tight">
          WHAT OUR <br />
          <span className="text-[#6D726F]">CUSTOMERS SAY</span>
        </h2>

        {/* Testimonials 2-Column Grid */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-[#202422] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-2xl border border-white/5 flex flex-col justify-between"
            >
              {/* Review Text */}
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-stone-300 font-light">
                "{item.quote}"
              </p>

              {/* Author & Star Rating Footer */}
              <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-sm sm:text-base font-bold tracking-wider text-white">
                  {item.author}
                </span>

                {/* 5 Clean Solid Geometric Gold Stars */}
                <div className="flex items-center gap-1.5" aria-label={`${item.rating} out of 5 stars`}>
                  {[...Array(item.rating)].map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 20 20"
                      className="w-4 h-4 fill-[#DDA83B]"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

