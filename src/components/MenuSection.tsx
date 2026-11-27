import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "../data/menu";
import { useActiveSection } from "../hooks/useActiveCategory";
import type { CategoryId } from "../types";
import { normalizeText } from "../utils/format";
import { CategoryNav } from "./CategoryNav";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";
import { SearchBar } from "./SearchBar";

export function MenuSection() {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeText(query);

  // Products grouped by category, filtered by the search query
  const groups = useMemo(
    () =>
      CATEGORIES.map((category) => {
        const products = PRODUCTS.filter((product) => product.category === category.id).filter(
          (product) => {
            if (!normalizedQuery) return true;
            const haystack = normalizeText(
              `${product.name} ${product.description} ${product.badge ?? ""} ${category.name}`,
            );
            return haystack.includes(normalizedQuery);
          },
        );
        return { category, products };
      }).filter((group) => group.products.length > 0 || !normalizedQuery),
    [normalizedQuery],
  );

  const sectionIds = groups.map((group) => `cat-${group.category.id}`);
  const activeId = useActiveSection(sectionIds);
  const activeCategory = activeId?.replace("cat-", "");
  const matchingIds = new Set(groups.map((group) => group.category.id));
  const disabledIds: CategoryId[] = CATEGORIES.filter((c) => !matchingIds.has(c.id)).map(
    (c) => c.id,
  );
  const resultCount = groups.reduce((sum, group) => sum + group.products.length, 0);

  const scrollToCategory = (id: CategoryId) => {
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="menu" className="relative scroll-mt-16 px-4 pb-24 pt-24 sm:px-6 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-8 text-center md:text-left">
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-brand">Notre carte</p>
            <h2 className="font-display mt-2 text-5xl uppercase leading-none sm:text-6xl">
              Le <span className="gold-text">Menu</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/60 md:mx-0">
              Choisissez vos produits, ajustez les quantités et envoyez votre commande sur WhatsApp.
            </p>
          </div>
        </Reveal>

        <SearchBar value={query} onChange={setQuery} resultCount={resultCount} />

        <div className="sticky top-16 z-30 -mx-4 bg-ink/90 px-4 pb-3 pt-2 backdrop-blur-xl sm:-mx-6 sm:px-6">
          <CategoryNav
            categories={CATEGORIES}
            activeId={activeCategory}
            disabledIds={disabledIds}
            onSelect={scrollToCategory}
          />
        </div>

        {groups.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-3xl uppercase">Aucun résultat</p>
            <p className="mt-2 text-white/60">Aucun produit ne correspond à « {query} ».</p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="btn-ghost mt-6 h-11 px-6 text-sm"
            >
              Effacer la recherche
            </button>
          </div>
        ) : (
          groups.map(({ category, products }) => {
            const number = CATEGORIES.findIndex((c) => c.id === category.id) + 1;
            return (
              <div key={category.id} id={`cat-${category.id}`} className="scroll-mt-36 pt-14">
                <Reveal>
                  <div className="mb-6 flex items-end justify-between gap-4 border-b border-white/10 pb-5">
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brand">
                        {String(number).padStart(2, "0")}
                      </p>
                      <h3 className="font-display mt-1 text-4xl uppercase leading-none sm:text-5xl">
                        {category.name}
                      </h3>
                      <p className="mt-2 text-sm text-white/55">{category.description}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/60">
                      {products.length} {products.length > 1 ? "produits" : "produit"}
                    </span>
                  </div>
                </Reveal>

                {products.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product, i) => (
                      <Reveal key={product.id} delay={Math.min(i, 5) * 70}>
                        <ProductCard product={product} />
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-white/50">
                    Bientôt disponible.
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
