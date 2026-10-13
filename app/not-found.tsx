import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteVideoBackground } from '@/components/SiteVideoBackground';
import { ScrollEffects } from '@/components/ScrollEffects';

export default function NotFound() {
  return <>
    <ScrollEffects />
    <SiteVideoBackground />
    <SiteHeader locale="de" />
    <main className="not-found-page" lang="de">
      <div className="not-found-orbit" data-parallax="0.14" aria-hidden="true"><span /><span /><span /></div>
      <div className="container not-found-content">
        <p className="eyebrow"><span className="live-dot" /> FEHLER 404 · SEITE NICHT GEFUNDEN</p>
        <p className="not-found-code" aria-hidden="true">404</p>
        <h1>Diese Seite ist wohl auf einem anderen Weg.</h1>
        <p className="not-found-lead">Der Link ist möglicherweise veraltet oder die Adresse hat sich geändert. Wir helfen Ihnen gern, den richtigen Weg zu finden.</p>
        <div className="not-found-actions">
          <Link className="btn btn-primary btn-large" href="/">Zur Startseite <span aria-hidden="true">→</span></Link>
          <Link className="btn btn-secondary btn-large" href="/contact">Kontakt aufnehmen</Link>
        </div>
        <nav className="not-found-shortcuts" aria-label="Schnellzugriff">
          <Link href="/services">Services <span aria-hidden="true">↗</span></Link>
          <Link href="/process">Unser Prozess <span aria-hidden="true">↗</span></Link>
          <Link href="/about">Über WeserCode <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </main>
    <SiteFooter locale="de" />
  </>;
}
