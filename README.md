# DJ Booking Website Template

Site statique premium pour DJ / artiste événementiel, orienté booking, prêt pour **GitHub + Cloudflare Pages**.

## Objectif

Ce site sert de démo personnalisable : tu peux le montrer à un DJ, puis remplacer seulement les données et les visuels pour un autre artiste.

## Structure

```txt
.
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── images/
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

Paramètres recommandés :

```txt
Framework preset: None
Build command: laisser vide
Build output directory: /
```

Cloudflare Pages va servir directement `index.html`.

## Personnalisation rapide

### 1. Modifier l'artiste

Fichier :

```txt
data/artist.json
```

À modifier en priorité :

```json
{
  "artistName": "Jheff Brasil DJ",
  "tagline": "Brazilian Funk • Afro • Latin Vibes",
  "contact": {
    "bookingEmail": "booking@example.com",
    "whatsappNumber": "33000000000",
    "instagram": "https://instagram.com/jheffbrasil",
    "youtube": "https://youtube.com/@jheffxdj"
  }
}
```

Le numéro WhatsApp doit être au format international, sans `+`, sans espaces.

Exemples :

```txt
33600000000
5545999999999
```

### 2. Modifier les événements

Fichier :

```txt
data/events.json
```

### 3. Modifier les vidéos

Fichier :

```txt
data/videos.json
```

### 4. Modifier les images

Les visuels actuels sont des **SVG de démo** pour que le site soit immédiatement déployable sans upload binaire.

Dossier :

```txt
assets/images/
```

Pour une version client finale, remplace-les par de vraies images optimisées en `.webp` ou `.jpg`, puis mets à jour les chemins dans les fichiers JSON et CSS si les noms changent.

## Sections du site

- Hero principal
- About / Bio
- Live videos
- Upcoming shows
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
