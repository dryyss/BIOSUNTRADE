import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.resolve(process.cwd(), 'public');
const contentPath = path.join(publicDir, 'content.json');
const outPath = path.join(publicDir, 'sitemap.xml');

const baseUrl = process.env.SITE_URL || '';

function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

async function main() {
  const raw = fs.readFileSync(contentPath, 'utf8');
  const data = JSON.parse(raw);
  const urls = new Set(['/','/produits','/contact']);
  for (const p of data.products || []) {
    urls.add(`/produits/${p.slug}`);
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
Array.from(urls).map((u)=>`  <url><loc>${esc(baseUrl + u)}</loc></url>`).join('\n') +
`\n</urlset>\n`;
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log('Sitemap écrit:', outPath);
}

main().catch((e)=>{ console.error(e); process.exit(1); });


