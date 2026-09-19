import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InterludeBanner } from './components/InterludeBanner';
import { AboutSection } from './components/AboutSection';
import { FunFactsSection } from './components/FunFactsSection';
import { CollectionsSection } from './components/CollectionsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WherePurityBeginsSection } from './components/WherePurityBeginsSection';
import { LandoNorrisMotionExperience } from './components/LandoNorrisMotionExperience';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PhilosophyModal } from './components/PhilosophyModal';
import { FaqModal } from './components/FaqModal';
import { ContactModal } from './components/ContactModal';
import { NewsletterModal } from './components/NewsletterModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ShippingPolicyModal } from './components/ShippingPolicyModal';
import { Product, CartItem, PlacedOrder } from './types';
import { PRODUCTS } from './data/content';

export default function App() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Ceremonial Matcha Powder
      quantity: 1,
      selectedOption: 'Ceremonial Grade (30g Tin)',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPhilosophyOpen, setIsPhilosophyOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isShippingPolicyOpen, setIsShippingPolicyOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product, quantity: number, option?: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedOption === option
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedOption === option
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedOption: option }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToCollections = () => {
    const el = document.getElementById('collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveTab('SHOP');
    }
  };

  return (
    <div className="min-h-screen bg-[#111413] text-stone-100 flex flex-col selection:bg-[#7D9B4A] selection:text-white">
      {/* Top Banner & Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFaq={() => setIsFaqOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenShipping={() => setIsShippingPolicyOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Page Layout matching exact design */}
      <main className="flex-1 w-full">
        {/* Hero: "THE ART OF MATCHA" */}
        <Hero onDiscover={scrollToCollections} />

        {/* Slogan Interlude: "PREMIUM [leaf] MATCHA SUSTAINED FOCUS" */}
        <InterludeBanner />

        {/* Section: "WHAT IS MATCHANOVA?" */}
        <AboutSection onExplorePhilosophy={() => setIsPhilosophyOpen(true)} />

        {/* Section: "FUNFACT ABOUT MATCHA" (3 Cards) */}
        <FunFactsSection />

        {/* Section: "MATCHA COLLECTIONS" (4 Dark Cards) */}
        <CollectionsSection onSelectProduct={(product) => setSelectedProduct(product)} />

        {/* Lando Norris Signature GSAP Curved Path Animation & Telemetry Experience */}
        <LandoNorrisMotionExperience />

        {/* Section: "WHAT OUR CUSTOMER SAY" (2 Testimonials with 5 Stars) */}
        <TestimonialsSection />

        {/* Section: "WHERE PURITY BEGINS" & Giant MATCHANOVA Watermark */}
        <WherePurityBeginsSection />
      </main>

      {/* Footer with Links, Scroll-to-Top, and Legal notices */}
      <Footer
        onOpenFaq={() => setIsFaqOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenPhilosophy={() => setIsPhilosophyOpen(true)}
        onSelectShop={scrollToCollections}
        onNewsletterClick={() => setIsNewsletterOpen(true)}
        onOpenShippingPolicy={() => setIsShippingPolicyOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onOpenShippingPolicy={() => setIsShippingPolicyOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={(_order: PlacedOrder) => {
          handleClearCart();
        }}
        onOpenShippingPolicy={() => setIsShippingPolicyOpen(true)}
      />

      {/* Shipping & Delivery Policy Modal */}
      <ShippingPolicyModal
        isOpen={isShippingPolicyOpen}
        onClose={() => setIsShippingPolicyOpen(false)}
        onOpenCheckout={() => {
          setIsShippingPolicyOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Philosophy & Heritage Modal */}
      <PhilosophyModal
        isOpen={isPhilosophyOpen}
        onClose={() => setIsPhilosophyOpen(false)}
      />

      {/* FAQ Modal */}
      <FaqModal
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />
    </div>
  );
}
