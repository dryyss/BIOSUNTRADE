import { Button } from '../ui/Button';

export function NotFoundPage() {
  return (
    <section className="container-section py-20 text-center">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold">Page introuvable</h1>
        <p className="mt-4 text-gray-300">Désolé, la page que vous cherchez n’existe pas.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Button to="/">Retour à l’accueil</Button>
          <Button to="/produits" variant="outline">Voir nos produits</Button>
        </div>
      </div>
    </section>
  );
}


