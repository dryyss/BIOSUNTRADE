import { Hero } from '../home/Hero';
import { About } from '../home/About';
import { Values } from '../home/Values';
import { CallToAction } from '../ui/CallToAction';
import { ParallaxFruit } from '../home/ParallaxFruit';
import { Features } from '../home/Features';
import { Gallery } from '../home/Gallery';
import { Stats } from '../home/Stats';
import { Availability } from '../home/Availability';
import { Partners } from '../home/Partners';
import { FAQ } from '../home/FAQ';
import { useEffect, useState } from 'react';
import { Product, loadProducts } from '../../data/products';

export function HomePage() {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => { loadProducts().then(setItems); }, []);
  return (
    <>
      <Hero />
      <About />
      <Values />
      <CallToAction title="Parlons de vos besoins en fruits exotiques" subtitle="Disponibilités, calibres, packaging et délais." />
      <Features />
      {items.map((p, i) => (
        <ParallaxFruit key={p.slug} image={p.image} title={p.name} text={p.description} reverse={i % 2 === 1} />
      ))}
      <Gallery />
      <Stats />
      <Availability />
      {/* <Partners /> */}
      <FAQ />
    </>
  );
}


