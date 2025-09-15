import { Products } from '../home/Products';
import { CallToAction } from '../ui/CallToAction';
import { Helmet } from 'react-helmet-async';

export function ProductsPage() {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return (
    <>
      <Helmet>
        <title>Produits Fruits Exotiques | Export Passion, Mangue, Gingembre | Biosun Trade</title>
        <meta name="description" content="Catalogue fruits exotiques export: passion, mangue Kent, gingembre, citron vert, papaye, grenade, avocat, ananas. Qualité export, calibres professionnels, traçabilité complète." />
        <meta name="keywords" content="fruits exotiques catalogue, export passion fruit, mangue Kent export, gingembre frais, citron vert lime, papaye export, grenade, avocat Hass, ananas export, calibres professionnels" />
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


