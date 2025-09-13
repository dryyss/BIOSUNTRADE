import { useEffect, useRef, useState } from 'react';
import { LazyBg } from '../ui/LazyBg';

type ParallaxFruitProps = {
  image: string;
  title: string;
  text: string;
  reverse?: boolean;
};

export function ParallaxFruit({ image, title, text, reverse }: ParallaxFruitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      // Parallax un peu plus prononcé
      const offset = Math.min(Math.max((window.innerHeight - rect.top) / 4.5, -60), 60);
      el.style.setProperty('--parallax', `${reverse ? -offset : offset}px`);
      // fade out progressivement quand l'élément sort de l'écran
      const center = rect.top + rect.height / 2;
      const distanceToCenter = Math.abs(center - window.innerHeight / 2);
      const maxDistance = Math.max(window.innerHeight, rect.height);
      const alpha = 1 - Math.min(distanceToCenter / (maxDistance * 0.8), 1);
      setVisible(alpha);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reverse]);

  return (
    <section className="py-24">
      <div ref={ref} className={`container-section grid md:grid-cols-2 gap-12 items-center`} style={{ opacity: visible }}>
        <div className={`${reverse ? 'md:order-2' : ''} rounded-3xl overflow-hidden border border-white/10 shadow-xl`} style={{ transform: 'translateY(var(--parallax))' }}>
          <LazyBg src={image} className="aspect-[16/9] bg-cover bg-center" />
        </div>
        <div className={`${reverse ? 'md:order-1' : ''}`}>
          <h3 className="text-3xl md:text-4xl font-extrabold text-brand-yellow">{title}</h3>
          <p className="mt-5 text-base md:text-lg text-gray-300 leading-relaxed">{text}</p>
        </div>
      </div>
    </section>
  );
}



