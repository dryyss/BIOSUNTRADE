const months = ['JAN','FÉV','MAR','AVR','MAI','JUN','JUL','AOÛ','SEP','OCT','NOV','DÉC'];

type Line = { fruit: string; range: [number, number] };

const lines: Line[] = [
  { fruit: 'Fruits de la passion', range: [0, 11] },
  { fruit: 'Mangue', range: [9, 3] },
  { fruit: 'Gingembre', range: [0, 11] },
  { fruit: 'Citron vert', range: [2, 11] },
  { fruit: 'Papaye', range: [0, 11] },
  { fruit: 'Grenade', range: [8, 12] },
];

function isActive(idx: number, [start, end]: [number, number]) {
  if (end >= start) return idx >= start && idx <= end;
  // période chevauchante (ex: OCT->MAR)
  return idx >= start || idx <= end;
}

export function Availability() {
  return (
    <section className="py-14 bg-white/5">
      <div className="container-section">
        <h3 className="text-2xl font-extrabold text-brand-yellow">Disponibilité mensuelle</h3>
        <div className="mt-6 overflow-auto">
          <table className="min-w-[720px] w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-2 pr-4 font-semibold">Produit</th>
                {months.map((m) => (
                  <th key={m} className="px-2 py-2 text-center font-medium text-white/70">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.fruit} className="border-t border-white/10">
                  <td className="py-3 pr-4">{l.fruit}</td>
                  {months.map((_, i) => (
                    <td key={i} className="px-2 py-2">
                      <div className={`h-2 rounded-full ${isActive(i, l.range) ? 'bg-brand-green' : 'bg-white/10'}`} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}



