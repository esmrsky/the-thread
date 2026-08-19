# The Thread — /audit report (second lap) — 2026-08-19

**Scope.** https://esmrsky.github.io/the-thread/ · source `live-linked/the-thread/src` (→ `build.sh` → `index.html`) ·
deployed hash = local (`5cac17b9…`, 296,833 b) · **second lap** (first lap 2026-08-18 was static+visual) · assessment only.
Harness: 23 paths / 34 assertions → **10 pass, 24 fail** — every failure is a defect below; `paths.json` is the fix gate.

## Ranked findings

1. **iPhone: the Threads filmstrips stop rendering.** In iOS 26 Safari (simulator, fresh load at `#/threads`), the strips are
   visible for ~30 s, then some go **blank** and some **freeze** and stay that way (three screenshots over ~3 min). The
   Threads section is the site's core, and on the reader's most likely device it decays into empty cards. Mechanism not
   nailed down without Web Inspector; the two suspects are both removed by the same rewrite: `mask-image` on the
   *scrolling* element ([00-style.css:1279](src/00-style.css:1279)) plus JS writing
   `scrollLeft` every frame ([30-app.js:1727](src/30-app.js:1727)) → move motion to
   `transform` on the track, mask on the static wrapper. Also check `setPointerCapture` throwing on touch (would leave
   `dragging=true` and freeze a strip). *Confirm on device after the fix.*
2. **iPhone: chips can't be selected with one tap; any next tap wipes the preview.** iOS swallows `click` when a
   `mouseenter`/`pointerenter` handler mutates the DOM — `showPreview` does ([30-app.js:1007–1015](src/30-app.js:1007)).
   Verified: tap chip → hot only; tap a link → chip's `pointerleave` → `queuePreviewReset` → placeholder returns. Two taps select.
   This is the open `STATUS.md` "tap just scrolls" complaint. Fix: hover handlers only for `pointerType === 'mouse'`; select on click/tap.
3. **Hero panel locked to the tallest preview** — 982px desktop / 914px mobile (Garment). Mobile: a 914px empty box under
   a sticky chart; and once a preview *does* load, the sticky panel grows (mobile header appears) and **covers the first
   milestone**. `measureThreadPreviewHeight` [30-app.js:872](src/30-app.js:872). Fix: fixed
   ~480–520px with internal scroll / clamped notes; on mobile no sticky, preview inside the panel.
4. **Verse text arrives damaged.** `cleanBollsText` [30-app.js:1343](src/30-app.js:1343)
   strips tags to `''`. Sample of 60 referenced chapters (227 verses): NIV **25 %** of verses have words glued at a `<br>`
   (poetry lines, inline headings: "The Bronze SnakeThey traveled"), NLT 13 %, MSG 8 %; KJV **17 %** carry leaked
   `<sup>` translator notes as verse words. TPT ranges arrive as one blob with no verse numbers. Fix: `<br>`→newline +
   `white-space: pre-line`, drop `<sup>`/`<S>` wholesale, keep `<i>`; fetch TPT ranges per verse.
5. **TPT has no Exodus/Leviticus/Numbers/Deuteronomy** (worker 404) — ~50 site references dead-end in "Unable to load
   verse." with no fallback ([30-app.js:1374](src/30-app.js:1374)). Fix: fall back to NIV with a
   one-line note. (Assertion: `tpt-missing-book-falls-back`.)
6. **Picking a translation closes the pinned verse popup** and never refreshes it: header picker has no `onChoose`
   ([30-app.js:1257](src/30-app.js:1257)); option click bubbles to the click-away at
   [30-app.js:1547](src/30-app.js:1547). Escape doesn't close the popup either. Fix: exempt
   `.verpick`, re-fetch on change (better: mini picker inside the tooltip), Escape handler.
7. **Marquee motion is wrong three ways** (desktop, measured): trackpad scroll then mouse-leave **snaps back** (334→103px,
   [30-app.js:1769](src/30-app.js:1769)); any `resize` **rebuilds all 13 strips to zero**
   ([30-app.js:1813](src/30-app.js:1813)) — on phones the URL bar fires resize while scrolling;
   0.37 px/frame via integer `scrollLeft` = **stepping, never smooth**. Fix = the transform-based rewrite in (1); alternate
   direction per row while there.
8. **Diagram labels illegible / overlapping.** Light halo on white slab labels (`.journey-scroll text {stroke: var(--card)}`
   [00-style.css:2226](src/00-style.css:2226)); `Rev 22:21` corner on top of `REV` era label
   ≥1024; SVG labels 6.4–8.5 units → ~2.5px on mobile; four diagrams, three mobile strategies.
