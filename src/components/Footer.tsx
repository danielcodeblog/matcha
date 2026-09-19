import React from 'react';
import { ArrowUp, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  onOpenFaq: () => void;
  onOpenContact: () => void;
  onOpenPhilosophy: () => void;
  onSelectShop: () => void;
  onNewsletterClick: () => void;
  onOpenShippingPolicy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenFaq,
  onOpenContact,
  onOpenPhilosophy,
  onSelectShop,
  onNewsletterClick,
  onOpenShippingPolicy,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#101211] text-stone-300 pt-20 pb-16 px-4 sm:px-8 md:px-12 lg:px-16 border-t border-white/5">
      <div className="max-w-[1520px] mx-auto">
        {/* Top Grid with 4 Link Columns & Center Scroll-To-Top Button */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 items-start">
          {/* Col 1: About us */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white">About us</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={onOpenPhilosophy} className="hover:text-white transition-colors cursor-pointer text-left">
                  Our Mission
                </button>
              </li>
              <li>
                <button onClick={onOpenPhilosophy} className="hover:text-white transition-colors cursor-pointer text-left">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={onOpenPhilosophy} className="hover:text-white transition-colors cursor-pointer text-left">
                  Sustainability
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white">Support</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={onOpenFaq} className="hover:text-white transition-colors cursor-pointer text-left">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors cursor-pointer text-left">
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenShippingPolicy || onOpenFaq}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shipping and Returns
                </button>
              </li>
            </ul>
          </div>

          {/* Center (Desktop) / Bottom (Mobile & Tablet): Circular Back to Top Button */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex justify-center order-last lg:order-none py-2 md:py-4 lg:py-0">
            <button
              id="footer-scroll-top-btn"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full border border-white/20 hover:border-[#8BA753] hover:text-[#8BA753] flex items-center justify-center text-stone-300 transition-all duration-300 group cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Col 3: SHOP */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase">SHOP</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={onSelectShop} className="hover:text-white transition-colors cursor-pointer text-left">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={onSelectShop} className="hover:text-white transition-colors cursor-pointer text-left">
                  Ceremonial Matcha
                </button>
              </li>
              <li>
                <button onClick={onSelectShop} className="hover:text-white transition-colors cursor-pointer text-left">
                  Latte Grade Matcha
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white">Support</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={onOpenPhilosophy} className="hover:text-white transition-colors cursor-pointer text-left">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={onOpenFaq} className="hover:text-white transition-colors cursor-pointer text-left">
                  Recipe
                </button>
              </li>
              <li>
                <a href="#benefits" className="hover:text-white transition-colors cursor-pointer text-left block">
                  Testimonials
                </a>
              </li>
              <li>
                <button onClick={onNewsletterClick} className="hover:text-[#8BA753] transition-colors cursor-pointer text-left">
                  Newsletter Signup
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Social & Legal Row */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-400">
          {/* Social Icons */}
          <div className="flex items-center space-x-6 text-stone-300">
            <a
              id="social-instagram"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#8BA753] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            {/* Custom X (Twitter) Icon */}
            <a
              id="social-x"
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#8BA753] transition-colors font-semibold"
              aria-label="X Twitter"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              id="social-youtube"
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#8BA753] transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright & Legal Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 text-stone-400 text-[11px] sm:text-xs">
            <span>2025 Matchanova. All right reserved</span>
            <button onClick={onOpenFaq} className="hover:text-white transition-colors cursor-pointer">
              Terms & Conditions
            </button>
            <button onClick={onOpenFaq} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
