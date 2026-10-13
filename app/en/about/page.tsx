import { AboutPage } from '@/page-components/AboutPage';
import { pageMetadata } from '@/lib/pageMetadata';
export const metadata = pageMetadata({ locale: 'en', path: '/en/about', title: 'About — WeserCode', description: 'How WeserCode works, selected client projects, contact and current positioning in Bremen.' });
export default function Page() { return <AboutPage locale="en" />; }
