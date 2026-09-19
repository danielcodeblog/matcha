import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout?: () => void;
  onOpenShippingPolicy?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart: _onClearCart,
  onProceedToCheckout,
  onOpenShippingPolicy,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 60;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const discountAmount = (subtotal * appliedDiscount) / 100;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 6;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'WELCOME15') {
      setAppliedDiscount(15);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try WELCOME15');
    }
  };

  const handleCheckoutClick = () => {
    onClose();
    if (onProceedToCheckout) {
      onProceedToCheckout();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#161917] border-l border-white/10 text-stone-200 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold tracking-wider uppercase text-white">Your Cart</h2>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items selected
                  </p>
                </div>
                <button
                  id="close-cart-btn"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress */}
              <div className="px-6 py-3 bg-[#1C201E] border-b border-white/5 text-xs">
                <div className="flex items-center justify-between">
                  {amountToFreeShipping === 0 ? (
                    <div className="text-[#8BA753] font-medium flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> You've unlocked Complimentary Express Shipping!
                    </div>
                  ) : (
                    <div className="text-stone-300">
                      Add <span className="font-semibold text-white">${amountToFreeShipping.toFixed(2)}</span> more for Free Shipping
                    </div>
                  )}
                  {onOpenShippingPolicy && (
                    <button
                      onClick={onOpenShippingPolicy}
                      className="text-[11px] text-stone-400 hover:text-[#8BA753] flex items-center gap-1 transition-colors cursor-pointer shrink-0 ml-2"
                      title="View Shipping Policy"
                    >
                      <Truck className="w-3 h-3" />
                      <span className="hidden sm:inline">Policy</span>
                    </button>
                  )}
                </div>
                <div className="w-full h-1.5 bg-stone-700/60 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-[#86A352] transition-all duration-300 rounded-full"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="py-16 text-center text-stone-400 space-y-3">
                    <p className="text-sm font-light">Your basket is currently empty.</p>
                    <button
                      onClick={onClose}
                      className="px-5 py-2 rounded-full bg-[#86A352] text-[#111413] text-xs font-semibold uppercase tracking-wider"
                    >
                      Explore Matcha
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 bg-[#202422] rounded-xl border border-white/5"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        referrerPolicy="no-referrer"
                        className="w-18 h-18 rounded-lg object-cover flex-shrink-0 bg-stone-900 border border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.selectedOption && (
                          <p className="text-[11px] text-[#8BA753] mt-0.5 truncate">
                            {item.selectedOption}
                          </p>
                        )}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs font-bold text-white">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <div className="flex items-center border border-white/15 rounded-md bg-[#161917]">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="px-2 py-1 text-stone-400 hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-medium text-stone-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="px-2 py-1 text-stone-400 hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#141715] space-y-4">
                  {/* Coupon Code Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Promo code (WELCOME15)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full bg-[#1F2321] border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#8BA753]"
                      />
                      <Tag className="w-3.5 h-3.5 text-stone-500 absolute right-3 top-2.5 pointer-events-none" />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-lg text-white transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  {appliedDiscount > 0 && (
                    <p className="text-[11px] text-[#8BA753] font-medium">
                      15% Welcome Discount Applied!
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-red-400 font-medium">{promoError}</p>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-stone-400 pt-2 border-t border-white/5">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-stone-200 font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-[#8BA753]">
                        <span>Welcome Discount (15%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span className="text-stone-200 font-medium">
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                      <span>Estimated Total</span>
                      <span className="text-[#A7C769]">${total.toFixed(2)} USD</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    id="cart-checkout-btn"
                    onClick={handleCheckoutClick}
                    className="w-full py-3 rounded-full bg-[#86A352] hover:bg-[#96B55E] text-[#111413] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
                  >
                    <span>Proceed To Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
