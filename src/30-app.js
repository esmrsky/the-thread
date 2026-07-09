/* ================= app: helpers ================= */
const BG = 'https://www.biblegateway.com/passage/?search=';
const REF_RE = /((?:[123]\s)?(?:Gen|Ex|Lev|Num|Deut|Josh|Judg|Ruth|Sam|Kings|Chr|Ezra|Neh|Esth|Job|Ps|Prov|Eccl|Song|Isa|Jer|Lam|Ezek|Dan|Hos|Joel|Amos|Jonah|Mic|Micah|Nah|Hab|Zeph|Hag|Zech|Mal|Matt|Mark|Luke|John|Acts|Rom|Cor|Gal|Eph|Phil|Col|Thess|Tim|Titus|Heb|Jas|James|Pet|Jude|Rev)\s\d+(?::\d+(?:[-–]\d+(?::\d+)?)?(?:,\s?\d+(?:[-–]\d+)?)*)?)/g;

function refLink(r) {
  return '<a class="ref-link" target="_blank" rel="noopener" href="' + BG + encodeURIComponent(r) + '" data-ref="' + r + '">' + r + '</a>';
}
function linkRefs(html) { return html.replace(REF_RE, (m) => refLink(m)); }
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
  { id: 'threads', label: 'Threads', icon: 'thread', cvar: '--c-threads', blurb: 'Twelve routes traced Genesis to Revelation — every one lands on Jesus.' },
  { id: 'codes', label: 'The Codes', icon: 'key', cvar: '--c-codes', blurb: 'Prophecies, types & shadows, and the feasts — with honesty badges on every claim.' },
  { id: 'triune', label: 'Threefold Witness', icon: 'trinity', cvar: '--c-triune', blurb: 'Father, Son, and Spirit shown plainly — and echoed through the story patterns.' },
  { id: 'walking', label: 'Walk It Out', icon: 'walk', cvar: '--c-walk', blurb: 'Identity, righteousness, rest, healing — new-covenant life without the old software.' },
  { id: 'detours', label: 'Detours', icon: 'fork', cvar: '--c-detour', blurb: 'Twelve sincere wrong turns, marked on the map — each with the on-ramp back.' },
  { id: 'mind', label: 'Mind & Body', icon: 'brain', cvar: '--c-mind', blurb: 'Where scripture and neuroscience shake hands: emotions, meditation, sound, hearing God.' },
  { id: 'library', label: 'Library', icon: 'book', cvar: '--c-library', blurb: 'The curated pack: books, videos, podcasts — with discernment notes included.' }
];

/* ================= hero thread chart ================= */
function buildHeroChart() {
  const picks = ['lamb', 'bread', 'water', 'light', 'shepherd', 'king', 'temple', 'rest', 'covenant', 'bride', 'exile', 'name'];
  const ths = picks.map(id => THREADS.find(t => t.id === id));
  const X0 = 34, CX = 528, CY = 152, XE = 706;
  const n = ths.length, top = 44, bot = 258;
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
    ticks += '<line x1="' + x + '" y1="276" x2="' + x + '" y2="282" stroke="var(--line)" stroke-width="1.5"/>' +
      '<text x="' + x + '" y="294" text-anchor="middle" font-size="8.5" letter-spacing="1.5" fill="var(--ink-faint)" style="font-family:var(--font-label);font-weight:600">' + l + '</text>';
  });
  return '<svg viewBox="0 0 720 300" role="img" aria-label="Twelve biblical themes converging on Jesus and continuing to Revelation">' +
    paths +
    '<path d="M' + CX + ' ' + CY + ' H' + XE + '" stroke="var(--gold)" stroke-width="4" stroke-linecap="round" opacity="0.9"/>' +
    '<path d="M' + CX + ' ' + CY + ' H' + XE + '" stroke="var(--gold)" stroke-width="10" stroke-linecap="round" opacity="0.14"/>' +
    '<circle cx="' + CX + '" cy="' + CY + '" r="5.5" fill="var(--gold)"/>' +
    '<path d="M' + CX + ' 116 v-26 M' + (CX - 9) + ' 99 h18" stroke="var(--gold)" stroke-width="3" stroke-linecap="round"/>' +
    '<line x1="' + CX + '" y1="122" x2="' + CX + '" y2="146" stroke="var(--gold)" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.8"/>' +
    '<text x="' + CX + '" y="80" text-anchor="middle" font-size="10" letter-spacing="2.5" fill="var(--gold)" style="font-family:var(--font-label);font-weight:700">JESUS</text>' +
    ticks +
    '</svg>';
}

