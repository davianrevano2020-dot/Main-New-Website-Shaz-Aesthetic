const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');
// Extract Logo component and put it outside
code = code.replace(/const Logo = \(\{ className = "h-10 md:h-12" \}: \{ className\?: string \}\) => \([\s\S]*?\);\n/g, '');
const logoDef = `const Logo = ({ className = "h-10 md:h-12" }: { className?: string }) => (
  <img
    src="https://thinkgenc.com/image-file/shaz-logo-transparan.svg"
    alt="SHAZ Salon Beauty Wellness"
    className={\`w-auto object-contain \${className}\`}
  />
);
`;
code = code.replace(/export default function Page\(\) \{/, logoDef + '\nexport default function Page() {');

// Fix unescaped entities
code = code.replace(/It's/g, "It&apos;s");
code = code.replace(/isn't/g, "isn&apos;t");
code = code.replace(/don't/g, "don&apos;t");

fs.writeFileSync('app/page.tsx', code);
