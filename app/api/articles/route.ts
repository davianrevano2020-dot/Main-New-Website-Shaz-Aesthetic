import { NextResponse } from 'next/server';
import { getPrismaClient } from '../../../prisma';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
const dataFilePath = path.join(process.cwd(), 'data', 'articles.json');

function getFallbackArticles() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileData) || [];
    }
  } catch (error) {
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
    console.error("Failed to write to articles.json", error);
  }
}

export async function GET() {
  try {
    const prisma = getPrismaClient();
    const checkPromise = prisma.article.findMany({ orderBy: { createdAt: 'desc' } });
    const timeoutPromise = new Promise<any[]>((_, reject) => {
      setTimeout(() => reject(new Error("Database connection timeout")), 1500);
    });
    
    const articles = await Promise.race([checkPromise, timeoutPromise]);
    return NextResponse.json({ status: 'success', data: articles });
  } catch (error) {
    console.log("Using fallback articles due to DB error");
    const articles = getFallbackArticles();
    return NextResponse.json({ status: 'success', data: articles });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prisma = getPrismaClient();
    
    // Test connection
    const checkPromise = prisma.article.findFirst();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Database connection timeout")), 1500);
    });
    await Promise.race([checkPromise, timeoutPromise]);
    
    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug: body.slug,
        featuredImage: body.featuredImage || null,
        excerpt: body.excerpt || null,
        content: body.content,
        category: body.category || null,
        author: body.author || null,
        publishedDate: body.publishedDate ? new Date(body.publishedDate) : null,
        status: body.status || 'DRAFT',
        seoTitle: body.seoTitle || null,
        seoDescription: body.seoDescription || null,
      }
    });
    
    return NextResponse.json({ status: 'success', data: article });
  } catch (error) {
    console.log("Using fallback articles (POST) due to DB error", error);
    const body = await req.clone().json().catch(() => ({}));
    const articles = getFallbackArticles();
    
    const newArticle = {
      id: Math.random().toString(36).substring(7),
      title: body.title,
      slug: body.slug,
      featuredImage: body.featuredImage || null,
      excerpt: body.excerpt || null,
      content: body.content,
      category: body.category || null,
      author: body.author || null,
      publishedDate: body.publishedDate || null,
      status: body.status || 'DRAFT',
      seoTitle: body.seoTitle || null,
      seoDescription: body.seoDescription || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    articles.push(newArticle);
    saveFallbackArticles(articles);
    
    return NextResponse.json({ status: 'success', data: newArticle, message: 'Saved to local file' });
  }
}
