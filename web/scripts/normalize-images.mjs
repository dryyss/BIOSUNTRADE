import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd(), 'public', 'fruits');

/**
 * Normalize a base filename to kebab-case and map to canonical names:
 * - cover, cover-2, arbre, image-01..NN
 */
function classifyBaseName(originalBase) {
  const lower = originalBase
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
  const kebab = lower.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  if (/^cover(-?2)?$/.test(kebab) || /^(co2|cov2)$/.test(kebab)) return 'cover-2';
  if (/^(co|cov)$/.test(kebab)) return 'cover';
  if (kebab.includes('arbre')) return 'arbre';

  if (
    /^images?$/.test(kebab) ||
    /^telechargement/.test(kebab) ||
    /^téléchargement/.test(kebab) ||
    /^pexels/.test(kebab) ||
    /^istockphoto/.test(kebab)
  ) {
    return 'image';
  }
  return 'image';
}

function pickExt(file) {
  const ext = path.extname(file).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return ext;
  return ext || '.jpg';
}

async function normalizeDir(dir) {
  const files = (await fs.promises.readdir(dir)).filter((f) => fs.statSync(path.join(dir, f)).isFile());
  // First pass: compute targets
  const planned = [];
  let hasCover = false;
  let hasCover2 = false;
  let hasArbre = false;
  for (const f of files) {
    const base = path.basename(f, path.extname(f));
    const ext = pickExt(f);
    let cls = classifyBaseName(base);
    if (cls === 'cover-2') hasCover2 = true;
    if (cls === 'arbre') hasArbre = true;
    if (cls === 'cover') hasCover = true;
    planned.push({ src: f, cls, ext });
  }

  // Ensure at most one cover; if none but a single image exists, promote first to cover
  if (!hasCover) {
    const candidate = planned.find((p) => p.cls === 'image');
    if (candidate) candidate.cls = 'cover', (hasCover = true);
  }

  // Assign sequence numbers for generic images
  let imageIndex = 1;
  const targetNames = new Set();
  function nextImageName(ext) {
    const name = `image-${String(imageIndex).padStart(2, '0')}${ext}`;
    imageIndex += 1;
    return name;
  }

  const renames = planned.map(({ src, cls, ext }) => {
    let target;
    if (cls === 'cover') target = `cover${ext}`;
    else if (cls === 'cover-2') target = `cover-2${ext}`;
    else if (cls === 'arbre') target = `arbre${ext}`;
    else target = nextImageName(ext);
    // ensure uniqueness
    while (targetNames.has(target)) {
      if (target.startsWith('image-')) target = nextImageName(ext);
      else target = `image-${String(imageIndex).padStart(2, '0')}${ext}`, (imageIndex += 1);
    }
    targetNames.add(target);
    return { from: path.join(dir, src), to: path.join(dir, target) };
  });

  // Second pass: perform renames via temporary names to avoid collisions
  for (const r of renames) {
    if (r.from === r.to) continue;
    const tmp = r.to + '.tmp-renaming';
    if (fs.existsSync(r.to)) await fs.promises.rename(r.to, tmp);
    await fs.promises.rename(r.from, r.to);
    if (fs.existsSync(tmp)) await fs.promises.unlink(tmp);
  }
}

async function main() {
  if (!fs.existsSync(ROOT)) {
    console.error('Directory not found:', ROOT);
    process.exit(1);
  }
  const entries = await fs.promises.readdir(ROOT, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) {
      await normalizeDir(path.join(ROOT, e.name));
    }
  }
  console.log('Image filenames normalized successfully.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


