# Librarium — instructions projet

PWA de gestion de collection de romans Warhammer 40K (éditions françaises).
Site statique, déployé via GitHub Pages (push sur `main` = déploiement automatique).

## Structure
- `index.html` — l'application (une seule page, tout le code JS inclus)
- `sw.js` — service worker (cache offline)
- `data/books.json` — LA base de données (métadonnées + synopsis)
- `manifest.webmanifest`, `icon-*.png` — configuration et icônes PWA
- `scripts/check.mjs` — vérification du JSON avant commit
- `scripts/bump-cache.mjs` — met à jour automatiquement la version du cache dans `sw.js`
- `.githooks/pre-commit` — hook git qui lance les deux scripts ci-dessus à chaque commit

## Base de données
Toute la donnée vit dans `data/books.json`. Ne jamais coder de livres en dur dans `index.html`.

Format d'un livre :
`{ "o", "tf" (titre FR), "t" (titre VO), "a" (auteur), "py", "ay", "fvf", "syn" }`

Synopsis (champ `syn`) : contenu ORIGINAL uniquement, rédigé de zéro. Ne jamais copier
de quatrième de couverture, de Black Library, du Reclusiam, de Lexicanum, de Babelio ni
d'aucun site tiers — ce sont des textes sous droit d'auteur. En cas de doute sur le
contenu d'un tome, le signaler plutôt que d'inventer des détails.

## Règle de déploiement (automatisée)
La version du cache dans `sw.js` doit changer à chaque modification de
`data/books.json`, `index.html`, `manifest.webmanifest` ou des icônes — sinon
les installations PWA existantes continuent de servir l'ancienne version.
Ce bump est automatique : le hook `.githooks/pre-commit` calcule un hash du
contenu de ces fichiers et réécrit `const CACHE='librarium-<hash>'` dans
`sw.js` avant chaque commit (le fichier est ré-ajouté au commit si modifié).
Ne plus le faire à la main.

Sur un clone fraîchement cloné, activer le hook une fois avec :
`git config core.hooksPath .githooks`

## Vérification avant commit
`node scripts/check.mjs` tourne automatiquement via le hook pre-commit (voir
ci-dessus). Le commit est bloqué si le script signale une erreur.

## Workflow de commit
- Commits atomiques, messages clairs en français.
- Committer après chaque série validée pour pouvoir revenir en arrière facilement.
- Le hook pre-commit s'occupe de la vérification et du bump de cache ; il ne
  reste qu'à commit → push.
