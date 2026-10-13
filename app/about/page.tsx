import { AboutPage } from '@/page-components/AboutPage';
import { pageMetadata } from '@/lib/pageMetadata';
export const metadata = pageMetadata({ locale: 'de', path: '/about', title: 'Über uns — WeserCode', description: 'Arbeitsweise, ausgewählte Kundenprojekte, Ansprechpartner, Werte und aktuelle Ausrichtung von WeserCode in Bremen.' });
export default function Page() { return <AboutPage locale="de" />; }
