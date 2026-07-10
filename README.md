# ✠ Librarium — Guide d'installation

Application PWA de gestion de collection de livres Warhammer 40,000.
Ce dossier contient tout ce qu'il faut pour l'héberger gratuitement et l'installer sur votre iPhone.

## Contenu du dossier

- `index.html` — l'application complète
- `manifest.webmanifest` — configuration PWA (nom, icônes, plein écran)
- `sw.js` — service worker (fonctionnement hors-ligne)
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — icônes

## Étape 1 — Héberger l'app (2 options gratuites)

### Option A : Netlify Drop (le plus simple, sans compte technique)
1. Ouvrez https://app.netlify.com/drop dans un navigateur (ordinateur).
2. Glissez-déposez ce dossier entier sur la page.
3. Netlify vous donne immédiatement une URL du type `https://xxxx.netlify.app`.
4. (Facultatif) Créez un compte gratuit pour conserver le site et personnaliser l'URL.

### Option B : GitHub Pages
1. Créez un compte sur https://github.com si besoin.
2. Créez un nouveau dépôt (repository) public nommé `librarium`.
3. « Add file » → « Upload files » → envoyez tous les fichiers de ce dossier → « Commit ».
4. Dans le dépôt : Settings → Pages → Source : branche `main`, dossier `/ (root)` → Save.
5. Après ~1 minute, l'app est disponible sur `https://VOTRE-PSEUDO.github.io/librarium/`.

## Étape 2 — Installer sur l'iPhone

1. Ouvrez l'URL de l'app dans **Safari** (obligatoire pour l'installation).
2. Bouton **Partager** (carré avec flèche) → **« Sur l'écran d'accueil »** → Ajouter.
3. L'app apparaît avec son icône ✠ et s'ouvre en plein écran, comme une app native.

## Étape 3 — Activer l'Archiviste (recherche IA et synopsis) — facultatif

Sans clé, l'app fonctionne entièrement (collection, wishlist, catalogue, prix, liens
revendeurs) mais sans la recherche IA ni la génération de synopsis.

1. Créez une clé API sur https://console.anthropic.com → « API keys » → « Create key ».
   (Nécessite un compte Anthropic avec quelques crédits ; chaque recherche/synopsis
   coûte de l'ordre de quelques centimes.)
2. Dans l'app : bouton **⚙** en haut à droite → collez la clé → Fermer.

⚠ **Sécurité** : la clé est stockée uniquement dans le navigateur de votre appareil.
Ne la partagez jamais, ne la publiez pas dans le code, et ne communiquez pas l'URL de
votre app à des inconnus si vous y avez mis votre clé (elle reste sur VOTRE appareil,
mais par prudence, fixez un plafond de dépense bas sur console.anthropic.com → Limits).

## Étape 4 — Transférer votre collection depuis Claude

1. Dans la version Claude de l'app : **⚙** → **Copier** (votre registre en JSON).
2. Dans la PWA sur votre iPhone : **⚙** → collez dans la zone de texte → **Importer**.

## Notes

- Les données restent sur votre appareil (localStorage). Pensez à faire des
  sauvegardes régulières via ⚙ → Copier (collez le JSON dans une note, par exemple).
- L'app fonctionne hors-ligne une fois installée (sauf Archiviste/synopsis non mis en cache).
- Pour mettre à jour l'app plus tard : remplacez les fichiers sur Netlify/GitHub,
  puis fermez et rouvrez l'app (le service worker se met à jour).
