/* ================= app: helpers ================= */
const BG = 'https://www.biblegateway.com/passage/?search=';
const REF_RE = /((?:[123]\s)?(?:Gen|Ex|Lev|Num|Deut|Josh|Judg|Ruth|Sam|Kings|Chr|Ezra|Neh|Esth|Job|Ps|Prov|Eccl|Song|Isa|Jer|Lam|Ezek|Dan|Hos|Joel|Amos|Jonah|Mic|Micah|Nah|Hab|Zeph|Hag|Zech|Mal|Matt|Mark|Luke|John|Acts|Rom|Cor|Gal|Eph|Phil|Col|Thess|Tim|Titus|Heb|Jas|James|Pet|Jude|Rev)\s\d+(?::\d+(?:[-–]\d+(?::\d+)?)?(?:,\s?\d+(?:[-–]\d+)?)*)?)/g;

function refLink(r) {
  return '<a class="ref-link" target="_blank" rel="noopener" href="' + BG + encodeURIComponent(r) + '" data-ref="' + r + '">' + r + '</a>';
}
/* text edition: 'updated' (default) or 'orig'. ver(a,b) marks a field whose
   wording changed in this pass; pick() resolves it for the active edition.
   linkRefs unwraps it, so any text routed through linkRefs is edition-aware. */
