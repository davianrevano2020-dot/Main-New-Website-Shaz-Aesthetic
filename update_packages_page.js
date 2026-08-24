const fs = require('fs');
let code = fs.readFileSync('app/packages/page.tsx', 'utf8');

const generateMetadataCode = `export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.packages_meta_title || 'Exclusive Packages | SHAZ Aesthetic Clinic Seminyak Bali',
    description: content.packages_meta_description || 'Discover premium curated packages for Skin, Anti-Aging, Acne, and Bridal treatments at SHAZ Aesthetic Clinic Seminyak, Bali.',
    openGraph: {
      title: content.packages_meta_title || 'Exclusive Packages | SHAZ Aesthetic Clinic Bali',
      description: content.packages_meta_description || 'Curated aesthetic packages combining our best treatments for optimal results and exceptional value.',
    }
  };
}`;

code = code.replace(/export const metadata: Metadata = \{[\s\S]*?\};/, generateMetadataCode);

fs.writeFileSync('app/packages/page.tsx', code);
console.log('done packages page');
