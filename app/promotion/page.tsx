import { getSiteContent } from '../../lib/content';
import ClientPromotionPage from './ClientPromotionPage';

export const revalidate = 60; // Revalidate every minute if using ISR

export default async function PromotionPage() {
  const initialContent = await getSiteContent();
  return <ClientPromotionPage initialContent={initialContent} />;
}