let TEXT_EDITION = 'updated';
function ver(a, b) { return { __ed: true, a: a, b: b }; }
function pick(x) { return (x && x.__ed) ? (TEXT_EDITION === 'orig' ? x.a : x.b) : x; }
function linkRefs(html) { return pick(html).replace(REF_RE, (m) => refLink(m)); }
function refRow(refs) {
  return '<div class="pillar-refs">' + refs.map(refLink).join(' · ') + '</div>';
}
function badge(kind) {
  const b = CODES.badges[kind];
  return '<span class="badge ' + b.cls + '" title="' + b.tip + '">' + b.label + '</span>';
}
function paragraphCards(html, labels) {
  const parts = html.match(/<p>[\s\S]*?<\/p>/g) || [html];
  return parts.map((part, i) =>
    '<div class="mind-panel">' +
    '<span class="label">' + (labels && labels[i] ? labels[i] : 'Field note ' + (i + 1)) + '</span>' +
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
  const picks = ['lamb', 'bread', 'water', 'garment', 'light', 'shepherd', 'king', 'temple', 'rest', 'covenant', 'bride', 'exile', 'name'];
  const ths = picks.map(id => THREADS.find(t => t.id === id));
  const X0 = 34, CX = 528, CY = 158, XE = 706;
  const n = ths.length, top = 42, bot = 276;
  let paths = '';
  ths.forEach((t, i) => {
    const y0 = top + (bot - top) * (i / (n - 1));
    const midY = y0 + (CY - y0) * 0.42 + (i % 2 ? 10 : -10);
    const d = 'M' + X0 + ' ' + y0 +
      ' C 150 ' + y0 + ', 200 ' + midY + ', 296 ' + midY +
      ' S 462 ' + CY + ', ' + CX + ' ' + CY;
    // Thin visual colored path
    paths += '<path class="hero-thread" data-thread="' + t.id + '" d="' + d + '" fill="none" stroke="var(' + t.cvar + ')" stroke-width="2.2" stroke-linecap="round"></path>';
    // Thicker invisible trigger path on top of visual path
    paths += '<path class="hero-thread-trigger" data-thread="' + t.id + '" d="' + d + '" fill="none" stroke="transparent" stroke-width="16" stroke-linecap="round"></path>';
  });
  const eras = [[70, 'TORAH'], [180, 'HISTORY'], [277, 'POETS'], [398, 'PROPHETS'], [528, 'GOSPELS'], [622, 'LETTERS'], [694, 'REV']];
  let ticks = '';
  eras.forEach(([x, l]) => {
    ticks += '<line x1="' + x + '" y1="288" x2="' + x + '" y2="294" stroke="var(--line)" stroke-width="1.5"/>' +
      '<text x="' + x + '" y="306" text-anchor="middle" font-size="8.5" letter-spacing="1.5" fill="var(--ink-faint)" style="font-family:var(--font-label);font-weight:600">' + l + '</text>';
  });
  return '<svg viewBox="0 0 720 316" role="img" aria-label="Thirteen biblical themes converging on Jesus and continuing to Revelation">' +
    paths +
    '<path d="M' + CX + ' ' + CY + ' H' + XE + '" stroke="var(--gold)" stroke-width="4" stroke-linecap="round" opacity="0.9"/>' +
    '<path d="M' + CX + ' ' + CY + ' H' + XE + '" stroke="var(--gold)" stroke-width="10" stroke-linecap="round" opacity="0.14"/>' +
    '<circle cx="' + CX + '" cy="' + CY + '" r="5.5" fill="var(--gold)"/>' +
    '<path d="M' + CX + ' 118 v-26 M' + (CX - 9) + ' 101 h18" stroke="var(--gold)" stroke-width="3" stroke-linecap="round"/>' +
    '<line x1="' + CX + '" y1="124" x2="' + CX + '" y2="' + (CY - 8) + '" stroke="var(--gold)" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.8"/>' +
    '<text x="' + CX + '" y="82" text-anchor="middle" font-size="10" letter-spacing="2.5" fill="var(--gold)" style="font-family:var(--font-label);font-weight:700">JESUS</text>' +
    ticks +
    '</svg>';
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
    sTable = pt(0.52, 0.72), sLamp = pt(0.52, 0.28), sIncense = pt(0.68, 0.5),
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

  // route: outside → gate → altar → laver → into the tent → lamp → table → incense → veil → ark
  const entry = pt(0.44, 0.5);
  const route = 'M' + (sGate[0] - 46) + ' ' + sGate[1] + ' L' + sGate.join(' ') + ' L' + sAltar.join(' ') + ' L' + sLaver.join(' ') +
    ' L' + entry.join(' ') + ' L' + sLamp.join(' ') + ' L' + sTable.join(' ') + ' L' + sIncense.join(' ') + ' L' + sVeil.join(' ') + ' L' + sArk.join(' ');

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
function head(navItem, h2, lede) {
  return '<div class="section-head" style="--c:var(' + navItem.cvar + ')">' +
    '<div class="eyebrow">' + icon(navItem.icon) + navItem.label + '</div>' +
    '<h2>' + h2 + '</h2>' +
    '<p class="lede">' + linkRefs(lede) + '</p></div>';
}

function vStart() {
  const n = NAV[0];
  const legend = THREADS.map(t => {
    return '<button class="legend-chip" data-thread="' + t.id + '" style="--c:var(' + t.cvar + ')"><span class="dot"></span>' + t.name + '</button>';
  }).join('');
  const ideas = START.bigIdea.map(i => '<div class="idea-row"><span class="idea-num"></span><div><b>' + i.t + '</b><p>' + linkRefs(i.x) + '</p></div></div>').join('');
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
    '      <p>Hover over any thread path on the chart or select a legend chip to trace its journey from Genesis to Revelation.</p>' +
    '    </div>' +
    '  </div>' +
    '  <div class="chart-main">' +
    '    <span class="chart-corner tl">Gen 1:1</span><span class="chart-corner br">Rev 22:21</span>' +
    '    <div class="hero-scroll">' + buildHeroChart() + '</div>' +
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
  const insights = PATTERN.insights.map((i, ix) =>
    '<li><span class="insight-marker">' + (ix + 1) + '</span><div><b>' + i.t + '</b><span class="ins-txt">' + linkRefs(i.x) + '</span></div></li>').join('');
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
    '<span class="chart-corner tl">Gen 15:13</span><span class="chart-corner br">Josh 21:45</span>' +
    '<div class="journey-scroll">' + buildJourneySVG() + '</div>' +
    '<div class="journey-caps">' +
    '<div class="journey-cap" style="--c:var(--s-egypt)"><b>Egypt says</b><span>' + linkRefs('“You are what you produce.” Worth measured in bricks per day (Ex 5:13-14).') + '</span></div>' +
    '<div class="journey-cap" style="--c:var(--s-desert)"><b>The wilderness hears</b><span>' + linkRefs('“You are my son” — identity spoken before performance (Ex 4:22; Deut 8:2-3).') + '</span></div>' +
    '<div class="journey-cap" style="--c:var(--s-land)"><b>The land walks</b><span>' + linkRefs('Fight FROM victory, not for it — “I have given you” (Josh 1:3).') + '</span></div>' +
    '</div></div>' +
    '<div class="season-grid">' + seasons + '</div>' +
    '<div class="home-section-title"><h2>Trail wisdom</h2><svg class="rr" viewBox="0 0 300 12" preserveAspectRatio="none" style="color:var(--c-pattern)" aria-hidden="true"><path d="M0 6 H300" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/></svg></div>' +
    '<ol class="insight-list">' + insights + '</ol>' +
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
      '<div class="wp-card' + (w.j ? ' wp-cross' : '') + '"><span class="wp-ref">' + refLink(w.ref) + (w.j ? ' · lands here' : '') + '</span><p>' + linkRefs(w.note) + '</p></div>').join('');
    return '<div class="thread-row" id="t-' + t.id + '" style="--c:var(' + t.cvar + ')">' +
      '<div class="thread-row-head">' +
      '<span class="icon-chip">' + icon(t.icon) + '</span>' +
      '<div class="thread-row-title"><h3>' + t.name + '</h3><span class="thread-tag">' + t.tag + '</span></div>' +
      '<span class="thread-count">' + t.way.length + ' waypoints</span>' +
      '</div>' +
      '<div class="thread-marquee" data-marquee><div class="marquee-track">' + wps + '</div></div>' +
      '<div class="thread-row-foot">' +
      '<div class="lands-on"><span class="label">Where it lands</span>' + linkRefs(t.landsOn) + '</div>' +
      '<p class="for-you">For you: ' + linkRefs(t.forYou) + '</p>' +
      '</div></div>';
  }).join('');
  return '<div class="view">' + head(n, 'Thirteen threads through the whole book',
    'Every ribbon below is one theme traced Genesis to Revelation — real verses, in order, drifting past like a filmstrip (hover to pause, tap any reference to read it). The gold card is where the thread lands on Jesus. This is the fastest cure for “the Bible feels random.”') +
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

  const feasts = CODES.feasts.map(f =>
    '<div class="feast-row"><div class="feast-when">' + f.when + '</div><div><h4>' + f.name + ' ' + badge(f.badge) + '</h4><p>' + linkRefs(f.body) + '</p></div></div>').join('');
  const loose = CODES.loose.map(l =>
    '<div class="card type-card" style="--c:var(--c-codes)"><h3>' + l.name + ' ' + badge(l.badge) + '</h3><p>' + linkRefs(l.body) + '</p></div>').join('');
  return '<div class="view">' + head(n, 'The codes: written in advance', CODES.intro) +
    '<div class="subtabs">' + tabBtns + '</div>' +
    '<div class="tabpane" data-pane="prophecies">' +
    '<div class="table-scroll"><table class="map-table"><thead><tr><th>The claim</th><th>Promised</th><th>Lands</th><th>Reading</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
    '<p class="note">' + linkRefs(CODES.prophecyNote) + '</p></div>' +
    '<div class="tabpane" data-pane="types" hidden><p class="lede" style="margin-bottom:18px">' + linkRefs(CODES.typesNote) + '</p><div class="grid grid-2">' + types + '</div></div>' +
    '<div class="tabpane" data-pane="tabernacle" hidden><p class="lede" style="margin-bottom:20px">' + linkRefs(CODES.tabernacle.intro) + '</p><div class="tabernacle-graphic-container" style="margin-bottom:30px">' + buildTabernacleSVG() + '</div>' + tabernacleLayout + tabInsights + '<p class="note" style="margin-top:20px">Walk it east to west and you’ve just walked the gospel: enter, be covered, be washed, be fed, be lit, pray, pass the torn veil, meet Him at the mercy seat.</p></div>' +
    '<div class="tabpane" data-pane="feasts" hidden>' +
    '<div class="chart-panel feast-arc-panel"><span class="chart-corner tl">Lev 23:2</span><span class="chart-corner br">Col 2:16-17</span>' + buildFeastArc() + '</div>' +
    '<div class="card">' + feasts + '</div><p class="note">' + linkRefs(CODES.feastNote) + '</p></div>' +
    '<div class="tabpane" data-pane="loose" hidden><div class="grid grid-2">' + loose + '</div></div>' +
    '</div>';
}

