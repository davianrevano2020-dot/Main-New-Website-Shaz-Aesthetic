import { getSiteContent } from '@/lib/content';
import ClientFaqPage from './ClientFaqPage';

export const metadata = {
  title: 'FAQ | SHAZ Aesthetic Clinic',
  description: 'Frequently Asked Questions about our aesthetic treatments, booking process, recovery, and clinic policies.',
};

export const dynamic = 'force-dynamic';

export default async function FaqPage() {
  const initialContent = await getSiteContent();
  return <ClientFaqPage initialContent={initialContent} />;
}
