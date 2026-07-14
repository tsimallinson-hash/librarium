# Librarium — instructions projet

PWA de gestion de collection de romans Warhammer 40K (éditions françaises).
Site statique, déployé via GitHub Pages (push sur `main` = déploiement automatique).

## Structure
- `index.html` — l'application (une seule page, tout le code JS inclus)
- `sw.js` — service worker (cache offline)
- `data/books.json` — LA base de données (métadonnées + synopsis)
- `manifest.webmanifest`, `icon-*.png` — configuration et icônes PWA
- `scripts/check.mjs` — vérification du JSON avant commit

## Base de données
Toute la donnée vit dans `data/books.json`. Ne jamais coder de livres en dur dans `index.html`.

Format d'un livre :
`{ "o", "tf" (titre FR), "t" (titre VO), "a" (auteur), "py", "ay", "fvf", "syn" }`

Synopsis (champ `syn`) : contenu ORIGINAL uniquement, rédigé de zéro. Ne jamais copier
de quatrième de couverture, de Black Library, du Reclusiam, de Lexicanum, de Babelio ni
d'aucun site tiers — ce sont des textes sous droit d'auteur. En cas de doute sur le
contenu d'un tome, le signaler plutôt que d'inventer des détails.

## Règle de déploiement OBLIGATOIRE
À chaque modification de `data/books.json`, `index.html` ou d'un asset :
incrémenter la version du cache dans `sw.js` (`const CACHE='librarium-vN'` → `vN+1`).
Sinon les installations PWA existantes continuent de servir l'ancienne version depuis le cache.

## Vérification avant commit
Lancer `node scripts/check.mjs`. Ne pas committer si le script signale une erreur.

## Workflow de commit
- Commits atomiques, messages clairs en français.
- Après validation d'un lot de synopsis, proposer : `check` → commit → bump cache → push.
- Committer après chaque série validée pour pouvoir revenir en arrière facilement.
