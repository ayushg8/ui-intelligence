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
// upside down — rotate the IMAGE, not the DOM. A transform on <body> makes it the
// containing block for sticky/fixed chrome and rotates the whole document about its own
// centre, so on any page taller than the viewport the capture is a different slice.
await p.evaluate(() => { document.documentElement.style.filter=''; });
const shot = 'data:image/png;base64,' + (await p.screenshot()).toString('base64');
const helper = await ctx.newPage();
const flipped = await helper.evaluate(async (u) => {
  const img = new Image(); img.src = u; await img.decode();
  const c = Object.assign(document.createElement('canvas'), { width: img.width, height: img.height });
  const x = c.getContext('2d'); x.translate(img.width, img.height); x.rotate(Math.PI);
  x.drawImage(img, 0, 0); return c.toDataURL('image/png');
}, shot);
fs.writeFileSync(`${outDir}/${name}-flip.png`, Buffer.from(flipped.split(',')[1], 'base64'));
await helper.close();
console.log('done', name);
await b.close();
