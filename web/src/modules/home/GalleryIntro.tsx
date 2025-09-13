type GalleryIntroProps = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export function GalleryIntro({
  title = 'Notre savoir‑faire en images',
  subtitle =
    'Découvrez la fraîcheur, la diversité et le soin apporté à nos fruits. Chaque expédition est préparée avec exigence pour une qualité constante et des délais maîtrisés.',
  className,
}: GalleryIntroProps) {
  return (
    <section className={`container-section py-12 ${className ?? ''}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-brand-yellow">{title}</h2>
        <p className="mt-3 text-white/80">{subtitle}</p>
      </div>
    </section>
  );
}


