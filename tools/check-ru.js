#!/usr/bin/env node
/* Asserts that the Russian sources still mirror the English ones, so an edit to the English
   that is not carried over to src/ru/ fails loudly instead of shipping a Russian page that
   silently disagrees with it.

     node tools/check-ru.js        (build.sh runs it before writing ru/index.html)

   What it checks:
   1. Shape. Every data object in src/ru/2x-data-*.js has exactly the keys of its English twin,
      every array the same length, every enum-like field (id, icon, cvar, badge, kind, url, j, g)
      the same value.
   2. References. Every reference field (ref, refs, ot, nt, the vocabulary `x`, heroVerse.ref)
      points at the same passage once Russian numbering is taken into account, and every
      reference written into the prose of an English string appears in its Russian twin.
      Psalm numbers differ (НРП follows the Septuagint), so each psalm reference has to be in
      PSALMS below: those were checked by reading the verse bolls.life returned, never worked
      out by arithmetic. A new psalm reference in the English fails until someone does the same.
   3. UI strings. Every string 30-app.js passes to TXT()/TXTF() has a Russian entry in UI_RU, the
      Pattern row labels match the keys their icons are looked up by, and every Russian Mind
      panel label maps to the icon its English twin gets. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DATA_FILES = ['21-data-threads.js', '22-data-pattern.js', '23-data-codes.js',
  '24-data-walking.js', '25-data-mind.js', '26-data-triune.js'];
const NAMES = ['THREADS', 'PATTERN', 'CODES', 'TEN_WORDS', 'WALKING', 'DETOURS',
  'NEURO_PRIMER', 'MIND', 'LIBRARY', 'START', 'TRIUNE'];

/* Hebrew/English psalm reference → НРП reference, each one read off bolls.life NRT. */
const PSALMS = {
  '1:2': '1:2', '1:2-3': '1:2-3', '2': '2', '16:10': '15:10', '22': '21', '22:1': '21:2',
  '22:7-8': '21:8-9', '22:16': '21:17', '22:18': '21:19', '23': '22', '23:2': '22:2',
  '23:2-3': '22:2-3', '32:7': '31:7', '34:20': '33:21', '41:9': '40:10', '46:10': '45:11',
  '95:11': '94:11', '103:1-5': '102:1-5', '103:2': '102:2', '105:19': '104:19', '110': '109',
  '110:1': '109:1', '110:4': '109:4', '119:15': '118:15', '127:2': '126:2', '137:1': '136:1'
};
/* Outside the Psalms, the places where НРП's versification differs from the English for a verse
   this site cites. Found by comparing verse counts, KJV against NRT, for every chapter cited
   (Num 13, Josh 5–6, Eccl 4, Dan 3, Jonah 1, 2 Cor 13 differ), then reading each cited verse. */
const OTHER = {
  '4 13:33': '4 13:34',   // Num 13:33 is Чис. 13:34 (НРП follows the Hebrew)
  '6 6:20': '6 6:19',     // Josh 6:20 is Нав. 6:19 (the Hebrew puts Josh 6:1 at 5:16)
  '32 1:17': '32 2:1',    // Jonah 1:17 is Ион. 2:1
  '47 13:14': '47 13:13'  // 2 Cor 13:14 is 2 Кор. 13:13
};

const errors = [];
const fail = msg => errors.push(msg);

function loadData(dir, extra) {
  const src = DATA_FILES.map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n') +
    '\n;({' + NAMES.join(',') + '})';
  return vm.runInNewContext(src, extra || {});
}

const app = fs.readFileSync(path.join(SRC, '30-app.js'), 'utf8');
const booksSrc = app.slice(app.indexOf('const BOOKS = ['), app.indexOf('];', app.indexOf('const BOOKS = [')) + 2);
const BOOKS = vm.runInNewContext(booksSrc + '\nBOOKS');

