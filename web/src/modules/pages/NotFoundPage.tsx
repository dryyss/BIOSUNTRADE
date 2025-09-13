import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export function NotFoundPage() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(circle at 0% 0%, #66BB2E22, transparent 40%), radial-gradient(circle at 100% 20%, #F5A62322, transparent 40%)',
        }}
      />
      <div className="container-section py-28 relative text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-8xl md:text-9xl font-extrabold tracking-tight">404</div>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold">Page introuvable</h1>
          <p className="mt-4 text-gray-300">Désolé, la page que vous cherchez n’existe pas ou a changé d’adresse.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Button to="/">Retour à l’accueil</Button>
            <Button to="/produits" variant="outline">Voir nos produits</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


