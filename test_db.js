const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const content = await prisma.siteContent.findMany();
  console.log("DB count:", content.length);
}
main().catch(console.error).finally(() => prisma.$disconnect());
