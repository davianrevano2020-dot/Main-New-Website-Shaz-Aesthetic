'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Play, Quote, ArrowRight, User, X, ChevronDown, ChevronUp } from 'lucide-react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

const WA_DEFAULT = "https://wa.link/o7f5yk";

// Mock Data
const GOOGLE_REVIEWS = [
  {
    id: 1,
    name: "Amanda T.",
    role: "Local Guide",
    date: "2 weeks ago",
    rating: 5,
    text: "The absolute best aesthetic clinic in Bali. I had the signature facial and the results were immediate. The staff are so professional and the environment is just pure luxury.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Client",
    date: "1 month ago",
    rating: 5,
    text: "Dr. Shaz is a true artist. She understood exactly what I wanted to achieve and the results are so natural. I couldn't be happier with my anti-aging treatment.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Elena V.",
    role: "Client",
    date: "2 months ago",
    rating: 5,
    text: "I was nervous about getting fillers for the first time, but the team here made me feel completely at ease. The clinic is pristine and the consultation was very thorough.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Michelle W.",
    role: "Local Guide",
    date: "3 months ago",
    rating: 5,
    text: "A sanctuary in Seminyak! I come here regularly for their glow-up treatments. Always top-notch service and my skin has literally never looked better.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=200&auto=format&fit=crop"
  }
];

const VIDEO_TESTIMONIALS = [
  {
    id: 1,
    title: "My Acne Scar Journey",
    name: "Jessica M.",
    thumbnail: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Non-Surgical Facelift Experience",
    name: "Diana R.",
    thumbnail: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Why I Choose SHAZ for Pigmentation",
    name: "Chloe S.",
    thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
  }
];

const SUCCESS_CASES = [
  {
    id: 1,
    title: "Reversing Premature Aging",
    client: "Anita, 42",
    treatment: "Signature Lift & Hydration Protocol",
    desc: "Anita came to us feeling her skin looked tired and older than her age due to sun exposure. Over a 3-month personalized protocol combining collagen stimulators and deep hydration therapies, we restored her skin's natural volume and luminosity. Today, she feels confident and radiant.",
    image: "https://images.unsplash.com/photo-1516975080661-460d3d5761eb?q=80&w=1000&auto=format&fit=crop",
    quote: "I look in the mirror and finally see myself again. The results are incredibly natural."
  },
  {
    id: 2,
    title: "Clearing Stubborn Pigmentation",
    client: "Maria, 35",
    treatment: "Advanced Laser & Peeling Course",
    desc: "After years of struggling with melasma and uneven skin tone, Maria sought a definitive solution. Through a carefully calibrated series of gentle lasers and targeted peels, we successfully faded the hyperpigmentation, leaving her with a clear, even, and glowing complexion.",
    image: "https://images.unsplash.com/photo-1596525141011-53644fcf24c6?q=80&w=1000&auto=format&fit=crop",
    quote: "I no longer feel the need to wear heavy foundation every day. My skin is simply glowing."
  }
];

const CollapsibleReviewText = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 130;

  if (text.length <= maxLength) {
    return (
      <p className="text-brand-charcoal/80 text-sm leading-relaxed mb-8 relative z-10 italic flex-grow">
        &quot;{text}&quot;
      </p>
    );
  }

  return (
    <div className="mb-8 relative z-10 flex-grow flex flex-col items-start">
      <p className="text-brand-charcoal/80 text-sm leading-relaxed italic">
        &quot;{isExpanded ? text : `${text.substring(0, maxLength).trim()}...`}&quot;
      </p>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-xs font-semibold text-[#D4AF37] hover:text-brand-charcoal transition-colors uppercase tracking-wider"
      >
        {isExpanded ? 'Show Less' : 'Read More'}
      </button>
    </div>
  );
};

