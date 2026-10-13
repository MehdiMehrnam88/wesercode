import { content, site, type Locale } from '@/lib/i18n';
import { Shell } from './Shell';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { MapEmbed } from '@/components/MapEmbed';
import { BremenHero } from '@/components/BremenHero';
import { ConversationBridge } from '@/components/ConversationBridge';

export function ContactPage({ locale }: { locale: Locale }) {
  const c = content[locale];
  return <Shell locale={locale} page="contact">
    <BremenHero kind="contact" locale={locale} title={c.contact.title} intro={c.contact.intro} />
    <section className="section section-after-hero-reassurance"><div className="container"><ConversationBridge locale={locale} mode="compact" /></div></section>
    <section className="section"><div className="container contact-layout"><div className="contact-info"><div className="contact-meta"><div className="meta-icon"><Icon name="mail" /></div><div><span className="footer-label">{c.contact.emailLabel}</span><a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a></div></div><div className="contact-meta"><div className="meta-icon"><Icon name="map" /></div><div><span className="footer-label">{c.contact.locationLabel}</span><strong>{site.address}</strong></div></div><div className="contact-meta"><div className="meta-icon"><Icon name="layers" /></div><div><span className="footer-label">{c.contact.workLabel}</span><strong>{c.contact.workValue}</strong></div></div></div><div className="contact-form-card"><div className="form-card-head"><span className="eyebrow">02 / INQUIRY</span><h2>{c.contact.formTitle}</h2><p>{c.contact.formIntro}</p></div><ContactForm locale={locale} /></div></div></section>
    <section className="section section-muted"><div className="container map-section"><div><span className="eyebrow">03 / LOCATION</span><h2>{c.contact.mapTitle}</h2><p>{c.contact.mapNote}</p><a className="text-btn" href="https://www.google.com/maps/search/?api=1&query=Rotdornpfad%2031%2C%2028355%20Bremen%2C%20Germany" target="_blank" rel="noreferrer">{locale === 'de' ? 'In Google Maps öffnen' : 'Open in Google Maps'} <Icon name="arrow" /></a></div><MapEmbed locale={locale} /></div></section>
  </Shell>;
}
