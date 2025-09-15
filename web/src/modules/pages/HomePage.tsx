import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero } from '../home/Hero';
import { AboutShort } from '../home/AboutShort';
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
        <title>Biosun Trade — Export Fruits Exotiques | Mûris sur l'Arbre | Qualité Export</title>
        <meta name="description" content="Export fruits exotiques mûris sur l'arbre: passion, mangue, gingembre, citron vert, papaye, grenade. Qualité export, traçabilité 100%, logistique express 48h. Producteurs certifiés BIO/GlobalG.A.P." />
        <meta name="keywords" content="fruits exotiques, export fruits, passion fruit, mangue, gingembre, citron vert, papaye, grenade, qualité export, traçabilité, logistique fruits, producteurs certifiés, BIO, GlobalG.A.P." />
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
            "logo": "${origin}/favicon-256x256.png",
            "description": "Export fruits exotiques mûris sur l'arbre: passion, mangue, gingembre, citron vert, papaye, grenade. Qualité export, traçabilité 100%, logistique express 48h.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Avenue Louise 367",
              "postalCode": "1050",
              "addressLocality": "Bruxelles",
              "addressCountry": "BE"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+32-471-49-40-48",
              "contactType": "customer service",
              "availableLanguage": ["French", "English"]
            },
            "sameAs": [
              "https://www.instagram.com/biosuntrade/",
              "https://www.linkedin.com/in/biosun-trade-098991384/"
            ]
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Biosun Trade",
            "url": "${origin}/",
            "description": "Site officiel Biosun Trade - Export fruits exotiques mûris sur l'arbre",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "${origin}/produits?query={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Biosun Trade",
            "image": "${origin}/favicon-256x256.png",
            "description": "Export fruits exotiques mûris sur l'arbre: passion, mangue, gingembre, citron vert, papaye, grenade. Qualité export, traçabilité 100%, logistique express 48h.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Avenue Louise 367",
              "postalCode": "1050",
              "addressLocality": "Bruxelles",
              "addressCountry": "BE"
            },
            "telephone": "+32-471-49-40-48",
            "url": "${origin}/",
            "priceRange": "$$",
            "servedCuisine": "Fruits exotiques export",
            "openingHours": "Mo-Fr 09:00-17:00"
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
          to={`/produits/${p.slug}`}
        />
      ))}
      
      <AboutShort />
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


