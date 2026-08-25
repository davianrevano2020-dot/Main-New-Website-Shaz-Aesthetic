import { NextResponse } from 'next/server';
import { getPrismaClient, isDbDown, setDbDown } from '../../../prisma';
import fs from 'fs';
import path from 'path';
import { getFallbackData, getSiteContent } from '@/lib/content';

// export const dynamic = 'force-dynamic';

const dataFilePath = path.join(process.cwd(), 'data', 'content.json');

export async function GET() {
  const data = await getSiteContent();
  return NextResponse.json({ status: 'success', data });
}

export async function POST(req: Request) {
  let body: any = {};
  if (isDbDown()) throw new Error("DB is down");
  try {
    body = await req.json();
    const prisma = getPrismaClient();
    const checkPromise = prisma.siteContent.findFirst();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Database connection timeout (1500ms)")), 1500);
    });
    await Promise.race([checkPromise, timeoutPromise]);

    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') {
        await prisma.siteContent.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }
    
    return NextResponse.json({ status: 'success', message: 'Konten berhasil diperbarui' });
  } catch (error: any) {
    setDbDown(true);
    const currentData = getFallbackData();
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') {
        currentData[key] = value;
      }
    }
    
    try {
      if (!fs.existsSync(path.dirname(dataFilePath))) {
        fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
      }
      fs.writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2), 'utf8');
    } catch (fsError) {
      console.error("Failed to write to fallback file", fsError);
    }

    return NextResponse.json({ status: 'success', message: 'Saved to local file (Database offline)' });
  }
}
