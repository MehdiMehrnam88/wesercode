import Link from 'next/link';
import { content, processStages, type Locale } from '@/lib/i18n';
import { Shell } from './Shell';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/Icon';
import { VisualPageHero } from '@/components/VisualPageHero';
import { ConversationBridge } from '@/components/ConversationBridge';

export function ProcessPage({ locale }: { locale: Locale }) {
  const c = content[locale];
  const stages = processStages[locale];
  const overview = locale === 'de'
    ? [
        ['01', 'Verstehen', 'Problem, Nutzer, Ziele und Ausgangslage.'],
        ['02', 'Strukturieren', 'Anforderungen, UX, Architektur und Verantwortlichkeiten.'],
        ['03', 'Entwickeln', 'Iterativ bauen, testen, integrieren und ausrollen.'],
        ['04', 'Begleiten', 'Support, Weiterentwicklung und späterer Übergang.'],
      ]
    : [
        ['01', 'Understand', 'Problem, users, goals and current situation.'],
        ['02', 'Structure', 'Requirements, UX, architecture and responsibilities.'],
        ['03', 'Build', 'Develop, test, integrate and deploy iteratively.'],
        ['04', 'Evolve', 'Support, further development and eventual transition.'],
      ];

  return <Shell locale={locale} page="process">
    <VisualPageHero type="process" locale={locale} title={c.process.title} intro={c.process.intro} />
    <section className="section section-after-hero-reassurance"><div className="container"><ConversationBridge locale={locale} mode="compact" /></div></section>

    <section id="process-overview" className="section process-overview-section">
      <div className="container">
        <SectionHeading eyebrow="02 / OVERVIEW" title={locale === 'de' ? 'Einfach starten. Tief gehen, wenn es nötig ist.' : 'Start simple. Go deeper when needed.'} lead={locale === 'de' ? 'Der sichtbare Ablauf bleibt bewusst übersichtlich. Die Details lassen sich Schritt für Schritt öffnen.' : 'The visible process stays deliberately simple. The detailed steps can be opened when they matter.'} />
        <div className="process-phase-grid">
          {overview.map(([number, title, body]) => <article className="process-phase process-phase-large" key={number}><span className="process-phase-index">{number}</span><div><h3>{title}</h3><p>{body}</p></div><Icon name="arrow" /></article>)}
        </div>
        <div className="consultation-strip consultation-strip-large">
          <div>
            <div className="consultation-badge"><span className="live-dot" />{locale === 'de' ? 'Kostenloses Erstgespräch' : 'Free first consultation'}</div>
            <h3>{locale === 'de' ? 'Erst das Vorhaben verstehen.' : 'Understand the project first.'}</h3>
            <p>{locale === 'de' ? 'Das erste Gespräch ist dafür da, Problem, Ziel und Ausgangslage einzuordnen – ohne vorschnelle Technologieentscheidung.' : 'The first conversation is for understanding the problem, goal and current situation — before making a premature technology decision.'}</p>
          </div>
          <Link className="btn btn-primary" href={locale === 'de' ? '/contact' : '/en/contact'}>{locale === 'de' ? 'Kostenloses Gespräch anfragen' : 'Request a free consultation'} <Icon name="arrow" /></Link>
        </div>
      </div>
    </section>

    <section className="section section-muted">
      <div className="container">
        <SectionHeading eyebrow="03 / DETAILS" title={locale === 'de' ? '11 Schritte – als Detailansicht' : '11 steps — as a detailed view'} lead={locale === 'de' ? 'Der komplette Lebenszyklus bleibt verfügbar, ohne die erste Orientierung mit einer langen Linie zu überladen.' : 'The complete lifecycle remains available without overwhelming the first view with a long connected line.'} />
        <div className="process-detail-list">
          {stages.map(([number, title, body], i) => <details className="process-step" key={number} open={i === 0}>
            <summary><span className="process-step-number">{number}</span><span className="process-step-title"><small>{String(i + 1).padStart(2, '0')} /</small>{title}</span><span className="process-step-toggle">+</span></summary>
            <div className="process-step-body"><p>{body}</p><span className="process-step-status">{i < 8 ? (locale === 'de' ? 'Projektphase' : 'Project phase') : (locale === 'de' ? 'Lebenszyklus' : 'Lifecycle')}</span></div>
          </details>)}
        </div>
      </div>
    </section>

    <section className="section section-lifecycle-callout">
      <div className="container split-callout">
        <div><SectionHeading eyebrow="04 / LIFECYCLE" title={locale === 'de' ? 'Kein harter Schnitt nach dem Launch.' : 'Launch is not the end.'} lead={locale === 'de' ? 'Support, Weiterentwicklung und spätere Ablösung werden als Teil des Systems gedacht.' : 'Support, further development and eventual replacement are considered part of the system lifecycle.'} /></div>
        <div className="callout-points">{(locale === 'de' ? ['Wartung & Security', 'Neue Features & Integrationen', 'Migration & Übergabe'] : ['Maintenance & security', 'New features & integrations', 'Migration & handover']).map((x) => <div key={x}><Icon name="check" /><span>{x}</span></div>)}</div>
      </div>
    </section>
  </Shell>;
}
