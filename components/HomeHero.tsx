'use client';

import Link from 'next/link';
import { content, type Locale } from '@/lib/i18n';
import { Icon } from './Icon';
import { HomeHeroScene } from './HomeHeroScene';

export function HomeHero({ locale }: { locale: Locale }) {
  const copy = content[locale];
  return (
    <section className="home-hero section-dark" data-home-scene="hero">
      <div className="home-hero-atmosphere" aria-hidden="true" />
      <HomeHeroScene />
      <div className="container home-hero-layout">
        <div className="home-hero-copy">
          <span className="eyebrow"><span className="live-dot" />{copy.hero.eyebrow}</span>
          <h1>{copy.hero.title}</h1>
          <p className="home-hero-lead">{copy.hero.body}</p>
          <div className="home-hero-actions">
            <Link className="btn btn-primary btn-large" href={locale === 'de' ? '/contact' : '/en/contact'}>{copy.hero.primary}<Icon name="arrow" /></Link>
            <Link className="home-hero-link" href={locale === 'de' ? '/services' : '/en/services'}>{copy.hero.secondary}<span aria-hidden="true">↘</span></Link>
          </div>
          <div className="home-hero-proof"><span>{locale === 'de' ? 'Vom ersten Gedanken bis zum Betrieb' : 'From first idea through operations'}</span><i /> <span>{locale === 'de' ? 'Bremen · Deutschlandweit' : 'Bremen · Across Germany'}</span></div>
        </div>

        <div className="home-hero-visual-space" aria-hidden="true" />
      </div>
      <a className="home-hero-scroll" href="#home-intro"><span>{locale === 'de' ? 'Die Möglichkeiten entdecken' : 'Discover what is possible'}</span><i aria-hidden="true" /></a>
    </section>
  );
}
