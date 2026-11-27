import { RESTAURANT } from "../config";

const numberFormatter = new Intl.NumberFormat("fr-FR");

/** Formats an amount in Algerian dinars, e.g. "1 500 DA" */
export function formatPrice(amount: number): string {
  return `${numberFormatter.format(amount)} ${RESTAURANT.currency}`;
}

/** Lowercase text without accents, used for search matching */
export function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
