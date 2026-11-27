// Génère un QR code (PNG pour impression + SVG) qui pointe vers le site.
//
// Utilisation :
//   node scripts/make-qr.mjs https://votre-site.pages.dev
//   node scripts/make-qr.mjs https://votre-site.pages.dev/?table=5 table-5
//
// Les fichiers sont créés dans le dossier qr-code/.

import QRCode from "qrcode";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_URL = "https://dz-legends-pizza.pages.dev/";
const url = process.argv[2] ?? DEFAULT_URL;
const name = process.argv[3] ?? "menu-qr";

try {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error("Protocole non supporté");
  }
} catch {
  console.error(`URL invalide : ${url}`);
  console.error("Exemple : node scripts/make-qr.mjs https://votre-site.pages.dev");
  process.exit(1);
}

const outDir = path.resolve("qr-code");
await mkdir(outDir, { recursive: true });

// Modules noirs sur fond blanc : le contraste maximum garantit une lecture rapide
const options = {
  errorCorrectionLevel: "M",
  margin: 4,
  color: { dark: "#070707", light: "#FFFFFF" },
};

await QRCode.toFile(path.join(outDir, `${name}.png`), url, {
  ...options,
  type: "png",
  width: 1024,
});

const svg = await QRCode.toString(url, { ...options, type: "svg" });
await writeFile(path.join(outDir, `${name}.svg`), svg);

console.log(`QR code créé pour : ${url}`);
console.log(`  → qr-code/${name}.png  (pour impression)`);
console.log(`  → qr-code/${name}.svg  (vectoriel, qualité maximale)`);
