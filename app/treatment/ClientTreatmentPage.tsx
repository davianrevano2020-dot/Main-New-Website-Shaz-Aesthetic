'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Award,
  Stethoscope,
  HeartHandshake,
  CheckCircle2,
  X,
  Clock,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

const WA_DEFAULT = "https://wa.link/o7f5yk";

// ----------------------------------------------------------------------
// Category Data Schema (Default Mock & CMS Ready Structure)
// ----------------------------------------------------------------------
export interface TreatmentItem {
  name: string;
  desc: string;
  duration?: string;
  keyBenefits?: string[];
  tag?: string;
  suitableFor?: string;
  procedure?: string;
  downtime?: string;
  expectedResults?: string;
  price?: string;
}

export interface TreatmentCategory {
  id: string;
  name: string;
  slug: string;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  img: string;
  treatmentsCount: string;
  featuredTreatments: TreatmentItem[];
  whatsappMessage: string;
}

export const DEFAULT_CATEGORIES: TreatmentCategory[] = [
  {
    id: 'facial',
    slug: 'facial',
    name: 'Facial',
    badge: 'Medical Skin Health',
    shortDesc: 'Advanced medical facials, deep pore detox, exosome cellular infusions, and bespoke hydration therapies for clear, glowing, and resilient skin.',
    fullDesc: 'Our medical-grade facials combine deep extraction, advanced peptide infusions, and exosome cellular therapies tailored to your skin barrier, acne profile, and hydration needs in tropical climates.',
    img: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1000&auto=format&fit=crop',
    treatmentsCount: '6 Signature Protocols',
    whatsappMessage: 'Hello SHAZ Clinic, I would like to inquire and book a consultation for Facial treatments.',
    featuredTreatments: [
      {
        name: 'Signature Glass Skin Protocol',
        desc: 'Deep multi-layer hydration, lactic acid gentle peel, and antioxidant infusion to achieve a translucent, poreless glow.',
        duration: '75 Mins',
        keyBenefits: ['Deep pore refinement', 'Intense moisture lock', 'Immediate luminosity'],
        tag: 'Most Popular',
        suitableFor: 'Dull, dehydrated, or textured skin',
        procedure: 'Cleansing, mild peeling, serum infusion, LED mask',
        downtime: 'No downtime, instant glow',
        expectedResults: 'Radiant, hydrated skin lasting 2-4 weeks',
        price: 'From Rp 1,500,000'
      },
      {
        name: 'Exosome Cellular Rejuvenation',
        desc: 'Cutting-edge stem-cell-derived exosome therapy delivering active growth factors to repair damaged barriers and accelerate collagen synthesis.',
        duration: '90 Mins',
        keyBenefits: ['Cellular barrier repair', 'Anti-inflammatory', 'Elasticity recovery']
      },
      {
        name: 'Deep Clarifying & Acne Detox',
        desc: 'Ultrasonic cleansing, medical comedone extraction, salicylic clarifying solution, and anti-bacterial Blue LED light therapy.',
        duration: '75 Mins',
        keyBenefits: ['Calms active breakouts', 'Reduces excess sebum', 'Prevents post-acne marks']
      },
      {
        name: 'Hydra-Oxygen Recharging Facial',
        desc: 'Pressurized hyperbaric oxygen combined with pure hyaluronic acid to instantly revive tired, sun-exposed, and dehydrated skin.',
        duration: '60 Mins',
        keyBenefits: ['Deep oxygenation', 'Soothes sunburn', 'Plumps fine dehydration lines']
      }
    ]
  },
  {
    id: 'injectables',
    slug: 'injectables',
    name: 'Injectables',
    badge: 'Doctor Performed',
    shortDesc: 'Master-injected neuromodulators, premium dermal fillers, polynucleotide biostimulators, and skin boosters for subtle, natural anatomical harmony.',
    fullDesc: 'Performed exclusively by certified aesthetic physicians, our structural injectables prioritize facial balancing, safety, and undetectable natural enhancement that ages gracefully with you.',
    img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000&auto=format&fit=crop',
    treatmentsCount: '8 Specialized Procedures',
    whatsappMessage: 'Hello SHAZ Clinic, I would like to consult with a doctor regarding Injectables & Botox.',
    featuredTreatments: [
      {
        name: 'Precision Neuromodulators & Botox',
        desc: 'Targeted micro-dosing of FDA-approved neuromodulators to soften expression lines while preserving natural facial expressions.',
        duration: '30 - 45 Mins',
        keyBenefits: ['Softens crow\'s feet & forehead lines', 'Masseter jawline slimming', 'Zero downtime'],
        tag: 'Doctor Exclusive',
        suitableFor: 'Dynamic wrinkles, jaw clenching, anti-aging prevention',
        procedure: 'Consultation, mapping, micro-injections',
        downtime: 'No downtime (avoid rubbing area for 24h)',
        expectedResults: 'Visible in 3-5 days, peaks at 14 days, lasts 3-6 months',
        price: 'From Rp 80,000 / unit'
      },
      {
        name: 'Hyaluronic Dermal Sculpting',
        desc: 'Premium cohesive hyaluronic acid fillers to restore lost mid-face volume, refine jawlines, and enhance lip symmetry.',
        duration: '45 - 60 Mins',
        keyBenefits: ['Immediate structural lift', 'Restores facial contours', 'Natural, soft integration']
      },
      {
        name: 'Profhilo & Deep Hydration Skin Boosters',
        desc: 'Ultra-pure bio-remodeling hyaluronic acid that stimulates four types of collagen and elastin to firm skin laxity from within.',
        duration: '30 Mins',
        keyBenefits: ['Bio-remodeling', 'Improves skin firmness', 'Radiant lit-from-within glow']
      },
      {
        name: 'Polynucleotide (Salmon DNA) Biostimulator',
        desc: 'Highly purified DNA fragments that regenerate microvascular skin architecture, calm redness, and repair thinning under-eye skin.',
        duration: '45 Mins',
        keyBenefits: ['Tear-trough brightening', 'Tissue regeneration', 'Skin thickness enhancement']
      }
    ]
  },
  {
    id: 'laser',
    slug: 'laser',
    name: 'Laser',
    badge: 'Energy-Based Devices',
    shortDesc: 'High-precision laser technology for targeted pigmentation removal, vascular correction, acne scar resurfacing, and total skin brightening.',
    fullDesc: 'Harnessing advanced clinical energy devices and non-ablative wavelengths, our laser suite effectively clears melasma, sun spots, broken capillaries, and uneven texture with minimal downtime.',
    img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059c98b?q=80&w=1000&auto=format&fit=crop',
    treatmentsCount: '5 Clinical Modalities',
    whatsappMessage: 'Hello SHAZ Clinic, I would like to inquire about Laser treatments and skin resurfacing.',
    featuredTreatments: [
      {
        name: 'PicoSure & Picosecond Precision Laser',
        desc: 'Ultra-fast picosecond pulses shattering stubborn melanin and sun damage into microscopic dust without heating surrounding tissues.',
        duration: '45 Mins',
        keyBenefits: ['Tackles freckles & melasma', 'Refines enlarged pores', 'Promotes collagen toning'],
        tag: 'Advanced Device'
      },
      {
        name: 'Fractional Skin Resurfacing',
        desc: 'Micro-fractional laser columns that stimulate deep dermal remodeling to smooth atrophic acne scars and rough skin texture.',
        duration: '60 Mins',
        keyBenefits: ['Acne scar reduction', 'Improves skin texture', 'Accelerates skin renewal']
      },
      {
        name: 'Q-Switched Laser Toning',
        desc: 'Gentle, uniform laser energy for holistic complexion brightening, reduction of diffuse erythema, and overall tone equalization.',
        duration: '40 Mins',
        keyBenefits: ['Zero downtime', 'Even skin tone', 'Gentle on sensitive skin']
      },
      {
        name: 'Vascular & Redness Laser Therapy',
        desc: 'Selectively targets hemoglobin to collapse broken facial veins, spider capillaries, and persistent rosacea redness.',
        duration: '30 Mins',
        keyBenefits: ['Clears spider veins', 'Reduces facial flushing', 'Restores calm skin']
      }
    ]
  },
  {
    id: 'body',
    slug: 'body',
    name: 'Body',
    badge: 'Contouring & Wellness',
    shortDesc: 'Non-invasive body contouring, lymphatic drainage, radiofrequency skin tightening, and localized slimming protocols designed for your silhouette.',
    fullDesc: 'Sculpt, tone, and firm your body with our non-surgical aesthetic wellness therapies that combine lymphatic detox, targeted fat metabolism, and deep collagen stimulation.',
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop',
    treatmentsCount: '4 Contouring Solutions',
    whatsappMessage: 'Hello SHAZ Clinic, I would like to book a consultation for Body Contouring & Tightening.',
    featuredTreatments: [
      {
        name: 'RF Multi-Polar Skin Tightening',
        desc: 'Deep thermal radiofrequency heating that stimulates instant collagen contraction and long-term tissue remodeling across the abdomen, arms, and thighs.',
        duration: '60 Mins',
        keyBenefits: ['Tightens loose skin', 'Improves skin elasticity', 'Non-invasive & comfortable']
      },
      {
        name: 'Targeted Lipolytic Contouring',
        desc: 'Doctor-administered lipolytic micro-infusions targeting persistent localized fat deposits that resist diet and exercise.',
        duration: '45 Mins',
        keyBenefits: ['Pinpoint fat reduction', 'Refines contours', 'Gradual, natural results'],
        tag: 'Targeted Sculpting'
      },
      {
        name: 'Clinical Lymphatic Drainage Detox',
        desc: 'Specialized pneumatic compression therapy that eliminates water retention, reduces toxin stagnation, and accelerates metabolic recovery.',
        duration: '50 Mins',
        keyBenefits: ['Reduces puffiness & bloating', 'Boosts circulation', 'Relieves heavy legs']
      }
    ]
  },
  {
    id: 'hair',
    slug: 'hair',
    name: 'Hair',
    badge: 'Scalp & Follicle Therapy',
    shortDesc: 'Clinical scalp revitalizing protocols, medical hair restoration, PRP treatments, and regenerative follicle stimulation for thicker, healthier hair.',
    fullDesc: 'Address thinning hair, receding hairlines, and stressed scalp microenvironments through scientifically proven regenerative therapies and customized medical serums.',
    img: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1000&auto=format&fit=crop',
    treatmentsCount: '4 Restorative Protocols',
    whatsappMessage: 'Hello SHAZ Clinic, I would like to consult about Hair & Scalp Restoration treatments.',
    featuredTreatments: [
      {
        name: 'Autologous PRP Hair Restoration',
        desc: 'Concentrated platelet-rich plasma derived from your own blood, packed with growth factors that reactivate dormant follicles and extend hair growth cycles.',
        duration: '60 Mins',
        keyBenefits: ['Reactivates dormant follicles', 'Increases hair shaft thickness', 'Natural biological therapy'],
        tag: 'Regenerative'
      },
      {
        name: 'Scalp Microneedling & Peptide Infusion',
        desc: 'Controlled micro-channels delivering biomimetic hair peptides and vitamins directly into the scalp dermis for enhanced follicle nourishment.',
        duration: '50 Mins',
        keyBenefits: ['Enhances serum absorption', 'Strengthens hair roots', 'Improves scalp circulation']
      },
      {
        name: 'Clinical Scalp Detox & Exfoliation',
        desc: 'Deep scalp clarifying ritual removing sebum buildup, product residues, and dandruff while restoring a balanced microbiome.',
        duration: '45 Mins',
        keyBenefits: ['Clears congested pores', 'Soothes itchy scalp', 'Optimal base for hair growth']
      }
    ]
  },
  {
    id: 'salon',
    slug: 'salon',
    name: 'Salon',
    badge: 'Luxury Beauty & Hair',
    shortDesc: 'Luxury salon rituals, bespoke hair styling, intensive hair repair treatments, scalp spa experiences, manicures, and brow grooming in a serene retreat.',
    fullDesc: 'Immerse yourself in our premium salon sanctuary where master stylists and beauty artisans elevate hair vitality, custom blowouts, nourishing hair masks, and meticulous nail grooming.',
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop',
    treatmentsCount: '7 Salon Services',
    whatsappMessage: 'Hello SHAZ Salon, I would like to book an appointment for Luxury Salon services.',
    featuredTreatments: [
      {
        name: 'Bespoke Luxury Hair Ritual & Scalp Spa',
        desc: 'Custom multi-step Japanese scalp cleansing, essential oil aromatherapeutic head massage, and deep nourishing botanical hair mask.',
        duration: '75 Mins',
        keyBenefits: ['Deep relaxation & stress relief', 'Intensive hair fiber repair', 'Silky, lightweight shine'],
        tag: 'Signature Spa'
      },
      {
        name: 'Keratin Smoothing & Intensive Repair',
        desc: 'Formaldehyde-free keratin infusion that eliminates frizz, restores damaged cuticles from humidity, and seals in mirror-like smoothness.',
        duration: '120 Mins',
        keyBenefits: ['Frizz-free for up to 3 months', 'Humidity resistant', 'Drastically cuts styling time']
      },
      {
        name: 'Signature Blowout & Styling',
        desc: 'Volumizing wash, personalized scalp massage, and precision blowout styling for special events, dinners, or everyday luxury.',
        duration: '45 Mins',
        keyBenefits: ['Bouncy, long-lasting volume', 'Heat-protective finish', 'Flawless styling']
      },
      {
        name: 'Spa Manicure & Pedicure Ritual',
        desc: 'Gentle cuticle care, organic scrub exfoliation, soothing hand & foot massage, and long-lasting non-toxic polish application.',
        duration: '60 Mins',
        keyBenefits: ['Deep skin softening', 'Immaculate nail shaping', 'Relaxing hand & foot massage']
      }
    ]
  }
];

