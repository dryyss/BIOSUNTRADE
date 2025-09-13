export function Values() {
  return (
    <section id="values" className="container-section py-16">
      <div className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold">Nos valeurs & certifications</h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Nous travaillons main dans la main avec des producteurs engagés pour une qualité
          constante, une traçabilité totale et un commerce réellement responsable.
        </p>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
          <h3 className="font-semibold">Qualité & fraîcheur</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Tri, calibrage et chaîne du froid contrôlée.</p>
        </div>
        <div className="p-5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
          <h3 className="font-semibold">Traçabilité</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Parcelles identifiées, lots suivis du champ au client.</p>
        </div>
        <div className="p-5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
          <h3 className="font-semibold">Durabilité</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Bonnes pratiques agricoles et respect des communautés.</p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-semibold text-lg">Certifications (exemples)</h3>
        <ul className="mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <li className="p-3 rounded-md bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">EU Organic/BIO</li>
          <li className="p-3 rounded-md bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">GlobalG.A.P. / GRASP</li>
          <li className="p-3 rounded-md bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">HACCP</li>
        </ul>
        <p className="mt-3 text-xs text-gray-500">Les certificats officiels seront mis en ligne dès réception.</p>
      </div>
    </section>
  );
}



