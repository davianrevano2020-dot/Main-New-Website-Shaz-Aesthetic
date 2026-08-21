import { getSiteContent } from '../../../lib/content';
import ClientPromotionBackOffice from './ClientPromotionBackOffice';

export const revalidate = 0; // Disable cache for back-office

export default async function PromotionBackOfficePage() {
  const initialContent = await getSiteContent();
  return <ClientPromotionBackOffice initialContent={initialContent} />;
}
