# audit/ — the fine-tooth audit of this site and its regression gate

Produced by the `/audit` skill on 2026-08-19 (second lap). These files are working notes, not part of the
site; they are committed here so an unattended run has the punch list and the gate at clone time.

| File | What it is |
|---|---|
| `REPORT.md` | The ranked punch list with root causes (`src/…:line`), a "Not tested" section, and fix order A–E. **Start here.** |
| `paths.json` | The regression suite: 50 interaction paths / 118 assertions, all passing as of 2026-08-19. Failing assertions *are* the punch list; add a path when you land behaviour worth keeping. |
| `harness.mjs` | Headless-Chrome driver over CDP. No npm dependencies; needs Node ≥ 22 and a Chrome/Chromium binary. |
| `inventory.md` | Every interactive element, state axis, data path and animation loop — what the "Not tested" list is written against. |
| `datasweep.mjs` | Fetches referenced chapters from bolls.life and runs this site's own `cleanBollsText` over them, counting damaged verses per translation. |

## Running the gate

```sh
node audit/harness.mjs paths https://esmrsky.github.io/the-thread/ --paths audit/paths.json --out /tmp/paths
node audit/harness.mjs shots https://esmrsky.github.io/the-thread/ --widths 375,1024,1280 --themes light,dark --out /tmp/shots
node audit/harness.mjs eval  https://esmrsky.github.io/the-thread/ --width 375 --js "getComputedStyle(document.querySelector('.nav-link')).fontSize"
```

If no Chrome is on the box: `npx --yes @puppeteer/browsers install chrome@stable`, then pass `--chrome <path>`
(or set `CHROME_BIN`). Baseline at the time of writing: **118 / 118 assertions passing**.

Edit `src/`, never `index.html` — run `./build.sh` to rebuild. Append `?cb=<random>` when checking CSS on the
live URL, or you measure a cached stylesheet.
