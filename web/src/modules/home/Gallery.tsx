import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, loadProducts } from '../../data/products';

export function Gallery() {
  const [items, setItems] = useState<Array<{ src: string; slug: string }>>([]);
  useEffect(() => {
    loadProducts().then((list: Product[]) => {
      // uniquement les cover 2
      const covers2 = list
        .filter((p) => !!p.secondaryCover)
        .map((p) => ({ src: p.secondaryCover as string, slug: p.slug }));
      setItems(covers2);
    });
  }, []);
  return (
    <section className="py-14">
      <div className="container-section grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <Link key={it.src + i} to={`/produits/${it.slug}`} className="rounded-xl overflow-hidden border border-white/10 block focus:outline-none focus:ring-2 focus:ring-brand-green">
            <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url("${it.src}")` }} />
          </Link>
        ))}
      </div>
    </section>
  );
}



