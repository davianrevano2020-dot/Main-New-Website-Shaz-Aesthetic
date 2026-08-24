import { getSiteContent } from '@/lib/content';
import ClientHomePage from './ClientHomePage';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.home_meta_title || 'SHAZ Clinic & Salon | Beauty, Refined by Medical Expertise',
    description: content.home_meta_description || 'Personalized aesthetic treatments and premium salon experiences designed around your unique beauty goals in Seminyak, Bali.',
  };
}

export default async function Page() {
  const initialContent = await getSiteContent();
  return <ClientHomePage initialContent={initialContent} />;
}
