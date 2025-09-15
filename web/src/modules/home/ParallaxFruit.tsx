import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyBg } from '../ui/LazyBg';

type ParallaxFruitProps = {
  image: string;
  title: string;
  text: string;
  text2?: string;
  to?: string;
  reverse?: boolean;
  eager?: boolean;
};

export function ParallaxFruit({ image, title, text, text2, reverse, eager, to }: ParallaxFruitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      // Parallax modéré
      const offset = Math.min(Math.max((window.innerHeight - rect.top) / 6, -40), 40);
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
    <section className="py-20">
      <div ref={ref} className={`container-section grid md:grid-cols-2 gap-10 items-center`} style={{ opacity: visible }}>
        {to ? (
          <Link to={to} className={`${reverse ? 'md:order-2' : ''} rounded-3xl overflow-hidden border border-white/10 shadow-xl block focus:outline-none focus:ring-2 focus:ring-brand-green`} style={{ transform: 'translateY(var(--parallax))' }}>
            {eager ? (
              <img
                src={encodeURI(image)}
                alt={`${title} - Fruits exotiques export qualité professionnelle`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/3] w-full h-auto object-cover"
              />
            ) : (
              <LazyBg src={image} className="aspect-[4/3] bg-cover bg-center" />
            )}
          </Link>
        ) : (
          <div className={`${reverse ? 'md:order-2' : ''} rounded-3xl overflow-hidden border border-white/10 shadow-xl`} style={{ transform: 'translateY(var(--parallax))' }}>
            {eager ? (
              <img
                src={encodeURI(image)}
                alt={`${title} - Fruits exotiques export qualité professionnelle`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/3] w-full h-auto object-cover"
              />
            ) : (
              <LazyBg src={image} className="aspect-[4/3] bg-cover bg-center" />
            )}
          </div>
        )}
        <div className={`${reverse ? 'md:order-1' : ''}`}>
          {to ? (
            <Link to={to} className="text-3xl md:text-4xl font-extrabold text-brand-yellow hover:underline">
              {title}
            </Link>
          ) : (
            <h3 className="text-3xl md:text-4xl font-extrabold text-brand-yellow">{title}</h3>
          )}
          <p className="mt-4 text-base md:text-lg text-gray-300 leading-relaxed">{text}</p>
          {text2 && <p className="mt-4 text-base md:text-lg text-gray-300 leading-relaxed">{text2}</p>}
          {to && (
            <Link to={to} className="inline-block mt-5 text-sm font-semibold text-brand-yellow hover:underline">Voir le détail →</Link>
          )}
        </div>
      </div>
    </section>
  );
}



