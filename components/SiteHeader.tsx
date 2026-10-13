'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site, nav, type Locale } from '@/lib/i18n';
import { Icon } from './Icon';

function localizePath(pathname: string, nextLocale: Locale) {
  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  const base = isEn ? pathname.replace(/^\/en/, '') || '/' : pathname;
  return nextLocale === 'en' ? `/en${base === '/' ? '' : base}` : base;
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const copy = nav[locale];
  const isVisualBannerPage = pathname === '/services' || pathname === '/process' || pathname === '/en/services' || pathname === '/en/process';

  useEffect(() => {
    const stored = localStorage.getItem('wesercode-theme') as 'dark' | 'light' | null;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const value = stored ?? (prefersLight ? 'light' : 'dark');
    setTheme(value);
    document.documentElement.dataset.theme = value;
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('wesercode-theme', next);
    document.documentElement.dataset.theme = next;
  }

  const links = [
    ['home', locale === 'de' ? '/' : '/en'],
    ['services', locale === 'de' ? '/services' : '/en/services'],
    ['process', locale === 'de' ? '/process' : '/en/process'],
    ['about', locale === 'de' ? '/about' : '/en/about'],
    ['faq', locale === 'de' ? '/faq' : '/en/faq'],
    ['contact', locale === 'de' ? '/contact' : '/en/contact'],
  ] as const;

  return (
    <header className={`site-header ${isVisualBannerPage ? 'site-header-visual' : ''}`}>
      <div className="container header-inner">
        <Link href={locale === 'de' ? '/' : '/en'} className="brand" aria-label={`${site.name} — ${copy.home}`} onClick={() => setOpen(false)}>
          <span className="logo-stack logo-stack-brand" aria-hidden="true"><img className="logo-img logo-dark" src="/brand/wesercode-logo-dark.png" alt="WeserCode logo" /><img className="logo-img logo-light" src="/brand/wesercode-logo-light.png" alt="WeserCode logo" /></span>
        </Link>
        <nav id="site-nav" className={`desktop-nav ${open ? 'is-open' : ''}`} aria-label={locale === 'de' ? 'Hauptnavigation' : 'Main navigation'}>
          {links.map(([key, href]) => <Link key={key} href={href} onClick={() => setOpen(false)}>{copy[key]}</Link>)}
        </nav>
        <noscript><nav className="nojs-nav" aria-label={locale === 'de' ? 'Navigation' : 'Navigation'}>{links.map(([key, href]) => <a key={key} href={href}>{copy[key]}</a>)}</nav></noscript>
        <div className="header-actions">
          <Link className="header-cta" href={locale === 'de' ? '/contact' : '/en/contact'}>{copy.cta}<Icon name="arrow" /></Link>
          <button className="icon-btn" onClick={toggleTheme} type="button" aria-label={theme === 'dark' ? (locale === 'de' ? 'Helles Design aktivieren' : 'Switch to light theme') : (locale === 'de' ? 'Dunkles Design aktivieren' : 'Switch to dark theme')}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <div className="lang-switch" aria-label={locale === 'de' ? 'Sprache' : 'Language'}>
            <Link className={locale === 'de' ? 'active' : ''} href={localizePath(pathname, 'de')}>DE</Link>
            <span aria-hidden="true">/</span>
            <Link className={locale === 'en' ? 'active' : ''} href={localizePath(pathname, 'en')}>EN</Link>
          </div>
          <button className="mobile-menu" onClick={() => setOpen((v) => !v)} type="button" aria-expanded={open} aria-controls="site-nav">
            <Icon name="menu" />
            <span className="sr-only">{open ? (locale === 'de' ? 'Menü schließen' : 'Close menu') : (locale === 'de' ? 'Menü öffnen' : 'Open menu')}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
