import type { OpeningDay } from "./types";

/* =====================================================================
 * RESTAURANT CONFIGURATION
 * Edit this file to update contact details, WhatsApp number, hours, etc.
 * Items marked PLACEHOLDER must be replaced with real information.
 * ===================================================================== */

export const RESTAURANT = {
  name: "DZ LEGENDS PIZZA",
  shortName: "DZ LEGENDS",
  tagline: "La pizza, version légende",
  description:
    "Pizzas généreuses, pâte travaillée avec soin et ingrédients choisis. Commandez en un clic et savourez.",
  /** Official logo (served from /public/images) */
  logo: "/images/dz-logo.jpg",
  /** Currency label displayed next to prices */
  currency: "DA",
  /**
   * PLACEHOLDER — WhatsApp number used for orders.
   * International format, digits only, no "+", spaces or dashes.
   * Example for Algeria: 213551234567
   */
  whatsappNumber: "213555000000",
  /** PLACEHOLDER — phone number shown to customers */
  phoneDisplay: "+213 555 00 00 00",
  /** PLACEHOLDER — phone number used by the tel: link (international format) */
  phoneHref: "+213555000000",
  /** PLACEHOLDER — contact email */
  email: "contact@example.com",
  /** PLACEHOLDER — restaurant address */
  address: "Adresse du restaurant à compléter, Algérie",
  /** PLACEHOLDER — Google Maps link of the restaurant */
  mapsUrl: "https://www.google.com/maps",
  /** PLACEHOLDER — social links */
  instagramUrl: "https://www.instagram.com/",
  facebookUrl: "https://www.facebook.com/",
  /** Time zone used to compute "open now" (Algeria is UTC+1, no DST) */
  timezone: "Africa/Algiers",
};

/**
 * PLACEHOLDER — opening hours. Days are listed in the order they are displayed.
 * Set open/close to null to mark a day as closed.
 */
export const OPENING_HOURS: OpeningDay[] = [
  { day: 6, label: "Samedi", open: "11:00", close: "23:00" },
  { day: 0, label: "Dimanche", open: "11:00", close: "23:00" },
  { day: 1, label: "Lundi", open: "11:00", close: "23:00" },
  { day: 2, label: "Mardi", open: "11:00", close: "23:00" },
  { day: 3, label: "Mercredi", open: "11:00", close: "23:00" },
  { day: 4, label: "Jeudi", open: "11:00", close: "23:30" },
  { day: 5, label: "Vendredi", open: "14:00", close: "23:30" },
];

/** Order modes offered to customers in the cart */
export const ORDER_MODES = [
  { id: "sur-place", label: "Sur place" },
  { id: "emporter", label: "À emporter" },
  { id: "livraison", label: "Livraison" },
] as const;