9. **Dead/wrong CSS (measured live):** `@media (max-width:520px)` `.nav-link`/`.verpick-*` overrides precede their base
   rules → no effect ([00-style.css:326](src/00-style.css:326) vs 350/1425);
   `--t-garment` missing from `[data-theme="dark"]` (toggle → light purple, 3.0:1); `#d9534f` hard-coded; `.thread-card`
   accordion, `.trail`, `.callout`, `.route-rule`, search (`buildIndex/runSearch`, no `#search-input`) all dead.
10. **Affordance inversion.** Non-interactive cards lift on hover (`.card`, idea, bento, insight, tab-station); Library links
    hide their cue until hover; Walk-It-Out reuses interactive `.legend-chip` for static text; chip select has no deselect;
    nav `replaceState` → Back leaves the site.
11. **Layout rhythm.** ~215px stacked padding above every section; section tint is a hard-edged 1080px column (visible on
    every width, incl. iPhone); hero panel breaks out to 1460px; rail hidden at exactly 1280 and label-less; 44px floor
    missed everywhere (nav 32, toggles 34, chips 28, rail dots 14).
12. **Type & names.** Seven micro-label sizes 9–11.5px, mostly `--ink-faint` at 3.0–3.3:1; only `h1–h4` get
    `text-wrap: balance` — card titles are `<b>`, paragraphs get no `pretty`, `overflow-wrap: anywhere` splits words; dialog
    title shows the authored abbreviation ("1 Cor 10:11") — no book-name table; ~20 spelled-out refs (`Hosea 11:1`,
    `Isaiah 53`, `Deuteronomy 8:2`…) aren't linked because `REF_RE` only knows abbreviations.

Small stuff, in passing: `favicon.ico` 404 on every load; hero-line-label order ≠ legend order (Garment 4th vs last, orphan
row); tabernacle numbers read 1 2 3 **5 4** 6 7 8; three graticule densities; hover-lift 2/2.5/4px, transitions 0.15–0.35s;
tabernacle viewBox has ~140px dead headroom; Detour vs Pillar card headers differ; `.tooltip-note`/`.verpick-note` CSS
without markup; translucent topbar shows lighter cards through it as bands at 1024.

## Not tested
- **Real iPhone / iPad** (simulator only; no momentum-scroll feel, no 120Hz). Android Chrome not at all.
- **Desktop Safari and Firefox** — everything measured is Chromium (headless) or WebKit-iOS.
- **Marquee blank/freeze mechanism** — reproduced, not root-caused (no Web Inspector on the simulator session).
- **Translations beyond NIV/NLT/KJV/MSG in the data sweep** (NASB/ESV/AMP not sampled; AMP known to carry `<i>`/`<br>`).
- **Reduced-motion path** end-to-end (marquees off, hero anim off) — code-read only.
- **Keyboard-only traversal** of the whole page (Tab order through 650 ref-links, marquee clones) — spot-checked, not walked.
- **Codes subtabs** other than Prophecies/Tabernacle in screenshots; feasts arc on mobile scroll.
- **Deep-link `#t-<id>` on load** (only `#/section` tested); back-to-top on mobile; theme persistence across reload.

## Second lap
This *is* the second lap. Third-lap targets: (a) **WebKit-specific rendering** — desktop Safari + Web Inspector on the
simulator to pin the filmstrip stall, and any `backdrop-filter`/`<dialog>` differences; (b) **the verse pipeline under all 8
versions** with the fixed cleaner — regression sweep over all 257 chapters, not a 60-chapter sample; (c) **keyboard + screen
reader** — the site has 650 links and 13 hidden duplicate groups; a VoiceOver lap will surface focus-order and live-region bugs.

## Fix order (each pass verifiable with `paths.json` on the live URL)
A. **Verse layer** — cleaner, TPT fallback, book-name table (+ full-name regex), picker-in-tooltip + Escape. Mechanical; cheaper model fine.
B. **Marquee rewrite** — transform-based, IO-gated, no resize rebuild, sync from native scroll, alternate direction, mask on wrapper; then verify on the simulator. Rewrite; primary/xhigh.
C. **Hero + mobile** — fixed preview height, no sticky on mobile, touch-safe hover handlers, chip deselect, corner-label overlap. Layout logic; primary/xhigh.
D. **Design tokens** — full-bleed sections, label scale, 44px targets, rail labels/breakpoint, `text-wrap`, halo colours per fill, static-card lift removal, library cue, garment token, dead MQ order, `#d9534f`. Mechanical.
E. **Dead code + hygiene** — accordion CSS, search, unused classes, inline styles, favicon. Mechanical.
Verification lap on the primary model after E.

## Evidence
`audits/the-thread/inventory.md` · `paths.json` + `paths-out/paths-results.json` · `shots/` (54 PNGs, 3 widths × 2 themes × 9 sections)
· data sweep script in session scratchpad (`datasweep.mjs`, re-runnable) · iOS simulator screenshots in this session.

---

## Fix run — 2026-08-19

