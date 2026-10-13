import Link from 'next/link';
import { site, nav, type Locale } from '@/lib/i18n';
import { Icon } from './Icon';
import { PrivacySettingsButton } from './PrivacySettingsButton';

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = nav[locale];
  return <footer className="site-footer"><div className="footer-photo" aria-hidden="true" />
    <div className="container footer-top">
      <div>
        <Link href={locale === 'de' ? '/' : '/en'} className="footer-brand" aria-label={site.name}><span className="logo-stack footer-logo-stack" aria-hidden="true"><img className="logo-img logo-dark" src="/brand/wesercode-logo-dark.png" alt="WeserCode logo" /><img className="logo-img logo-light" src="/brand/wesercode-logo-light.png" alt="WeserCode logo" /></span></Link>
        <p className="footer-positioning">{site.positioning}</p>
        <p className="footer-location">{site.address}</p>
      </div>
      <div className="footer-col"><span className="footer-label">{locale === 'de' ? 'Navigation' : 'Navigation'}</span><Link href={locale === 'de' ? '/services' : '/en/services'}>{copy.services}</Link><Link href={locale === 'de' ? '/process' : '/en/process'}>{copy.process}</Link><Link href={locale === 'de' ? '/about' : '/en/about'}>{copy.about}</Link><Link href={locale === 'de' ? '/faq' : '/en/faq'}>{copy.faq}</Link><Link href={locale === 'de' ? '/contact' : '/en/contact'}>{copy.contact}</Link></div>
      <div className="footer-col"><span className="footer-label">{locale === 'de' ? 'Kontakt' : 'Contact'}</span><a href={`mailto:${site.email}`}>{site.email}</a><span>{locale === 'de' ? 'Digital · Remote' : 'Digital · Remote'}</span><span>{locale === 'de' ? 'Norddeutschland · Deutschlandweit' : 'Northern Germany · Germany-wide'}</span></div>
      <div className="footer-col"><span className="footer-label">{locale === 'de' ? 'Rechtliches' : 'Legal'}</span><Link href={locale === 'de' ? '/imprint' : '/en/imprint'}>{locale === 'de' ? 'Impressum' : 'Imprint'}</Link><Link href={locale === 'de' ? '/privacy' : '/en/privacy'}>{locale === 'de' ? 'Datenschutz' : 'Privacy'}</Link><PrivacySettingsButton locale={locale} /><a href={`mailto:${site.email}`}><span>{locale === 'de' ? 'E-Mail senden' : 'Send email'}</span> <Icon name="arrow" /></a></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} WeserCode. {locale === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</span><span>{locale === 'de' ? 'Technologie folgt dem Problem.' : 'Technology follows the problem.'}</span></div>
  </footer>;
}
