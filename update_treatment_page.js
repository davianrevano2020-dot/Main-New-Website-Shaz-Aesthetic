const fs = require('fs');
let code = fs.readFileSync('app/treatment/page.tsx', 'utf8');

// Replace static metadata with generateMetadata
const generateMetadataCode = `export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.treatment_meta_title || 'Treatments & Services | SHAZ Aesthetic Clinic Seminyak Bali',
    description: content.treatment_meta_description || 'Explore bespoke medical aesthetic treatments, master injectables, precision lasers, facial rejuvenation, body contouring, and luxury salon rituals in Seminyak, Bali.',
    openGraph: {
      title: content.treatment_meta_title || 'Treatments & Services | SHAZ Aesthetic Clinic Bali',
      description: content.treatment_meta_description || 'Personalized aesthetic treatments and luxury salon rituals designed around your unique beauty goals in Seminyak, Bali.',
    }
  };
}`;

code = code.replace(/export const metadata: Metadata = \{[\s\S]*?\};/, generateMetadataCode);

fs.writeFileSync('app/treatment/page.tsx', code);
console.log('done treatment page');
