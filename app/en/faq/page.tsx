import { FAQPage } from '@/page-components/FAQPage';
import { pageMetadata } from '@/lib/pageMetadata';
export const metadata = pageMetadata({ locale: 'en', path: '/en/faq', title: 'FAQ — WeserCode', description: 'Practical answers about projects, existing systems, mobile, AI and collaboration.' });
export default function Page() { return <FAQPage locale="en" />; }
