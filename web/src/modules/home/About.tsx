export function About() {
  return (
    <section id="about" className="container-section py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Qui sommes-nous ?</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Biosun Trade est un importateur et exportateur spécialisé dans les fruits exotiques,
            basé à Bruxelles. Notre mission est de connecter les meilleurs producteurs aux marchés
            internationaux avec une exigence de qualité, traçabilité et fraîcheur.
          </p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            <li className="p-3 rounded-md bg-gray-50 dark:bg-white/5">Durabilité et commerce responsable</li>
            <li className="p-3 rounded-md bg-gray-50 dark:bg-white/5">Contrôle qualité et certifications</li>
            <li className="p-3 rounded-md bg-gray-50 dark:bg-white/5">Chaîne logistique réactive</li>
            <li className="p-3 rounded-md bg-gray-50 dark:bg-white/5">Partenariats de long terme</li>
          </ul>
        </div>
        <div className="aspect-[4/3] rounded-xl bg-[url('https://images.unsplash.com/photo-1513040935293-e4780a46b5eb?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
      </div>
    </section>
  );
}



