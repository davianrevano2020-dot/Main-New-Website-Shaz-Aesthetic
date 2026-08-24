const fs = require('fs');
let code = fs.readFileSync('app/about/page.tsx', 'utf8');

if (!code.includes('generateMetadata')) {
  code = code.replace(
    "import ClientAboutPage from './ClientAboutPage';",
    "import ClientAboutPage from './ClientAboutPage';\nimport type { Metadata } from 'next';"
  );

  code = code.replace(
    "export const dynamic = 'force-dynamic';",
    "export const dynamic = 'force-dynamic';\n\nexport async function generateMetadata(): Promise<Metadata> {\n  const content = await getSiteContent();\n  return {\n    title: content.about_meta_title || 'About Us | SHAZ Clinic & Salon',\n    description: content.about_meta_description || 'Learn more about SHAZ Clinic & Salon, our mission, vision, and the expert team behind our personalized aesthetic treatments in Seminyak, Bali.',\n  };\n}"
  );

  fs.writeFileSync('app/about/page.tsx', code);
  console.log('done about page');
} else {
  console.log('already has metadata');
}
