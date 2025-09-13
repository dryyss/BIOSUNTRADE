import { Products } from '../home/Products';
import { CallToAction } from '../ui/CallToAction';

export function ProductsPage() {
  return (
    <>
      <Products />
      <CallToAction title="Besoin d’une offre ?" subtitle="Contactez-nous pour les prix et la disponibilité." />
    </>
  );
}


