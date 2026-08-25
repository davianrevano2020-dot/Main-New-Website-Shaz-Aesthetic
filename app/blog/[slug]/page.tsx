import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPrismaClient, isDbDown } from '../../../prisma';
import fs from 'fs';
import path from 'path';

import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';
import { getSiteContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

function getFallbackArticles() {
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'articles.json');
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error reading fallback articles:", err);
  }
  return [];
}

async function getArticleBySlug(slug: string) {
  if (isDbDown()) {
    const articles = getFallbackArticles();
    return articles.find((a: any) => a.slug === slug && a.status === 'Published');
  }

  try {
    const prisma = getPrismaClient();
    const fetchPromise = prisma.article.findUnique({
      where: { slug },
    });
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout")), 1500);
    });
    
    const article = await Promise.race([fetchPromise, timeoutPromise]);
    
    if (article && article.status !== 'Published') {
      return null;
    }
    return article;
  } catch (err) {
    const articles = getFallbackArticles();
    return articles.find((a: any) => a.slug === slug && a.status === 'Published');
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return { title: 'Article Not Found | SHAZ Clinic' };
  }

  return {
    title: article.seoTitle || `${article.title} | SHAZ Clinic`,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      images: article.featuredImage ? [{ url: article.featuredImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  const initialContent = await getSiteContent();

  if (!article) {
    notFound();
  }

  return (
    <>
      <GlobalHeader initialContent={initialContent} />
      <article className="min-h-screen bg-brand-white text-brand-charcoal pt-32 pb-20">
      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        {article.category && (
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-[#F9F8F6] text-xs font-bold tracking-widest uppercase text-[#4C5C44]">
            {article.category}
          </div>
        )}
        
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
          {article.title}
        </h1>
        
        <div className="flex items-center justify-center text-sm text-brand-charcoal/60 space-x-2">
          {article.author && (
            <span className="font-medium text-brand-charcoal/80">{article.author}</span>
          )}
          {article.author && <span>•</span>}
          <time dateTime={article.publishedDate}>
            {new Date(article.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
      </header>

      {/* Featured Image */}
      {article.featuredImage && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-lg bg-[#F9F8F6]">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              referrerPolicy="no-referrer"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-headings:font-serif prose-headings:font-medium prose-a:text-[#4C5C44] max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Back navigation */}
        <div className="mt-20 pt-10 border-t border-brand-charcoal/10 flex justify-center">
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 rounded-full bg-transparent border border-brand-charcoal/20 text-xs font-bold uppercase tracking-widest hover:bg-[#4C5C44] hover:text-white hover:border-[#4C5C44] transition-all"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Journal
          </Link>
        </div>
      </div>
    </article>
      <GlobalFooter initialContent={initialContent} />
    </>
  );
}
