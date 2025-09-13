export type Product = {
  slug: string;
  name: string;
  description: string;
  image: string; // chemin depuis /public (pour compat)
  // cover secondaire (ex: "cover 2") à afficher en tête de galerie
  secondaryCover?: string;
  // photo sur l'arbre à afficher dans la description
  treeImage?: string;
  longDescription?: string;
  storageTips?: string[];
  healthBenefits?: string[];
  keyNutrients?: string[]; // ex: "Vitamine C: 25 mg/100g"
  origins?: string[];
  gallery?: string[];
};

export let PRODUCTS: Product[] = [];

async function urlExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(encodeURI(url), { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

async function resolveCoverUrl(slug: string, fallback?: string): Promise<string> {
  const bases = [
    `/fruits/${slug}`,
    `/fruits/${slug.replace(/-/g, ' ')}`,
    // compat ancien dossier sans espace « de la »
    `/fruits/${slug.replace(/-/g, ' ').replace(/ de la /g, ' dela ')}`,
    // nouveau dossier simplifié "passion"
    slug === 'fruit-de-la-passion' ? '/fruits/passion' : '',
  ];
  const candidates = [
    (b: string) => `${b}/cover.jpeg`,
    (b: string) => `${b}/cover.jpg`,
    (b: string) => `${b}/cover.png`,
    (b: string) => `${b}/cover.webp`,
    (b: string) => `${b}/cover%20.jpeg`, // gère le fichier "cover .jpeg" avec espace
    (b: string) => `${b}/cover%20.jpg`,  // gère le fichier "cover .jpg" avec espace
  ];
  for (const base of bases) {
    for (const make of candidates) {
      const url = make(base);
      if (await urlExists(url)) return encodeURI(url);
    }
  }
  return fallback ? encodeURI(fallback) : '';
}

async function resolveSecondaryCoverUrl(slug: string): Promise<string | undefined> {
  const bases = [
    `/fruits/${slug}`,
    `/fruits/${slug.replace(/-/g, ' ')}`,
    `/fruits/${slug.replace(/-/g, ' ').replace(/ de la /g, ' dela ')}`,
    slug === 'fruit-de-la-passion' ? '/fruits/passion' : '',
  ];
  const candidates = [
    (b: string) => `${b}/cover 2.jpeg`,
    (b: string) => `${b}/cover 2.jpg`,
    (b: string) => `${b}/cover-2.jpeg`,
    (b: string) => `${b}/cover-2.jpg`,
    (b: string) => `${b}/cover2.jpeg`,
    (b: string) => `${b}/cover2.jpg`,
    (b: string) => `${b}/co2.jpeg`,
    (b: string) => `${b}/co2.jpg`,
  ];
  for (const base of bases) {
    for (const make of candidates) {
      const url = make(base);
      if (await urlExists(url)) return encodeURI(url);
    }
  }
  return undefined;
}

async function resolveGalleryUrls(slug: string, coverUrl: string, preset?: string[]): Promise<string[]> {
  if (preset && preset.length) return preset.map((u) => encodeURI(u));
  const bases = [
    `/fruits/${slug}`,
    `/fruits/${slug.replace(/-/g, ' ')}`,
  ];
  const stems = ['images', 'image', 'photo', 'téléchargement', 'telechargement', 'fin-haut', 'istockphoto', 'arbre', 'co', 'cov', 'pexels'];
  const exts = ['jpeg', 'jpg', 'png', 'webp'];
  const candidates: string[] = [];
  for (const base of bases) {
    // quelques fichiers sans index
    for (const s of stems) for (const e of exts) candidates.push(`${base}/${s}.${e}`);
    // variantes numérotées
    for (let i = 1; i <= 8; i++) {
      for (const s of stems) for (const e of exts) candidates.push(`${base}/${s} (${i}).${e}`);
    }
  }
  const uniq: string[] = [];
  for (const url of candidates) {
    const encoded = encodeURI(url);
    if (encoded === coverUrl) continue;
    if (await urlExists(encoded)) uniq.push(encoded);
    if (uniq.length >= 12) break; // limiter
  }
  return uniq;
}

export async function loadProducts(): Promise<Product[]> {
  try {
    const res = await fetch('/content.json');
    const data = await res.json();
    // support des nouveaux champs cover/cover2/arbre dans le JSON
    const raw = (data.products as any[]).map((p) => ({
      ...p,
      image: p.cover ?? p.image ?? '',
      secondaryCover: p.cover2 ?? undefined,
      treeImage: p.arbre ?? undefined,
    })) as Product[];
    const enhanced = await Promise.all(
      raw.map(async (p) => {
        const detectedSecondary = p.secondaryCover ?? (await resolveSecondaryCoverUrl(p.slug));
        const image = await resolveCoverUrl(p.slug, p.image);
        const gallery = await resolveGalleryUrls(p.slug, image, p.gallery);
        const treeImage = p.treeImage ?? (gallery ?? []).find((g) => decodeURI(g).toLowerCase().includes('arbre'));
        // Fallback si pas de cover détecté: cover2 puis première image de galerie
        const finalImage = image || detectedSecondary || (gallery && gallery[0]) || '';
        return { ...p, image: finalImage, secondaryCover: detectedSecondary, treeImage, gallery } as Product;
      })
    );
    PRODUCTS = enhanced;
    return PRODUCTS;
  } catch {
    return PRODUCTS; // fallback vide si offline
  }
}



