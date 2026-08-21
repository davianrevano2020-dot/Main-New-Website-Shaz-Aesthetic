import { PrismaClient } from './prisma/generated/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const getPrismaClient = () => {
  let dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  // Adapter mariadb mewajibkan format mariadb:// bukan mysql://
  if (dbUrl.startsWith('mysql://')) {
    dbUrl = dbUrl.replace('mysql://', 'mariadb://');
  }

  if (!globalForPrisma.prisma) {
    const adapter = new PrismaMariaDb(dbUrl);
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }

  return globalForPrisma.prisma;
};