function vTriune() {
  const n = NAV[4];
  const rails = TRIUNE.rails.map(r =>
    '<div class="triune-rail" style="--c:var(--c-triune)"><span class="icon-chip">' + icon('trinity') + '</span><div><h3>' + r.t + '</h3><p>' + linkRefs(r.x) + '</p></div></div>').join('');
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
    '<div class="card triune-rails" style="--c:var(--c-triune)">' + rails + '</div>' +
    '<div class="home-section-title"><h2>Explicit anchors</h2><svg class="rr" viewBox="0 0 300 12" preserveAspectRatio="none" style="color:var(--c-triune)" aria-hidden="true"><path d="M0 6 H300" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/></svg></div>' +
    '<div class="grid grid-2">' + anchors + '</div>' +
    '<div class="home-section-title"><h2>Story echoes</h2><svg class="rr" viewBox="0 0 300 12" preserveAspectRatio="none" style="color:var(--c-triune)" aria-hidden="true"><path d="M0 6 H300" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/></svg></div>' +
    '<div class="grid grid-2">' + patterns + '</div>' +
    '<p class="note" style="border-left-color:var(--c-triune)">' + linkRefs(TRIUNE.note) + '</p></div>';
}

function vWalking() {
  const n = NAV[5];
  const words = TEN_WORDS.map(w => '<span class="legend-chip" style="--c:var(--c-walk)"><span class="dot"></span>' + w + '</span>').join('');
  const cards = WALKING.pillars.map(p =>
    '<div class="card pillar-card" style="--c:var(--c-walk)">' +
    '<div class="case-top"><span class="icon-chip">' + icon(p.icon) + '</span><h3>' + p.name + '</h3></div>' +
    '<p class="lie">🚫 <b>Old Software:</b> ' + p.lie + '</p>' +
    '<p class="truth">⚡ <b>New Identity:</b> ' + p.truth + '</p>' +
    '<p class="pillar-body">' + linkRefs(p.body) + '</p>' +
    '<div class="practice"><span class="label">🛠️ Try this</span>' + linkRefs(p.practice) + '</div>' +
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
    '<div class="row pull"><b>🧲 The pull</b><span>' + linkRefs(d.pull) + '</span></div>' +
    '<div class="row cost"><b>⚠️ The cost</b><span>' + linkRefs(d.cost) + '</span></div>' +
    '<div class="row home"><b>🧭 The way home</b><span>' + linkRefs(d.home) + '</span></div>' +
    '</div>' + refRow(d.refs) + '</div>').join('');
  return '<div class="view">' + head(n, 'Detours: sincere wrong turns', DETOURS.intro) +
    '<div class="grid grid-2">' + cards + '</div></div>';
}

