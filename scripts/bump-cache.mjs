// Met à jour automatiquement la version du cache dans sw.js à partir d'un hash
// du contenu des assets suivis (index.html, data/books.json, manifest, icônes).
// Usage : node scripts/bump-cache.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const ASSET_FILES = [
  'index.html',
  'data/books.json',
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png',
];

const hash = createHash('sha256');
for (const f of ASSET_FILES) {
  hash.update(readFileSync(new URL(f, root)));
}
const version = hash.digest('hex').slice(0, 10);
const newCache = `librarium-${version}`;

const swPath = new URL('../sw.js', import.meta.url);
const sw = readFileSync(swPath, 'utf8');
const match = sw.match(/const CACHE='([^']+)';/);

if (!match) {
  console.error("❌ Impossible de trouver la ligne 'const CACHE=' dans sw.js");
  process.exit(1);
}

if (match[1] === newCache) {
  console.log(`ℹ  Cache déjà à jour (${newCache}), aucune modification.`);
  process.exit(0);
}

const updated = sw.replace(/const CACHE='[^']+';/, `const CACHE='${newCache}';`);
writeFileSync(swPath, updated);
console.log(`✅ Cache mis à jour : ${match[1]} → ${newCache}`);