/* ================= journey chart (pattern) ================= */
function buildJourneySVG() {
  const zone = (x, w, c, o) => '<rect x="' + x + '" y="26" width="' + w + '" height="192" fill="var(' + c + ')" opacity="' + o + '"/>';
  const water = (x, name) =>
    '<rect x="' + x + '" y="26" width="15" height="192" fill="var(--t-water)" opacity="0.3"/>' +
    '<text x="' + (x + 10) + '" y="122" font-size="8" letter-spacing="1.8" fill="var(--t-water)" transform="rotate(-90 ' + (x + 10) + ' 122)" text-anchor="middle" style="font-family:var(--font-label);font-weight:700">' + name + '</text>';
  const wp = (x, y, line1, line2, dy, align, dx) => {
    const tx = x + (dx || 0);
    const ty = y + (dy || -12);
    const ta = align || 'middle';
    return '<circle cx="' + x + '" cy="' + y + '" r="4.5" fill="var(--card)" stroke="var(--thread)" stroke-width="2.5"/>' +
      '<text x="' + tx + '" y="' + ty + '" text-anchor="' + ta + '" font-size="8.5" letter-spacing="1.2" fill="var(--ink-soft)" style="font-family:var(--font-label);font-weight:700">' + line1 +
      (line2 ? '<tspan x="' + tx + '" dy="10">' + line2 + '</tspan>' : '') + '</text>';
  };
  const zlabel = (x, l, c) => '<text x="' + x + '" y="238" text-anchor="middle" font-size="9.5" letter-spacing="2" fill="var(' + c + ')" style="font-family:var(--font-label);font-weight:700">' + l + '</text>';
  const route = 'M14 196 H160 L196 190 C230 184 238 160 256 148 L300 172 L348 166 ' +
    'a21 21 0 1 1 14 5 ' +
    'L470 152 L516 140 L552 124 L610 112 C660 102 690 96 730 88';
  return '<svg viewBox="0 0 760 250" role="img" aria-label="The journey from Egypt through the wilderness into the promised land">' +
    zone(0, 180, '--s-egypt', 0.12) + zone(195, 325, '--s-desert', 0.1) + zone(535, 225, '--s-land', 0.12) +
    water(180, 'RED SEA') + water(520, 'JORDAN') +
    '<path class="journey-route-path" d="' + route + '" fill="none" stroke="var(--thread)" stroke-width="2.4" stroke-linecap="round"/>' +
    '<path d="M244 148 l12 -18 12 18z" fill="none" stroke="var(--s-desert)" stroke-width="1.8" stroke-linejoin="round"/>' +
    wp(160, 196, 'GOSHEN', '', 16, 'end', -8) +
    wp(256, 148, 'SINAI', 'IDENTITY SPOKEN', -14, 'start', 10) +
    wp(348, 166, 'KADESH · THE CHOICE', '', 22, 'middle') +
    '<text x="376" y="204" text-anchor="middle" font-size="8" letter-spacing="1.4" fill="var(--s-desert)" style="font-family:var(--font-label);font-weight:700">40 YEARS</text>' +
    wp(552, 124, 'JERICHO', '', -4, 'start', 10) +
    wp(730, 88, 'FRUITFULNESS', '', -10, 'end', -8) +
    zlabel(90, 'EGYPT · BONDAGE', '--s-egypt') + zlabel(357, 'WILDERNESS · FORMATION', '--s-desert') + zlabel(647, 'THE LAND · INHERITANCE', '--s-land') +
    '</svg>';
}

