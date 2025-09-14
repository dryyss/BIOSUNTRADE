import { useEffect, useRef } from 'react';

type DotGlobeProps = {
  className?: string;
  dotColor?: string; // CSS color
  backgroundColor?: string; // CSS color (en dehors de la sphère)
  density?: number; // number of latitude lines
  speed?: number; // radians per second
  showContinents?: boolean;
  continentColor?: string;
  landMaskUrl?: string; // URL d'une carte equirectangulaire
  landThreshold?: number; // luminosité max pour considérer "terre"
  markers?: { lat: number; lon: number; label?: string }[];
  sizeFactor?: number; // fraction de la plus petite dimension
  hideWaterDots?: boolean; // n'afficher que les points de terre
  oceanColor?: string; // couleur des océans (sphère de fond)
};

export function DotGlobe({ className, dotColor = '#7CFC00', backgroundColor = 'transparent', density = 40, speed = 0.3, showContinents = true, continentColor = '#FDE047', landMaskUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1024px-World_map_-_low_resolution.svg.png', landThreshold = 200, markers = [], sizeFactor = 0.5, hideWaterDots = false, oceanColor }: DotGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const setSize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    const onResize = () => setSize();
    window.addEventListener('resize', onResize);

    const radius = () => Math.min(width, height) * sizeFactor;
    let t = 0;
    let lastNow: number | null = null;

    const points: { lat: number; lon: number }[] = [];
    const latLines = Math.max(10, density);
    const lonLines = latLines * 2;
    for (let i = 0; i <= latLines; i++) {
      const lat = -Math.PI / 2 + (i / latLines) * Math.PI;
      for (let j = 0; j < lonLines; j++) {
        const lon = (j / lonLines) * 2 * Math.PI;
        points.push({ lat, lon });
      }
    }

    // Masque de continents optionnel (image equirectangulaire)
    let landData: ImageData | null = null;
    let landW = 0;
    let landH = 0;
    let comparator: 'gt' | 'lt' = 'lt';

    const sampleBrightness = (latDeg: number, lonDeg: number) => {
      if (!landData || landW === 0 || landH === 0) return null;
      const latRad = (latDeg * Math.PI) / 180;
      const lonRad = (lonDeg * Math.PI) / 180;
      const x = Math.max(0, Math.min(landW - 1, Math.floor(((lonRad + Math.PI) / (2 * Math.PI)) * landW)));
      const y = Math.max(0, Math.min(landH - 1, Math.floor(((Math.PI / 2 - latRad) / Math.PI) * landH)));
      const idx = (y * landW + x) * 4;
      const rC = landData.data[idx];
      const gC = landData.data[idx + 1];
      const bC = landData.data[idx + 2];
      const aC = landData.data[idx + 3];
      if (aC === 0) return null;
      return (rC + gC + bC) / 3;
    };

    const loadMask = (url: string) =>
      new Promise<void>((resolve) => {
        if (!url) return resolve();
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.onload = () => {
          try {
            const off = document.createElement('canvas');
            off.width = img.naturalWidth || img.width;
            off.height = img.naturalHeight || img.height;
            const octx = off.getContext('2d');
            if (!octx) return resolve();
            octx.drawImage(img, 0, 0);
            landW = off.width;
            landH = off.height;
            landData = octx.getImageData(0, 0, landW, landH);
            // Calibrer automatiquement si le masque est inversé (clair/obscur)
            const landB = sampleBrightness(10, 20); // Afrique
            const waterB = sampleBrightness(0, -30); // Atlantique
            if (landB != null && waterB != null) {
              comparator = landB > waterB ? 'gt' : 'lt';
            }
          } finally {
            resolve();
          }
        };
        img.onerror = () => resolve();
        img.src = url;
      });

    // charger sans bloquer l'animation
    if (showContinents && landMaskUrl) {
      loadMask(landMaskUrl);
    }

    const isLand = (latRad: number, lonRad: number) => {
      if (landData && landW > 0 && landH > 0) {
        const x = Math.max(0, Math.min(landW - 1, Math.floor(((lonRad + Math.PI) / (2 * Math.PI)) * landW)));
        const y = Math.max(0, Math.min(landH - 1, Math.floor(((Math.PI / 2 - latRad) / Math.PI) * landH)));
        const idx = (y * landW + x) * 4;
        const r = landData.data[idx];
        const g = landData.data[idx + 1];
        const b = landData.data[idx + 2];
        const a = landData.data[idx + 3];
        if (a === 0) return false;
        const bright = (r + g + b) / 3;
        return comparator === 'gt' ? bright > landThreshold : bright < landThreshold;
      }
      return false;
    };

    function project(lat: number, lon: number, r: number) {
      // Coordonnées 3D sur la sphère
      const x3 = r * Math.cos(lat) * Math.cos(lon);
      const y3 = r * Math.sin(lat);
      const z3 = r * Math.cos(lat) * Math.sin(lon);
      // Rotation autour de l'axe Y (longitudes)
      const rot = t;
      const xRot = x3 * Math.cos(rot) + z3 * Math.sin(rot);
      const zRot = -x3 * Math.sin(rot) + z3 * Math.cos(rot);
      // Perspective simple basée sur la profondeur
      const depth = zRot / r; // [-1, 1]
      const scale = 0.95 + Math.max(0, depth) * 0.15; // léger grossissement côté avant
      const x2 = xRot * scale;
      const y2 = -y3 * scale; // inverser Y pour canvas
      const front = depth > 0;
      return { x: width / 2 + x2, y: height / 2 + y2, front };
    }

    const draw = (now?: number) => {
      // reset
      ctx.clearRect(0, 0, width, height);
      if (backgroundColor && backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      const r = radius();

      // sphère (océan) en dégradé pour effet 3D
      const grad = ctx.createRadialGradient(
        width / 2 - r * 0.35,
        height / 2 - r * 0.35,
        r * 0.2,
        width / 2,
        height / 2,
        r
      );
      const topOcean = oceanColor ?? 'rgba(14, 165, 233, 0.35)';
      const edgeOcean = oceanColor ? oceanColor : 'rgba(2, 6, 23, 0.9)';
      grad.addColorStop(0, topOcean);
      grad.addColorStop(1, edgeOcean);
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.stroke();

      // points
      const baseSize = Math.max(1, r / 120);
      for (const p of points) {
        const { x, y, front } = project(p.lat, p.lon, r);
        const land = showContinents ? isLand(p.lat, p.lon) : false;
        if (hideWaterDots && !land) continue; // masquer les points d'océan si demandé
        ctx.beginPath();
        const color = land ? continentColor : dotColor;
        const alphaBack = '44';
        ctx.fillStyle = front ? color : `${color}${alphaBack}`;
        const size = front ? baseSize * (land ? 1.15 : 1) : baseSize * 0.6 * (land ? 1.1 : 1);
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // marqueurs (pays d'origine)
      for (const m of markers) {
        const latRad = (m.lat * Math.PI) / 180;
        const lonRad = (m.lon * Math.PI) / 180;
        const { x, y, front } = project(latRad, lonRad, r);
        if (!front) continue; // masquer les marqueurs côté arrière
        ctx.beginPath();
        ctx.fillStyle = '#22c55e';
        ctx.strokeStyle = 'rgba(255,255,255,0.9)';
        ctx.lineWidth = 1.2;
        ctx.arc(x, y, Math.max(2, r / 90), 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      if (typeof now === 'number') {
        if (lastNow == null) lastNow = now;
        const dt = Math.min(0.05, Math.max(0, (now - lastNow) / 1000));
        lastNow = now;
        t += speed * dt;
      } else {
        t += speed * 0.016;
      }
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [dotColor, backgroundColor, density, speed, sizeFactor, hideWaterDots, oceanColor]);

  return (
    <canvas ref={canvasRef} className={className} />
  );
}
