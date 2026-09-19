import React, { useState, useEffect } from 'react';
import { ShoppingBag, Check, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenFaq: () => void;
  onOpenContact: () => void;
  onOpenShipping?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const LOGO_LETTERS = ['M', 'A', 'T', 'C', 'H', 'A', 'N', 'O', 'V', 'A'];

const logoContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.15,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 14,
    scale: 0.9,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
};

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenFaq,
  onOpenContact,
  onOpenShipping,
  activeTab,
  setActiveTab,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll to enhance glassmorphism on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('WELCOME15');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2400);
  };

  const scrollToSection = (id: string, tabName: string) => {
    setActiveTab(tabName);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full z-40 sticky top-0 transition-all duration-300">
      {/* Top Banner - Responsive on all screen sizes */}
      <div
        onClick={handleCopyCode}
        className="w-full bg-[#EFECE6] text-[#222523] text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.14em] sm:tracking-[0.16em] uppercase py-2 sm:py-2.5 px-3 sm:px-4 text-center border-b border-black/5 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer hover:bg-[#EAE6DF] transition-colors select-none"
        title="Click to copy promo code WELCOME15"
      >
        {/* Mobile short version */}
        <span className="inline sm:hidden truncate">
          15% OFF YOUR FIRST ORDER • CODE: WELCOME15
        </span>
        {/* Tablet & Desktop full version */}
        <span className="hidden sm:inline">
          EXCLUSIVE WELCOME OFFER: ENJOY 15% OFF YOUR FIRST PREMIUM MATCHA ORDER!
        </span>

        {copiedCode ? (
          <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] tracking-widest font-bold text-[#6D8A3A] ml-1.5 shrink-0">
            <Check className="w-3 h-3 stroke-[2.5]" />
            COPIED
          </span>
        ) : (
          <span className="text-[9px] sm:text-[10px] tracking-wider text-stone-500 font-normal underline underline-offset-2 ml-1 hidden xs:inline shrink-0">
            TAP TO COPY
          </span>
        )}
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 border-b border-white/5 text-stone-200 px-4 sm:px-8 md:px-12 lg:px-16 ${
          isScrolled
            ? 'bg-[#111413]/95 backdrop-blur-md py-3.5 sm:py-4 shadow-xl'
            : 'bg-[#111413] py-4 sm:py-5'
        }`}
      >
        <div className="max-w-[1520px] mx-auto flex items-center justify-between relative">
          {/* Mobile & Tablet: Hamburger Button */}
          <div className="flex lg:hidden items-center">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2 -ml-2 text-stone-300 hover:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors flex items-center gap-1.5"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium hidden xs:inline">
                {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
            </button>
          </div>

          {/* Desktop Left Navigation Links (Visible on lg and up) */}
          <div className="hidden lg:flex items-center space-x-6 lg:space-x-8 text-xs tracking-[0.2em] font-medium">
            <button
              id="nav-home-btn"
              onClick={() => scrollToSection('hero', 'HOME')}
              className={`transition-colors uppercase cursor-pointer py-1 ${
                activeTab === 'HOME' ? 'text-[#8BA753] font-semibold' : 'text-stone-300 hover:text-white'
              }`}
            >
              HOME
            </button>
            <button
              id="nav-about-btn"
              onClick={() => scrollToSection('about', 'ABOUT')}
              className={`transition-colors uppercase cursor-pointer py-1 ${
                activeTab === 'ABOUT' ? 'text-[#8BA753] font-semibold' : 'text-stone-300 hover:text-white'
              }`}
            >
              ABOUT
            </button>
            <button
              id="nav-shop-btn"
              onClick={() => scrollToSection('collections', 'SHOP')}
              className={`transition-colors uppercase cursor-pointer py-1 ${
                activeTab === 'SHOP' ? 'text-[#8BA753] font-semibold' : 'text-stone-300 hover:text-white'
              }`}
            >
              SHOP
            </button>
          </div>

          {/* Brand Logo - Centered dynamically on all viewports */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto">
            <motion.a
              id="brand-logo"
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero', 'HOME');
              }}
              variants={logoContainerVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              className="group relative flex flex-col items-center justify-center text-sm sm:text-base md:text-xl font-bold tracking-[0.22em] sm:tracking-[0.28em] text-white whitespace-nowrap select-none cursor-pointer py-1 overflow-hidden"
            >
              {/* Staggered Animated Letters on Mount / Refresh */}
              <motion.span
                className="relative z-10 flex items-center transition-colors duration-300 group-hover:text-[#B4D868] drop-shadow-sm"
                variants={{
                  hover: {
                    letterSpacing: '0.32em',
                    scale: 1.03,
                  },
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {LOGO_LETTERS.map((char, index) => (
                  <motion.span
                    key={`${char}-${index}`}
                    variants={letterVariants}
                    className="inline-block origin-bottom"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>

              {/* Shimmer Light Glint that sweeps across the letters after they reveal */}
              <motion.div
                initial={{ x: '-150%', opacity: 0 }}
                animate={{ x: '250%', opacity: [0, 0.9, 0] }}
                transition={{ delay: 0.8, duration: 1.0, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-22deg] pointer-events-none z-20"
              />

              {/* Animated glowing under-line that expands smoothly from the center */}
              <motion.span
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#8BA753] to-transparent rounded-full pointer-events-none"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: ['0%', '30%', '0%'], opacity: [0, 0.8, 0] }}
                variants={{
                  hover: { width: '85%', opacity: 1 },
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.6,
                  ease: 'easeOut',
                }}
              />

              {/* Atmospheric subtle matcha bloom mist on entrance and hover */}
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [0.6, 1.25, 0.8], opacity: [0, 0.35, 0] }}
                transition={{ delay: 0.25, duration: 1.2, ease: 'easeOut' }}
                className="absolute inset-0 -inset-x-4 bg-[#8BA753]/25 blur-lg rounded-full pointer-events-none"
              />
              <span className="absolute inset-0 -inset-x-3 bg-[#8BA753]/15 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.a>
          </div>

          {/* Right Navigation Links & Cart Button */}
          <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8 text-xs tracking-[0.2em] font-medium">
            <button
              id="nav-faq-btn"
              onClick={onOpenFaq}
              className="text-stone-300 hover:text-white transition-colors uppercase hidden lg:inline-block py-1 cursor-pointer"
            >
              FAQ
            </button>
            <button
              id="nav-contact-btn"
              onClick={onOpenContact}
              className="text-stone-300 hover:text-white transition-colors uppercase hidden lg:inline-block py-1 cursor-pointer"
            >
              CONTACT
            </button>

            {/* Shopping Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="group flex items-center space-x-1.5 text-stone-200 hover:text-white transition-colors uppercase cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
              aria-label={`View Shopping Cart (${cartCount} items)`}
            >
              <span className="text-[11px] sm:text-xs tracking-widest font-semibold">
                CART({cartCount})
              </span>
              <ShoppingBag className="w-3.5 h-3.5 text-[#8BA753] group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile & Tablet Navigation Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden w-full bg-[#141816] border-b border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-6 space-y-4">
              {/* Primary Section Links */}
              <div className="flex flex-col space-y-3 font-medium tracking-[0.2em] text-xs">
                <button
                  onClick={() => scrollToSection('hero', 'HOME')}
                  className={`flex items-center justify-between py-2 text-left uppercase transition-colors ${
                    activeTab === 'HOME' ? 'text-[#8BA753] font-bold' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span>HOME</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </button>
                <button
                  onClick={() => scrollToSection('about', 'ABOUT')}
                  className={`flex items-center justify-between py-2 text-left uppercase transition-colors ${
                    activeTab === 'ABOUT' ? 'text-[#8BA753] font-bold' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span>ABOUT MATCHANOVA</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </button>
                <button
                  onClick={() => scrollToSection('collections', 'SHOP')}
                  className={`flex items-center justify-between py-2 text-left uppercase transition-colors ${
                    activeTab === 'SHOP' ? 'text-[#8BA753] font-bold' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span>SHOP COLLECTIONS</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </button>
                <button
                  onClick={() => scrollToSection('purity-section', 'PURITY')}
                  className="flex items-center justify-between py-2 text-left uppercase text-stone-300 hover:text-white transition-colors"
                >
                  <span>WHERE PURITY BEGINS</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </button>
                <button
                  onClick={() => scrollToSection('gsap-curved-motion', 'TRANSIT')}
                  className="flex items-center justify-between py-2 text-left uppercase text-[#A5C963] hover:text-white transition-colors font-semibold"
                >
                  <span>LIVE HARVEST TRANSIT</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-70" />
                </button>
              </div>

              {/* Utility Modals */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs tracking-widest uppercase">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenFaq();
                  }}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-center text-stone-300 hover:text-white transition-colors border border-white/5"
                >
                  FAQ & Care
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-center text-stone-300 hover:text-white transition-colors border border-white/5"
                >
                  Contact Us
                </button>
              </div>

              {/* Quick Promo Copy Card */}
              <div
                onClick={handleCopyCode}
                className="mt-4 p-3.5 rounded-xl bg-[#191F1B] border border-[#8BA753]/30 flex items-center justify-between cursor-pointer"
              >
                <div>
                  <span className="text-[10px] text-[#A5C963] font-bold tracking-widest block uppercase">
                    WELCOME CODE: WELCOME15
                  </span>
                  <span className="text-[11px] text-stone-400">
                    Tap to copy 15% discount for checkout
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-[#8BA753] text-[#111413] text-[10px] font-bold rounded-lg tracking-wider">
                  {copiedCode ? 'COPIED' : 'COPY'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
