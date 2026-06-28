# DJ Booking Website Template

Site statique premium pour DJ / artiste événementiel, orienté booking, prêt pour **GitHub + Cloudflare Pages**.

## Objectif

Ce site sert de démo personnalisable : tu peux le montrer à un DJ, puis remplacer seulement les données et les visuels pour un autre artiste.

## Structure propre

```txt
.
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── images/
│       ├── hero.webp
│       ├── live-performance.webp
│       ├── crowd-show.webp
│       ├── portrait-about.webp
│       ├── lifestyle-europe.webp
│       └── press-closeup.webp
├── data/
│   ├── artist.json
│   ├── events.json
│   ├── gallery.json
│   ├── videos.json
│   └── translations.json
├── press-kit/
│   └── index.html
├── docs/
│   └── CUSTOMIZATION.md
├── _headers
├── _redirects
└── README.md
```

## Déploiement Cloudflare Pages

```txt
Framework preset: None
Build command: laisser vide
Build output directory: /
```

## Personnalisation rapide

### Artiste

Fichier :

```txt
data/artist.json
```

Champs principaux :

```json
{
  "artistName": "Jheff X Dj",
  "tagline": "Brazilian Funk • Afro • Latin Vibes",
  "contact": {
    "bookingEmail": "booking@example.com",
    "whatsappNumber": "351919344194",
    "instagram": "https://instagram.com/jheffbrasil",
    "youtube": "https://youtube.com/@jheffxdj"
  }
}
```

Le numéro WhatsApp doit être au format international, sans `+`, sans espaces.

### Événements

```txt
data/events.json
```

### Vidéos

```txt
data/videos.json
```

### Galerie

```txt
data/gallery.json
```

### Images

Les images finales utilisées par le site sont dans :

```txt
assets/images/
```

Format recommandé : `.webp` optimisé.

## Sections du site

- Hero principal
- About / Bio
- Upcoming shows
- Media / videos
- Gallery
- Press kit
- Booking form
- Floating WhatsApp button
- Footer

## Formulaire booking

Le formulaire ouvre WhatsApp avec un message prérempli. Pas besoin de backend pour la démo.

## Usage commercial

Tu peux vendre ce site comme :

```txt
DJ Booking Landing Page + Press Kit
```

Le point fort : le site est réutilisable pour plusieurs DJs en modifiant surtout `/data/` et `/assets/images/`.
