import { MessageCircle, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useId, useState, type InputHTMLAttributes } from "react";
import { ORDER_MODES } from "../config";
import { useCart } from "../context/CartContext";
import type { OrderMode } from "../types";
import { cn } from "../utils/cn";
import { formatPrice } from "../utils/format";
import { buildOrderMessage, buildWhatsAppUrl } from "../utils/order";
import { QuantityControl } from "./QuantityControl";

/** Reads ?table=5 from the QR-code URL so the table number is pre-filled */
function readTableFromUrl(): string {
  try {
    const table = new URLSearchParams(window.location.search).get("table");
    return table ? table.replace(/[^a-zA-Z0-9 -]/g, "").slice(0, 12) : "";
  } catch {
    return "";
  }
}

interface OrderForm {
  name: string;
  table: string;
  address: string;
  phone: string;
  note: string;
}

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function Field({ label, value, onChange, ...inputProps }: FieldProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-white/60">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-base text-white outline-none transition-all duration-300 placeholder:text-white/30 focus:border-brand/60 focus:shadow-[0_0_0_4px_rgba(255,208,0,0.12)] sm:text-sm"
        {...inputProps}
      />
    </div>
  );
}

export function CartDrawer() {
  const { items, itemCount, subtotal, isOpen, closeCart, setQuantity, removeItem, clearCart } = useCart();

  const [mode, setMode] = useState<OrderMode>(() => (readTableFromUrl() ? "sur-place" : "emporter"));
  const [form, setForm] = useState<OrderForm>(() => ({
    name: "",
    table: readTableFromUrl(),
    address: "",
    phone: "",
    note: "",
  }));

  const updateField = (field: keyof OrderForm) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Close with Escape and lock page scroll while the drawer is open
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeCart]);

  const place =
    mode === "sur-place" ? form.table : mode === "livraison" ? form.address : form.phone;
  const missingAddress = mode === "livraison" && !form.address.trim();
  const canOrder = items.length > 0 && !missingAddress;
  const whatsappUrl = canOrder
    ? buildWhatsAppUrl(buildOrderMessage(items, { name: form.name, mode, place, note: form.note }))
    : undefined;

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={cn(
          "fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        inert={!isOpen}
        className={cn(
          "fixed inset-x-0 bottom-0 z-[70] flex max-h-[92dvh] flex-col rounded-t-[2rem] border-t border-brand/20 bg-ink-2 shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] sm:inset-y-0 sm:bottom-auto sm:left-auto sm:right-0 sm:h-full sm:max-h-none sm:w-[460px] sm:rounded-none sm:rounded-l-[2rem] sm:border-l sm:border-t-0",
          isOpen ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-x-full sm:translate-y-0",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-brand">Commande</p>
            <h2 id="cart-title" className="font-display text-3xl uppercase leading-tight">
              Votre panier
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="rounded-full px-3 py-2 text-xs font-semibold text-white/50 transition hover:bg-white/5 hover:text-red-400"
              >
                Vider
              </button>
            )}
            <button
              type="button"
              onClick={closeCart}
              aria-label="Fermer le panier"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <span className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand">
                <ShoppingBag className="h-9 w-9" />
              </span>
              <p className="font-display text-3xl uppercase">Votre panier est vide</p>
              <p className="mt-2 max-w-xs text-sm text-white/55">
                Ajoutez vos produits favoris depuis le menu.
              </p>
              <a href="#menu" onClick={closeCart} className="btn-ghost mt-6 h-12 px-6 text-sm">
                Parcourir le menu
              </a>
            </div>
          ) : (
            <>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.key}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                  >
                    <img
                      src={item.image}
                      alt=""
                      width={64}
                      height={64}
                      loading="lazy"
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-bold leading-tight">{item.name}</p>
                          <p className="mt-0.5 text-xs text-white/50">
                            {item.size ? `${item.size} · ` : ""}
                            {formatPrice(item.unitPrice)} / unité
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-extrabold text-brand">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between">
                        <QuantityControl
                          compact
                          quantity={item.quantity}
                          label={item.name}
                          onIncrement={() => setQuantity(item.key, item.quantity + 1)}
                          onDecrement={() => setQuantity(item.key, item.quantity - 1)}
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          aria-label={`Retirer ${item.name} du panier`}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-white/45 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Order details */}
              <div className="mt-7 space-y-4">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/50">
                    Mode de commande
                  </p>
                  <div role="group" aria-label="Mode de commande" className="grid grid-cols-3 gap-1.5 rounded-2xl bg-white/5 p-1">
                    {ORDER_MODES.map((option) => {
                      const active = mode === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setMode(option.id)}
                          className={cn(
                            "rounded-xl py-2.5 text-sm font-bold transition-all duration-300",
                            active
                              ? "bg-brand text-ink shadow-[0_6px_18px_-8px_rgba(255,208,0,0.8)]"
                              : "text-white/65 hover:text-white",
                          )}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Field
                  label="Votre nom (optionnel)"
                  value={form.name}
                  onChange={updateField("name")}
                  placeholder="Ex : Yacine"
                  autoComplete="name"
                />
                {mode === "sur-place" && (
                  <Field
                    label="Numéro de table"
                    value={form.table}
                    onChange={updateField("table")}
                    placeholder="Ex : 5"
                    inputMode="numeric"
                  />
                )}
                {mode === "emporter" && (
                  <Field
                    label="Téléphone (optionnel)"
                    value={form.phone}
                    onChange={updateField("phone")}
                    placeholder="Ex : 0555 00 00 00"
                    type="tel"
                    autoComplete="tel"
                  />
                )}
                {mode === "livraison" && (
                  <Field
                    label="Adresse de livraison"
                    value={form.address}
                    onChange={updateField("address")}
                    placeholder="Quartier, rue, numéro…"
                    autoComplete="street-address"
                  />
                )}
                <Field
                  label="Note (optionnel)"
                  value={form.note}
                  onChange={updateField("note")}
                  placeholder="Ex : sans oignons, bien cuite…"
                />
              </div>
            </>
          )}
        </div>

        {/* Totals & checkout */}
        {items.length > 0 && (
          <div className="border-t border-white/10 bg-ink-2 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-6">
            <div className="flex items-center justify-between text-sm text-white/55">
              <span>
                {itemCount} article{itemCount > 1 ? "s" : ""}
              </span>
            </div>
            <div className="mt-1 flex items-end justify-between gap-4">
              <span className="font-bold uppercase tracking-wider text-white/80">Total</span>
              <span className="font-display text-4xl leading-none text-brand">{formatPrice(subtotal)}</span>
            </div>

            {missingAddress && (
              <p className="mt-3 text-xs font-semibold text-amber-300">
                Ajoutez votre adresse pour finaliser une livraison.
              </p>
            )}

            <a
              href={whatsappUrl}
              aria-disabled={!canOrder}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-4 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-whatsapp text-base font-extrabold text-white shadow-[0_12px_30px_-12px_rgba(37,211,102,0.7)] transition duration-300 hover:brightness-110 active:scale-[0.98]",
                !canOrder && "pointer-events-none opacity-40",
              )}
            >
              <MessageCircle className="h-5 w-5" />
              Commander sur WhatsApp
            </a>
            <p className="mt-2.5 text-center text-[11px] text-white/40">
              Votre commande est pré-remplie dans WhatsApp : il ne reste plus qu’à l’envoyer.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
