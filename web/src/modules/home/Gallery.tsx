import { useEffect, useState } from 'react';
import { Product, loadProducts } from '../../data/products';

export function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    loadProducts().then((list: Product[]) => {
      // uniquement les cover 2
      const covers2 = list
        .map((p) => p.secondaryCover)
        .filter((src): src is string => !!src);
      setImages(covers2);
    });
  }, []);
  return (
    <section className="py-14">
      <div className="container-section grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <div key={src + i} className="rounded-xl overflow-hidden border border-white/10">
            <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url("${src}")` }} />
          </div>
        ))}
      </div>
    </section>
  );
}



