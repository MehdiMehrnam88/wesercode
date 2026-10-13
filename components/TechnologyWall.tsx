'use client';

import { useMemo, useState } from 'react';

const groups = {
  de: {
    Alle: ['TypeScript', 'React / Next.js', 'HTML / CSS', 'Tailwind', 'Node.js', 'Python', 'PHP / Laravel', 'SQL', 'PostgreSQL', 'REST APIs', 'Swift', 'SwiftUI', 'Kotlin', 'Flutter', 'Firebase / Push', 'RAG', 'Vector Search', 'AI Agents', 'Prompt Design', 'Tool Design', 'Evaluation', 'Guardrails', 'Docker', 'AWS / Cloud', 'CI/CD', 'Observability'],
    Web: ['TypeScript', 'React / Next.js', 'HTML / CSS', 'Tailwind'],
    Backend: ['Node.js', 'Python', 'PHP / Laravel', 'SQL', 'PostgreSQL', 'REST APIs'],
    Mobile: ['Swift', 'SwiftUI', 'Kotlin', 'Flutter', 'Firebase / Push'],
    AI: ['RAG', 'Vector Search', 'AI Agents', 'Prompt Design', 'Tool Design', 'Evaluation', 'Guardrails'],
    Infrastruktur: ['Docker', 'AWS / Cloud', 'CI/CD', 'Observability'],
  },
  en: {
    All: ['TypeScript', 'React / Next.js', 'HTML / CSS', 'Tailwind', 'Node.js', 'Python', 'PHP / Laravel', 'SQL', 'PostgreSQL', 'REST APIs', 'Swift', 'SwiftUI', 'Kotlin', 'Flutter', 'Firebase / Push', 'RAG', 'Vector Search', 'AI Agents', 'Prompt Design', 'Tool Design', 'Evaluation', 'Guardrails', 'Docker', 'AWS / Cloud', 'CI/CD', 'Observability'],
    Web: ['TypeScript', 'React / Next.js', 'HTML / CSS', 'Tailwind'],
    Backend: ['Node.js', 'Python', 'PHP / Laravel', 'SQL', 'PostgreSQL', 'REST APIs'],
    Mobile: ['Swift', 'SwiftUI', 'Kotlin', 'Flutter', 'Firebase / Push'],
    AI: ['RAG', 'Vector Search', 'AI Agents', 'Prompt Design', 'Tool Design', 'Evaluation', 'Guardrails'],
    Infrastructure: ['Docker', 'AWS / Cloud', 'CI/CD', 'Observability'],
  },
} as const;

export function TechnologyWall({ locale }: { locale: 'de' | 'en' }) {
  const data = groups[locale];
  const tabs = Object.keys(data) as Array<keyof typeof data>;
  const [active, setActive] = useState<keyof typeof data>(tabs[0]);
  const items = useMemo(() => data[active], [active, data]);
  return <div className="tech-wall">
    <div className="tech-tabs" role="tablist" aria-label={locale === 'de' ? 'Technologiegruppen' : 'Technology groups'}>
      {tabs.map((tab) => <button key={tab} type="button" className={active === tab ? 'active' : ''} onClick={() => setActive(tab)} role="tab" aria-selected={active === tab}>{tab}</button>)}
    </div>
    <div className="tech-items">
      {items.map((item, i) => <div className="tech-item" key={item}><span className="tech-dot" />{item}<span className="tech-no">{String(i + 1).padStart(2, '0')}</span></div>)}
    </div>
  </div>;
}
