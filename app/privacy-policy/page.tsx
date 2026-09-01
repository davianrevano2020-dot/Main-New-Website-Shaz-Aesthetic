import ClientPrivacyPolicyPage from './ClientPrivacyPolicyPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | SHAZ Aesthetic Clinic & Salon',
  description: 'Learn how SHAZ Aesthetic Clinic & Salon collects, uses, and protects your personal and medical information.',
};

export default function PrivacyPolicyPage() {
  return <ClientPrivacyPolicyPage />;
}