function vMind() {
  const n = NAV[7];
  const primer = NEURO_PRIMER.map(p =>
    '<div class="mind-panel">' +
    '<span class="label">' + p.label + '</span>' +
    '<h4>' + p.title + '</h4>' +
    '<p>' + linkRefs(p.body) + '</p>' +
    refRow(p.refs) + '</div>').join('');
  const cards = MIND.blocks.map(b => {
    let tv = '';
    if (b.tv) {
      tv = '<div class="tv-grid"><div class="tv-box treasure"><span class="label">Keep the treasure</span><ul>' +
        b.tv.treasure.map(x => '<li>' + linkRefs(x) + '</li>').join('') + '</ul></div>' +
        '<div class="tv-box ditch"><span class="label">Skip the ditch</span><ul>' +
        b.tv.ditch.map(x => '<li>' + linkRefs(x) + '</li>').join('') + '</ul></div></div>';
    }
    return '<div class="card mind-card" style="--c:var(--c-mind)">' +
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
  const shelves = LIBRARY.shelves.map(s =>
    '<div class="shelf" style="--c:var(--c-library)"><div class="shelf-title">' + icon(s.icon) + '<h3>' + s.title + '</h3></div>' +
    '<div class="shelf-items">' + s.items.map(i =>
      '<div class="shelf-item"><span class="kind">' + i.kind + '</span>' +
      '<span><b><a target="_blank" rel="noopener" href="' + i.url + '">' + i.title + '</a></b> — ' + i.by + '. <span>' + i.note + '</span></span></div>').join('') +
    '</div></div>').join('');
  return '<div class="view">' + head(n, 'The pack list', LIBRARY.intro) + shelves + '</div>';
}

/* ================= search ================= */
let INDEX = [];
function buildIndex() {
  INDEX.length = 0;
  const add = (view, anchor, whereLabel, cvar, title, sub, extra) =>
    INDEX.push({ view, anchor, where: whereLabel, cvar, title, sub: sub || '', hay: (title + ' ' + (sub || '') + ' ' + (extra || '')).toLowerCase() });
  THREADS.forEach(t => add('threads', 't-' + t.id, 'Threads', t.cvar, t.name, t.tag, t.way.map(w => w.ref + ' ' + w.note).join(' ') + ' ' + t.landsOn));
  PATTERN.seasons.forEach(s => add('pattern', '', 'The Pattern', s.cvar, s.name, s.sub, s.rows.map(r => r.v).join(' ')));
  PATTERN.insights.forEach(i => add('pattern', '', 'The Pattern', '--c-pattern', i.t, '', i.x));
  PATTERN.cases.forEach((c, ix) => add('pattern', 'case-' + ix, 'Case studies', '--c-pattern', c.name + ' — ' + c.sub, '', c.p1 + ' ' + c.p2 + ' ' + c.p3));
  CODES.prophecies.forEach(p => add('codes', '', 'Prophecies', '--c-codes', p.what, p.ot + ' → ' + p.nt, ''));
  CODES.types.forEach(t => add('codes', '', 'Types & shadows', '--c-codes', t.name, t.refs, t.body));
  CODES.feasts.forEach(f => add('codes', '', 'The feasts', '--c-codes', f.name, f.when, f.body));
  CODES.loose.forEach(l => add('codes', '', 'Hold loosely', '--c-codes', l.name, '', l.body));
  TRIUNE.anchors.forEach(a => add('triune', '', 'Threefold Witness', '--c-triune', a.name, a.refs.join(' · '), a.father + ' ' + a.son + ' ' + a.spirit));
  TRIUNE.patterns.forEach(p => add('triune', '', 'Story echoes', '--c-triune', p.name, p.refs.join(' · '), p.story + ' ' + p.reading));
  WALKING.pillars.forEach(p => add('walking', '', 'Walk It Out', '--c-walk', p.name, p.truth, p.lie + ' ' + p.body));
  DETOURS.items.forEach((d, i) => add('detours', 'd-' + i, 'Detours', '--c-detour', d.name, '', d.pull + ' ' + d.cost + ' ' + d.home));
  MIND.blocks.forEach(b => add('mind', '', 'Mind & Body', '--c-mind', b.name, '', b.body));
  LIBRARY.shelves.forEach(s => s.items.forEach(i => add('library', '', 'Library', '--c-library', i.title, i.by, i.note)));
}

function runSearch(q) {
  q = q.trim().toLowerCase();
  const box = document.getElementById('search-results');
  if (q.length < 2) { box.classList.remove('open'); box.innerHTML = ''; return; }
  const scored = INDEX.map(e => {
    let s = 0;
    if (e.title.toLowerCase().includes(q)) s += 10;
    if (e.sub.toLowerCase().includes(q)) s += 4;
    if (e.hay.includes(q)) s += 2;
    return [s, e];
  }).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]).slice(0, 10);
  if (!scored.length) {
    box.innerHTML = '<div class="search-empty">Nothing on the map for “' + q.replace(/</g, '&lt;') + '” — try a thread, name, or verse word.</div>';
    box.classList.add('open'); return;
  }
  box.innerHTML = scored.map(([s, e], i) =>
    '<button class="search-hit" data-i="' + INDEX.indexOf(e) + '" style="--c:var(' + e.cvar + ')">' +
    '<span class="hit-where">' + e.where + '</span>' +
    '<div class="hit-title">' + e.title + '</div>' +
    (e.sub ? '<div class="hit-sub">' + e.sub + '</div>' : '') + '</button>').join('');
  box.classList.add('open');
}

