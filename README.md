# DJ Booking Website Template

Site statique premium pour DJ / artiste événementiel, orienté booking, pensé pour GitHub + Cloudflare Pages.

## Objectif

Ce site sert de démo personnalisable : tu peux le montrer à un DJ, puis remplacer uniquement les données et les images pour un autre artiste.

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
│   └── press-kit.html
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

Les contenus principaux sont séparés du code.

### 1. Modifier l'artiste

Fichier :

```txt
data/artist.json
```

À modifier :

```json
{
  "name": "Jheff Brasil DJ",
  "tagline": "Brazilian Funk • Afro • Latin Vibes",
  "location": "Shows in Europe",
  "slogan": "Bringing Brazilian heat to European dancefloors.",
  "bookingEmail": "booking@example.com",
  "whatsappNumber": "33000000000"
}
```

Le numéro WhatsApp doit être au format international, sans `+`, sans espaces.

Exemple France :

```txt
33600000000
```

Exemple Brésil :

```txt
5545999999999
```

### 2. Modifier les événements

Fichier :

```txt
data/events.json
```

### 3. Modifier les images

Fichier :

```txt
data/gallery.json
```

Puis remplace les fichiers dans :

```txt
assets/images/
```

### 4. Modifier les vidéos

Fichier :

```txt
data/videos.json
```

### 5. Modifier les textes multilingues

Fichier :

```txt
data/translations.json
```

Langues prévues :

- EN
- FR
- PT

## Sections du site

- Hero principal
- About / Bio
- Live videos
- Upcoming shows
- Gallery
- Social/music links
- Press kit
- Booking form
- Floating WhatsApp button
- Footer

## Formulaire de booking

Le formulaire ne dépend d'aucun backend.

Quand l'utilisateur envoie la demande, le site ouvre WhatsApp avec un message prérempli contenant :

- nom ;
- email ;
- téléphone ;
- ville ;
- date ;
- type d'événement ;
- budget ;
- message.

## À faire avant de montrer au client

1. Remplacer `bookingEmail`.
2. Remplacer `whatsappNumber`.
3. Remplacer ou valider les images.
4. Vérifier les liens Instagram / YouTube.
5. Adapter les événements.
6. Tester sur mobile.

## Usage commercial

Tu peux vendre ce site comme :

```txt
Artist Booking Website
```

ou :

```txt
DJ Booking Landing Page + Press Kit
```

Le point fort : tu peux réutiliser le même site pour plusieurs DJs en modifiant seulement les fichiers `/data/` et `/assets/images/`.
