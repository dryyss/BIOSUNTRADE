export function Stats() {
  const stats = [
    { k: '48h', v: 'Harvest-to-ship' },
    { k: '6', v: 'Produits actifs' },
    { k: '12+', v: 'Pays desservis' },
    { k: '100%', v: 'Traçabilité' },
  ];
  return (
    <section className="py-12">
      <div className="container-section grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.v} className="p-6 rounded-xl border border-white/10 bg-white/5">
            <div className="text-3xl font-extrabold text-brand-yellow">{s.k}</div>
            <div className="mt-1 text-sm text-white/70">{s.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}



