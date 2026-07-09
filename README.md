# The Thread — a field manual to the Bible

A single-file website that maps the Bible's threads, patterns, and codes — all converging on Jesus.

## Files

- **index.html** — the whole site, one file. Double-click to open, or host it anywhere (Netlify drop, GitHub Pages, any static host).
- **src/** — the editable source. `build.sh` stitches these into `index.html`:
  - `00-style.css` — design system (chart-paper light theme + night-navigation dark theme)
  - `10-shell.html` — page shell (top bar, nav, footer)
  - `20-icons.js` — the map-legend icon set
  - `21-data-threads.js` — the 12 threads (Lamb, Bread, Water, Light, Shepherd, King, Temple, Rest, Covenant, Bride, Exile, Name)
  - `22-data-pattern.js` — Egypt → Wilderness → Promised Land: seasons, trail wisdom, 10 case studies
  - `23-data-codes.js` — prophecies, types & shadows, tabernacle walk, feasts, hold-loosely items
  - `24-data-walking.js` — Walk It Out pillars + the 12 Detours
  - `25-data-mind.js` — Mind & Body blocks, the Library, Start Here content
  - `30-app.js` — renderers, hero/journey charts, search, router, theme toggle
- **research/** — the sourced research dossiers behind the content (grace theology, mind/body/spirit, bible threads), with confidence labels and URLs.
- **build/artifact.html** — the same site without the document wrapper (used for Claude artifact previews).

## Editing content

All content lives in the `src/2x-data-*.js` files as plain JavaScript objects — edit the text, then rebuild:

```sh
./build.sh
```

Scripture references in the text (e.g. `Rom 8:1`) are auto-linked to BibleGateway. The honesty badges in The Codes are: `explicit` (NT makes the connection), `classical` (historic church reading), `loose` (beautiful but debated).

## Design notes

Concept: a traveler's map room. The scarlet dashed line is the scarlet thread of redemption; each section and thread has its own map-ink color; dark mode is "navigation by lamplight." Type: Iowan Old Style/Palatino for reading, Avenir/Futura for map labels.
