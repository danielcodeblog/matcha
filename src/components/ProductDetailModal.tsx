import React, { useState } from 'react';
import { X, Check, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, option?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedOption, setSelectedOption] = useState<string>(
    product.options && product.options.length > 0 ? product.options[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedOption);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#1C201E] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-stone-200 my-8"
        >
          {/* Close button */}
          <button
            id="close-product-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 text-stone-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Product Image */}
            <div className="w-full aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/40 shadow-xl">
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-xs">
                <div className="flex items-center gap-1 text-[#DDA83B]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 20 20"
                      className="w-3.5 h-3.5 fill-[#DDA83B]"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-stone-400 ml-1.5 font-medium">({product.reviewsCount} reviews)</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white mt-2">
                {product.title}
              </h3>
              <p className="text-xs text-stone-400 mt-1">{product.subtitle}</p>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#A7C769]">
                  ${product.price}.00
                </span>
                {product.originalPrice && (
                  <span className="text-xs line-through text-stone-500">
                    ${product.originalPrice}.00
                  </span>
                )}
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#8BA753]/20 text-[#8BA753]">
                  Fresh Harvest
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Options selector */}
              {product.options && product.options.length > 0 && (
                <div className="mt-5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                    Select Grade / Format
                  </label>
                  <div className="space-y-1.5">
                    {product.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between border ${
                          selectedOption === opt
                            ? 'border-[#8BA753] bg-[#8BA753]/15 text-white font-medium'
                            : 'border-white/10 bg-[#161917] text-stone-400 hover:text-white'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedOption === opt && <Check className="w-3.5 h-3.5 text-[#8BA753]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasting Notes */}
              {product.tastingNotes && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {product.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="text-[10px] tracking-wider px-2.5 py-1 rounded-full bg-stone-800 text-stone-300 border border-white/5"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions: Quantity & Add to Cart */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                <div className="flex items-center border border-white/15 rounded-full bg-[#161917] px-3 py-1.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-stone-400 hover:text-white px-1 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-stone-400 hover:text-white px-1 text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  id="add-to-cart-action-btn"
                  onClick={handleAdd}
                  disabled={addedSuccess}
                  className="flex-1 py-3 px-6 rounded-full bg-[#86A352] hover:bg-[#96B55E] text-[#111413] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart (${(product.price * quantity).toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
