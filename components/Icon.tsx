import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & { name: 'arrow' | 'check' | 'code' | 'globe' | 'brain' | 'phone' | 'link' | 'pulse' | 'spark' | 'menu' | 'sun' | 'moon' | 'mail' | 'map' | 'shield' | 'layers' | 'cpu' };

export function Icon({ name, ...props }: Props) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, ...props };
  switch (name) {
    case 'arrow': return <svg {...common}><path d="M5 12h13"/><path d="m13 6 6 6-6 6"/></svg>;
    case 'check': return <svg {...common}><path d="m5 12 4 4L19 6"/></svg>;
    case 'code': return <svg {...common}><path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m14 5-4 14"/></svg>;
    case 'globe': return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>;
    case 'brain': return <svg {...common}><path d="M9.5 4.2A3.2 3.2 0 0 0 6 7.3a3.6 3.6 0 0 0 .3 1.5 3.6 3.6 0 0 0-2.2 3.3A3.8 3.8 0 0 0 8 16h.3v1.2A2.8 2.8 0 0 0 11 20h1"/><path d="M14.5 4.2A3.2 3.2 0 0 1 18 7.3a3.6 3.6 0 0 1-.3 1.5 3.6 3.6 0 0 1 2.2 3.3A3.8 3.8 0 0 1 16 16h-.3v1.2A2.8 2.8 0 0 1 13 20h-1"/><path d="M8.2 10.4a2.6 2.6 0 0 1 2.8 2.7V20"/><path d="M15.8 10.4a2.6 2.6 0 0 0-2.8 2.7"/></svg>;
    case 'phone': return <svg {...common}><rect x="7" y="2.8" width="10" height="18.4" rx="2"/><path d="M10 5.8h4"/><path d="M11 18.2h2"/></svg>;
    case 'link': return <svg {...common}><path d="M10 13.5 14 9.5"/><path d="M7.5 17.5H6a3.5 3.5 0 0 1 0-7h4"/><path d="M16.5 6.5H18a3.5 3.5 0 0 1 0 7h-4"/></svg>;
    case 'pulse': return <svg {...common}><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>;
    case 'spark': return <svg {...common}><path d="m12 3 1.2 4.8L18 9l-4.8 1.2L12 15l-1.2-4.8L6 9l4.8-1.2L12 3Z"/><path d="m19 15 .6 2.4L22 18l-2.4.6L19 21l-.6-2.4L16 18l2.4-.6L19 15Z"/></svg>;
    case 'menu': return <svg {...common}><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>;
    case 'sun': return <svg {...common}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.42 1.42"/><path d="m17.65 17.65 1.42 1.42"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.93 19.07 1.42-1.42"/><path d="m17.65 6.35 1.42-1.42"/></svg>;
    case 'moon': return <svg {...common}><path d="M20.5 14.8A8.7 8.7 0 0 1 9.2 3.5 8.7 8.7 0 1 0 20.5 14.8Z"/></svg>;
    case 'mail': return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
    case 'map': return <svg {...common}><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15"/><path d="M15 6v15"/></svg>;
    case 'shield': return <svg {...common}><path d="M12 3 19 6v5c0 4.6-2.7 7.8-7 10-4.3-2.2-7-5.4-7-10V6l7-3Z"/><path d="m9 12 2 2 4-5"/></svg>;
    case 'layers': return <svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/></svg>;
    case 'cpu': return <svg {...common}><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/></svg>;
  }
}
