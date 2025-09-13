export function Features() {
  const items = [
    { title: 'Qualité export', text: 'Sélection rigoureuse, tri et calibrage, chaîne du froid maitrisée.' },
    { title: 'Traçabilité', text: 'Lots identifiés du champ au client, conformité documentaire.' },
    { title: 'Capacité', text: 'Volumes réguliers et flexibles selon saison et variétés.' },
    { title: 'Logistique', text: 'Incoterms variés, partenaires fiables, délais optimisés.' },
  ];
  return (
    <section className="py-14 bg-white/5">
      <div className="container-section grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it) => (
          <div key={it.title} className="p-6 rounded-xl border border-white/10">
            <h4 className="font-semibold text-brand-yellow">{it.title}</h4>
            <p className="mt-2 text-sm text-gray-300">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}



