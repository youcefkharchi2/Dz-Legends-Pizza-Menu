import { Minus, Plus } from "lucide-react";
import { cn } from "../utils/cn";

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  /** Used for accessible labels, e.g. "Pizza Margherita" */
  label: string;
  compact?: boolean;
}

export function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
  label,
  compact = false,
}: QuantityControlProps) {
  const buttonSize = compact ? "h-8 w-8" : "h-10 w-10";

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-brand/40 bg-ink p-0.5 shadow-[0_8px_24px_-12px_rgba(255,208,0,0.5)]">
      <button
        type="button"
        onClick={onDecrement}
        aria-label={`Diminuer la quantité de ${label}`}
        className={cn(
          "flex items-center justify-center rounded-full text-white transition duration-200 hover:bg-white/10 active:scale-90",
          buttonSize,
        )}
      >
        <Minus className="h-4 w-4" strokeWidth={2.6} />
      </button>
      <span
        key={quantity}
        aria-live="polite"
        aria-label={`Quantité : ${quantity}`}
        className={cn(
          "animate-bump text-center text-sm font-extrabold text-brand",
          compact ? "min-w-6" : "min-w-8",
        )}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label={`Augmenter la quantité de ${label}`}
        disabled={quantity >= 99}
        className={cn(
          "flex items-center justify-center rounded-full bg-brand text-ink transition duration-200 hover:bg-brand-deep active:scale-90 disabled:opacity-40",
          buttonSize,
        )}
      >
        <Plus className="h-4 w-4" strokeWidth={2.6} />
      </button>
    </div>
  );
}
