import Link from 'next/link';
import { content, values, type Locale } from '@/lib/i18n';
import { Shell } from './Shell';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/Icon';
import { TeamGrid } from '@/components/TeamGrid';
import { ClientProjects } from '@/components/ClientProjects';
import { HeroScene } from '@/components/HeroScene';
import { ConversationBridge } from '@/components/ConversationBridge';

export function AboutPage({ locale }: { locale: Locale }) {
  const c = content[locale];
  return <Shell locale={locale} page="about">
    <section className="hero section-dark hero-with-scene about-home-hero">
      <HeroScene />
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="live-dot" />{locale === 'de' ? 'BREMEN · DEUTSCHLAND · REMOTE' : 'BREMEN · GERMANY · REMOTE'}</div>
          <h1>{c.about.title}</h1>
          <p className="hero-lead">{c.about.intro}</p>
          <div className="hero-actions"><Link className="btn btn-primary btn-large" href={locale === 'de' ? '/contact' : '/en/contact'}>{locale === 'de' ? 'Einfach sprechen' : 'Let’s talk'}<Icon name="arrow" /></Link></div>
          <div className="hero-proof"><span>Software</span><span>Apps</span><span>Web</span><span>AI</span><span>{locale === 'de' ? 'Automatisierung' : 'Automation'}</span></div>
        </div>
      </div>
    </section>
    <section className="section"><div className="container about-philosophy"><div className="about-quote">“{locale === 'de' ? 'Technologie folgt dem Problem.' : 'Technology follows the problem.'}”</div><div><SectionHeading eyebrow="02 / PHILOSOPHY" title={c.about.philosophyTitle} lead={c.about.philosophyLead} /><div className="about-checks">{(locale === 'de' ? ['Problem zuerst verstehen', 'Bestehende Umgebung berücksichtigen', 'Nur Notwendiges bauen', 'Für echte Nutzer gestalten', 'Wartbarkeit und Betrieb mitdenken', 'Vorhandene Systeme integrieren, wo sinnvoll'] : ['Understand the problem first', 'Consider the existing environment', 'Build only what is necessary', 'Design for real users', 'Consider operations and maintenance', 'Integrate existing systems where useful']).map((x) => <div key={x}><Icon name="check" />{x}</div>)}</div></div></div></section>
    <section className="section about-no-barrier-section"><div className="container"><ConversationBridge locale={locale} mode="compact" /></div></section>
    <section className="section section-muted"><div className="container"><SectionHeading eyebrow="03 / HISTORY" title={c.about.historyTitle} lead={c.about.historyBody} /><div className="history-board"><div className="history-current"><span className="history-live"><i />{locale === 'de' ? 'HEUTE' : 'TODAY'}</span><strong>{locale === 'de' ? 'Bremen · Deutschland · Remote' : 'Bremen · Germany · Remote'}</strong><p>{locale === 'de' ? 'WeserCode ist als Software- und Technologieentwicklungspartner mit Sitz in Bremen ausgerichtet. Der aktuelle Leistungsrahmen verbindet Software, Apps, Web, AI, Automatisierung und Systemintegration.' : 'WeserCode is positioned as a software and technology development partner based in Bremen. The current service scope connects software, apps, web, AI, automation and system integration.'}</p></div><div className="history-rail" aria-hidden="true"><span>01</span><span>02</span><span>03</span></div><div className="history-facts"><div><span>{locale === 'de' ? 'Ausrichtung' : 'Positioning'}</span><strong>Software · Apps · Web · AI</strong></div><div><span>{locale === 'de' ? 'Arbeitsprinzip' : 'Working principle'}</span><strong>{locale === 'de' ? 'Technologie folgt dem Problem.' : 'Technology follows the problem.'}</strong></div><div><span>{locale === 'de' ? 'Lebenszyklus' : 'Lifecycle'}</span><strong>0 → 100 → {locale === 'de' ? 'Ende' : 'End'}</strong></div></div></div></div></section>
    <section className="section section-projects"><div className="container"><SectionHeading eyebrow="04 / SELECTED WORK" title={c.about.projectsTitle} lead={c.about.projectsLead} /><ClientProjects locale={locale} /></div></section>
    <section className="section section-team"><div className="container"><SectionHeading eyebrow="05 / TEAM" title={locale === 'de' ? 'Unser Team' : 'Our team'} lead={locale === 'de' ? 'Mehdi Mehrnam und seine Kolleginnen und Kollegen verbinden Frontend, Backend, Cloud, Fullstack-Entwicklung und Betrieb.' : 'Mehdi Mehrnam and his colleagues bring together frontend, backend, cloud, full-stack development and operations.'} /><TeamGrid locale={locale} /></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="06 / VALUES" title={c.about.valuesTitle} lead={locale === 'de' ? 'Prinzipien, die die technische Arbeit lesbar machen.' : 'Principles that make the engineering approach easy to understand.'} /><div className="value-grid">{values[locale].map(([title, body], i) => <article key={title}><span>{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
  </Shell>;
}
