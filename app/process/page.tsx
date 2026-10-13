import { ProcessPage } from '@/page-components/ProcessPage';
import { pageMetadata } from '@/lib/pageMetadata';
export const metadata = pageMetadata({ locale: 'de', path: '/process', title: 'Prozess — WeserCode', description: 'Vom Erstkontakt über Discovery und Entwicklung bis Support, Weiterentwicklung und End of Life.' });
export default function Page() { return <ProcessPage locale="de" />; }
