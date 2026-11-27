// Render fallback for the misconfigured Static Site (Publish Directory = repo root).
//
// Render sets RENDER=true while building. When that is the case, copy the
// finished Vite output (dist/) to the repository root as well, so the site
// works whether Render publishes ./dist or the repository root.
//
// Nothing happens locally: npm run build keeps using the normal source
// index.html and the project keeps its usual structure.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const isRender = Boolean(process.env.RENDER || process.env.RENDER_EXTERNAL_URL);
if (!isRender) {
  console.log("render-root-fallback: local build, nothing to do.");
  process.exit(0);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const builtHtml = path.join(dist, "index.html");

if (!fs.existsSync(builtHtml)) {
  throw new Error("render-root-fallback: dist/index.html is missing — run vite build first.");
}

// The root index.html must be the built single-file app, not the Vite source
// template with /src/main.tsx (which a static host cannot execute).
fs.copyFileSync(builtHtml, path.join(root, "index.html"));

// Everything the app requests with root-relative paths (/images/..., favicons).
const assets = [
  "images",
  "favicon-32.png",
  "favicon.ico",
  "apple-touch-icon.png",
  "icon-192.png",
  "icon-512.png",
  "site.webmanifest",
  "_headers",
];

for (const name of assets) {
  const source = path.join(dist, name);
  if (!fs.existsSync(source)) continue;
  const target = path.join(root, name);
  fs.rmSync(target, { recursive: true, force: true });
  fs.cpSync(source, target, { recursive: true });
}

console.log("render-root-fallback: built site copied to the repo root for Render.");
