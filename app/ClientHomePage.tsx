'use client';

import React, { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle, Instagram, Facebook, Star, MapPin, Phone, Menu, X, ArrowRight,
  CheckCircle2, Play, ChevronLeft, ChevronRight, Activity, Syringe, Zap, Scissors, Flower2, Stethoscope, Sparkles, HeartPulse, Coffee, Quote
} from 'lucide-react';
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';

const WA_LINK = "https://wa.link/o7f5yk";
const LOGO_URL = "https://thinkgenc.com/image-file/shaz-logo-transparan.svg";

// ----------------------------------------------------------------------
// Reusable UI Components
// ----------------------------------------------------------------------

const Logo = ({ className = "h-8 md:h-10" }: { className?: string }) => (
  <img src={LOGO_URL} alt="SHAZ Salon Beauty Wellness" className={`w-auto object-contain ${className}`} />
);

const SectionHeading = ({ children, align = "center", subtitle }: { children: React.ReactNode, align?: "left" | "center", subtitle?: string }) => (
  <div className={`mb-16 md:mb-24 ${align === "center" ? "text-center mx-auto" : "text-left"}`}>
    {subtitle && (
      <span className="text-brand-forest font-semibold tracking-[0.2em] text-xs uppercase mb-4 block">
        {subtitle}
      </span>
    )}
    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-tight">
      {children}
    </h2>
  </div>
);

// ----------------------------------------------------------------------
// Interactive Before & After Slider
// ----------------------------------------------------------------------

const BeforeAfterSlider = ({ before, after }: { before: string, after: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };
  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-video overflow-hidden rounded-2xl select-none cursor-ew-resize bg-neutral-100"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchEnd={() => setIsDragging(false)}
      onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
      onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
    >
      {/* After Image (Background) */}
      <img src={after} alt="After Treatment" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      
      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden" 
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={before} alt="Before Treatment" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-brand-forest rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <div className="flex items-center gap-0.5 text-white">
            <ChevronLeft className="w-4 h-4" />
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-brand-forest shadow-sm pointer-events-none">
        Before
      </div>
      <div className="absolute top-6 right-6 bg-brand-forest/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-white shadow-sm pointer-events-none">
        After
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Main Page Component
// ----------------------------------------------------------------------

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Stethoscope': return <Stethoscope className="w-6 h-6" />;
    case 'Sparkles': return <Sparkles className="w-6 h-6" />;
    case 'HeartPulse': return <HeartPulse className="w-6 h-6" />;
    case 'Coffee': return <Coffee className="w-6 h-6" />;
    default: return <Star className="w-6 h-6" />;
  }
};

interface ClientHomePageProps {
  initialContent?: Record<string, any>;
}

