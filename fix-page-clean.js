const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');
// Now remove the inner one
code = code.replace(/  const Logo = \(\{ className = "h-10 md:h-12" \}: \{ className\?: string \}\) => \([\s\S]*?\);\n/g, '');
fs.writeFileSync('app/page.tsx', code);
