/* ================= app: helpers ================= */
const BG = 'https://www.biblegateway.com/passage/?search=';

/* One table for every book, so the three places that used to keep their own list stay in
   step: the link regex below, `parseReference`'s book ids, and the full name the context
   dialog shows. `names` holds every spelling that appears in the copy — abbreviated and
   spelled out — and `n` marks the numbered volumes so "2 Kings" and "Kings" resolve apart. */
const BOOKS = [
  { id: 1, full: 'Genesis', names: ['Gen', 'Genesis'] },
  { id: 2, full: 'Exodus', names: ['Ex', 'Exod', 'Exodus'] },
  { id: 3, full: 'Leviticus', names: ['Lev', 'Leviticus'] },
  { id: 4, full: 'Numbers', names: ['Num', 'Numbers'] },
  { id: 5, full: 'Deuteronomy', names: ['Deut', 'Deuteronomy'] },
  { id: 6, full: 'Joshua', names: ['Josh', 'Joshua'] },
  { id: 7, full: 'Judges', names: ['Judg', 'Judges'] },
  { id: 8, full: 'Ruth', names: ['Ruth'] },
  { id: 9, full: '1 Samuel', n: 1, names: ['Sam', 'Samuel'] },
  { id: 10, full: '2 Samuel', n: 2, names: ['Sam', 'Samuel'] },
  { id: 11, full: '1 Kings', n: 1, names: ['Kings'] },
  { id: 12, full: '2 Kings', n: 2, names: ['Kings'] },
  { id: 13, full: '1 Chronicles', n: 1, names: ['Chr', 'Chronicles'] },
  { id: 14, full: '2 Chronicles', n: 2, names: ['Chr', 'Chronicles'] },
  { id: 15, full: 'Ezra', names: ['Ezra'] },
  { id: 16, full: 'Nehemiah', names: ['Neh', 'Nehemiah'] },
  { id: 17, full: 'Esther', names: ['Esth', 'Esther'] },
  { id: 18, full: 'Job', names: ['Job'] },
  { id: 19, full: 'Psalms', names: ['Ps', 'Psalm', 'Psalms'] },
  { id: 20, full: 'Proverbs', names: ['Prov', 'Proverbs'] },
  { id: 21, full: 'Ecclesiastes', names: ['Eccl', 'Ecclesiastes'] },
  { id: 22, full: 'Song of Songs', names: ['Song'] },
  { id: 23, full: 'Isaiah', names: ['Isa', 'Isaiah'] },
  { id: 24, full: 'Jeremiah', names: ['Jer', 'Jeremiah'] },
  { id: 25, full: 'Lamentations', names: ['Lam', 'Lamentations'] },
  { id: 26, full: 'Ezekiel', names: ['Ezek', 'Ezekiel'] },
  { id: 27, full: 'Daniel', names: ['Dan', 'Daniel'] },
  { id: 28, full: 'Hosea', names: ['Hos', 'Hosea'] },
  { id: 29, full: 'Joel', names: ['Joel'] },
  { id: 30, full: 'Amos', names: ['Amos'] },
  { id: 31, full: 'Obadiah', names: ['Obad', 'Obadiah'] },
  { id: 32, full: 'Jonah', names: ['Jonah'] },
  { id: 33, full: 'Micah', names: ['Mic', 'Micah'] },
  { id: 34, full: 'Nahum', names: ['Nah', 'Nahum'] },
  { id: 35, full: 'Habakkuk', names: ['Hab', 'Habakkuk'] },
  { id: 36, full: 'Zephaniah', names: ['Zeph', 'Zephaniah'] },
  { id: 37, full: 'Haggai', names: ['Hag', 'Haggai'] },
  { id: 38, full: 'Zechariah', names: ['Zech', 'Zechariah'] },
  { id: 39, full: 'Malachi', names: ['Mal', 'Malachi'] },
  { id: 40, full: 'Matthew', names: ['Matt', 'Matthew'] },
  { id: 41, full: 'Mark', names: ['Mark'] },
  { id: 42, full: 'Luke', names: ['Luke'] },
  { id: 43, full: 'John', names: ['John'] },
  { id: 44, full: 'Acts', names: ['Acts'] },
  { id: 45, full: 'Romans', names: ['Rom', 'Romans'] },
  { id: 46, full: '1 Corinthians', n: 1, names: ['Cor', 'Corinthians'] },
  { id: 47, full: '2 Corinthians', n: 2, names: ['Cor', 'Corinthians'] },
  { id: 48, full: 'Galatians', names: ['Gal', 'Galatians'] },
  { id: 49, full: 'Ephesians', names: ['Eph', 'Ephesians'] },
  { id: 50, full: 'Philippians', names: ['Phil', 'Philippians'] },
  { id: 51, full: 'Colossians', names: ['Col', 'Colossians'] },
  { id: 52, full: '1 Thessalonians', n: 1, names: ['Thess', 'Thessalonians'] },
  { id: 53, full: '2 Thessalonians', n: 2, names: ['Thess', 'Thessalonians'] },
  { id: 54, full: '1 Timothy', n: 1, names: ['Tim', 'Timothy'] },
  { id: 55, full: '2 Timothy', n: 2, names: ['Tim', 'Timothy'] },
  { id: 56, full: 'Titus', names: ['Titus'] },
  { id: 57, full: 'Philemon', names: ['Philem', 'Philemon'] },
  { id: 58, full: 'Hebrews', names: ['Heb', 'Hebrews'] },
  { id: 59, full: 'James', names: ['Jas', 'James'] },
  { id: 60, full: '1 Peter', n: 1, names: ['Pet', 'Peter'] },
  { id: 61, full: '2 Peter', n: 2, names: ['Pet', 'Peter'] },
  { id: 62, full: '1 John', n: 1, names: ['John'] },
  { id: 63, full: '2 John', n: 2, names: ['John'] },
  { id: 64, full: '3 John', n: 3, names: ['John'] },
  { id: 65, full: 'Jude', names: ['Jude'] },
  { id: 66, full: 'Revelation', names: ['Rev', 'Revelation'] }
];

/* name → { 0: unnumbered id, 1: "1 X" id, … }; full name by id, for the dialog heading. */
const BOOK_BY_NAME = {};
const BOOK_FULL_BY_ID = {};
BOOKS.forEach(b => {
  BOOK_FULL_BY_ID[b.id] = b.full;
  b.names.forEach(name => {
    const slot = BOOK_BY_NAME[name] || (BOOK_BY_NAME[name] = {});
    slot[b.n || 0] = b.id;
  });
});

/* Longest name first so "Isaiah 53" matches as Isaiah rather than backtracking through "Isa". */
const BOOK_NAME_PATTERN = Array.from(new Set(BOOKS.flatMap(b => b.names)))
  .sort((a, b) => b.length - a.length).join('|');
const REF_RE = new RegExp(
  '\\b((?:[123]\\s)?(?:' + BOOK_NAME_PATTERN + ')\\s\\d+(?::\\d+(?:[-–]\\d+(?::\\d+)?)?(?:,\\s?\\d+(?:[-–]\\d+)?)*)?)', 'g');

function splitReferenceGroup(refs) {
  const parts = String(refs).split(/\s*;\s*/).filter(Boolean);
  let lastBook = '';
  const expanded = [];
  parts.forEach(part => {
    const book = part.match(/^((?:[123]\s)?[A-Za-z]+)\s+\d/);
    if (book) lastBook = book[1];
    else if (lastBook && /^\d/.test(part)) part = lastBook + ' ' + part;
    const commaGroup = part.match(/^((?:[123]\s)?[A-Za-z]+)\s+(\d+):(.+,.+)$/);
    if (commaGroup) {
      commaGroup[3].split(/\s*,\s*/).forEach(verse => expanded.push(commaGroup[1] + ' ' + commaGroup[2] + ':' + verse));
    } else {
      expanded.push(part);
    }
  });
  return expanded;
}

function singleRefLink(r) {
  return '<a class="ref-link" target="_blank" rel="noopener" href="' + BG + encodeURIComponent(r) + '" data-ref="' + r + '">' + r + '</a>';
}

/* Reads as the book, still carries the verse: hovering it opens the same pop-up as any reference. */
function namedRefLink(ref, label) {
  return '<a class="ref-link" target="_blank" rel="noopener" href="' + BG + encodeURIComponent(ref) + '" data-ref="' + ref + '">' + label + '</a>';
}

function refLink(r) {
  return splitReferenceGroup(r).map(singleRefLink).join('<span class="ref-separator">; </span>');
}
function linkRefs(html) { return html.replace(REF_RE, (m) => refLink(m)); }
/* Storage is a nice-to-have, never a dependency: opened straight off disk (or inside a
   sandboxed preview) reading localStorage throws SecurityError, and an unguarded read
   used to take boot() down with it — leaving a page with a header and no content. */
function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* preferences just won't persist */ } }

/* Swapped content fades in; without this every verse, preview and passage replaces itself mid-read. */
function flashSwap(el) {
  if (!el) return;
  el.classList.remove('swap-in');
  void el.offsetWidth;
  el.classList.add('swap-in');
}
function setHTML(el, html) {
  if (!el) return;
  el.innerHTML = html;
  flashSwap(el);
}

function refRow(refs) {
  return '<div class="pillar-refs">' + refs.map(refLink).join(' · ') + '</div>';
}
function badge(kind) {
  const b = CODES.badges[kind];
  return '<span class="badge ' + b.cls + '" title="' + b.tip + '">' + b.label + '</span>';
}
/* A label alone left eight blocks reading as one wall of prose; the icon gives each panel a handle. */
const PANEL_ICONS = [
  [/brain|neuro|scan/, 'brain'],
  [/discern|test/, 'key'],
  [/gratitude|joy/, 'light'],
  [/treasure/, 'star'],
  [/ditch|trap/, 'fork'],
  [/jesus|model/, 'cross'],
  [/prayer|gears/, 'temple'],
  [/attach|relationship/, 'heart'],
  [/elijah|wind|breath/, 'wind'],
  [/sleep|rest|pace|body/, 'rest'],
  [/hear|comes|voice/, 'ear'],
  [/scripture|biblical|frame/, 'scroll'],
  [/practice|tool|checklist|path/, 'tool']
];
function panelIcon(label) {
  const l = String(label || '').toLowerCase();
  for (let i = 0; i < PANEL_ICONS.length; i++) if (PANEL_ICONS[i][0].test(l)) return PANEL_ICONS[i][1];
  return 'compass';
}
function panelHead(label) {
  return '<div class="mind-panel-top"><span class="mind-panel-ic">' + icon(panelIcon(label)) +
    '</span><span class="label">' + label + '</span></div>';
}

function paragraphCards(html, labels) {
  const parts = html.match(/<p>[\s\S]*?<\/p>/g) || [html];
  return parts.map((part, i) =>
    '<div class="mind-panel">' +
    panelHead(labels && labels[i] ? labels[i] : 'Field note ' + (i + 1)) +
    linkRefs(part) + '</div>').join('');
}

const NAV = [
  { id: 'start', label: 'Start Here', icon: 'compass', cvar: '--c-start', blurb: 'The big idea in five moves — and how to read without wasting your Bible.' },
  { id: 'pattern', label: 'The Pattern', icon: 'dune', cvar: '--c-pattern', blurb: 'Egypt → Wilderness → Promised Land: the three seasons every life walks through.' },
  { id: 'threads', label: 'Threads', icon: 'thread', cvar: '--c-threads', blurb: 'Thirteen routes traced Genesis to Revelation — every one lands on Jesus.' },
  { id: 'codes', label: 'The Codes', icon: 'key', cvar: '--c-codes', blurb: 'Prophecies, types & shadows, and the feasts — with honesty badges on every claim.' },
  { id: 'triune', label: 'Threefold Witness', icon: 'trinity', cvar: '--c-triune', blurb: 'Father, Son, and Spirit shown plainly — and echoed through the story patterns.' },
  { id: 'walking', label: 'Walk It Out', icon: 'walk', cvar: '--c-walk', blurb: 'Identity, righteousness, rest, healing — new-covenant life without the old software.' },
  { id: 'detours', label: 'Detours', icon: 'fork', cvar: '--c-detour', blurb: 'Twelve sincere wrong turns, marked on the map — each with the on-ramp back.' },
  { id: 'mind', label: 'Mind & Body', icon: 'brain', cvar: '--c-mind', blurb: 'Where scripture and neuroscience shake hands: emotions, meditation, sound, hearing God.' },
  { id: 'library', label: 'Library', icon: 'book', cvar: '--c-library', blurb: 'The curated pack: books, videos, podcasts — with discernment notes included.' }
];

/* ================= hero thread chart ================= */
function buildHeroChart() {
  /* the chart's row order is the legend's order — they used to disagree on Garment */
  const ths = THREADS.slice();
  const X0 = 34, CX = 528, CY = 158, XE = 706;
  const n = ths.length, top = 42, bot = 276;
  let paths = '';
  let labels = '';
  ths.forEach((t, i) => {
    const y0 = top + (bot - top) * (i / (n - 1));
    const midY = y0 + (CY - y0) * 0.42 + (i % 2 ? 10 : -10);
    const d = 'M' + X0 + ' ' + y0 +
      ' C 150 ' + y0 + ', 200 ' + midY + ', 296 ' + midY +
      ' S 462 ' + CY + ', ' + CX + ' ' + CY;
    // Thin visual colored path
    paths += '<path class="hero-thread" data-thread="' + t.id + '" style="--i:' + i + '" d="' + d + '" fill="none" stroke="var(' + t.cvar + ')" stroke-width="2.2" stroke-linecap="round"></path>';
    // Thicker invisible trigger path on top of visual path
    paths += '<path class="hero-thread-trigger" data-thread="' + t.id + '" d="' + d + '" fill="none" stroke="transparent" stroke-width="16" stroke-linecap="round"></path>';
    labels += '<text class="hero-line-label" data-thread="' + t.id + '" x="-10" y="' + (y0 + 3) + '" text-anchor="end" font-size="7.2" letter-spacing="0.7" fill="var(' + t.cvar + ')" style="font-family:var(--font-label);font-weight:700">' + t.name.toUpperCase() + '</text>';
  });
  const eras = [[70, 'TORAH'], [180, 'HISTORY'], [277, 'POETS'], [398, 'PROPHETS'], [528, 'GOSPELS'], [622, 'LETTERS'], [694, 'REV']];
  let ticks = '';
  eras.forEach(([x, l]) => {
    ticks += '<line class="hero-era" x1="' + x + '" y1="288" x2="' + x + '" y2="294" stroke="var(--line)" stroke-width="1.5"/>' +
      '<text class="hero-era" x="' + x + '" y="306" text-anchor="middle" font-size="8.5" letter-spacing="1.5" fill="var(--ink-faint)" style="font-family:var(--font-label);font-weight:600">' + l + '</text>';
  });
  return '<svg class="hero-svg hero-svg-h" viewBox="0 0 720 316" role="img" aria-label="Thirteen biblical themes converging on Jesus and continuing to Revelation">' +
    labels + paths +
    '<path class="hero-spur hero-spur-glow" d="M' + CX + ' ' + CY + ' H' + XE + '" stroke="var(--gold)" stroke-width="10" stroke-linecap="round" opacity="0.14"/>' +
    '<path class="hero-spur" d="M' + CX + ' ' + CY + ' H' + XE + '" stroke="var(--gold)" stroke-width="4" stroke-linecap="round" opacity="0.9"/>' +
    '<circle class="hero-node-halo" cx="' + CX + '" cy="' + CY + '" r="5.5" fill="none" stroke="var(--gold)" stroke-width="1.6"/>' +
    '<circle class="hero-node" cx="' + CX + '" cy="' + CY + '" r="5.5" fill="var(--gold)"/>' +
    '<path class="hero-cross" d="M' + CX + ' 118 v-26 M' + (CX - 9) + ' 101 h18" stroke="var(--gold)" stroke-width="3" stroke-linecap="round"/>' +
    '<line class="hero-drop" x1="' + CX + '" y1="124" x2="' + CX + '" y2="' + (CY - 8) + '" stroke="var(--gold)" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.8"/>' +
    '<text class="hero-jesus" x="' + CX + '" y="82" text-anchor="middle" font-size="10" letter-spacing="2.5" fill="var(--gold)" style="font-family:var(--font-label);font-weight:700">JESUS</text>' +
    ticks +
    '</svg>';
}

/* Arms the hero chart's draw-in. Path lengths are measured here and handed to CSS,
   so nothing is hidden until the measurement actually succeeded — if this never runs,
   the chart simply renders finished. */
