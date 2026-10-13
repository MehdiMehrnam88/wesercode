import { content, faqs, type Locale } from '@/lib/i18n';
import { Shell } from './Shell';
import { FAQAccordion } from '@/components/FAQAccordion';
import { SectionHeading } from '@/components/SectionHeading';
import { BremenHero } from '@/components/BremenHero';
import { ConversationBridge } from '@/components/ConversationBridge';

export function FAQPage({ locale }: { locale: Locale }) {
  const c = content[locale];
  return <Shell locale={locale} page="faq">
    <BremenHero kind="faq" locale={locale} title={c.faq.title} intro={c.faq.intro} />
    <section className="section faq-page-section"><div className="container faq-layout"><div className="faq-copy"><SectionHeading eyebrow="02 / QUESTIONS" title={locale === 'de' ? 'Praktisch statt vage.' : 'Practical instead of vague.'} lead={locale === 'de' ? 'Kein Versprechen ohne Kontext: Umfang, Abhängigkeiten und bestehende Systeme beeinflussen die richtige Antwort.' : 'No promise without context: scope, dependencies and existing systems shape the right answer.'} /></div><div className="faq-card-wrap"><FAQAccordion items={faqs[locale]} /></div></div></section>
  </Shell>;
}
