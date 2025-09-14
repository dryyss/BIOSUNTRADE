import { useEffect, useRef, useState } from 'react';
import { Product, loadProducts } from '../../data/products';

export function Carousel() {
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    loadProducts().then((list: Product[]) => {
      const all: string[] = [];
      for (const p of list) {
        const parts = [p.secondaryCover, p.couverture, p.treeImage, ...(p.gallery ?? [])]
          .filter((u): u is string => !!u)
          .map((u) => encodeURI(u));
        all.push(...parts);
      }
      // déduplique en conservant l'ordre
      const uniq = Array.from(new Set(all));
      // mélange
      for (let i = uniq.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [uniq[i], uniq[j]] = [uniq[j], uniq[i]];
      }
      setImages(uniq);
    });
  }, []);

  const total = images.length;

  useEffect(() => {
    if (!total) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 3000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [total]);

  if (!total) return null;

  return (
    <section className="py-16">
      <div className="container-section">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[16/7]">
          {images.map((src, i) => (
            <div
              key={src + i}
              className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url("${src}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