function initHeroChart() {
  const svgs = document.querySelectorAll('.hero-scroll .hero-svg');
  if (!svgs.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  svgs.forEach(svg => {
    if (svg.classList.contains('hero-anim')) return;
    try {
      svg.querySelectorAll('.hero-thread, .hero-spur').forEach(p => {
        p.style.setProperty('--len', Math.ceil(p.getTotalLength()));
      });
    } catch (e) { return; }
    svg.classList.add('hero-anim');
  });
}

/* ================= journey diorama (pattern) — isometric 3-tier scene ================= */
function buildJourneySVG() {
  const P = n => n.map(a => a.map(Math.round).join(',')).join(' '); // polygon points
  // an isometric slab (raised 3D block): returns its faces + a point-on-top helper
  function slab(x, y, W, D, cvar) {
    const dx = D * 0.72, dy = D * 0.5, T = 26;
    const A = [x, y], B = [x + W, y], C = [x + W + dx, y - dy], Dp = [x + dx, y - dy];
    const svg =
      '<polygon points="' + P([B, C, [C[0], C[1] + T], [B[0], B[1] + T]]) + '" fill="var(' + cvar + ')"/>' +
      '<polygon points="' + P([B, C, [C[0], C[1] + T], [B[0], B[1] + T]]) + '" fill="#000" opacity="0.24"/>' +
      '<polygon points="' + P([A, B, [B[0], B[1] + T], [A[0], A[1] + T]]) + '" fill="var(' + cvar + ')"/>' +
      '<polygon points="' + P([A, B, [B[0], B[1] + T], [A[0], A[1] + T]]) + '" fill="#000" opacity="0.1"/>' +
      '<polygon points="' + P([A, B, C, Dp]) + '" fill="var(' + cvar + ')"/>' +
      '<polygon points="' + P([A, B, C, Dp]) + '" fill="#fff" opacity="0.16"/>';
    return { svg, T, pt: (u, v) => [x + u * W + v * dx, y - v * dy] };
  }
  // upright sprite helpers (2.5D: they stand on the slab top)
  const pyramid = (bx, by, w, h) =>
    '<polygon points="' + P([[bx, by - h], [bx - w, by], [bx, by + 5]]) + '" fill="#c9a86a"/>' +
    '<polygon points="' + P([[bx, by - h], [bx + w, by], [bx, by + 5]]) + '" fill="#a9884d"/>';
  const tent = (bx, by, w, h) =>
    '<polygon points="' + P([[bx, by - h], [bx - w, by], [bx + w, by]]) + '" fill="#d8c39a"/>' +
    '<polygon points="' + P([[bx, by - h], [bx + w * 0.15, by], [bx + w, by]]) + '" fill="#b79a63"/>' +
    '<path d="M' + (bx - 5) + ' ' + by + ' L' + bx + ' ' + (by - h * 0.5) + ' L' + (bx + 5) + ' ' + by + '" fill="#5b4a2a"/>';
  const hill = (bx, by, w, h, c) =>
    '<path d="M' + (bx - w) + ' ' + by + ' Q' + bx + ' ' + (by - h) + ' ' + (bx + w) + ' ' + by + ' Z" fill="' + c + '"/>';
  const grapes = (bx, by) => {
    let g = '<path d="M' + bx + ' ' + (by - 26) + ' q7 -6 3 -13" stroke="#6a7f3a" stroke-width="2" fill="none"/>';
    const rows = [[-8, -20], [0, -20], [8, -20], [-4, -13], [4, -13], [0, -6]];
    rows.forEach(o => { g += '<circle cx="' + (bx + o[0]) + '" cy="' + (by + o[1]) + '" r="5" fill="#7d5aa0"/>'; });
    return g;
  };
  const sun = (cx, cy, r) => {
    let rays = '';
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; rays += '<line x1="' + (cx + Math.cos(a) * (r + 4)) + '" y1="' + (cy + Math.sin(a) * (r + 4)) + '" x2="' + (cx + Math.cos(a) * (r + 11)) + '" y2="' + (cy + Math.sin(a) * (r + 11)) + '" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" opacity="0.7"/>'; }
    return rays + '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="var(--gold)" opacity="0.9"/>';
  };
  const cityWall = (bx, by) =>
    '<rect x="' + (bx - 26) + '" y="' + (by - 26) + '" width="52" height="26" fill="#cdb98f"/>' +
    '<rect x="' + (bx - 26) + '" y="' + (by - 26) + '" width="52" height="26" fill="#000" opacity="0.08"/>' +
    '<path d="M' + (bx - 26) + ' ' + (by - 26) + ' h6 v-5 h5 v5 h6 v-5 h5 v5 h6 v-5 h5 v5 h6 v-5 h5 v5 h5" fill="#b8a271"/>' +
    '<rect x="' + (bx - 6) + '" y="' + (by - 16) + '" width="12" height="16" fill="#6b5836"/>';
  const pins = []; // waypoint pins drawn last, on top of the route
  const pin = (x, y, n, name, dy) => {
    let label = '';
    if (name) {
      const lines = name.split('|');
      const y0 = y + (dy || 22);
      const onSlab = !dy || dy > 0; // below-pin labels sit on a colored slab: use light ink
      const c1 = onSlab ? '#fff" opacity="0.92' : 'var(--ink-soft)';
      const c2 = onSlab ? '#fff" opacity="0.72' : 'var(--ink-faint)';
      label = '<text x="' + x + '" y="' + y0 + '" text-anchor="middle" font-size="7.4" letter-spacing="0.8" fill="' + c1 + '" style="font-family:var(--font-label);font-weight:700">' + lines[0] + '</text>' +
        (lines[1] ? '<text x="' + x + '" y="' + (y0 + (dy && dy < 0 ? -10 : 10)) + '" text-anchor="middle" font-size="6.4" letter-spacing="0.8" fill="' + c2 + '" style="font-family:var(--font-label);font-weight:700">' + lines[1] + '</text>' : '');
    }
    pins.push('<g class="journey-pin"><circle cx="' + x + '" cy="' + y + '" r="9" fill="var(--card)" stroke="var(--thread)" stroke-width="2.5"/><text x="' + x + '" y="' + (y + 3.2) + '" text-anchor="middle" font-size="9" fill="var(--thread)" style="font-family:var(--font-label);font-weight:700">' + n + '</text>' + label + '</g>');
  };
  const flag = (x, y, txt, c) =>
    '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="9" letter-spacing="1.4" fill="' + (c || 'var(--ink-soft)') + '" style="font-family:var(--font-label);font-weight:700">' + txt + '</text>';
  const seaGap = (x0, x1, yTop, name) => {
    const w = x1 - x0;
    let waves = '';
    for (let i = 0; i < 3; i++) waves += '<path d="M' + (x0 + 6) + ' ' + (yTop + 10 + i * 8) + ' q' + (w / 4) + ' -6 ' + (w / 2) + ' 0 t' + (w / 2) + ' 0" stroke="#e9f2f6" stroke-width="1.5" fill="none" opacity="0.5"/>';
    return '<polygon points="' + P([[x0, yTop], [x1, yTop - 16], [x1, yTop + 34], [x0, yTop + 50]]) + '" fill="var(--t-water)" opacity="0.85"/>' + waves +
      '<text x="' + (x0 + w / 2) + '" y="' + (yTop + 24) + '" text-anchor="middle" font-size="8" letter-spacing="1" fill="#fff" style="font-family:var(--font-label);font-weight:700" transform="rotate(-9 ' + (x0 + w / 2) + ' ' + (yTop + 24) + ')">' + name + '</text>';
  };

  const eg = slab(34, 322, 168, 84, '--s-egypt');
  const de = slab(320, 276, 196, 90, '--s-desert');
  const la = slab(628, 224, 188, 90, '--s-land');

  // route across the tops, dipping through each sea
  const rEg = eg.pt(0.62, 0.5), aEg = eg.pt(0.12, 0.42);
  const rDe1 = de.pt(0.14, 0.5), rDeMid = de.pt(0.5, 0.55), rDe2 = de.pt(0.9, 0.5);
  const rLa1 = la.pt(0.12, 0.5), rLa2 = la.pt(0.86, 0.55);
  const route = 'M' + aEg.map(Math.round).join(' ') + ' L' + rEg.map(Math.round).join(' ') +
    ' Q' + Math.round(rEg[0] + 40) + ' ' + Math.round(rEg[1] + 24) + ' ' + rDe1.map(Math.round).join(' ') +
    ' L' + rDeMid.map(Math.round).join(' ') +
    ' a24 24 0 1 1 14 6' + // the 40-year loop at Kadesh — one lap for a generation
    ' L' + rDe2.map(Math.round).join(' ') +
    ' Q' + Math.round(rDe2[0] + 40) + ' ' + Math.round(rDe2[1] + 20) + ' ' + rLa1.map(Math.round).join(' ') +
    ' L' + rLa2.map(Math.round).join(' ');

  // pins on key points, each named
  pin(aEg[0], aEg[1], 1, 'GOSHEN|DELIVERED', 24);
  pin(rDe1[0], rDe1[1], 2, 'SINAI|IDENTITY SPOKEN', 24);
  pin(rDeMid[0], rDeMid[1], 3, 'KADESH|THE CHOICE', 28);
  pin(rLa1[0], rLa1[1], 4, 'GILGAL|MANNA STOPS', -20);
  pin(rLa2[0], rLa2[1], 5, 'FRUITFULNESS', 22);
  pins.push('<text x="' + Math.round(rDeMid[0] + 7) + '" y="' + Math.round(rDeMid[1] - 56) + '" text-anchor="middle" font-size="7.2" letter-spacing="1.2" fill="var(--s-desert)" style="font-family:var(--font-label);font-weight:700">40-YEAR LOOP · NUM 14:33</text>');

  const eL = eg.pt(0.4, 0.55), eL2 = eg.pt(0.75, 0.5);
  const dT = de.pt(0.8, 0.85), dFire = de.pt(0.28, 0.6), mtn = de.pt(0.06, 0.8);
  const lH = la.pt(0.78, 0.7), lG = la.pt(0.62, 0.5), lC = la.pt(0.28, 0.85);
  const nile1 = eg.pt(0.02, 1), nile2 = eg.pt(0.07, 0);

  return '<svg viewBox="0 0 900 430" role="img" aria-label="An isometric journey from Egypt through the wilderness into the promised land">' +
    sun(150, 70, 16) +
    // pillar of cloud (day) & fire (night) over the wilderness
    (function () {
      var px = Math.round(dFire[0]), pb = Math.round(dFire[1] - 2), ptop = pb - 138;
      return '<rect x="' + (px - 9) + '" y="' + ptop + '" width="18" height="' + (pb - ptop) + '" rx="9" fill="var(--s-desert)" opacity="0.26"/>' +
        '<rect x="' + (px - 9) + '" y="' + (pb - 44) + '" width="18" height="42" rx="9" fill="var(--thread)" opacity="0.5"/>' +
        '<g fill="var(--s-desert)" opacity="0.42"><circle cx="' + px + '" cy="' + ptop + '" r="13"/><circle cx="' + (px - 11) + '" cy="' + (ptop + 5) + '" r="9"/><circle cx="' + (px + 11) + '" cy="' + (ptop + 5) + '" r="9"/></g>' +
        '<path d="M' + px + ' ' + (pb - 3) + ' q-9 -13 0 -24 q3 7 4 4 q4 -9 -1 -17 q13 9 8 25 q-2 8 -11 12z" fill="var(--thread)" opacity="0.72"/>';
    })() +
    la.svg + seaGap(560, 626, 300, 'JORDAN') +
    de.svg + seaGap(250, 318, 350, 'RED SEA') +
    eg.svg +
    // elements
    '<path d="M' + Math.round(nile1[0]) + ' ' + Math.round(nile1[1]) + ' L' + Math.round(nile2[0]) + ' ' + Math.round(nile2[1]) + '" stroke="var(--t-water)" stroke-width="7" stroke-linecap="round" opacity="0.4"/>' +
    pyramid(eL[0], eL[1], 30, 62) + pyramid(eL2[0], eL2[1], 20, 42) +
    // Mount Sinai, smoking (Ex 19:18)
    '<path d="M' + Math.round(mtn[0] - 18) + ' ' + Math.round(mtn[1]) + ' L' + Math.round(mtn[0]) + ' ' + Math.round(mtn[1] - 34) + ' L' + Math.round(mtn[0] + 18) + ' ' + Math.round(mtn[1]) + ' Z" fill="color-mix(in srgb, var(--s-desert) 70%, #000 14%)"/>' +
    '<circle cx="' + Math.round(mtn[0]) + '" cy="' + Math.round(mtn[1] - 40) + '" r="5" fill="var(--s-egypt)" opacity="0.5"/>' +
    '<circle cx="' + Math.round(mtn[0] + 6) + '" cy="' + Math.round(mtn[1] - 46) + '" r="3.6" fill="var(--s-egypt)" opacity="0.35"/>' +
    tent(dT[0], dT[1], 26, 40) +
    hill(lH[0] - 14, lH[1], 30, 26, 'color-mix(in srgb, var(--s-land) 78%, #000 10%)') + hill(lH[0] + 16, lH[1], 34, 34, 'var(--s-land)') +
    grapes(lG[0], lG[1]) + cityWall(lC[0], lC[1]) +
    '<text x="' + Math.round(lC[0]) + '" y="' + Math.round(lC[1] - 32) + '" text-anchor="middle" font-size="6.8" letter-spacing="1" fill="var(--ink-soft)" style="font-family:var(--font-label);font-weight:700">JERICHO · JOSH 6</text>' +
    '<path class="journey-route-path" d="' + route + '" fill="none" stroke="var(--thread)" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 7"/>' +
    pins.join('') +
    // zone banners
    flag(eg.pt(0.5, -0.05)[0], 405, 'EGYPT', 'var(--s-egypt)') + flag(eg.pt(0.5, -0.05)[0], 419, 'BONDAGE') +
    flag(de.pt(0.5, -0.05)[0], 405, 'WILDERNESS', 'var(--s-desert)') + flag(de.pt(0.5, -0.05)[0], 419, 'FORMATION') +
    flag(la.pt(0.5, -0.05)[0], 405, 'PROMISED LAND', 'var(--s-land)') + flag(la.pt(0.5, -0.05)[0], 419, 'INHERITANCE') +
    '</svg>';
}

