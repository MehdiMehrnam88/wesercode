import Link from 'next/link';
import { content, services, audiences, values, type Locale } from '@/lib/i18n';
import { Shell } from './Shell';
import { HeroScene } from '@/components/HeroScene';
import { MachineFlow } from '@/components/MachineFlow';
import { TechnologyWall } from '@/components/TechnologyWall';
import { AIReadiness } from '@/components/AIReadiness';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/Icon';
import { LifecycleVisual } from '@/components/LifecycleVisual';
import { ConversationBridge } from '@/components/ConversationBridge';
import { HomeVisualModule } from '@/components/HomeVisualModule';

const iconMap = { pulse: 'pulse', code: 'code', globe: 'globe', spark: 'spark', brain: 'brain', phone: 'phone', link: 'link' } as const;

export function HomePage({ locale }: { locale: Locale }) {
  const c = content[locale];
  const navTarget = locale === 'de' ? '/contact' : '/en/contact';
  return <Shell locale={locale} page="home">
    <section className="hero section-dark hero-with-scene">
      <HeroScene />
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="live-dot" />{c.hero.eyebrow}</div>
          <h1>{c.hero.title}</h1>
          <p className="hero-lead">{c.hero.body}</p>
          <div className="hero-actions"><Link className="btn btn-primary btn-large" href={navTarget}>{c.hero.primary}<Icon name="arrow" /></Link><Link className="text-btn" href={locale === 'de' ? '/services' : '/en/services'}>{c.hero.secondary}<Icon name="arrow" /></Link></div>
          <div className="hero-proof"><span>Software</span><span>Apps</span><span>Web</span><span>AI</span><span>{locale === 'de' ? 'Automatisierung' : 'Automation'}</span></div>
        </div>
      </div>
    </section>

    <section className="section section-intro home-depth-section home-depth-intro">
      <span className="home-depth-orb home-depth-orb-intro" data-parallax="0.13" aria-hidden="true" />
      <div className="container intro-grid">
        <div className="intro-statement"><span className="section-number">02</span><p>{c.home.statement}</p></div>
        <div className="intro-copy"><p>{locale === 'de' ? 'WeserCode entwickelt keine Standardlösung um ihrer selbst willen. Das technische System entsteht aus Problem, Prozess, Nutzer und bestehender Umgebung.' : 'WeserCode does not force a standard solution onto a problem. The technical system grows from the process, users and existing environment.'}</p><Link className="text-btn" href={locale === 'de' ? '/about' : '/en/about'}>{locale === 'de' ? 'Arbeitsweise ansehen' : 'See how we work'} <Icon name="arrow" /></Link></div>
      </div>
    </section>

    <ConversationBridge locale={locale} />

    <section className="section section-muted home-depth-section home-depth-services">
      <span className="home-depth-orb home-depth-orb-services" data-parallax="0.1" aria-hidden="true" />
      <div className="container"><SectionHeading eyebrow="03 / SERVICES" title={c.home.servicesTitle} lead={c.home.servicesLead} />
        <div className="service-grid home-services">{services.map((s, i) => <Link key={s.id} href={(locale === 'de' ? '/services' : '/en/services') + s.anchor} className={`service-card stagger-${Math.min(i + 1, 6)}`}><span className="icon-tile"><Icon name={iconMap[s.icon]} /></span><div><span className="service-index">0{i + 1}</span><h3>{locale === 'de' ? s.de : s.en}</h3><p>{serviceTeaser(locale, s.id)}</p></div><span className="card-arrow"><Icon name="arrow" /></span></Link>)}</div>
      </div>
    </section>

    <section className="section audience-section home-depth-section home-depth-audience">
      <span className="home-depth-orb home-depth-orb-audience" data-parallax="0.16" aria-hidden="true" />
      <div className="container audience-layout"><div><SectionHeading eyebrow="04 / WHO" title={c.home.audiencesTitle} lead={c.home.audiencesLead} /></div><div className="audience-list">{audiences[locale].map((item, i) => <div className="audience-item" key={item}><span>0{i + 1}</span><strong>{item}</strong><Icon name="arrow" /></div>)}</div></div>
    </section>

    <section className="section section-dark why-section home-visual-stage">
      <HomeVisualModule kind="principles" />
      <div className="container"><SectionHeading eyebrow="05 / WHY" title={c.home.whyTitle} lead={c.home.whyLead} />
        <div className="principle-grid">{values[locale].slice(0, 6).map(([title, body], i) => <article className="principle" key={title}>
          <div className="principle-aura" />
          <div className="principle-ui-corner" aria-hidden="true"><span /><span /><span /></div>
          <div className="principle-top"><span className="principle-big-number">0{i + 1}</span><span className="principle-icon"><Icon name={['layers', 'spark', 'shield', 'globe', 'code', 'check'][i] as any} /></span></div>
          <div className="principle-copy"><span className="principle-kicker">{locale === 'de' ? 'Prinzip' : 'Principle'} / {String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></div>
          <div className="principle-corner" aria-hidden="true">↗</div>
        </article>)}</div>
      </div>
    </section>

    <section className="section process-preview home-visual-stage">
      <HomeVisualModule kind="process" />
      <div className="container"><SectionHeading eyebrow="06 / PROCESS" title={c.home.processTitle} lead={c.home.processLead} />
        <div className="process-summary-grid">
          {(locale === 'de' ? [
            ['01', 'Verstehen', 'Problem, Nutzer und Ausgangslage klären.'],
            ['02', 'Entwerfen', 'Anforderungen, Architektur und UX strukturieren.'],
            ['03', 'Umsetzen', 'Iterativ entwickeln, testen und bereitstellen.'],
            ['04', 'Begleiten', 'Betrieb, Support und Weiterentwicklung mitdenken.'],
          ] : [
            ['01', 'Understand', 'Clarify the problem, users and current situation.'],
            ['02', 'Shape', 'Structure requirements, architecture and UX.'],
            ['03', 'Build', 'Develop, test and deploy iteratively.'],
            ['04', 'Evolve', 'Consider operations, support and further development.'],
          ]).map(([n, title, body]) => <article className="process-phase" key={n}><span className="process-phase-index">{n}</span><div><h3>{title}</h3><p>{body}</p></div><Icon name="arrow" /></article>)}
        </div>
        <div className="consultation-strip">
          <div className="consultation-badge"><span className="live-dot" />{locale === 'de' ? 'Kostenloses Erstgespräch' : 'Free first consultation'}</div>
          <p>{locale === 'de' ? 'Ein erstes Gespräch dient dazu, Problem, Ziel und Ausgangslage gemeinsam einzuordnen – ohne technische Festlegung.' : 'A first conversation is used to understand the problem, goal and current situation together — before committing to technology.'}</p>
          <Link className="btn btn-secondary" href={navTarget}>{locale === 'de' ? 'Unverbindlich sprechen' : 'Talk to us'} <Icon name="arrow" /></Link>
        </div>
        <Link className="text-btn centered-btn" href={locale === 'de' ? '/process' : '/en/process'}>{locale === 'de' ? 'Detaillierten Prozess ansehen' : 'Explore the detailed process'} <Icon name="arrow" /></Link>
      </div>
    </section>

    <section className="section section-muted technology-preview home-visual-stage">
      <HomeVisualModule kind="technology" />
      <div className="container"><SectionHeading eyebrow="07 / TECHNOLOGY" title={c.home.techTitle} lead={c.home.techLead} /><TechnologyWall locale={locale} /></div>
    </section>

    <section className="section ai-section home-depth-section home-depth-ai">
      <span className="home-depth-orb home-depth-orb-ai" data-parallax="0.12" aria-hidden="true" />
      <div className="container ai-layout"><div><SectionHeading eyebrow="08 / AI" title={c.home.aiTitle} lead={c.home.aiLead} /><MachineFlow ai /></div><AIReadiness locale={locale} /></div>
    </section>

    <section className="section lifecycle-section section-dark home-depth-section home-depth-lifecycle">
      <span className="home-depth-orb home-depth-orb-lifecycle" data-parallax="0.09" aria-hidden="true" />
      <div className="container lifecycle-grid"><div><SectionHeading eyebrow="09 / LIFECYCLE" title={c.home.lifecycleTitle} lead={c.home.lifecycleLead} /><div className="lifecycle-mini-note"><span>{locale === 'de' ? 'Lebenszyklus statt Launch-Moment' : 'Lifecycle, not just launch'}</span><small>{locale === 'de' ? 'Betrieb, Veränderung und spätere Ablösung gehören zum Systemdenken.' : 'Operations, change and eventual replacement are part of thinking about the system.'}</small></div></div><LifecycleVisual locale={locale} /></div>
    </section>

    <section className="section final-cta-section home-depth-section home-depth-cta">
      <span className="home-depth-orb home-depth-orb-cta" data-parallax="0.12" aria-hidden="true" />
      <div className="container final-cta"><span className="eyebrow">10 / START</span><h2>{c.home.finalTitle}</h2><p className="final-cta-note">{locale === 'de' ? 'Kein fertiges Briefing nötig. Sie können uns genauso gut mit einer Frage oder einem unfertigen Gedanken schreiben.' : 'No finished brief required. You can contact us just as easily with a question or an unfinished thought.'}</p><div className="final-cta-actions"><Link className="btn btn-primary btn-large" href={navTarget}>{c.home.finalCta}<Icon name="arrow" /></Link><a className="text-btn" href="mailto:hello@wesercode.de">hello@wesercode.de <Icon name="arrow" /></a></div></div>
    </section>
  </Shell>;
}

function serviceTeaser(locale: Locale, id: string) {
  const teasers = {
    de: { machine: 'Daten aus Maschinen in Software und Prozesse bringen.', software: 'Individuelle Tools, Portale, APIs und Geschäftsabläufe.', web: 'Websites und Webanwendungen mit solider technischer Basis.', custom: 'Spezielle Regeln, Workflows und Oberflächen individuell abbilden.', ai: 'AI-Use-Cases mit Daten, Tools, Evaluation und Kontrolle.', mobile: 'iOS, Android und interaktive mobile Produkte.', integration: 'Bestehende Systeme verbinden, erweitern und modernisieren.' },
    en: { machine: 'Bring machine information into software and workflows.', software: 'Custom tools, portals, APIs and business workflows.', web: 'Websites and web applications with a solid technical foundation.', custom: 'Model special rules, workflows and interfaces around real needs.', ai: 'AI use cases with data, tools, evaluation and oversight.', mobile: 'iOS, Android and interactive mobile products.', integration: 'Connect, extend and modernize existing systems.' },
  } as const;
  return teasers[locale][id as keyof typeof teasers.de];
}
