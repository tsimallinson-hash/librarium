// Vérification de data/books.json avant commit.
// Usage : node scripts/check.mjs
import { readFileSync } from 'node:fs';

let db;
try {
  db = JSON.parse(readFileSync(new URL('../data/books.json', import.meta.url)));
} catch (e) {
  console.error('❌ JSON INVALIDE :', e.message);
  process.exit(1);
}

let books = 0, withSyn = 0, problems = [];
const seen = new Set();

for (const [key, s] of Object.entries(db.series || {})) {
  if (!s.books || !Array.isArray(s.books)) { problems.push(`Série ${key} sans tableau books`); continue; }
  for (const b of s.books) {
    books++;
    const id = `${key} t${b.o}`;
    if (seen.has(id)) problems.push(`Doublon : ${id}`);
    seen.add(id);
    if (!b.tf) problems.push(`${id} : titre FR (tf) manquant`);
    if (!b.a)  problems.push(`${id} : auteur (a) manquant`);
    if (b.syn && b.syn.trim()) {
      withSyn++;
      const wc = b.syn.trim().split(/\s+/).length;
      if (wc > 120) problems.push(`${id} : synopsis très long (${wc} mots)`);
    }
  }
}

console.log(`\n📖 ${books} livres · ${withSyn} synopsis remplis · ${books - withSyn} vides`);
for (const [key, s] of Object.entries(db.series || {})) {
  const tot = s.books.length;
  const done = s.books.filter(b => b.syn && b.syn.trim()).length;
  console.log(`   • ${key} : ${done}/${tot} synopsis`);
}

if (problems.length) {
  console.error('\n⚠  Problèmes détectés :');
  for (const p of problems) console.error('   - ' + p);
  process.exit(1);
}
console.log('\n✅ JSON valide, structure cohérente. OK pour commit.\n');
