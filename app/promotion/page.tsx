import { getSiteContent } from '../../lib/content';
import ClientPromotionPage from './ClientPromotionPage';

export const dynamic = 'force-dynamic';

export default async function PromotionPage() {
  const initialContent = await getSiteContent();
  return <ClientPromotionPage initialContent={initialContent} />;
}
