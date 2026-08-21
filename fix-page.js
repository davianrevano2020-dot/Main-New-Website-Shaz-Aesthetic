const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');
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
fs.writeFileSync('app/page.tsx', code);
