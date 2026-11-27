import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="mb-5">
      <label htmlFor="menu-search" className="sr-only">
        Rechercher un produit
      </label>
      <div className="group relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40 transition-colors duration-300 group-focus-within:text-brand" />
        <input
          id="menu-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Rechercher une pizza, un burger, un dessert…"
          autoComplete="off"
          enterKeyHint="search"
          className="h-14 w-full rounded-2xl border border-white/10 bg-ink-2 pl-12 pr-12 text-base text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-brand/60 focus:bg-ink-3 focus:shadow-[0_0_0_4px_rgba(255,208,0,0.12)] [&::-webkit-search-cancel-button]:hidden"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Effacer la recherche"
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {value && (
        <p className="mt-2 text-sm text-white/50" aria-live="polite">
          {resultCount} résultat{resultCount > 1 ? "s" : ""} pour « {value} »
        </p>
      )}
    </div>
  );
}
