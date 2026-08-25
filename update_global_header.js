const fs = require('fs');
let content = fs.readFileSync('app/components/GlobalHeader.tsx', 'utf8');

if (!content.includes("label: 'Journal'")) {
  content = content.replace(
    /\{ id: '8', label: 'Contact', url: '\/contact', newTab: false \},/,
    "{ id: '8', label: 'Journal', url: '/blog', newTab: false },\n  { id: '10', label: 'Contact', url: '/contact', newTab: false },"
  );
  fs.writeFileSync('app/components/GlobalHeader.tsx', content);
}
