import Image from 'next/image';
import Link from 'next/link';
import { getPrismaClient, isDbDown } from '../../prisma';
import fs from 'fs';
import path from 'path';

import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
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

async function getArticles() {
  if (isDbDown()) {
    return getFallbackArticles().filter((a: any) => a.status === 'PUBLISHED');
  }

  try {
    const prisma = getPrismaClient();
    const fetchPromise = prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedDate: 'desc' },
    });
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout")), 1500);
    });
    
    return await Promise.race([fetchPromise, timeoutPromise]);
  } catch (err) {
    return getFallbackArticles().filter((a: any) => a.status === 'PUBLISHED');
  }
}

export default async function BlogPage() {
  const articles = await getArticles();
  const initialContent = await getSiteContent();

  return (
    <>
      <GlobalHeader initialContent={initialContent} />
      <div className="min-h-screen bg-brand-white text-brand-charcoal pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-medium mb-6">SHAZ Journal</h1>
          <p className="text-lg text-brand-charcoal/80">
            Insights, news, and inspiration from the world of aesthetic medicine and beauty.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 bg-[#F9F8F6] rounded-2xl">
            <p className="text-brand-charcoal/60 text-lg">No articles have been published yet. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => (
              <Link 
                href={`/blog/${article.slug}`} 
                key={article.id}
                className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F9F8F6]">
                  {article.featuredImage ? (
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-brand-charcoal/20">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  {/* Category badge */}
                  {article.category && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-brand-charcoal">
                      {article.category}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-brand-charcoal/60 mb-3 space-x-2">
                    <time dateTime={article.publishedDate}>
                      {new Date(article.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    {article.author && (
                      <>
                        <span>•</span>
                        <span>{article.author}</span>
                      </>
                    )}
                  </div>
                  
                  <h2 className="font-serif text-xl font-medium mb-3 group-hover:text-[#4C5C44] transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-sm text-brand-charcoal/70 line-clamp-3 mb-6 flex-grow">
                    {article.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center text-xs font-semibold tracking-widest uppercase text-[#4C5C44] group-hover:text-brand-charcoal transition-colors">
                    Read Article 
                    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
      <GlobalFooter initialContent={initialContent} />
    </>
  );
}
