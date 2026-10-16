import Link from 'next/link';
import { Icon } from './Icon';
import { PageHeroArtwork } from './PageHeroArtwork';
import { PageHeroAtmosphere } from './PageHeroAtmosphere';
import type { Locale } from '@/lib/i18n';

type BannerType = 'services' | 'process';

const config: Record<BannerType, { target: string; index: string }> = {
  services: { target: '#machine', index: '01 / SERVICES' },
  process: { target: '#process-overview', index: '01 / PROCESS' },
};

export function VisualPageHero({ type, locale, title, intro }: { type: BannerType; locale: Locale; title: string; intro: string }) {
  const c = config[type];
  const label = `${type === 'services' ? 'Services' : locale === 'de' ? 'Prozess' : 'Process'} · WeserCode`;
  const scrollLabel = locale === 'de' ? 'Weiter entdecken' : 'Explore further';
  const contactLabel = locale === 'de' ? 'Vorhaben besprechen' : 'Discuss your project';

  return (
    <section className={`visual-page-hero visual-page-hero-${type}`} aria-label={label}>
      <div className="visual-page-hero-art" data-parallax="0.12"><PageHeroArtwork kind={type} /><PageHeroAtmosphere kind={type} /></div>
      <div className="visual-page-hero-overlay" />
      <div className="container visual-page-hero-content">
        <div className="visual-page-hero-copy">
          <span className="eyebrow"><span className="live-dot" />{c.index}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <div className="visual-page-hero-actions">
            <Link className="btn btn-primary btn-large" href={c.target}>{type === 'services' ? locale === 'de' ? 'Leistungen entdecken' : 'Explore services' : locale === 'de' ? 'Ablauf ansehen' : 'See the process'}<Icon name="arrow" /></Link>
            <Link className="visual-page-hero-contact" href={locale === 'de' ? '/contact' : '/en/contact'}>{contactLabel}<span aria-hidden="true">↗</span></Link>
          </div>
          <span className="visual-page-hero-footnote">{locale === 'de' ? 'WeserCode · Bremen · Digital & remote' : 'WeserCode · Bremen · Digital & remote'}</span>
        </div>
      </div>
      <Link className="visual-page-hero-scroll" href={c.target} aria-label={scrollLabel}>
        <span>{scrollLabel}</span><Icon name="arrow" />
      </Link>
    </section>
  );
}
