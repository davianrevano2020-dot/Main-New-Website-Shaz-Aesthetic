import { getSiteContent } from '@/lib/content';
import ClientLocationsBackOffice from './ClientLocationsBackOffice';

export const dynamic = 'force-dynamic';

export default async function LocationsBackOfficePage() {
  const initialContent = await getSiteContent();
  return <ClientLocationsBackOffice initialContent={initialContent} />;
}
