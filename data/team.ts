export type TeamMember = {
  id: string;
  name: string;
  role: { de: string; en: string };
  bio: { de: string; en: string };
  skills: readonly string[];
  photo: string;
  kind: 'member' | 'owner';
};

export const teamMembers: TeamMember[] = [
  {
    id: 'anna-weber',
    name: 'Anna Weber',
    role: {
      de: 'Frontend-Entwicklerin & UI/UX Designerin',
      en: 'Frontend Developer & UI/UX Designer',
    },
    bio: {
      de: 'Anna verbindet moderne Frontend-Entwicklung mit einem starken Gespür für klare Nutzerführung. Ihr Fokus liegt auf responsiven Interfaces, Designsystemen und digitalen Produkten, die sich präzise und angenehm bedienen lassen.',
      en: 'Anna combines modern frontend engineering with a strong sense for clear user experience. Her focus is on responsive interfaces, design systems and digital products that feel precise and natural to use.',
    },
    skills: ['React', 'TypeScript', 'UI/UX', 'Accessibility'],
    photo: '/team/anna-weber.jpg',
    kind: 'member',
  },
  {
    id: 'sophie-keller',
    name: 'Sophie Keller',
    role: {
      de: 'Backend- & Cloud-Entwicklerin',
      en: 'Backend & Cloud Engineer',
    },
    bio: {
      de: 'Sophie arbeitet an robusten Backend-Systemen, APIs und Cloud-Infrastruktur. Sie verbindet technische Stabilität mit einer Architektur, die sich nachvollziehbar erweitern, integrieren und betreiben lässt.',
      en: 'Sophie works on robust backend systems, APIs and cloud infrastructure. She combines technical stability with architecture that can be extended, integrated and operated predictably.',
    },
    skills: ['Node.js', 'Python', 'AWS', 'APIs'],
    photo: '/team/sophie-keller.jpg',
    kind: 'member',
  },
  {
    id: 'lukas-schneider',
    name: 'Lukas Schneider',
    role: {
      de: 'Fullstack-Entwickler & DevOps',
      en: 'Fullstack Developer & DevOps',
    },
    bio: {
      de: 'Lukas verbindet Frontend, Backend und Betrieb. Er arbeitet an modernen Anwendungen, automatisierten Deployments und stabilen technischen Grundlagen vom ersten Build bis zum produktiven Betrieb.',
      en: 'Lukas connects frontend, backend and operations. He works on modern applications, automated deployments and stable technical foundations from the first build to production.',
    },
    skills: ['Next.js', 'Docker', 'CI/CD', 'Monitoring'],
    photo: '/team/lukas-schneider.webp',
    kind: 'member',
  },
  {
    id: 'mehdi-mehrnam',
    name: 'Mehdi Mehrnam',
    role: {
      de: 'Inhaber',
      en: 'Sole proprietor',
    },
    bio: {
      de: 'Ansprechpartner für die Einordnung von Vorhaben und die Entwicklung passender digitaler Systeme.',
      en: 'Contact for understanding project needs and developing suitable digital systems.',
    },
    skills: ['Software', 'Web', 'Apps', 'AI'],
    photo: '/team/mehdi-mehrnam.png',
    kind: 'owner',
  },
];
