import { NextResponse } from 'next/server';
import { getPrismaClient } from '../../../prisma';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const dataFilePath = path.join(process.cwd(), 'data', 'content.json');

function getFallbackData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error reading fallback data:", err);
  }
  return {
    hero_image: "https://img.shazaestheticbali.com/header-background-banner.jpg",
    hero_title: "Beauty, Refined by Medical Expertise",
    hero_subtitle: "PREMIUM AESTHETIC CLINIC IN SEMINYAK",
    hero_button1_text: "Book Consultation",
    hero_button1_link: "https://wa.link/o7f5yk",
    hero_button2_text: "Discover SHAZ",
    hero_button2_link: "#about",
    about_title: "WHERE SCIENCE MEETS ARTISTRY",
    about_description: "We believe that true beauty...",
    experience_kicker: "The Experience",
    experience_title: "A Sanctuary for Your Transformation.",
    experience_description: "From the moment you step through our doors, you are enveloped in an environment designed entirely for your comfort and peace of mind. We seamlessly merge clinical excellence with sensory luxury, ensuring every visit feels like a retreat.",
    experience_button_text: "Explore Our Clinics",
    experience_button_link: "#locations",
    experience_image1: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    experience_image2: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop",
    experience_image3: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop",
    experience_image4: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop"
  };
}

export async function GET() {
  try {
    const prisma = getPrismaClient();
    const fetchPromise = prisma.siteContent.findMany();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Database connection timeout (1500ms)")), 1500);
    });
    
    const contents = await Promise.race([fetchPromise, timeoutPromise]) as any[];
    const contentMap = contents.reduce((acc: any, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
    
    return NextResponse.json({ status: 'success', data: contentMap });
  } catch (error: any) {
    return NextResponse.json({ status: 'success', data: getFallbackData() });
  }
}

export async function POST(req: Request) {
  let body: any = {};
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
