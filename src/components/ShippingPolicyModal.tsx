import React, { useState } from 'react';
import { X, Truck, ShieldCheck, Snowflake, Globe, Clock, RefreshCw, Calculator, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShippingPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout?: () => void;
}

const REGIONS = [
  {
    country: 'United States',
    standard: '3-5 business days',
    express: '1-2 business days',
    coldchain: 'Overnight (Insulated)',
    freeThreshold: '$60.00',
    rate: '$6.00',
  },
  {
    country: 'Canada',
    standard: '4-7 business days',
    express: '2-3 business days',
    coldchain: '2 business days',
    freeThreshold: '$75.00 CAD',
    rate: '$9.00 CAD',
  },
  {
    country: 'United Kingdom & Europe',
    standard: '4-6 business days',
    express: '2-3 business days',
    coldchain: '2-3 business days',
    freeThreshold: '£55.00 / €65.00',
    rate: '£6.50 / €7.50',
  },
  {
    country: 'Japan & East Asia',
    standard: '1-3 business days',
    express: 'Next Day',
    coldchain: 'Next Day (Refrigerated)',
    freeThreshold: '¥5,000',
    rate: '¥600',
  },
  {
    country: 'Australia & New Zealand',
    standard: '5-9 business days',
    express: '3-4 business days',
    coldchain: '3-4 business days',
    freeThreshold: '$90.00 AUD',
    rate: '$12.00 AUD',
  },
];

export const ShippingPolicyModal: React.FC<ShippingPolicyModalProps> = ({
  isOpen,
  onClose,
  onOpenCheckout,
}) => {
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [calcZip, setCalcZip] = useState('');
  const [calcResult, setCalcResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentRegion = REGIONS.find((r) => r.country === selectedCountry) || REGIONS[0];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcZip.trim()) {
      setCalcResult('Please enter a valid postal/ZIP code');
      return;
    }
    setCalcResult(
      `Delivery to ${selectedCountry} (${calcZip.toUpperCase()}): Standard transit estimated 3-4 business days. Free on orders over ${currentRegion.freeThreshold}.`
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-3xl bg-[#181B19] border border-white/15 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl text-stone-200 my-6 max-h-[92vh] flex flex-col"
        >
          {/* Close button */}
          <button
            id="close-shipping-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close shipping modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-5 pr-10">
            <div className="w-10 h-10 rounded-full bg-[#8BA753]/20 border border-[#8BA753]/40 flex items-center justify-center text-[#A7C769]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-wider uppercase text-white">
                Shipping & Delivery Guide
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Fresh Uji harvests delivered worldwide with certified cold-chain protection
              </p>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto pr-1 mt-6 space-y-6 flex-1 text-sm font-light text-stone-300">
            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#202422] rounded-xl border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-[#8BA753]">
                  <Snowflake className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-white">Cold-Chain Preserved</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Insulated foil mailers and inert nitrogen purging prevent oxidation, preserving high L-theanine and vibrant jade color.
                </p>
              </div>

              <div className="p-4 bg-[#202422] rounded-xl border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-[#8BA753]">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-white">Same-Day Dispatch</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Orders placed before 2:00 PM JST / EST ship same business day directly from micro-batch air facilities.
                </p>
              </div>

              <div className="p-4 bg-[#202422] rounded-xl border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-[#8BA753]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-white">30-Day Freshness Guarantee</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  If your matcha arrives damaged or does not meet peak ceremonial standards, we replace or refund with zero hassle.
                </p>
              </div>
            </div>

            {/* Regional Delivery Options Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#8BA753]" />
                  Global Shipping Tiers by Region
                </h3>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#141715]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#202422] text-stone-300 uppercase tracking-wider font-semibold border-b border-white/10">
                    <tr>
                      <th className="p-3">Region</th>
                      <th className="p-3">Standard Ground</th>
                      <th className="p-3">Express Air</th>
                      <th className="p-3">Cold-Chain Priority</th>
                      <th className="p-3 text-right">Free Threshold</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-stone-300">
                    {REGIONS.map((r) => (
                      <tr key={r.country} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3 font-medium text-white">{r.country}</td>
                        <td className="p-3 text-stone-400">{r.standard} ({r.rate})</td>
                        <td className="p-3 text-stone-400">{r.express}</td>
                        <td className="p-3 text-[#A7C769] font-medium">{r.coldchain}</td>
                        <td className="p-3 text-right font-bold text-[#8BA753]">{r.freeThreshold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive Rate & Transit Estimator */}
            <div className="p-5 bg-[#202422] rounded-xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Calculator className="w-4 h-4 text-[#8BA753]" />
                <span>Estimate Shipping to Your Location</span>
              </div>

              <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                    Country
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setCalcResult(null);
                    }}
                    className="w-full bg-[#161917] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#8BA753]"
                  >
                    {REGIONS.map((r) => (
                      <option key={r.country} value={r.country}>
                        {r.country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                    Postal / ZIP Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 90210 or SW1A 1AA"
                    value={calcZip}
                    onChange={(e) => setCalcZip(e.target.value)}
                    className="w-full bg-[#161917] border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-lg bg-[#86A352] hover:bg-[#97B85E] text-[#111413] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Calculate Rate
                  </button>
                </div>
              </form>

              {calcResult && (
                <div className="p-3 bg-[#172019] border border-[#8BA753]/30 rounded-lg flex items-start gap-2 text-xs text-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-[#8BA753] shrink-0 mt-0.5" />
                  <span>{calcResult}</span>
                </div>
              )}
            </div>

            {/* Customs & Returns Policy details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-400">
              <div className="p-4 bg-[#141715] rounded-xl border border-white/5 space-y-1.5">
                <h5 className="font-semibold text-white flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-[#8BA753]" /> Returns & Exchanges
                </h5>
                <p className="leading-relaxed">
                  Unopened tins can be returned within 30 days of arrival for a complete refund or exchange. Contact support@matchanova.com to receive a prepaid eco-friendly return label.
                </p>
              </div>

              <div className="p-4 bg-[#141715] rounded-xl border border-white/5 space-y-1.5">
                <h5 className="font-semibold text-white flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#8BA753]" /> Customs, Duties & Taxes
                </h5>
                <p className="leading-relaxed">
                  All international parcels ship Delivered Duty Paid (DDP). There are no surprise import brokerage fees or customs duties upon parcel delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-stone-400">
              Complimentary standard shipping on all orders over $60.
            </span>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-white/15 hover:bg-white/10 text-xs font-semibold text-stone-300 transition-colors cursor-pointer w-full sm:w-auto text-center"
              >
                Close Guide
              </button>
              {onOpenCheckout && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenCheckout();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#86A352] hover:bg-[#97B85E] text-[#111413] text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer w-full sm:w-auto text-center"
                >
                  Go to Checkout
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