export default function ClientHomePage({ initialContent = {} }: ClientHomePageProps) {
  const [siteContent, setSiteContent] = useState<any>(initialContent);

  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollTransformations = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 40 : scrollLeft + clientWidth - 40;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // If initial content was not provided or empty, fallback to client fetch
    if (!initialContent || Object.keys(initialContent).length === 0) {
      const fetchContent = async () => {
        try {
          const res = await fetch('/api/content');
          const json = await res.json();
          if (json.status === 'success' && json.data) {
            setSiteContent(json.data);
          }
        } catch (err) {
          console.log('Using default content (fetch failed or server restarting)');
        }
      };
      fetchContent();
    }
  }, [initialContent]);

  const defaultTreatments = [
    { name: "Skin Perfection", img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop", desc: "Advanced facials, exosomes, and cellular rejuvenation." },
    { name: "Injectables", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop", desc: "Botox, fillers, and skin boosters by certified doctors." },
    { name: "Laser Technology", img: "https://images.unsplash.com/photo-1519014816548-bf5fe059c98b?q=80&w=800&auto=format&fit=crop", desc: "Precision laser for pigmentation, resurfacing, and glow." },
    { name: "Body Contouring", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop", desc: "Non-invasive shaping and wellness therapies." },
    { name: "Hair Removal", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop", desc: "Long-lasting smoothness with medical-grade lasers." },
    { name: "Premium Salon", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop", desc: "Luxury hair care, styling, and scalp treatments." }
  ];

  let treatmentsList = defaultTreatments;
  if (siteContent.treatments_list) {
    try {
      const parsed = typeof siteContent.treatments_list === 'string' ? JSON.parse(siteContent.treatments_list) : siteContent.treatments_list;
      if (Array.isArray(parsed) && parsed.length > 0) treatmentsList = parsed;
    } catch(e) {}
  }

  const defaultPackages = [
    { name: "ExoMind", desc: "Advanced TMS technology for better focus, emotional balance, and overall brain wellness.", features: ["FDA-cleared TMS technology", "Improves focus & clarity"], priceLabel: "PRICE", price: "IDR 4,000,000", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop", ctaText: "Book Now", ctaLink: "" },
    { name: "Precision Botox", desc: "Smooth fine lines and restore a naturally refreshed appearance with expert precision.", features: ["Medical consultation included", "Natural-looking results"], priceLabel: "STARTING FROM", price: "IDR 95,000 / Unit", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop", ctaText: "Book Now", ctaLink: "" },
    { name: "Laser Hair Removal", desc: "Long-lasting smooth skin with our advanced, comfortable laser technology.", features: ["Precision laser treatment", "Prevents ingrown hairs"], priceLabel: "STARTING FROM", price: "IDR 350,000", img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop", ctaText: "Book Now", ctaLink: "" },
    { name: "Signature Glass Skin", desc: "Achieve a radiant, poreless, and deeply hydrated complexion with our signature facial protocol.", features: ["Deep pore cleansing", "Intense hydration boost"], priceLabel: "STARTING FROM", price: "IDR 850,000", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop", ctaText: "Book Now", ctaLink: "" }
  ];

  let packagesList = defaultPackages;
  if (siteContent.packages_list) {
    try {
      const parsed = typeof siteContent.packages_list === 'string' ? JSON.parse(siteContent.packages_list) : siteContent.packages_list;
      if (Array.isArray(parsed) && parsed.length > 0) packagesList = parsed;
    } catch(e) {}
  }

  const defaultDoctors = [
    { name: "Dr. Elisabeth Zora", title: "AESTHETIC PHYSICIAN", desc: "Enhancing Natural Beauty with Personalized Care", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop" },
    { name: "Dr. Vrety Widyari", title: "DERMATOLOGY SPECIALIST", desc: "Evidence-Based Approaches for Healthier Skin", img: "https://images.unsplash.com/photo-1594824436998-d50d6ff71f92?q=80&w=800&auto=format&fit=crop" },
    { name: "Dr. Diah Nareswari", title: "AESTHETIC PHYSICIAN", desc: "Dedicated Solutions for Radiant Confidence", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop" },
    { name: "Dr. Ananda Aprilia", title: "AESTHETIC PHYSICIAN", desc: "Refining Beauty with Modern Aesthetic Treatments", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop" }
  ];

  let doctorsList = defaultDoctors;
  if (siteContent.doctors_list) {
    try {
      const parsed = typeof siteContent.doctors_list === 'string' ? JSON.parse(siteContent.doctors_list) : siteContent.doctors_list;
      if (Array.isArray(parsed) && parsed.length > 0) doctorsList = parsed;
    } catch(e) {}
  }

  const defaultReasons = [
    { icon: "Stethoscope", title: "Medical Expertise", desc: "Professional medical team and an expert, evidence-based treatment approach." },
    { icon: "Sparkles", title: "Premium Equipment", desc: "Advanced technology and professional-grade FDA-cleared equipment." },
    { icon: "HeartPulse", title: "Personalized Treatment", desc: "Bespoke treatments meticulously designed around your individual skin needs." },
    { icon: "Coffee", title: "Luxury Experience", desc: "A sophisticated, comfortable, and serene clinic environment for ultimate relaxation." }
  ];

  let reasonsList = defaultReasons;
  if (siteContent.reasons_list) {
    try {
      const parsed = typeof siteContent.reasons_list === 'string' ? JSON.parse(siteContent.reasons_list) : siteContent.reasons_list;
      if (Array.isArray(parsed) && parsed.length > 0) reasonsList = parsed;
    } catch(e) {}
  }

  const defaultTransformations = [
    { img: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop" },
    { img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop" },
    { img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop" }
  ];

  let transformationsList = defaultTransformations;
  if (siteContent.transformations_list) {
    try {
      const parsed = typeof siteContent.transformations_list === 'string' ? JSON.parse(siteContent.transformations_list) : siteContent.transformations_list;
      if (Array.isArray(parsed) && parsed.length > 0) transformationsList = parsed;
    } catch(e) {}
  }

  const defaultReviews = [
    { id: "1", name: "Nadya", text: "The facial was incredibly relaxing, and the doctor was very attentive, gentle, and detail oriented throughout the whole session. She made sure I was comfortable and took great care of every detail. Overall, it was a wonderful experience, and I would definitely recommend this clinic.", rating: 5 },
    { id: "2", name: "M", text: "Overall, a great experience with lovely service — I'd definitely come back. Update from the next day: My face is looking even more beautiful than yesterday and it looks like most of acne is gone in one day basically. Amazing results!", rating: 5 },
    { id: "3", name: "Edo", text: "Today, I came back for another facial and a DNA Salmon treatment. I absolutely love my treatments here. This is my second time having a facial, and the team is always so professional and attentive. Definitely recommend visiting if you're looking to get your glow on.", rating: 5 }
  ];

  let reviewsList = defaultReviews;
  if (siteContent.reviews_list) {
    try {
      const parsed = typeof siteContent.reviews_list === 'string' ? JSON.parse(siteContent.reviews_list) : siteContent.reviews_list;
      if (Array.isArray(parsed) && parsed.length > 0) reviewsList = parsed;
    } catch(e) {}
  }

  const defaultClinics = [
    { name: "Seminyak Flagship", address: "Jl. Sunset Road No. 88, Seminyak, Bali", img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop", link: "https://maps.google.com" },
    { name: "Canggu Sanctuary", address: "Jl. Pantai Batu Bolong, Canggu, Bali", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop", link: "https://maps.google.com" }
  ];

  let clinicsList = defaultClinics;
  if (siteContent.clinics_list) {
    try {
      const parsed = typeof siteContent.clinics_list === 'string' ? JSON.parse(siteContent.clinics_list) : siteContent.clinics_list;
      if (Array.isArray(parsed) && parsed.length > 0) clinicsList = parsed;
    } catch(e) {}
  }

  return (
    <div className="min-h-screen bg-brand-white text-brand-charcoal font-sans selection:bg-brand-forest selection:text-white">
      
      <GlobalHeader initialContent={siteContent} />

      <main>
        {/* ----------------------------------------------------------------------
            01. HERO
        ---------------------------------------------------------------------- */}
        <section className="relative min-h-[90vh] flex items-center pt-28 md:pt-32 pb-16 md:pb-20 bg-brand-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              
              {/* Left Column - Text */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="max-w-xl"
              >
                <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] text-brand-charcoal mb-6 md:mb-8">
                  {siteContent.hero_title ? (
                    <span dangerouslySetInnerHTML={{ __html: siteContent.hero_title }} />
                  ) : (
                    <>
                      Beauty, Refined by <br/>
                      <span className="italic font-light text-[#7C8B76]">Medical Expertise</span>
                    </>
                  )}
                </h1>
                <p className="text-base md:text-xl text-brand-charcoal/70 mb-8 md:mb-12 leading-relaxed font-light max-w-[90%]">
                  {siteContent.hero_subtitle || 'PREMIUM AESTHETIC CLINIC IN SEMINYAK. Discover a sanctuary where advanced science meets personalized care.'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={siteContent.hero_button1_link || WA_LINK}
                    target="_blank" rel="noopener noreferrer"
                    className="bg-[#4C5C44] text-white px-8 py-4 rounded-full text-[11px] font-bold tracking-widest uppercase hover:bg-brand-charcoal transition-all duration-300 flex items-center justify-center gap-3 sm:w-fit shadow-md shadow-[#4C5C44]/20"
                  >
                    {siteContent.hero_button1_text || 'Book Consultation'} <ArrowRight className="w-4 h-4" />
                  </a>
                  <a 
                    href={siteContent.hero_button2_link || '/about'}
                    className="bg-transparent border border-[#EAE6E1] text-[#3A3632] px-8 py-4 rounded-full text-[11px] font-bold tracking-widest uppercase hover:bg-[#EAE6E1]/50 transition-all duration-300 flex items-center justify-center sm:w-fit"
                  >
                    {siteContent.hero_button2_text || 'Discover SHAZ'}
                  </a>
                </div>
              </motion.div>

              {/* Right Column - Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full aspect-[4/3] lg:aspect-[1.2/1] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-[#EFEFEA] shadow-sm"
              >
                <img 
                  src={siteContent.hero_image || "https://img.shazaestheticbali.com/header-background-banner.jpg"} 
                  alt="Premium Aesthetic Treatment" 
                  className="w-full h-full object-cover object-[70%_center] lg:object-center" 
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            02. BRAND PHILOSOPHY
        ---------------------------------------------------------------------- */}
        <section className="py-20 md:py-32 bg-[#F9F8F6] text-center px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              
              transition={{ duration: 0.7 }}
              className="font-serif text-3xl md:text-5xl lg:text-[3.5rem] text-[#3A3632] leading-tight mb-8"
            >
              {siteContent.about_title ? (
                <span dangerouslySetInnerHTML={{ __html: siteContent.about_title }} />
              ) : (
                <>
                  Where Medical Expertise <br className="hidden md:block" />
                  <span className="italic text-[#7C8B76]">Meets Aesthetic Excellence.</span>
                </>
              )}
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-16 h-[1px] bg-brand-charcoal/20 mx-auto mb-8 md:mb-10"
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#3A3632]/70 text-base md:text-xl font-light leading-relaxed max-w-3xl mx-auto"
            >
              {siteContent.about_description ? (
                <span dangerouslySetInnerHTML={{ __html: String(siteContent.about_description).replace(/\n/g, '<br/>') }} />
              ) : (
                "At SHAZ, we believe that true beauty is cultivated through precision, science, and a deeply personalized approach. Our philosophy merges state-of-the-art medical technology with the refined atmosphere of a luxury sanctuary."
              )}
            </motion.p>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            03. THE EXPERIENCE
        ---------------------------------------------------------------------- */}
        <section id="about" className="py-20 md:py-32 bg-[#F9F8F6]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              
              {/* Left Column: Text */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                 
                transition={{ duration: 0.8 }}
                className="w-full lg:w-5/12 lg:pr-10"
              >
                <span className="text-[#7C8B76] font-bold tracking-[0.15em] text-[10px] uppercase mb-4 md:mb-6 block">
                  {siteContent.experience_kicker || "The Experience"}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-[4rem] text-[#3A3632] leading-[1.1] mb-6 md:mb-8">
                  {siteContent.experience_title ? (
                    <span dangerouslySetInnerHTML={{ __html: siteContent.experience_title }} />
                  ) : (
                    <>
                      A Sanctuary for <br className="hidden lg:block" />
                      Your <br className="hidden lg:block" />
                      Transformation.
                    </>
                  )}
                </h2>
                <p className="text-[#3A3632]/70 text-base md:text-lg font-light leading-relaxed mb-8 md:mb-10 max-w-md">
                  {siteContent.experience_description || "From the moment you step through our doors, you are enveloped in an environment designed entirely for your comfort and peace of mind. We seamlessly merge clinical excellence with sensory luxury, ensuring every visit feels like a retreat."}
                </p>
                <a 
                  href={siteContent.experience_button_link || "/locations"}
                  className="inline-flex items-center gap-2 text-[#3A3632] font-bold tracking-widest text-[11px] uppercase border-b border-[#3A3632]/30 pb-1.5 hover:border-[#3A3632] transition-colors group"
                >
                  {siteContent.experience_button_text || "Explore Our Clinics"} 
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>

              {/* Right Column: Image Grid */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                 
                transition={{ duration: 0.8 }}
                className="w-full lg:w-7/12 grid grid-cols-2 gap-4 md:gap-6"
              >
                {/* Image Column 1 (Staggered Down) */}
                <div className="flex flex-col gap-4 md:gap-6 pt-8 md:pt-16">
                  <div className="aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-neutral-200">
                    <img 
                      src={siteContent.experience_image1 || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop"} 
                      alt="SHAZ Clinic Interior" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <div className="aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-neutral-200">
                    <img 
                      src={siteContent.experience_image2 || "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop"} 
                      alt="Medical Expertise" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                </div>

                {/* Image Column 2 (Staggered Up) */}
                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-neutral-200">
                    <img 
                      src={siteContent.experience_image3 || "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop"} 
                      alt="Aesthetic Treatment" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <div className="aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-neutral-200">
                    <img 
                      src={siteContent.experience_image4 || "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop"} 
                      alt="Treatment Room" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            04. FEATURED TREATMENTS
        ---------------------------------------------------------------------- */}
        <section id="treatments" className="py-20 md:py-32 bg-brand-white border-t border-brand-beige/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-brand-forest font-semibold tracking-[0.2em] text-xs uppercase mb-4 block">
                  Premium Services
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-brand-charcoal leading-tight">
                  Our Treatments
                </h2>
              </div>
              <a 
                href={siteContent.treatments_button_link || "/treatment"}
                className="inline-flex items-center gap-3 text-brand-charcoal font-bold tracking-widest text-xs uppercase hover:text-brand-forest transition-colors group"
              >
                {siteContent.treatments_button_text || "Explore Full Menu"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
              {treatmentsList?.map((cat: any, i: number) => (
                <motion.a 
                  key={i}
                  href="/treatment"
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                   
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group cursor-pointer block"
                >
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-brand-sage/10 shadow-sm">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  <h3 className="font-serif text-2xl text-brand-forest mb-2 group-hover:text-brand-charcoal transition-colors">{cat.name}</h3>
                  <p className="text-brand-charcoal/70 font-light text-sm mb-4 line-clamp-2">{cat.desc}</p>
                  <div className="h-[1px] w-12 bg-brand-forest group-hover:w-full transition-all duration-500 ease-out" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            05. FEATURED PACKAGES
        ---------------------------------------------------------------------- */}
        <section id="packages" className="py-24 md:py-32 bg-[#F9F8F6]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionHeading subtitle={siteContent.packages_subtitle || "Curated Experiences"}>{siteContent.packages_title || "Featured Packages"}</SectionHeading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {packagesList?.map((pkg: any, i: number) => (
                <div key={i} className="bg-[#F9F8F6] rounded-[2rem] border border-[#EAE6E1] overflow-hidden flex flex-col sm:flex-row hover:shadow-lg hover:shadow-[#4C5C44]/5 transition-all duration-500">
                  {/* Image */}
                  <div className="w-full sm:w-[40%] relative min-h-[240px] sm:min-h-full bg-neutral-100 shrink-0">
                    <img src={pkg.img} alt={pkg.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  
                  {/* Content */}
                  <div className="w-full sm:w-[60%] p-8 flex flex-col bg-white">
                    <h3 className="font-serif text-3xl text-[#4C5C44] mb-3">{pkg.name}</h3>
                    <p className="text-[#3A3632]/70 text-sm font-light mb-6 leading-relaxed">{pkg.desc}</p>
                    
                    <div className="space-y-3 mb-8 flex-grow">
                      {pkg.features?.map((feat: string, j: number) => (
                        <div key={j} className="flex items-start gap-3">
                          <div className="mt-0.5 text-[#4C5C44]">
                             <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="text-[#3A3632]/80 text-sm font-light">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-[#EAE6E1] flex items-end justify-between gap-4 mt-auto">
                      <div>
                        <div className="text-[10px] text-[#3A3632]/50 font-bold tracking-widest uppercase mb-1">{pkg.priceLabel}</div>
                        <div className="font-sans font-bold text-lg text-[#4C5C44]">{pkg.price}</div>
                      </div>
                      <a 
                        href={pkg.ctaLink || WA_LINK}
                        target="_blank" rel="noopener noreferrer"
                        className="bg-[#4C5C44] text-white px-6 py-2.5 rounded-full text-[11px] font-bold tracking-wider hover:bg-[#3A4534] transition-colors flex-shrink-0"
                      >
                        {pkg.ctaText || "Book Now"}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            06. MEET OUR DOCTORS
        ---------------------------------------------------------------------- */}
        <section id="doctors" className="py-24 md:py-32 bg-[#F9F8F6] border-t border-brand-beige/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionHeading subtitle={siteContent.doctors_subtitle || "Medical Excellence"}>
              {siteContent.doctors_title || "Meet Our Doctors"}
            </SectionHeading>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {doctorsList?.map((doc: any, i: number) => (
                <div key={i} className="text-center group flex flex-col items-center">
                  <div className="w-full aspect-[4/5] rounded-[32px] overflow-hidden mb-6 bg-brand-sage/20 relative shadow-sm">
                    <img src={doc.img} alt={doc.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  <h4 className="font-serif text-[26px] text-[#4C5C44] mb-2">{doc.name}</h4>
                  <p className="text-[#3A3632]/50 text-xs font-bold tracking-[0.15em] uppercase mb-3">{doc.title}</p>
                  <p className="text-[#3A3632]/70 text-sm leading-relaxed px-2">{doc.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <a 
                href={siteContent.doctors_button_link && siteContent.doctors_button_link !== '#' ? siteContent.doctors_button_link : "/doctor"}
                className="px-8 py-3.5 rounded-full border border-[#4C5C44] text-[#4C5C44] text-sm font-semibold hover:bg-[#4C5C44] hover:text-white transition-colors"
              >
                {siteContent.doctors_button_text || "View All Doctors"}
              </a>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            07. WHY CHOOSE SHAZ
        ---------------------------------------------------------------------- */}
        <section id="why-choose-us" className="py-24 md:py-32 bg-[#4C5C44] text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                {siteContent.reasons_title || "Why Choose SHAZ"}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {reasonsList?.map((reason: any, i: number) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6 text-white bg-transparent">
                    {getIconComponent(reason.icon)}
                  </div>
                  <h4 className="font-serif text-2xl text-white mb-4">{reason.title}</h4>
                  <p className="text-white/80 text-sm leading-relaxed px-4">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            08. TRANSFORMATIONS
        ---------------------------------------------------------------------- */}
        <section id="transformations" className="py-24 md:py-32 bg-[#F9F8F6] border-t border-brand-beige/30 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex justify-between items-end mb-16 md:mb-24">
              <div className="text-left">
                <span className="text-brand-forest font-semibold tracking-[0.2em] text-xs uppercase mb-4 block">
                  {siteContent.transformations_subtitle || "BEFORE & AFTER"}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-tight">
                  {siteContent.transformations_title || "Transformations"}
                </h2>
              </div>
              <div className="hidden md:flex gap-4">
                <button 
                  onClick={() => scrollTransformations('left')}
                  className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-brand-forest hover:text-brand-forest transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => scrollTransformations('right')}
                  className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-brand-forest hover:text-brand-forest transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div 
              ref={carouselRef}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-6 px-6 lg:-mx-12 lg:px-12"
            >
              {transformationsList?.map((trans: any, i: number) => (
                <div key={i} className="min-w-[85vw] md:min-w-[400px] snap-center shrink-0">
                  <div className="w-full aspect-[3/4] md:aspect-[4/5] rounded-[32px] overflow-hidden bg-brand-sage/20 relative shadow-sm border-4 border-white/50">
                    <img src={trans.img} alt={`Transformation ${i+1}`} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex md:hidden justify-center gap-4 mt-8">
              <button 
                onClick={() => scrollTransformations('left')}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-brand-forest hover:text-brand-forest transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scrollTransformations('right')}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-brand-forest hover:text-brand-forest transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            09. CLIENT REVIEWS
        ---------------------------------------------------------------------- */}
        <section id="reviews" className="py-24 md:py-32 bg-[#F9F8F6] border-t border-brand-beige/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
              <div className="text-left">
                <span className="text-brand-forest font-semibold tracking-[0.2em] text-xs uppercase mb-4 block">
                  {siteContent.reviews_subtitle || "CLIENT STORIES"}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-tight mb-4">
                  {siteContent.reviews_title || "Real Experiences"}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex text-brand-forest">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {siteContent.reviews_overall_rating || "4.9"} Overall Rating on Google
                  </span>
                </div>
              </div>
              <div>
                <a 
                  href={siteContent.reviews_link || "#"} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-medium text-brand-forest hover:text-brand-charcoal transition-colors border-b border-brand-forest hover:border-brand-charcoal pb-1"
                >
                  See More Reviews <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviewsList?.slice(0, 3).map((review: any, i: number) => (
                <div key={i} className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-100 flex flex-col justify-between relative">
                  <div className="absolute top-8 right-8 text-gray-100 opacity-50 pointer-events-none">
                    <Quote className="w-16 h-16 fill-current" />
                  </div>
                  
                  <div>
                    <div className="flex text-brand-forest mb-6">
                      {[...Array(review.rating || 5)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="italic text-gray-500 leading-relaxed text-sm md:text-base relative z-10 mb-8">
                      &quot;{review.text}&quot;
                    </p>
                  </div>
                  
                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-800 text-lg mb-1">{review.name}</h4>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">GOOGLE REVIEW</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            10. PROMO / OFFER
        ---------------------------------------------------------------------- */}
        <section id="promo" className="py-24 md:py-32 bg-[#F9F8F6]">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="bg-[#4C5C44] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-xl">
              <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
                <img 
                  src={siteContent.promo_image || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"} 
                  alt="Special Offer" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              </div>
              <div className="md:w-1/2 p-10 md:p-16 lg:p-20 text-white flex flex-col justify-center">
                <span className="text-[#EAE6E1] font-semibold tracking-[0.2em] text-xs uppercase mb-4 block">
                  {siteContent.promo_kicker || "LIMITED TIME OFFER"}
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl mb-6 leading-tight text-white">
                  {siteContent.promo_title || "Botox – 10% OFF"}
                </h2>
                <p className="text-[#EAE6E1]/80 text-base md:text-lg font-light mb-10 leading-relaxed">
                  {siteContent.promo_description || "Experience smoother skin and a refreshed look with our signature precision Botox treatments. Secure this exclusive offer before it expires."}
                </p>
                
                <div className="border border-white/20 rounded-xl px-6 py-4 mb-10 bg-white/5 inline-block self-start">
                  <span className="font-semibold tracking-wider text-sm">
                    {siteContent.promo_validity || "VALID UNTIL 31 AUGUST 2026"}
                  </span>
                </div>
                
                <a 
                  href={siteContent.promo_button_link || "#"}
                  className="px-8 py-4 rounded-full bg-white text-[#4C5C44] text-sm font-semibold hover:bg-[#EAE6E1] transition-colors self-start shadow-md"
                >
                  {siteContent.promo_button_text || "Claim Offer"}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            11. LOCATION & CTA
        ---------------------------------------------------------------------- */}
        <section id="clinics" className="py-24 md:py-32 bg-[#F9F8F6]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16 md:mb-24">
              <span className="text-[#4C5C44] font-semibold tracking-[0.2em] text-xs uppercase mb-4 block">
                {siteContent.clinics_subtitle || "OUR CLINICS"}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#3A3632] leading-tight">
                {siteContent.clinics_title || "Experience SHAZ."}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {clinicsList.map((clinic: any, index: number) => (
                <div key={index} className="flex flex-col group">
                  <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 bg-gray-200">
                    <img 
                      src={clinic.img} 
                      alt={clinic.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                    />
                  </div>
                  <h3 className="font-serif text-3xl text-[#3A3632] mb-3">{clinic.name}</h3>
                  <div className="flex items-start gap-2 mb-6">
                    <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed">{clinic.address}</p>
                  </div>
                  <a 
                    href={clinic.link || "#"}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#4C5C44] font-bold tracking-widest text-xs uppercase hover:opacity-70 transition-opacity"
                  >
                    GET DIRECTIONS <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ----------------------------------------------------------------------
          FOOTER
      ---------------------------------------------------------------------- */}
      <GlobalFooter initialContent={siteContent} />
    </div>
  );
}
