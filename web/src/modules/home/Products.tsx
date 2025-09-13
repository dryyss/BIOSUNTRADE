import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product, loadProducts } from '../../data/products';
import { MapPinIcon } from '@heroicons/react/24/outline';

export function Products() {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => {
    loadProducts().then(setItems);
  }, []);
  return (
    <section id="products" className="bg-gray-50 dark:bg-white/5 py-16">
      <div className="container-section">
        <h2 className="text-2xl md:text-3xl font-bold">Nos produits</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {items.map((p) => {
            const src = encodeURI(p.image || p.secondaryCover || (p.gallery && p.gallery[0]) || '');
            return (
            <Link key={p.name} to={`/produits/${p.slug}`} className="group block rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur hover:shadow-2xl transition-all focus:outline-none focus:ring-2 focus:ring-brand-green">
              <div className="relative h-80 bg-cover bg-center transform group-hover:scale-105 transition-transform" style={{ backgroundImage: `url("${src}")` }}>
                {p.treeImage && (
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-md text-[11px] font-medium bg-brand-green text-white border border-white/20 shadow">
                    Mûris sur l’arbre
                  </span>
                )}
              </div>
              <div className="p-8">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="mt-2 text-sm text-gray-300">{p.description}</p>
                {p.origins && (
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {p.origins.map((o) => (
                      <span key={o} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-green/20 text-brand-yellow border border-brand-green/30">
                        <MapPinIcon className="h-3.5 w-3.5" /> {o}
                      </span>
                    ))}
                  </div>
                )}
                <span className="inline-block mt-4 text-sm font-medium text-brand-yellow">Voir le détail →</span>
              </div>
            </Link>
          );})}
        </div>
      </div>
    </section>
  );
}


