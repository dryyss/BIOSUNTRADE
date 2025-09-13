import { useEffect, useRef } from 'react';

type ParallaxFruitProps = {
  image: string;
  title: string;
  text: string;
  reverse?: boolean;
};

export function ParallaxFruit({ image, title, text, reverse }: ParallaxFruitProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = Math.min(Math.max((window.innerHeight - rect.top) / 6, -40), 40);
      el.style.setProperty('--parallax', `${reverse ? -offset : offset}px`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reverse]);

  return (
    <section className="py-16">
      <div ref={ref} className={`container-section grid md:grid-cols-2 gap-8 items-center`}>
        <div className={`${reverse ? 'md:order-2' : ''} rounded-2xl overflow-hidden border border-white/10`} style={{ transform: 'translateY(var(--parallax))' }}>
          <div className="aspect-[16/10] bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
        </div>
        <div className={`${reverse ? 'md:order-1' : ''}`}>
          <h3 className="text-2xl font-extrabold text-brand-yellow">{title}</h3>
          <p className="mt-4 text-gray-300 leading-relaxed">{text}</p>
        </div>
      </div>
    </section>
  );
}