export default function ClientReviewsPage({ initialContent }: { initialContent: any }) {
  const parsedGoogleReviews = (() => {
    if (initialContent?.reviews_google) {
      try { return JSON.parse(initialContent.reviews_google); } catch(e) {}
    }
    return GOOGLE_REVIEWS;
  })();

  const parsedVideoTestimonials = (() => {
    if (initialContent?.reviews_video) {
      try { return JSON.parse(initialContent.reviews_video); } catch(e) {}
    }
    return VIDEO_TESTIMONIALS;
  })();

  const parsedSuccessCases = (() => {
    if (initialContent?.reviews_cases) {
      try { return JSON.parse(initialContent.reviews_cases); } catch(e) {}
    }
    return SUCCESS_CASES;
  })();
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const visibleReviewsCount = 4;
  const displayedReviews = showAllReviews ? parsedGoogleReviews : parsedGoogleReviews.slice(0, visibleReviewsCount);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-white selection:bg-[#D4AF37]/20 selection:text-brand-charcoal overflow-hidden">
      <GlobalHeader initialContent={initialContent} />

      <main className="pt-32 pb-20">
        
        {/* HERO SECTION */}
        <section className="relative px-6 py-20 md:py-32 overflow-hidden">
          {initialContent?.reviews_hero_image && (
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <img src={initialContent.reviews_hero_image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-white/50 backdrop-blur-[2px]" />
            </div>
          )}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-brand-sage/5 blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#D4AF37]/5 blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em]">
                  {initialContent?.reviews_hero_badge || "Client Stories"}
                </span>
                <div className="h-[1px] w-8 bg-[#D4AF37]" />
              </div>

              <h1 className="text-4xl md:text-6xl font-serif text-brand-charcoal leading-tight mb-6">
                {initialContent?.reviews_hero_title ? (
                  <span dangerouslySetInnerHTML={{ __html: initialContent.reviews_hero_title }} />
                ) : (
                  <>
                    Real Results, <br />
                    <span className="italic text-brand-charcoal/80">Real Radiance.</span>
                  </>
                )}
              </h1>

              <p className="text-lg text-brand-charcoal/70 leading-relaxed max-w-2xl mx-auto">
                {initialContent?.reviews_hero_subtitle || "Discover the transformative journeys of our clients. From subtle refinements to profound rejuvenation, their stories are a testament to our dedication to aesthetic excellence."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* GOOGLE REVIEWS GRID */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-brand-charcoal mb-4">What They Say</h2>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <p className="text-brand-charcoal/60 text-sm font-medium">5.0 / 5.0 from Google Reviews</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedReviews.map((review: any, index: number) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-brand-white p-8 rounded-2xl border border-brand-beige relative group hover:border-[#D4AF37]/30 transition-colors flex flex-col"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-[#D4AF37]/20 group-hover:text-[#D4AF37]/40 transition-colors" />
                  
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>

                  <CollapsibleReviewText text={review.text} />

                  <div className="flex items-center gap-4 mt-auto">
                    <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div>
                      <h4 className="text-sm font-bold text-brand-charcoal">{review.name}</h4>
                      <p className="text-xs text-brand-charcoal/50">{review.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 flex flex-col items-center justify-center gap-8">
              {parsedGoogleReviews.length > visibleReviewsCount && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="group flex items-center gap-2 px-8 py-3 rounded-full border-2 border-brand-charcoal/10 text-brand-charcoal hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all font-semibold tracking-wide text-sm uppercase"
                >
                  {showAllReviews ? (
                    <>
                      Show Less Reviews
                      <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      Show More Reviews
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              )}

              <a 
                href={initialContent?.reviews_google_link || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-brand-forest/5 transition-all group border border-transparent hover:border-gray-200"
              >
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-brand-charcoal font-medium group-hover:text-[#D4AF37] transition-colors">View all reviews on Google</span>
              </a>
            </div>
          </div>
        </section>

        {/* VIDEO TESTIMONIALS */}
        <section className="py-24 bg-brand-charcoal text-brand-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif mb-4">Journey to Radiance</h2>
                <p className="text-brand-white/70 max-w-lg">
                  Watch our clients share their honest experiences and the confidence they&apos;ve gained through personalized care.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {parsedVideoTestimonials.map((video: any, index: number) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group cursor-pointer relative"
                  onClick={() => setActiveVideo(video.id)}
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-brand-charcoal/30 group-hover:bg-brand-charcoal/10 transition-colors duration-500" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-300 shadow-xl">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-serif mb-2 group-hover:text-[#D4AF37] transition-colors">{video.title}</h3>
                  <p className="text-brand-white/60 text-sm flex items-center gap-2">
                    <User className="w-4 h-4" /> {video.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SUCCESS CASES / CLIENT STORIES */}
        <section className="py-24 bg-brand-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-serif text-brand-charcoal mb-4">Success Cases</h2>
              <p className="text-brand-charcoal/60 max-w-2xl mx-auto">
                Detailed insights into how our tailored aesthetic protocols deliver transformative and lasting results.
              </p>
            </div>

            <div className="space-y-32">
              {parsedSuccessCases.map((caseStudy: any, index: number) => {
                const isEven = index % 2 !== 0;
                return (
                  <div key={caseStudy.id} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      
                      transition={{ duration: 0.8 }}
                      className={`w-full lg:w-1/2 order-1 ${isEven ? 'lg:order-2' : ''}`}
                    >
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                        <img src={caseStudy.image} alt={caseStudy.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-brand-charcoal/10" />
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      
                      transition={{ duration: 0.8 }}
                      className={`w-full lg:w-1/2 order-2 ${isEven ? 'lg:order-1' : ''}`}
                    >
                      <div className="inline-block px-4 py-1.5 rounded-full bg-brand-sage/10 text-brand-sage text-xs font-bold uppercase tracking-wider mb-6">
                        {caseStudy.client}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-serif text-brand-charcoal mb-4">
                        {caseStudy.title}
                      </h3>
                      <div className="mb-6 pb-6 border-b border-brand-beige">
                        <span className="text-xs uppercase tracking-wider text-brand-charcoal/50 font-bold block mb-1">Treatment Plan</span>
                        <span className="text-brand-charcoal font-medium">{caseStudy.treatment}</span>
                      </div>
                      <p className="text-brand-charcoal/70 leading-relaxed mb-8 text-lg">
                        {caseStudy.desc}
                      </p>
                      
                      <div className="bg-white p-6 rounded-2xl border border-brand-beige relative">
                        <Quote className="absolute top-6 left-6 w-6 h-6 text-[#D4AF37]/20" />
                        <p className="text-brand-charcoal italic pl-10 relative z-10">
                          &quot;{caseStudy.quote}&quot;
                        </p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-charcoal/5" />
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-6">Ready to write your own story?</h2>
              <p className="text-lg text-brand-charcoal/70 mb-10 max-w-2xl mx-auto">
                Schedule a personal consultation with our experts to design a treatment plan perfectly tailored to your unique beauty goals.
              </p>
              <a 
                href={initialContent?.global_cta_link || WA_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-brand-charcoal text-white rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-all shadow-xl shadow-brand-charcoal/10 hover:shadow-[#D4AF37]/20"
              >
                {initialContent?.global_cta_text || "Book Your Consultation"}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>

      </main>

      <GlobalFooter initialContent={initialContent} />

      {/* Video Modal (Mock) */}
      <AnimatePresence>
        {activeVideo !== null && (() => {
          const video = parsedVideoTestimonials.find((v: any) => v.id === activeVideo);
          return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveVideo(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-brand-charcoal rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center"
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {video?.videoUrl ? (
                <video src={video.videoUrl} controls autoPlay className="w-full h-full object-contain bg-black" />
              ) : (
                <>
                  <Play className="w-16 h-16 mb-4 opacity-50 text-white" />
                  <h3 className="text-2xl font-serif text-white mb-2">Video playback integration</h3>
                  <p className="text-white/50">Upload a video in the Back-Office to see it play here.</p>
                </>
              )}
            </motion.div>
          </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
