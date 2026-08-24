import { getSiteContent } from '@/lib/content';
import ClientAboutPage from './ClientAboutPage';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.about_meta_title || 'About Us | SHAZ Clinic & Salon',
    description: content.about_meta_description || 'Learn more about SHAZ Clinic & Salon, our mission, vision, and the expert team behind our personalized aesthetic treatments in Seminyak, Bali.',
  };
}

export default async function AboutPage() {
  const initialContent = await getSiteContent();
  return <ClientAboutPage initialContent={initialContent} />;
}
