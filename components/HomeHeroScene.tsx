'use client';

import { useEffect, useRef } from 'react';

type Point3 = { x: number; y: number; z: number; phase: number };
type Point2 = { x: number; y: number; z: number; glow: number };

/** Original canvas scene: an interactive system globe with star trails and light filaments. */
export function HomeHeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    const hero = canvas?.closest<HTMLElement>('.home-hero');
    if (!canvas || !context || !hero) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileDevice = window.innerWidth < 700;
    const pointCount = mobileDevice ? 56 : 88;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const points: Point3[] = Array.from({ length: pointCount }, (_, i) => {
      const y = 1 - (i / (pointCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      return { x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius, phase: (i * 0.618) % 1 };
    });

    const edges: Array<[number, number, number]> = [];
    for (let i = 0; i < points.length; i += 1) {
      const nearest = points.map((point, j) => ({ j, distance: (points[i].x - point.x) ** 2 + (points[i].y - point.y) ** 2 + (points[i].z - point.z) ** 2 }))
        .filter((item) => item.j !== i)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 2);
      nearest.forEach(({ j, distance }) => { if (j > i) edges.push([i, j, distance]); });
    }

    const pointer = { x: 0, y: 0, active: false };
    const pulse = { x: 0, y: 0, start: -10000 };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let timer = 0;
    let started = performance.now();
    let scrollProgress = 0;
    let sceneVisible = false;
    let themeObserver: MutationObserver | null = null;
    let sceneObserver: IntersectionObserver | null = null;
    let lightTheme = document.documentElement.dataset.theme === 'light';

    const resize = () => {
      const bounds = hero.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, width < 700 ? 0.72 : 0.9);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const pointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };
    const pointerLeave = () => { pointer.active = false; };
    const pointerDown = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pulse.x = event.clientX - bounds.left;
      pulse.y = event.clientY - bounds.top;
      pulse.start = performance.now();
    };
    const updateScroll = () => {
      const bounds = hero.getBoundingClientRect();
      scrollProgress = Math.max(0, Math.min(1, -bounds.top / Math.max(bounds.height, 1)));
      hero.style.setProperty('--hero-scene-progress', scrollProgress.toFixed(3));
      schedule();
    };
    const schedule = () => {
      if (!frame && !timer && (sceneVisible || reducedMotion.matches) && !document.hidden) frame = window.requestAnimationFrame(draw);
    };

    const draw = (now: number) => {
      frame = 0;
      const elapsed = (now - started) / 1000;
      const still = reducedMotion.matches;
      context.clearRect(0, 0, width, height);
      if (!width || !height) return;
      const mobile = width < 700;
      context.save();
      const cx = width * (mobile ? 0.5 : 0.74);
      const cy = height * (mobile ? 0.69 : 0.51);
      const radius = Math.min(width * (mobile ? 0.42 : 0.315), height * (mobile ? 0.27 : 0.38), mobile ? 250 : 400);
      const motion = still ? 0 : elapsed;
      const tiltX = (pointer.active && !still ? (pointer.y / height - 0.5) * 0.22 : 0) + 0.05;
      const tiltY = (pointer.active && !still ? (pointer.x / width - cx / width) * 0.3 : 0) + (still ? 0 : Math.sin(motion * 0.17) * 0.035);
      const rotation = motion * 0.075 + scrollProgress * 0.64;
      const projected: Point2[] = points.map((point) => {
        const x1 = point.x * Math.cos(rotation) - point.z * Math.sin(rotation);
        const z1 = point.x * Math.sin(rotation) + point.z * Math.cos(rotation);
        const y2 = point.y * Math.cos(tiltX) - z1 * Math.sin(tiltX);
        const z2 = point.y * Math.sin(tiltX) + z1 * Math.cos(tiltX);
        const x3 = x1 * Math.cos(tiltY) - z2 * Math.sin(tiltY);
        const z3 = x1 * Math.sin(tiltY) + z2 * Math.cos(tiltY);
        const perspective = 1 / (1.55 - z3 * 0.38);
        return { x: cx + x3 * radius * perspective, y: cy + y2 * radius * perspective, z: z3, glow: (Math.sin(motion * 1.45 + point.phase * Math.PI * 2) + 1) / 2 };
      });

      // Soft nebula bloom under the network globe.
      const bloom = context.createRadialGradient(cx, cy, radius * 0.04, cx, cy, radius * 1.55);
      bloom.addColorStop(0, lightTheme ? 'rgba(91,43,255,.2)' : 'rgba(71,205,239,.19)');
      bloom.addColorStop(0.35, lightTheme ? 'rgba(209,61,184,.18)' : 'rgba(119,111,255,.10)');
      bloom.addColorStop(1, 'rgba(51,112,205,0)');
      context.fillStyle = bloom;
      context.beginPath();
      context.arc(cx, cy, radius * 1.55, 0, Math.PI * 2);
      context.fill();

      // Long, luminous strands curve through and around the constellation.
      const strandCount = lightTheme ? 14 : 11;
      for (let strand = 0; strand < strandCount; strand += 1) {
        const phase = strand / strandCount * Math.PI * 2 + motion * (still ? 0 : 0.045) + scrollProgress * 1.1;
        const orbit = radius * (0.92 + (strand % 4) * 0.14);
        const startX = lightTheme ? cx + Math.cos(phase) * radius * 0.04 : cx + Math.cos(phase) * orbit * 1.85;
        const startY = lightTheme ? cy + Math.sin(phase) * radius * 0.04 : cy + Math.sin(phase * 0.77) * orbit * 1.08;
        const endX = cx + Math.cos(phase + (lightTheme ? 0 : 2.1)) * orbit * (lightTheme ? 1.8 : 1.75);
        const endY = cy + Math.sin(phase * (lightTheme ? 0.72 : 0.77) + (lightTheme ? 0 : 2.5)) * orbit * (lightTheme ? 1.4 : 1.22);
        const bend = Math.sin(phase + motion * 0.2) * radius * 0.54;
        const gradient = context.createLinearGradient(startX, startY, endX, endY);
        const colors = lightTheme
          ? strand % 2 === 0
            ? ['rgba(91,43,255,.72)', 'rgba(91,43,255,.48)', 'rgba(209,61,184,0)']
            : ['rgba(255,255,255,.92)', 'rgba(91,43,255,.56)', 'rgba(209,61,184,0)']
          : strand % 3 === 0
            ? ['rgba(114,232,255,0)', 'rgba(137,233,255,.74)', 'rgba(114,232,255,0)']
            : strand % 3 === 1
              ? ['rgba(167,143,255,0)', 'rgba(167,143,255,.56)', 'rgba(167,143,255,0)']
              : ['rgba(101,255,213,0)', 'rgba(101,255,213,.42)', 'rgba(101,255,213,0)'];
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(0.5, colors[1]);
        gradient.addColorStop(1, colors[2]);
        context.beginPath();
        context.moveTo(startX, startY);
        context.bezierCurveTo(cx - bend, cy + bend * 0.65, cx + bend, cy - bend, endX, endY);
        context.strokeStyle = gradient;
        context.lineWidth = lightTheme ? strand % 5 === 0 ? 2 : 1.15 : strand % 5 === 0 ? 2 : 1;
        context.shadowColor = lightTheme ? strand % 2 === 0 ? '#5b2bff' : '#d13db8' : strand % 3 === 1 ? '#a78bfa' : '#73e0ff';
        context.shadowBlur = strand % 4 === 0 ? lightTheme ? 9 : 7 : 0;
        context.stroke();
      }
      context.shadowBlur = 0;

      // Three tilted orbital traces frame the shell and make the scene read at a glance.
      for (let ring = 0; ring < 3; ring += 1) {
        context.save();
        context.translate(cx, cy);
        context.rotate((ring - 1) * 0.48 + motion * (still ? 0 : (ring % 2 ? -0.025 : 0.035)) + scrollProgress * (ring - 1) * 0.58);
        context.scale(1, ring === 1 ? 0.32 : 0.55);
        const ringRadius = radius * (1.22 + ring * 0.15);
        const ringGradient = context.createLinearGradient(-ringRadius, 0, ringRadius, 0);
        ringGradient.addColorStop(0, lightTheme ? 'rgba(91,43,255,0)' : 'rgba(117,224,255,0)');
        ringGradient.addColorStop(0.23, lightTheme ? 'rgba(91,43,255,.2)' : 'rgba(117,224,255,.1)');
        ringGradient.addColorStop(0.52, lightTheme
          ? ring === 1 ? 'rgba(209,61,184,.72)' : 'rgba(91,43,255,.76)'
          : ring === 1 ? 'rgba(179,151,255,.56)' : 'rgba(117,224,255,.58)');
        ringGradient.addColorStop(0.8, lightTheme ? 'rgba(209,61,184,.22)' : 'rgba(117,224,255,.12)');
        ringGradient.addColorStop(1, lightTheme ? 'rgba(209,61,184,0)' : 'rgba(117,224,255,0)');
        context.beginPath();
        context.arc(0, 0, ringRadius, ring * 0.7, Math.PI * 2 + ring * 0.7);
        context.strokeStyle = ringGradient;
        context.lineWidth = lightTheme ? ring === 1 ? 1.9 : 1.5 : ring === 1 ? 1.4 : 1;
        context.shadowColor = lightTheme ? ring === 1 ? '#d13db8' : '#5b2bff' : ring === 1 ? '#b39cff' : '#79e8ff';
        context.shadowBlur = lightTheme ? ring === 1 ? 16 : 11 : ring === 1 ? 10 : 7;
        context.stroke();
        context.restore();
      }
      context.shadowBlur = 0;

      // Spiral arms echo orbital paths, with star dust that drifts toward the center.
      const dustCount = mobile ? 34 : 62;
      for (let i = 0; i < dustCount; i += 1) {
        const arm = i % 3;
        const t = ((i * 0.61803398875) % 1);
        const distance = radius * (0.08 + Math.pow(t, 0.83) * 1.25);
        const angle = arm * Math.PI * 2 / 3 + t * 7.4 - motion * (still ? 0 : 0.09) + Math.sin(i * 12.17) * 0.11;
        const x = cx + Math.cos(angle) * distance * 1.22;
        const y = cy + Math.sin(angle) * distance * 0.65;
        const twinkle = (Math.sin(motion * 1.9 + i * 3.13) + 1) / 2;
        const size = (i % 29 === 0 ? 1.8 : 0.55) + twinkle * 0.8;
        context.globalAlpha = 0.18 + twinkle * (i % 29 === 0 ? 0.8 : 0.35);
        context.fillStyle = lightTheme
          ? i % 5 === 0 ? '#5b2bff' : i % 7 === 0 ? '#d13db8' : '#8144ef'
          : i % 5 === 0 ? '#c7b7ff' : i % 7 === 0 ? '#9ff4dc' : '#a9edff';
        context.beginPath();
        context.arc(x, y, size, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;

      // Network shell: near-side connections glow, far-side connections recede.
      edges.forEach(([a, b, distance], index) => {
        const p1 = projected[a];
        const p2 = projected[b];
        const depth = Math.max(0.08, (p1.z + p2.z + 2) / 4);
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.strokeStyle = index % 11 === 0
          ? lightTheme ? `rgba(91,43,255,${0.13 + depth * 0.3})` : `rgba(166,150,255,${0.12 + depth * 0.35})`
          : lightTheme ? `rgba(209,61,184,${0.08 + depth * 0.2})` : `rgba(116,221,246,${0.035 + depth * 0.31})`;
        context.lineWidth = 0.38 + depth * 0.55;
        context.stroke();
      });

      projected.forEach((point, index) => {
        const size = (index % 19 === 0 ? 2.4 : 0.7) + point.glow * (index % 19 === 0 ? 1.4 : 0.55);
        const alpha = lightTheme ? 0.34 + Math.max(0, point.z) * 0.58 + point.glow * 0.08 : 0.2 + Math.max(0, point.z) * 0.63 + point.glow * 0.14;
        context.globalAlpha = alpha;
        context.fillStyle = lightTheme
          ? index % 13 === 0 ? '#5b2bff' : '#7943c8'
          : index % 13 === 0 ? '#d6c9ff' : '#a4edff';
        context.shadowColor = lightTheme ? index % 13 === 0 ? '#5b2bff' : '#d13db8' : index % 13 === 0 ? '#a891ff' : '#72e1ff';
        context.shadowBlur = index % 19 === 0 ? 6 : 0;
        context.beginPath();
        context.arc(point.x, point.y, size, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
      context.shadowBlur = 0;

      // The core breathes and reacts to nearby pointer movement.
      const pointerDistance = pointer.active ? Math.hypot(pointer.x - cx, pointer.y - cy) : radius * 3;
      const coreBoost = Math.max(0, 1 - pointerDistance / (radius * 1.5));
      const coreRadius = radius * (0.035 + coreBoost * 0.012 + (still ? 0 : Math.sin(motion * 1.4) * 0.004));
      const coreGlow = context.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.28);
      coreGlow.addColorStop(0, 'rgba(238,255,255,.98)');
      coreGlow.addColorStop(0.045, lightTheme ? 'rgba(91,43,255,.96)' : 'rgba(146,242,255,.94)');
      coreGlow.addColorStop(0.2, lightTheme ? 'rgba(209,61,184,.4)' : 'rgba(98,215,255,.28)');
      coreGlow.addColorStop(1, 'rgba(98,215,255,0)');
      context.fillStyle = coreGlow;
      context.beginPath();
      context.arc(cx, cy, radius * 0.28, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = '#f3ffff';
      context.shadowColor = lightTheme ? '#5b2bff' : '#8cecff';
      context.shadowBlur = 24;
      context.beginPath();
      context.arc(cx, cy, Math.max(3, coreRadius), 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;

      // A pointer click sends a visible wave through the full scene.
      const pulseAge = (now - pulse.start) / 1000;
      if (pulseAge >= 0 && pulseAge < 1.4) {
        const progress = pulseAge / 1.4;
        context.beginPath();
        context.arc(pulse.x, pulse.y, progress * Math.max(width, height) * 0.78, 0, Math.PI * 2);
        context.strokeStyle = lightTheme ? `rgba(209,61,184,${(1 - progress) * 0.58})` : `rgba(130,230,255,${(1 - progress) * 0.52})`;
        context.lineWidth = 1.2 + (1 - progress) * 2.2;
        context.shadowColor = lightTheme ? '#d13db8' : '#72e0ff';
        context.shadowBlur = 16;
        context.stroke();
        context.shadowBlur = 0;
      }

      if (pointer.active) {
        const influence = radius * 0.38;
        projected.forEach((point) => {
          const distance = Math.hypot(point.x - pointer.x, point.y - pointer.y);
          if (distance > influence) return;
          const strength = 1 - distance / influence;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(pointer.x, pointer.y);
          context.strokeStyle = lightTheme ? `rgba(91,43,255,${strength * 0.24})` : `rgba(153,242,255,${strength * 0.18})`;
          context.lineWidth = 0.5 + strength;
          context.stroke();
        });
      }
      if (!mobile) {
        context.globalCompositeOperation = 'destination-in';
        const feather = context.createLinearGradient(0, 0, width, 0);
        feather.addColorStop(0, 'rgba(255,255,255,0)');
        feather.addColorStop(0.42, 'rgba(255,255,255,0)');
        feather.addColorStop(0.6, 'rgba(255,255,255,1)');
        feather.addColorStop(1, 'rgba(255,255,255,1)');
        context.fillStyle = feather;
        context.fillRect(0, 0, width, height);
        context.globalCompositeOperation = 'source-over';
      }
      context.restore();

      if (!still && sceneVisible && !document.hidden) {
        timer = window.setTimeout(() => {
          timer = 0;
          if (sceneVisible && !document.hidden) frame = window.requestAnimationFrame(draw);
        }, mobile ? 1000 / 12 : 1000 / 16);
      }
    };

    const themeTarget = document.documentElement;
    themeObserver = new MutationObserver(() => { lightTheme = themeTarget.dataset.theme === 'light'; schedule(); });
    themeObserver.observe(themeTarget, { attributes: true, attributeFilter: ['data-theme'] });
    const resizeObserver = new ResizeObserver(resize);
    sceneObserver = new IntersectionObserver(([entry]) => {
      sceneVisible = entry.isIntersecting;
      if (sceneVisible) schedule();
      else {
        if (frame) window.cancelAnimationFrame(frame);
        if (timer) window.clearTimeout(timer);
        frame = 0; timer = 0;
      }
    }, { threshold: 0 });
    sceneObserver.observe(hero);
    resizeObserver.observe(hero);
    hero.addEventListener('pointermove', pointerMove);
    hero.addEventListener('pointerleave', pointerLeave);
    hero.addEventListener('pointerdown', pointerDown);
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', resize);
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (frame) window.cancelAnimationFrame(frame);
        if (timer) window.clearTimeout(timer);
        frame = 0; timer = 0;
      } else schedule();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', schedule);
    resize();
    updateScroll();
    schedule();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (timer) window.clearTimeout(timer);
      resizeObserver.disconnect();
      sceneObserver?.disconnect();
      themeObserver?.disconnect();
      hero.removeEventListener('pointermove', pointerMove);
      hero.removeEventListener('pointerleave', pointerLeave);
      hero.removeEventListener('pointerdown', pointerDown);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', schedule);
      hero.style.removeProperty('--hero-scene-progress');
    };
  }, []);

  return <canvas className="home-hero-canvas" ref={canvasRef} aria-hidden="true" />;
}