function goToHit(e) {
  const box = document.getElementById('search-results');
  const input = document.getElementById('search-input');
  if (box) box.classList.remove('open');
  if (input) input.value = '';
  
  if (e.view === 'threads' && e.anchor) {
    const cardId = e.anchor;
    const card = document.getElementById(cardId);
    if (card) {
      card.classList.add('open');
      const headBtn = card.querySelector('[data-toggle]');
      if (headBtn) headBtn.setAttribute('aria-expanded', 'true');
    }
  }

  const targetId = e.anchor || e.view;
  const el = document.getElementById(targetId);
  if (el) {
    isScrollingNav = true;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('flash');
    setTimeout(() => {
      el.classList.remove('flash');
      isScrollingNav = false;
    }, 2200);
    history.replaceState(null, null, '#/' + e.view);
    updateActiveNav(e.view);
  }
}

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
  document.querySelectorAll('.nav-link').forEach(a => {
    const active = a.dataset.view === id;
    a.classList.toggle('active', active);
  });
}

let previewResetTimer = null;
function queuePreviewReset() {
  if (previewResetTimer) clearTimeout(previewResetTimer);
}
function cancelPreviewReset() {
  if (previewResetTimer) clearTimeout(previewResetTimer);
}

function buildThreadPreviewContent(t) {
  const shortWay = t.way.slice(0, 3).map(w => 
    '<li><b>' + w.ref + ':</b> ' + w.note + '</li>'
  ).join('');

  return (
    '<div class="preview-content" style="--c: var(' + t.cvar + ')">' +
    '  <div class="preview-header">' +
    '    <span class="preview-icon">' + icon(t.icon) + '</span>' +
    '    <h3>' + t.name + '</h3>' +
    '  </div>' +
    '  <p class="preview-tag">' + t.tag + '</p>' +
    '  <div class="preview-body">' +
    '    <h4>Journey Milestones:</h4>' +
    '    <ul>' + shortWay + '</ul>' +
    '    <div class="preview-lands">' +
    '      <strong>Where it lands</strong>' +
    '      <p>' + t.landsOn + '</p>' +
    '    </div>' +
    '  </div>' +
    '</div>'
  );
}

let activePreviewThreadId = null;
let previewMeasureTimer = null;

function measureThreadPreviewHeight() {
  const previewEl = document.getElementById('thread-preview');
  if (!previewEl) return;

  const covenant = THREADS.find(x => x.id === 'covenant') || THREADS[0];
  const rect = previewEl.getBoundingClientRect();
  if (!rect.width) return;

  const clone = previewEl.cloneNode(false);
  clone.removeAttribute('id');
  clone.style.position = 'absolute';
  clone.style.visibility = 'hidden';
  clone.style.pointerEvents = 'none';
  clone.style.left = '-9999px';
  clone.style.top = '0';
  clone.style.width = rect.width + 'px';
  clone.style.height = 'auto';
  clone.style.minHeight = '0';
  clone.innerHTML = buildThreadPreviewContent(covenant);
  document.body.appendChild(clone);

  const lockedHeight = Math.ceil(clone.scrollHeight);
  clone.remove();
  previewEl.style.setProperty('--thread-preview-lock-height', Math.max(lockedHeight, 420) + 'px');
}

function scheduleThreadPreviewMeasure() {
  if (previewMeasureTimer) clearTimeout(previewMeasureTimer);
  previewMeasureTimer = setTimeout(measureThreadPreviewHeight, 80);
}

function updateThreadPreview(threadId) {
  if (activePreviewThreadId === threadId) return;

  const t = THREADS.find(x => x.id === threadId);
  if (!t) return;

  const previewEl = document.getElementById('thread-preview');
  if (!previewEl) return;

  previewEl.innerHTML = buildThreadPreviewContent(t);
  activePreviewThreadId = threadId;
}

function resetThreadPreview() {
  const previewEl = document.getElementById('thread-preview');
  if (!previewEl) return;
  activePreviewThreadId = null;
  previewEl.innerHTML = 
    '  <div class="preview-placeholder">' +
    '    <svg class="preview-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>' +
    '    <h3>The Story Map</h3>' +
    '    <p>Hover over any thread path on the chart or select a legend chip to trace its journey from Genesis to Revelation.</p>' +
    '  </div>';
}

