import { Metadata } from 'next';
import { getSiteContent } from '@/lib/content';
import ClientTreatmentPage from './ClientTreatmentPage';

export const metadata: Metadata = {
  title: 'Treatments & Services | SHAZ Aesthetic Clinic Seminyak Bali',
  description: 'Explore bespoke medical aesthetic treatments, master injectables, precision lasers, facial rejuvenation, body contouring, and luxury salon rituals in Seminyak, Bali.',
  openGraph: {
    title: 'Treatments & Services | SHAZ Aesthetic Clinic Bali',
    description: 'Personalized aesthetic treatments and luxury salon rituals designed around your unique beauty goals in Seminyak, Bali.',
  }
};

export const dynamic = 'force-dynamic';

export default async function TreatmentPage() {
  const initialContent = await getSiteContent();
  return <ClientTreatmentPage initialContent={initialContent} />;
}
