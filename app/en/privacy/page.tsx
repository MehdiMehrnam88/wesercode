import type { Metadata } from 'next';
import { PrivacyPage } from '@/page-components/LegalPage';
export const metadata: Metadata = { title: 'Privacy — WeserCode', robots: { index: false, follow: false } };
export default function Page() { return <PrivacyPage locale="en" />; }
