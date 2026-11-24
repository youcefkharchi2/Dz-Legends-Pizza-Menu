import { Clock, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { cn } from "../utils/cn";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#histoire", label: "Notre histoire" },
  { href: "#infos", label: "Horaires" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-ink/85 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          : "bg-gradient-to-b from-black/80 to-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#accueil"
          className="flex min-w-0 items-center gap-3"
          aria-label="DZ LEGENDS PIZZA — retour à l'accueil"
        >
          <Logo className="h-10 w-10" />
          <span className="font-display truncate text-lg uppercase tracking-wide">
            DZ <span className="text-brand">Legends</span>
            <span className="hidden text-white/60 sm:inline"> Pizza</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-semibold text-white/75 transition-colors duration-300 hover:text-brand after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-brand after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#infos"
            aria-label="Horaires et contact"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-brand/50 hover:text-brand md:hidden"
          >
            <Clock className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Ouvrir le panier, ${itemCount} article${itemCount > 1 ? "s" : ""}`}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-4 text-sm font-extrabold text-ink transition duration-300 hover:bg-brand-deep active:scale-95"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={2.4} />
            <span className="hidden sm:inline">Panier</span>
            <span
              key={itemCount}
              className={cn(
                "flex h-6 min-w-6 items-center justify-center rounded-full bg-ink px-1.5 text-xs font-bold text-brand",
                itemCount > 0 && "animate-bump",
              )}
            >
              {itemCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
