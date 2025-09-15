import { useEffect, useRef, useState } from 'react';

type LazyBgProps = { src: string; className?: string; style?: React.CSSProperties; manualOpacity?: boolean; title?: string };

export function LazyBg({ src, className, style, manualOpacity = false, title }: LazyBgProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const safe = encodeURI(src);
          // Définir immédiatement l'image pour éviter un flash/blank
          el.style.backgroundImage = `url("${safe}")`;
          const img = new Image();
          img.src = safe;
          img.onload = () => {
            setLoaded(true);
          };
          img.onerror = () => {
            // Fallback discret si l'image ne charge pas
            el.style.backgroundImage = 'radial-gradient(circle at 50% 50%, #333 0%, #111 60%)';
            setLoaded(true);
          };
          observer.disconnect();
        }
      });
    }, { rootMargin: '100px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  const opacityClasses = manualOpacity ? '' : (loaded ? 'opacity-100' : 'opacity-0');
  return (
    <div ref={ref} className={`${className ?? ''} ${opacityClasses} transition-opacity duration-500`} style={style} title={title} />
  );
}



