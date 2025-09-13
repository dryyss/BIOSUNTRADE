import { Button } from '../ui/Button';
import { ShoppingCartIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand-black to-transparent text-white">
      <div className="container-section py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Fruits & légumes exotiques de confiance, au vrai goût du frais
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
          Sélection auprès de producteurs engagés: fruits et légumes mûris sur l’arbre ou à pleine maturité, 
          fraîcheur express, qualité export et traçabilité de bout en bout.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button to="/produits" leftIcon={<ShoppingCartIcon className="h-5 w-5" />}>Voir nos produits</Button>
          <Button to="/contact" variant="yellow" leftIcon={<PaperAirplaneIcon className="h-5 w-5" />}>Nous contacter</Button>
        </div>
      </div>
    </section>
  );
}


