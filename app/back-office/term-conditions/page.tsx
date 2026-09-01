import { getSiteContent } from '@/lib/content';
import ClientTermConditionsBackOffice from './ClientTermConditionsBackOffice';

export const dynamic = 'force-dynamic';

export default async function TermConditionsBackOfficePage() {
  const initialContent = await getSiteContent();
  return <ClientTermConditionsBackOffice initialContent={initialContent} />;
}
