import { Button } from './Button';

type CTAProps = {
  title: string;
  subtitle?: string;
};

export function CallToAction({ title, subtitle }: CTAProps) {
  return (
    <section className="py-14 bg-gradient-to-r from-brand-green/20 to-brand-yellow/10">
      <div className="container-section text-center">
        <h3 className="text-2xl font-extrabold">{title}</h3>
        {subtitle && <p className="mt-2 text-gray-300">{subtitle}</p>}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button to="/contact">Nous contacter</Button>
          <Button to="/produits" variant="yellow">Voir nos produits</Button>
        </div>
      </div>
    </section>
  );
}