interface ClientTreatmentPageProps {
  initialContent?: Record<string, any>;
}

export default function ClientTreatmentPage({ initialContent = {} }: ClientTreatmentPageProps) {
  const [content, setContent] = useState<any>(initialContent);
  const [activeCategoryModal, setActiveCategoryModal] = useState<TreatmentCategory | null>(null);

  useEffect(() => {
    if (!initialContent || Object.keys(initialContent).length === 0) {
      const fetchContent = async () => {
        try {
          const res = await fetch('/api/content');
          const json = await res.json();
          if (json.status === 'success' && json.data) {
            setContent(json.data);
          }
        } catch (err) {
          console.log('Using default treatment page content');
        }
      };
      fetchContent();
    }
  }, [initialContent]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCategoryModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getWhatsAppUrl = (customMsg?: string) => {
    const msg = customMsg || "Hello SHAZ Aesthetic Clinic, I would like to book a consultation for your treatments.";
    return `https://wa.me/628113889999?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-brand-white text-brand-charcoal flex flex-col selection:bg-brand-sage/30 selection:text-brand-charcoal">
      {/* ----------------------------------------------------------------------
          GLOBAL HEADER
      ---------------------------------------------------------------------- */}
      <GlobalHeader initialContent={content} />

      <main className="flex-1">
        {/* ----------------------------------------------------------------------
            01. HERO BANNER (Architectural & Editorial Layout - Warm Neutral Canvas)
        ---------------------------------------------------------------------- */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[#FAF8F5] overflow-hidden border-b border-brand-beige/60">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#EBE7DF]/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#E8ECE5]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand-charcoal/50 mb-6">
              <Link href="/" className="hover:text-brand-forest transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-brand-charcoal/30" />
              <span className="text-brand-forest">Treatments</span>
            </div>

            {/* Two-Column Hero Composition */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14">
              {/* Left Column: Narrative & CTA */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 flex flex-col items-start"
              >
                {/* Badge Kicker */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-beige/80 border border-brand-beige text-brand-charcoal/80 text-[11px] font-bold tracking-[0.2em] uppercase mb-6 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-brand-forest" />
                  <span>{content.treatment_hero_badge || "OUR TREATMENTS"}</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal leading-[1.12] mb-6">
                  {content.treatment_hero_title || "Treatments Designed Around You"}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-brand-charcoal/70 font-light leading-relaxed mb-8 max-w-xl">
                  {content.treatment_hero_subtitle || "Discover carefully curated aesthetic treatments designed to enhance your natural beauty and confidence."}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                  <a
                    href="#categories"
                    className="bg-[#4C5C44] text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-brand-charcoal transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md shadow-[#4C5C44]/20"
                  >
                    <span>{content.treatment_cta_text || "Explore Treatments"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={content.treatment_consultation_link || WA_DEFAULT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-brand-beige text-brand-charcoal px-7 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:border-brand-sage hover:bg-brand-beige/40 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-brand-forest" />
                    <span>Book Consultation</span>
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Hero Visual with Overlaid Trust Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="lg:col-span-5 relative"
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-neutral-100 border border-brand-beige/80 shadow-xl shadow-black/5">
                  <img
                    src={content.treatment_hero_image || "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1600&auto=format&fit=crop"}
                    alt="SHAZ Aesthetic Treatments & Clinical Protocols"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Overlaid Bottom Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-forest/10 flex items-center justify-center text-brand-forest shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold uppercase tracking-wider text-brand-charcoal truncate">
                          Evidence-Based Care
                        </div>
                        <div className="text-[11px] text-brand-charcoal/60 truncate">
                          FDA-Cleared Devices & Medical Formulations
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Clinical Trust Highlights Bar (4 Pillars) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 pt-8 border-t border-brand-beige/60"
            >
              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-brand-beige/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-forest/10 flex items-center justify-center text-brand-forest shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs uppercase tracking-wider text-brand-charcoal">Medical Doctors</div>
                  <div className="text-[11px] text-brand-charcoal/60 leading-snug mt-0.5">Certified Physicians</div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-brand-beige/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-forest/10 flex items-center justify-center text-brand-forest shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs uppercase tracking-wider text-brand-charcoal">FDA-Cleared Tech</div>
                  <div className="text-[11px] text-brand-charcoal/60 leading-snug mt-0.5">Global Gold Standards</div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-brand-beige/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-forest/10 flex items-center justify-center text-brand-forest shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs uppercase tracking-wider text-brand-charcoal">Bespoke Plans</div>
                  <div className="text-[11px] text-brand-charcoal/60 leading-snug mt-0.5">Personalized Diagnostics</div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-brand-beige/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-forest/10 flex items-center justify-center text-brand-forest shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs uppercase tracking-wider text-brand-charcoal">Seminyak Retreat</div>
                  <div className="text-[11px] text-brand-charcoal/60 leading-snug mt-0.5">Tranquil Private Suites</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            02. TREATMENT CATEGORIES (6 Premium Cards with Rich Hierarchy)
        ---------------------------------------------------------------------- */}
        <section id="categories" className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-12 scroll-mt-24">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="text-brand-forest font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
              CURATED CLINICAL SERVICES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-charcoal leading-tight mb-4">
              Treatment Categories
            </h2>
            <p className="text-sm sm:text-base text-brand-charcoal/70 font-light max-w-2xl mx-auto">
              Explore our comprehensive range of specialized medical aesthetics, precision energy devices, structural injectables, and sensory salon rituals in Seminyak, Bali.
            </p>
          </div>

          {/* 6 Category Grid - Multi-column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(content.treatment_categories ? JSON.parse(content.treatment_categories) : DEFAULT_CATEGORIES).map((category: TreatmentCategory, index: number) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => setActiveCategoryModal(category)}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-beige shadow-sm hover:shadow-xl hover:border-brand-sage/40 transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer"
              >
                  {/* Top Content: Image & Category Header */}
                  <div>
                    {/* Visual Frame */}
                    <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-neutral-100 mb-5">
                      <img
                        src={category.img}
                        alt={`SHAZ ${category.name} Treatments`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Top Left: Category Badge */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-forest shadow-sm">
                        {category.badge}
                      </div>

                      {/* Bottom Right: Treatments Count Pill */}
                      <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide flex items-center gap-1.5">
                        <Layers className="w-3 h-3 text-brand-beige" />
                        <span>{category.treatmentsCount}</span>
                      </div>
                    </div>

                    {/* Category Title & Description */}
                    <div className="space-y-2.5">
                      <h3 className="font-serif text-2xl sm:text-3xl text-brand-charcoal group-hover:text-brand-forest transition-colors leading-tight">
                        {category.name}
                      </h3>

                      <p className="text-brand-charcoal/70 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                        {category.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-5 mt-5 border-t border-brand-beige/60 flex items-center justify-between">
                    <span className="text-brand-charcoal font-bold tracking-widest text-xs uppercase group-hover:text-brand-forest transition-colors inline-flex items-center gap-1.5">
                      <span>View Treatments</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[11px] font-medium text-brand-charcoal/50 group-hover:text-brand-forest transition-colors">
                      Explore Menu
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
        </section>

        {/* ----------------------------------------------------------------------
            03. CLINICAL CONSULTATION / CLOSING SECTION
        ---------------------------------------------------------------------- */}
        <section className="py-20 md:py-28 bg-[#FAF8F5] border-t border-brand-beige/80">
          <div className="max-w-5xl mx-auto px-6 text-center">
            {/* Kicker */}
            <span className="text-brand-forest font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
              PERSONALIZED MEDICAL CARE
            </span>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-charcoal leading-tight mb-6">
              Not Sure Which Treatment is Right for You?
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-brand-charcoal/70 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              Our certified aesthetic physicians offer comprehensive 1-on-1 skin diagnostics and facial assessments to tailor a treatment protocol aligned specifically with your unique anatomy and goals.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WA_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#4C5C44] text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-brand-charcoal transition-all duration-300 flex items-center justify-center gap-3 shadow-md shadow-[#4C5C44]/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book Doctor Consultation</span>
              </a>

              <Link
                href="/doctor"
                className="w-full sm:w-auto bg-white border border-brand-beige text-brand-charcoal px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:border-brand-sage hover:bg-brand-beige/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Stethoscope className="w-4 h-4 text-brand-forest" />
                <span>Meet Our Doctors</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------------
          04. INTERACTIVE CATEGORY DETAIL MODAL / DRAWER (Spacious & Highly Legible)
      ---------------------------------------------------------------------- */}
      <AnimatePresence>
        {activeCategoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCategoryModal(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: "spring", duration: 0.45 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-brand-beige overflow-hidden z-10 max-h-[92vh] sm:h-[86vh] flex flex-col md:flex-row"
            >
              {/* Left Column (Desktop Visual & Context Panel / Mobile Header) */}
              <div className="md:w-5/12 lg:w-4/12 bg-[#FAF8F5] border-b md:border-b-0 md:border-r border-brand-beige/80 flex flex-col shrink-0 overflow-y-auto">
                {/* Visual Image Header */}
                <div className="relative h-36 sm:h-44 md:h-52 w-full shrink-0 overflow-hidden bg-neutral-200">
                  <img
                    src={activeCategoryModal.img}
                    alt={activeCategoryModal.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Mobile-only Close Button */}
                  <button
                    onClick={() => setActiveCategoryModal(null)}
                    className="md:hidden absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors z-20"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-beige block">
                      {activeCategoryModal.badge}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                      {activeCategoryModal.name}
                    </h3>
                  </div>
                </div>

                {/* Category Narrative Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-forest/10 text-brand-forest text-xs font-semibold">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{activeCategoryModal.treatmentsCount}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-brand-charcoal/80 font-light leading-relaxed">
                      {activeCategoryModal.fullDesc}
                    </p>
                  </div>

                  {/* Medical Trust Box & Primary WhatsApp CTA */}
                  <div className="pt-2 space-y-3 border-t border-brand-beige/60">
                    <div className="flex items-center gap-2 text-xs text-brand-charcoal/70">
                      <ShieldCheck className="w-4 h-4 text-brand-forest shrink-0" />
                      <span>Doctor-supervised clinical protocols</span>
                    </div>

                    <a
                      href={getWhatsAppUrl(activeCategoryModal.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider bg-[#4C5C44] text-white hover:bg-brand-charcoal transition-all flex items-center justify-center gap-2 shadow-md shadow-[#4C5C44]/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Inquire Category</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column (Spacious Scrollable Services List) */}
              <div className="md:w-7/12 lg:w-8/12 flex-1 flex flex-col bg-white overflow-hidden">
                {/* Header Bar */}
                <div className="px-6 py-4 border-b border-brand-beige flex items-center justify-between bg-white shrink-0">
                  <div>
                    <h4 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
                      Available Services & Protocols
                    </h4>
                    <p className="text-xs text-brand-charcoal/60 mt-0.5">
                      Select any treatment to learn more or book your session
                    </p>
                  </div>

                  {/* Desktop Close Button */}
                  <button
                    onClick={() => setActiveCategoryModal(null)}
                    className="hidden md:flex w-9 h-9 rounded-full bg-brand-beige/60 hover:bg-brand-beige text-brand-charcoal items-center justify-center transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 sm:space-y-5 bg-white">
                  {activeCategoryModal.featuredTreatments.map((treatment, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#FAF8F5] border border-brand-beige hover:border-brand-sage/60 hover:shadow-sm transition-all duration-200"
                    >
                      {/* Title & Meta Row */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h5 className="font-serif text-lg sm:text-xl text-brand-charcoal font-medium">
                            {treatment.name}
                          </h5>
                          {treatment.tag && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-forest/10 text-brand-forest px-2.5 py-0.5 rounded-full">
                              {treatment.tag}
                            </span>
                          )}
                        </div>

                        {treatment.duration && (
                          <div className="inline-flex items-center gap-1.5 text-xs text-brand-charcoal/70 bg-white px-2.5 py-1 rounded-full border border-brand-beige shrink-0 self-start">
                            <Clock className="w-3.5 h-3.5 text-brand-forest" />
                            <span className="font-medium">{treatment.duration}</span>
                          </div>
                        )}
                      </div>

                      {/* Clear Description Text */}
                      <p className="text-xs sm:text-sm text-brand-charcoal/80 font-normal leading-relaxed mb-4">
                        {treatment.desc}
                      </p>

                      {/* Key Benefits */}
                      {treatment.keyBenefits && treatment.keyBenefits.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {treatment.keyBenefits.map((benefit, bIdx) => (
                            <span
                              key={bIdx}
                              className="inline-flex items-center gap-1.5 text-xs text-brand-charcoal/80 bg-white px-3 py-1 rounded-lg border border-brand-beige"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-forest shrink-0" />
                              <span>{benefit}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Detailed Information Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-4 mt-2 border-t border-brand-beige/60 pt-4">
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-0.5">Suitable For</span>
                          <span className="text-xs text-brand-charcoal/80">{treatment.suitableFor || 'Consultation recommended'}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-0.5">Procedure</span>
                          <span className="text-xs text-brand-charcoal/80">{treatment.procedure || 'Clinical protocol'}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-0.5">Downtime</span>
                          <span className="text-xs text-brand-charcoal/80">{treatment.downtime || 'Minimal to none'}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-0.5">Expected Results</span>
                          <span className="text-xs text-brand-charcoal/80">{treatment.expectedResults || 'Progressive improvement'}</span>
                        </div>
                        <div className="sm:col-span-2 mt-1">
                          <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-0.5">Price</span>
                          <span className="text-sm font-medium text-brand-forest">{treatment.price || 'Available upon consultation'}</span>
                        </div>
                      </div>

                      {/* Card Action Row */}
                      <div className="pt-3 border-t border-brand-beige/60 flex items-center justify-end">
                        <a
                          href={getWhatsAppUrl(`Hello SHAZ Clinic, I would like to book or ask about the "${treatment.name}" (${activeCategoryModal.name}) treatment.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest hover:text-brand-charcoal transition-colors uppercase tracking-wider"
                        >
                          <span>Inquire Service</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Modal Footer Bar */}
                <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-brand-beige flex items-center justify-between shrink-0">
                  <div className="text-xs text-brand-charcoal/70 hidden sm:block">
                    Need personalized advice? Our doctors are ready to assist.
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => setActiveCategoryModal(null)}
                      className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-charcoal border border-brand-beige hover:bg-brand-beige/40 transition-colors w-full sm:w-auto"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------------------------
          GLOBAL FOOTER
      ---------------------------------------------------------------------- */}
      <GlobalFooter initialContent={content} />
    </div>
  );
}
