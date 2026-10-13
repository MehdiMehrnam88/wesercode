'use client';

import { useEffect, useRef } from 'react';

const labels = ['MACHINE', 'DATA', 'PIPELINE', 'PROCESSING', 'DATABASE', 'ANALYSIS', 'DECISION', 'ACTION'];

export function MachineFlow({ ai = false }: { ai?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.dataset.active = 'all';
      return;
    }
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-flow-item]'));
    const io = new IntersectionObserver((entries) => {
      const ratio = entries[0]?.intersectionRatio ?? 0;
      const count = Math.max(0, Math.min(items.length, Math.round(ratio * (items.length + 1))));
      items.forEach((item, index) => item.classList.toggle('is-active', index < count));
    }, { threshold: Array.from({ length: 12 }, (_, i) => i / 12) });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const display = ai ? ['DATA', 'KNOWLEDGE', 'MODEL', 'TOOLS', 'WORKFLOW', 'HUMAN OVERSIGHT'] : labels;

  return <div ref={ref} className="flow-diagram" aria-label={ai ? 'AI flow: data to human oversight' : 'Machine data automation flow'}>
    {display.map((label, i) => (
      <div className="flow-step-wrap" key={label}>
        <div className="flow-step" data-flow-item>
          <span className="flow-index">{String(i + 1).padStart(2, '0')}</span>
          <span>{label}</span>
        </div>
        {i < display.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
      </div>
    ))}
  </div>;
}
