import { Icon } from './Icon';
import type { Locale } from '@/lib/i18n';

export function LifecycleVisual({ locale }: { locale: Locale }) {
  const stages = locale === 'de'
    ? [
        ['01', 'Launch', 'Veröffentlichen'],
        ['02', 'Support', 'Stabil halten'],
        ['03', 'Weiter', 'Verbessern'],
        ['04', 'Ablösung', 'Übergeben & migrieren'],
      ]
    : [
        ['01', 'Launch', 'Go live'],
        ['02', 'Support', 'Keep it stable'],
        ['03', 'Further', 'Improve it'],
        ['04', 'Replacement', 'Migrate & hand over'],
      ];
  const icons = ['arrow', 'shield', 'spark', 'layers'] as const;

  return (
    <div className="lifecycle-console">
      <div className="lifecycle-toolbar">
        <span className="lifecycle-status"><i />{locale === 'de' ? 'System-Lebenszyklus' : 'System lifecycle'}</span>
        <span className="lifecycle-range">0 → 100 → {locale === 'de' ? 'Ende' : 'End'}</span>
      </div>

      <div className="lifecycle-core-stage">
        <div className="lifecycle-halo halo-one" />
        <div className="lifecycle-halo halo-two" />
        <div className="lifecycle-radar radar-a" aria-hidden="true" />
        <div className="lifecycle-radar radar-b" aria-hidden="true" />
        <div className="lifecycle-core">
          <span>0 → 100</span>
          <strong>{locale === 'de' ? 'und darüber hinaus' : 'and beyond'}</strong>
        </div>
      </div>

      <div className="lifecycle-track" aria-hidden="true">
        <span className="track-fill" />
        <span /><span /><span /><span />
      </div>

      <div className="lifecycle-stage-grid">
        {stages.map(([number, title, subtitle], i) => (
          <article className={`lifecycle-card ${i === 0 ? 'is-active' : ''}`} key={number}>
            <div className="lifecycle-card-icon"><Icon name={icons[i]} /></div>
            <div className="lifecycle-card-meta"><span>{number}</span><span>{i === 0 ? 'NOW' : i === 3 ? 'LATER' : 'NEXT'}</span></div>
            <strong>{title}</strong>
            <small>{subtitle}</small>
          </article>
        ))}
      </div>

      <div className="lifecycle-footer-ui">
        <span>{locale === 'de' ? 'Betrieb' : 'Operations'}</span>
        <span>{locale === 'de' ? 'Weiterentwicklung' : 'Evolution'}</span>
        <span>{locale === 'de' ? 'Migration / Ablösung' : 'Migration / replacement'}</span>
      </div>
      <div className="lifecycle-signal-grid" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /></div>
    </div>
  );
}
