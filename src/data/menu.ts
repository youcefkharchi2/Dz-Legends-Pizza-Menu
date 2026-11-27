import type { Category, Product } from "../types";

/* =====================================================================
 * MENU DATA
 *
 * ⚠️ ALL PRICES BELOW ARE PLACEHOLDERS (in DA). Replace them with your
 * real prices. Product photos are stock placeholders — replace the files
 * in /public/images/products/ with your own dish photos (same file names),
 * or change the `image` path.
 * ===================================================================== */

export const CATEGORIES: Category[] = [
  {
    id: "pizzas",
    name: "Pizzas",
    description: "Nos classiques, pâte maison et sauce tomate signature.",
  },
  {
    id: "pizzas-speciales",
    name: "Pizzas Spéciales",
    description: "Les créations de la maison pour les vrais amateurs.",
  },
  {
    id: "sandwichs",
    name: "Sandwichs",
    description: "Sandwichs bien garnis, préparés à la commande.",
  },
  {
    id: "tacos",
    name: "Tacos",
    description: "Tacos généreux et sauces maison.",
  },
  {
    id: "burgers",
    name: "Burgers",
    description: "Steaks juteux, pains briochés et garnitures fraîches.",
  },
  {
    id: "boissons",
    name: "Boissons",
    description: "Rafraîchissements, limonades et jus.",
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Une fin de repas à la hauteur de la légende.",
  },
];

/** Standard pizza sizes — PLACEHOLDER prices */
const PIZZA_SIZES = [
  { label: "Petite", price: 800 },
  { label: "Moyenne", price: 1200 },
  { label: "Grande", price: 1500 },
  { label: "Familiale", price: 1900 },
];

/** Premium pizza sizes — PLACEHOLDER prices */
const SPECIAL_PIZZA_SIZES = [
  { label: "Moyenne", price: 1500 },
  { label: "Grande", price: 1900 },
  { label: "Familiale", price: 2400 },
];

