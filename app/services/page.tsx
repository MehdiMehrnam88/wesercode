import { ServicesPage } from '@/page-components/ServicesPage';
import { pageMetadata } from '@/lib/pageMetadata';
export const metadata = pageMetadata({ locale: 'de', path: '/services', title: 'Services — WeserCode', description: 'Individuelle Software, Websites, Apps, AI-Lösungen, Automatisierung, APIs und Systemintegration von WeserCode aus Bremen.' });
export default function Page() { return <ServicesPage locale="de" />; }
