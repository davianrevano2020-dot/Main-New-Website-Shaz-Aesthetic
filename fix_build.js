const fs = require('fs');
let code = fs.readFileSync('app/api/articles/route.ts', 'utf8');
code = code.replace("export const dynamic = 'force-dynamic';", "// export const dynamic = 'force-dynamic';");
fs.writeFileSync('app/api/articles/route.ts', code);

code = fs.readFileSync('app/api/articles/[id]/route.ts', 'utf8');
code = code.replace("export const dynamic = 'force-dynamic';", "// export const dynamic = 'force-dynamic';");
fs.writeFileSync('app/api/articles/[id]/route.ts', code);

code = fs.readFileSync('app/api/content/route.ts', 'utf8');
code = code.replace("export const dynamic = 'force-dynamic';", "// export const dynamic = 'force-dynamic';");
fs.writeFileSync('app/api/content/route.ts', code);
