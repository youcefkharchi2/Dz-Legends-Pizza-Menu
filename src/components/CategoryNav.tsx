import { useEffect, useRef } from "react";
import type { Category, CategoryId } from "../types";
import { cn } from "../utils/cn";

interface CategoryNavProps {
  categories: Category[];
  /** Currently visible category (scroll-spy) */
  activeId?: string;
  /** Categories with no matching products while searching */
  disabledIds: CategoryId[];
  onSelect: (id: CategoryId) => void;
}

export function CategoryNav({ categories, activeId, disabledIds, onSelect }: CategoryNavProps) {
  const navRef = useRef<HTMLDivElement>(null);

  // Keep the active pill centred inside the horizontal scroller (without moving the page)
  useEffect(() => {
    const container = navRef.current;
    const pill = container?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!container || !pill) return;
    const left = pill.offsetLeft - (container.clientWidth - pill.offsetWidth) / 2;
    container.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeId]);

  return (
    <nav aria-label="Catégories du menu">
      <div
        ref={navRef}
        className="no-scrollbar relative flex snap-x gap-2 overflow-x-auto md:justify-center"
      >
        {categories.map((category) => {
          const active = category.id === activeId;
          const disabled = disabledIds.includes(category.id);
          return (
            <button
              key={category.id}
              type="button"
              aria-current={active ? "true" : undefined}
              disabled={disabled}
              onClick={() => onSelect(category.id)}
              className={cn(
                "shrink-0 snap-start whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30",
                active
                  ? "border-brand bg-brand text-ink shadow-[0_8px_24px_-8px_rgba(255,208,0,0.6)]"
                  : "border-white/10 bg-white/[0.04] text-white/75 hover:border-brand/50 hover:text-white",
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
