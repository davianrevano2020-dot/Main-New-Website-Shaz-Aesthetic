import { Metadata } from 'next';
import { getSiteContent } from '@/lib/content';
import ClientPackagesPage from './ClientPackagesPage';

export const metadata: Metadata = {
  title: 'Exclusive Packages | SHAZ Aesthetic Clinic Seminyak Bali',
  description: 'Discover premium curated packages for Skin, Anti-Aging, Acne, and Bridal treatments at SHAZ Aesthetic Clinic Seminyak, Bali.',
  openGraph: {
    title: 'Exclusive Packages | SHAZ Aesthetic Clinic Bali',
    description: 'Curated aesthetic packages combining our best treatments for optimal results and exceptional value.',
  }
};

export const dynamic = 'force-dynamic';

export default async function PackagesPage() {
  const initialContent = await getSiteContent();
  return <ClientPackagesPage initialContent={initialContent} />;
}
