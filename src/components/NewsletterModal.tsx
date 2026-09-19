import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-[#191D1B] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-stone-200 text-center"
        >
          <button
            id="close-newsletter-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Artisanal Tea Seal Monogram */}
          <div className="w-14 h-14 rounded-full border border-[#8BA753]/50 flex items-center justify-center mx-auto mb-4 bg-[#141715] shadow-inner">
            <span className="text-base font-bold tracking-[0.2em] text-[#8BA753]">
              茶
            </span>
          </div>

          <h3 className="text-xl font-bold uppercase tracking-wider text-white">
            Join The Tea Circle
          </h3>
          <p className="text-xs text-stone-400 mt-2 leading-relaxed">
            Receive 15% off your first harvest purchase, secret seasonal releases, and traditional Kyoto chado recipes.
          </p>

          {subscribed ? (
            <div className="mt-6 py-4 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#8BA753] mx-auto" />
              <p className="text-sm font-semibold text-white">Welcome to MatchaNova!</p>
              <p className="text-xs text-stone-400">Use code <span className="text-[#8BA753] font-bold">WELCOME15</span> at checkout.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-6 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-[#141715] border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-stone-500 text-center focus:outline-none focus:border-[#8BA753]"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-[#86A352] hover:bg-[#96B55E] text-[#111413] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Claim 15% Off
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
