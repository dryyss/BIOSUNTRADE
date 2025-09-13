import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';

export function Products() {
  return (
    <section id="products" className="bg-gray-50 dark:bg-white/5 py-16">
      <div className="container-section">
        <h2 className="text-2xl md:text-3xl font-bold">Nos produits</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <article key={p.name} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur hover:shadow-xl transition-shadow">
              <div className="h-48 bg-cover bg-center transform hover:scale-105 transition-transform" style={{ backgroundImage: `url(${p.image})` }} />
              <div className="p-6">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="mt-2 text-sm text-gray-300">{p.description}</p>
                <Link to={`/produits/${p.slug}`} className="inline-block mt-3 text-sm font-medium text-brand-yellow">Voir le détail</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


