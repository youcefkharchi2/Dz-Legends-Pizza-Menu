import { Check } from "lucide-react";
import { useCart } from "../context/CartContext";

/** Small confirmation message shown when a product is added to the cart (hidden while the cart is open) */
export function Toast() {
  const { toast, isOpen } = useCart();

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-[80] flex justify-center px-4">
      {toast && !isOpen && (
        <div
          key={toast.id}
          className="glass flex max-w-sm animate-toast items-center gap-3 rounded-2xl border-brand/30 px-4 py-3 text-sm font-semibold shadow-2xl"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <span>{toast.text}</span>
        </div>
      )}
    </div>
  );
}
