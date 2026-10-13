import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteVideoBackground } from '@/components/SiteVideoBackground';

export default function EnglishNotFound() {
  return <>
    <SiteVideoBackground />
    <SiteHeader locale="en" />
    <main className="not-found-page" lang="en">
      <div className="not-found-orbit" aria-hidden="true"><span /><span /><span /></div>
      <div className="container not-found-content">
        <p className="eyebrow"><span className="live-dot" /> ERROR 404 · PAGE NOT FOUND</p>
        <p className="not-found-code" aria-hidden="true">404</p>
        <h1>This page seems to have taken a different route.</h1>
        <p className="not-found-lead">The link may be outdated or the address may have changed. We’ll help you find the right way forward.</p>
        <div className="not-found-actions">
          <Link className="btn btn-primary btn-large" href="/en">Back to homepage <span aria-hidden="true">→</span></Link>
          <Link className="btn btn-secondary btn-large" href="/en/contact">Contact WeserCode</Link>
        </div>
        <nav className="not-found-shortcuts" aria-label="Quick links">
          <Link href="/en/services">Services <span aria-hidden="true">↗</span></Link>
          <Link href="/en/process">Our process <span aria-hidden="true">↗</span></Link>
          <Link href="/en/about">About WeserCode <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </main>
    <SiteFooter locale="en" />
  </>;
}
