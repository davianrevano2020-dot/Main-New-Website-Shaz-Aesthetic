import { getSiteContent } from '@/lib/content';
import ClientLocationsPage from './ClientLocationsPage';

export const dynamic = 'force-dynamic';

export default async function LocationsPage() {
  const initialContent = await getSiteContent();
  return <ClientLocationsPage initialContent={initialContent} />;
}
