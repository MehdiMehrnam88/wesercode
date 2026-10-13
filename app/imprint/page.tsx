import type { Metadata } from 'next';
import { ImprintPage } from '@/page-components/LegalPage';
export const metadata: Metadata = { title: 'Impressum — WeserCode', robots: { index: false, follow: false } };
export default function Page() { return <ImprintPage locale="de" />; }
