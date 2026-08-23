import { getSiteContent } from '@/lib/content';
import ClientContactPage from './ClientContactPage';

export const metadata = {
  title: 'Contact Us | SHAZ Aesthetic Clinic',
  description: 'Get in touch with SHAZ Aesthetic Clinic. We are here to answer your questions and help you book a consultation.',
};

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const initialContent = await getSiteContent();
  return <ClientContactPage initialContent={initialContent} />;
}
