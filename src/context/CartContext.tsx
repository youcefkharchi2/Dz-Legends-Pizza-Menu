import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product, ProductSize } from "../types";

const STORAGE_KEY = "dz-legends-cart-v1";
const MAX_QUANTITY = 99;

type CartAction =
  | { type: "add"; item: Omit<CartItem, "key" | "quantity">; quantity: number }
  | { type: "set"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "clear" };

export interface Toast {
  id: number;
  text: string;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size?: ProductSize) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  getQuantity: (productId: string, size?: string) => number;
  toast: Toast | null;
}

const CartContext = createContext<CartContextValue | null>(null);

export function makeCartKey(productId: string, size?: string): string {
  return size ? `${productId}::${size}` : productId;
}

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "add": {
      const key = makeCartKey(action.item.productId, action.item.size);
      const existing = state.find((i) => i.key === key);
      if (existing) {
        return state.map((i) =>
          i.key === key
            ? { ...i, quantity: Math.min(i.quantity + action.quantity, MAX_QUANTITY) }
            : i,
        );
      }
      return [
        ...state,
        { ...action.item, key, quantity: Math.min(action.quantity, MAX_QUANTITY) },
      ];
    }
    case "set":
      if (action.quantity <= 0) return state.filter((i) => i.key !== action.key);
      return state.map((i) =>
        i.key === action.key
          ? { ...i, quantity: Math.min(action.quantity, MAX_QUANTITY) }
          : i,
      );
    case "remove":
      return state.filter((i) => i.key !== action.key);
    case "clear":
      return [];
    default:
      return state;
  }
}

/** Restores the cart from localStorage, ignoring any malformed data */
function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item?.key === "string" &&
        typeof item?.name === "string" &&
        typeof item?.unitPrice === "number" &&
        typeof item?.quantity === "number" &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  // Persist cart changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable (private mode) — cart still works in memory */
    }
  }, [items]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const showToast = useCallback((text: string) => {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), text });
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const addItem = useCallback(
    (product: Product, size?: ProductSize) => {
      const unitPrice = size?.price ?? product.price ?? product.sizes?.[0]?.price ?? 0;
      dispatch({
        type: "add",
        quantity: 1,
        item: {
          productId: product.id,
          name: product.name,
          image: product.image,
          categoryId: product.category,
          size: size?.label,
          unitPrice,
        },
      });
      showToast(
        `${product.name}${size ? ` (${size.label})` : ""} ajouté au panier`,
      );
    },
    [showToast],
  );

  const setQuantity = useCallback((key: string, quantity: number) => {
    dispatch({ type: "set", key, quantity });
  }, []);

  const removeItem = useCallback((key: string) => {
    dispatch({ type: "remove", key });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const getQuantity = useCallback(
    (productId: string, size?: string) =>
      items.find((i) => i.key === makeCartKey(productId, size))?.quantity ?? 0,
    [items],
  );

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    return {
      items,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      getQuantity,
      toast,
    };
  }, [items, isOpen, openCart, closeCart, addItem, setQuantity, removeItem, clearCart, getQuantity, toast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
