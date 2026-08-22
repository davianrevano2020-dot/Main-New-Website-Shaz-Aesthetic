const fs = require('fs');
const file = 'app/back-office/reviews/page.tsx';
let code = fs.readFileSync(file, 'utf8');

code = `
'use client';
import dynamic from 'next/dynamic';

const ClientReviewsBackOffice = dynamic(() => import('./ClientReviewsBackOffice'), { ssr: false });

export default function ReviewsBackOfficePage() {
  return <ClientReviewsBackOffice />;
}
`;

fs.writeFileSync(file, code.trim());
console.log('Patched backoffice page');
