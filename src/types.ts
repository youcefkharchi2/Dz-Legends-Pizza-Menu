export type CategoryId =
  | "pizzas"
  | "pizzas-speciales"
  | "sandwichs"
  | "tacos"
  | "burgers"
  | "boissons"
  | "desserts";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export interface ProductSize {
  /** Label shown to the customer, e.g. "Grande" */
  label: string;
  /** Price in Algerian dinars (DA) */
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  /** Path to an image inside /public, e.g. "/images/products/margherita.jpg" */
  image: string;
  /** Single price in DA (used when there are no sizes) */
  price?: number;
  /** Several sizes, each with its own price in DA */
  sizes?: ProductSize[];
  /** Small highlight label, e.g. "Signature" */
  badge?: string;
  /** Set to false to show the product as temporarily unavailable */
  available?: boolean;
}

export interface CartItem {
  /** Unique line key: productId + size */
  key: string;
  productId: string;
  name: string;
  image: string;
  categoryId: CategoryId;
  size?: string;
  /** Price per unit in DA */
  unitPrice: number;
  quantity: number;
}

export type OrderMode = "sur-place" | "emporter" | "livraison";

export interface OpeningDay {
  /** JavaScript weekday index: 0 = Dimanche ... 6 = Samedi */
  day: number;
  label: string;
  /** "HH:MM" (24h) or null when closed */
  open: string | null;
  /** "HH:MM" (24h). A closing time earlier than the opening time means it closes after midnight. */
  close: string | null;
}
