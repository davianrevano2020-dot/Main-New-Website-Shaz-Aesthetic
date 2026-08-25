const fs = require('fs');

function addCircuitBreaker(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace("export const dynamic = 'force-dynamic';", "// export const dynamic = 'force-dynamic';");
    fs.writeFileSync(filePath, content);
  } catch(e) {}
}

addCircuitBreaker('app/blog/page.tsx');
addCircuitBreaker('app/blog/[slug]/page.tsx');
