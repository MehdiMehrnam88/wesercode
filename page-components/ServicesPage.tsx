import { content, services, type Locale } from '@/lib/i18n';
import { Shell } from './Shell';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/Icon';
import { MachineFlow } from '@/components/MachineFlow';
import { VisualPageHero } from '@/components/VisualPageHero';
import { ConversationBridge } from '@/components/ConversationBridge';

export function ServicesPage({ locale }: { locale: Locale }) {
  const c = content[locale];
  return <Shell locale={locale} page="services">
    <VisualPageHero type="services" locale={locale} />
    <section className="section section-after-hero-reassurance"><div className="container"><ConversationBridge locale={locale} mode="compact" /></div></section>
    <section className="section"><div className="container">
      <ServiceBlock id="machine" number="01" title={c.services.machineTitle} lead={c.services.machineLead} icon="pulse"><MachineFlow /><div className="service-notes"><span>{c.services.sequenceLabel}</span><div><strong>{locale === 'de' ? 'Typische Anwendungen' : 'Potential applications'}</strong><p>{locale === 'de' ? 'Maschinenmonitoring · Produktionsdatenerfassung · Alerts · Dashboards · Reporting · automatische Benachrichtigungen · Workflows · Integration.' : 'Machine monitoring · production data collection · alerts · dashboards · reporting · automated notifications · workflows · integration.'}</p></div></div></ServiceBlock>
      <ServiceBlock id="software" number="02" title={c.services.softwareTitle} lead={c.services.softwareLead} icon="code"><TagList locale={locale} items={locale === 'de' ? ['Custom Software', 'Interne Anwendungen', 'Kundenportale', 'Administrationstools', 'Dashboards', 'Rollen-Systeme', 'Datenbanken', 'Backend-Systeme', 'APIs', 'Integrationen'] : ['Custom software', 'Internal applications', 'Customer portals', 'Administration tools', 'Dashboards', 'Role-based systems', 'Databases', 'Backend systems', 'APIs', 'Integrations']} /></ServiceBlock>
      <ServiceBlock id="web" number="03" title={c.services.webTitle} lead={c.services.webLead} icon="globe"><TagList locale={locale} items={locale === 'de' ? ['Unternehmenswebsites', 'Landingpages', 'Webanwendungen', 'Portale', 'CMS-Websites', 'Custom Frontends', 'Responsive Development', 'Technisches SEO', 'Performance', 'Accessibility', 'API-Integration'] : ['Company websites', 'Landing pages', 'Web applications', 'Portals', 'CMS websites', 'Custom frontends', 'Responsive development', 'Technical SEO', 'Performance', 'Accessibility', 'API integration']} /></ServiceBlock>
      <ServiceBlock id="custom" number="04" title={c.services.customTitle} lead={c.services.customLead} icon="spark"><TagList locale={locale} items={locale === 'de' ? ['Spezielle interne Workflows', 'Custom Interfaces', 'Spezialisierte Nutzergruppen', 'Ungewöhnliche Geschäftsregeln', 'Custom Dashboards', 'Spezifische Anwendungen', 'Domain-spezifische Software'] : ['Special internal workflows', 'Custom interfaces', 'Specialized user groups', 'Unusual business rules', 'Custom dashboards', 'Specific applications', 'Domain-specific software']} /></ServiceBlock>
      <ServiceBlock id="ai" number="05" title={c.services.aiTitle} lead={c.services.aiLead} icon="brain"><MachineFlow ai /><TagList locale={locale} items={locale === 'de' ? ['AI Discovery', 'Use-case Analyse', 'RAG', 'Knowledge Search', 'Dokumentenverständnis', 'Copilots', 'Agent Workflows', 'Tool Use', 'Human-in-the-loop', 'AI Evaluation', 'Monitoring', 'Safeguards'] : ['AI discovery', 'Use-case analysis', 'RAG', 'Knowledge search', 'Document understanding', 'Copilots', 'Agent workflows', 'Tool use', 'Human-in-the-loop', 'AI evaluation', 'Monitoring', 'Safeguards']} /></ServiceBlock>
      <ServiceBlock id="mobile" number="06" title={c.services.mobileTitle} lead={c.services.mobileLead} icon="phone"><TagList locale={locale} items={['iOS', 'Android', locale === 'de' ? 'Native Entwicklung' : 'Native development', locale === 'de' ? 'Cross-platform' : 'Cross-platform', 'Backend', 'Authentication', 'Push Notifications', locale === 'de' ? 'Offline-Unterstützung' : 'Offline support', 'Testing', 'Deployment', 'Store Release', 'Games', 'Interactive Products']} /></ServiceBlock>
      <ServiceBlock id="integration" number="07" title={c.services.integrationTitle} lead={c.services.integrationLead} icon="link"><TagList locale={locale} items={['REST APIs', locale === 'de' ? 'Datenflüsse' : 'Data flows', locale === 'de' ? 'Authentifizierung' : 'Authentication', locale === 'de' ? 'Synchronisation' : 'Synchronization', locale === 'de' ? 'Systemintegration' : 'System integration', locale === 'de' ? 'Cloud Deployment' : 'Cloud deployment', locale === 'de' ? 'Legacy-Integration' : 'Legacy integration', locale === 'de' ? 'Backend Services' : 'Backend services']} /></ServiceBlock>
    </div></section>
  </Shell>;
}

function ServiceBlock({ id, number, title, lead, icon, children }: { id: string; number: string; title: string; lead: string; icon: 'pulse' | 'code' | 'globe' | 'spark' | 'brain' | 'phone' | 'link'; children?: React.ReactNode }) {
  return <article id={id} className="service-detail"><div className="service-detail-head"><div className="service-detail-icon"><Icon name={icon} /></div><div><span className="eyebrow">{number} /</span><h2>{title}</h2><p>{lead}</p></div></div><div className="service-detail-body">{children}</div></article>;
}

function TagList({ items }: { locale: Locale; items: string[] }) { return <div className="tag-grid">{items.map((item, i) => <span className="tag" key={`${item}-${i}`}><span className="tech-dot" />{item}</span>)}</div>; }
