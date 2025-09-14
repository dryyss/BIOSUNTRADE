import { Products } from '../home/Products';
import { CallToAction } from '../ui/CallToAction';
import { Helmet } from 'react-helmet-async';

export function ProductsPage() {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return (
    <>
      <Helmet>
        <title>Produits — Biosun Trade</title>
        <meta name="description" content="Découvrez notre sélection de fruits exotiques: passion, mangue, gingembre, citron vert, papaye, grenade…" />
        <link rel="canonical" href={`${origin}/produits`} />
        <meta property="og:url" content={`${origin}/produits`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Produits — Biosun Trade" />
        <meta property="og:description" content="Fruits exotiques mûris sur l’arbre, qualité export et traçabilité." />
      </Helmet>
      <Products />
      <CallToAction title="Besoin d’une offre ?" subtitle="Contactez-nous pour les prix et la disponibilité." />
    </>
  );
}


