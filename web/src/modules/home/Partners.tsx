export function Partners() {
  const logos = ['Partner A', 'Partner B', 'Partner C', 'Partner D'];
  return (
    <section className="py-12 bg-white/5">
      <div className="container-section">
        <h3 className="text-2xl font-extrabold text-brand-yellow">Partenaires</h3>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {logos.map((l) => (
            <div key={l} className="h-16 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/60">
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



