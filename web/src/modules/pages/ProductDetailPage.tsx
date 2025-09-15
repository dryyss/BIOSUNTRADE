import { useParams, Link } from 'react-router-dom';
import { Product, loadProducts } from '../../data/products';
import { motion } from 'framer-motion';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LazyBg } from '../ui/LazyBg';

export function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    loadProducts().then((items) => {
      if (!mounted) return;
      const found = items.find((p) => p.slug === slug) ?? null;
      setProduct(found);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (!loading && !product) {
    return (
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(circle at 0% 0%, #66BB2E22, transparent 40%), radial-gradient(circle at 100% 20%, #F5A62322, transparent 40%)',
          }}
        />
        <div className="container-section py-24 relative text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold">Produit introuvable</h1>
            <p className="mt-4 text-gray-300">Le produit demandé n’existe pas ou a été retiré.</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button to="/produits">Voir tous les produits</Button>
              <Button to="/" variant="outline">Retour à l’accueil</Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (loading || !product) {
    return (
      <section className="container-section py-24">
        <div className="animate-pulse h-64 rounded-2xl bg-white/5 border border-white/10" />
      </section>
    );
  }

  return (
    <>
      <Helmet>
        {(() => { const origin = typeof window !== 'undefined' ? window.location.origin : ''; return (
          <>
            <title>{product.name} Export | Qualité Professionnelle | Biosun Trade</title>
            <meta name="description" content={`${product.description} Export professionnel ${product.name.toLowerCase()}, calibres export, traçabilité complète, logistique express. Origines: ${product.origins?.join(', ') || 'Pérou, Colombie'}.`} />
            <meta name="keywords" content={`${product.name.toLowerCase()} export, ${product.name.toLowerCase()} professionnel, calibres export, traçabilité, logistique fruits, ${product.origins?.join(', ').toLowerCase() || 'pérou colombie'}`} />
            <link rel="canonical" href={`${origin}/produits/${product.slug}`} />
            <meta property="og:type" content="product" />
            <meta property="og:title" content={`${product.name} — Biosun Trade`} />
            <meta property="og:description" content={product.description} />
            <meta property="og:image" content={(product.couverture || product.secondaryCover || '')} />
            <meta property="og:url" content={`${origin}/produits/${product.slug}`} />
            <script type="application/ld+json">{JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: product.name,
              description: product.description,
              image: [product.couverture || product.secondaryCover, ...(product.gallery || [])].filter(Boolean),
              brand: { '@type': 'Brand', name: 'Biosun Trade' },
              category: 'Fruits exotiques',
              offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                seller: { '@type': 'Organization', name: 'Biosun Trade' }
              },
              additionalProperty: product.origins?.map(origin => ({
                '@type': 'PropertyValue',
                name: 'Origine',
                value: origin
              })) || []
            })}</script>
          </>
        );})()}
      </Helmet>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{background: 'radial-gradient(circle at 10% 10%, #66BB2E22, transparent 40%), radial-gradient(circle at 90% 20%, #F5A62322, transparent 40%)'}} />
        <div className="container-section py-14 relative grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{duration:.5}}>
            <h1 className="text-4xl font-extrabold">{product.name}</h1>
            <p className="mt-4 text-gray-300">{product.description}</p>
            {product.origins && product.origins.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                {product.origins.map((o) => (
                  <span key={o} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-green/20 text-brand-yellow border border-brand-green/30">
                    <MapPinIcon className="h-4 w-4" /> {o}
                  </span>
                ))}
              </div>
            )}
            {product.treeImage && (
              <div className="mt-5 rounded-2xl overflow-hidden border border-white/10">
                <div className="aspect-[16/10] bg-cover bg-center" style={{ backgroundImage: `url("${product.treeImage}")` }} />
                <div className="px-3 py-2 text-xs text-white/80">Cueillis sur l’arbre</div>
              </div>
            )}
            <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              <li className="p-3 rounded-md bg-white/5 border border-white/10">Calibres export</li>
              <li className="p-3 rounded-md bg-white/5 border border-white/10">Chaîne du froid</li>
              <li className="p-3 rounded-md bg-white/5 border border-white/10">Disponibilité saisonnière</li>
              <li className="p-3 rounded-md bg-white/5 border border-white/10">Packaging sur mesure</li>
            </ul>
            <Link to="/contact" className="inline-block mt-6 px-5 py-3 rounded-md bg-brand-green text-white font-medium">Demander une offre</Link>
          </motion.div>
          <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:.5}} className="rounded-2xl overflow-hidden border border-white/10">
            <LazyBg src={product.couverture || product.image || product.secondaryCover || ''} className="aspect-[16/11] bg-cover bg-center" />
          </motion.div>
        </div>
      </section>
      <section className="container-section py-10">
        <h2 className="text-xl font-semibold">Galerie</h2>
        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(() => {
            const list = [product.secondaryCover, ...(product.gallery ?? [])]
              .filter((x): x is string => !!x)
              .filter((src) => src !== product.couverture && src !== product.treeImage);
            for (let i = list.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [list[i], list[j]] = [list[j], list[i]];
            }
            return list;
          })().map((src, i) => (
            <div key={src + i} className="rounded-xl overflow-hidden border border-white/10">
              <LazyBg src={src} className="aspect-[4/3] bg-cover bg-center" />
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


  