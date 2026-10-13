import type { Locale } from '@/lib/i18n';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StructuredData } from '@/components/StructuredData';
import { SiteVideoBackground } from '@/components/SiteVideoBackground';
import { ScrollEffects } from '@/components/ScrollEffects';

export type SitePage = 'home' | 'services' | 'process' | 'about' | 'faq' | 'contact';

export function Shell({ locale, page = 'home', children }: { locale: Locale; page?: SitePage; children?: React.ReactNode }) {
  return <>
    <ScrollEffects />
    <SiteVideoBackground />
    <SiteHeader locale={locale} />
    <main lang={locale}>{children}</main>
    <SiteFooter locale={locale} />
    <StructuredData locale={locale} page={page} />
  </>;
}
