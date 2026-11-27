import { About } from "./components/About";
import { CartBar } from "./components/CartBar";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { InfoSection } from "./components/InfoSection";
import { MenuSection } from "./components/MenuSection";
import { Navbar } from "./components/Navbar";
import { Toast } from "./components/Toast";
import { CartProvider } from "./context/CartContext";

/**
 * DZ LEGENDS PIZZA — online menu (static site, no backend).
 * Configuration: src/config.ts (contact, WhatsApp, hours)
 * Menu data:     src/data/menu.ts (categories, products, prices)
 */
export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <About />
        <InfoSection />
      </main>
      <Footer />
      <CartBar />
      <CartDrawer />
      <Toast />
    </CartProvider>
  );
}
