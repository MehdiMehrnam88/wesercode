'use client';

import { useEffect, useRef } from 'react';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Scroll-scrubbed decorative skyline/orbit art for the existing home hero. */
export function SunsetSkylineHero() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const hero = field?.closest('.hero-with-scene') as HTMLElement | null;
    if (!hero) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const progress = reducedMotion.matches
        ? 1
        : clamp(-hero.getBoundingClientRect().top / Math.max(hero.offsetHeight, 1), 0, 1);
      hero.style.setProperty('--home-hero-scroll-progress', progress.toFixed(3));
    };

    const scheduleProgress = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', scheduleProgress, { passive: true });
    window.addEventListener('resize', scheduleProgress, { passive: true });
    reducedMotion.addEventListener('change', scheduleProgress);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', scheduleProgress);
      window.removeEventListener('resize', scheduleProgress);
      reducedMotion.removeEventListener('change', scheduleProgress);
      if (frame) window.cancelAnimationFrame(frame);
      hero.style.removeProperty('--home-hero-scroll-progress');
    };
  }, []);

  return (
    <div className="home-cosmic-field" ref={fieldRef} aria-hidden="true">
      <div className="home-cosmic-stars" data-parallax="0.2" />
      <svg className="home-cosmic-lines home-cosmic-lines-back" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice" data-parallax="0.06">
        <ellipse cx="650" cy="465" rx="520" ry="268" transform="rotate(-24 650 465)" />
        <ellipse cx="650" cy="465" rx="455" ry="220" transform="rotate(17 650 465)" />
        <path className="home-cosmic-underlay" d="M132 540C276 268 449 178 649 181s374 90 520 266" />
        <path className="home-cosmic-flow home-cosmic-scrub-path" pathLength="1" d="M132 540C276 268 449 178 649 181s374 90 520 266" />
        <path className="home-cosmic-underlay home-cosmic-underlay-secondary" d="M159 378c157 245 334 365 528 365s355-116 493-346" />
        <path className="home-cosmic-flow home-cosmic-flow-secondary home-cosmic-scrub-path" pathLength="1" d="M159 378c157 245 334 365 528 365s355-116 493-346" />
        <circle cx="288" cy="341" r="3" />
        <circle cx="1008" cy="302" r="2.5" />
        <circle cx="912" cy="681" r="3" />
      </svg>
      <svg className="home-cosmic-lines home-cosmic-lines-front" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice" data-parallax="0.16">
        <path className="home-cosmic-underlay" d="M418 751c18-105 79-192 175-257 93-63 198-96 316-99" />
        <path className="home-cosmic-scrub-path" pathLength="1" d="M418 751c18-105 79-192 175-257 93-63 198-96 316-99" />
        <path className="home-cosmic-underlay" d="M356 198c99 45 188 106 267 184 88 87 160 178 216 276" />
        <path className="home-cosmic-scrub-path" pathLength="1" d="M356 198c99 45 188 106 267 184 88 87 160 178 216 276" />
        <circle className="home-cosmic-node" cx="593" cy="494" r="5" />
        <circle className="home-cosmic-node home-cosmic-node-secondary" cx="912" cy="395" r="4" />
        <circle className="home-cosmic-node" cx="839" cy="658" r="3" />
      </svg>
    </div>
  );
}