function buildTabernacleSVG() {
  // isometric courtyard: top surface pt(u,v), u = east→west, v = front→back
  const X = 70, Y = 330, W = 640, D = 150, DX = D * 0.72, DY = D * 0.5, T = 22;
  const pt = (u, v) => [Math.round(X + u * W + v * DX), Math.round(Y - v * DY)];
  const P = n => n.map(a => a.map(Math.round).join(',')).join(' ');
  const A = [X, Y], B = [X + W, Y], C = [X + W + DX, Y - DY], Dp = [X + DX, Y - DY];

  const ground =
    '<polygon points="' + P([B, C, [C[0], C[1] + T], [B[0], B[1] + T]]) + '" fill="var(--s-desert)"/>' +
    '<polygon points="' + P([B, C, [C[0], C[1] + T], [B[0], B[1] + T]]) + '" fill="#000" opacity="0.22"/>' +
    '<polygon points="' + P([A, B, [B[0], B[1] + T], [A[0], A[1] + T]]) + '" fill="var(--s-desert)"/>' +
    '<polygon points="' + P([A, B, [B[0], B[1] + T], [A[0], A[1] + T]]) + '" fill="#000" opacity="0.1"/>' +
    '<polygon points="' + P([A, B, C, Dp]) + '" fill="var(--s-desert)"/>' +
    '<polygon points="' + P([A, B, C, Dp]) + '" fill="#fff" opacity="0.28"/>';

  // linen fence: posts + rail on the front edge and the east (left) edge, gate gap on the east
  let fence = '';
  for (let u = 0; u <= 1.001; u += 0.1) { const p = pt(u, 0); fence += '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + p[0] + '" y2="' + (p[1] - 14) + '" stroke="var(--ink-faint)" stroke-width="1.6" opacity="0.55"/>'; }
  fence += '<line x1="' + pt(0, 0)[0] + '" y1="' + (pt(0, 0)[1] - 14) + '" x2="' + pt(1, 0)[0] + '" y2="' + (pt(1, 0)[1] - 14) + '" stroke="var(--ink-faint)" stroke-width="1.2" opacity="0.45"/>';
  [0, 0.2, 0.8, 1].forEach(v => { const p = pt(0, v); fence += '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + p[0] + '" y2="' + (p[1] - 14) + '" stroke="var(--ink-faint)" stroke-width="1.6" opacity="0.55"/>'; });

  // stations (order must match CODES.tabernacle.stations / data-index 0-7)
  const sGate = pt(0.02, 0.5), sAltar = pt(0.15, 0.5), sLaver = pt(0.28, 0.5),
    sTable = pt(0.52, 0.28), sLamp = pt(0.52, 0.72), sIncense = pt(0.68, 0.5),
    sVeil = pt(0.79, 0.5), sArk = pt(0.9, 0.5);

  // tent: floor + two cutaway walls (back + west), gold boards
  const f1 = pt(0.42, 0.12), f2 = pt(0.98, 0.12), f3 = pt(0.98, 0.88), f4 = pt(0.42, 0.88), H = 44;
  const up = (p) => [p[0], p[1] - H];
  const tent =
    '<polygon points="' + P([f1, f2, f3, f4]) + '" fill="var(--gold)" opacity="0.1"/>' +
    '<polygon points="' + P([f4, f3, up(f3), up(f4)]) + '" fill="var(--gold)" opacity="0.28"/>' +
    '<polygon points="' + P([f3, f2, up(f2), up(f3)]) + '" fill="var(--gold)" opacity="0.4"/>' +
    '<polygon points="' + P([f1, f2, f3, f4]) + '" fill="none" stroke="var(--gold)" stroke-width="1.4" opacity="0.55"/>' +
    '<line x1="' + f4[0] + '" y1="' + f4[1] + '" x2="' + up(f4)[0] + '" y2="' + up(f4)[1] + '" stroke="var(--gold)" stroke-width="1.4" opacity="0.55"/>' +
    '<line x1="' + f3[0] + '" y1="' + f3[1] + '" x2="' + up(f3)[0] + '" y2="' + up(f3)[1] + '" stroke="var(--gold)" stroke-width="1.4" opacity="0.55"/>' +
    '<line x1="' + f2[0] + '" y1="' + f2[1] + '" x2="' + up(f2)[0] + '" y2="' + up(f2)[1] + '" stroke="var(--gold)" stroke-width="1.4" opacity="0.55"/>';

  // the veil: a curtain quad across the tent at u=0.79
  const v1 = pt(0.79, 0.12), v2 = pt(0.79, 0.88);
  const veil =
    '<polygon points="' + P([v1, v2, [v2[0], v2[1] - 40], [v1[0], v1[1] - 40]]) + '" fill="var(--c-codes)" opacity="0.4"/>' +
    '<line x1="' + v1[0] + '" y1="' + (v1[1] - 40) + '" x2="' + v2[0] + '" y2="' + (v2[1] - 40) + '" stroke="var(--c-codes)" stroke-width="1.6" opacity="0.7"/>';

  // furniture (2.5D sprites)
  const box3 = (x, y, w, h, cMain, o) =>
    '<rect x="' + (x - w / 2) + '" y="' + (y - h) + '" width="' + w + '" height="' + h + '" fill="' + cMain + '"' + (o ? ' opacity="' + o + '"' : '') + '/>' +
    '<polygon points="' + P([[x - w / 2, y - h], [x + w / 2, y - h], [x + w / 2 + 6, y - h - 4], [x - w / 2 + 6, y - h - 4]]) + '" fill="' + cMain + '"/>' +
    '<polygon points="' + P([[x - w / 2, y - h], [x + w / 2, y - h], [x + w / 2 + 6, y - h - 4], [x - w / 2 + 6, y - h - 4]]) + '" fill="#fff" opacity="0.25"/>' +
    '<polygon points="' + P([[x + w / 2, y - h], [x + w / 2 + 6, y - h - 4], [x + w / 2 + 6, y - 4], [x + w / 2, y]]) + '" fill="' + cMain + '"/>' +
    '<polygon points="' + P([[x + w / 2, y - h], [x + w / 2 + 6, y - h - 4], [x + w / 2 + 6, y - 4], [x + w / 2, y]]) + '" fill="#000" opacity="0.22"/>';
  const bronze = '#a5673a';
  const gate =
    '<line x1="' + (sGate[0] - 13) + '" y1="' + (sGate[1] + 4) + '" x2="' + (sGate[0] - 13) + '" y2="' + (sGate[1] - 24) + '" stroke="var(--ink-soft)" stroke-width="2"/>' +
    '<line x1="' + (sGate[0] + 13) + '" y1="' + (sGate[1] + 4) + '" x2="' + (sGate[0] + 13) + '" y2="' + (sGate[1] - 24) + '" stroke="var(--ink-soft)" stroke-width="2"/>' +
    '<rect x="' + (sGate[0] - 13) + '" y="' + (sGate[1] - 24) + '" width="26" height="17" fill="var(--thread)" opacity="0.5"/>';
  const altar = box3(sAltar[0], sAltar[1], 20, 15, bronze) +
    '<path d="M' + sAltar[0] + ' ' + (sAltar[1] - 17) + ' q-4 -7 0 -12 q2 4 4 2 q3 5 -1 10z" fill="var(--thread)" opacity="0.85"/>';
  const laver =
    '<ellipse cx="' + sLaver[0] + '" cy="' + (sLaver[1] - 8) + '" rx="12" ry="5" fill="' + bronze + '"/>' +
    '<ellipse cx="' + sLaver[0] + '" cy="' + (sLaver[1] - 9.5) + '" rx="9" ry="3.4" fill="var(--t-water)" opacity="0.85"/>' +
    '<path d="M' + (sLaver[0] - 7) + ' ' + (sLaver[1] - 6) + ' q7 6 14 0 l-2 6 h-10z" fill="' + bronze + '"/>';
  const table = box3(sTable[0], sTable[1], 18, 12, 'var(--gold)') +
    '<circle cx="' + (sTable[0] - 3) + '" cy="' + (sTable[1] - 14) + '" r="2.2" fill="var(--card)"/>' +
    '<circle cx="' + (sTable[0] + 4) + '" cy="' + (sTable[1] - 15) + '" r="2.2" fill="var(--card)"/>';
  let lamp = '<line x1="' + sLamp[0] + '" y1="' + sLamp[1] + '" x2="' + sLamp[0] + '" y2="' + (sLamp[1] - 18) + '" stroke="var(--gold)" stroke-width="2"/>' +
    '<path d="M' + (sLamp[0] - 10) + ' ' + (sLamp[1] - 18) + ' a10 10 0 0 1 20 0 M' + (sLamp[0] - 5.5) + ' ' + (sLamp[1] - 18) + ' a5.5 5.5 0 0 1 11 0" fill="none" stroke="var(--gold)" stroke-width="2"/>';
  for (let k = -3; k <= 3; k++) { const lx = sLamp[0] + k * (k === 0 ? 0 : (Math.abs(k) === 1 ? 5.5 : (Math.abs(k) === 2 ? 8 : 10))); lamp += '<circle cx="' + lx + '" cy="' + (sLamp[1] - (k === 0 ? 22 : 20)) + '" r="1.6" fill="var(--thread)"/>'; }
  const incense = box3(sIncense[0], sIncense[1], 11, 15, 'var(--gold)') +
    '<path d="M' + sIncense[0] + ' ' + (sIncense[1] - 19) + ' q-4 -6 1 -11 q-4 -5 1 -9" fill="none" stroke="var(--ink-faint)" stroke-width="1.6" opacity="0.8"/>';
  const ark =
    '<circle cx="' + sArk[0] + '" cy="' + (sArk[1] - 10) + '" r="26" fill="var(--gold)" opacity="0.16"/>' +
    box3(sArk[0], sArk[1], 22, 13, 'var(--gold)') +
    '<path d="M' + (sArk[0] - 8) + ' ' + (sArk[1] - 15) + ' q-5 -7 2 -8 M' + (sArk[0] + 8) + ' ' + (sArk[1] - 15) + ' q5 -7 -2 -8" fill="none" stroke="var(--gold)" stroke-width="1.8"/>';

  // route: outside → gate → altar → laver → into the tent → table → lamp → incense → veil → ark
  const entry = pt(0.44, 0.5);
  const route = 'M' + (sGate[0] - 46) + ' ' + sGate[1] + ' L' + sGate.join(' ') + ' L' + sAltar.join(' ') + ' L' + sLaver.join(' ') +
    ' L' + entry.join(' ') + ' L' + sTable.join(' ') + ' L' + sLamp.join(' ') + ' L' + sIncense.join(' ') + ' L' + sVeil.join(' ') + ' L' + sArk.join(' ');

  // numbered pins + staggered name labels in the sky
  const stations = [
    { p: sGate, name: 'THE GATE', pinY: 248 }, { p: sAltar, name: 'BRONZE ALTAR', pinY: 248 }, { p: sLaver, name: 'THE LAVER', pinY: 248 },
    { p: sTable, name: 'TABLE OF BREAD', pinY: 202 }, { p: sLamp, name: 'LAMPSTAND', pinY: 202 }, { p: sIncense, name: 'ALTAR OF INCENSE', pinY: 202 },
    { p: sVeil, name: 'THE VEIL', pinY: 202 }, { p: sArk, name: 'MERCY SEAT', pinY: 202 }
  ];
  const nodeElements = stations.map((s, i) => {
    const zone = i >= 6 ? 'var(--c-codes)' : (i >= 3 ? 'var(--s-egypt)' : 'var(--s-desert)');
    const nameY = s.pinY - (i % 2 ? 30 : 16);
    return '<g class="svg-station-node" data-index="' + i + '" style="--zone-c:' + zone + '">' +
      '<line x1="' + s.p[0] + '" y1="' + (s.pinY + 9) + '" x2="' + s.p[0] + '" y2="' + (s.p[1] - 24) + '" stroke="' + zone + '" stroke-width="1.1" stroke-dasharray="2 3" opacity="0.6"/>' +
      '<circle cx="' + s.p[0] + '" cy="' + s.pinY + '" r="9" fill="var(--card)" stroke="' + zone + '" stroke-width="2"/>' +
      '<text x="' + s.p[0] + '" y="' + (s.pinY + 3) + '" text-anchor="middle" font-size="8" fill="var(--ink)" style="font-family:var(--font-label);font-weight:700">' + (i + 1) + '</text>' +
      '<text x="' + s.p[0] + '" y="' + nameY + '" text-anchor="middle" font-size="6.8" letter-spacing="0.6" fill="var(--ink-soft)" style="font-family:var(--font-label);font-weight:700">' + s.name + '</text>' +
      '</g>';
  }).join('');

  const zlabel = (x, y, txt, c) => '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="8" letter-spacing="1.6" fill="' + c + '" style="font-family:var(--font-label);font-weight:700">' + txt + '</text>';

  return '<svg class="tabernacle-svg" viewBox="0 0 920 400" role="img" aria-label="Isometric diagram of the tabernacle: the walk from the gate to the mercy seat">' +
    ground + fence + gate + altar + laver + tent + veil + table + lamp + incense + ark +
    '<path class="tabernacle-route" d="' + route + '" fill="none" stroke="var(--thread)" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="2 6"/>' +
    nodeElements +
    zlabel(460, 128, 'HOLY PLACE', 'var(--s-egypt)') + zlabel(700, 128, 'HOLY OF HOLIES', 'var(--c-codes)') +
    '<text x="118" y="349" font-size="7.5" letter-spacing="1.4" fill="#fff" opacity="0.75" style="font-family:var(--font-label);font-weight:700">OUTER COURT</text>' +
    '<text x="46" y="382" font-size="7.5" letter-spacing="1.2" fill="var(--ink-faint)" style="font-family:var(--font-label);font-weight:700">EAST · THE WAY IN</text>' +
    '<text x="874" y="382" text-anchor="end" font-size="7.5" letter-spacing="1.2" fill="var(--ink-faint)" style="font-family:var(--font-label);font-weight:700">WEST · THE PRESENCE</text>' +
    '</svg>';
}

/* ================= feast arc — the sacred year ================= */
function buildFeastArc() {
  const P0 = [60, 240], C = [450, 40], P2 = [840, 240], CEN = [450, 430];
  const q = t => [
    (1 - t) * (1 - t) * P0[0] + 2 * (1 - t) * t * C[0] + t * t * P2[0],
    (1 - t) * (1 - t) * P0[1] + 2 * (1 - t) * t * C[1] + t * t * P2[1]
  ];
  const iconAt = (name, x, y, s, color) => (ICONS[name] || '').replace('<svg ', '<svg x="' + (x - s / 2) + '" y="' + (y - s / 2) + '" width="' + s + '" height="' + s + '" style="color:' + color + '" ');
  const FEASTS = [
    { t: 0.07, name: 'PASSOVER', to: 'THE CROSS · 1 COR 5:7', ic: 'lamb', done: true },
    { t: 0.13, name: 'UNLEAVENED BREAD', to: 'THE BURIAL', ic: 'bread', done: true },
    { t: 0.19, name: 'FIRSTFRUITS', to: 'RESURRECTION · 1 COR 15:20', ic: 'grapes', done: true },
    { t: 0.40, name: 'PENTECOST', to: 'THE SPIRIT · ACTS 2:1', ic: 'wind', done: true },
    { t: 0.70, name: 'TRUMPETS', to: 'THE RETURN · 1 THESS 4:16', ic: 'music', done: false },
    { t: 0.78, name: 'ATONEMENT', to: 'THEY LOOK ON HIM · ZECH 12:10', ic: 'gate', done: false },
    { t: 0.87, name: 'TABERNACLES', to: 'GOD WITH MAN · REV 21:3', ic: 'temple', done: false }
  ];
  let marks = '';
  FEASTS.forEach(f => {
    const p = q(f.t);
    const d = [p[0] - CEN[0], p[1] - CEN[1]];
    const len = Math.hypot(d[0], d[1]);
    const dir = [d[0] / len, d[1] / len];
    const at = k => [Math.round(p[0] + dir[0] * k), Math.round(p[1] + dir[1] * k)];
    const L = at(52), I = at(22), l1 = at(9), l2 = at(44);
    const anchor = f.t < 0.32 ? 'end' : (f.t <= 0.55 ? 'middle' : 'start');
    const cMain = f.done ? 'var(--ink)' : 'var(--ink-soft)';
    const cSub = f.done ? 'var(--c-walk)' : 'var(--c-detour)';
    marks +=
      '<line x1="' + l1[0] + '" y1="' + l1[1] + '" x2="' + l2[0] + '" y2="' + l2[1] + '" stroke="var(--ink-faint)" stroke-width="1" stroke-dasharray="2 3" opacity="0.55"/>' +
      iconAt(f.ic, I[0], I[1], 13, f.done ? 'var(--gold)' : 'var(--c-detour)') +
      (f.done
        ? '<circle cx="' + Math.round(p[0]) + '" cy="' + Math.round(p[1]) + '" r="5.5" fill="var(--gold)" stroke="var(--card)" stroke-width="1.5"/>'
        : '<circle cx="' + Math.round(p[0]) + '" cy="' + Math.round(p[1]) + '" r="5.5" fill="var(--card)" stroke="var(--c-detour)" stroke-width="2" stroke-dasharray="2.5 2"/>') +
      '<text x="' + L[0] + '" y="' + L[1] + '" text-anchor="' + anchor + '" font-size="7.6" letter-spacing="0.8" fill="' + cMain + '" style="font-family:var(--font-label);font-weight:700">' + f.name + '</text>' +
      '<text x="' + L[0] + '" y="' + (L[1] + 10) + '" text-anchor="' + anchor + '" font-size="6.4" letter-spacing="0.6" fill="' + cSub + '" style="font-family:var(--font-label);font-weight:700">' + f.to + '</text>';
  });
  return '<svg viewBox="0 60 900 250" role="img" aria-label="The seven feasts of Israel on the arc of the sacred year — spring fulfilled at the first coming, fall still ahead">' +
    '<path d="M60 240 Q450 40 840 240" fill="none" stroke="var(--ink-faint)" stroke-width="1.6" opacity="0.45"/>' +
    '<path d="M60 240 Q235.5 150 411 141" fill="none" stroke="var(--gold)" stroke-width="2.6" opacity="0.85"/>' +
    marks +
    '<text x="185" y="268" text-anchor="middle" font-size="8" letter-spacing="1.6" fill="var(--c-walk)" style="font-family:var(--font-label);font-weight:700">SPRING · FULFILLED TO THE DAY</text>' +
    '<text x="700" y="268" text-anchor="middle" font-size="8" letter-spacing="1.6" fill="var(--c-detour)" style="font-family:var(--font-label);font-weight:700">FALL · STILL AHEAD</text>' +
    '<circle cx="330" cy="291" r="4" fill="var(--gold)"/>' +
    '<text x="340" y="294" font-size="7" letter-spacing="0.8" fill="var(--ink-soft)" style="font-family:var(--font-label);font-weight:600">FULFILLED</text>' +
    '<circle cx="425" cy="291" r="4" fill="var(--card)" stroke="var(--c-detour)" stroke-width="1.6" stroke-dasharray="2 2"/>' +
    '<text x="435" y="294" font-size="7" letter-spacing="0.8" fill="var(--ink-soft)" style="font-family:var(--font-label);font-weight:600">AHEAD — HOLD DATES LOOSELY (ACTS 1:7)</text>' +
    '</svg>';
}

/* ================= view renderers ================= */
/* Shown only where a diagram has to pan, so nobody scrolls past half a map assuming that is all. */
function diagramHint(label) {
  return '<p class="diagram-hint">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M3 12h18"/><path d="m8 7-5 5 5 5"/><path d="m16 7 5 5-5 5"/></svg>' +
    '<span>Swipe to see the whole ' + label + '</span></p>';
}

function head(navItem, h2, lede) {
  return '<div class="section-head" style="--c:var(' + navItem.cvar + ')">' +
    '<div class="eyebrow">' + icon(navItem.icon) + navItem.label + '</div>' +
    '<h2>' + h2 + '</h2>' +
    '<p class="lede">' + linkRefs(lede) + '</p></div>';
}

function vStart() {
  const n = NAV[0];
  const legend = THREADS.map(t => {
    return '<button class="legend-chip" data-thread="' + t.id + '" aria-pressed="false" style="--c:var(' + t.cvar + ')"><span class="dot"></span>' + t.name + '</button>';
  }).join('');
  const IDEA_META = [
    { icon: 'book', c: '--c-library' },
    { icon: 'cross', c: '--thread' },
    { icon: 'water', c: '--c-pattern' },
    { icon: 'key', c: '--gold' },
    { icon: 'walk', c: '--c-walk' }
  ];
  const ideas = START.bigIdea.map((i, ix) => {
    const m = IDEA_META[ix % IDEA_META.length];
    return '<div class="idea-card" style="--c:var(' + m.c + ')">' +
      '<div class="idea-top"><span class="idea-num">' + (ix + 1) + '</span>' +
      '<span class="idea-ic">' + icon(m.icon) + '</span></div>' +
      '<b>' + i.t + '</b><p>' + linkRefs(i.x) + '</p></div>';
  }).join('');
  const trails = NAV.slice(1).map(t =>
    '<a class="trailhead" href="#/' + t.id + '" style="--c:var(' + t.cvar + ')">' +
    '<span class="icon-chip">' + icon(t.icon) + '</span>' +
    '<span><h3>' + t.label + '</h3><p>' + t.blurb + '</p><span class="go">Open the chart →</span></span></a>').join('');
  const howOrder = [5, 0, 1, 2, 3, 4];
  const howIcon = { 0: 'scroll', 1: 'lamb', 2: 'wind', 3: 'covenant', 4: 'walk', 5: 'cross' };
  const howSpan = { 5: 'feature', 0: 'wide', 1: 'wide', 2: 'reg', 3: 'reg', 4: 'reg' };
  const tips = howOrder.map(ix => { const i = START.howTo.tips[ix];
    return '<div class="bento-tile bento-' + howSpan[ix] + '"><span class="bento-ic">' + icon(howIcon[ix]) + '</span>' +
      '<div class="bento-txt"><b>' + i.t + '</b><p>' + linkRefs(i.x) + '</p></div></div>'; }).join('');
  return '<div class="view">' +
    '<div class="hero">' +
    '<div class="eyebrow" style="--c:var(--thread)">' + icon('thread') + 'A field manual to the Bible</div>' +
    '<h1>Sixty-six books. One plot: <em>Jesus.</em></h1>' +
    '<p class="lede">Threads, patterns, and codes tie the whole Bible together — and every one of them, traced far enough, ends at the same Person. This manual maps them, so you can read without getting lost and walk out what you find.</p>' +
    '</div>' +
    '<div class="chart-panel hero-chart">' +
    '  <div class="thread-preview-card" id="thread-preview">' +
    '    <div class="preview-placeholder">' +
    '      <svg class="preview-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>' +
    '      <h3>The Story Map</h3>' +
    '      <p>Choose a route to see its waypoints and where it lands.<span class="hint-hover"> Hover to peek, click to keep it.</span></p>' +
    '    </div>' +
    '  </div>' +
    '  <div class="chart-main">' +
    '    <div class="hero-scroll">' +
    '      <span class="chart-corner tl">' + namedRefLink('Gen 1:1', '<span class="cc-long">Genesis</span><span class="cc-short">Gen</span>') + '</span>' +
    '      <span class="chart-corner br">' + namedRefLink('Rev 22:21', '<span class="cc-long">Revelation</span><span class="cc-short">Rev</span>') + '</span>' +
    buildHeroChart() + '</div>' +
    '    <div class="hero-legend">' + legend + '</div>' +
    '  </div>' +
    '</div>' +
    '<p class="hero-verse">' + START.heroVerse.text + '<span class="vref">— ' + refLink(START.heroVerse.ref) + ' · the Emmaus road</span></p>' +
    '<div class="home-section-title"><h2>The big idea</h2><svg class="rr" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true"><path d="M0 6 H300" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/></svg></div>' +
    '<div class="big-idea">' + ideas + '</div>' +
    '<div class="home-section-title"><h2>Pick a trailhead</h2><svg class="rr" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true"><path d="M0 6 H300" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/></svg></div>' +
    '<div class="grid grid-2">' + trails + '</div>' +
    '<div class="home-section-title"><h2>' + START.howTo.title + '</h2><svg class="rr" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true"><path d="M0 6 H300" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/></svg></div>' +
    '<div class="bento">' + tips + '</div>' +
    '</div>';
}

function vPattern() {
  const n = NAV[1];
  const ROW_ICONS = { 'What it is': 'compass', 'It feels like': 'heart', 'God’s move': 'name', 'The exit': 'gate', 'Provision': 'bread' };
  const seasons = PATTERN.seasons.map(s =>
    '<div class="season-card" style="--c:var(' + s.cvar + ')">' +
    '<div class="season-head"><span class="icon-chip">' + icon(s.icon) + '</span>' +
    '<div><h3>' + s.name + '</h3><p class="season-sub">' + s.sub + '</p></div></div>' +
    '<div class="season-rows">' + s.rows.map(r =>
      '<div class="season-row"><span class="season-row-label">' + icon(ROW_ICONS[r.k] || 'compass') + r.k + '</span><p>' + linkRefs(r.v) + '</p></div>').join('') +
    '</div></div>').join('');
  const INSIGHT_ICONS = ['dune', 'name', 'cross', 'water', 'compass', 'mountain', 'bread', 'light', 'gate'];
  const insights = PATTERN.insights.map((i, ix) =>
    '<div class="insight-card" style="--c:var(--c-pattern)">' +
    '<div class="insight-top"><span class="insight-marker">' + (ix + 1) + '</span>' +
    '<span class="insight-ic">' + icon(INSIGHT_ICONS[ix % INSIGHT_ICONS.length]) + '</span></div>' +
    '<b>' + i.t + '</b><p class="ins-txt">' + linkRefs(i.x) + '</p></div>').join('');
  const cases = PATTERN.cases.map((c, ix) =>
    '<div class="card case-card" id="case-' + ix + '" style="--c:var(--c-pattern)">' +
    '<div class="case-top"><div><h3>' + c.name + '</h3><span class="case-sub">' + c.sub + '</span></div></div>' +
    '<div class="phase-bar"><span class="p1"></span><span class="p2"></span><span class="p3"></span></div>' +
    '<div class="case-rows">' +
    '<div class="row r1"><b>Egypt</b><span>' + linkRefs(c.p1) + '</span></div>' +
    '<div class="row r2"><b>Desert</b><span>' + linkRefs(c.p2) + '</span></div>' +
    '<div class="row r3"><b>Land</b><span>' + linkRefs(c.p3) + '</span></div>' +
    '</div></div>').join('');
  return '<div class="view">' + head(n, 'Egypt → Wilderness → Promised Land', PATTERN.intro) +
    '<div class="chart-panel journey-panel">' +
    '<span class="chart-corner tl">' + refLink('Gen 15:13') + '</span><span class="chart-corner br">' + refLink('Josh 21:45') + '</span>' +
    '<div class="journey-scroll">' + buildJourneySVG() + '</div>' + diagramHint('journey') +
    '<div class="journey-caps">' +
    '<div class="journey-cap" style="--c:var(--s-egypt)"><b>Egypt says</b><span>' + linkRefs('“You are what you produce.” Worth measured in bricks per day (Ex 5:13-14).') + '</span></div>' +
    '<div class="journey-cap" style="--c:var(--s-desert)"><b>The wilderness hears</b><span>' + linkRefs('“You are my son” — identity spoken before performance (Ex 4:22; Deut 8:2-3).') + '</span></div>' +
    '<div class="journey-cap" style="--c:var(--s-land)"><b>The land walks</b><span>' + linkRefs('Fight FROM victory, not for it — “I have given you” (Josh 1:3).') + '</span></div>' +
    '</div></div>' +
    '<div class="season-grid">' + seasons + '</div>' +
    '<div class="home-section-title"><h2>Trail wisdom</h2><svg class="rr" viewBox="0 0 300 12" preserveAspectRatio="none" style="color:var(--c-pattern)" aria-hidden="true"><path d="M0 6 H300" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/></svg></div>' +
    '<div class="insight-grid">' + insights + '</div>' +
    '<div class="home-section-title"><h2>Case studies</h2><svg class="rr" viewBox="0 0 300 12" preserveAspectRatio="none" style="color:var(--c-pattern)" aria-hidden="true"><path d="M0 6 H300" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/></svg></div>' +
    '<p class="lede" style="margin-bottom:16px">“These things happened to them as examples… written down for our instruction” (' + refLink('1 Cor 10:11') + '). The library of case studies, in three-phase view:</p>' +
    '<div class="grid grid-3">' + cases + '</div>' +
    '<p class="note">Want this pattern in video form? BibleProject’s <a class="ref-link" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=dYPlBq8ELvA">“The Exodus Way”</a> names the same three roads: out of slavery, through the wilderness, into inheritance.</p>' +
    '</div>';
}

function vThreads() {
  const n = NAV[2];
  const rows = THREADS.map(t => {
    const wps = t.way.map(w =>
      '<div class="wp-card' + (w.j ? ' wp-cross' : '') + '" data-verse-ref="' + escapeScriptureText(splitReferenceGroup(w.ref)[0]) + '"><span class="wp-ref">' + refLink(w.ref) + (w.j ? ' · lands here' : '') + '</span><p>' + linkRefs(w.note) + '</p></div>').join('');
    return '<div class="thread-row" id="t-' + t.id + '" style="--c:var(' + t.cvar + ')">' +
      '<div class="thread-row-head">' +
      '<span class="icon-chip">' + icon(t.icon) + '</span>' +
      '<div class="thread-row-title"><h3>' + t.name + '</h3><span class="thread-tag">' + t.tag + '</span></div>' +
      '<span class="thread-count">' + t.way.length + ' waypoints</span>' +
      '</div>' +
      /* the fade mask rides the static window, never the scrolling element */
      '<div class="marquee-window"><div class="thread-marquee" data-marquee><div class="marquee-track">' + wps + '</div></div></div>' +
      '<div class="thread-row-foot">' +
      '<div class="lands-on"><span class="label">Where it lands</span>' + linkRefs(t.landsOn) + '</div>' +
      '<p class="for-you">For you: ' + linkRefs(t.forYou) + '</p>' +
      '</div></div>';
  }).join('');
  return '<div class="view">' + head(n, 'Thirteen threads through the whole book',
    'Every ribbon below is one theme traced Genesis to Revelation — real verses, in order, drifting past like a filmstrip (drag to browse, then let go to resume; tap any reference to read it). The gold card is where the thread lands on Jesus. This is the fastest cure for “the Bible feels random.”') +
    '<div class="thread-rows">' + rows + '</div></div>';
}

function vCodes() {
  const n = NAV[3];
  const tabs = [['prophecies', 'Prophecies'], ['types', 'Types & Shadows'], ['tabernacle', 'The Tabernacle'], ['feasts', 'The Feasts'], ['loose', 'Hold Loosely']];
  const tabIcons = { prophecies: 'scroll', types: 'temple', tabernacle: 'gate', feasts: 'calendar', loose: 'wind' };
  const tabBtns = tabs.map(([id, l], i) => '<button class="subtab' + (i === 0 ? ' active' : '') + '" data-tab="' + id + '" style="--c:var(--c-codes)">' + icon(tabIcons[id] || 'cross') + ' ' + l + '</button>').join('');
  const kindBadge = k => k === 'direct'
    ? '<span class="badge explicit" title="A stated prediction with an explicit New Testament fulfillment">Direct</span>'
    : '<span class="badge classical" title="A pattern the NT or the church reads as fulfilled typologically">Pattern</span>';
  const rows = CODES.prophecies.map(p =>
    '<tr><td data-label="The claim">' + p.what + '</td><td data-label="Promised">' + refLink(p.ot) + '</td><td data-label="Lands">' + refLink(p.nt) + '</td><td data-label="Reading">' + kindBadge(p.kind) + '</td></tr>').join('');
  const types = CODES.types.map(t =>
    '<div class="card type-card" style="--c:var(--c-codes)"><h3>' + t.name + ' ' + badge(t.badge) + '</h3>' +
    '<div class="type-refs">' + linkRefs(t.refs) + '</div><p>' + linkRefs(t.body) + '</p></div>').join('');
  const courtStations = CODES.tabernacle.stations.slice(0, 3).map((s, i) =>
    '<div class="tab-station-card"><div class="station-meta"><span class="station-num">Station ' + (i + 1) + '</span><span class="station-desc">' + s.what + '</span></div><h3>' + s.name + '</h3><p class="station-jesus">' + linkRefs(s.jesus) + '</p></div>').join('');
  const holyStations = CODES.tabernacle.stations.slice(3, 6).map((s, i) =>
    '<div class="tab-station-card"><div class="station-meta"><span class="station-num">Station ' + (i + 4) + '</span><span class="station-desc">' + s.what + '</span></div><h3>' + s.name + '</h3><p class="station-jesus">' + linkRefs(s.jesus) + '</p></div>').join('');
  const mostHolyStations = CODES.tabernacle.stations.slice(6, 8).map((s, i) =>
    '<div class="tab-station-card"><div class="station-meta"><span class="station-num">Station ' + (i + 7) + '</span><span class="station-desc">' + s.what + '</span></div><h3>' + s.name + '</h3><p class="station-jesus">' + linkRefs(s.jesus) + '</p></div>').join('');
  const tabInsights = '<div class="tab-insights"><div class="tab-insights-title">' + icon('key') + '<span>Details worth noticing</span></div><div class="grid grid-2">' +
    CODES.tabernacle.insights.map(i => '<div class="card insight-mini" style="--c:var(--c-codes)"><b>' + i.t + '</b><p>' + linkRefs(i.x) + '</p></div>').join('') + '</div></div>';

  const tabernacleLayout = '<div class="tabernacle-grid">' +
    '<div class="tabernacle-zone zone-court"><div class="zone-header">Outer Court <span class="zone-sub">East Entrance</span></div><div class="zone-stations">' + courtStations + '</div></div>' +
    '<div class="tabernacle-zone zone-holy"><div class="zone-header">Holy Place <span class="zone-sub">The Sanctuary</span></div><div class="zone-stations">' + holyStations + '</div></div>' +
    '<div class="tabernacle-zone zone-most-holy"><div class="zone-header">Holy of Holies <span class="zone-sub">Behind the Veil</span></div><div class="zone-stations">' + mostHolyStations + '</div></div>' +
    '</div>';

  /* icons and the spring/autumn split mirror the arc above, so the chart and the list
     name the same seven things the same way */
  const FEAST_ICONS = ['lamb', 'bread', 'grapes', 'wind', 'music', 'gate', 'temple'];
  const feastCard = (f, ix) =>
    '<div class="feast-card' + (ix < 4 ? ' is-done' : ' is-ahead') + '">' +
    '<div class="feast-card-top"><span class="icon-chip">' + icon(FEAST_ICONS[ix]) + '</span>' +
    '<div class="feast-id"><h4>' + f.name + '</h4><span class="feast-when">' + f.when + '</span></div>' +
    badge(f.badge) + '</div>' +
    '<p>' + linkRefs(f.body) + '</p></div>';
  const feasts =
    '<div class="feast-group is-done">' +
    '<span class="feast-group-label">' + icon('light') + 'Spring — fulfilled, to the day</span>' +
    '<div class="feast-cards">' + CODES.feasts.slice(0, 4).map((f, i) => feastCard(f, i)).join('') + '</div></div>' +
    '<div class="feast-group is-ahead">' +
    '<span class="feast-group-label">' + icon('music') + 'Autumn — the shape of what is ahead</span>' +
    '<div class="feast-cards">' + CODES.feasts.slice(4).map((f, i) => feastCard(f, i + 4)).join('') + '</div></div>';
  const loose = CODES.loose.map(l =>
    '<div class="card type-card" style="--c:var(--c-codes)"><h3>' + l.name + ' ' + badge(l.badge) + '</h3><p>' + linkRefs(l.body) + '</p></div>').join('');
  return '<div class="view">' + head(n, 'The codes: written in advance', CODES.intro) +
    '<div class="subtabs">' + tabBtns + '</div>' +
    '<div class="tabpane" data-pane="prophecies">' +
    '<div class="table-scroll"><table class="map-table"><thead><tr><th>The claim</th><th>Promised</th><th>Lands</th><th>Reading</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
    '<p class="note">' + linkRefs(CODES.prophecyNote) + '</p></div>' +
    '<div class="tabpane" data-pane="types" hidden><p class="lede" style="margin-bottom:18px">' + linkRefs(CODES.typesNote) + '</p><div class="grid grid-2">' + types + '</div></div>' +
    '<div class="tabpane" data-pane="tabernacle" hidden><p class="lede" style="margin-bottom:20px">' + linkRefs(CODES.tabernacle.intro) + '</p><div class="tabernacle-graphic-container">' + buildTabernacleSVG() + '</div>' + diagramHint('tabernacle') + tabernacleLayout + tabInsights + '<p class="note" style="margin-top:20px">Walk it east to west and you’ve just walked the gospel: enter, be covered, be washed, be fed, be lit, pray, pass the torn veil, meet Him at the mercy seat.</p></div>' +
    '<div class="tabpane" data-pane="feasts" hidden>' +
    '<div class="chart-panel feast-arc-panel"><span class="chart-corner tl">' + namedRefLink('Lev 23:2', 'Leviticus') + '</span><span class="chart-corner br">' + namedRefLink('Col 2:16-17', 'Colossians') + '</span>' + buildFeastArc() + '</div>' + diagramHint('year') +
    '<div class="feast-groups">' + feasts + '</div><p class="note">' + linkRefs(CODES.feastNote) + '</p></div>' +
    '<div class="tabpane" data-pane="loose" hidden><div class="grid grid-2">' + loose + '</div></div>' +
    '</div>';
}

function vTriune() {
  const n = NAV[4];
  const RAIL_META = [
    { icon: 'scroll', label: 'Load-bearing' },
    { icon: 'ear', label: 'Listen for it' },
    { icon: 'wind', label: 'Hold loosely' }
  ];
  const rails = TRIUNE.rails.map((r, ix) => {
    const m = RAIL_META[ix % RAIL_META.length];
    return '<div class="triune-rail" style="--c:var(--c-triune)">' +
      '<span class="icon-chip">' + icon(m.icon) + '</span>' +
      '<div><span class="rail-label">' + m.label + '</span><h3>' + r.t + '</h3><p>' + linkRefs(r.x) + '</p></div></div>';
  }).join('');
  const anchors = TRIUNE.anchors.map(a =>
    '<div class="card triune-anchor-card" style="--c:var(--c-triune)">' +
    '<h3>' + a.name + ' ' + badge(a.badge) + '</h3>' +
    '<div class="triune-roles">' +
    '<div class="triune-role"><b>Father</b><span>' + linkRefs(a.father) + '</span></div>' +
    '<div class="triune-role"><b>Son</b><span>' + linkRefs(a.son) + '</span></div>' +
    '<div class="triune-role"><b>Spirit</b><span>' + linkRefs(a.spirit) + '</span></div>' +
    '</div>' + refRow(a.refs) + '</div>').join('');
  const patterns = TRIUNE.patterns.map(p =>
    '<div class="card triune-pattern-card" style="--c:var(--c-triune)">' +
    '<h3>' + p.name + ' ' + badge(p.badge) + '</h3>' +
    '<p class="story">' + linkRefs(p.story) + '</p>' +
    '<p class="reading">' + linkRefs(p.reading) + '</p>' +
    refRow(p.refs) + '</div>').join('');
  return '<div class="view">' + head(n, 'Father, Son & Spirit in the story', TRIUNE.intro) +
    '<div class="triune-rails">' + rails + '</div>' +
    '<div class="home-section-title"><h2>Explicit anchors</h2><svg class="rr" viewBox="0 0 300 12" preserveAspectRatio="none" style="color:var(--c-triune)" aria-hidden="true"><path d="M0 6 H300" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/></svg></div>' +
    '<div class="grid grid-2">' + anchors + '</div>' +
    '<div class="home-section-title"><h2>Story echoes</h2><svg class="rr" viewBox="0 0 300 12" preserveAspectRatio="none" style="color:var(--c-triune)" aria-hidden="true"><path d="M0 6 H300" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/></svg></div>' +
    '<div class="grid grid-2">' + patterns + '</div>' +
    '<p class="note" style="border-left-color:var(--c-triune)">' + linkRefs(TRIUNE.note) + '</p></div>';
}

function vWalking() {
  const n = NAV[5];
  /* static labels — they used to borrow .legend-chip, which reads as selectable and isn't */
  const words = TEN_WORDS.map(w => '<span class="word-chip" style="--c:var(--c-walk)"><span class="dot"></span>' + w + '</span>').join('');
  const cards = WALKING.pillars.map(p =>
    '<div class="card pillar-card" style="--c:var(--c-walk)">' +
    '<div class="case-top"><span class="icon-chip">' + icon(p.icon) + '</span><h3>' + p.name + '</h3></div>' +
    '<div class="row lie"><b>' + icon('ban') + 'Old software</b><span>' + p.lie + '</span></div>' +
    '<div class="row truth"><b>' + icon('bolt') + 'New identity</b><span>' + p.truth + '</span></div>' +
    '<p class="pillar-body">' + linkRefs(p.body) + '</p>' +
    '<div class="practice"><span class="label">' + icon('tool') + 'Try this</span>' + linkRefs(p.practice) + '</div>' +
    refRow(p.refs) + '</div>').join('');
  return '<div class="view">' + head(n, 'Walking in the new covenant', WALKING.intro) +
    '<div class="hero-legend" style="justify-content:flex-start;padding:0 0 8px">' + words + '</div>' +
    '<p class="note" style="margin:0 0 22px">' + WALKING.tenWordsNote + '</p>' +
    '<div class="grid grid-2">' + cards + '</div></div>';
}

function vDetours() {
  const n = NAV[6];
  const cards = DETOURS.items.map((d, i) =>
    '<div class="card detour-card" id="d-' + i + '" style="--c:var(--c-detour)">' +
    '<h3><span class="icon-chip" style="--c:var(--c-detour)">' + icon('fork') + '</span>' + d.name + '</h3>' +
    '<div class="detour-rows">' +
    '<div class="row pull"><b>' + icon('magnet') + 'The pull</b><span>' + linkRefs(d.pull) + '</span></div>' +
    '<div class="row cost"><b>' + icon('alert') + 'The cost</b><span>' + linkRefs(d.cost) + '</span></div>' +
    '<div class="row home"><b>' + icon('compass') + 'The way home</b><span>' + linkRefs(d.home) + '</span></div>' +
    '</div>' + refRow(d.refs) + '</div>').join('');
  return '<div class="view">' + head(n, 'Detours: sincere wrong turns', DETOURS.intro) +
    '<div class="grid grid-2">' + cards + '</div></div>';
}

function vMind() {
  const n = NAV[7];
  const primer = NEURO_PRIMER.map(p =>
    '<div class="mind-panel">' +
    panelHead(p.label) +
    '<h4>' + p.title + '</h4>' +
    '<p>' + linkRefs(p.body) + '</p>' +
    refRow(p.refs) + '</div>').join('');
  const MIND_HUES = ['--c-mind', '--c-library', '--t-shepherd', '--t-name', '--c-triune', '--t-bride', '--t-temple', '--t-king'];
  const cards = MIND.blocks.map((b, bi) => {
    let tv = '';
    if (b.tv) {
      tv = '<div class="tv-grid"><div class="tv-box treasure"><span class="label">Keep the treasure</span><ul>' +
        b.tv.treasure.map(x => '<li>' + linkRefs(x) + '</li>').join('') + '</ul></div>' +
        '<div class="tv-box ditch"><span class="label">Skip the ditch</span><ul>' +
        b.tv.ditch.map(x => '<li>' + linkRefs(x) + '</li>').join('') + '</ul></div></div>';
    }
    return '<div class="card mind-card" style="--c:var(' + MIND_HUES[bi % MIND_HUES.length] + ')">' +
      '<h3><span class="icon-chip">' + icon(b.icon) + '</span>' + b.name + '</h3>' +
      '<div class="mind-body-txt mind-panel-grid">' + paragraphCards(b.body, b.panelLabels) + '</div>' + tv + refRow(b.refs) + '</div>';
  }).join('');
  return '<div class="view">' + head(n, 'Mind, body & the Spirit', MIND.intro) +
    '<div class="card neuro-primer" style="--c:var(--c-mind)">' +
    '<div><h3>Neuro primer: read the brain without letting it replace the Bible</h3>' +
    '<p class="lede">Use this section as a set of rails: curiosity without hype, embodiment without reductionism, and practice without pressure.</p></div>' +
    '<div class="mind-panel-grid">' + primer + '</div></div>' +
    '<div class="grid grid-1">' + cards + '</div></div>';
}

function vLibrary() {
  const n = NAV[8];
  const KIND_META = {
    video: { icon: 'play', c: '--c-detour' },
    book: { icon: 'book', c: '--c-library' },
    site: { icon: 'globe', c: '--c-triune' },
    podcast: { icon: 'mic', c: '--c-mind' },
    channel: { icon: 'play', c: '--c-walk' }
  };
  const shelves = LIBRARY.shelves.map(s =>
    '<div class="shelf"><div class="shelf-title">' + icon(s.icon) + '<h3>' + s.title + '</h3></div>' +
    '<div class="shelf-items">' + s.items.map(i => {
      const m = KIND_META[i.kind] || KIND_META.book;
      return '<a class="shelf-item" style="--c:var(' + m.c + ')" target="_blank" rel="noopener" href="' + i.url + '">' +
        '<span class="kind">' + icon(m.icon) + i.kind + '</span>' +
        '<b>' + i.title + '</b>' +
        '<span class="by">' + i.by + '</span>' +
        '<span class="note-txt">' + i.note + '</span>' +
        '<span class="shelf-go">Open' + icon('linkout') + '</span></a>';
    }).join('') +
    '</div></div>').join('');
  return '<div class="view">' + head(n, 'The pack list', LIBRARY.intro) + shelves + '</div>';
}

/* ================= search ================= */
/* ================= router & boot ================= */
const VIEWS = { start: vStart, pattern: vPattern, threads: vThreads, codes: vCodes, triune: vTriune, walking: vWalking, detours: vDetours, mind: vMind, library: vLibrary };

let isScrollingNav = false;

function route(options) {
  const id = (location.hash.replace('#/', '') || 'start').split('?')[0];
  const sectionEl = document.getElementById(id);
  if (sectionEl) {
    isScrollingNav = true;
    sectionEl.scrollIntoView({ behavior: options && options.instant ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => { isScrollingNav = false; }, 800);
    updateActiveNav(id);
  }
}

function updateActiveNav(id) {
  let activeLink = null;
  document.querySelectorAll('.nav-link').forEach(a => {
    const active = a.dataset.view === id;
    a.classList.toggle('active', active);
    if (active) activeLink = a;
  });

  const nav = document.getElementById('nav');
  if (nav && activeLink && nav.scrollWidth > nav.clientWidth + 4) {
    const left = activeLink.offsetLeft - (nav.clientWidth - activeLink.offsetWidth) / 2;
    nav.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }
}

/* Whenever exactly one route is live — hovered, focused or held — the chart drops the other
   twelve right back so that one line is unmistakable. Thirteen colours at near-equal weight
   was a width-matching exercise, and on a phone it was barely a difference at all. Nothing
   live means everything comes back up. */
function syncRouteFocus() {
  document.querySelectorAll('.hero-chart').forEach(chart => {
    chart.classList.toggle('route-focus', !!chart.querySelector('.hero-thread.hot, .hero-thread.selected'));
  });
}

let previewResetTimer = null;
function queuePreviewReset() {
  if (previewResetTimer) clearTimeout(previewResetTimer);
  previewResetTimer = setTimeout(() => {
    document.querySelectorAll('.legend-chip.hot, .hero-thread.hot').forEach(el => el.classList.remove('hot'));
    syncRouteFocus();
    if (selectedPreviewThreadId) updateThreadPreview(selectedPreviewThreadId);
    else resetThreadPreview();
  }, 100);
}
function cancelPreviewReset() {
  if (previewResetTimer) clearTimeout(previewResetTimer);
}

function buildThreadPreviewHeader(t) {
  return '<span class="preview-icon">' + icon(t.icon) + '</span><h3>' + t.name + '</h3>';
}

function buildThreadPreviewContent(t) {
  const shortWay = previewMilestones(t);

  return (
    '<div class="preview-content" style="--c: var(' + t.cvar + ')">' +
    '  <div class="preview-header">' + buildThreadPreviewHeader(t) + '</div>' +
    '  <p class="preview-tag">' + t.tag + '</p>' +
    '  <div class="preview-body">' +
    '    <h4>Journey Milestones:</h4>' +
    '    <ul>' + shortWay + '</ul>' +
    '    <div class="preview-lands">' +
    '      <strong>Where it lands</strong>' +
    '      <p>' + linkRefs(t.landsOn) + '</p>' +
    '    </div>' +
    '  </div>' +
    '  <a class="preview-more" href="#t-' + t.id + '" data-thread-more="' + t.id + '">Learn more</a>' +
    '</div>'
  );
}

let activePreviewThreadId = null;
let selectedPreviewThreadId = null;

/* The panel used to be measured against all thirteen previews and locked to the tallest,
   which made it 982px on desktop and 914px on a phone — an empty box taller than the
   viewport under a sticky chart. CSS now fixes the height and the card scrolls inside it,
   so there is nothing left to measure. */
function syncMobileStickyOffsets() {
  const heroChart = document.querySelector('.hero-chart');
  if (!heroChart) return;
  // The route labels are drawn to the left of x=0, so above 1100 the viewBox opens a gutter for
  // them. Padding the container instead put them off-canvas as soon as the chart got wider.
  const heroSvg = heroChart.querySelector('.hero-svg');
  if (!heroSvg) return;
  // Narrower crop on a phone: the same chart, taller for the width it gets, with the gold line
  // stopping just past the convergence instead of running out to an edge nobody can see.
  const w = window.innerWidth;
  heroSvg.setAttribute('viewBox', w <= 720 ? '26 0 566 316' : w < 1100 ? '0 0 720 316' : '-150 0 870 316');
}

/* Where the pills scroll sideways (phones), touching a route brings its name into view — the
   same courtesy the nav strip does for the active section. */
function revealLegendChip(threadId) {
  const chip = document.querySelector('.legend-chip[data-thread="' + threadId + '"]');
  if (!chip) return;
  const strip = chip.parentElement;
  if (!strip || strip.scrollWidth <= strip.clientWidth + 4) return;
  const left = chip.offsetLeft - (strip.clientWidth - chip.offsetWidth) / 2;
  strip.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
}

/* The frame stays put and only the words change. Replacing the card wholesale made the panel
   flash and resize on every hover, which is a lot of movement for a reading aid. */
let previewSwapToken = 0;
function swapPreviewContent(previewEl, html) {
  const token = ++previewSwapToken;
  const start = previewEl.offsetHeight;
  previewEl.style.height = '';
  previewEl.innerHTML = html;
  const end = previewEl.offsetHeight;
  if (start && end && Math.abs(end - start) > 2) {
    previewEl.style.height = start + 'px';
    void previewEl.offsetWidth;
    previewEl.style.height = end + 'px';
    setTimeout(() => { if (token === previewSwapToken) previewEl.style.height = ''; }, 280);
  }
  const inner = previewEl.firstElementChild;
  if (inner) {
    inner.classList.remove('swap-fade');
    void inner.offsetWidth;
    inner.classList.add('swap-fade');
  }
}

function previewMilestones(t) {
  return t.way.slice(0, 3).map(w => '<li><b>' + refLink(w.ref) + ':</b> ' + linkRefs(w.note) + '</li>').join('');
}

/* "Journey milestones" and "Where it lands" are the same words for every thread, so re-rendering
   and re-animating them on each hover was thirteen labels flickering for no reason. They stay;
   only the parts that actually differ fade. */
function patchPart(el, html) {
  if (!el) return;
  el.innerHTML = html;
  el.classList.remove('swap-fade');
  void el.offsetWidth;
  el.classList.add('swap-fade');
}

function updateThreadPreview(threadId) {
  revealLegendChip(threadId);
  if (activePreviewThreadId === threadId) return;

  const t = THREADS.find(x => x.id === threadId);
  if (!t) return;

  const previewEl = document.getElementById('thread-preview');
  if (!previewEl) return;

  const content = previewEl.querySelector('.preview-content');
  if (!content) {
    swapPreviewContent(previewEl, buildThreadPreviewContent(t));
    activePreviewThreadId = threadId;
    return;
  }

  const token = ++previewSwapToken;
  const start = previewEl.offsetHeight;
  content.style.setProperty('--c', 'var(' + t.cvar + ')');
  patchPart(content.querySelector('.preview-header'), buildThreadPreviewHeader(t));
  patchPart(content.querySelector('.preview-tag'), t.tag);
  patchPart(content.querySelector('.preview-body ul'), previewMilestones(t));
  patchPart(content.querySelector('.preview-lands p'), linkRefs(t.landsOn));
  const more = content.querySelector('.preview-more');
  if (more) { more.setAttribute('href', '#t-' + t.id); more.dataset.threadMore = t.id; }

  previewEl.style.height = '';
  const end = previewEl.offsetHeight;
  if (start && end && Math.abs(end - start) > 2) {
    previewEl.style.height = start + 'px';
    void previewEl.offsetWidth;
    previewEl.style.height = end + 'px';
    setTimeout(() => { if (token === previewSwapToken) previewEl.style.height = ''; }, 280);
  }
  activePreviewThreadId = threadId;
}

function resetThreadPreview() {
  const previewEl = document.getElementById('thread-preview');
  if (!previewEl) return;
  activePreviewThreadId = null;
  swapPreviewContent(previewEl,
    '  <div class="preview-placeholder">' +
    '    <svg class="preview-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>' +
    '    <h3>The Story Map</h3>' +
    '    <p>Choose a route to see its waypoints and where it lands.<span class="hint-hover"> Hover to peek, click to keep it.</span></p>' +
    '  </div>');
}

function selectPreviewThread(threadId) {
  selectedPreviewThreadId = threadId;
  document.querySelectorAll('.legend-chip').forEach(chip => {
    const selected = chip.dataset.thread === threadId;
    chip.classList.toggle('selected', selected);
    chip.setAttribute('aria-pressed', selected ? 'true' : 'false');
  });
  document.querySelectorAll('.hero-thread, .hero-line-label').forEach(el => {
    el.classList.toggle('selected', el.dataset.thread === threadId);
  });
  syncRouteFocus();
  updateThreadPreview(threadId);
}

function clearPreviewSelection() {
  selectedPreviewThreadId = null;
  document.querySelectorAll('.legend-chip').forEach(chip => {
    chip.classList.remove('selected');
    chip.setAttribute('aria-pressed', 'false');
  });
  document.querySelectorAll('.hero-thread, .hero-line-label').forEach(el => el.classList.remove('selected'));
  syncRouteFocus();
  resetThreadPreview();
}

/* A selected chip had no way back — clicking it again is the obvious undo. */
function togglePreviewThread(threadId) {
  if (selectedPreviewThreadId === threadId) clearPreviewSelection();
  else selectPreviewThread(threadId);
}

/* A real pointing device, as opposed to a touchscreen synthesising mouse events. */
const HOVER_CAPABLE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function wireAllSections() {
  // Wire subtabs (in The Codes section)
  document.querySelectorAll('.subtab').forEach(btn => {
    btn.addEventListener('click', () => {
      const paneContainer = btn.closest('.view');
      paneContainer.querySelectorAll('.subtab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      paneContainer.querySelectorAll('.tabpane').forEach(p => p.hidden = p.dataset.pane !== btn.dataset.tab);
    });
  });

  // Wire legend chips hover and click
  document.querySelectorAll('.legend-chip[data-thread]').forEach(chip => {
    const threadId = chip.dataset.thread;
    const pathEls = () => document.querySelectorAll('.hero-thread[data-thread="' + threadId + '"]');

    const showPreview = () => {
      cancelPreviewReset();
      chip.classList.add('hot');
      pathEls().forEach(p => p.classList.add('hot'));
      syncRouteFocus();
      updateThreadPreview(threadId);
    };

    const clearPreviewHotState = () => {
      chip.classList.remove('hot');
      pathEls().forEach(p => p.classList.remove('hot'));
      syncRouteFocus();
      queuePreviewReset();
    };

    /* iOS swallows the click when a pointerenter handler mutates the DOM, and showPreview
       does — so a tap only made the chip hot, and the next tap anywhere fired the chip's
       pointerleave and wiped the preview back to the placeholder. Two taps to select one
       chip. Hover is for pointing devices; touch selects on the tap itself. */
    if (HOVER_CAPABLE) {
      chip.addEventListener('mouseenter', showPreview);
      chip.addEventListener('mouseleave', clearPreviewHotState);
    }
    /* A tap focuses the chip as well as clicking it, and a focus that stayed hot meant
       tapping a held route a second time cleared the selection while the route stayed lit —
       the release looked like nothing happened. Keyboard focus still previews. */
    chip.addEventListener('focus', () => {
      let keyboard = true;
      try { keyboard = chip.matches(':focus-visible'); } catch (e) { /* older engine: keep the preview */ }
      if (keyboard) showPreview();
    });
    chip.addEventListener('blur', clearPreviewHotState);

    chip.addEventListener('click', () => togglePreviewThread(threadId));
  });

  // Wire hero thread paths hover and click (using thicker trigger overlay)
  document.querySelectorAll('.hero-thread-trigger, .hero-line-label').forEach(trigger => {
    const threadId = trigger.dataset.thread;
    const paths = document.querySelectorAll('.hero-thread[data-thread="' + threadId + '"]');
    const chipEl = () => document.querySelector('.legend-chip[data-thread="' + threadId + '"]');

    const showPreview = () => {
      cancelPreviewReset();
      paths.forEach(p => p.classList.add('hot'));
      const c = chipEl();
      if (c) c.classList.add('hot');
      syncRouteFocus();
      updateThreadPreview(threadId);
    };

    const clearPreviewHotState = () => {
      paths.forEach(p => p.classList.remove('hot'));
      const c = chipEl();
      if (c) c.classList.remove('hot');
      syncRouteFocus();
      queuePreviewReset();
    };

    if (HOVER_CAPABLE) {
      trigger.addEventListener('mouseenter', showPreview);
      trigger.addEventListener('mouseleave', clearPreviewHotState);
    }

    trigger.addEventListener('click', () => togglePreviewThread(threadId));
  });

  /* Letting a held route go used to mean finding its pill again — which on a phone is a
     sideways-scrolling strip where the held one may well be off-screen. Tapping the chart
     anywhere off a line is the obvious "show me all of them again", so it does that. */
  document.querySelectorAll('.hero-scroll').forEach(scroll => {
    scroll.addEventListener('click', ev => {
      if (!selectedPreviewThreadId) return;
      if (ev.target.closest && ev.target.closest('.hero-thread-trigger, .hero-line-label, a')) return;
      document.querySelectorAll('.legend-chip.hot, .hero-thread.hot').forEach(el => el.classList.remove('hot'));
      cancelPreviewReset();
      clearPreviewSelection();
    });
  });

  const previewEl = document.getElementById('thread-preview');
  if (previewEl) {
    previewEl.addEventListener('click', ev => {
      const more = ev.target.closest('[data-thread-more]');
      if (!more) return;
      ev.preventDefault();
      const card = document.getElementById('t-' + more.dataset.threadMore);
      if (!card) return;
      isScrollingNav = true;
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      history.replaceState(null, '', '#/threads');
      updateActiveNav('threads');
      setTimeout(() => { isScrollingNav = false; }, 800);
    });
  }

  // Wire tabernacle interactive stations and blueprint graphic node elements
  const nodeSelector = idx => document.querySelector('.svg-station-node[data-index="' + idx + '"]');
  const cardSelector = idx => document.querySelectorAll('.tab-station-card')[idx];

  document.body.addEventListener('mouseover', ev => {
    const card = ev.target.closest('.tab-station-card');
    if (card) {
      const idx = Array.from(document.querySelectorAll('.tab-station-card')).indexOf(card);
      const node = nodeSelector(idx);
      if (node) node.classList.add('active');
      return;
    }

    const node = ev.target.closest('.svg-station-node');
    if (node) {
      const idx = +node.dataset.index;
      node.classList.add('active');
      const c = cardSelector(idx);
      if (c) c.classList.add('active-hover');
    }
  });

  document.body.addEventListener('mouseout', ev => {
    const card = ev.target.closest('.tab-station-card');
    if (card) {
      const idx = Array.from(document.querySelectorAll('.tab-station-card')).indexOf(card);
      const node = nodeSelector(idx);
      if (node) node.classList.remove('active');
      return;
    }

    const node = ev.target.closest('.svg-station-node');
    if (node) {
      const idx = +node.dataset.index;
      node.classList.remove('active');
      const c = cardSelector(idx);
      if (c) c.classList.remove('active-hover');
    }
  });

  document.body.addEventListener('click', ev => {
    const node = ev.target.closest('.svg-station-node');
    if (node) {
      const idx = +node.dataset.index;
      const c = cardSelector(idx);
      if (c) {
        c.scrollIntoView({ behavior: 'smooth', block: 'center' });
        c.classList.add('flash');
        setTimeout(() => c.classList.remove('flash'), 1800);
      }
    }
  });
}

function setupScrollspy() {
  // Track every section's intersection with a thin band across the viewport's
  // vertical centre, then activate whichever section owns that centre. This is
  // stable where the old "last intersecting entry wins" loop mis-highlighted
  // neighbours when several tall sections changed state in one callback.
  const visibleTops = new Map();
  const options = {
    root: null,
    rootMargin: '-45% 0px -45% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visibleTops.set(entry.target.id, entry.boundingClientRect.top);
      else visibleTops.delete(entry.target.id);
    });
    if (isScrollingNav || visibleTops.size === 0) return;
    let bestId = null, bestDist = Infinity;
    visibleTops.forEach((top, id) => {
      const dist = Math.abs(top);
      if (dist < bestDist) { bestDist = dist; bestId = id; }
    });
    if (bestId) {
      updateActiveNav(bestId);
      history.replaceState(null, null, '#/' + bestId);
    }
  }, options);

  NAV.forEach(n => {
    const el = document.getElementById(n.id);
    if (el) observer.observe(el);
  });
}

/* ================= translation picker ================= */
const VERSIONS = [
  { code: 'NIV', full: 'New International Version' },
  { code: 'NASB', full: 'New American Standard' },
  { code: 'ESV', full: 'English Standard Version' },
  { code: 'KJV', full: 'King James Version' },
  { code: 'NLT', full: 'New Living Translation' },
  { code: 'AMP', full: 'Amplified Bible' },
  { code: 'MSG', full: 'The Message' },
  { code: 'TPT', full: 'The Passion Translation' }
];
let ACTIVE_VERSION = 'NIV';
function getVersion() { return ACTIVE_VERSION; }
function applyVersion(code) {
  if (!VERSIONS.some(v => v.code === code)) return;
  ACTIVE_VERSION = code;
  lsSet('thread-version', code);
  document.querySelectorAll('.verpick-val').forEach(val => { val.textContent = code; });
  document.querySelectorAll('.verpick-opt').forEach(o => o.setAttribute('aria-selected', String(o.dataset.v === code)));
}

function versionMenuHtml(heading) {
  return '<span class="verpick-head">' + heading + '</span>' +
    VERSIONS.map(v =>
      '<button class="verpick-opt" type="button" role="option" data-v="' + v.code + '"' +
      ' aria-selected="' + (v.code === ACTIVE_VERSION) + '">' +
      '<span class="code">' + v.code + '</span><span class="full">' + v.full + '</span></button>').join('');
}

function wireVersionPicker(wrap, onChoose) {
  const btn = wrap && wrap.querySelector('.verpick-btn');
  const menu = wrap && wrap.querySelector('.verpick-menu');
  const val = wrap && wrap.querySelector('.verpick-val');
  if (!wrap || !btn || !menu || !val) return null;

  val.textContent = ACTIVE_VERSION;
  const opts = () => Array.from(menu.querySelectorAll('.verpick-opt'));
  const close = () => {
    wrap.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    opts().forEach(o => o.classList.remove('cursor'));
  };
  const open = () => {
    wrap.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
    const sel = menu.querySelector('[aria-selected="true"]') || opts()[0];
    if (sel) sel.classList.add('cursor');
  };
  const choose = code => {
    applyVersion(code);
    close();
    if (onChoose) onChoose(code);
    btn.focus();
  };
  const moveCursor = step => {
    const list = opts();
    const i = list.findIndex(o => o.classList.contains('cursor'));
    const next = list[Math.max(0, Math.min(list.length - 1, (i < 0 ? 0 : i + step)))];
    list.forEach(o => o.classList.remove('cursor'));
    if (next) next.classList.add('cursor');
  };

  btn.addEventListener('click', ev => {
    ev.stopPropagation();
    menu.hidden ? open() : close();
  });
  menu.addEventListener('click', ev => {
    const opt = ev.target.closest('.verpick-opt');
    if (opt) choose(opt.dataset.v);
  });
  document.addEventListener('click', ev => {
    if (!menu.hidden && !wrap.contains(ev.target)) close();
  });
  wrap.addEventListener('keydown', ev => {
    if (ev.key === 'Escape' && !menu.hidden) { ev.preventDefault(); close(); btn.focus(); return; }
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      ev.preventDefault();
      if (menu.hidden) { open(); return; }
      moveCursor(ev.key === 'ArrowDown' ? 1 : -1);
      return;
    }
    if ((ev.key === 'Enter' || ev.key === ' ') && !menu.hidden) {
      const cur = menu.querySelector('.verpick-opt.cursor');
      if (cur) { ev.preventDefault(); choose(cur.dataset.v); }
    }
  });
  return { close };
}

/* Colours, typeface, line height and text size are one panel: they are all "how this reads
   to me", and a lone sun/moon button could only ever answer a quarter of that. */
const PREFS = {
  theme: { key: 'thread-theme', def: 'system' },
  type: { key: 'thread-type', def: 'literata' },
  lh: { key: 'thread-lh', def: 'normal' },
  fs: { key: 'thread-fs', def: '2' }
};

/* A typeface theme is a pairing of two faces, and two of the six cross serif and sans on
   purpose. Listed here is only what each one needs *loaded*: the picker's own previews sit
   inside a hidden menu, so no face is fetched until the panel is opened or a theme chosen. */
const TYPE_THEMES = {
  literata: ['Literata'],
  'source-serif': ['Source Serif 4', 'Figtree'],
  garamond: ['EB Garamond', 'Figtree'],
  figtree: ['Figtree'],
  'source-sans': ['Source Sans 3', 'Literata'],
  atkinson: ['Atkinson Hyperlegible Next']
};
const FS_STEPS = [0.86, 0.93, 1, 1.08, 1.16, 1.26, 1.36];
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let currentFsIndex = 2;

/* ---------- keeping the reader's place ----------
   Every setting in this panel re-lays the whole column, so the sentence being read slides
   out from under the eye and the page appears to jump. Pin whatever block sits just under
   the top of the viewport and hold it there for as long as the change takes to settle. */
function topAnchorEl() {
  if (window.scrollY < 4) return null; /* already at the top — staying there *is* the anchor */
  const bar = document.querySelector('.topbar');
  const y = Math.round((bar ? bar.getBoundingClientRect().bottom : 0) + 8);
  const fracs = [0.5, 0.28, 0.72];
  for (let i = 0; i < fracs.length; i++) {
    const el = document.elementFromPoint(Math.round(window.innerWidth * fracs[i]), y);
    if (!el || !el.closest) continue;
    const scope = el.closest('#view, .site-foot');
    if (scope && el !== scope) return el; /* a real block, not the container or a gap */
  }
  /* the three probes all landed in padding: fall back to the first block still on screen */
  const kids = document.querySelectorAll('#view .view > *, .site-foot > *');
  for (let i = 0; i < kids.length; i++) {
    if (kids[i].getBoundingClientRect().bottom > y) return kids[i];
  }
  return null;
}
function holdScroll(ms, mutate) {
  const el = topAnchorEl();
  const top0 = el ? el.getBoundingClientRect().top : 0;
  mutate();
  if (!el) return;
  const correct = () => {
    const drift = el.getBoundingClientRect().top - top0;
    if (Math.abs(drift) > 0.5) window.scrollBy(0, drift);
  };
  correct(); /* whatever the change did instantly */
  if (ms <= 0 || REDUCED_MOTION) return;
  const until = performance.now() + ms;
  const tick = () => { /* ...and again each frame while the dials interpolate */
    correct();
    if (performance.now() < until) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function markPrefButtons(name, value) {
  document.querySelectorAll('[data-pref="' + name + '"] button[data-v]').forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.v === value)));
}

