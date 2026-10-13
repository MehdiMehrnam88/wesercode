import { FAQPage } from '@/page-components/FAQPage';
import { pageMetadata } from '@/lib/pageMetadata';
export const metadata = pageMetadata({ locale: 'de', path: '/faq', title: 'FAQ — WeserCode', description: 'Praktische Antworten zu Projekten, bestehenden Systemen, Mobile, AI und Zusammenarbeit.' });
export default function Page() { return <FAQPage locale="de" />; }