function refTools(ru) {
  const byName = {};
  BOOKS.forEach(b => (ru ? b.ruNames : b.names).forEach(n => {
    (byName[n] = byName[n] || {})[(ru ? b.ruN || b.n : b.n) || 0] = b.id;
  }));
  const num = ru ? '[1234]' : '[123]';
  const word = ru ? '[A-Za-z\\u0400-\\u04FF]+\\.?' : '[A-Za-z]+';
  const pattern = Object.keys(byName).sort((a, b) => b.length - a.length).map(n => n.replace(/\./g, '\\.')).join('|');
  const re = new RegExp((ru ? '(?<![A-Za-z\\u0400-\\u04FF])' : '\\b') + '((?:' + num + '\\s)?(?:' + pattern +
    ')\\s\\d+(?::\\d+(?:[-–]\\d+(?::\\d+)?)?(?:,\\s?\\d+(?:[-–]\\d+)?)*)?)', 'g');
  /* the same expansion 30-app.js does: "Rev 19:8; 7:14" and "Ps 22:1,7-8,16" become single refs */
  function split(refs) {
    const out = [];
    let last = '';
    String(refs).split(/\s*;\s*/).filter(Boolean).forEach(part => {
      const book = part.match(new RegExp('^((?:' + num + '\\s)?' + word + ')\\s+\\d'));
      if (book) last = book[1];
      else if (last && /^\d/.test(part)) part = last + ' ' + part;
      const cg = part.match(new RegExp('^((?:' + num + '\\s)?' + word + ')\\s+(\\d+):(.+,.+)$'));
      if (cg) cg[3].split(/\s*,\s*/).forEach(v => out.push(cg[1] + ' ' + cg[2] + ':' + v));
      else out.push(part);
    });
    return out;
  }
  function parse(r) {
    const m = String(r).replace(/–/g, '-').trim().match(new RegExp('^(' + num + '\\s)?(' + word + ')\\s(\\d+(?::\\d+(?:-\\d+(?::\\d+)?)?)?)\\s*$'));
    if (!m) return null;
    const slot = byName[m[2]];
    if (!slot) return null;
    const n = m[1] ? parseInt(m[1], 10) : 0;
    const id = slot[n] !== undefined ? slot[n] : slot[0] !== undefined ? slot[0] : slot[1];
    return id ? { id, cv: m[3] } : null;
  }
  /* every single reference written in a string, the way linkRefs would link it */
  function inProse(s) {
    const out = [];
    for (const m of String(s).matchAll(re)) split(m[1]).forEach(x => out.push(x));
    return out;
  }
  return { split, parse, inProse };
}
const EN = refTools(false), RUREF = refTools(true);

function enToRu(ref, where) {
  const p = EN.parse(ref);
  if (!p) { fail(where + ': English reference not understood: ' + ref); return null; }
  if (p.id === 19) {
    if (!(p.cv in PSALMS)) { fail(where + ': psalm reference not verified against НРП, add it to PSALMS after reading the verse on bolls.life: ' + ref); return null; }
    return '19 ' + PSALMS[p.cv];
  }
  const key = p.id + ' ' + p.cv;
  return OTHER[key] || key;
}
function ruKey(ref, where) {
  const p = RUREF.parse(ref);
  if (!p) { fail(where + ': Russian reference not understood: ' + ref); return null; }
  return p.id + ' ' + p.cv;
}

function compareRefField(en, ru, where) {
  const e = EN.split(en), r = RUREF.split(ru);
  if (e.length !== r.length) { fail(where + ': ' + e.length + ' references in English, ' + r.length + ' in Russian (' + en + ' / ' + ru + ')'); return; }
  e.forEach((x, i) => {
    const want = enToRu(x, where), got = ruKey(r[i], where);
    if (want && got && want !== got) fail(where + ': ' + x + ' should be ' + want + ', Russian has ' + r[i] + ' (' + got + ')');
  });
}

function compareProse(en, ru, where) {
  const want = EN.inProse(en).map(x => enToRu(x, where)).filter(Boolean).sort();
  const got = RUREF.inProse(ru).map(x => ruKey(x, where)).filter(Boolean).sort();
  const missing = want.filter(x => { const i = got.indexOf(x); if (i < 0) return true; got.splice(i, 1); return false; });
  if (missing.length) fail(where + ': references in the English prose missing from the Russian: ' + missing.join(', '));
  if (got.length) fail(where + ': references in the Russian prose that the English does not have: ' + got.join(', '));
}

const SAME = new Set(['id', 'icon', 'cvar', 'badge', 'kind', 'url', 'j', 'g', 'cls']);
const REFKEYS = new Set(['ref', 'refs', 'ot', 'nt']);

function walk(en, ru, where, key, parentKey) {
  if (Array.isArray(en)) {
    if (!Array.isArray(ru)) return fail(where + ': array in English, ' + typeof ru + ' in Russian');
    if (en.length !== ru.length) return fail(where + ': ' + en.length + ' items in English, ' + ru.length + ' in Russian');
    if (REFKEYS.has(key)) return en.forEach((x, i) => compareRefField(x, ru[i], where + '[' + i + ']'));
    return en.forEach((x, i) => walk(x, ru[i], where + '[' + i + ']', key, parentKey));
  }
  if (en && typeof en === 'object') {
    if (!ru || typeof ru !== 'object' || Array.isArray(ru)) return fail(where + ': object in English, not in Russian');
    const ek = Object.keys(en).join(','), rk = Object.keys(ru).join(',');
    if (ek !== rk) return fail(where + ': keys differ (' + ek + ' / ' + rk + ')');
    return Object.keys(en).forEach(k => walk(en[k], ru[k], where + '.' + k, k, key));
  }
  if (typeof en !== typeof ru) return fail(where + ': ' + typeof en + ' in English, ' + typeof ru + ' in Russian');
  if (typeof en !== 'string') { if (en !== ru) fail(where + ': ' + en + ' / ' + ru); return; }
  if (SAME.has(key)) { if (en !== ru) fail(where + ': must stay "' + en + '", Russian has "' + ru + '"'); return; }
  /* the vocabulary card's `x` and the types' `refs` are reference lines, not prose */
  if (REFKEYS.has(key) || (key === 'x' && parentKey === 'typesVocab')) {
    if (key === 'refs' && parentKey === 'types') return compareProse(en, ru, where);
    return compareRefField(en, ru, where);
  }
  if (!ru.trim() && en.trim()) return fail(where + ': empty in Russian');
  compareProse(en, ru, where);
}

