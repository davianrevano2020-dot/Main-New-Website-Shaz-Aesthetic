const fs = require('fs');

function addCircuitBreaker(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes("isDbDown")) {
    content = content.replace(
      /import { getPrismaClient } from '\.\.\/\.\.\/\.\.\/prisma';/,
      "import { getPrismaClient, isDbDown, setDbDown } from '../../../prisma';"
    );
  }

  const methods = ['GET'];
  methods.forEach(method => {
    const regex = new RegExp(`export async function ${method}\\([^\\)]*\\)\\s*{([\\s\\S]*?)try\\s*{`, 'g');
    content = content.replace(regex, (match) => {
      if (match.includes("isDbDown()")) return match;
      return match.replace("try {", `if (isDbDown()) throw new Error("DB is down");\n  try {`);
    });
  });

  content = content.replace(/catch \((error|err)\) \{/g, (match, p1) => {
    return `catch (${p1}) {\n    setDbDown(true);`;
  });

  fs.writeFileSync(filePath, content);
}

try {
  addCircuitBreaker('app/api/test-db/route.ts');
} catch (e) {
  console.log("no test-db api route");
}
