import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', subject: 'Customer Inquiry' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-[#191D1B] border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl text-stone-200 my-8"
        >
          <button
            id="close-contact-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 text-stone-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8BA753]">
            <Mail className="w-4 h-4" />
            <span>Connect With Us</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-white mt-3 mb-2">
            Contact MatchaNova
          </h3>
          <p className="text-xs text-stone-400 mb-6">
            Questions about our harvest, wholesale partnerships, or finding your ideal blend? Our tea concierge is here for you.
          </p>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#8BA753] mx-auto" />
              <h4 className="text-lg font-bold text-white">Message Received</h4>
              <p className="text-xs text-stone-400">
                Arigato gozaimasu. A tea specialist will respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Kenji Tanaka"
                    className="w-full bg-[#141715] border border-white/15 rounded-lg px-3.5 py-2.5 text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-[#141715] border border-white/15 rounded-lg px-3.5 py-2.5 text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#141715] border border-white/15 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-[#8BA753]"
                >
                  <option value="Customer Inquiry">Customer Inquiry / Order Support</option>
                  <option value="Ceremony Guidance">Matcha Preparation Guidance</option>
                  <option value="Wholesale">Wholesale & Cafe Accounts</option>
                  <option value="Press">Press & Media</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist your tea journey today?"
                  className="w-full bg-[#141715] border border-white/15 rounded-lg px-3.5 py-2.5 text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-stone-500">
                  <MapPin className="w-3.5 h-3.5" /> Kyoto & San Francisco
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#86A352] hover:bg-[#96B55E] text-[#111413] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
