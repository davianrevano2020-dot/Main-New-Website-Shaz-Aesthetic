import { getSiteContent } from '../../lib/content';
import ClientReviewsPage from './ClientReviewsPage';

export const dynamic = 'force-dynamic';

export default async function ReviewsPage() {
  const initialContent = await getSiteContent();
  return <ClientReviewsPage initialContent={initialContent} />;
}
