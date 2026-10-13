import { faqs, site } from '@/lib/i18n';
import type { SitePage } from '@/page-components/Shell';

const base = 'https://www.wesercode.de';

const pageTitles = {
  de: {
    home: 'WeserCode — Software, Apps, Web & AI aus Bremen',
    services: 'Services — WeserCode',
    process: 'Prozess — WeserCode',
    about: 'Über uns — WeserCode',
    faq: 'FAQ — WeserCode',
    contact: 'Kontakt — WeserCode',
  },
  en: {
    home: 'WeserCode — Software, Apps, Web & AI from Bremen',
    services: 'Services — WeserCode',
    process: 'Process — WeserCode',
    about: 'About — WeserCode',
    faq: 'FAQ — WeserCode',
    contact: 'Contact — WeserCode',
  },
} as const;

const pageDescriptions = {
  de: {
    home: 'WeserCode entwickelt digitale Systeme rund um reale Anforderungen: Web, Software, mobile Apps, AI, Automation und Systemintegration.',
    services: 'Individuelle Software, Websites, Apps, AI-Lösungen, Automatisierung, APIs und Systemintegration von WeserCode aus Bremen.',
    process: 'Vom Erstkontakt über Discovery und Entwicklung bis Support, Weiterentwicklung und End of Life.',
    about: 'Arbeitsweise, ausgewählte Kundenprojekte, Team, Werte und aktuelle Ausrichtung von WeserCode in Bremen.',
    faq: 'Praktische Antworten zu Projekten, bestehenden Systemen, Mobile, AI und Zusammenarbeit.',
    contact: 'Projektanfrage an WeserCode aus Bremen: Problem, Idee oder bestehendes System beschreiben.',
  },
  en: {
    home: 'WeserCode builds digital systems around real requirements: web, software, mobile apps, AI, automation and system integration.',
    services: 'Software, web, mobile, AI, automation and system integration services from WeserCode.',
    process: 'From first contact and discovery through development, support, further development and end of life.',
    about: 'How WeserCode works, selected client projects, team, values and current positioning in Bremen.',
    faq: 'Practical answers about projects, existing systems, mobile, AI and collaboration.',
    contact: 'Contact WeserCode from Bremen with a project idea, problem or existing system.',
  },
} as const;

const services = [
  ['Web Development', 'Websites, landing pages, web applications, portals, responsive frontends, technical SEO and API integrations.', '/services#web'],
  ['Software Development', 'Custom internal applications, portals, dashboards, role-based systems, databases, APIs and business workflows.', '/services#software'],
  ['AI Solutions', 'AI discovery, RAG, knowledge search, document understanding, copilots, agent workflows, evaluation and safeguards.', '/services#ai'],
  ['Mobile App Development', 'iOS and Android applications, native and cross-platform development, backend services, authentication and deployment.', '/services#mobile'],
  ['Automation & Machine Data', 'Machine-data collection, processing, visualization, alerts, reporting, workflows and system integration.', '/services#machine'],
  ['System Integration', 'REST APIs, data flows, authentication, synchronization, cloud deployment, legacy integration and backend services.', '/services#integration'],
];

function urlFor(page: SitePage, locale: 'de' | 'en') {
  const suffix = page === 'home' ? '' : `/${page}`;
  return `${base}${locale === 'en' ? '/en' : ''}${suffix}`;
}

function breadcrumbItems(page: SitePage, locale: 'de' | 'en') {
  const home = locale === 'de' ? 'Home' : 'Home';
  const labels = {
    services: locale === 'de' ? 'Services' : 'Services',
    process: locale === 'de' ? 'Prozess' : 'Process',
    about: locale === 'de' ? 'Über uns' : 'About',
    faq: 'FAQ',
    contact: locale === 'de' ? 'Kontakt' : 'Contact',
  } as const;
  const items = [{ name: home, url: urlFor('home', locale) }];
  if (page !== 'home') items.push({ name: labels[page as keyof typeof labels], url: urlFor(page, locale) });
  return items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url }));
}

export function StructuredData({ locale, page }: { locale: 'de' | 'en'; page: SitePage }) {
  const description = pageDescriptions[locale][page];
  const url = urlFor(page, locale);
  const organizationId = `${base}/#organization`;

  const graph: Record<string, unknown>[] = [
    {
      '@type': ['Organization', 'ProfessionalService', 'LocalBusiness'],
      '@id': organizationId,
      name: site.name,
      url: base,
      logo: `${base}/brand/wesercode-logo.png`,
      image: `${base}/banners/HomepageBanner.png`,
      description: pageDescriptions[locale].home,
      email: site.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rotdornpfad 31',
        postalCode: '28355',
        addressLocality: 'Bremen',
        addressCountry: 'DE',
      },
      areaServed: [
        { '@type': 'City', name: 'Bremen' },
        { '@type': 'Country', name: 'Germany' },
      ],
      knowsAbout: [
        'Software development', 'Web development', 'Mobile applications',
        'Artificial intelligence', 'Process automation', 'Machine data automation',
        'System integration', 'API development', 'Technical SEO',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${base}/#website`,
      url: base,
      name: site.name,
      publisher: { '@id': organizationId },
      inLanguage: ['de-DE', 'en'],
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: pageTitles[locale][page],
      description,
      isPartOf: { '@id': `${base}/#website` },
      about: { '@id': organizationId },
      inLanguage: locale === 'de' ? 'de-DE' : 'en',
      breadcrumb: { '@id': `${url}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumbItems(page, locale),
    },
  ];

  if (page === 'services') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${url}#services`,
      name: locale === 'de' ? 'WeserCode Services' : 'WeserCode Services',
      itemListElement: services.map(([name, description, path], index) => ({
        '@type': 'ListItem', position: index + 1, name,
        item: { '@type': 'Service', name, description, url: `${base}${locale === 'en' ? '/en' : ''}${path}`,
          provider: { '@id': organizationId }, serviceType: name, areaServed: { '@type': 'Country', name: 'Germany' } },
      })),
    });
  }

  if (page === 'faq') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs[locale].map(([question, answer]) => ({
        '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }} />;
}
