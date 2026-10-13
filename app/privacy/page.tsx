import type { Metadata } from 'next';
import { PrivacyPage } from '@/page-components/LegalPage';
export const metadata: Metadata = { title: 'Datenschutz — WeserCode', robots: { index: false, follow: false } };
export default function Page() { return <PrivacyPage locale="de" />; }
