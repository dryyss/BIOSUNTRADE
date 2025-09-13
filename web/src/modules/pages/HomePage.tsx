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

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Values />
      <CallToAction title="Parlons de vos besoins en fruits exotiques" subtitle="Disponibilités, calibres, packaging et délais." />
      <Features />
      <ParallaxFruit
        image="/fruits/fruit dela passion/granadilla-1-280x238.jpg"
        title="Fruits de la passion"
        text="Arômes uniques, parfaits pour jus, desserts et mixologie. Approvisionnement maîtrisé tout au long de l’année."
      />
      <ParallaxFruit
        image="/fruits/mangue/cover.jpg"
        title="Mangue"
        text="Variétés export à la chair juteuse et sucrée, maturité contrôlée pour un goût optimal."
        reverse
      />
      <ParallaxFruit
        image="/fruits/gingembre/cover.jpg"
        title="Gingembre"
        text="Racines fraîches et aromatiques, calibre export, idéales pour transformation et retail."
      />
      <ParallaxFruit
        image="/fruits/citron-vert/cover.jpg"
        title="Citron vert"
        text="Riche en jus et en notes acidulées, très demandé pour boissons et gastronomie."
        reverse
      />
      <ParallaxFruit
        image="/fruits/papaye/cover.jpg"
        title="Papaye"
        text="Chair orangée, texture fondante, appréciée en frais et en process."
      />
      <ParallaxFruit
        image="/fruits/grenade/cover.jpg"
        title="Grenade"
        text="Arilles croquants riches en antioxydants, disponibles en plusieurs calibres."
        reverse
      />
      <Gallery />
      <Stats />
      <Availability />
      <Partners />
      <FAQ />
    </>
  );
}


