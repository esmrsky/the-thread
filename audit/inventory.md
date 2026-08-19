# The Thread — audit inventory (2026-08-19)

Live: https://esmrsky.github.io/the-thread/ · standalone repo `live-linked/the-thread`, Pages serves `main:/`
Source: `src/00-style.css`, `src/10-shell.html`, `src/2x-data-*.js`, `src/30-app.js` → `build.sh` → `index.html`
Live hash = local hash (5cac17b9…, 296,833 b). Single page, 9 `<section class="section-block">` rendered by JS.

## Interactive elements (30-app.js lines)
| Element | Selector | Events | Undo / state |
|---|---|---|---|
| Nav links (9) | `.nav-link` | click → smooth scroll, replaceState (1895) | scrollspy IO (1130); no Back |
| Brand | `.brand[href="#/"]` | hashchange → route (1944) | |
| Theme toggle | `#theme-toggle` | click (1912) → `data-theme` + localStorage | system vs toggle = two CSS paths |
| Header translation picker | `#verpick` btn/menu/opts | click, keydown Esc/↑/↓/Enter/Space (1217–1243) | no onChoose → nothing refreshes |
| Hero legend chips (13) | `.legend-chip[data-thread]` | mouseenter/pointerenter/focus → preview; leave/blur → reset(100ms); click → select (1007–1015) | no deselect |
| Hero SVG thread triggers (13) | `.hero-thread-trigger` | same hover/click set (1039–1045) | not focusable |
| Preview "Learn more" | `[data-thread-more]` | click → scroll to `#t-<id>` block:center, hash `#/threads` (1050) | |
| Ref links (~650) | `.ref-link` | mouseover → hover tooltip; click → pinned tooltip, preventDefault (1508–1531) | click-away closes; **no Escape**; picker click closes it |
| Waypoint cards (13×~8) | `.wp-card[data-verse-ref]` | click → pinned tooltip (1541) | div, not focusable |
| Tooltip "See in context" | `.tooltip-context-button` | click → dialog (1532) | |
| Context dialog | `<dialog>.verse-context-dialog` | close btn, backdrop click, "Even more context", own picker (onChoose → refresh) (1549–1558) | Esc native |
| Codes subtabs (5) | `.subtab` | click → show pane (977) | not in URL |
| Filmstrip marquees (13) | `[data-marquee]` | pointerdown/move/up/cancel, click-capture, mouseenter/leave, doc pointerdown (1788–1795) | rAF loop each; resize → rebuild all |
| Tabernacle station cards ↔ SVG nodes | `.tab-station-card`, `.svg-station-node` | body mouseover/out linkage; click node → scroll+flash card (1068–1116) | |
| Progress rail dots (9) | `#rail .rail-dot` | click → scroll (1826); scroll → fill (1850) | hidden ≤1280px; title only |
| Back to top | `#back-to-top` | scroll → visible; click (1874–1879) | |
| Trailhead cards (8) | `a.trailhead[href="#/id"]` | hashchange route | |
| Library cards | `a.shelf-item` (external, _blank) | | affordance hover-only |
| Walk-It-Out chips (10) | `span.legend-chip` | **static** — reuses interactive style | |
| Search | `#search-input` (absent) | wired 1928–1940 if present | dead |
| Deep links | `#/<section>` on load → instant scroll (route); `#t-<id>` handled only via preview link | scroll-margin-top 128 fixed |

## State axes
- Viewport: 375 (topbar 104px, nav wraps), 1024 (nav wraps, "LIBRARY" clipped), 1180 boundary, 1280 (rail hidden at exactly 1280), ≥1281 (rail + hero line labels).
- Theme: system dark (`prefers-color-scheme` block) vs toggle (`[data-theme]` block) — **`--t-garment` missing from toggle block**.
- Reduced motion: marquees off, hero anim off, view fade off.
- Translations: NIV NASB ESV KJV NLT AMP MSG (bolls.life) + TPT (worker → YouVersion 1849). Loading / loaded / failed states in tooltip and dialog.
- Codes tabs: prophecies · types · tabernacle · feasts · loose.

## Data paths
- `https://bolls.life/get-text/<VER>/<book>/<chapter>/` → JSON `[{verse, text}]`; text carries `<br>`, `<br/>`, `<S>` Strong's, `<sup>` notes (KJV), `<i>` (AMP), inline headings (NIV). Cleaned by `cleanBollsText` (1343): tags → ''.
- `https://esmrsky-scripture-api.esmrsky.workers.dev/passage?version=1849&passage=BOOK.c.v[-v]` (Origin-checked) → `{content, reference}`; ranges come as one blob; 404 for EXO/LEV/NUM/DEU (and others?).
- 486 unique abbreviated refs in content (all parse); ~20 spelled-out refs the linker misses.

## Motion
- 13 × rAF marquee loops (`tick` 1727) writing `scrollLeft` at 0.022px/ms; pause on hover/tap; resize → `initMarquees` rebuild (1813).
- CSS infinite: `.hero-node-halo` ping, `.hero-drop` drip, `.brand-thread` march, `.journey-route-path`/`.tabernacle-route` march (60s).
- CSS once: hero draw/pop/rise/fade, `.view` fade-in, `.flash`.
- Listeners: scroll ×2 (rail, back-to-top, both rAF-throttled), resize ×3 (marquees 150ms, rail 200ms, preview measure 80ms), hashchange, IO scrollspy (−45%/−45% band).