function loadFaces(families) {
  if (!families || !document.fonts || !document.fonts.load) return Promise.resolve();
  const specs = [];
  families.forEach(f => {
    specs.push('400 1rem "' + f + '"', '700 1rem "' + f + '"', 'italic 400 1rem "' + f + '"');
  });
  return Promise.all(specs.map(spec => document.fonts.load(spec).catch(() => {})));
}

/* ---------- one way to change a reading setting ----------
   All four of them re-lay the page, and layout is the one thing this page cannot animate:
   interpolating line-height or root font-size costs a full reflow per frame, which measured
   at ~25fps with 170ms gaps. So nothing animates layout. The column fades down, the change
   lands in a single reflow while it is nearly invisible, and it fades back up with the
   reader's line pinned. `prepare` is for work that must finish first — loading a typeface. */
let swapSeq = 0;
function applyWithFade(mutate, prepare) {
  const settle = () => holdScroll(90, mutate);
  if (REDUCED_MOTION) {
    if (prepare) prepare().then(settle); else settle();
    return;
  }
  const seq = ++swapSeq;
  const panes = [document.getElementById('view'), document.querySelector('.site-foot')].filter(Boolean);
  panes.forEach(pane => pane.classList.add('reading-swap'));
  /* Wait for the fade to actually reach the floor rather than guessing at a duration —
     a slow frame used to land the reflow at ~0.3 opacity, where it was still visible. */
  const atFloor = new Promise(resolve => {
    const pane = panes[0];
    if (!pane) { setTimeout(resolve, 180); return; }
    let settled = false;
    const fire = ev => {
      if (settled || (ev && ev.propertyName !== 'opacity')) return;
      settled = true;
      pane.removeEventListener('transitionend', fire);
      resolve();
    };
    pane.addEventListener('transitionend', fire);
    setTimeout(fire, 420); /* the transition can be pre-empted or never start */
  });
  Promise.all([prepare ? prepare() : Promise.resolve(), atFloor]).then(() => {
    if (seq !== swapSeq) return; /* a faster clicker already asked for something else */
    settle();
    /* one frame to paint the new layout while it is still dim, then reveal it finished */
    requestAnimationFrame(() => { if (seq === swapSeq) panes.forEach(pane => pane.classList.remove('reading-swap')); });
  });
}

