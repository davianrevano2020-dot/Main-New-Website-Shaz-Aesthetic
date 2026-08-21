import { Metadata } from 'next';
import { getSiteContent } from '@/lib/content';
import ClientDoctorPage from './ClientDoctorPage';

export const metadata: Metadata = {
  title: 'Our Doctors & Medical Specialists | SHAZ Aesthetic Clinic Seminyak',
  description: 'Meet our team of certified aesthetic physicians and dermatological specialists at SHAZ Aesthetic Clinic Bali. Evidence-based care, facial harmonization, and clinical excellence.',
  openGraph: {
    title: 'Our Doctors & Medical Specialists | SHAZ Aesthetic Clinic Bali',
    description: 'Certified aesthetic physicians and dermatologists dedicated to natural, medical-grade beauty in Seminyak, Bali.',
  }
};

export const revalidate = 0; // Fresh dynamic content from CMS

export default async function DoctorPage() {
  const content = await getSiteContent();

  return <ClientDoctorPage initialContent={content} />;
}
