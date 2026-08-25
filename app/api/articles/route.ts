import { NextResponse } from 'next/server';
import { getPrismaClient, isDbDown, setDbDown } from '../../../prisma';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'articles.json');

function getFallbackArticles() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error reading fallback articles:", err);
  }
  return [];
}

function saveFallbackArticles(articles: any[]) {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(articles, null, 2));
  } catch (err) {
    console.error("Error writing fallback articles:", err);
  }
}

export async function GET() {
  const fallback = getFallbackArticles();
  
  if (isDbDown()) {
    return NextResponse.json({ status: 'success', data: fallback });
  }

  try {
    const prisma = getPrismaClient();
    const fetchPromise = prisma.article.findMany({
      orderBy: { publishedDate: 'desc' },
    });
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Database connection timeout")), 1500);
    });
    
    const articles = await Promise.race([fetchPromise, timeoutPromise]);
    return NextResponse.json({ status: 'success', data: articles });
  } catch (error) {
    setDbDown(true);
    return NextResponse.json({ status: 'success', data: fallback });
  }
}

export async function POST(request: Request) {
  if (isDbDown()) {
    const body = await request.json();
    const fallback = getFallbackArticles();
    const newArticle = { ...body, id: Date.now().toString(), publishedDate: new Date().toISOString() };
    fallback.push(newArticle);
    saveFallbackArticles(fallback);
    return NextResponse.json({ status: 'success', data: newArticle }, { status: 201 });
  }

  try {
    const body = await request.json();
    const prisma = getPrismaClient();
    
    const fetchPromise = prisma.article.create({
      data: body,
    });
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Database connection timeout")), 1500);
    });
    
    const article = await Promise.race([fetchPromise, timeoutPromise]);
    return NextResponse.json({ status: 'success', data: article }, { status: 201 });
  } catch (error) {
    setDbDown(true);
    const body = await request.json().catch(() => ({}));
    const fallback = getFallbackArticles();
    const newArticle = { ...body, id: Date.now().toString(), publishedDate: new Date().toISOString() };
    fallback.push(newArticle);
    saveFallbackArticles(fallback);
    return NextResponse.json({ status: 'success', data: newArticle }, { status: 201 });
  }
}
