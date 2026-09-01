'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Stethoscope, 
  Sparkles, 
  HeartPulse, 
  Coffee, 
  ShieldCheck, 
  Award, 
  Clock, 
  Users,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

const WA_LINK = "https://wa.link/o7f5yk";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Stethoscope': return <Stethoscope className="w-6 h-6" />;
    case 'Sparkles': return <Sparkles className="w-6 h-6" />;
    case 'HeartPulse': return <HeartPulse className="w-6 h-6" />;
    case 'Coffee': return <Coffee className="w-6 h-6" />;
    case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
    case 'Award': return <Award className="w-6 h-6" />;
    case 'Clock': return <Clock className="w-6 h-6" />;
    case 'Users': return <Users className="w-6 h-6" />;
    default: return <Sparkles className="w-6 h-6" />;
  }
};

interface ClientAboutPageProps {
  initialContent?: Record<string, any>;
}

export default function ClientAboutPage({ initialContent = {} }: ClientAboutPageProps) {
  const [siteContent, setSiteContent] = useState<any>(initialContent);

  useEffect(() => {
    if (!initialContent || Object.keys(initialContent).length === 0) {
      const fetchContent = async () => {
        try {
          const res = await fetch('/api/content');
          const json = await res.json();
          if (json.status === 'success' && json.data) {
            setSiteContent(json.data);
          }
        } catch (err) {
          console.log('Using default content on About page');
        }
      };
      fetchContent();
    }
  }, [initialContent]);

  // Default Stats List
  const defaultStats = [
    { id: "1", number: "10+", label: "Years Experience", desc: "Dedicated to clinical aesthetics" },
    { id: "2", number: "15K+", label: "Happy Patients", desc: "Trusted by domestic & global guests" },
    { id: "3", number: "100%", label: "Certified Doctors", desc: "Licensed aesthetic physicians" },
    { id: "4", number: "4.9 ★", label: "Google Rating", desc: "Consistently rated top clinic in Bali" }
  ];

  let statsList = defaultStats;
  if (siteContent.about_stats_list) {
    try {
      const parsed = typeof siteContent.about_stats_list === 'string' ? JSON.parse(siteContent.about_stats_list) : siteContent.about_stats_list;
      if (Array.isArray(parsed) && parsed.length > 0) statsList = parsed;
    } catch (e) {}
  }

  // Default Values List
  const defaultValues = [
    { 
      id: "1", 
      icon: "Stethoscope", 
      title: "Medical Integrity & Safety", 
      desc: "Every procedure is performed by qualified aesthetic doctors adhering to stringent medical standards and FDA-cleared technology." 
    },
    { 
      id: "2", 
      icon: "Sparkles", 
      title: "Subtle, Natural Artistry", 
      desc: "We focus on harmonizing and enhancing your unique facial features with an artistic, balanced, and timeless aesthetic philosophy." 
    },
    { 
      id: "3", 
      icon: "HeartPulse", 
      title: "Bespoke Treatment Protocols", 
      desc: "No one-size-fits-all treatments. We design individual treatment plans tailored precisely to your skin goals and anatomy." 
    },
    { 
      id: "4", 
      icon: "Coffee", 
      title: "Sanctuary Atmosphere & Privacy", 
      desc: "Step into an oasis of calm. Our private treatment suites provide discrete luxury, sensory comfort, and complete peace of mind." 
    }
  ];

  let valuesList = defaultValues;
  if (siteContent.about_values_list) {
    try {
      const parsed = typeof siteContent.about_values_list === 'string' ? JSON.parse(siteContent.about_values_list) : siteContent.about_values_list;
      if (Array.isArray(parsed) && parsed.length > 0) valuesList = parsed;
    } catch (e) {}
  }

  return (
    <div className="min-h-screen bg-brand-white text-brand-charcoal font-sans selection:bg-brand-forest selection:text-white">
      {/* Global Header */}
      <GlobalHeader initialContent={siteContent} />

      <main>
        {/* ----------------------------------------------------------------------
            01. ABOUT HERO SECTION
        ---------------------------------------------------------------------- */}
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-brand-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            
            {/* Header Content */}
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-brand-forest font-semibold tracking-[0.25em] text-xs uppercase mb-4 block"
              >
                {siteContent.about_hero_badge || "ABOUT SHAZ CLINIC & SALON"}
              </motion.span>

              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-brand-charcoal mb-8"
              >
                {siteContent.about_hero_title ? (
                  <span dangerouslySetInnerHTML={{ __html: siteContent.about_hero_title }} />
                ) : (
                  <>
                    Where Medical Science <br />
                    <span className="italic font-light text-[#7C8B76]">Meets Luxury Artistry</span>
                  </>
                )}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="text-lg md:text-xl text-brand-charcoal/70 font-light leading-relaxed max-w-2xl mx-auto mb-10"
              >
                {siteContent.about_hero_subtitle || "Bali's sanctuary for advanced aesthetic medicine, bespoke dermatology protocols, and refined luxury care."}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <a 
                  href={siteContent.about_cta_button_link || WA_LINK}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-[#4C5C44] text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-brand-charcoal transition-all duration-300 flex items-center justify-center gap-3 shadow-md shadow-[#4C5C44]/20"
                >
                  {siteContent.about_cta_button_text || "Book Consultation"} <ArrowRight className="w-4 h-4" />
                </a>
                <Link 
                  href="/#treatments"
                  className="bg-transparent border border-[#EAE6E1] text-[#3A3632] px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#EAE6E1]/50 transition-all duration-300 flex items-center justify-center"
                >
                  Explore Treatments
                </Link>
              </motion.div>
            </div>

            {/* Hero Main Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3 }}
              className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-neutral-200"
            >
              <img 
                src={siteContent.about_hero_image || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop"} 
                alt="SHAZ Aesthetic Clinic" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white max-w-md">
                <span className="text-xs uppercase tracking-widest font-semibold bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full inline-block mb-2">
                  Seminyak, Bali
                </span>
                <p className="text-sm md:text-base font-light text-white/90">
                  A sanctuary designed for holistic transformation, rejuvenation, and serenity.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ----------------------------------------------------------------------
            02. BRAND STORY & PHILOSOPHY
        ---------------------------------------------------------------------- */}
        <section className="py-24 md:py-32 bg-[#F9F8F6] border-t border-brand-beige/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Visual Collage */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                
                transition={{ duration: 0.8 }}
                className="lg:col-span-6 grid grid-cols-2 gap-4 md:gap-6"
              >
                <div className="space-y-4 md:space-y-6">
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-200 shadow-sm">
                    <img 
                      src={siteContent.about_story_image1 || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop"} 
                      alt="Doctor Patient Consultation" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 bg-white rounded-[1.8rem] border border-[#EAE6E1] text-center shadow-sm">
                    <div className="font-serif text-3xl md:text-4xl text-[#4C5C44] font-bold mb-1">100%</div>
                    <p className="text-xs text-[#3A3632]/70 uppercase tracking-widest font-semibold">Doctor-Led Care</p>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6 pt-8 md:pt-12">
                  <div className="p-6 bg-[#4C5C44] text-white rounded-[1.8rem] text-center shadow-sm">
                    <div className="font-serif text-3xl md:text-4xl font-bold mb-1">FDA</div>
                    <p className="text-xs text-white/80 uppercase tracking-widest font-semibold">Approved Devices</p>
                  </div>
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-200 shadow-sm">
                    <img 
                      src={siteContent.about_story_image2 || "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop"} 
                      alt="Aesthetic Clinic Suite" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Text & Story */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                
                transition={{ duration: 0.8 }}
                className="lg:col-span-6 lg:pl-6"
              >
                <span className="text-[#7C8B76] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                  {siteContent.about_story_badge || "OUR STORY & PHILOSOPHY"}
                </span>

                <h2 className="font-serif text-4xl md:text-5xl text-[#3A3632] leading-tight mb-8">
                  {siteContent.about_story_title ? (
                    <span dangerouslySetInnerHTML={{ __html: siteContent.about_story_title }} />
                  ) : (
                    <>
                      Redefining Aesthetic Wellness in <span className="italic font-light text-[#7C8B76]">Seminyak</span>
                    </>
                  )}
                </h2>

                <div className="space-y-6 text-[#3A3632]/80 font-light text-base md:text-lg leading-relaxed mb-10">
                  <p>
                    {siteContent.about_story_p1 || "At SHAZ, we believe that true beauty begins with health, balance, and confidence. Founded by licensed medical aesthetic physicians with a dedication to clinical precision, our sanctuary merges evidence-based dermatology with refined, sensory indulgence."}
                  </p>
                  <p>
                    {siteContent.about_story_p2 || "Every treatment protocol is tailored to your unique anatomical harmony. We never adopt a one-size-fits-all approach—instead, our certified doctors utilize precision diagnostics and world-class technology to achieve subtle, natural, and timeless results."}
                  </p>
                </div>

                {/* Checklist highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EAE6E1]">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4C5C44] shrink-0" />
                    <span className="text-sm font-medium text-[#3A3632]">Evidence-based protocols</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4C5C44] shrink-0" />
                    <span className="text-sm font-medium text-[#3A3632]">Genuine & authentic products</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4C5C44] shrink-0" />
                    <span className="text-sm font-medium text-[#3A3632]">Dedicated doctor consultations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4C5C44] shrink-0" />
                    <span className="text-sm font-medium text-[#3A3632]">Discreet luxury environment</span>
                  </div>
                </div>

              </motion.div>

            </div>

            {/* Stats Row */}
            <div className="mt-20 pt-16 border-t border-[#EAE6E1] grid grid-cols-2 lg:grid-cols-4 gap-8">
              {statsList.map((stat: any, idx: number) => (
                <div key={idx} className="text-center md:text-left">
                  <div className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#4C5C44] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base font-bold text-[#3A3632] mb-1">
                    {stat.label}
                  </div>
                  <p className="text-xs md:text-sm text-[#3A3632]/60 font-light">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ----------------------------------------------------------------------
            03. OUR 4 CORE PILLARS / VALUES
        ---------------------------------------------------------------------- */}
        <section className="py-24 md:py-32 bg-[#4C5C44] text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-[#EAE6E1] font-semibold tracking-[0.25em] text-xs uppercase mb-4 block">
                {siteContent.about_values_badge || "OUR CORE PILLARS"}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                {siteContent.about_values_title || "The 4 Pillars of the SHAZ Standard"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valuesList.map((val: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-3xl p-8 flex flex-col justify-between hover:bg-white/10 transition-all duration-300"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6">
                      {getIconComponent(val.icon)}
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-3 leading-snug">
                      {val.title}
                    </h3>
                    <p className="text-white/80 font-light text-sm leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10 text-xs font-bold tracking-widest text-[#EAE6E1] uppercase flex items-center justify-between">
                    <span>PILLAR 0{idx + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ----------------------------------------------------------------------
            04. SANCTUARY & CLINIC FACILITIES
        ---------------------------------------------------------------------- */}
        <section className="py-24 md:py-32 bg-brand-white border-t border-brand-beige/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
              <div className="lg:col-span-6">
                <span className="text-[#7C8B76] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                  {siteContent.about_facility_badge || "OUR SANCTUARY"}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-[#3A3632] leading-tight mb-6">
                  {siteContent.about_facility_title || "Designed for Tranquility and Clinical Precision"}
                </h2>
              </div>
              <div className="lg:col-span-6">
                <p className="text-[#3A3632]/70 text-base md:text-lg font-light leading-relaxed">
                  {siteContent.about_facility_description || "Step into our serene, air-conditioned private rooms equipped with cutting-edge aesthetic devices, ergonomic treatment beds, and calming aromatherapeutic touches."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-neutral-200 shadow-sm group">
                <img 
                  src={siteContent.about_facility_image1 || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop"} 
                  alt="Sanctuary Lobby" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-neutral-200 shadow-sm group">
                <img 
                  src={siteContent.about_facility_image2 || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop"} 
                  alt="Private Treatment Suite" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-neutral-200 shadow-sm group">
                <img 
                  src={siteContent.about_facility_image3 || "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000&auto=format&fit=crop"} 
                  alt="Medical Grade Sterilization" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ----------------------------------------------------------------------
            05. CALL TO ACTION (CTA)
        ---------------------------------------------------------------------- */}
        <section className="py-24 md:py-32 bg-[#F9F8F6]">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="bg-[#4C5C44] rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-16 lg:p-20 text-white text-center shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="text-[#EAE6E1] font-semibold tracking-[0.25em] text-xs uppercase mb-4 block">
                  {siteContent.about_cta_badge || "EXPERIENCE SHAZ"}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
                  {siteContent.about_cta_title || "Ready to Begin Your Aesthetic Journey?"}
                </h2>
                <p className="text-[#EAE6E1]/80 text-base md:text-lg font-light mb-10 leading-relaxed">
                  {siteContent.about_cta_subtitle || "Book a comprehensive consultation with our medical doctors in Seminyak, Bali or chat directly with our client care team."}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a 
                    href={siteContent.about_cta_button_link || WA_LINK}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-[#4C5C44] text-xs font-bold tracking-widest uppercase hover:bg-[#EAE6E1] transition-colors shadow-lg"
                  >
                    {siteContent.about_cta_button_text || "Book Consultation via WhatsApp"}
                  </a>
                  <Link 
                    href="/#clinics"
                    className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/30 text-white text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                  >
                    View Locations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Global Footer */}
      <GlobalFooter initialContent={siteContent} />
    </div>
  );
}
