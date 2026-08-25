const fs = require('fs');

function addCircuitBreaker(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes("isDbDown")) {
    content = content.replace(
      /import { getPrismaClient } from '\.\.\/\.\.\/\.\.\/prisma';/,
      "import { getPrismaClient, isDbDown, setDbDown } from '../../../prisma';"
    );
  }

  const methods = ['POST'];
  methods.forEach(method => {
    const regex = new RegExp(`export async function ${method}\\([^\\)]*\\)\\s*{([\\s\\S]*?)try\\s*{`, 'g');
    content = content.replace(regex, (match) => {
      if (match.includes("isDbDown()")) return match;
      return match.replace("try {", `if (isDbDown()) throw new Error("DB is down");\n  try {`);
    });
  });

  content = content.replace(/catch \((error|err): any\) \{/g, (match, p1) => {
    return `catch (${p1}: any) {\n    setDbDown(true);`;
  });

  fs.writeFileSync(filePath, content);
}

addCircuitBreaker('app/api/content/route.ts');
