import { NextResponse } from 'next/server';
import { getPrismaClient, isDbDown, setDbDown } from '../../../../prisma';
import fs from 'fs';
import path from 'path';

// export const dynamic = 'force-dynamic';
const dataFilePath = path.join(process.cwd(), 'data', 'articles.json');

function getFallbackArticles() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileData) || [];
    }
  } catch (error) {
    setDbDown(true);
    console.error("Failed to read articles.json", error);
  }
  return [];
}

function saveFallbackArticles(articles: any[]) {
  try {
    if (!fs.existsSync(path.dirname(dataFilePath))) {
      fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(articles, null, 2), 'utf8');
  } catch (error) {
    setDbDown(true);
    console.error("Failed to write to articles.json", error);
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (isDbDown()) throw new Error("DB is down");
  try {
    const { id } = await params;
    const body = await req.json();
    const prisma = getPrismaClient();
    
    // Test connection
    const checkPromise = prisma.article.findFirst();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Database connection timeout")), 1500);
    });
    await Promise.race([checkPromise, timeoutPromise]);
    
    const article = await prisma.article.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        featuredImage: body.featuredImage,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        author: body.author,
        publishedDate: body.publishedDate ? new Date(body.publishedDate) : null,
        status: body.status,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
      }
    });
    
    return NextResponse.json({ status: 'success', data: article });
  } catch (error) {
    setDbDown(true);
     // console.log("Using fallback articles (PUT) due to DB error", error);
    const { id } = await params;
    const body = await req.clone().json().catch(() => ({}));
    let articles = getFallbackArticles();
    
    const index = articles.findIndex((a: any) => a.id === id);
    if (index !== -1) {
      articles[index] = {
        ...articles[index],
        ...body,
        updatedAt: new Date().toISOString()
      };
      saveFallbackArticles(articles);
      return NextResponse.json({ status: 'success', data: articles[index], message: 'Updated in local file' });
    }
    return NextResponse.json({ status: 'error', message: 'Article not found' }, { status: 404 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (isDbDown()) throw new Error("DB is down");
  try {
    const { id } = await params;
    const prisma = getPrismaClient();
    
    // Test connection
    const checkPromise = prisma.article.findFirst();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Database connection timeout")), 1500);
    });
    await Promise.race([checkPromise, timeoutPromise]);
    
    await prisma.article.delete({ where: { id } });
    
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    setDbDown(true);
     // console.log("Using fallback articles (DELETE) due to DB error", error);
    const { id } = await params;
    let articles = getFallbackArticles();
    
    articles = articles.filter((a: any) => a.id !== id);
    saveFallbackArticles(articles);
    return NextResponse.json({ status: 'success', message: 'Deleted from local file' });
  }
}
