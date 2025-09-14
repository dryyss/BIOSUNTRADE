import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero } from '../home/Hero';
import { About } from '../home/About';
import { Values } from '../home/Values';
import { CallToAction } from '../ui/CallToAction';
import { ParallaxFruit } from '../home/ParallaxFruit';
import { Features } from '../home/Features';
import { Gallery } from '../home/Gallery';
import { GalleryIntro } from '../home/GalleryIntro';
import { Stats } from '../home/Stats';
import { Carousel } from '../home/Carousel';
import { Availability } from '../home/Availability';
import { Partners } from '../home/Partners';
import { FAQ } from '../home/FAQ';
import { useEffect, useState } from 'react';
import { Product, loadProducts } from '../../data/products';

export function HomePage() {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => { loadProducts('minimal').then(setItems); }, []);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return (
    <>
      <Helmet>
        <title>Biosun Trade — Fruits exotiques mûris sur l’arbre</title>
        <meta name="description" content="Fruits de la passion, mangue, gingembre, citron vert, papaye, grenade — qualité export, traçabilité et logistique rapide." />
        <link rel="canonical" href={`${origin}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Biosun Trade — Fruits exotiques" />
        <meta property="og:description" content="Sélection de fruits exotiques mûris sur l’arbre. Qualité export, traçabilité, délais maîtrisés." />
        <meta property="og:image" content={`${origin}/favicon-256x256.png`} />
        <meta property="og:url" content={`${origin}/`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Biosun Trade",
            "url": "${origin}/",
            "logo": "${origin}/favicon-256x256.png"
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Biosun Trade",
            "url": "${origin}/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "${origin}/produits?query={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}</script>
      </Helmet>
      <Hero />
      <About />
      <Values />
      <CallToAction title="Parlons de vos besoins en fruits exotiques" subtitle="Disponibilités, calibres, packaging et délais." />
      <Features />
  
      {items.map((p, i) => (
        <ParallaxFruit
          key={p.slug}
          image={p.couverture ?? p.image}
          title={p.name}
          text={p.description}
          text2={p.longDescription}
          reverse={i % 2 === 1}
          eager={i === 0}
        />
      ))}
      <GalleryIntro />
      <Gallery />
      <Stats />
      <Availability />
      {/* <Partners /> */}
      <FAQ />
      <Carousel />
    </>
  );
}


