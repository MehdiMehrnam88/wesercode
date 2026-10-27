'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight CSS/SVG 3D-inspired signal sculpture.
 * Deliberately dependency-free; the decorative scene never intercepts input.
 */
export function ImmersiveSignalScene() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    const onMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 10;
      pointerY = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * -8;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const update = () => {
      frame = 0;
      currentX += (pointerX - currentX) * 0.09;
      currentY += (pointerY - currentY) * 0.09;
      root.style.setProperty('--signal-tilt-x', `${currentY.toFixed(2)}deg`);
      root.style.setProperty('--signal-tilt-y', `${currentX.toFixed(2)}deg`);
      if (Math.abs(pointerX - currentX) > 0.08 || Math.abs(pointerY - currentY) > 0.08) {
        frame = requestAnimationFrame(update);
      }
    };
    const onLeave = () => {
      pointerX = 0;
      pointerY = 0;
      if (!frame) frame = requestAnimationFrame(update);
    };
    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave, { passive: true });
    return () => {
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="immersive-signal-scene" aria-hidden="true">
      <div className="signal-aura signal-aura-one" />
      <div className="signal-aura signal-aura-two" />
      <div className="signal-sculpture">
        <div className="signal-ring signal-ring-one" />
        <div className="signal-ring signal-ring-two" />
        <div className="signal-ring signal-ring-three" />
        <div className="signal-globe">
          <span className="signal-globe-core" />
          <span className="signal-globe-latitude signal-globe-latitude-one" />
          <span className="signal-globe-latitude signal-globe-latitude-two" />
          <span className="signal-globe-longitude signal-globe-longitude-one" />
          <span className="signal-globe-longitude signal-globe-longitude-two" />
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index} className={`signal-particle signal-particle-${index + 1}`} />
          ))}
        </div>
        <div className="signal-data-panel signal-data-panel-top"><span /><span /><span /><i /><b /></div>
        <div className="signal-data-panel signal-data-panel-bottom"><span /><span /><span /><i /><i /><i /><i /><i /></div>
        <div className="signal-node signal-node-one" />
        <div className="signal-node signal-node-two" />
        <div className="signal-node signal-node-three" />
      </div>
      <div className="signal-scene-caption"><span>WESERCODE / SYSTEMS</span><span>01 — 04</span></div>
    </div>
  );
}
