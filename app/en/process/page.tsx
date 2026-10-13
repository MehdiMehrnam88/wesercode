import { ProcessPage } from '@/page-components/ProcessPage';
import { pageMetadata } from '@/lib/pageMetadata';
export const metadata = pageMetadata({ locale: 'en', path: '/en/process', title: 'Process — WeserCode', description: 'From first contact and discovery through development, support and end of life.' });
export default function Page() { return <ProcessPage locale="en" />; }
