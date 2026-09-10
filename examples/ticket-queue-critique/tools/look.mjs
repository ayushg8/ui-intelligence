import { execSync } from 'node:child_process'; import { createRequire } from 'node:module';
const req = createRequire(execSync('npm root -g').toString().trim() + '/');
const { chromium } = req('playwright');
const [url, name, outDir='shots'] = process.argv.slice(2);
const fs = await import('node:fs'); fs.mkdirSync(outDir, { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2 });
const p = await ctx.newPage();
await p.goto(url, { waitUntil:'networkidle' }).catch(()=>{});
await p.waitForTimeout(2500);
const variants = {
  plain: 'none',
  blur6: 'blur(6px)',
  blur14: 'blur(14px)',
  gray: 'grayscale(1)',
  graycontrast: 'grayscale(1) contrast(0.85)',
};
for (const [k, f] of Object.entries(variants)) {
  await p.evaluate((f) => { document.documentElement.style.filter = f === 'none' ? '' : f; }, f);
  await p.screenshot({ path: `${outDir}/${name}-${k}.png` });
}
// upside down
await p.evaluate(() => { document.documentElement.style.filter=''; const b=document.body; b.style.transform='rotate(180deg)'; b.style.transformOrigin='center center'; });
await p.screenshot({ path: `${outDir}/${name}-flip.png` });
await p.evaluate(() => { document.body.style.transform=''; });
console.log('done', name);
await b.close();
