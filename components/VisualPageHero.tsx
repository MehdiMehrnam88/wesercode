import Link from 'next/link';
import { Icon } from './Icon';
import { PageHeroArtwork } from './PageHeroArtwork';
import type { Locale } from '@/lib/i18n';

type BannerType = 'services' | 'process';

const config: Record<BannerType, { target: string }> = {
  services: { target: '#machine' },
  process: { target: '#process-overview' },
};

export function VisualPageHero({ type, locale }: { type: BannerType; locale: Locale }) {
  const c = config[type];
  const label = type === 'services'
    ? (locale === 'de' ? 'Services · WeserCode' : 'Services · WeserCode')
    : (locale === 'de' ? 'Prozess · WeserCode' : 'Process · WeserCode');
  const scrollLabel = locale === 'de' ? 'Weiter entdecken' : 'Explore further';

  return (
    <section className={`visual-page-hero visual-page-hero-${type}`} aria-label={label}>
      <div className="visual-page-hero-art" data-parallax="0.12"><PageHeroArtwork kind={type} /></div>
      <div className="visual-page-hero-overlay" />
      <Link className="visual-page-hero-scroll" href={c.target} aria-label={scrollLabel}>
        <span>{scrollLabel}</span><Icon name="arrow" />
      </Link>
    </section>
  );
}
