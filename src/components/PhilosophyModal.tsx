import React from 'react';
import { X, HeartHandshake, Leaf, SunMedium } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ASSETS } from '../data/content';

interface PhilosophyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhilosophyModal: React.FC<PhilosophyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#191D1B] border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl text-stone-200 my-8"
        >
          <button
            id="close-philosophy-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 text-stone-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8BA753]">
            <span className="w-2 h-2 rounded-full bg-[#8BA753]" />
            <span>The Art & Heritage of MatchaNova</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-white mt-3">
            Pure Ritual. Modern Focus.
          </h3>

          <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden my-6 border border-white/10 relative">
            <img
              src={ASSETS.plantation}
              alt="Uji Kyoto tea hills"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-4 text-[11px] uppercase tracking-widest text-stone-300 font-medium">
              Uji, Kyoto, Japan • 800-Year Heritage
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
            <p>
              Matcha is more than green tea—it is a mindfulness practice born in Japanese Zen monasteries during the 12th century. While steeped tea leaves surrender only a fraction of their nutrients, matcha is the whole tea leaf consumed in its entirety.
            </p>
            <p>
              Our leaves are grown under bamboo straw mats for four weeks before spring harvest. This gentle shading compels the Camellia sinensis plant to generate copious chlorophyll, giving MatchaNova its hypnotic emerald color, high L-theanine, and zero bitterness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="p-3 bg-[#131614] rounded-lg border border-white/5">
              <Leaf className="w-5 h-5 text-[#8BA753] mb-2" />
              <h5 className="text-xs font-bold text-white uppercase">Ichibancha</h5>
              <p className="text-[11px] text-stone-400 mt-1">First-harvest spring hand-picked leaves exclusively.</p>
            </div>
            <div className="p-3 bg-[#131614] rounded-lg border border-white/5">
              <SunMedium className="w-5 h-5 text-[#8BA753] mb-2" />
              <h5 className="text-xs font-bold text-white uppercase">Stone Ground</h5>
              <p className="text-[11px] text-stone-400 mt-1">Granite stone mills turning at 30 grams per hour.</p>
            </div>
            <div className="p-3 bg-[#131614] rounded-lg border border-white/5">
              <HeartHandshake className="w-5 h-5 text-[#8BA753] mb-2" />
              <h5 className="text-xs font-bold text-white uppercase">Direct Trade</h5>
              <p className="text-[11px] text-stone-400 mt-1">Partnering directly with multigenerational tea masters.</p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#86A352] hover:bg-[#96B55E] text-[#111413] text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