function buildTabernacleSVG() {
  const path = 'M50 90 L160 90 L270 90 L420 60 L420 120 L540 90 L610 90 L680 90';
  const nodes = [
    { x: 50, y: 90, label: '1', name: 'The Gate' },
    { x: 160, y: 90, label: '2', name: 'Bronze Altar' },
    { x: 270, y: 90, label: '3', name: 'The Laver' },
    { x: 420, y: 60, label: '4', name: 'Table of Bread' },
    { x: 420, y: 120, label: '5', name: 'The Lampstand' },
    { x: 540, y: 90, label: '6', name: 'Altar of Incense' },
    { x: 610, y: 90, label: '7', name: 'The Veil' },
    { x: 680, y: 90, label: '8', name: 'Mercy Seat' }
  ];

  const nodeElements = nodes.map((n, i) => {
    const isHolyOfHolies = i >= 6;
    const isHolyPlace = i >= 3 && i < 6;
    const themeColor = isHolyOfHolies ? 'var(--c-codes)' : (isHolyPlace ? 'var(--s-egypt)' : 'var(--s-desert)');
    return '<g class="svg-station-node" data-index="' + i + '" style="--zone-c:' + themeColor + '">' +
      '<circle cx="' + n.x + '" cy="' + n.y + '" r="10" fill="var(--card)" stroke="' + themeColor + '" stroke-width="2"/>' +
      '<text x="' + n.x + '" y="' + (n.y + 3) + '" text-anchor="middle" font-size="8" fill="var(--ink)" style="font-family:var(--font-label);font-weight:700">' + n.label + '</text>' +
      '<text x="' + n.x + '" y="' + (n.y - 15) + '" text-anchor="middle" font-size="7.2" fill="var(--ink-soft)" style="font-family:var(--font-label);font-weight:600;letter-spacing:0.5px">' + n.name.toUpperCase() + '</text>' +
      '</g>';
  }).join('');

  return '<svg class="tabernacle-svg" viewBox="0 0 760 180" role="img" aria-label="Tabernacle Floor Plan Diagram">' +
    // Outer Court Boundary
    '<rect x="15" y="15" width="730" height="150" fill="none" stroke="var(--s-desert)" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.3"/>' +
    '<text x="25" y="30" font-size="7.5" fill="var(--s-desert)" style="font-family:var(--font-label);font-weight:700;letter-spacing:1px">OUTER COURT</text>' +
    
    // Tent of Meeting Boundary
    '<rect x="360" y="28" width="370" height="124" fill="none" stroke="var(--s-egypt)" stroke-width="1.5" opacity="0.4"/>' +
    '<text x="370" y="44" font-size="7.5" fill="var(--s-egypt)" style="font-family:var(--font-label);font-weight:700;letter-spacing:1px">TENT OF MEETING</text>' +
    
    // Holy Place Label
    '<text x="500" y="44" font-size="7" fill="var(--ink-faint)" style="font-family:var(--font-label);font-weight:700;letter-spacing:0.5px">HOLY PLACE</text>' +
    
    // Holy of Holies Veil line and Label
    '<line x1="610" y1="28" x2="610" y2="152" stroke="var(--c-codes)" stroke-width="2" stroke-dasharray="4 4" opacity="0.6"/>' +
    '<text x="615" y="44" font-size="7" fill="var(--c-codes)" style="font-family:var(--font-label);font-weight:700;letter-spacing:0.5px">VEIL</text>' +
    '<text x="660" y="44" font-size="7" fill="var(--c-codes)" style="font-family:var(--font-label);font-weight:700;letter-spacing:0.5px">HOLY OF HOLIES</text>' +
    
    // Marching Route Line
    '<path class="tabernacle-route" d="' + path + '" fill="none" stroke="var(--thread)" stroke-width="2.2" stroke-linecap="round"/>' +
    
    // Node Markers
    nodeElements +
    
    // Orientation Indicators (East/West)
    '<text x="25" y="154" font-size="7" fill="var(--ink-faint)" style="font-family:var(--font-label);font-weight:700">EAST (ENTRANCE)</text>' +
    '<text x="735" y="154" text-anchor="end" font-size="7" fill="var(--ink-faint)" style="font-family:var(--font-label);font-weight:700">WEST (ARK)</text>' +
    
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
  const tips = START.howTo.tips.map(i => '<div class="idea-row"><span class="idea-num" style="background:color-mix(in srgb, var(--c-walk) 11%, transparent);color:var(--c-walk)"></span><div><b>' + i.t + '</b><p>' + linkRefs(i.x) + '</p></div></div>').join('');
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
    '<div class="big-idea">' + tips + '</div>' +
    '</div>';
}