function wireAllSections() {
  // Wire thread card accordions
  document.querySelectorAll('[data-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.thread-card');
      const open = card.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  });

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
    const pathEl = () => document.querySelector('.hero-thread[data-thread="' + threadId + '"]');

    const showPreview = () => {
      cancelPreviewReset();
      chip.classList.add('hot');
      const p = pathEl();
      if (p) {
        p.classList.add('hot');
      }
      updateThreadPreview(threadId);
    };

    const clearPreviewHotState = () => {
      chip.classList.remove('hot');
      const p = pathEl();
      if (p) p.classList.remove('hot');
      queuePreviewReset();
    };

    chip.addEventListener('mouseenter', showPreview);
    chip.addEventListener('pointerenter', showPreview);
    chip.addEventListener('focus', showPreview);

    chip.addEventListener('mouseleave', clearPreviewHotState);
    chip.addEventListener('pointerleave', clearPreviewHotState);
    chip.addEventListener('blur', clearPreviewHotState);

    chip.addEventListener('click', () => {
      showPreview();
      const card = document.getElementById('t-' + threadId);
      if (card) {
        card.classList.add('open');
        const headBtn = card.querySelector('[data-toggle]');
        if (headBtn) headBtn.setAttribute('aria-expanded', 'true');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('flash');
        setTimeout(() => card.classList.remove('flash'), 2200);
      }
    });
  });

  // Wire hero thread paths hover and click (using thicker trigger overlay)
  document.querySelectorAll('.hero-thread-trigger').forEach(trigger => {
    const threadId = trigger.dataset.thread;
    const path = document.querySelector('.hero-thread[data-thread="' + threadId + '"]');
    const chipEl = () => document.querySelector('.legend-chip[data-thread="' + threadId + '"]');

    const showPreview = () => {
      cancelPreviewReset();
      if (path) path.classList.add('hot');
      const c = chipEl();
      if (c) c.classList.add('hot');
      updateThreadPreview(threadId);
    };

    const clearPreviewHotState = () => {
      if (path) path.classList.remove('hot');
      const c = chipEl();
      if (c) c.classList.remove('hot');
      queuePreviewReset();
    };

    trigger.addEventListener('mouseenter', showPreview);
    trigger.addEventListener('pointerenter', showPreview);

    trigger.addEventListener('mouseleave', clearPreviewHotState);
    trigger.addEventListener('pointerleave', clearPreviewHotState);

    trigger.addEventListener('click', () => {
      showPreview();
      const card = document.getElementById('t-' + threadId);
      if (card) {
        card.classList.add('open');
        const headBtn = card.querySelector('[data-toggle]');
        if (headBtn) headBtn.setAttribute('aria-expanded', 'true');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('flash');
        setTimeout(() => card.classList.remove('flash'), 2200);
      }
    });
  });

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

/* ================= hover scripture tooltips & local TPT cache ================= */
const TPT_CACHE = {
  'John 3:16': '“For this is how God loved the world: He gave his unique, One and Only Son as a gift. So now everyone who believes in him will never perish, but experience everlasting life.”',
  'John 1:29': '“Look! There is the Lamb of God who takes away the sin of the world!”',
  'Rom 8:1': '“So now the case is closed. There remains no accusing verdict of condemnation against those who are in union with Jesus, the Anointed One.”',
  '1 Cor 5:7': '“For Messiah, our Passover Lamb, has been sacrificed for us!”',
  'John 6:35': '“I am the Bread of Life. Come to me and you will never be hungry. Believe in me and you will never be thirsty.”',
  '1 Cor 10:4': '“...for they drank from the spiritual Rock that traveled with them, and that Rock was Christ.”',
  'John 1:1': '“In the very beginning the Living Expression was already there. And the Living Expression was with God, yet he was fully God.”',
  'Heb 12:24': '“...and to Jesus, the mediator of a new covenant, and to the sprinkled blood, which speaks a better word than the blood of Abel.”',
  'Gen 1:1': '“In the beginning, God created the heavens and the earth.”',
  'Gal 3:16': '“Now the promises were spoken to Abraham and to his seed... which is Christ.”'
};

const chapterCache = {};
let tooltipEl = null;
let tooltipTimer = null;