/* Waiting on the faces is the difference between one change and two: applied first, the
   real face arrives a beat later and re-lays the page a second time, under the reader. */
function setTypeTheme(name, instant) {
  const value = TYPE_THEMES[name] ? name : PREFS.type.def;
  markPrefButtons('type', value);
  /* The six buttons are two letters each now, so the head carries the name of the one held —
     the only place a touch reader, who never sees a title attribute, can read it. */
  const label = document.getElementById('type-name');
  const picked = document.querySelector('[data-pref="type"] button[data-v="' + value + '"]');
  if (label && picked) label.textContent = picked.dataset.name || value;
  lsSet(PREFS.type.key, value);
  const apply = () => {
    if (value === PREFS.type.def) delete document.documentElement.dataset.type;
    else document.documentElement.dataset.type = value;
  };
  if (instant) { holdScroll(0, apply); loadFaces(TYPE_THEMES[value]); return; }
  applyWithFade(apply, () => loadFaces(TYPE_THEMES[value]));
}

function setLineHeight(value, instant) {
  const v = (value === 'snug' || value === 'roomy') ? value : 'normal';
  markPrefButtons('lh', v);
  lsSet(PREFS.lh.key, v);
  const apply = () => {
    if (v === 'normal') delete document.documentElement.dataset.lh;
    else document.documentElement.dataset.lh = v;
  };
  if (instant) { holdScroll(0, apply); return; }
  applyWithFade(apply);
}

