// Data sweep: for every unique (book,chapter) referenced by the site, fetch a sample of versions from bolls.life,
// run the site's own cleanBollsText over the referenced verses, and count defects a reader would see.
import fs from 'node:fs'; import vm from 'node:vm';
const ctx = { console }; vm.createContext(ctx);
for (const f of ["21-data-threads.js","22-data-pattern.js","23-data-codes.js","24-data-walking.js","25-data-mind.js","26-data-triune.js"]) vm.runInContext(fs.readFileSync(f,"utf8"), ctx);
const app = fs.readFileSync("30-app.js","utf8");
const slice = (a,b) => app.slice(app.indexOf(a), app.indexOf(b));
vm.runInContext(app.match(/^const REF_RE = .*$/m)[0].replace("const ","var ") + "\n" + slice("function parseReference","function toYouVersionPassage") + "\n" + slice("function splitReferenceGroup","function singleRefLink") + "\n" + slice("function cleanBollsText","async function fetchTptFromYouVersion") + "\nvar DATA={THREADS,PATTERN,CODES,TRIUNE,NEURO_PRIMER,MIND,LIBRARY,START,TEN_WORDS,WALKING,DETOURS};", ctx);
const strings=[]; (function walk(o){ if(typeof o==="string") strings.push(o); else if(Array.isArray(o)) o.forEach(walk); else if(o&&typeof o==="object") Object.values(o).forEach(walk); })(ctx.DATA);
const refs=new Set(); for (const s of strings) { ctx.REF_RE.lastIndex=0; let m; while ((m=ctx.REF_RE.exec(s))) refs.add(m[0]); }
const parsed = []; for (const r of refs) for (const part of ctx.splitReferenceGroup(r)) { const p = ctx.parseReference(part); if (p) parsed.push({ ref: part, ...p }); }
const chapters = new Map(); for (const p of parsed) { const k = p.bookId+'/'+p.chapter; if (!chapters.has(k)) chapters.set(k, []); chapters.get(k).push(p); }
console.log('unique refs', parsed.length, 'unique chapters', chapters.size);
const versions = (process.argv[2] || 'NIV,KJV,NLT,MSG').split(',');
const limit = +(process.argv[3] || 60);
const keys = [...chapters.keys()].sort(() => Math.random() - 0.5).slice(0, limit);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const tally = {};
const examples = {};
for (const v of versions) {
  tally[v] = { verses: 0, glued: 0, leakedNote: 0, heading: 0, rawTags: {} };
  for (const k of keys) {
    const [b, c] = k.split('/');
    let json; try { const res = await fetch(`https://bolls.life/get-text/${v}/${b}/${c}/`); if (!res.ok) { continue; } json = await res.json(); } catch { continue; }
    await sleep(120);
    for (const p of chapters.get(k)) {
      const vs = p.verseStart === null ? json.slice(0,3) : json.filter(x => p.verseEnd !== null ? x.verse >= p.verseStart && x.verse <= p.verseEnd : x.verse === p.verseStart);
      for (const x of vs) {
        tally[v].verses++;
        const raw = String(x.text);
        for (const t of raw.matchAll(/<\/?([a-zA-Z]+)[^>]*>/g)) tally[v].rawTags[t[1].toLowerCase()] = (tally[v].rawTags[t[1].toLowerCase()]||0)+1;
        const cleaned = ctx.cleanBollsText(raw);
        // glued: a <br> with no whitespace either side in raw → words join after cleaning
        if (/[^\s>]<br\s*\/?>[^\s<]/i.test(raw)) { tally[v].glued++; (examples[v+'-glued'] ||= []).length < 3 && examples[v+'-glued'].push(p.ref + ': ' + cleaned.slice(0,140)); }
        if (/<sup>/i.test(raw)) { tally[v].leakedNote++; (examples[v+'-note'] ||= []).length < 3 && examples[v+'-note'].push(p.ref + ': ' + cleaned.slice(0,160)); }
        if (/^[^<]{3,60}<br\s*\/?>/i.test(raw) && /^[A-Z][^.!?]*<br/.test(raw)) { tally[v].heading++; (examples[v+'-heading'] ||= []).length < 3 && examples[v+'-heading'].push(p.ref + ': ' + cleaned.slice(0,120)); }
      }
    }
  }
}
console.log(JSON.stringify(tally, null, 1));
console.log(JSON.stringify(examples, null, 1));