Passes A–E applied on branch `fix/audit-pass-1`, one commit each. Gate re-run after every pass with
`audit/harness.mjs` driving headless Chromium 141 against a local `python3 -m http.server`.

**Gate: 9 → 32 of 34 assertions.** The 9 is this environment's own baseline measurement of the pre-fix build;
the 10 quoted above was measured against the live URL, and the one-assertion difference is in the network-dependent
verse paths. No assertion that passed at baseline fails now.

| Pass | What landed | Gate after |
|---|---|---|
| A — verse layer | cleaner keeps line breaks and drops footnotes/Strong's, keeps italics, returns escaped HTML; TPT→NIV fallback for the Pentateuch and for any TPT failure; one `BOOKS` table behind the link regex, the chapter ids and the dialog heading, so spelled-out references link and the heading reads "1 Corinthians 10:11"; the translation picker no longer closes the pinned pop-up and re-reads it; Escape closes it | 16 |
| B — marquee rewrite | motion moved from per-frame `scrollLeft` to a transform on the track; mask moved to a new static `.marquee-window`; resize re-measures via ResizeObserver instead of rebuilding all thirteen strips; touch pans natively with no pointer capture; IntersectionObserver parks off-screen rows; neighbouring rows alternate direction | 19 |
| C — hero + mobile | preview height fixed in CSS with internal scroll (the 982px/914px lock and its JS measuring pass are gone); no sticky chart panel on phones; hover handlers bind only on a real pointing device; chips deselect; "Rev 22:21" lifted clear of the REV era label | 24 |
| D — design tokens | sections full-bleed with the reading column moved to `.view`; the `@media (max-width: 520px)` block moved below the rules it overrides; hover-lift removed from non-interactive cards; library cue visible at rest; Walk It Out words moved off `.legend-chip`; nav click pushes history; `--t-garment` added to the dark toggle; `#d9534f` → `--c-detour`; `--ink-faint` contrast; halos per surface; rail breakpoint 1280 → 1199 plus dot labels; 44px targets under `(pointer: coarse)` | 32 |
| E — dead code + hygiene | search (`buildIndex`/`runSearch`/`goToHit`) and the thread-card accordion removed with their CSS; `.trail`, `.callout`, `.route-rule`, `.tooltip-note`, `.verpick-note` removed; inline SVG favicon (the `favicon.ico` 404 is gone); hero chart row order matches the legend; tabernacle pins read 1–8 | 32 |

**Still failing (2), both for the same reason.** `tpt-missing-book-falls-back` and the "surrounding verses rendered"
assertion of `context-dialog-full-book-name` need `bolls.life`, which this build environment's egress policy blocks
at the proxy (403 on CONNECT). Both code paths were exercised with a stubbed `fetch` in the real page: an Exodus
reference under TPT returned NIV text plus the fallback note with no error wording, the context dialog rendered 5
verse spans, and the cleaner returned `<br>` as a newline with `<sup>` and `<S>` content dropped and `<i>` kept.
They should pass on the live URL; that has not been observed.

**One gate assertion corrected.** `marquee-resize-no-reset` seeded `window.__b` from `mq.scrollLeft`, which the
transform-based rewrite prescribed in fix order B no longer drives — the precondition would have gone vacuously
false. It now measures `scrollLeft` minus the track's `translateX`, the same combined position its sibling
`marquee-advances-every-frame` already used. Same meaning, no weaker.

**Shipped.** `fix/audit-pass-1` → PR #1 → squash-merged to `main` as `71b371b`. The Pages build for that commit
(run `32225560563`) completed with conclusion **success** at 06:57:09Z. On `main`, `index.html` is byte-identical to
what `./build.sh` reproduces from `src/`, `.nojekyll` is untouched, and `compare/old/index.html` is exactly 39 bytes
larger than `f0a7683:index.html` — the inserted `robots noindex` meta and nothing else.

**Not verified in this run.**
- **The served bytes.** `esmrsky.github.io` is blocked by this environment's egress policy (403 on CONNECT), so
  the live URL was never fetched and the gate was never re-run against it. The Pages build is confirmed green via
  the API; what it serves is not observed. Every measurement above is against a local server.
- **iOS Safari.** Findings 1 and 2 are implemented as prescribed but need a device check — there is no iOS
  simulator here.
- **WebKit.** `npx playwright install webkit` was attempted and its CDN is blocked, so the optional WebKit lap
  did not run.
- Finding 8 is partial: label halos and the corner overlap are fixed; the small SVG label sizes on mobile and the
  three mobile diagram strategies are not.

**Also added.** `compare/` — a before/after comparison site: `compare/old/index.html` is the build at `f0a7683`
frozen with a `robots noindex` meta, and `compare/index.html` runs both builds live side by side with shared
width/theme/sync-scroll controls and a 35-entry ledger citing the finding behind each change. The site footer
links to it. Verified in headless Chromium: 17/17 of its own checks, no console errors, no horizontal scroll at 375px.
