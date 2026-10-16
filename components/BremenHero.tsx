import Link from 'next/link';
import { Icon } from './Icon';
import { PageHeroArtwork } from './PageHeroArtwork';
import { PageHeroAtmosphere } from './PageHeroAtmosphere';
import { site, type Locale } from '@/lib/i18n';

type Kind = 'about' | 'faq' | 'contact';

export function BremenHero({ kind, locale, title, intro }: { kind: Kind; locale: Locale; title: string; intro: string }) {
  const cta = kind === 'contact'
    ? { label: locale === 'de' ? 'Nachricht schreiben' : 'Write a message', href: '#contact-form' }
    : kind === 'faq'
      ? { label: locale === 'de' ? 'Frage stellen' : 'Ask a question', href: locale === 'de' ? '/contact' : '/en/contact' }
      : null;
  const pageIndex = kind === 'faq' ? '03 / ANSWERS' : kind === 'contact' ? '01 / CONTACT' : 'ABOUT';
  const jumpLabel = kind === 'faq'
    ? (locale === 'de' ? 'Fragen ansehen' : 'Browse questions')
    : (locale === 'de' ? 'Direkt per E-Mail schreiben' : 'Email WeserCode directly');
  return (
    <section className={`bremen-page-hero bremen-page-hero-${kind}`} aria-label={`${title} · WeserCode`}>
      <div className="bremen-page-hero-art" data-parallax="0.12"><PageHeroArtwork kind={kind} /><PageHeroAtmosphere kind={kind} /></div>
      <div className="bremen-page-hero-overlay" aria-hidden="true" />
      <div className="bremen-page-hero-grid" data-parallax="0.06" aria-hidden="true" />
      <div className="container bremen-page-hero-inner">
        <div className="bremen-hero-card">
          <span className="eyebrow"><span className="live-dot" />{pageIndex}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <div className="bremen-hero-actions">
            {cta && <Link className="btn btn-primary" href={cta.href}>{cta.label}<Icon name="arrow" /></Link>}
            <Link className="bremen-hero-text-link" href={kind === 'faq' ? '#faq-list' : `mailto:${site.email}`}>{jumpLabel}<span aria-hidden="true">↗</span></Link>
          </div>
          {kind === 'contact' && <div className="contact-hero-address"><span className="contact-hero-pulse" />{locale === 'de' ? 'Bremen · Digital & remote' : 'Bremen · Digital & remote'}</div>}
        </div>
      </div>
    </section>
  );
}