function setTextSize(index, instant) {
  const i = Math.max(0, Math.min(FS_STEPS.length - 1, isNaN(index) ? 2 : index));
  currentFsIndex = i;
  lsSet(PREFS.fs.key, String(i));
  /* the readout and the end stops answer the click itself, not the fade */
  const val = document.getElementById('fs-val');
  if (val) val.textContent = Math.round(FS_STEPS[i] * 100) + '%';
  document.querySelectorAll('[data-pref="fs"] button[data-step]').forEach(b => {
    const dir = +b.dataset.step;
    b.disabled = (dir < 0 && i === 0) || (dir > 0 && i === FS_STEPS.length - 1);
  });
  const apply = () => document.documentElement.style.setProperty('--fs', String(FS_STEPS[i]));
  if (instant) { holdScroll(0, apply); return; }
  applyWithFade(apply);
}

function applyPref(name, value, instant) {
  if (name === 'theme') {
    const root = document.documentElement;
    if (value === 'system') delete root.dataset.theme;
    else root.dataset.theme = value;
    lsSet(PREFS.theme.key, value);
    markPrefButtons('theme', value);
  } else if (name === 'type') {
    setTypeTheme(value, instant);
  } else if (name === 'lh') {
    setLineHeight(value, instant);
  } else if (name === 'fs') {
    setTextSize(parseInt(value, 10), instant);
  }
}

function initPrefs() {
  let theme = lsGet(PREFS.theme.key);
  if (theme !== 'light' && theme !== 'dark' && theme !== 'system') theme = PREFS.theme.def;
  let type = lsGet(PREFS.type.key);
  if (!TYPE_THEMES[type]) {
    /* the panel used to be a two-way serif/sans switch; carry that choice forward */
    type = lsGet('thread-font') === 'sans' ? 'figtree' : PREFS.type.def;
  }
  const fsSaved = parseInt(lsGet(PREFS.fs.key), 10);
  applyPref('theme', theme, true);
  applyPref('type', type, true);
  applyPref('lh', lsGet(PREFS.lh.key) || PREFS.lh.def, true);
  applyPref('fs', String(fsSaved >= 0 && fsSaved < FS_STEPS.length ? fsSaved : PREFS.fs.def), true);

  const wrap = document.getElementById('prefs');
  const btn = document.getElementById('prefs-btn');
  const menu = document.getElementById('prefs-menu');
  if (!wrap || !btn || !menu) return;

  /* On a phone the panel is a sheet pinned to the bottom of the screen, and `position: fixed`
     resolves against the nearest ancestor with a filter — which is the topbar, blurred. Left
     where it sits it would pin to the bottom of the header instead. So for as long as it is
     open at that width it lives on <body>; the CSS restates the header's own font-size so the
     em-sized controls inside come out the same either way. */
  const sheetMQ = window.matchMedia('(max-width: 760px)');
  let onBody = false;
  const toSheet = () => { if (!onBody && sheetMQ.matches) { document.body.appendChild(menu); onBody = true; } };
  const toWrap = () => { if (onBody) { wrap.appendChild(menu); onBody = false; } };

  const close = () => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); toWrap(); };
  /* The six previews are each set in their own two faces. A hidden menu renders nothing,
     so this first open is the moment they are worth fetching — and by the time one is
     picked its faces are already there. */
  let previewsWarmed = false;
  const open = () => {
    toSheet();
    menu.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    if (previewsWarmed) return;
    previewsWarmed = true;
    const all = [];
    Object.keys(TYPE_THEMES).forEach(k => TYPE_THEMES[k].forEach(f => {
      if (all.indexOf(f) < 0) all.push(f);
    }));
    loadFaces(all);
  };
  btn.addEventListener('click', ev => { ev.stopPropagation(); menu.hidden ? open() : close(); });
  menu.addEventListener('click', ev => {
    const step = ev.target.closest('[data-pref="fs"] button[data-step]');
    if (step) { setTextSize(currentFsIndex + (+step.dataset.step)); return; }
    const b = ev.target.closest('[data-pref] button[data-v]');
    if (!b) return;
    applyPref(b.closest('[data-pref]').dataset.pref, b.dataset.v);
  });
  /* the menu is no longer always inside the wrapper, so both count as "inside" */
  document.addEventListener('click', ev => {
    if (!menu.hidden && !wrap.contains(ev.target) && !menu.contains(ev.target)) close();
  });
  /* likewise Escape: once portaled, focus inside the sheet is no longer under the wrapper */
  document.addEventListener('keydown', ev => {
    if (ev.key === 'Escape' && !menu.hidden) { ev.preventDefault(); close(); btn.focus(); }
  });
  /* crossing the sheet/dropdown boundary mid-open would leave it anchored to the wrong thing */
  const onMQ = () => { if (!menu.hidden) close(); };
  if (sheetMQ.addEventListener) sheetMQ.addEventListener('change', onMQ);
  else if (sheetMQ.addListener) sheetMQ.addListener(onMQ);
}

