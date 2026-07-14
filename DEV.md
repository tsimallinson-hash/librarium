# ✠ Librarium — Notes de développement

## Structure

```
librarium/
├── index.html            # App (PWA autonome)
├── sw.js                 # Service worker (offline, cache v2)
├── manifest.webmanifest
├── icon-192.png / icon-512.png / apple-touch-icon.png
├── data/
│   └── books.json        # Base de données (métadonnées + synopsis)
└── README.md             # Guide d'installation utilisateur
```

## La base de données : data/books.json

Toute la base est là, séparée du code. Structure :

```json
{
  "_meta": { ... },
  "aliases": { "hh": "Horus Heresy", ... },
  "series": {
    "Horus Heresy": {
      "nameFr": "L'Hérésie d'Horus",
      "nameEn": "The Horus Heresy",
      "books": [
        {
          "o": 1,                       // numéro de tome
          "tf": "L'Ascension d'Horus",  // titre FR
          "t": "Horus Rising",          // titre VO
          "a": "Dan Abnett",            // auteur
          "py": 2006,                   // année parution VO
          "ay": 2011,                   // année audiobook VO (ou null)
          "fvf": "juil. 2011",          // date parution VF (ou null)
          "syn": ""                     // synopsis FR — À REMPLIR
        }
      ]
    }
  }
}
```

## Ajouter / modifier des synopsis

Il suffit de remplir le champ `"syn"` de chaque livre dans `data/books.json`.
- L'app sert le synopsis depuis la base en priorité (instantané, zéro API).
- Si `syn` est vide ET qu'une clé API est configurée, l'Archiviste le génère à la demande (repli).
- Rédiger des synopsis ORIGINAUX (ne pas copier-coller des 4e de couverture ou des résumés
  d'autres sites : c'est du contenu sous droit d'auteur).

Après modification du JSON : bump la version du cache dans sw.js (`librarium-vN`)
pour forcer la mise à jour chez les clients déjà installés.

## Tester en local

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```
Le service worker et l'install PWA exigent HTTPS, SAUF sur localhost (toléré).
Pour tester la PWA complète sur iPhone : push sur GitHub Pages / Netlify (HTTPS).

## Déploiement GitHub Pages

```bash
git add -A
git commit -m "..."
git push
```
Settings → Pages → branche main / (root). L'app sera sur
https://<pseudo>.github.io/<repo>/
