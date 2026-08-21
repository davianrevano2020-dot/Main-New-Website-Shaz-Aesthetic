import { getSiteContent } from '@/lib/content';
import ClientAboutPage from './ClientAboutPage';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const initialContent = await getSiteContent();
  return <ClientAboutPage initialContent={initialContent} />;
}