function parseReference(refStr) {
  const clean = refStr.replace(/–/g, '-').trim();
  const match = clean.match(/^([123]\s)?([A-Za-z]+)\s(\d+)(?::(\d+)(?:[-](\d+))?)?/);
  if (!match) return null;

  const numPrefix = match[1] ? match[1].trim() : '';
  const name = match[2];
  const chapter = parseInt(match[3], 10);
  const verseStart = match[4] ? parseInt(match[4], 10) : null;
  const verseEnd = match[5] ? parseInt(match[5], 10) : null;

  const baseMap = {
    'Gen': 1, 'Ex': 2, 'Lev': 3, 'Num': 4, 'Deut': 5, 'Josh': 6, 'Judg': 7, 'Ruth': 8,
    'Sam': 9, 'Kings': 11, 'Chr': 13, 'Ezra': 15, 'Neh': 16, 'Esth': 17, 'Job': 18,
    'Ps': 19, 'Prov': 20, 'Eccl': 21, 'Song': 22, 'Isa': 23, 'Jer': 24, 'Lam': 25,
    'Ezek': 26, 'Dan': 27, 'Hos': 28, 'Joel': 29, 'Amos': 30, 'Obadiah': 31, 'Jonah': 32,
    'Mic': 33, 'Micah': 33, 'Nah': 34, 'Hab': 35, 'Zeph': 36, 'Hag': 37, 'Zech': 38, 'Mal': 39,
    'Matt': 40, 'Mark': 41, 'Luke': 42, 'John': 43, 'Acts': 44, 'Rom': 45, 'Cor': 46,
    'Gal': 48, 'Eph': 49, 'Phil': 50, 'Col': 51, 'Thess': 52, 'Tim': 54, 'Titus': 56,
    'Philemon': 57, 'Heb': 58, 'Jas': 59, 'James': 59, 'Pet': 60, 'Jude': 65, 'Rev': 66
  };

  let bookId = baseMap[name];
  if (!bookId) return null;

  if (numPrefix) {
    const num = parseInt(numPrefix, 10);
    if (name === 'Sam' && num === 2) bookId = 10;
    else if (name === 'Kings' && num === 2) bookId = 12;
    else if (name === 'Chr' && num === 2) bookId = 14;
    else if (name === 'Cor' && num === 2) bookId = 47;
    else if (name === 'Thess' && num === 2) bookId = 53;
    else if (name === 'Tim' && num === 2) bookId = 55;
    else if (name === 'Pet' && num === 2) bookId = 61;
    else if (name === 'John') {
      if (num === 2) bookId = 63;
      else if (num === 3) bookId = 64;
    }
  }

  return { bookId, chapter, verseStart, verseEnd };
}

async function loadVerseText(ref, version) {
  if (version === 'TPT') {
    const matched = Object.keys(TPT_CACHE).find(k => ref.toLowerCase().includes(k.toLowerCase()));
    if (matched) {
      return TPT_CACHE[matched] + '<span class="tooltip-note">The Passion Translation (TPT)</span>';
    } else {
      const nltText = await fetchFromBolls(ref, 'NLT');
      return nltText + '<span class="tooltip-note">TPT text copyrighted. Showing NLT fallback. <a href="https://www.biblegateway.com/passage/?search=' + encodeURIComponent(ref) + '&version=TPT" target="_blank" rel="noopener">Read TPT on BibleGateway ↗</a></span>';
    }
  }
  return fetchFromBolls(ref, version);
}

async function fetchFromBolls(ref, version) {
  const parsed = parseReference(ref);
  if (!parsed) return 'Reference not recognized.';

  const { bookId, chapter, verseStart, verseEnd } = parsed;
  const cacheKey = `${version}-${bookId}-${chapter}`;

  if (!chapterCache[cacheKey]) {
    const url = 'https://bolls.life/get-text/' + version + '/' + bookId + '/' + chapter + '/';
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      chapterCache[cacheKey] = data;
    } catch (e) {
      return 'Could not retrieve scripture text.';
    }
  }

  const verses = chapterCache[cacheKey];
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
    return v.text.replace(/<[^>]+>/g, '').trim();
  }).join(' ');
}



function initTooltip() {
  tooltipEl = document.createElement('div');
  tooltipEl.className = 'verse-tooltip';
  document.body.appendChild(tooltipEl);

  document.body.addEventListener('mouseover', ev => {
    const link = ev.target.closest('.ref-link');
    if (!link) return;
    const ref = link.dataset.ref || link.textContent;
    if (!ref) return;
    showTooltip(link, ref);
  });

  document.body.addEventListener('mouseout', ev => {
    const link = ev.target.closest('.ref-link');
    if (!link) return;
    hideTooltip();
  });
}

function showTooltip(link, ref) {
  if (tooltipTimer) clearTimeout(tooltipTimer);
  const version = document.getElementById('version-select').value;
  
  const rect = link.getBoundingClientRect();
  const scrollY = window.scrollY || window.pageYOffset;
  const scrollX = window.scrollX || window.pageXOffset;
  
  // Initial positioning (loading state)
  const tooltipHeight = 130;
  if (rect.top - tooltipHeight > 20) {
    tooltipEl.style.top = (scrollY + rect.top - tooltipHeight - 8) + 'px';
  } else {
    tooltipEl.style.top = (scrollY + rect.bottom + 8) + 'px';
  }
  const initialLeft = Math.min(scrollX + window.innerWidth - 360, Math.max(scrollX + 20, scrollX + rect.left));
  tooltipEl.style.left = initialLeft + 'px';

  tooltipEl.innerHTML = '<span class="tooltip-ref">' + ref + ' (' + version + ')</span><div class="tooltip-text">Loading verse...</div>';
  tooltipEl.classList.add('open');

  loadVerseText(ref, version).then(text => {
    const txtBox = tooltipEl.querySelector('.tooltip-text');
    if (txtBox) txtBox.innerHTML = text;
    
    // Reposition based on actual height
    const actualHeight = tooltipEl.offsetHeight;
    if (rect.top - actualHeight > 20) {
      tooltipEl.style.top = (scrollY + rect.top - actualHeight - 8) + 'px';
    } else {
      tooltipEl.style.top = (scrollY + rect.bottom + 8) + 'px';
    }
    
    const finalLeft = Math.min(scrollX + window.innerWidth - tooltipEl.offsetWidth - 20, Math.max(scrollX + 20, scrollX + rect.left));
    tooltipEl.style.left = finalLeft + 'px';
  }).catch(err => {
    const txtBox = tooltipEl.querySelector('.tooltip-text');
    if (txtBox) txtBox.innerHTML = '<span style="color:var(--thread)">Unable to load verse.</span>';
  });
}

