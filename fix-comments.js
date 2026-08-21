const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Replace the /* @eslint-disable-next-line @next/next/no-img-element */<img with properly escaped comments if in JSX, 
// actually since it's breaking, let's just remove the comment and use normal img, we can configure eslint to ignore it in next.config or eslintrc
code = code.replace(/\/\* @eslint-disable-next-line @next\/next\/no-img-element \*\/\n<img/g, '<img');
fs.writeFileSync('app/page.tsx', code);
