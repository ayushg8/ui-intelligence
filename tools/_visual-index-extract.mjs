import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
const R='/Users/ayushgarg/Ayush/UI_Library';
const trim=(s,n)=>{s=String(s||'');if(s.length<=n)return s;const c=s.slice(0,n);return c.slice(0,c.lastIndexOf(' '))+'\u2026';};
const out=[];
for (const f of readdirSync(R+'/archetypes').filter(x=>x.endsWith('.md')&&!/README|DIGEST/.test(x)).sort()) {
  const md=readFileSync(`${R}/archetypes/${f}`,'utf8');
  const head=(md.match(/^\*\*Evaluated:.*$/m)||[''])[0];
  const cut=md.search(/^#{1,4}\s+.*(Differentiation|Direction|Review) pass/im);
  const body=cut>0?md.slice(0,cut):md;
  // Match the label exactly and require the value to contain px. Without both,
  // "Row hover | 0ms, <=120ms ceiling" is read as a 12px row height.
  const rowOf = (re) => {
    for (const line of body.split('\n')) {
      if (!line.startsWith('|')) continue;
      const cells = line.split('|').map(c=>c.trim());
      const label = (cells[1]||'').replace(/\*\*/g,'').trim();
      const val = (cells[2]||'').replace(/\*\*/g,'').trim();
      if (re.test(label) && /\d\s*px/.test(val)) return val;
    }
    return '';
  };
  const quote=(body.match(/^>\s+(.+)$/m)||[,''])[1];
  const failIdx=body.search(/^##\s+.*characteristic failure/im);
  const fail = failIdx>0 ? (body.slice(failIdx).split('\n').slice(1).find(l=>l.trim()&&!l.startsWith('#'))||'') : '';
  const bTxt=rowOf(/^Body\b/i), rTxt=rowOf(/^Row\b(?!\s*hover)/i)||rowOf(/^List-item/i);
  const px=s=>{const m=String(s).match(/(\d{1,3})\s*(?:px|\u2013|-|\/)/);return m?+m[1]:null;};
  out.push({ slug:f.replace('.md',''),
    density:(head.match(/Density:\*\*\s*([^·|]+)/)||[,'—'])[1].trim(),
    dark:(head.match(/default:\*\*\s*([^·|]+)/)||[,'—'])[1].trim().slice(0,46),
    line:trim(quote,180), bodyTxt:bTxt.slice(0,86), rowTxt:rTxt.slice(0,80),
    bodyPx:px(bTxt), rowPx:/content-sized|never fixed/i.test(rTxt)?null:px(rTxt), rowNote:/content-sized|never fixed/i.test(rTxt)?'content-sized':null,
    fail:trim(fail.replace(/\*\*/g,'').replace(/`/g,''),195), lines:md.split('\n').length });
}
writeFileSync('/tmp/arch.json', JSON.stringify(out,null,1));
console.log(out.length,'archetypes ·',out.filter(a=>a.bodyPx).length,'with body px ·',out.filter(a=>a.rowPx).length,'with row px');
out.slice(0,4).forEach(a=>console.log(`  ${a.slug.padEnd(24)} body ${String(a.bodyPx).padStart(3)}  row ${String(a.rowPx).padStart(3)}  ${a.density}`));
