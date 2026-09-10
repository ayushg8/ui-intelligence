// node inkbox.mjs <url> <selector> [lumaThreshold=200]
// Optical centering: screenshot each matched element at 4x, find the bounding box of its
// ink (pixels darker than the threshold), and report the gap above the ink vs below it.
// `align-items:center` centers the LINE BOX, not the letters — this measures the difference.
import { execSync } from 'node:child_process'; import { createRequire } from 'node:module';
const { chromium } = createRequire(execSync('npm root -g').toString().trim()+'/')('playwright');
const [url, sel, thr='200'] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900}, deviceScaleFactor:4 });
await p.goto(url, { waitUntil:'domcontentloaded' }); await p.waitForTimeout(1500);
const helper = await b.newPage();                       // decodes PNGs via canvas
for (const el of await p.$$(sel)) {
  const box = await el.boundingBox(); if (!box || box.height < 10) continue;
  const txt = (await el.textContent()).trim().replace(/\s+/g,' ').slice(0,28);
  const png = 'data:image/png;base64,' + (await el.screenshot()).toString('base64');
  const m = await helper.evaluate(async ([u, t]) => {
    const img = new Image(); img.src = u; await img.decode();
    const c = Object.assign(document.createElement('canvas'), { width: img.width, height: img.height });
    const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data;
    let top = null, bot = null;
    for (let j = 0; j < c.height; j++) {
      let hit = false;
      for (let i = 0; i < c.width; i++) if (d[(j*c.width+i)*4] < t) { hit = true; break; }
      if (hit) { if (top === null) top = j; bot = j; }
    }
    return { h: c.height, top, bot };
  }, [png, parseInt(thr,10)]);
  if (m.top === null) { console.log(`"${txt}" — no ink above threshold`); continue; }
  const above = m.top/4, below = (m.h-1-m.bot)/4;
  console.log(`"${txt}" box=${box.height}px above=${above.toFixed(2)} below=${below.toFixed(2)} bias=${(above-below).toFixed(2)}px low`);
}
await b.close();
