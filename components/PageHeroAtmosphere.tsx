'use client';

import { useEffect, useRef } from 'react';

type SceneKind = 'services' | 'process' | 'faq' | 'contact' | 'imprint' | 'privacy';
const focalPoints: Record<SceneKind, readonly [number, number]> = {
  services: [1190, 464], process: [1180, 450], faq: [1260, 445], contact: [1190, 407], imprint: [1160, 480], privacy: [1190, 465],
};

const hexRgb = (value: string) => {
  const hex = value.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i)?.[1];
  if (!hex) return [110, 95, 255] as const;
  const expanded = hex.length === 3 ? hex.split('').map((digit) => digit + digit).join('') : hex;
  return [0, 2, 4].map((index) => parseInt(expanded.slice(index, index + 2), 16)) as unknown as readonly [number, number, number];
};

export function PageHeroAtmosphere({ kind }: { kind: SceneKind }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement?.parentElement;
    const section = host?.closest('section');
    const context = canvas?.getContext('2d', { alpha: true, desynchronized: true });
    if (!canvas || !host || !section || !context) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const lowPower = saveData || window.matchMedia('(max-width: 700px)').matches;
    let width = 0;
    let height = 0;
    let scale = 1;
    let frame = 0;
    let timer = 0;
    let lastFrame = 0;
    let visible = true;
    let pointerX = .5;
    let pointerY = .5;
    let accent: readonly [number, number, number] = [91, 43, 255];
    let accent2: readonly [number, number, number] = [209, 61, 184];
    const particles: Array<{ x: number; y: number; z: number; r: number; phase: number }> = [];

    const color = (rgb: readonly number[], alpha: number) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      scale = Math.min(window.devicePixelRatio || 1, lowPower ? .72 : 1);
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      const style = getComputedStyle(section);
      accent = hexRgb(style.getPropertyValue('--accent'));
      accent2 = hexRgb(style.getPropertyValue('--accent-2'));
      let seed = 779;
      const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
      particles.length = 0;
      for (let index = 0; index < (lowPower ? 8 : 16); index += 1) {
        particles.push({ x: random(), y: random(), z: .24 + random() * .76, r: 1 + random() * 4.5, phase: random() * Math.PI * 2 });
      }
      draw(lastFrame);
    };

    const draw = (milliseconds: number) => {
      if (!width || !height) return;
      const time = milliseconds * .001;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';
      const sceneScale = Math.max(width / 1600, height / 900);
      const [sceneX, sceneY] = focalPoints[kind];
      const focusX = (sceneX * sceneScale - (1600 * sceneScale - width) / 2) + (pointerX - .5) * 22;
      const focusY = (sceneY * sceneScale - (900 * sceneScale - height) / 2) + (pointerY - .5) * 16;

      // Sparse, depth-scaled motes keep the rendered forms from sitting on a flat plane.
      for (const particle of particles) {
        const driftX = Math.sin(time * .22 + particle.phase) * 13 * particle.z;
        const driftY = Math.cos(time * .27 + particle.phase) * 9 * particle.z;
        const x = particle.x * width + driftX + (pointerX - .5) * 16 * particle.z;
        const y = particle.y * height + driftY + (pointerY - .5) * 12 * particle.z;
        const radius = particle.r * particle.z;
        context.fillStyle = color(particle.phase > Math.PI ? accent : accent2, .28 * particle.z);
        context.beginPath(); context.arc(x, y, radius * 1.8, 0, Math.PI * 2); context.fill();
        context.fillStyle = color([255, 255, 255], .72 * particle.z);
        context.beginPath(); context.arc(x, y, radius * .38, 0, Math.PI * 2); context.fill();
      }

      if (kind === 'services') {
        const sourceX = focusX;
        const sourceY = focusY;
        const coreGlow = context.createRadialGradient(sourceX, sourceY, 2, sourceX, sourceY, height * .34);
        coreGlow.addColorStop(0, color(accent2, .2));
        coreGlow.addColorStop(.18, color(accent, .12));
        coreGlow.addColorStop(1, color(accent, 0));
        context.fillStyle = coreGlow;
        context.beginPath(); context.arc(sourceX, sourceY, height * .34, 0, Math.PI * 2); context.fill();
        const pulse = 142 + Math.sin(time * .48) * 17;
        context.beginPath(); context.ellipse(sourceX, sourceY, pulse, pulse * .44, -.22, 0, Math.PI * 2);
        context.strokeStyle = color(accent2, .23); context.lineWidth = 1.4; context.shadowColor = color(accent2, .92); context.shadowBlur = 15; context.stroke();
        const strandCount = lowPower ? 14 : 28;
        context.lineCap = 'round';
        context.shadowColor = color(accent2, .48); context.shadowBlur = 6;
        for (let index = 0; index < strandCount; index += 1) {
          const p = index / Math.max(1, strandCount - 1);
          const spread = (p - .5) * height * 1.05;
          const sway = Math.sin(time * .34 + p * 8) * 22;
          const startX = sourceX + Math.cos(p * Math.PI * 4 + time * .1) * 48;
          const startY = sourceY + Math.sin(p * Math.PI * 4 + time * .1) * 48;
          const endX = sourceX + (p < .5 ? -1 : 1) * width * (.22 + Math.abs(p - .5) * .65);
          const endY = sourceY + spread;
          context.beginPath(); context.moveTo(startX, startY);
          context.bezierCurveTo(sourceX + sway, sourceY + spread * .12, endX - width * .16, endY - spread * .14, endX, endY);
          context.strokeStyle = color(index % 4 ? accent : accent2, .22 + (1 - Math.abs(p - .5) * 2) * .2); context.lineWidth = .8 + (1 - Math.abs(p - .5) * 2) * 1.35;
          context.stroke();
        }
        context.shadowBlur = 0;
      } else if (kind === 'process') {
        // Moving light beads follow a contracting helix through the process funnel.
        for (let strand = 0; strand < 2; strand += 1) {
          context.beginPath();
          for (let step = 0; step <= 72; step += 1) {
            const t = step / 72;
            const radius = (width * .31) * (1 - t) + 11;
            const angle = t * Math.PI * 7 + strand * Math.PI * 2 / 3 - time * .24;
            const x = focusX + Math.cos(angle) * radius;
            const y = height * (.17 + t * .69) + Math.sin(angle) * radius * .27;
            if (step === 0) context.moveTo(x, y); else context.lineTo(x, y);
          }
          context.strokeStyle = color(strand === 1 ? accent2 : accent, .22);
          context.lineWidth = strand === 1 ? 2.4 : 1.2;
          context.shadowColor = color(accent, .75); context.shadowBlur = 11; context.stroke();
        }
        context.shadowBlur = 0;
      } else if (kind === 'faq') {
        const glyphs = '01{}<>/AI';
        const columns = lowPower ? 5 : 9;
        context.font = '600 12px ui-monospace, monospace';
        for (let column = 0; column < columns; column += 1) {
          const x = width * (.56 + column / columns * .43);
          const speed = 22 + (column % 4) * 11;
          const y = (time * speed + column * 83) % (height + 120) - 60;
          context.fillStyle = color(column % 3 ? accent : accent2, .26);
          context.shadowColor = color(accent, .55); context.shadowBlur = 7;
          for (let line = 0; line < 5; line += 1) context.fillText(glyphs[(column * 3 + line * 5) % glyphs.length], x, y - line * 25);
        }
        context.shadowBlur = 0;
      } else if (kind === 'contact') {
        const route = context.createLinearGradient(width * .42, height * .68, width, height * .34);
        route.addColorStop(0, color(accent, 0)); route.addColorStop(.5, color(accent2, .74)); route.addColorStop(1, color(accent, .05));
        context.beginPath(); context.moveTo(width * .43, height * .76);
        context.bezierCurveTo(width * .55, height * .56, width * .63, height * .72, width * .72, height * .54);
        context.bezierCurveTo(width * .82, height * .34, width * .79, height * .63, width * .91, height * .38);
        context.strokeStyle = route; context.lineWidth = 2.2; context.setLineDash([2, 13]);
        context.lineDashOffset = -time * 20; context.shadowColor = color(accent2, .9); context.shadowBlur = 12; context.stroke(); context.setLineDash([]);
        for (let ring = 0; ring < 3; ring += 1) {
          const radius = 30 + ((time * 24 + ring * 34) % 110);
          context.beginPath(); context.ellipse(focusX, focusY, radius, radius * .42, -.2, 0, Math.PI * 2);
          context.strokeStyle = color(accent2, .23 * (1 - radius / 150)); context.lineWidth = 1.3; context.stroke();
        }
        context.shadowBlur = 0;
      } else {
        const radiusX = width * .28;
        const radiusY = height * .31;
        for (let orbit = 0; orbit < 4; orbit += 1) {
          const rotation = orbit * .48 + time * (orbit % 2 ? -.035 : .035);
          context.beginPath(); context.ellipse(focusX, focusY, radiusX - orbit * 28, radiusY - orbit * 17, rotation, .18, Math.PI * 1.82);
          context.strokeStyle = color(orbit % 2 ? accent2 : accent, .15 + orbit * .025);
          context.lineWidth = orbit === 0 ? 2 : .8; context.shadowColor = color(accent2, .65); context.shadowBlur = 9; context.stroke();
        }
        context.shadowBlur = 0;
      }
      context.globalCompositeOperation = 'source-over';
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || motionPreference.matches) return;
      const rect = section.getBoundingClientRect();
      pointerX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      pointerY = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    };
    const onPointerLeave = () => { pointerX = .5; pointerY = .5; };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || motionPreference.matches) return;
      lastFrame = now;
      draw(now);
      timer = window.setTimeout(() => {
        timer = 0;
        if (visible && !document.hidden && !motionPreference.matches) frame = requestAnimationFrame(tick);
      }, 1000 / (lowPower ? 10 : 18));
    };
    const start = () => { if (!frame && !timer && visible && !document.hidden && !motionPreference.matches) frame = requestAnimationFrame(tick); };
    const stop = () => { if (frame) cancelAnimationFrame(frame); if (timer) window.clearTimeout(timer); frame = 0; timer = 0; };
    const onVisibilityChange = () => { if (document.hidden) stop(); else start(); };
    const onMotionChange = () => { if (motionPreference.matches) { stop(); draw(lastFrame); } else start(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else stop(); });
    observer.observe(section);
    section.addEventListener('pointermove', onPointerMove, { passive: true });
    section.addEventListener('pointerleave', onPointerLeave, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    motionPreference.addEventListener('change', onMotionChange);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    start();

    return () => {
      stop();
      observer.disconnect(); resizeObserver.disconnect();
      section.removeEventListener('pointermove', onPointerMove); section.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      motionPreference.removeEventListener('change', onMotionChange);
    };
  }, [kind]);

  return <canvas ref={canvasRef} className={`page-hero-atmosphere page-hero-atmosphere-${kind}`} aria-hidden="true" />;
}
