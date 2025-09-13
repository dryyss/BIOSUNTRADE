import { useState } from 'react';

const items = [
  { q: 'Quels incoterms proposez‑vous ?', a: 'EXW, FOB, CIF et DDP selon destination et volumes.' },
  { q: 'Quelles certifications ?', a: 'BIO (selon produits), GlobalG.A.P., HACCP. Preuves fournies sur demande.' },
  { q: 'Délais moyens ?', a: '48‑72h entre récolte et expédition, variable selon produit et saison.' },
  { q: 'Pays desservis ?', a: 'UE en priorité, ouverture sur MENA et marchés internationaux selon faisabilité.' },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-14">
      <div className="container-section max-w-3xl">
        <h3 className="text-2xl font-extrabold text-brand-yellow">FAQ</h3>
        <div className="mt-6 divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden">
          {items.map((it, i) => (
            <div key={it.q}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left px-5 py-4 font-semibold">
                {it.q}
              </button>
              {open === i && <p className="px-5 pb-5 text-sm text-white/80">{it.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



