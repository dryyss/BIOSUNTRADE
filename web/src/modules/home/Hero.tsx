import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand-black to-transparent text-white">
      <div className="container-section py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Nourrir le monde avec des fruits exotiques de qualité
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Biosun Trade exporte fruits de la passion, mangues, gingembre, citrons verts, papayes et grenades.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button to="/produits">Voir nos produits</Button>
          <Button to="/contact" variant="yellow">Nous contacter</Button>
        </div>
      </div>
    </section>
  );
}


