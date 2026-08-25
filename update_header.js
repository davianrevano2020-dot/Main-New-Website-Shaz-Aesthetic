const fs = require('fs');

let content = fs.readFileSync('components/Header.tsx', 'utf8');

if (!content.includes('/blog')) {
  content = content.replace(
    /{ name: 'Contact', href: '\/contact' }/,
    "{ name: 'Journal', href: '/blog' },\n  { name: 'Contact', href: '/contact' }"
  );
  fs.writeFileSync('components/Header.tsx', content);
}
