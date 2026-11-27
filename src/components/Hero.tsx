import { ArrowDown } from "lucide-react";
import { RESTAURANT } from "../config";
import { useNow } from "../hooks/useNow";
import { getOpenStatus } from "../utils/hours";
import { Logo } from "./Logo";

export function Hero() {
  const now = useNow();
  const status = getOpenStatus(now);

  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-24 md:pt-28"
    >
      {/* Background pizza photography */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero-pizza.jpg"
          alt=""
          aria-hidden="true"
          width={1600}
          height={1000}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover opacity-75 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/75 to-ink" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/80 to-ink/10 md:block" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[100px]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 md:grid-cols-2 md:gap-12 md:px-6">
        {/* Official logo */}
        <div className="relative order-first mx-auto w-60 animate-fade-up sm:w-72 md:order-last md:w-[27rem]">
          <div className="absolute -inset-4 animate-spin-slow rounded-full border border-dashed border-brand/35" />
          <div className="absolute -inset-10 rounded-full bg-brand/15 blur-3xl" />
          <Logo
            ring={false}
            priority
            className="relative w-full animate-float shadow-[0_0_90px_-10px_rgba(255,208,0,0.35)]"
          />
        </div>

        {/* Copy & calls to action */}
        <div className="text-center md:text-left">
          <p
            className="mx-auto inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-brand md:mx-0"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Menu en ligne · Commande rapide
          </p>

          <h1
            className="font-display mt-6 animate-fade-up text-[clamp(3.4rem,15vw,8rem)] uppercase leading-[0.86] tracking-tight"
            style={{ animationDelay: "80ms" }}
          >
            <span className="block">DZ</span>
            <span className="gold-text block">LEGENDS</span>
            <span className="block text-white/95">PIZZA</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-md animate-fade-up text-base leading-relaxed text-white/70 md:mx-0 md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {RESTAURANT.description}
          </p>

          <div
            className="mt-8 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row md:justify-start"
            style={{ animationDelay: "240ms" }}
          >
            <a href="#menu" className="btn-primary h-14 w-full px-9 text-base sm:w-auto">
              Voir le Menu
            </a>
            <a href="#infos" className="btn-ghost h-14 w-full px-8 text-base sm:w-auto">
              Horaires &amp; contact
            </a>
          </div>

          <div
            className="mt-8 flex animate-fade-up justify-center md:justify-start"
            style={{ animationDelay: "320ms" }}
          >
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm">
              <span
                className={
                  status.isOpen
                    ? "h-2.5 w-2.5 animate-pulse-dot rounded-full bg-brand"
                    : "h-2.5 w-2.5 rounded-full bg-red-500"
                }
              />
              <span className="font-semibold">{status.label}</span>
              {status.detail && <span className="text-white/55">· {status.detail}</span>}
            </span>
          </div>
        </div>
      </div>

      <a
        href="#menu"
        aria-label="Défiler vers le menu"
        className="absolute bottom-6 left-1/2 hidden h-10 w-10 -translate-x-1/2 animate-bounce-y items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-brand hover:text-brand sm:flex"
      >
        <ArrowDown className="h-4 w-4" />
      </a>
    </section>
  );
}
