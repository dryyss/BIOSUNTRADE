export function Gallery() {
  const images = [
    '/fruits/fruit dela passion/granadilla-1-280x238.jpg',
    '/fruits/mangue/cover.jpg',
    '/fruits/gingembre/cover.jpg',
    '/fruits/citron-vert/cover.jpg',
    '/fruits/papaye/cover.jpg',
    '/fruits/grenade/cover.jpg',
  ];
  return (
    <section className="py-14">
      <div className="container-section grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <div key={src + i} className="rounded-xl overflow-hidden border border-white/10">
            <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
          </div>
        ))}
      </div>
    </section>
  );
}