function vPattern() {
  const n = NAV[1];
  const seasons = PATTERN.seasons.map(s =>
    '<div class="card season-card" style="--c:var(' + s.cvar + ')">' +
    '<h3>' + icon(s.icon) + s.name + '</h3><p class="season-sub">' + s.sub + '</p>' +
    '<div class="season-rows">' + s.rows.map(r => '<div class="row"><b>' + r.k + '</b><span>' + linkRefs(r.v) + '</span></div>').join('') + '</div></div>').join('');
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
    '<div class="chart-panel journey-panel"><div class="journey-scroll">' + buildJourneySVG() + '</div></div>' +
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
  const cards = THREADS.map(t => {
    const way = t.way.map(w =>
      '<li' + (w.j ? ' class="wp-cross"' : '') + '><span class="wp-ref">' + refLink(w.ref) + '</span><div class="wp-note">' + w.note + '</div></li>').join('');
    return '<div class="thread-card" id="t-' + t.id + '" style="--c:var(' + t.cvar + ')">' +
      '<button class="thread-head" data-toggle="' + t.id + '" aria-expanded="false">' +
      '<span class="icon-chip">' + icon(t.icon) + '</span>' +
      '<span><h3>' + t.name + '</h3><span class="thread-tag">' + t.tag + '</span></span>' +
      '<span class="chev">' + icon('chevron') + '</span></button>' +
      '<div class="thread-body"><div class="thread-body-inner"><ul class="trail">' + way + '</ul>' +
      '<div class="lands-on"><span class="label">Where it lands</span>' + linkRefs(t.landsOn) + '</div>' +
      '<p class="for-you">For you: ' + linkRefs(t.forYou) + '</p></div></div></div>';
  }).join('');
  return '<div class="view">' + head(n, 'Twelve threads through the whole book',
    'Pick any of these and follow it Genesis to Revelation — the dots are real verses, the gold waypoint is where the thread lands on Jesus, and the last line is what it means for your actual week. This is the fastest cure for “the Bible feels random.”') +
    '<div class="grid thread-grid">' + cards + '</div></div>';
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
    '<div class="tabpane" data-pane="types" hidden><div class="grid grid-2">' + types + '</div></div>' +
    '<div class="tabpane" data-pane="tabernacle" hidden><p class="lede" style="margin-bottom:20px">' + linkRefs(CODES.tabernacle.intro) + '</p><div class="tabernacle-graphic-container" style="margin-bottom:30px">' + buildTabernacleSVG() + '</div>' + tabernacleLayout + '<p class="note" style="margin-top:20px">Walk it east to west and you’ve just walked the gospel: enter, be covered, be washed, be fed, be lit, pray, pass the torn veil, meet Him at the mercy seat.</p></div>' +
    '<div class="tabpane" data-pane="feasts" hidden><div class="card">' + feasts + '</div><p class="note">' + linkRefs(CODES.feastNote) + '</p></div>' +
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
  const options = {
    root: null,
    rootMargin: '-25% 0px -55% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    if (isScrollingNav) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        updateActiveNav(id);
        history.replaceState(null, null, '#/' + id);
      }
    });
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

function boot() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const NAV_ICONS = { start: 'compass', pattern: 'dune', threads: 'thread', codes: 'key', triune: 'trinity', walking: 'walk', detours: 'fork', mind: 'brain', library: 'book' };
  const nav = document.getElementById('nav');
  nav.innerHTML = NAV.map(n =>
    '<a class="nav-link" data-view="' + n.id + '" href="#/' + n.id + '" style="--c:var(' + n.cvar + ')">' + icon(NAV_ICONS[n.id] || 'cross') + ' ' + n.label + '</a>').join('');

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

  // Render all views sequentially on the page
  const container = document.getElementById('view');
  let html = '';
  NAV.forEach(n => {
    const fn = VIEWS[n.id];
    if (fn) {
      html += '<section id="' + n.id + '" class="section-block">' + fn() + '</section>';
    }
  });
  container.innerHTML = html;
  measureThreadPreviewHeight();

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
  wireAllSections();
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
