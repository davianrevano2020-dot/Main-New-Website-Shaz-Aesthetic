import { getSiteContent } from '@/lib/content';
import ClientPrivacyPolicyBackOffice from './ClientPrivacyPolicyBackOffice';

export const dynamic = 'force-dynamic';

export default async function PrivacyPolicyBackOfficePage() {
  const initialContent = await getSiteContent();
  return <ClientPrivacyPolicyBackOffice initialContent={initialContent} />;
}
