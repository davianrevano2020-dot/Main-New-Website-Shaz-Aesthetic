import { getSiteContent } from '../../lib/content';
import ClientReviewsPage from './ClientReviewsPage';

export const revalidate = 60;

export default async function ReviewsPage() {
  const initialContent = await getSiteContent();
  return <ClientReviewsPage initialContent={initialContent} />;
}
