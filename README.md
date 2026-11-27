# DZ LEGENDS PIZZA — Online Menu

A premium, mobile-first QR-code menu for DZ LEGENDS PIZZA.
It is a **static website** (React + Vite + Tailwind CSS built into a single `dist/index.html`):
no backend, no database, no server to sleep, so it opens instantly when a customer scans the QR code.

## Features

- Official logo in the navbar, hero and footer, plus a favicon generated from it
- Categories: Pizzas, Pizzas Spéciales, Sandwichs, Tacos, Burgers, Boissons, Desserts
- Category navigation with scroll tracking, and search (accent-insensitive)
- Product cards with photo, description, sizes and prices (DA)
- Shopping cart: quantity controls, per-size lines, total, saved on the device (localStorage)
- Order by WhatsApp with a pre-filled message (table / takeaway / delivery)
- `?table=5` in the URL pre-fills the table number (ideal for table QR codes)
- Live "Ouvert / Fermé" status and opening hours (Algeria time zone)
- Contact details, map link, phone, email and social links
- Responsive: phones first, then tablets and desktop; respects "reduce motion" settings

## Project structure

```
index.html                 Page title, favicon links, SEO meta tags
public/
  images/dz-logo.jpg       Official logo (used everywhere)
  images/hero-pizza.jpg    Homepage background photo
  images/about-pizza.jpg   "Notre histoire" photo
  images/products/*.jpg    Product photos (one per product)
  favicon.ico, favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png
  site.webmanifest         "Add to home screen" metadata
  _headers                 Cloudflare Pages caching and security headers
src/
  config.ts                ★ Restaurant settings: WhatsApp number, phone, address, hours
  data/menu.ts             ★ Categories, products, sizes and prices
  components/              UI components
  context/CartContext.tsx  Cart state (add, quantities, total, storage)
  utils/order.ts           WhatsApp message builder
  utils/hours.ts           Open / closed logic
  App.tsx                  Page layout
  index.css                Brand theme (black / yellow / white) and animations
```

## 1. Configure the restaurant (before going live)

Everything marked **PLACEHOLDER** must be replaced.

### `src/config.ts`

| Setting | What to put |
| --- | --- |
| `whatsappNumber` | Your WhatsApp number in international format, digits only (e.g. `213551234567`). Orders are sent here. |
| `phoneDisplay` / `phoneHref` | Phone number shown to customers, and the same number in international format for `tel:` links |
| `email` | Contact email |
| `address` | Full restaurant address |
| `mapsUrl` | Google Maps link of the restaurant |
| `instagramUrl` / `facebookUrl` | Social media links |
| `OPENING_HOURS` | Opening and closing time per day (`null` = closed). A closing time earlier than the opening time means it closes after midnight. |

### `src/data/menu.ts`

- **Prices** are placeholders. Change `price` (single price) or `sizes` (for example Petite / Moyenne / Grande / Familiale), all in DA.
- To add a product, copy an existing entry and give it a unique `id`, its `category`, an `image` path and a price.
- Set `available: false` to show a product as temporarily unavailable.
- `badge` adds a small label on the photo (for example "Signature").

### Photos

Product photos in `public/images/products/` are **stock placeholders**. Replace them with your own dish photos,
keeping the same file names (or update the `image` path in `menu.ts`). Use square images around 640×640 px, compressed to a few tens of KB.

## 2. Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # development server at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # preview the production build
```

## 3. Deploy on Render (static site)

`render.yaml` contains the correct Render Blueprint for this Vite project:

| Setting | Value |
| --- | --- |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |
| NODE_VERSION | `22` |

Create the service with **New → Blueprint → connect the GitHub repo → select `render.yaml`**.

If the Static Site was created manually and already shows a **black page**, its Publish Directory
is pointing at the repository root. In that case open **Settings → Build & Deploy**, set the three
values above (especially **Publish Directory = `dist`**) and click **Manual Deploy → Deploy latest commit**.
Publishing the root serves the unbuilt `index.html` with `/src/main.tsx`, which a static host cannot
run, so React never mounts and the dark page stays empty.

The menu uses hash links (`#menu`, `#histoire`, `#infos`, `#contact`, `?table=5`), so no extra
redirect or rewrite rule is needed on Render. The QR code files in `qr-code/` are unchanged; keep
them pointing at the final site URL.

## 4. Deploy on Cloudflare Pages

### Option A — Connect a Git repository (recommended, updates automatically)

1. Push this project to GitHub or GitLab.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and select the repository.
3. Use these build settings:

| Setting | Value |
| --- | --- |
| Framework preset | None (or Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (leave empty) |

4. (Optional) Add an environment variable `NODE_VERSION` = `20` if the build environment asks for a Node version.
5. Click **Save and Deploy**. Your menu will be available at `https://<project-name>.pages.dev`.

Every change pushed to the repository is redeployed automatically.

### Option B — Direct upload (no Git)

```bash
npm run build
npx wrangler pages deploy dist --project-name dz-legends-pizza
```

(The first time, Wrangler asks you to log in to Cloudflare.)

### Custom domain (optional)

In your Pages project, go to **Custom domains → Set up a custom domain** and follow the DNS steps.

## 5. Create the QR codes

Generate a QR code (any free generator, or a print shop) that points to your site:

- General menu: `https://<project-name>.pages.dev/`
- One QR code per table: `https://<project-name>.pages.dev/?table=5`
  (the table number is pre-filled in the cart when the customer chooses "Sur place")

Print the QR codes on table cards or stickers. Test each code with a phone before printing.

## 6. Static HTML package and QR code generator

`dz-legends-pizza-static-site.zip` contains the complete static website (the contents of `dist/`: `index.html`, `images/`, favicons, `_headers`).
Unzip it and upload the folder to Cloudflare Pages (**Create → Pages → Upload assets**), or any static host.

Once you have the final URL, generate the QR code:

```bash
node scripts/make-qr.mjs https://your-site.pages.dev                      # main menu
node scripts/make-qr.mjs https://your-site.pages.dev/?table=5 table-5     # table 5
```

The files are saved in `qr-code/` as a PNG (for printing) and an SVG (vector).
The current QR code points to a **placeholder URL** (`https://dz-legends-pizza.pages.dev/`): regenerate it with your real address after deployment.

> The site uses root-relative paths (`/images/...`), so it must be opened through its URL, not by double-clicking `index.html`.

## Notes

- The site loads the fonts *Anton* and *Manrope* from Google Fonts. The website still works without them (fallback fonts).
- The build output is `dist/index.html` plus the `dist/images/` folder. Images are optimised for fast loading on mobile networks.
- Customers' carts are stored only on their own device; there is no order database. Orders are sent to the restaurant through WhatsApp.
