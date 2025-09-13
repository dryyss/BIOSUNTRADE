import { SparklesIcon, IdentificationIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
export function Values() {
  return (
    <section id="values" className="container-section py-16">
      <div className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold">Qualité qui se goûte</h2>
        <p className="mt-4 text-gray-300">
          Nos fruits sont cueillis à maturité physiologique, jamais « forçés » au gaz et sans
          traitement post‑récolte. Nous privilégions de petites exploitations certifiées et un
          acheminement express pour préserver arômes et nutriments.
        </p>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <SparklesIcon className="h-6 w-6 text-brand-green" />
          <h3 className="mt-2 font-semibold">Qualité & fraîcheur</h3>
          <p className="mt-2 text-sm text-gray-300">Tri, calibrage et chaîne du froid maîtrisée.</p>
        </div>
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <IdentificationIcon className="h-6 w-6 text-brand-green" />
          <h3 className="mt-2 font-semibold">Traçabilité</h3>
          <p className="mt-2 text-sm text-gray-300">Parcelles identifiées, lots suivis du champ au client.</p>
        </div>
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <GlobeAltIcon className="h-6 w-6 text-brand-green" />
          <h3 className="mt-2 font-semibold">Durabilité</h3>
          <p className="mt-2 text-sm text-gray-300">Pratiques régénératives et respect des communautés.</p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-semibold text-lg">Certifications (exemples)</h3>
        <ul className="mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <li className="p-3 rounded-md bg-white/5 border border-white/10">EU Organic/BIO</li>
          <li className="p-3 rounded-md bg-white/5 border border-white/10">GlobalG.A.P. / GRASP</li>
          <li className="p-3 rounded-md bg-white/5 border border-white/10">HACCP</li>
        </ul>
        <p className="mt-3 text-xs text-gray-500">Les certificats officiels seront mis en ligne dès réception.</p>
      </div>
    </section>
  );
}