export const PRODUCTS: Product[] = [
  /* ---------------- Pizzas ---------------- */
  {
    id: "pizza-margherita",
    name: "Pizza Margherita",
    description: "Sauce tomate maison, mozzarella fraîche, tomates cerises et basilic.",
    category: "pizzas",
    image: "/images/products/margherita.jpg",
    sizes: PIZZA_SIZES,
    badge: "Classique",
  },
  {
    id: "pizza-pepperoni",
    name: "Pizza Pepperoni",
    description: "Double pepperoni croustillant, mozzarella filante et sauce tomate maison.",
    category: "pizzas",
    image: "/images/products/pepperoni.jpg",
    sizes: PIZZA_SIZES,
    badge: "Best-seller",
  },
  {
    id: "pizza-vegetarienne",
    name: "Pizza Végétarienne",
    description: "Poivrons, olives noires, oignons rouges, champignons et origan.",
    category: "pizzas",
    image: "/images/products/vegetarienne.jpg",
    sizes: PIZZA_SIZES,
    badge: "Végétarien",
  },
  {
    id: "pizza-jambon-fromage",
    name: "Pizza Jambon Fromage",
    description: "Jambon de dinde, double mozzarella, emmental et crème légère.",
    category: "pizzas",
    image: "/images/products/jambon-fromage.jpg",
    sizes: PIZZA_SIZES,
  },

  /* ---------------- Pizzas Spéciales ---------------- */
  {
    id: "special-dz-legend",
    name: "Pizza DZ Legend",
    description:
      "La signature de la maison : pepperoni, poivrons verts, olives noires et mozzarella fondante.",
    category: "pizzas-speciales",
    image: "/images/products/dz-legend.jpg",
    sizes: SPECIAL_PIZZA_SIZES,
    badge: "Signature",
  },
  {
    id: "special-royale",
    name: "Pizza Royale",
    description: "Viande fumée, champignons, poivrons, olives et double fromage gratiné.",
    category: "pizzas-speciales",
    image: "/images/products/royale.jpg",
    sizes: SPECIAL_PIZZA_SIZES,
  },
  {
    id: "special-poulet-bbq",
    name: "Pizza Poulet BBQ",
    description: "Poulet mariné façon BBQ, oignons caramélisés, sauce BBQ et cheddar.",
    category: "pizzas-speciales",
    image: "/images/products/poulet-bbq.jpg",
    sizes: SPECIAL_PIZZA_SIZES,
  },

  /* ---------------- Sandwichs ---------------- */
  {
    id: "sandwich-poulet",
    name: "Sandwich Poulet Grillé",
    description: "Poulet grillé, crudités fraîches, fromage fondu et sauce maison.",
    category: "sandwichs",
    image: "/images/products/sandwich-poulet.jpg",
    price: 500,
  },
  {
    id: "sandwich-jambon",
    name: "Sandwich Jambon Fromage",
    description: "Jambon, emmental fondu, tomate et une touche de beurre.",
    category: "sandwichs",
    image: "/images/products/sandwich-jambon.jpg",
    price: 450,
  },
  {
    id: "sandwich-club",
    name: "Club Sandwich",
    description: "Triple étage : poulet, bacon croustillant, œuf, salade et tomate.",
    category: "sandwichs",
    image: "/images/products/club-sandwich.jpg",
    price: 800,
    badge: "Gourmand",
  },

  /* ---------------- Tacos ---------------- */
  {
    id: "tacos-viande",
    name: "Tacos Viande Hachée",
    description: "Viande hachée épicée, fromage fondu, frites et sauces au choix.",
    category: "tacos",
    image: "/images/products/tacos-viande.jpg",
    sizes: [
      { label: "Simple", price: 600 },
      { label: "Double", price: 900 },
    ],
  },
  {
    id: "tacos-poulet",
    name: "Tacos Poulet Grillé",
    description: "Poulet grillé mariné, poivrons, salade croquante et sauce fromagère.",
    category: "tacos",
    image: "/images/products/tacos-poulet.jpg",
    sizes: [
      { label: "Simple", price: 600 },
      { label: "Double", price: 900 },
    ],
  },

  /* ---------------- Burgers ---------------- */
  {
    id: "burger-dz",
    name: "DZ Burger",
    description: "Steak haché, cheddar, oignons caramélisés et sauce DZ maison.",
    category: "burgers",
    image: "/images/products/burger-dz.jpg",
    sizes: [
      { label: "Simple", price: 700 },
      { label: "Double", price: 1000 },
    ],
    badge: "Signature",
  },
  {
    id: "burger-cheese",
    name: "Cheese Burger",
    description: "Steak juteux, cheddar fondu, salade, tomate et sauce burger.",
    category: "burgers",
    image: "/images/products/burger-cheese.jpg",
    price: 800,
  },
  {
    id: "burger-double",
    name: "Double Burger Bacon",
    description: "Deux steaks, bacon croustillant, double fromage et oignons frais.",
    category: "burgers",
    image: "/images/products/burger-double.jpg",
    price: 1100,
  },

  /* ---------------- Boissons ---------------- */
  {
    id: "drink-canette",
    name: "Canette Soda",
    description: "Soda au choix selon disponibilité, bien frais.",
    category: "boissons",
    image: "/images/products/canette.jpg",
    price: 150,
  },
  {
    id: "drink-limonade",
    name: "Limonade Menthe",
    description: "Citron pressé, menthe fraîche et glace pilée.",
    category: "boissons",
    image: "/images/products/limonade.jpg",
    sizes: [
      { label: "30 cl", price: 250 },
      { label: "50 cl", price: 400 },
    ],
  },
  {
    id: "drink-jus-orange",
    name: "Jus d'Orange Frais",
    description: "Orange pressée à la minute.",
    category: "boissons",
    image: "/images/products/jus-orange.jpg",
    sizes: [
      { label: "30 cl", price: 300 },
      { label: "50 cl", price: 450 },
    ],
  },

  /* ---------------- Desserts ---------------- */
  {
    id: "dessert-fondant",
    name: "Fondant au Chocolat",
    description: "Cœur coulant au chocolat noir, servi tiède.",
    category: "desserts",
    image: "/images/products/dessert-fondant.jpg",
    price: 500,
    badge: "Gourmand",
  },
  {
    id: "dessert-coupe-glacee",
    name: "Coupe Glacée Chocolat",
    description: "Glace au chocolat, fruits rouges frais et sauce chocolat.",
    category: "desserts",
    image: "/images/products/dessert-glace.jpg",
    price: 600,
  },
  {
    id: "dessert-gateau",
    name: "Gâteau au Chocolat",
    description: "Gâteau moelleux au chocolat et ganache onctueuse.",
    category: "desserts",
    image: "/images/products/dessert-gateau.jpg",
    price: 450,
  },
];
