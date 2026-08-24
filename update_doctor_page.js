const fs = require('fs');
let code = fs.readFileSync('app/doctor/page.tsx', 'utf8');

// Replace static metadata with generateMetadata
const generateMetadataCode = `export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.doctor_meta_title || 'Our Doctors & Medical Specialists | SHAZ Aesthetic Clinic Seminyak',
    description: content.doctor_meta_description || 'Meet our team of certified aesthetic physicians and dermatological specialists at SHAZ Aesthetic Clinic Bali. Evidence-based care, facial harmonization, and clinical excellence.',
    openGraph: {
      title: content.doctor_meta_title || 'Our Doctors & Medical Specialists | SHAZ Aesthetic Clinic Bali',
      description: content.doctor_meta_description || 'Certified aesthetic physicians and dermatologists dedicated to natural, medical-grade beauty in Seminyak, Bali.',
    }
  };
}`;

code = code.replace(/export const metadata: Metadata = \{[\s\S]*?\};/, generateMetadataCode);

fs.writeFileSync('app/doctor/page.tsx', code);
console.log('done doctor page');
