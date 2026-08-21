import { getSiteContent } from '@/lib/content';
import ClientHomePage from './ClientHomePage';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const initialContent = await getSiteContent();
  return <ClientHomePage initialContent={initialContent} />;
}