function initVersionPicker() {
  const wrap = document.getElementById('verpick');
  const btn = document.getElementById('verpick-btn');
  const menu = document.getElementById('verpick-menu');
  const val = document.getElementById('verpick-val');
  if (!wrap || !btn || !menu || !val) return;

  const saved = lsGet('thread-version');
  if (saved && VERSIONS.some(v => v.code === saved)) ACTIVE_VERSION = saved;
  val.textContent = ACTIVE_VERSION;
  menu.innerHTML = versionMenuHtml('Verse pop-ups read in');
  /* Changing translation used to close the pinned pop-up and leave it stale; re-read it instead. */
  wireVersionPicker(wrap, () => refreshPinnedTooltip());
}

/* ================= hover scripture tooltips & translation APIs ================= */
const SCRIPTURE_API_BASE = 'https://esmrsky-scripture-api.esmrsky.workers.dev';
const TPT_VERSION_ID = 1849;
const YOUVERSION_USFM_BOOKS = {
  1: 'GEN', 2: 'EXO', 3: 'LEV', 4: 'NUM', 5: 'DEU', 6: 'JOS', 7: 'JDG', 8: 'RUT',
  9: '1SA', 10: '2SA', 11: '1KI', 12: '2KI', 13: '1CH', 14: '2CH', 15: 'EZR',
  16: 'NEH', 17: 'EST', 18: 'JOB', 19: 'PSA', 20: 'PRO', 21: 'ECC', 22: 'SNG',
  23: 'ISA', 24: 'JER', 25: 'LAM', 26: 'EZK', 27: 'DAN', 28: 'HOS', 29: 'JOL',
  30: 'AMO', 31: 'OBA', 32: 'JON', 33: 'MIC', 34: 'NAM', 35: 'HAB', 36: 'ZEP',
  37: 'HAG', 38: 'ZEC', 39: 'MAL', 40: 'MAT', 41: 'MRK', 42: 'LUK', 43: 'JHN',
  44: 'ACT', 45: 'ROM', 46: '1CO', 47: '2CO', 48: 'GAL', 49: 'EPH', 50: 'PHP',
  51: 'COL', 52: '1TH', 53: '2TH', 54: '1TI', 55: '2TI', 56: 'TIT', 57: 'PHM',
  58: 'HEB', 59: 'JAS', 60: '1PE', 61: '2PE', 62: '1JN', 63: '2JN', 64: '3JN',
  65: 'JUD', 66: 'REV'
};
const chapterCache = {};
const tptPassageCache = new Map();
let tooltipEl = null;
let tooltipTimer = null;
let tooltipPinned = false;
let tooltipRequestId = 0;
let tooltipLink = null;
let tooltipRef = '';
let contextDialogEl = null;
let contextRequestId = 0;
let contextVersionPicker = null;

function parseReference(refStr) {
  const clean = refStr.replace(/–/g, '-').trim();
  const match = clean.match(/^([123]\s)?([A-Za-z]+)\s(\d+)(?::(\d+)(?:[-](\d+))?)?/);
  if (!match) return null;

  const numPrefix = match[1] ? match[1].trim() : '';
  const name = match[2];
  const chapter = parseInt(match[3], 10);
  const verseStart = match[4] ? parseInt(match[4], 10) : null;
  const verseEnd = match[5] ? parseInt(match[5], 10) : null;

  const slot = BOOK_BY_NAME[name];
  if (!slot) return null;

  /* "1 Kings" picks slot 1; a bare "Kings" has no unnumbered volume, so it falls to the first. */
  const num = numPrefix ? parseInt(numPrefix, 10) : 0;
  const bookId = slot[num] !== undefined ? slot[num]
    : slot[0] !== undefined ? slot[0]
      : slot[1];
  if (!bookId) return null;

  return { bookId, chapter, verseStart, verseEnd };
}

/* "1 Cor 10:11" → "1 Corinthians 10:11", for the context dialog heading. */
function formatReferenceTitle(refStr) {
  const parsed = parseReference(refStr);
  const full = parsed && BOOK_FULL_BY_ID[parsed.bookId];
  if (!full) return refStr;
  let out = full + ' ' + parsed.chapter;
  if (parsed.verseStart !== null) {
    out += ':' + parsed.verseStart;
    if (parsed.verseEnd !== null && parsed.verseEnd !== parsed.verseStart) out += '–' + parsed.verseEnd;
  }
  return out;
}

function toYouVersionPassage(ref) {
  const parsed = parseReference(ref);
  if (!parsed || !YOUVERSION_USFM_BOOKS[parsed.bookId]) return '';
  let passage = YOUVERSION_USFM_BOOKS[parsed.bookId] + '.' + parsed.chapter;
  if (parsed.verseStart !== null) {
    passage += '.' + parsed.verseStart;
    if (parsed.verseEnd !== null && parsed.verseEnd !== parsed.verseStart) passage += '-' + parsed.verseEnd;
  }
  return passage;
}

