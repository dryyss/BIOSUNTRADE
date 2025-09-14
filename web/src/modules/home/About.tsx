import { DotGlobe } from '../ui/DotGlobe';
import { useEffect, useMemo, useState } from 'react';
import { Product, loadProducts } from '../../data/products';

export function About() {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => { loadProducts('minimal').then(setItems); }, []);
  const markers = useMemo(() => {
    // Mapping très simple pays -> coordonnées (à étendre au besoin)
    const countryToLatLon: Record<string, { lat: number; lon: number }> = {
      'Pérou': { lat: -9.19, lon: -75.02 },
      'Sénégal': { lat: 14.5, lon: -14.45 },
      'Maroc': { lat: 31.8, lon: -7.1 },
      'Côte d’Ivoire': { lat: 7.54, lon: -5.55 },
      'Cote d’Ivoire': { lat: 7.54, lon: -5.55 },
      'Ghana': { lat: 7.95, lon: -1.03 },
    };
    const set = new Map<string, { lat: number; lon: number }>();
    for (const p of items) {
      for (const o of p.origins ?? []) {
        const key = o.trim();
        const pos = countryToLatLon[key];
        if (pos) set.set(key, pos);
      }
    }
    return Array.from(set.entries()).map(([label, pos]) => ({ ...pos, label }));
  }, [items]);
  return (
    <section id="about" className="container-section py-24 lg:py-28 min-h-[70vh]">
      <div className="grid md:grid-cols-2 gap-8 items-center overflow-visible">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Pourquoi Biosun Trade</h2>
          <p className="mt-4 text-gray-300">
            Nous sourçons des fruits exotiques qui ont réellement mûri sur l’arbre, auprès de petits 
            producteurs de confiance. Résultat: plus de goût, plus de nutriments et zéro traitement 
            post‑récolte. Notre équipe pilote la qualité et la logistique pour livrer en quelques jours 
            des produits prêts à consommer ou à transformer.
          </p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            <li className="p-3 rounded-md bg-white/5 border border-white/10">Mûris sur l’arbre</li>
            <li className="p-3 rounded-md bg-white/5 border border-white/10">Traçabilité 100%</li>
            <li className="p-3 rounded-md bg-white/5 border border-white/10">Expédition express</li>
            <li className="p-3 rounded-md bg-white/5 border border-white/10">Certifs BIO/GlobalG.A.P.</li>
          </ul>
        </div>
        <div className="relative overflow-visible">
          <DotGlobe
            className="aspect-square w-full max-w-[520px] mx-auto"
            dotColor="rgba(255,255,255,0.18)" 
            continentColor="#9aa3b2"
            backgroundColor="transparent"
            density={60}
            speed={0.22}
            showContinents
            hideWaterDots
            oceanColor="rgba(2, 132, 199, 0.35)"
            markers={[]}
            sizeFactor={0.5}
          />
        </div>
      </div>
    </section>
  );
}



