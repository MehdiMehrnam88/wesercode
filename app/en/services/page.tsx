import { ServicesPage } from '@/page-components/ServicesPage';
import { pageMetadata } from '@/lib/pageMetadata';
export const metadata = pageMetadata({ locale: 'en', path: '/en/services', title: 'Services — WeserCode', description: 'Software, web, mobile, AI, automation and system integration services from WeserCode.' });
export default function Page() { return <ServicesPage locale="en" />; }
