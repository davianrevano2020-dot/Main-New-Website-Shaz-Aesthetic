const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// replace <img with <img
code = code.replace(/<img\b/g, '/* @eslint-disable-next-line @next/next/no-img-element */\n<img');
fs.writeFileSync('app/page.tsx', code);
