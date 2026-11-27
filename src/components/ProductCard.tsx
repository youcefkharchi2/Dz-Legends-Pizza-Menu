import { Plus } from "lucide-react";
import { useState } from "react";
import { makeCartKey, useCart } from "../context/CartContext";
import type { Product } from "../types";
import { cn } from "../utils/cn";
import { formatPrice } from "../utils/format";
import { QuantityControl } from "./QuantityControl";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, setQuantity, getQuantity } = useCart();
  const sizes = product.sizes ?? [];
  const [sizeIndex, setSizeIndex] = useState(0);

  const activeSize = sizes.length > 0 ? sizes[Math.min(sizeIndex, sizes.length - 1)] : undefined;
  const unitPrice = activeSize?.price ?? product.price ?? 0;
  const quantity = getQuantity(product.id, activeSize?.label);
  const cartKey = makeCartKey(product.id, activeSize?.label);
  const available = product.available !== false;

  return (
    <article className="group relative flex gap-4 overflow-hidden rounded-3xl border border-white/10 bg-ink-2 p-3 transition duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_60px_-24px_rgba(255,208,0,0.35)] sm:flex-col sm:gap-0 sm:p-0">
      {/* Photo */}
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-ink-3 sm:aspect-[4/3] sm:h-auto sm:w-full sm:rounded-none">
        <img
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          loading="lazy"
          decoding="async"
          className={cn(
            "h-full w-full object-cover transition duration-700 group-hover:scale-105",
            !available && "grayscale",
          )}
        />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-ink-2 via-transparent to-transparent sm:block" />
        {product.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-brand px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-ink shadow-lg">
            {product.badge}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col sm:p-5 sm:pt-4">
        <h3 className="font-display text-xl uppercase leading-tight tracking-wide sm:text-2xl">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/60">
          {product.description}
        </p>

        {sizes.length > 1 && (
          <div role="group" aria-label="Choisir la taille" className="mt-3 flex flex-wrap gap-1.5">
            {sizes.map((size, index) => {
              const active = index === sizeIndex;
              return (
                <button
                  key={size.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSizeIndex(index)}
                  className={cn(
                    "flex flex-col items-start rounded-xl border px-2.5 py-1 text-left transition duration-300",
                    active
                      ? "border-brand bg-brand text-ink shadow-[0_6px_18px_-8px_rgba(255,208,0,0.7)]"
                      : "border-white/15 bg-white/5 text-white/80 hover:border-brand/50 hover:text-white",
                  )}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider">{size.label}</span>
                  <span className="text-xs font-extrabold">{formatPrice(size.price)}</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              {activeSize ? activeSize.label : "Prix"}
            </p>
            <p className="text-lg font-extrabold text-brand">{formatPrice(unitPrice)}</p>
          </div>

          {!available ? (
            <span className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white/50">
              Indisponible
            </span>
          ) : quantity > 0 ? (
            <QuantityControl
              quantity={quantity}
              label={product.name}
              onIncrement={() => setQuantity(cartKey, quantity + 1)}
              onDecrement={() => setQuantity(cartKey, quantity - 1)}
            />
          ) : (
            <button
              type="button"
              onClick={() => addItem(product, activeSize)}
              className="btn-primary h-10 shrink-0 px-4 text-sm"
              aria-label={`Ajouter ${product.name}${activeSize ? ` (${activeSize.label})` : ""} au panier`}
            >
              <Plus className="h-4 w-4" strokeWidth={2.6} />
              Ajouter
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
