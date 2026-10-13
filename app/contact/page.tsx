import { ContactPage } from '@/page-components/ContactPage';
import { pageMetadata } from '@/lib/pageMetadata';
export const metadata = pageMetadata({ locale: 'de', path: '/contact', title: 'Kontakt — WeserCode', description: 'Projektanfrage an WeserCode aus Bremen: Problem, Idee oder bestehendes System beschreiben.' });
export default function Page() { return <ContactPage locale="de" />; }