function escapeScriptureText(text) {
  return String(text).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

/* bolls.life ships verses as small HTML fragments. Stripping every tag to '' glued words
   together at line breaks ("The Bronze SnakeThey traveled") and let <sup> footnote text
   leak in as verse words. So: footnotes and Strong's numbers go entirely, <br> becomes a
   real newline (the reader renders `white-space: pre-line`), italics survive, and
   everything else is escaped — the result is safe HTML, already escaped for its caller. */
const ITALIC_OPEN = '\u0001i\u0001';
const ITALIC_CLOSE = '\u0001/i\u0001';
function cleanBollsText(text) {
  const marked = String(text)
    .replace(/<s>[\s\S]*?<\/s>/gi, '')
    .replace(/<sup>[\s\S]*?<\/sup>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(?:i|em)\b[^>]*>/gi, m => (m.charAt(1) === '/' ? ITALIC_CLOSE : ITALIC_OPEN))
    .replace(/<[^>]*>/g, '');
  return escapeScriptureText(marked)
    .split(ITALIC_OPEN).join('<i>')
    .split(ITALIC_CLOSE).join('</i>')
    .replace(/[ \t]*\n[ \t]*/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

async function fetchTptFromYouVersion(ref) {
  const passage = toYouVersionPassage(ref);
  if (!passage) throw new Error('Reference not recognized.');
  const text = await fetchTptPassage(passage);
  return escapeScriptureText(text);
}

async function fetchTptPassage(passage) {
  if (!tptPassageCache.has(passage)) {
    const url = SCRIPTURE_API_BASE + '/passage?version=' + TPT_VERSION_ID + '&passage=' + encodeURIComponent(passage);
    tptPassageCache.set(passage, fetch(url, { headers: { Accept: 'application/json' } })
      .then(async response => {
        const body = await response.json().catch(() => ({}));
        if (!response.ok || !body.content) throw new Error(body.message || 'TPT could not be loaded.');
        return String(body.content).trim();
      })
      .catch(error => {
        tptPassageCache.delete(passage);
        throw error;
      }));
  }
  return tptPassageCache.get(passage);
}

/* The TPT source has no Pentateuch — Exodus through Deuteronomy 404 — which dead-ended
   ~50 references on this site. Those books skip the request and read NIV instead, and any
   other TPT failure falls back the same way, with a line saying so. */
const TPT_MISSING_BOOKS = [2, 3, 4, 5];
const TPT_FALLBACK_VERSION = 'NIV';
const TPT_FALLBACK_NOTE = '<span class="verse-fallback-note">TPT does not carry this book — showing ' + TPT_FALLBACK_VERSION + '.</span>';

function tptCoversBook(ref) {
  const parsed = parseReference(ref);
  return !parsed || TPT_MISSING_BOOKS.indexOf(parsed.bookId) === -1;
}

async function loadVerseText(ref, version) {
  if (version !== 'TPT') return fetchFromBolls(ref, version);
  if (tptCoversBook(ref)) {
    try {
      return await fetchTptFromYouVersion(ref);
    } catch (e) { /* fall through to the NIV fallback */ }
  }
  return (await fetchFromBolls(ref, TPT_FALLBACK_VERSION)) + '\n' + TPT_FALLBACK_NOTE;
}

async function fetchFromBolls(ref, version) {
  const parsed = parseReference(ref);
  if (!parsed) return 'Reference not recognized.';

  const { bookId, chapter, verseStart, verseEnd } = parsed;
  let verses;
  try {
    verses = await getBollsChapter(version, bookId, chapter);
  } catch (e) {
    return 'Could not retrieve scripture text.';
  }

  if (!verses || !verses.length) return 'Verse not found.';

  let filtered = [];
  if (verseStart !== null) {
    if (verseEnd !== null) {
      filtered = verses.filter(v => v.verse >= verseStart && v.verse <= verseEnd);
    } else {
      filtered = verses.filter(v => v.verse === verseStart);
    }
  } else {
    filtered = verses.slice(0, 3);
  }

  if (!filtered.length) return 'Verse not found in ' + version + '.';

  return filtered.map(v => {
    return cleanBollsText(v.text);
  }).join(' ');
}

async function getBollsChapter(version, bookId, chapter) {
  const cacheKey = `${version}-${bookId}-${chapter}`;

  if (!chapterCache[cacheKey]) {
    const url = 'https://bolls.life/get-text/' + version + '/' + bookId + '/' + chapter + '/';
    const res = await fetch(url);
    if (!res.ok) throw new Error('API error');
    chapterCache[cacheKey] = await res.json();
  }
  return chapterCache[cacheKey];
}

async function loadVerseContext(ref, version, radius) {
  const parsed = parseReference(ref);
  if (!parsed) throw new Error('Reference not recognized.');
  if (version !== 'TPT') return loadBollsContext(parsed, version, radius);
  if (TPT_MISSING_BOOKS.indexOf(parsed.bookId) === -1) {
    try {
      return await loadTptContext(parsed, radius);
    } catch (e) { /* fall through to the NIV fallback */ }
  }
  return (await loadBollsContext(parsed, TPT_FALLBACK_VERSION, radius)) +
    '<p class="context-fallback-note">' + TPT_FALLBACK_NOTE + '</p>';
}

async function loadBollsContext(parsed, version, radius) {
  const verses = await getBollsChapter(version, parsed.bookId, parsed.chapter);
  if (!verses || !verses.length) throw new Error('Verse not found.');
  const selectedStart = parsed.verseStart === null ? 1 : parsed.verseStart;
  const selectedEnd = parsed.verseEnd || selectedStart;
  const rangeStart = selectedStart - radius;
  const rangeEnd = selectedEnd + radius;
  const rows = verses
    .filter(v => v.verse >= rangeStart && v.verse <= rangeEnd)
    .map(v => ({ chapter: parsed.chapter, verse: v.verse, text: v.text }));

  // A passage does not stop where the chapter file does. Asking for more context at the top of
  // a chapter used to add verses after it, which is the opposite of what was asked for.
  if (rangeStart < 1 && parsed.chapter > 1) {
    const prev = await getBollsChapter(version, parsed.bookId, parsed.chapter - 1).catch(() => null);
    if (prev && prev.length) {
      const wanted = 1 - rangeStart;
      const tail = prev.slice(Math.max(0, prev.length - wanted));
      rows.unshift.apply(rows, tail.map(v => ({ chapter: parsed.chapter - 1, verse: v.verse, text: v.text })));
    }
  }
  if (rangeEnd > verses.length) {
    const next = await getBollsChapter(version, parsed.bookId, parsed.chapter + 1).catch(() => null);
    if (next && next.length) {
      const headRows = next.slice(0, rangeEnd - verses.length);
      rows.push.apply(rows, headRows.map(v => ({ chapter: parsed.chapter + 1, verse: v.verse, text: v.text })));
    }
  }

  return '<p class="context-passage">' + rows.map(v => {
    const selected = v.chapter === parsed.chapter && v.verse >= selectedStart && v.verse <= selectedEnd;
    const text = cleanBollsText(v.text);
    const num = v.chapter === parsed.chapter ? String(v.verse) : v.chapter + ':' + v.verse;
    return '<span class="context-verse' + (selected ? ' is-selected' : '') + '"><sup class="context-verse-number">' + num +
      '</sup><span class="ctx-t">' + text + '</span></span>';
  }).join(' ') + '</p>';
}

async function loadTptContext(parsed, radius) {
  const book = YOUVERSION_USFM_BOOKS[parsed.bookId];
  if (!book) throw new Error('Reference not recognized.');
  const selectedStart = parsed.verseStart === null ? 1 : parsed.verseStart;
  const selectedEnd = parsed.verseEnd || selectedStart;
  const beforeStart = Math.max(1, selectedStart - radius);
  const afterEnd = selectedEnd + radius;
  const passage = (start, end) => book + '.' + parsed.chapter + '.' + start + (end > start ? '-' + end : '');
  const requests = [];

  if (beforeStart < selectedStart) {
    requests.push(fetchTptPassage(passage(beforeStart, selectedStart - 1)).then(text =>
      '<span class="context-block">' + escapeScriptureText(text) + '</span>'
    ));
  }
  requests.push(fetchTptPassage(passage(selectedStart, selectedEnd)).then(text =>
    '<span class="context-block is-selected">' + escapeScriptureText(text) + '</span>'
  ));
  requests.push(fetchTptPassage(passage(selectedEnd + 1, afterEnd)).then(text =>
    '<span class="context-block">' + escapeScriptureText(text) + '</span>'
  ));

  const results = await Promise.allSettled(requests);
  const blocks = results.filter(result => result.status === 'fulfilled').map(result => result.value);
  if (!blocks.length) throw new Error('Verse not found.');
  return '<p class="context-passage">' + blocks.join(' ') + '</p>';
}

function initTooltip() {
  tooltipEl = document.createElement('div');
  tooltipEl.className = 'verse-tooltip';
  document.body.appendChild(tooltipEl);

  contextDialogEl = document.createElement('dialog');
  contextDialogEl.className = 'verse-context-dialog';
  contextDialogEl.tabIndex = -1;
  contextDialogEl.innerHTML =
    '<div class="context-dialog-inner">' +
    '  <header class="context-dialog-head"><div><span class="label">See in context</span><h3></h3></div>' +
    '  <div class="context-dialog-actions"><div class="verpick context-verpick">' +
    '    <button class="verpick-btn" type="button" aria-haspopup="listbox" aria-expanded="false" title="Bible translation">' +
    '      <svg class="verpick-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6.2C10 4.4 7 4.1 4 4.6V19c3-.5 6-.2 8 1.6 2-1.8 5-2.1 8-1.6V4.6c-3-.5-6-.2-8 1.6z"/><path d="M12 6.2v14.4"/></svg>' +
    '      <span class="verpick-val">' + ACTIVE_VERSION + '</span>' +
    '      <svg class="verpick-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6.5 9.8 5.5 5 5.5-5"/></svg>' +
    '    </button><div class="verpick-menu" role="listbox" aria-label="Bible translation" hidden></div></div>' +
    '    <button class="context-dialog-close" type="button" aria-label="Close">×</button></div></header>' +
    '  <div class="context-dialog-body" aria-live="polite"></div>' +
    '  <footer class="context-dialog-foot"><button class="context-more-button" type="button">Even more context</button></footer>' +
    '</div>';
  document.body.appendChild(contextDialogEl);
  const contextPickerWrap = contextDialogEl.querySelector('.context-verpick');
  contextPickerWrap.querySelector('.verpick-menu').innerHTML = versionMenuHtml('Read this passage in');
  contextVersionPicker = wireVersionPicker(contextPickerWrap, code => {
    contextDialogEl.dataset.version = code;
    refreshVerseContext(true);
  });

  tooltipEl.addEventListener('mouseenter', () => {
    if (tooltipTimer) clearTimeout(tooltipTimer);
  });
  tooltipEl.addEventListener('mouseleave', () => hideTooltip());

  document.body.addEventListener('mouseover', ev => {
    if (tooltipPinned) return;
    const link = ev.target.closest('.ref-link');
    if (!link) return;
    const ref = link.dataset.ref || link.textContent;
    if (!ref) return;
    showTooltip(link, ref, false);
  });

  document.body.addEventListener('mouseout', ev => {
    const link = ev.target.closest('.ref-link');
    if (!link) return;
    hideTooltip();
  });

  document.body.addEventListener('click', ev => {
    const link = ev.target.closest('.ref-link');
    if (link) {
      ev.preventDefault();
      const ref = link.dataset.ref || link.textContent;
      if (ref) showTooltip(link, ref, true);
      return;
    }

    const contextButton = ev.target.closest('.tooltip-context-button');
    if (contextButton) {
      openVerseContext(contextButton.dataset.ref, contextButton.dataset.version);
      hideTooltip(true);
      return;
    }

    const waypoint = ev.target.closest('.wp-card[data-verse-ref]');
    if (waypoint) {
      ev.preventDefault();
      showTooltip(waypoint, waypoint.dataset.verseRef, true);
      return;
    }

    /* The translation picker is part of the pop-up's controls, not "somewhere else". */
    if (tooltipPinned && !ev.target.closest('.verse-tooltip') && !ev.target.closest('.verpick')) hideTooltip(true);
  });

  document.addEventListener('keydown', ev => {
    if (ev.key !== 'Escape' || !tooltipPinned) return;
    if (contextDialogEl && contextDialogEl.open) return;   // <dialog> closes itself
    if (document.querySelector('.verpick.open')) return;   // the open menu takes it first
    ev.preventDefault();
    hideTooltip(true);
  });

  contextDialogEl.querySelector('.context-dialog-close').addEventListener('click', () => contextDialogEl.close());
  contextDialogEl.querySelector('.context-more-button').addEventListener('click', () => {
    contextDialogEl.dataset.radius = String((parseInt(contextDialogEl.dataset.radius, 10) || 4) + 6);
    refreshVerseContext(true);
  });
  contextDialogEl.addEventListener('close', () => { if (contextVersionPicker) contextVersionPicker.close(); });
  contextDialogEl.addEventListener('click', ev => {
    if (ev.target === contextDialogEl) contextDialogEl.close();
  });
}

/* Re-read the pinned pop-up in whatever translation is now active. */
function refreshPinnedTooltip() {
  if (!tooltipPinned || !tooltipLink || !tooltipRef) return;
  if (!tooltipLink.isConnected) return;
  // Rebuilding the pop-up dropped it back to a one-line "loading" box and then grew it again.
  // The verse stays on screen, dimmed, until its replacement is ready.
  fillTooltip(tooltipRef, getVersion(), ++tooltipRequestId);
}

function positionTooltip(link) {
  const rect = link.getBoundingClientRect();
  const scrollY = window.scrollY || window.pageYOffset;
  const scrollX = window.scrollX || window.pageXOffset;
  const width = Math.min(340, window.innerWidth - 28);
  // Anchoring to the link's own edges means the box can grow when the verse arrives without
  // moving: below, it grows downward; above, translateY(-100%) makes it grow upward. The old
  // code guessed a height, placed it, then re-placed it — which is the movement you could see.
  const roomBelow = window.innerHeight - rect.bottom;
  const below = roomBelow > 190 || roomBelow > rect.top;
  if (below) {
    tooltipEl.style.top = (scrollY + rect.bottom + 8) + 'px';
    tooltipEl.style.transform = 'none';
  } else {
    tooltipEl.style.top = (scrollY + rect.top - 8) + 'px';
    tooltipEl.style.transform = 'translateY(-100%)';
  }
  tooltipEl.style.left = Math.max(scrollX + 14, Math.min(scrollX + rect.left, scrollX + window.innerWidth - width - 14)) + 'px';
}

function fillTooltip(ref, version, requestId) {
  const box = tooltipEl.querySelector('.tooltip-text');
  if (box) box.classList.add('is-loading');
  const label = tooltipEl.querySelector('.tooltip-ref');
  if (label) label.textContent = ref + ' (' + version + ')';
  const button = tooltipEl.querySelector('.tooltip-context-button');
  if (button) { button.dataset.ref = ref; button.dataset.version = version; }
  return loadVerseText(ref, version).then(text => {
    if (requestId !== tooltipRequestId) return;
    const b = tooltipEl.querySelector('.tooltip-text');
    if (b) { b.classList.remove('is-loading'); setHTML(b, text); }
  }).catch(() => {
    if (requestId !== tooltipRequestId) return;
    const b = tooltipEl.querySelector('.tooltip-text');
    if (b) { b.classList.remove('is-loading'); b.innerHTML = '<span style="color:var(--thread)">Unable to load verse.</span>'; }
  });
}

function showTooltip(link, ref, pinned) {
  if (tooltipTimer) clearTimeout(tooltipTimer);
  tooltipPinned = Boolean(pinned);
  tooltipLink = link;
  tooltipRef = ref;
  const requestId = ++tooltipRequestId;
  const version = getVersion();

  positionTooltip(link);
  tooltipEl.innerHTML =
    '<span class="tooltip-ref">' + escapeScriptureText(ref) + ' (' + version + ')</span>' +
    '<div class="tooltip-text is-loading">Reading…</div>' +
    '<div class="tooltip-actions"><button class="tooltip-context-button" type="button" data-ref="' + escapeScriptureText(ref) + '" data-version="' + version + '">See in context</button></div>';
  tooltipEl.classList.toggle('is-pinned', tooltipPinned);
  tooltipEl.classList.add('open');
  fillTooltip(ref, version, requestId);
}

function hideTooltip(force) {
  if (tooltipPinned && !force) return;
  tooltipTimer = setTimeout(() => {
    tooltipPinned = false;
    tooltipEl.classList.remove('open');
    tooltipEl.classList.remove('is-pinned');
  }, 200);
}

function refreshVerseContext(preserveSelection) {
  if (!contextDialogEl) return;
  const ref = contextDialogEl.dataset.ref;
  const version = contextDialogEl.dataset.version || getVersion();
  const radius = parseInt(contextDialogEl.dataset.radius, 10) || 4;
  if (!ref) return;
  const requestId = ++contextRequestId;
  const body = contextDialogEl.querySelector('.context-dialog-body');
  const moreButton = contextDialogEl.querySelector('.context-more-button');
  const selectedBefore = preserveSelection && body.querySelector('.is-selected');
  const selectedOffsetBefore = selectedBefore ? selectedBefore.offsetTop : 0;
  const scrollBefore = body.scrollTop;
  if (!preserveSelection) body.innerHTML = '<p class="context-loading">Loading surrounding verses…</p>';
  else { body.style.minHeight = body.offsetHeight + 'px'; body.classList.add('is-refreshing'); }
  moreButton.disabled = true;
  moreButton.textContent = preserveSelection ? 'Loading more…' : 'Even more context';

  loadVerseContext(ref, version, radius).then(html => {
    if (requestId !== contextRequestId) return;
    body.classList.remove('is-refreshing');
    setHTML(body, html);
    requestAnimationFrame(() => { body.style.minHeight = ''; });
    if (preserveSelection) {
      const selectedAfter = body.querySelector('.is-selected');
      if (selectedAfter) body.scrollTop = scrollBefore + selectedAfter.offsetTop - selectedOffsetBefore;
    }
    moreButton.disabled = false;
    moreButton.textContent = 'Even more context';
  }).catch(() => {
    if (requestId !== contextRequestId) return;
    body.classList.remove('is-refreshing');
    body.style.minHeight = '';
    body.innerHTML = '<p>Unable to load the surrounding verses right now.</p>';
    moreButton.disabled = false;
    moreButton.textContent = 'Even more context';
  });
}

function openVerseContext(ref, version) {
  if (!contextDialogEl || !ref) return;
  version = version || getVersion();
  contextDialogEl.dataset.ref = ref;
  contextDialogEl.dataset.version = version;
  contextDialogEl.dataset.radius = '4';
  contextDialogEl.querySelector('h3').textContent = formatReferenceTitle(ref);
  applyVersion(version);
  const body = contextDialogEl.querySelector('.context-dialog-body');
  body.scrollTop = 0;
  if (!contextDialogEl.open) {
    if (typeof contextDialogEl.showModal === 'function') contextDialogEl.showModal();
    else contextDialogEl.setAttribute('open', '');
  }
  contextDialogEl.focus({ preventScroll: true });
  refreshVerseContext(false);
}

function renderSections() {
  const container = document.getElementById('view');
  let html = '';
  NAV.forEach(n => {
    const fn = VIEWS[n.id];
    if (fn) html += '<section id="' + n.id + '" class="section-block" style="--section-c:var(' + n.cvar + ')">' + fn() + '</section>';
  });
  container.innerHTML = html;
  syncMobileStickyOffsets();
  wireAllSections();
  initMarquees();
  initHeroChart();
  layoutRail();
}

/* ================= filmstrip marquees (threads) ================= */
/* Motion lives on the track's `transform`, not on the wrapper's `scrollLeft`. scrollLeft is
   an integer, so 0.37px per frame quantised into visible stepping — and writing it every
   frame, together with a mask on the scrolling element, are the two suspects behind the
   iOS filmstrip going blank or freezing. The wrapper keeps its native scroll for the
   reader's own wheel and touch panning; the two are additive and nothing here writes
   scrollLeft except a deliberate mouse drag, so a trackpad scroll no longer snaps back. */
let marqueeCleanups = [];
function initMarquees() {
  marqueeCleanups.forEach(cleanup => cleanup());
  marqueeCleanups = [];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TRACK_GAP = 10;   // matches .marquee-track's gap

  document.querySelectorAll('[data-marquee]').forEach((mq, rowIndex) => {
    const track = mq.querySelector('.marquee-track');
    if (!track) return;
    if (!track.dataset.orig) track.dataset.orig = track.innerHTML;
    track.innerHTML = track.dataset.orig;
    track.style.transform = '';
    if (reduced) return;

    track.innerHTML =
      '<div class="marquee-group">' + track.dataset.orig + '</div>' +
      '<div class="marquee-group" aria-hidden="true">' + track.dataset.orig + '</div>';

    const firstGroup = track.querySelector('.marquee-group');
    track.querySelectorAll('.marquee-group[aria-hidden="true"] a, .marquee-group[aria-hidden="true"] button').forEach(el => el.tabIndex = -1);

    let loopWidth = firstGroup.offsetWidth + TRACK_GAP;
    const speed = 0.022 * (rowIndex % 2 ? -1 : 1);   // neighbouring rows drift opposite ways
    let offset = 0;
    let frame = 0;
    let lastTime = 0;
    let dragging = false;
    let hoverPaused = false;
    let tapPaused = false;
    let ignoreHoverUntilLeave = false;
    let suppressClickUntil = 0;
    let startX = 0;
    let startScroll = 0;

    const applyOffset = () => {
      if (loopWidth > 0) offset = ((offset % loopWidth) + loopWidth) % loopWidth;
      track.style.transform = 'translate3d(' + (-offset).toFixed(2) + 'px, 0, 0)';
    };

    const tick = time => {
      if (!lastTime) lastTime = time;
      if (!dragging && !hoverPaused && !tapPaused) {
        offset += Math.min(time - lastTime, 40) * speed;
        applyOffset();
      }
      lastTime = time;
      frame = requestAnimationFrame(tick);
    };
    const startTicking = () => { if (!frame) { lastTime = 0; frame = requestAnimationFrame(tick); } };
    const stopTicking = () => { if (frame) { cancelAnimationFrame(frame); frame = 0; } };

    const onPointerDown = ev => {
      if (ev.pointerType !== 'mouse') {
        /* Touch pans natively — no pointer capture, which is the second iOS suspect: if
           setPointerCapture throws on a touch pointer, `dragging` sticks and the strip
           freezes for good. Just hold the motion while a finger is down. */
        startX = ev.clientX;
        tapPaused = true;
        mq.classList.add('is-paused');
        return;
      }
      if (ev.button !== 0) return;
      dragging = true;
      startX = ev.clientX;
      startScroll = mq.scrollLeft;
      mq.classList.add('is-dragging');
      try { mq.setPointerCapture(ev.pointerId); } catch (e) { /* capture is a nicety, not a requirement */ }
    };
    const onPointerMove = ev => {
      if (!dragging) return;
      mq.scrollLeft = startScroll - (ev.clientX - startX);
    };
    const onPointerEnd = ev => {
      if (ev.pointerType !== 'mouse') {
        /* a deliberate tap parks the strip; a swipe (or a cancel, meaning native scrolling
           took the gesture) lets it run again */
        tapPaused = ev.type === 'pointerup' && Math.abs(ev.clientX - startX) <= 6;
        mq.classList.toggle('is-paused', hoverPaused || tapPaused);
        lastTime = 0;
        return;
      }
      if (!dragging) return;
      dragging = false;
      const wasDrag = Math.abs(ev.clientX - startX) > 6;
      suppressClickUntil = wasDrag ? performance.now() + 250 : 0;
      if (wasDrag) {
        tapPaused = false;
        hoverPaused = false;
        ignoreHoverUntilLeave = true;
      }
      lastTime = 0;
      mq.classList.remove('is-dragging');
      mq.classList.toggle('is-paused', hoverPaused || tapPaused);
      try { if (mq.hasPointerCapture(ev.pointerId)) mq.releasePointerCapture(ev.pointerId); } catch (e) { /* already gone */ }
    };
    const onClick = ev => {
      if (performance.now() >= suppressClickUntil) return;
      ev.preventDefault();
      ev.stopImmediatePropagation();
    };
    const onMouseEnter = () => {
      if (ignoreHoverUntilLeave) return;
      hoverPaused = true;
      mq.classList.add('is-paused');
    };
    const onMouseLeave = () => {
      ignoreHoverUntilLeave = false;
      hoverPaused = false;
      mq.classList.toggle('is-paused', tapPaused);
      lastTime = 0;
    };
    const onDocumentPointerDown = ev => {
      if (!tapPaused || mq.contains(ev.target)) return;
      tapPaused = false;
      mq.classList.toggle('is-paused', hoverPaused);
      lastTime = 0;
    };

    mq.addEventListener('pointerdown', onPointerDown);
    mq.addEventListener('pointermove', onPointerMove);
    mq.addEventListener('pointerup', onPointerEnd);
    mq.addEventListener('pointercancel', onPointerEnd);
    mq.addEventListener('click', onClick, true);
    mq.addEventListener('mouseenter', onMouseEnter);
    mq.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('pointerdown', onDocumentPointerDown);

    /* Thirteen strips animating off screen is thirteen rAF loops doing nothing visible. */
    let observer = null;
    if (typeof IntersectionObserver === 'function') {
      observer = new IntersectionObserver(entries => {
        entries[0].isIntersecting ? startTicking() : stopTicking();
      }, { rootMargin: '250px 0px' });
      observer.observe(mq);
    } else {
      startTicking();
    }

    /* A resize used to rebuild every strip from scratch, which reset all thirteen to zero —
       and on phones the URL bar fires resize while you scroll. Re-measure the loop instead
       and leave the position alone. */
    let sizer = null;
    if (typeof ResizeObserver === 'function') {
      sizer = new ResizeObserver(() => {
        const next = firstGroup.offsetWidth + TRACK_GAP;
        if (next > 0 && next !== loopWidth) { loopWidth = next; applyOffset(); }
      });
      sizer.observe(firstGroup);
    }

    marqueeCleanups.push(() => {
      stopTicking();
      if (observer) observer.disconnect();
      if (sizer) sizer.disconnect();
      mq.classList.remove('is-dragging');
      mq.removeEventListener('pointerdown', onPointerDown);
      mq.removeEventListener('pointermove', onPointerMove);
      mq.removeEventListener('pointerup', onPointerEnd);
      mq.removeEventListener('pointercancel', onPointerEnd);
      mq.removeEventListener('click', onClick, true);
      mq.removeEventListener('mouseenter', onMouseEnter);
      mq.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('pointerdown', onDocumentPointerDown);
    });
  });
}

/* ================= scarlet progress rail ================= */
function initRail() {
  if (document.getElementById('rail')) return;
  const rail = document.createElement('div');
  rail.id = 'rail';
  rail.innerHTML = '<div class="rail-track"></div><div class="rail-fill"></div>' +
    NAV.map(n => '<button class="rail-dot" data-view="' + n.id + '" title="' + n.label + '" aria-label="Jump to ' + n.label + '" style="--c:var(' + n.cvar + ')"><span class="rail-dot-label">' + n.label + '</span></button>').join('');
  document.body.appendChild(rail);
  rail.addEventListener('click', ev => {
    const dot = ev.target.closest('.rail-dot');
    if (!dot) return;
    const el = document.getElementById(dot.dataset.view);
    if (el) { isScrollingNav = true; el.scrollIntoView({ behavior: 'smooth', block: 'start' }); updateActiveNav(dot.dataset.view); setTimeout(() => { isScrollingNav = false; }, 800); }
  });
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      if (dh <= 0) return;
      const frac = Math.min(1, window.scrollY / dh);
      const fill = rail.querySelector('.rail-fill');
      if (fill) fill.style.height = (frac * 100) + '%';
      const marker = window.scrollY + window.innerHeight * 0.4;
      rail.querySelectorAll('.rail-dot').forEach(dot => {
        const el = document.getElementById(dot.dataset.view);
        dot.classList.toggle('passed', !!el && marker >= el.offsetTop);
      });
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
function layoutRail() {
  const rail = document.getElementById('rail');
  if (!rail) return;
  const dh = document.documentElement.scrollHeight - window.innerHeight;
  if (dh <= 0) return;
  NAV.forEach(n => {
    const el = document.getElementById(n.id);
    const dot = rail.querySelector('.rail-dot[data-view="' + n.id + '"]');
    if (el && dot) dot.style.top = (Math.min(1, el.offsetTop / dh) * 100) + '%';
  });
}
window.addEventListener('resize', () => setTimeout(layoutRail, 200));

function initBackToTop() {
  const button = document.getElementById('back-to-top');
  if (!button) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    button.classList.toggle('visible', window.scrollY > Math.max(520, window.innerHeight * 0.75));
  };
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  button.addEventListener('click', () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
  update();
}

function boot() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const nav = document.getElementById('nav');
  nav.innerHTML = NAV.map(n =>
    '<a class="nav-link" data-view="' + n.id + '" href="#/' + n.id + '" style="--c:var(' + n.cvar + ')"><span class="dot"></span>' + n.label + '</a>').join('');

  // Set up nav click listeners for smooth scrolling
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', ev => {
      ev.preventDefault();
      const id = a.dataset.view;
      const el = document.getElementById(id);
      if (el) {
        isScrollingNav = true;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        /* A deliberate jump is a place you can come back from. This used to replaceState,
           so Back left the site instead of returning to the section you came from —
           scrollspy still replaces as you drift, which is right. */
        if (location.hash !== '#/' + id) history.pushState(null, '', '#/' + id);
        updateActiveNav(id);
        setTimeout(() => { isScrollingNav = false; }, 800);
      }
    });
  });

  initPrefs();

  initVersionPicker();
  initBackToTop();

  initRail();
  renderSections();

  // Wire events, then handle the initial route before enabling scrollspy.
  initTooltip();

  window.addEventListener('hashchange', route);
  window.addEventListener('resize', syncMobileStickyOffsets);
  if (location.hash) {
    route({ instant: true });
    setupScrollspy();
  } else {
    updateActiveNav('start');
    setupScrollspy();
  }
}

boot();
