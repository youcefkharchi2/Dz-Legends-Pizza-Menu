import { ChefHat, Sparkles, Timer } from "lucide-react";
import { Reveal } from "./Reveal";

const FEATURES = [
  {
    icon: ChefHat,
    title: "Pâte soignée",
    text: "Une pâte travaillée avec soin pour un goût authentique.",
  },
  {
    icon: Sparkles,
    title: "Ingrédients choisis",
    text: "Une sélection de garnitures fraîches, généreusement servies.",
  },
  {
    icon: Timer,
    title: "Commande rapide",
    text: "Votre panier envoyé directement au restaurant via WhatsApp.",
  },
];

export function About() {
  return (
    <section id="histoire" className="relative scroll-mt-16 overflow-hidden px-4 py-20 sm:px-6 md:py-28">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand/5 blur-[120px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal className="relative">
          <div className="absolute -inset-4 rounded-[2rem] border border-brand/20" />
          <img
            src="/images/about-pizza.jpg"
            alt="Pizza garnie servie chez DZ LEGENDS PIZZA"
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="relative aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-2xl sm:aspect-[5/4]"
          />
          <div className="glass absolute -bottom-5 right-4 rounded-2xl px-5 py-4 shadow-2xl">
            <p className="font-display text-3xl text-brand">1 CLIC</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">pour commander</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-brand">Notre histoire</p>
          <h2 className="font-display mt-3 text-5xl uppercase leading-[0.95] sm:text-6xl">
            Une pizza <span className="gold-text">digne</span> de la légende
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65">
            Chez DZ LEGENDS PIZZA, chaque pizza est préparée avec soin : une pâte travaillée, des garnitures
            généreuses et des ingrédients sélectionnés. Commandez directement depuis votre table, à emporter
            ou en livraison.
          </p>

          <ul className="mt-8 space-y-4">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:border-brand/30">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-ink">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block font-bold">{title}</span>
                  <span className="mt-0.5 block text-sm text-white/55">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
