const fs = require('fs');

function addCircuitBreaker(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace getPrismaClient import
  if (!content.includes("isDbDown")) {
    content = content.replace(
      /import { getPrismaClient } from '(\.\.\/\.\.\/\.\.\/|\.\.\/\.\.\/\.\.\/\.\.\/)prisma';/,
      "import { getPrismaClient, isDbDown, setDbDown } from '$1prisma';"
    );
  }

  // Update GET/POST/PUT/DELETE
  const methods = ['GET', 'POST', 'PUT', 'DELETE'];
  methods.forEach(method => {
    const regex = new RegExp(`export async function ${method}\\([^\\)]*\\)\\s*{([\\s\\S]*?)try\\s*{`, 'g');
    content = content.replace(regex, (match) => {
      if (match.includes("isDbDown()")) return match;
      return match.replace("try {", `if (isDbDown()) throw new Error("DB is down");\n  try {`);
    });
  });

  // Also replace catch to setDbDown
  content = content.replace(/catch \((error|err)\) \{/g, (match, p1) => {
    return `catch (${p1}) {\n    setDbDown(true);`;
  });

  fs.writeFileSync(filePath, content);
}

addCircuitBreaker('app/api/articles/route.ts');
addCircuitBreaker('app/api/articles/[id]/route.ts');
