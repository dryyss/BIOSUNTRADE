import Jimp from 'jimp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const publicDir = path.resolve(__dirname, '..', 'public');
  const source = path.join(publicDir, 'logo2.png');
  if (!existsSync(source)) {
    console.error('Fichier source introuvable:', source);
    process.exit(1);
  }
  const img = await Jimp.read(source);
  // Supprime les marges transparentes pour maximiser la surface visible
  img.autocrop({ tolerance: 0.0002, cropOnlyFrames: false, leaveBorder: 0 });

  const tasks = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 64, name: 'favicon-64x64.png' },
    { size: 128, name: 'favicon-128x128.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 256, name: 'favicon-256x256.png' },
    { size: 512, name: 'android-chrome-512x512.png' },
  ];

  for (const t of tasks) {
    const out = path.join(publicDir, t.name);
    const clone = img.clone();
    // Remplir totalement la taille cible (pas de bandes), centré
    clone.cover(t.size, t.size, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
    await clone.writeAsync(out);
    console.log('Écrit', out);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
