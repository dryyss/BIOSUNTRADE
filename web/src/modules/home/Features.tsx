import { ShieldCheckIcon, QueueListIcon, TruckIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';

export function Features() {
  const items = [
    { title: 'Qualité export', text: 'Sélection rigoureuse, tri et calibrage, chaîne du froid maitrisée.', icon: ShieldCheckIcon },
    { title: 'Traçabilité', text: 'Lots identifiés du champ au client, conformité documentaire.', icon: QueueListIcon },
    { title: 'Capacité', text: 'Volumes réguliers et flexibles selon saison et variétés.', icon: CubeTransparentIcon },
    { title: 'Logistique', text: 'Incoterms variés, partenaires fiables, délais optimisés.', icon: TruckIcon },
  ];
  return (
    <section className="py-14 bg-white/5">
      <div className="container-section grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.title} className="p-6 rounded-xl border border-white/10">
              <Icon className="h-6 w-6 text-brand-green" />
              <h4 className="mt-3 font-semibold text-brand-yellow">{it.title}</h4>
              <p className="mt-2 text-sm text-gray-300">{it.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}



