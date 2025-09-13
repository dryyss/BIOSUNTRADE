import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { motion } from 'framer-motion';

export function ProductDetailPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="container-section py-16">
        <p>Produit introuvable.</p>
        <Link to="/produits" className="text-brand.green">Retour aux produits</Link>
      </div>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{background: 'radial-gradient(circle at 10% 10%, #66BB2E22, transparent 40%), radial-gradient(circle at 90% 20%, #F5A62322, transparent 40%)'}} />
        <div className="container-section py-14 relative grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{duration:.5}}>
            <h1 className="text-4xl font-extrabold">{product.name}</h1>
            <p className="mt-4 text-gray-300">{product.description}</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              <li className="p-3 rounded-md bg-white/5 border border-white/10">Calibres export</li>
              <li className="p-3 rounded-md bg-white/5 border border-white/10">Chaîne du froid</li>
              <li className="p-3 rounded-md bg-white/5 border border-white/10">Disponibilité saisonnière</li>
              <li className="p-3 rounded-md bg-white/5 border border-white/10">Packaging sur mesure</li>
            </ul>
            <Link to="/contact" className="inline-block mt-6 px-5 py-3 rounded-md bg-brand-green text-white font-medium">Demander une offre</Link>
          </motion.div>
          <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:.5}} className="rounded-2xl overflow-hidden border border-white/10">
            <div className="aspect-[16/11] bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
          </motion.div>
        </div>
      </section>
      <section className="container-section py-10">
        <h2 className="text-xl font-semibold">Galerie</h2>
        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-white/10">
              <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/produits" className="text-sm text-brand-yellow">← Retour aux produits</Link>
        </div>
      </section>
    </>
  );
}


