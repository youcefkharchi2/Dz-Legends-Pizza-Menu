import { ORDER_MODES, RESTAURANT } from "../config";
import type { CartItem, OrderMode } from "../types";
import { formatPrice } from "./format";

export interface OrderDetails {
  name: string;
  mode: OrderMode;
  /** Table number (sur place), phone (à emporter) or delivery address (livraison) */
  place: string;
  note: string;
}

export function getOrderModeLabel(mode: OrderMode): string {
  return ORDER_MODES.find((m) => m.id === mode)?.label ?? mode;
}

/** Builds the plain-text order message sent to the restaurant on WhatsApp */
export function buildOrderMessage(items: CartItem[], details: OrderDetails): string {
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const lines = items.map((item) => {
    const size = item.size ? ` (${item.size})` : "";
    const subtotal = item.unitPrice * item.quantity;
    return `• ${item.quantity} x ${item.name}${size} — ${formatPrice(subtotal)}`;
  });

  const placeLabel =
    details.mode === "sur-place"
      ? "Table"
      : details.mode === "livraison"
        ? "Adresse"
        : "Téléphone";

  const parts = [
    `🍕 *NOUVELLE COMMANDE — ${RESTAURANT.name}*`,
    "",
    `*Client :* ${details.name.trim() || "Non renseigné"}`,
    `*Mode :* ${getOrderModeLabel(details.mode)}`,
    `*${placeLabel} :* ${details.place.trim() || "Non renseigné"}`,
    "",
    "*Articles :*",
    ...lines,
    "",
    `*TOTAL : ${formatPrice(total)}*`,
  ];

  if (details.note.trim()) {
    parts.push("", `*Note :* ${details.note.trim()}`);
  }

  return parts.join("\n");
}

/** Builds a wa.me link that opens WhatsApp with the message pre-filled */
export function buildWhatsAppUrl(message: string): string {
  const number = RESTAURANT.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
