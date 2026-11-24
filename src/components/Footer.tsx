import { RESTAURANT } from "../config";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { Logo } from "./Logo";

const FOOTER_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#menu", label: "Menu" },
  { href: "#histoire", label: "Notre histoire" },
  { href: "#infos", label: "Horaires" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-2 px-4 pb-32 pt-14 sm:px-6 md:pb-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3 md:items-center">
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <Logo className="h-24 w-24" />
          <div>
            <p className="font-display text-2xl uppercase tracking-wide">
              DZ <span className="text-brand">LEGENDS</span> PIZZA
            </p>
            <p className="mt-1 text-sm text-white/55">{RESTAURANT.tagline}</p>
          </div>
        </div>

        <nav aria-label="Pied de page" className="grid grid-cols-2 gap-x-6 gap-y-3 text-center text-sm font-semibold text-white/70 md:text-left">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors duration-300 hover:text-brand">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-5 md:items-end">
          <div className="flex gap-3">
            <a
              href={RESTAURANT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-brand hover:text-brand"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={RESTAURANT.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-brand hover:text-brand"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
          <p className="text-center text-xs text-white/40 md:text-right">
            © {year} DZ LEGENDS PIZZA. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
