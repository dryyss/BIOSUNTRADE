import { useEffect, useRef, useState } from 'react';

type LazyBgProps = { src: string; className?: string; style?: React.CSSProperties };

export function LazyBg({ src, className, style }: LazyBgProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            const safe = encodeURI(src);
            el.style.backgroundImage = `url("${safe}")`;
            setLoaded(true);
          };
          observer.disconnect();
        }
      });
    }, { rootMargin: '200px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div ref={ref} className={`${className ?? ''} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} style={style} />
  );
}



