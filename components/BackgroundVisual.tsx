'use client';

import { useEffect, useRef } from 'react';

export function BackgroundVisual({ locale }: { locale: 'de' | 'en' }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY * 0.08, 90);
        el.style.setProperty('--scene-y', `${y}px`);
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="hero-visual" aria-hidden="true">
    <div className="hero-grid" />
    <div className="node node-a" />
    <div className="node node-b" />
    <div className="node node-c" />
    <div className="node node-d" />
    <div className="node node-e" />
    <div className="hero-orbit orbit-a" />
    <div className="hero-orbit orbit-b" />
    <div className="hero-orbit orbit-c" />
    <div className="hero-core"><span>W</span></div>
    <div className="data-line line-a" />
    <div className="data-line line-b" />
    <div className="data-line line-c" />
    <div className="visual-caption"><span>{locale === 'de' ? 'DATEN' : 'DATA'}</span><span>SOFTWARE</span><span>{locale === 'de' ? 'AKTION' : 'ACTION'}</span></div>
  </div>;
}
