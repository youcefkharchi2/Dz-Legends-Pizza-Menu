import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { cn } from "../utils/cn";
import { formatPrice } from "../utils/format";

/** Floating summary bar shown at the bottom of the screen when the cart is not empty */
export function CartBar() {
  const { itemCount, subtotal, isOpen, openCart } = useCart();
  const visible = itemCount > 0 && !isOpen;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-all duration-500 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-28 opacity-0",
      )}
    >
      <button
        type="button"
        onClick={openCart}
        inert={!visible}
        aria-label={`Voir le panier, ${itemCount} article${itemCount > 1 ? "s" : ""}, total ${formatPrice(subtotal)}`}
        className="glass pointer-events-auto flex w-full max-w-md items-center justify-between gap-3 rounded-2xl border-brand/30 p-2 pl-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] transition-transform duration-300 active:scale-[0.98]"
      >
        <span className="flex items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-ink">
            <ShoppingBag className="h-5 w-5" strokeWidth={2.4} />
            <span
              key={itemCount}
              className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 animate-bump items-center justify-center rounded-full bg-white px-1 text-[11px] font-extrabold text-ink"
            >
              {itemCount}
            </span>
          </span>
          <span className="text-left">
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Total</span>
            <span className="block text-base font-extrabold">{formatPrice(subtotal)}</span>
          </span>
        </span>
        <span className="flex items-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-extrabold text-ink">
          Voir le panier
          <ArrowRight className="h-4 w-4" />
        </span>
      </button>
    </div>
  );
}
