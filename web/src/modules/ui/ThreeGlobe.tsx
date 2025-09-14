import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type ThreeGlobeProps = {
  className?: string;
  pointsUrl: string; // URL d'un JSON { points: [{x:number, y:number}, ...] }
  color?: string;
  radius?: number; // rayon en unités 3D
  height?: number; // hauteur CSS du canvas
  autoRotate?: boolean;
  rotateSpeed?: number; // radians/sec
};

export default function ThreeGlobe({
  className,
  pointsUrl,
  color = '#9aa3b2',
  radius = 100,
  height = 500,
  autoRotate = true,
  rotateSpeed = 0.25,
}: ThreeGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);
    camera.position.set(0, 0, radius * 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    let last = performance.now();

    const onResize = () => {
      const width = container.clientWidth || 600;
      const h = height;
      renderer.setSize(width, h, false);
      camera.aspect = width / h;
      camera.updateProjectionMatrix();
    };
    onResize();

    window.addEventListener('resize', onResize);

    // Lumière douce pour un léger relief si nécessaire
    const light = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(light);

    let disposed = false;

    const loadPoints = async () => {
      try {
        const res = await fetch(pointsUrl, { cache: 'force-cache' });
        const json = await res.json();
        const pts: Array<{ x: number; y: number }> = json.points || [];
        if (!pts.length) return;

        // Normalise le plan equirectangulaire vers [0,1]
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        for (const p of pts) {
          if (p.x < minX) minX = p.x;
          if (p.x > maxX) maxX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.y > maxY) maxY = p.y;
        }
        const spanX = Math.max(1, maxX - minX);
        const spanY = Math.max(1, maxY - minY);

        const positions = new Float32Array(pts.length * 3);
        let i = 0;
        for (const p of pts) {
          const u = (p.x - minX) / spanX; // 0..1 → lon
          const v = (p.y - minY) / spanY; // 0..1 → lat
          const lon = (u - 0.5) * Math.PI * 2; // -PI..PI
          const lat = (0.5 - v) * Math.PI; // -PI/2..PI/2
          const cl = Math.cos(lat);
          const x = radius * cl * Math.cos(lon);
          const y = radius * Math.sin(lat);
          const z = radius * cl * Math.sin(lon);
          positions[i++] = x;
          positions[i++] = y;
          positions[i++] = z;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.computeBoundingSphere();

        const material = new THREE.PointsMaterial({
          color: new THREE.Color(color),
          size: Math.max(1.2, radius / 120),
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.95,
        });

        const cloud = new THREE.Points(geometry, material);
        root.add(cloud);
      } catch {
        // ignore
      }
    };

    loadPoints();

    const animate = () => {
      const now = performance.now();
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      if (autoRotate) {
        root.rotation.y += rotateSpeed * dt;
      }
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      disposed = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [pointsUrl, color, radius, height, autoRotate, rotateSpeed]);

  return <div ref={containerRef} className={className} style={{ height }} />;
}


nents
