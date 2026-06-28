# Customization guide

## Files to edit first

1. `data/artist.json` — artist name, tagline, contact, WhatsApp, Instagram and YouTube.
2. `data/events.json` — upcoming shows.
3. `data/gallery.json` — gallery visuals.
4. `data/videos.json` — video cards and links.
5. `data/translations.json` — EN / FR / PT text.

## WhatsApp number format

Use international format without `+`, spaces or punctuation.

Examples:

```txt
33600000000
5545999999999
```

Current demo number:

```txt
351919344194
```

## Cloudflare Pages settings

```txt
Framework preset: None
Build command: empty
Build output directory: /
```

## Images

The active site uses optimized `.webp` images in:

```txt
assets/images/
```

Active image set:

- `hero.webp`
- `live-performance.webp`
- `crowd-show.webp`
- `portrait-about.webp`
- `lifestyle-europe.webp`
- `press-closeup.webp`

Recommended image sizes:

- Hero image: 16:9, 1200–1600px wide
- Live performance: 16:9
- Crowd/show image: 16:9
- Portrait/about: 4:5
- Lifestyle image: 4:5
- Press close-up: 4:5

Keep each file below 300 KB if possible.
