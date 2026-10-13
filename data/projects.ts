export type Project = {
  id: string;
  name: string;
  domain: string;
  url: string;
  preview: string;
  type: { de: string; en: string };
  description: { de: string; en: string };
  tags: { de: string[]; en: string[] };
};

export const projects: Project[] = [
  {
    id: 'msg-solution',
    name: 'MSG Solution',
    domain: 'msg-solution.de',
    url: 'https://msg-solution.de/',
    preview: '/projects/msg-solution.svg',
    type: { de: 'Software & Web', en: 'Software & Web' },
    description: {
      de: 'Eine auf individuelle Softwarelösungen ausgerichtete Unternehmenswebsite mit klarer Leistungsstruktur, Portfolio und Kontaktbereich.',
      en: 'A business website focused on custom software solutions, with a clear service structure, portfolio and contact experience.',
    },
    tags: { de: ['Webentwicklung', 'Software', 'Responsive'], en: ['Web Development', 'Software', 'Responsive'] },
  },
  {
    id: 'volt-script',
    name: 'Volt Script',
    domain: 'volt-script.de',
    url: 'https://volt-script.de/',
    preview: '/projects/volt-script.svg',
    type: { de: 'Industrial Software', en: 'Industrial Software' },
    description: {
      de: 'Eine technisch ausgerichtete Website rund um IT/OT-Konvergenz, PLC-Systeme, Echtzeitsteuerung, OPC UA, HMI/SCADA und industrielle Datenintegration.',
      en: 'A technical website focused on IT/OT convergence, PLC systems, real-time control, OPC UA, HMI/SCADA and industrial data integration.',
    },
    tags: { de: ['Industrial', 'IT/OT', 'OPC UA', 'AI'], en: ['Industrial', 'IT/OT', 'OPC UA', 'AI'] },
  },
  {
    id: 'novef',
    name: 'NOVEF',
    domain: 'novef.com',
    url: 'https://novef.com/',
    preview: '/projects/novef.svg',
    type: { de: 'Website', en: 'Website' },
    description: {
      de: 'Ein weiteres umgesetztes Webprojekt. Die Projektkarte verlinkt direkt auf die bestehende Website und hält den Überblick bewusst kompakt.',
      en: 'Another delivered web project. The project card links directly to the existing website and keeps the portfolio view intentionally concise.',
    },
    tags: { de: ['Webentwicklung', 'Design', 'Responsive'], en: ['Web Development', 'Design', 'Responsive'] },
  },
];
