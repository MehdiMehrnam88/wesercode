import Link from 'next/link';
import { Icon } from './Icon';
import { PageHeroArtwork } from './PageHeroArtwork';
import type { Locale } from '@/lib/i18n';

type Kind = 'about' | 'faq' | 'contact';

export function BremenHero({ kind, locale, title, intro }: { kind: Kind; locale: Locale; title: string; intro: string }) {
  const cta = kind === 'contact'
    ? null
    : { label: locale === 'de' ? 'Einfach sprechen' : 'Let’s talk', href: locale === 'de' ? '/contact' : '/en/contact' };
  return (
    <section className={`bremen-page-hero bremen-page-hero-${kind}`}>
      <div className="bremen-page-hero-art" data-parallax="0.12"><PageHeroArtwork kind={kind} /></div>
      <div className="bremen-page-hero-overlay" aria-hidden="true" />
      <div className="bremen-page-hero-grid" data-parallax="0.06" aria-hidden="true" />
      <div className="container bremen-page-hero-inner">
        <div className="bremen-hero-card">
          <h1>{title}</h1>
          <p>{intro}</p>
          {cta && <Link className="btn btn-primary" href={cta.href}>{cta.label}<Icon name="arrow" /></Link>}
        </div>
      </div>
    </section>
  );
}
