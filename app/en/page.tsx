import { HomePage } from '@/page-components/HomePage';
import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata({ locale: 'en', path: '/en', title: 'WeserCode — Software, Apps, Web & AI from Bremen', description: 'WeserCode builds digital systems around real requirements: web, software, mobile apps, AI, automation and system integration.' });

export default function Page() { return <HomePage locale="en" />; }
