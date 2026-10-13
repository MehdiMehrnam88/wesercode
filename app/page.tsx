import { HomePage } from '@/page-components/HomePage';
import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata({ locale: 'de', path: '/', title: 'WeserCode — Software, Apps, Web & AI aus Bremen', description: 'WeserCode entwickelt digitale Systeme rund um reale Anforderungen: Web, Software, mobile Apps, AI, Automation und Systemintegration.' });

export default function Page() { return <HomePage locale="de" />; }
