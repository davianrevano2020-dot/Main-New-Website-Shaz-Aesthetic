import { PrismaClient } from './prisma/generated/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  dbIsDown: boolean;
};

export const getPrismaClient = () => {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
};

export const isDbDown = () => !!globalForPrisma.dbIsDown;
export const setDbDown = (status: boolean) => {
  globalForPrisma.dbIsDown = status;
};
