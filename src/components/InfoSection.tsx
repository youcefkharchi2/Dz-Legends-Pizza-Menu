import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone, type LucideIcon } from "lucide-react";
import { OPENING_HOURS, RESTAURANT } from "../config";
import { useNow } from "../hooks/useNow";
import { cn } from "../utils/cn";
import { getLocalDay, getOpenStatus } from "../utils/hours";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { Reveal } from "./Reveal";

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="group -m-2 flex items-start gap-4 rounded-2xl p-2 transition hover:bg-white/5"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand transition duration-300 group-hover:bg-brand group-hover:text-ink">
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-[11px] font-bold uppercase tracking-widest text-white/40">{label}</span>
          <span className="mt-0.5 block break-words font-semibold text-white/90">{value}</span>
        </span>
      </a>
    </li>
  );
}

export function InfoSection() {
  const now = useNow();
  const status = getOpenStatus(now);
  const today = getLocalDay(now);
  const whatsappLink = `https://wa.me/${RESTAURANT.whatsappNumber.replace(/\D/g, "")}`;

  return (
    <section id="infos" className="scroll-mt-16 px-4 pb-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-brand">Infos pratiques</p>
            <h2 className="font-display mt-2 text-5xl uppercase leading-none sm:text-6xl">
              Horaires <span className="gold-text">&amp;</span> Contact
            </h2>
          </div>
        </Reveal>

        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {/* Opening hours */}
          <Reveal>
            <div className="card-premium h-full p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display flex items-center gap-3 text-3xl uppercase">
                  <Clock className="h-6 w-6 text-brand" />
                  Horaires
                </h3>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider",
                    status.isOpen ? "bg-brand/15 text-brand" : "bg-red-500/15 text-red-400",
                  )}
                >
                  {status.label}
                </span>
              </div>

              <ul className="mt-6 divide-y divide-white/10">
                {OPENING_HOURS.map((day) => {
                  const isToday = day.day === today;
                  return (
                    <li
                      key={day.day}
                      className={cn(
                        "flex items-center justify-between gap-3 py-3.5",
                        isToday ? "text-brand" : "text-white/80",
                      )}
                    >
                      <span className="font-semibold">
                        {day.label}
                        {isToday && (
                          <span className="ml-2 rounded-full bg-brand/15 px-2 py-0.5 align-middle text-[10px] font-extrabold uppercase tracking-wider text-brand">
                            Aujourd’hui
                          </span>
                        )}
                      </span>
                      <span className={cn("tabular-nums", !(day.open && day.close) && "text-white/40")}>
                        {day.open && day.close ? `${day.open} – ${day.close}` : "Fermé"}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-xs text-white/40">Heure d’Algérie (UTC+1).</p>
            </div>
          </Reveal>

          {/* Contact */}
          <div id="contact" className="scroll-mt-24">
            <Reveal delay={120}>
              <div className="card-premium h-full p-6 sm:p-8">
                <h3 className="font-display text-3xl uppercase">Nous trouver</h3>

                <ul className="mt-6 space-y-5">
                  <ContactRow icon={MapPin} label="Adresse" value={RESTAURANT.address} href={RESTAURANT.mapsUrl} />
                  <ContactRow icon={Phone} label="Téléphone" value={RESTAURANT.phoneDisplay} href={`tel:${RESTAURANT.phoneHref}`} />
                  <ContactRow icon={Mail} label="Email" value={RESTAURANT.email} href={`mailto:${RESTAURANT.email}`} />
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-whatsapp px-6 font-extrabold text-white shadow-[0_12px_30px_-12px_rgba(37,211,102,0.7)] transition duration-300 hover:brightness-110 active:scale-[0.98]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Commander sur WhatsApp
                  </a>
                  <a
                    href={RESTAURANT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost h-14 flex-1 px-6 text-sm"
                  >
                    <Navigation className="h-4 w-4" />
                    Itinéraire
                  </a>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
                  <span className="mr-2 text-xs font-bold uppercase tracking-widest text-white/40">Suivez-nous</span>
                  <a
                    href={RESTAURANT.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram DZ LEGENDS PIZZA"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-brand hover:text-brand"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={RESTAURANT.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook DZ LEGENDS PIZZA"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-brand hover:text-brand"
                  >
                    <FacebookIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
