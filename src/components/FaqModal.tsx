import React, { useState } from 'react';
import { X, ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Why does matcha give energy without the jitters or crash?',
    answer:
      'Matcha is uniquely packed with L-theanine, an amino acid that binds with naturally occurring caffeine. Instead of a sudden spike and sharp midday crash, L-theanine promotes alpha brain waves, creating a calm, alert state of sustained focus lasting 4 to 6 hours.',
  },
  {
    question: 'What is the difference between Ceremonial and Latte grade?',
    answer:
      'Ceremonial grade uses only the youngest top leaves of the very first spring harvest, carefully stone-ground for drinking purely with hot water (traditionally whisked). Latte & culinary grade uses slightly later leaves with a more robust vegetal profile that stands up beautifully to frothed plant milks, sweeteners, and baking.',
  },
  {
    question: 'What is the optimal water temperature to brew matcha?',
    answer:
      'Never use boiling water! Boiling water scorches the delicate tea leaves and creates bitterness. The sweet spot is 160°F to 175°F (70°C–80°C). Let boiled water rest for 3 minutes before pouring.',
  },
  {
    question: 'How should I store my MatchaNova tin?',
    answer:
      'Matcha is highly sensitive to light, heat, air, and moisture. Always seal the inner pouch and lid tightly, and store in the refrigerator or a cool, dark pantry. Once opened, we recommend enjoying within 2 months for peak emerald brilliance and aroma.',
  },
  {
    question: 'What are your shipping and return policies?',
    answer:
      'We provide complimentary express shipping on all orders over $60. Orders are dispatched in temperature-controlled, eco-conscious packaging within 24 hours. If you are not completely delighted with your matcha, our 30-day serenity guarantee offers hassle-free returns.',
  },
];

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            id="close-faq-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 text-stone-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8BA753]">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-white mt-3 mb-6">
            Matcha Guidance & Care
          </h3>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isExpanded = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#141715] border border-white/5 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenIndex(isExpanded ? null : idx)}
                    className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-semibold text-stone-200 hover:text-white"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 transform transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#8BA753]' : ''
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 text-xs sm:text-[13px] text-stone-400 leading-relaxed border-t border-white/5 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#86A352] hover:bg-[#96B55E] text-[#111413] text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Got It
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
