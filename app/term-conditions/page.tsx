import ClientTermConditionsPage from './ClientTermConditionsPage';
import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Terms & Conditions | SHAZ Aesthetic Clinic & Salon',
  description: 'Terms governing your use of our website and clinic services at SHAZ Aesthetic Clinic & Salon.',
};

export const dynamic = 'force-dynamic';

export default async function TermConditionsPage() {
  const initialContent = await getSiteContent();
  return <ClientTermConditionsPage initialContent={initialContent} />;
}