const en = loadData(SRC);
const ruData = loadData(path.join(SRC, 'ru'));
NAMES.forEach(n => walk(en[n], ruData[n], n, n, null));

/* ---------- UI strings ---------- */
const UI_RU = vm.runInNewContext(fs.readFileSync(path.join(SRC, 'ru', '29-ui.js'), 'utf8') + '\n;UI_RU');
const used = new Set();
for (const m of app.matchAll(/\bTXTF?\(\s*'((?:[^'\\]|\\.)*)'/g)) used.add(vm.runInNewContext("'" + m[1] + "'"));
for (const m of app.matchAll(/\? '((?:[^'\\]|\\.)*)' : '((?:[^'\\]|\\.)*)', \{ name/g)) { used.add(m[1]); used.add(m[2]); }
/* strings that reach T() through a variable */
['Snug', 'Normal', 'Roomy', 'video', 'book', 'site', 'podcast', 'channel',
  'Prophecies', 'Types & Shadows', 'The Tabernacle', 'The Feasts', 'Hold Loosely',
  'TORAH', 'HISTORY', 'POETS', 'PROPHETS', 'GOSPELS', 'LETTERS', 'REV',
  'serif headings and text', 'sans headings, serif text', 'sans headings and text', 'drawn for legibility',
  'Swipe to see the whole journey', 'Swipe to see the whole tabernacle', 'Swipe to see the whole year',
  'What it is', 'It feels like', 'God’s move', 'The exit', 'Provision'].forEach(s => used.add(s));
used.forEach(s => {
  if (s === 'Swipe to see the whole ') return;
  if (!Object.prototype.hasOwnProperty.call(UI_RU, s)) fail('UI_RU has no entry for: ' + s);
});
/* English strings inside UI_RU that carry references must keep them */
Object.keys(UI_RU).forEach(k => {
  if (k.charAt(0) === '@') return;
  if (typeof UI_RU[k] !== 'string') return fail('UI_RU entry is not a string: ' + k);
  const refish = EN.inProse(k);
  if (refish.length) {
    const whole = EN.parse(k);
    if (whole && EN.split(k).length === 1 && k.trim() === EN.split(k)[0]) compareRefField(k, UI_RU[k], 'UI_RU[' + k + ']');
    else compareProse(k, UI_RU[k], 'UI_RU[' + k + ']');
  }
});
/* Pattern rows: the icon is found by the label */
en.PATTERN.seasons.forEach((s, i) => s.rows.forEach((r, j) => {
  const want = UI_RU[r.k];
  if (ruData.PATTERN.seasons[i].rows[j].k !== want) fail('PATTERN.seasons[' + i + '].rows[' + j + '].k must be "' + want + '" (UI_RU of "' + r.k + '")');
}));
/* Mind panels: the Russian label must land on the English label's icon */
const iconSrc = app.slice(app.indexOf('const PANEL_ICONS = ['), app.indexOf('];', app.indexOf('const PANEL_ICONS = [')) + 2);
const PANEL_ICONS = vm.runInNewContext(iconSrc + '\nPANEL_ICONS');
const enIcon = l => { const s = String(l).toLowerCase(); for (const [re, ic] of PANEL_ICONS) if (re.test(s)) return ic; return 'compass'; };
const ruIcons = UI_RU['@panelIcons'] || {};
const pairs = [];
en.NEURO_PRIMER.forEach((p, i) => pairs.push([p.label, ruData.NEURO_PRIMER[i].label]));
en.MIND.blocks.forEach((b, i) => b.panelLabels.forEach((l, j) => pairs.push([l, ruData.MIND.blocks[i].panelLabels[j]])));
pairs.forEach(([e, r]) => {
  if (ruIcons[r] !== enIcon(e)) fail('UI_RU["@panelIcons"]["' + r + '"] must be "' + enIcon(e) + '" (the icon for "' + e + '")');
});
if (!Array.isArray(UI_RU['@waypoints']) || UI_RU['@waypoints'].length !== 3) fail('UI_RU["@waypoints"] must hold three plural forms');

if (errors.length) {
  console.error('check-ru: ' + errors.length + ' problem(s)\n  ' + errors.join('\n  '));
  process.exit(1);
}
console.log('check-ru: Russian sources mirror the English (' + NAMES.length + ' data objects, ' + used.size + ' UI strings)');
