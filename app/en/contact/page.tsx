import { ContactPage } from '@/page-components/ContactPage';
import { pageMetadata } from '@/lib/pageMetadata';
export const metadata = pageMetadata({ locale: 'en', path: '/en/contact', title: 'Contact — WeserCode', description: 'Contact WeserCode from Bremen with a project idea, problem or existing system.' });
export default function Page() { return <ContactPage locale="en" />; }
