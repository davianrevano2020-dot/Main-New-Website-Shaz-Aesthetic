const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');
const logoDef = `const Logo = ({ className = "h-10 md:h-12" }: { className?: string }) => (
  /* @eslint-disable-next-line @next/next/no-img-element */
  <img
    src="https://thinkgenc.com/image-file/shaz-logo-transparan.svg"
    alt="SHAZ Salon Beauty Wellness"
    className={\`w-auto object-contain \${className}\`}
  />
);
`;

code = code.replace(/export default function ShazLandingPage\(\) \{/, logoDef + '\nexport default function ShazLandingPage() {');
fs.writeFileSync('app/page.tsx', code);