function hideTooltip() {
  tooltipTimer = setTimeout(() => {
    tooltipEl.classList.remove('open');
  }, 200);
}

function renderSections() {
  const container = document.getElementById('view');
  let html = '';
  NAV.forEach(n => {
    const fn = VIEWS[n.id];
    if (fn) html += '<section id="' + n.id + '" class="section-block">' + fn() + '</section>';
  });
  container.innerHTML = html;
  measureThreadPreviewHeight();
  wireAllSections();
  initMarquees();
  layoutRail();
}

/* ================= filmstrip marquees (threads) ================= */
function initMarquees() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-marquee]').forEach(mq => {
    const track = mq.querySelector('.marquee-track');
    if (!track) return;
    if (!track.dataset.orig) track.dataset.orig = track.innerHTML;
    track.innerHTML = track.dataset.orig;
    mq.classList.remove('scrolling');
    track.style.removeProperty('--dur');
    if (reduced) return; // falls back to manual horizontal scroll via CSS
    const w = track.scrollWidth;
    if (w > mq.clientWidth + 4) {
      track.innerHTML = track.dataset.orig + track.dataset.orig; // seamless loop
      track.style.setProperty('--dur', Math.max(30, Math.round(w / 30)) + 's');
      mq.classList.add('scrolling');
    }
  });
}
let marqueeResizeTimer = null;
window.addEventListener('resize', () => {
  if (marqueeResizeTimer) clearTimeout(marqueeResizeTimer);
  marqueeResizeTimer = setTimeout(initMarquees, 150);
});

/* ================= scarlet progress rail ================= */
function initRail() {
  if (document.getElementById('rail')) return;
  const rail = document.createElement('div');
  rail.id = 'rail';
  rail.innerHTML = '<div class="rail-track"></div><div class="rail-fill"></div>' +
    NAV.map(n => '<button class="rail-dot" data-view="' + n.id + '" title="' + n.label + '" aria-label="Jump to ' + n.label + '" style="--c:var(' + n.cvar + ')"></button>').join('');
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

function applyEdition(ed) {
  TEXT_EDITION = (ed === 'orig') ? 'orig' : 'updated';
  localStorage.setItem('thread-edition', TEXT_EDITION);
  const y = window.scrollY;
  renderSections();
  window.scrollTo(0, y);
  setupScrollspy();
  document.querySelectorAll('.edition-btn').forEach(b => b.classList.toggle('active', b.dataset.ed === TEXT_EDITION));
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
        history.replaceState(null, null, '#/' + id);
        updateActiveNav(id);
        setTimeout(() => { isScrollingNav = false; }, 800);
      }
    });
  });

  const root = document.documentElement;
  const saved = localStorage.getItem('thread-theme');
  if (saved) root.dataset.theme = saved;
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.dataset.theme = dark ? 'light' : 'dark';
    localStorage.setItem('thread-theme', root.dataset.theme);
  });

  const select = document.getElementById('version-select');
  const savedVer = localStorage.getItem('thread-version');
  if (savedVer) select.value = savedVer;
  select.addEventListener('change', () => {
    localStorage.setItem('thread-version', select.value);
  });

  // text edition toggle (original vs updated wording) — restore before first render
  if (localStorage.getItem('thread-edition') === 'orig') TEXT_EDITION = 'orig';
  document.querySelectorAll('.edition-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.ed === TEXT_EDITION);
    btn.addEventListener('click', () => applyEdition(btn.dataset.ed));
  });

  // Render all sections (edition-aware) on the single page
  initRail();
  renderSections();

  buildIndex();
  const input = document.getElementById('search-input');
  const box = document.getElementById('search-results');
  if (input && box) {
    input.addEventListener('input', () => runSearch(input.value));
    input.addEventListener('focus', () => runSearch(input.value));
    document.addEventListener('click', ev => {
      const hit = ev.target.closest('.search-hit');
      if (hit) { goToHit(INDEX[+hit.dataset.i]); return; }
      if (!ev.target.closest('.searchbox')) box.classList.remove('open');
    });
    input.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') { box.classList.remove('open'); input.blur(); }
      if (ev.key === 'Enter') { const first = box.querySelector('.search-hit'); if (first) goToHit(INDEX[+first.dataset.i]); }
    });
  }

  // Wire events, then handle the initial route before enabling scrollspy.
  initTooltip();

  window.addEventListener('hashchange', route);
  window.addEventListener('resize', scheduleThreadPreviewMeasure);
  if (location.hash) {
    route({ instant: true });
    setupScrollspy();
  } else {
    updateActiveNav('start');
    setupScrollspy();
  }
}

boot();
