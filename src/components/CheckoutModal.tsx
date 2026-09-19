import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronLeft,
  Sparkles,
  MapPin,
  ExternalLink,
  Printer,
  ShoppingBag,
  Snowflake,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, ShippingAddress, ShippingMethod, PlacedOrder } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (order: PlacedOrder) => void;
  onOpenShippingPolicy: () => void;
}

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Ground Courier',
    time: '3–5 Business Days',
    description: 'Eco-conscious packaging with tracked delivery.',
    price: 6.0,
    minFreeThreshold: 60.0,
  },
  {
    id: 'express',
    name: 'Express Air Dispatch',
    time: '1–2 Business Days',
    description: 'Priority flight routing directly from our air hub.',
    price: 14.0,
  },
  {
    id: 'coldchain',
    name: 'Kyoto Cold-Chain Priority',
    time: 'Overnight Temperature-Controlled',
    description: 'Insulated thermal pouch with nitrogen seal preserving peak L-theanine & chlorophyll.',
    price: 22.0,
  },
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
  onOpenShippingPolicy,
}) => {
  // Checkout Steps: 1: Information, 2: Shipping, 3: Payment, 4: Confirmed
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Address Form State
  const [address, setAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Shipping Method
  const [selectedShippingId, setSelectedShippingId] = useState<'standard' | 'express' | 'coldchain'>('standard');

  // Payment Details
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'shop_pay'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [sameBilling, setSameBilling] = useState(true);

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Loading / Placement State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  if (!isOpen) return null;

  // Math Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscountPercent) / 100;

  const activeShippingMethod =
    SHIPPING_METHODS.find((m) => m.id === selectedShippingId) || SHIPPING_METHODS[0];

  const shippingCost =
    activeShippingMethod.id === 'standard' && subtotal >= (activeShippingMethod.minFreeThreshold || 60)
      ? 0
      : activeShippingMethod.price;

  const estimatedTax = (subtotal - discountAmount) * 0.07; // 7% sample sales tax
  const total = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  // Auto-fill Demo Data helper for instant testing
  const handleAutoFillDemo = () => {
    setAddress({
      firstName: 'Elena',
      lastName: 'Vance',
      email: 'elena.vance@example.com',
      phone: '+1 (415) 890-2341',
      addressLine1: '742 Evergreen Terrace',
      addressLine2: 'Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States',
    });
    setCardNumber('4532 •••• •••• 8821');
    setCardExpiry('08/28');
    setCardCvc('382');
    setCardName('Elena Vance');
    setFormErrors({});
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'WELCOME15') {
      setAppliedDiscountPercent(15);
      setPromoMessage({ text: '15% Welcome Discount Applied!', isError: false });
    } else if (code === 'MATCHA10') {
      setAppliedDiscountPercent(10);
      setPromoMessage({ text: '10% Matcha Lovers Discount Applied!', isError: false });
    } else if (code === 'FREESHIP') {
      setSelectedShippingId('standard');
      setPromoMessage({ text: 'Free standard shipping unlocked!', isError: false });
    } else {
      setPromoMessage({ text: 'Invalid promo code. Try WELCOME15 or MATCHA10', isError: true });
    }
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!address.firstName.trim()) errors.firstName = 'Required';
    if (!address.lastName.trim()) errors.lastName = 'Required';
    if (!address.email.trim() || !address.email.includes('@')) errors.email = 'Valid email required';
    if (!address.addressLine1.trim()) errors.addressLine1 = 'Street address required';
    if (!address.city.trim()) errors.city = 'City required';
    if (!address.state.trim()) errors.state = 'State / Region required';
    if (!address.zipCode.trim()) errors.zipCode = 'ZIP / Postal code required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    if (paymentMethod !== 'card') return true;
    const errors: Record<string, string> = {};
    if (!cardNumber.trim()) errors.cardNumber = 'Card number required';
    if (!cardExpiry.trim()) errors.cardExpiry = 'MM/YY required';
    if (!cardCvc.trim()) errors.cardCvc = 'CVC required';
    if (!cardName.trim()) errors.cardName = 'Cardholder name required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    if (!validateStep3()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomId = Math.floor(10000 + Math.random() * 90000);
      const trackingCode = `MN-KYO-${randomId}`;

      const order: PlacedOrder = {
        orderId: `MN-${randomId}`,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        items: [...cartItems],
        shippingAddress: address,
        shippingMethod: activeShippingMethod,
        subtotal,
        discount: discountAmount,
        shippingCost,
        tax: estimatedTax,
        total,
        trackingNumber: trackingCode,
        estimatedDelivery: activeShippingMethod.time,
      };

      setPlacedOrder(order);
      setIsSubmitting(false);
      setStep(4);
      onOrderSuccess(order);
    }, 1200);
  };

  const handleTrackFlight = () => {
    onClose();
    setTimeout(() => {
      const flightSection = document.getElementById('gsap-curved-motion');
      if (flightSection) {
        flightSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-5xl bg-[#141715] border border-white/15 rounded-2xl shadow-2xl text-stone-200 my-4 overflow-hidden flex flex-col max-h-[94vh]"
        >
          {/* Top Bar with Step Indicators & Close Button */}
          <div className="p-4 sm:p-6 border-b border-white/10 bg-[#181B19] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#8BA753] text-[#111413] font-bold text-xs flex items-center justify-center">
                MN
              </span>
              <div>
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                  MatchaNova Secure Checkout
                </h2>
                <div className="flex items-center gap-1.5 text-[11px] text-[#A7C769]">
                  <Lock className="w-3 h-3" />
                  <span>256-bit Encrypted SSL & Direct Kyoto Tea Estate Logistics</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="close-checkout-modal-btn"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stepper Progress Indicator (when not in confirmation) */}
          {step < 4 && (
            <div className="px-6 py-3 bg-[#1B1F1D] border-b border-white/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 sm:gap-6 w-full max-w-lg mx-auto justify-center">
                <button
                  onClick={() => setStep(1)}
                  className={`flex items-center gap-1.5 ${
                    step >= 1 ? 'text-[#8BA753] font-bold' : 'text-stone-500'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span className="hidden sm:inline">Address</span>
                </button>

                <div className={`h-0.5 flex-1 max-w-[40px] ${step >= 2 ? 'bg-[#8BA753]' : 'bg-stone-700'}`} />

                <button
                  onClick={() => step > 2 && setStep(2)}
                  className={`flex items-center gap-1.5 ${
                    step >= 2 ? 'text-[#8BA753] font-bold' : 'text-stone-500'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span className="hidden sm:inline">Shipping</span>
                </button>

                <div className={`h-0.5 flex-1 max-w-[40px] ${step >= 3 ? 'bg-[#8BA753]' : 'bg-stone-700'}`} />

                <div
                  className={`flex items-center gap-1.5 ${
                    step >= 3 ? 'text-[#8BA753] font-bold' : 'text-stone-500'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span className="hidden sm:inline">Payment</span>
                </div>
              </div>
            </div>
          )}

          {/* Body: 2 Columns on Desktop */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            {step === 4 && placedOrder ? (
              /* ORDER CONFIRMATION VIEW */
              <div className="max-w-2xl mx-auto py-6 sm:py-10 space-y-6 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-950/80 border-2 border-[#8BA753] mx-auto flex items-center justify-center text-[#8BA753] shadow-2xl"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#8BA753]">
                    Order Confirmed • Preparation in Progress
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wide text-white mt-1">
                    Thank You, {placedOrder.shippingAddress.firstName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-md mx-auto">
                    Your freshly ground ceremonial matcha order{' '}
                    <span className="font-mono font-bold text-white">#{placedOrder.orderId}</span> is now being freshly vacuum-sealed at our Uji facility.
                  </p>
                </div>

                {/* Tracking & Telemetry Highlight Card */}
                <div className="p-5 sm:p-6 bg-[#1D211F] rounded-2xl border border-white/10 text-left space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-white/10">
                    <div>
                      <div className="text-[11px] font-mono uppercase text-stone-400">
                        Dispatch Tracking Code
                      </div>
                      <div className="text-base font-mono font-bold text-[#A7C769]">
                        {placedOrder.trackingNumber}
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-[11px] font-mono uppercase text-stone-400">
                        Estimated Delivery
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {placedOrder.estimatedDelivery}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-stone-400 mb-1">Destination Address:</div>
                      <div className="text-white font-medium">
                        {placedOrder.shippingAddress.addressLine1}
                        {placedOrder.shippingAddress.addressLine2 && `, ${placedOrder.shippingAddress.addressLine2}`}
                      </div>
                      <div className="text-stone-300">
                        {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.state}{' '}
                        {placedOrder.shippingAddress.zipCode}
                      </div>
                    </div>
                    <div>
                      <div className="text-stone-400 mb-1">Shipping Tier:</div>
                      <div className="text-white font-medium">{placedOrder.shippingMethod.name}</div>
                      <div className="text-[#8BA753] text-[11px]">
                        Insulated Air Transport • Kyoto Dispatch Hub
                      </div>
                    </div>
                  </div>

                  {/* Flight Telemetry Button */}
                  <div className="pt-2">
                    <button
                      onClick={handleTrackFlight}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2A3420] to-[#1E2519] border border-[#8BA753]/40 hover:border-[#8BA753] text-[#A7C769] hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer group"
                    >
                      <Truck className="w-4 h-4 text-[#8BA753]" />
                      <span>Live Track via Kyoto Flight Radar Telemetry</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/15 hover:bg-white/10 text-xs font-semibold text-stone-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-8 py-2.5 rounded-full bg-[#86A352] hover:bg-[#97B85E] text-[#111413] text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
                  >
                    Continue Exploring
                  </button>
                </div>
              </div>
            ) : (
              /* 2-COLUMN CHECKOUT FORM & SUMMARY */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Side: Steps (Address, Shipping, Payment) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* STEP 1: CONTACT & SHIPPING ADDRESS */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <h3 className="text-base font-bold uppercase tracking-wider text-white flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#8BA753]" />
                          1. Contact & Shipping Address
                        </h3>
                        <button
                          type="button"
                          onClick={handleAutoFillDemo}
                          className="sm:hidden text-xs text-[#8BA753] underline font-medium"
                        >
                          Auto-fill Demo
                        </button>
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            placeholder="you@domain.com"
                            value={address.email}
                            onChange={(e) => setAddress({ ...address, email: e.target.value })}
                            className={`w-full bg-[#1A1E1C] border ${
                              formErrors.email ? 'border-red-500' : 'border-white/15'
                            } rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]`}
                          />
                          {formErrors.email && (
                            <p className="text-[10px] text-red-400 mt-1">{formErrors.email}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={address.phone}
                            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                            className="w-full bg-[#1A1E1C] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]"
                          />
                        </div>
                      </div>

                      {/* Names */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                            First Name *
                          </label>
                          <input
                            type="text"
                            placeholder="First name"
                            value={address.firstName}
                            onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                            className={`w-full bg-[#1A1E1C] border ${
                              formErrors.firstName ? 'border-red-500' : 'border-white/15'
                            } rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]`}
                          />
                          {formErrors.firstName && (
                            <p className="text-[10px] text-red-400 mt-1">{formErrors.firstName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            placeholder="Last name"
                            value={address.lastName}
                            onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                            className={`w-full bg-[#1A1E1C] border ${
                              formErrors.lastName ? 'border-red-500' : 'border-white/15'
                            } rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]`}
                          />
                          {formErrors.lastName && (
                            <p className="text-[10px] text-red-400 mt-1">{formErrors.lastName}</p>
                          )}
                        </div>
                      </div>

                      {/* Address Line 1 & 2 */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            placeholder="Street address or P.O. Box"
                            value={address.addressLine1}
                            onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                            className={`w-full bg-[#1A1E1C] border ${
                              formErrors.addressLine1 ? 'border-red-500' : 'border-white/15'
                            } rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]`}
                          />
                          {formErrors.addressLine1 && (
                            <p className="text-[10px] text-red-400 mt-1">{formErrors.addressLine1}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                            Apartment, Suite, Unit (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="Apt, Suite, Floor, etc."
                            value={address.addressLine2}
                            onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                            className="w-full bg-[#1A1E1C] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]"
                          />
                        </div>
                      </div>

                      {/* City, State, ZIP */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            placeholder="City"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            className={`w-full bg-[#1A1E1C] border ${
                              formErrors.city ? 'border-red-500' : 'border-white/15'
                            } rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]`}
                          />
                          {formErrors.city && (
                            <p className="text-[10px] text-red-400 mt-1">{formErrors.city}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                            State / Province *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. CA or Ontario"
                            value={address.state}
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            className={`w-full bg-[#1A1E1C] border ${
                              formErrors.state ? 'border-red-500' : 'border-white/15'
                            } rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]`}
                          />
                          {formErrors.state && (
                            <p className="text-[10px] text-red-400 mt-1">{formErrors.state}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                            Postal / ZIP *
                          </label>
                          <input
                            type="text"
                            placeholder="ZIP code"
                            value={address.zipCode}
                            onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                            className={`w-full bg-[#1A1E1C] border ${
                              formErrors.zipCode ? 'border-red-500' : 'border-white/15'
                            } rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]`}
                          />
                          {formErrors.zipCode && (
                            <p className="text-[10px] text-red-400 mt-1">{formErrors.zipCode}</p>
                          )}
                        </div>
                      </div>

                      {/* Country */}
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                          Country / Region
                        </label>
                        <select
                          value={address.country}
                          onChange={(e) => setAddress({ ...address, country: e.target.value })}
                          className="w-full bg-[#1A1E1C] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#8BA753]"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Japan">Japan (日本)</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                        </select>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#86A352] hover:bg-[#97B85E] text-[#111413] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                        >
                          <span>Continue to Shipping</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: SHIPPING METHOD SELECTION */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <h3 className="text-base font-bold uppercase tracking-wider text-white flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#8BA753]" />
                          2. Select Shipping Method
                        </h3>
                        <button
                          onClick={onOpenShippingPolicy}
                          className="text-xs text-[#8BA753] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>View Shipping Policy</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Delivery Address Summary pill */}
                      <div className="p-3.5 bg-[#1B1F1D] rounded-xl border border-white/5 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-stone-400">Ship to: </span>
                          <span className="text-white font-medium">
                            {address.addressLine1}, {address.city}, {address.state}
                          </span>
                        </div>
                        <button
                          onClick={() => setStep(1)}
                          className="text-[#8BA753] text-[11px] underline ml-2 shrink-0 cursor-pointer"
                        >
                          Change
                        </button>
                      </div>

                      {/* Shipping Options */}
                      <div className="space-y-3">
                        {SHIPPING_METHODS.map((method) => {
                          const isFree =
                            method.id === 'standard' &&
                            subtotal >= (method.minFreeThreshold || 60);
                          const isSelected = selectedShippingId === method.id;

                          return (
                            <label
                              key={method.id}
                              onClick={() => setSelectedShippingId(method.id)}
                              className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-[#202722] border-[#8BA753] shadow-lg ring-1 ring-[#8BA753]'
                                  : 'bg-[#181B19] border-white/10 hover:border-white/20'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <input
                                  type="radio"
                                  name="shippingMethod"
                                  checked={isSelected}
                                  onChange={() => setSelectedShippingId(method.id)}
                                  className="mt-1 accent-[#8BA753]"
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm font-bold text-white">
                                      {method.name}
                                    </span>
                                    {method.id === 'coldchain' && (
                                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-semibold text-[#A7C769] flex items-center gap-1">
                                        <Snowflake className="w-2.5 h-2.5" /> Nitrogen Sealed
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-stone-300 font-medium mt-0.5">
                                    {method.time}
                                  </p>
                                  <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                                    {method.description}
                                  </p>
                                </div>
                              </div>

                              <div className="text-right shrink-0">
                                <span
                                  className={`text-xs sm:text-sm font-bold ${
                                    isFree ? 'text-[#8BA753]' : 'text-white'
                                  }`}
                                >
                                  {isFree ? 'FREE' : `$${method.price.toFixed(2)}`}
                                </span>
                              </div>
                            </label>
                          );
                        })}
                      </div>

                      {/* Carbon-neutral & fresh logistics notice */}
                      <div className="p-3 bg-[#172019] rounded-xl border border-[#8BA753]/20 flex items-center gap-2.5 text-xs text-stone-300">
                        <Clock className="w-4 h-4 text-[#8BA753] shrink-0" />
                        <span>
                          Orders dispatch daily at 2:00 PM JST / EST directly from cold storage facilities.
                        </span>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Return to Address</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-8 py-3 rounded-full bg-[#86A352] hover:bg-[#97B85E] text-[#111413] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
                        >
                          <span>Continue to Payment</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: PAYMENT METHOD */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <h3 className="text-base font-bold uppercase tracking-wider text-white flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#8BA753]" />
                          3. Payment Details
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] text-stone-400">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#8BA753]" />
                          <span>Guaranteed Secure</span>
                        </div>
                      </div>

                      {/* Payment Method Tabs */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            paymentMethod === 'card'
                              ? 'bg-[#202722] border-[#8BA753] text-white shadow-md'
                              : 'bg-[#181B19] border-white/10 text-stone-400 hover:text-white'
                          }`}
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Credit Card</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('apple_pay')}
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                            paymentMethod === 'apple_pay'
                              ? 'bg-[#202722] border-[#8BA753] text-white'
                              : 'bg-[#181B19] border-white/10 text-stone-400 hover:text-white'
                          }`}
                        >
                          Apple Pay
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('google_pay')}
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                            paymentMethod === 'google_pay'
                              ? 'bg-[#202722] border-[#8BA753] text-white'
                              : 'bg-[#181B19] border-white/10 text-stone-400 hover:text-white'
                          }`}
                        >
                          Google Pay
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('shop_pay')}
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                            paymentMethod === 'shop_pay'
                              ? 'bg-[#202722] border-[#8BA753] text-white'
                              : 'bg-[#181B19] border-white/10 text-stone-400 hover:text-white'
                          }`}
                        >
                          Shop Pay
                        </button>
                      </div>

                      {/* Card Form */}
                      {paymentMethod === 'card' ? (
                        <div className="p-4 sm:p-5 bg-[#181B19] rounded-xl border border-white/10 space-y-4">
                          <div>
                            <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                              Card Number *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="4000 1234 5678 9010"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                maxLength={19}
                                className={`w-full bg-[#141715] border ${
                                  formErrors.cardNumber ? 'border-red-500' : 'border-white/15'
                                } rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]`}
                              />
                              <CreditCard className="w-4 h-4 text-stone-500 absolute right-3 top-3 pointer-events-none" />
                            </div>
                            {formErrors.cardNumber && (
                              <p className="text-[10px] text-red-400 mt-1">{formErrors.cardNumber}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                                Expiration *
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                maxLength={5}
                                className={`w-full bg-[#141715] border ${
                                  formErrors.cardExpiry ? 'border-red-500' : 'border-white/15'
                                } rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]`}
                              />
                              {formErrors.cardExpiry && (
                                <p className="text-[10px] text-red-400 mt-1">{formErrors.cardExpiry}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                                Security CVC *
                              </label>
                              <input
                                type="text"
                                placeholder="CVC"
                                value={cardCvc}
                                onChange={(e) => setCardCvc(e.target.value)}
                                maxLength={4}
                                className={`w-full bg-[#141715] border ${
                                  formErrors.cardCvc ? 'border-red-500' : 'border-white/15'
                                } rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]`}
                              />
                              {formErrors.cardCvc && (
                                <p className="text-[10px] text-red-400 mt-1">{formErrors.cardCvc}</p>
                              )}
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                              <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                                Cardholder *
                              </label>
                              <input
                                type="text"
                                placeholder="Full Name"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                className={`w-full bg-[#141715] border ${
                                  formErrors.cardName ? 'border-red-500' : 'border-white/15'
                                } rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]`}
                              />
                              {formErrors.cardName && (
                                <p className="text-[10px] text-red-400 mt-1">{formErrors.cardName}</p>
                              )}
                            </div>
                          </div>

                          <label className="flex items-center gap-2 cursor-pointer pt-2">
                            <input
                              type="checkbox"
                              checked={sameBilling}
                              onChange={(e) => setSameBilling(e.target.checked)}
                              className="accent-[#8BA753] rounded"
                            />
                            <span className="text-xs text-stone-300">
                              Billing address same as shipping address
                            </span>
                          </label>
                        </div>
                      ) : (
                        <div className="p-6 bg-[#181B19] rounded-xl border border-white/10 text-center space-y-2">
                          <p className="text-xs text-stone-300">
                            You'll be prompted to complete authentication via {paymentMethod === 'apple_pay' ? 'Apple Pay' : paymentMethod === 'google_pay' ? 'Google Pay' : 'Shop Pay'}.
                          </p>
                          <p className="text-[11px] text-[#8BA753]">
                            Express 1-click tokenized authorization enabled.
                          </p>
                        </div>
                      )}

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Return to Shipping</span>
                        </button>

                        <button
                          type="button"
                          id="place-order-submit-btn"
                          disabled={isSubmitting}
                          onClick={handlePlaceOrder}
                          className="px-8 py-3.5 rounded-full bg-[#86A352] hover:bg-[#97B85E] text-[#111413] text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl transition-all cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span>Authorizing Order...</span>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5" />
                              <span>Complete Order • ${total.toFixed(2)} USD</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side: Order Summary & Coupon */}
                <div className="lg:col-span-5 bg-[#181B19] p-5 sm:p-6 rounded-2xl border border-white/10 space-y-5 sticky top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-[#8BA753]" />
                      Order Summary ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                    </h4>
                  </div>

                  {/* Cart Item Row List */}
                  <div className="max-h-56 overflow-y-auto space-y-3 pr-1 divide-y divide-white/5">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                        <div className="relative">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-12 h-12 rounded-lg object-cover bg-stone-900 border border-white/10"
                          />
                          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#86A352] text-[#111413] text-[10px] font-bold flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-semibold text-white truncate">
                            {item.product.title}
                          </h5>
                          {item.selectedOption && (
                            <p className="text-[10px] text-[#8BA753] truncate">{item.selectedOption}</p>
                          )}
                        </div>
                        <span className="text-xs font-bold text-white shrink-0">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2 pt-2 border-t border-white/10">
                    <input
                      type="text"
                      placeholder="Promo Code (WELCOME15)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-[#141715] border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#8BA753]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {promoMessage && (
                    <p
                      className={`text-[11px] font-medium ${
                        promoMessage.isError ? 'text-red-400' : 'text-[#8BA753]'
                      }`}
                    >
                      {promoMessage.text}
                    </p>
                  )}

                  {/* Price Calculations Breakdown */}
                  <div className="space-y-2 text-xs text-stone-300 pt-3 border-t border-white/10">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Subtotal</span>
                      <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                    </div>

                    {appliedDiscountPercent > 0 && (
                      <div className="flex justify-between text-[#8BA753]">
                        <span>Promo Discount ({appliedDiscountPercent}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-stone-400">Shipping ({activeShippingMethod.name.split(' ')[0]})</span>
                      <span className="text-white font-medium">
                        {shippingCost === 0 ? (
                          <span className="text-[#8BA753] font-bold">FREE</span>
                        ) : (
                          `$${shippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-stone-400">Estimated Sales Tax</span>
                      <span className="text-white font-medium">${estimatedTax.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/15">
                      <span>Total Amount</span>
                      <span className="text-[#A7C769] font-mono">${total.toFixed(2)} USD</span>
                    </div>
                  </div>

                  {/* Assurance Badges */}
                  <div className="pt-2 text-[11px] text-stone-400 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8BA753] shrink-0" />
                      <span>30-Day Freshness Serenity Guarantee</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Snowflake className="w-3.5 h-3.5 text-[#8BA753] shrink-0" />
                      <span>Certified Cold-Chain & Nitrogen Packaging</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
