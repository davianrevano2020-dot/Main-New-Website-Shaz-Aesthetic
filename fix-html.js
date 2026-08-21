const fs = require('fs');
let code = fs.readFileSync('app/layout.tsx', 'utf8');
code = code.replace(/<html/g, "<html suppressHydrationWarning");
fs.writeFileSync('app/layout.tsx', code);
