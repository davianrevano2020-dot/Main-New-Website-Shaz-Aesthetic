'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Clock, 
  Layers,
  Gift,
  PiggyBank,
  Plus
} from 'lucide-react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

const WA_DEFAULT = "https://wa.link/o7f5yk";

// ----------------------------------------------------------------------
// Package Data Schema 
// ----------------------------------------------------------------------
export interface PackageItem {
  name: string;
  desc: string;
  duration?: string;
  keyBenefits?: string[];
  treatmentsIncluded?: string[];
  price?: string;
  savings?: string;
  tag?: string;
}

export interface PackageCategory {
  id: string;
  slug: string;
  name: string;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  img: string;
  packagesCount: string;
  whatsappMessage: string;
  packages: PackageItem[];
}

export const DEFAULT_PACKAGE_CATEGORIES: PackageCategory[] = [
  {
    id: 'featured-packages',
    slug: 'featured-packages',
    name: 'Featured Packages',
    badge: 'Curated Selections',
    shortDesc: 'Our most popular and highly requested treatment combinations for ultimate transformation.',
    fullDesc: 'Experience the ultimate synergy of SHAZ Clinic\'s best-performing treatments. These featured packages are designed by our medical experts to deliver profound, multi-dimensional results at an exceptional value.',
    img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000&auto=format&fit=crop',
    packagesCount: '3 Curated Packages',
    whatsappMessage: 'Hello SHAZ Clinic, I would like to inquire about the Featured Packages.',
    packages: [
      {
        name: 'The Ultimate SHAZ Glow',
        desc: 'A comprehensive full-face rejuvenation combining deep hydration, collagen stimulation, and brightening.',
        duration: '120 Mins',
        keyBenefits: ['Immediate glass-skin effect', 'Deep cellular hydration', 'Refined pores and texture'],
        treatmentsIncluded: ['Signature Glass Skin Facial', 'LED Light Therapy', 'Antioxidant Infusion'],
        price: 'Rp 2.500.000',
        savings: 'Save Rp 500.000',
        tag: 'Best Seller'
      },
      {
        name: 'Red Carpet Ready',
        desc: 'Instant lifting and contouring perfect for special events with zero downtime.',
        duration: '90 Mins',
        keyBenefits: ['V-shape contouring', 'Tightens skin instantly', 'Reduces puffiness'],
        treatmentsIncluded: ['RF Skin Tightening', 'Lymphatic Drainage Massage', 'Peptide Mask'],
        price: 'Rp 1.800.000',
        savings: 'Save Rp 400.000',
        tag: 'Event Prep'
      }
    ]
  },
  {
    id: 'skin-packages',
    slug: 'skin-packages',
    name: 'Skin Packages',
    badge: 'Complexion Perfection',
    shortDesc: 'Targeted bundles designed to address pigmentation, dullness, and skin texture issues.',
    fullDesc: 'Transform your complexion with our specialized skin packages. Combining advanced peeling, laser technology, and deep nourishment to achieve flawless, luminous skin.',
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000&auto=format&fit=crop',
    packagesCount: '4 Specialized Packages',
    whatsappMessage: 'Hello SHAZ Clinic, I would like to inquire about the Skin Packages.',
    packages: [
      {
        name: 'Pigmentation Eraser Program',
        desc: 'A strategic approach to fading dark spots, melasma, and sun damage for an even skin tone.',
        duration: '90 Mins / Session',
        keyBenefits: ['Lightens hyperpigmentation', 'Evens out skin tone', 'Prevents future dark spots'],
        treatmentsIncluded: ['Pico Laser Toning', 'Brightening Chemical Peel', 'Vitamin C Infusion'],
        price: 'Rp 4.000.000 (3 Sessions)',
        savings: 'Save 15%',
        tag: 'Highly Effective'
      },
      {
        name: 'Pore Refining Protocol',
        desc: 'A multi-step approach to clearing congestion and minimizing the appearance of enlarged pores.',
        duration: '75 Mins / Session',
        keyBenefits: ['Smoother skin texture', 'Reduced sebum production', 'Clearer pores'],
        treatmentsIncluded: ['Microdermabrasion', 'Carbon Laser Peel', 'Hydrating Serum'],
        price: 'Rp 3.500.000 (3 Sessions)',
        savings: 'Save Rp 500.000'
      }
    ]
  },
  {
    id: 'anti-aging-packages',
    slug: 'anti-aging-packages',
    name: 'Anti Aging Packages',
    badge: 'Youthful Rejuvenation',
    shortDesc: 'Comprehensive protocols to lift, firm, and smooth away fine lines and wrinkles.',
    fullDesc: 'Turn back time with our intensive anti-aging bundles. By combining injectables and advanced energy-based devices, we restore lost volume and stimulate natural collagen production.',
    img: 'https://images.unsplash.com/photo-1598440947619-2ce6fb69771e?q=80&w=1000&auto=format&fit=crop',
    packagesCount: '3 Lifting Packages',
    whatsappMessage: 'Hello SHAZ Clinic, I would like to inquire about the Anti Aging Packages.',
    packages: [
      {
        name: 'Non-Surgical Facelift Bundle',
        desc: 'A powerful combination of skin tightening and volume restoration without the downtime of surgery.',
        duration: '150 Mins',
        keyBenefits: ['Immediate lifting effect', 'Restores facial contours', 'Reduces deep wrinkles'],
        treatmentsIncluded: ['HIFU Full Face & Neck', 'Dermal Fillers (2cc)', 'Botox (20 Units)'],
        price: 'Rp 12.500.000',
        savings: 'Save Rp 2.000.000',
        tag: 'Premium'
      },
      {
        name: 'Collagen Boost Trio',
        desc: 'Stimulate your skin\'s natural collagen production for long-term firmness and elasticity.',
        duration: '60 Mins / Session',
        keyBenefits: ['Improves skin density', 'Softens fine lines', 'Long-lasting firmness'],
        treatmentsIncluded: ['Microneedling RF', 'Exosome Therapy', 'LED Red Light'],
        price: 'Rp 6.500.000 (3 Sessions)',
        savings: 'Save 20%'
      }
    ]
  },
  {
    id: 'acne-packages',
    slug: 'acne-packages',
    name: 'Acne Packages',
    badge: 'Clear Skin Protocols',
    shortDesc: 'Step-by-step clearing protocols for active breakouts, congestion, and acne scarring.',
    fullDesc: 'Regain control of your skin with our dedicated acne packages. We target the root causes of acne, reduce inflammation, and minimize post-acne marks for a consistently clear complexion.',
    img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop',
    packagesCount: '2 Clearing Packages',
    whatsappMessage: 'Hello SHAZ Clinic, I would like to inquire about the Acne Packages.',
    packages: [
      {
        name: 'Acne Control & Recovery',
        desc: 'An intensive monthly program designed to stop active breakouts and heal the skin barrier.',
        duration: '60 Mins / Session',
        keyBenefits: ['Reduces active inflammation', 'Unclogs congested pores', 'Fades red acne marks'],
        treatmentsIncluded: ['Salicylic Acid Peel', 'Extraction & Purifying Mask', 'Blue LED Therapy'],
        price: 'Rp 2.800.000 (4 Sessions)',
        savings: 'Save Rp 600.000'
      },
      {
        name: 'Acne Scar Revision',
        desc: 'Advanced resurfacing treatments to smooth out depressed scars and improve overall texture.',
        duration: '90 Mins / Session',
        keyBenefits: ['Flattens acne scars', 'Stimulates skin regeneration', 'Improves skin tone'],
        treatmentsIncluded: ['Fractional CO2 Laser', 'PRP Injection', 'Soothing Bio-Cellulose Mask'],
        price: 'Rp 5.500.000 (3 Sessions)',
        savings: 'Save Rp 1.000.000',
        tag: 'Dermatologist Choice'
      }
    ]
  },
  {
    id: 'bridal-packages',
    slug: 'bridal-packages',
    name: 'Bridal Packages',
    badge: 'Wedding Day Prep',
    shortDesc: 'The ultimate countdown-to-I-Do beauty regimens for a flawless wedding day glow.',
    fullDesc: 'Prepare for your special day with our comprehensive bridal packages. Scheduled perfectly leading up to your wedding, these bundles ensure you walk down the aisle looking radiant, refreshed, and picture-perfect.',
    img: 'https://images.unsplash.com/photo-1583939000140-5e8ed046be94?q=80&w=1000&auto=format&fit=crop',
    packagesCount: '3 Bridal Timelines',
    whatsappMessage: 'Hello SHAZ Clinic, I would like to inquire about the Bridal Packages.',
    packages: [
      {
        name: '3-Month Bridal Glow-Up',
        desc: 'A complete transformation journey to ensure absolute perfection on your wedding day.',
        duration: 'Multiple Visits',
        keyBenefits: ['Flawless makeup application base', 'Radiant full-body skin', 'Stress-relieving care'],
        treatmentsIncluded: ['3x Laser Rejuvenation', '2x Glass Skin Facial', '1x Botox Touch-up'],
        price: 'Rp 9.500.000',
        savings: 'Save 20%',
        tag: 'Most Popular'
      },
      {
        name: 'Last Minute Rescue (1 Month)',
        desc: 'An intensive, no-downtime regimen for brides needing a quick radiance boost before the big day.',
        duration: 'Multiple Visits',
        keyBenefits: ['Instant luminous glow', 'Reduces fatigue signs', 'Hydrates deeply'],
        treatmentsIncluded: ['1x Signature Facial', '1x OxyGeneo Therapy', '1x Vitamin Infusion IV'],
        price: 'Rp 3.500.000',
        savings: 'Save Rp 500.000'
      }
    ]
  },
  {
    id: 'membership-packages',
    slug: 'membership-packages',
    name: 'Membership Packages',
    badge: 'Ongoing Maintenance',
    shortDesc: 'Exclusive monthly maintenance plans with VIP perks and consistent savings.',
    fullDesc: 'Commit to your long-term skin health with SHAZ Memberships. Enjoy monthly essential treatments, exclusive discounts on premium protocols, and priority booking privileges.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop',
    packagesCount: '2 VIP Tiers',
    whatsappMessage: 'Hello SHAZ Clinic, I would like to inquire about the Membership Packages.',
    packages: [
      {
        name: 'SHAZ Signature VIP Membership',
        desc: 'Your monthly passport to glowing skin and exclusive clinic-wide benefits.',
        duration: 'Monthly Access',
        keyBenefits: ['1x Signature Facial per month', '10% off all Laser Treatments', 'Priority weekend booking'],
        treatmentsIncluded: ['Monthly Choice of Facial', 'Free Skin Analysis', 'Birthday Perks'],
        price: 'Rp 1.500.000 / Month',
        savings: 'Over Rp 800.000 monthly value',
        tag: 'VIP'
      },
      {
        name: 'SHAZ Elite Injectables Club',
        desc: 'For our regular anti-aging clients, offering unmatched savings on neurotoxins and fillers.',
        duration: 'Annual Access',
        keyBenefits: ['Special pricing on Botox/Fillers', 'Free consultation anytime', '2x Free Maintenance Facials'],
        treatmentsIncluded: ['Discounted Injectables', 'Premium Aftercare Products', 'VIP Support Line'],
        price: 'Rp 5.000.000 / Year',
        savings: 'Exclusive member-only rates',
        tag: 'Elite'
      }
    ]
  }
];

export default function ClientPackagesPage({ initialContent }: { initialContent: any }) {
  const [activeCategoryModal, setActiveCategoryModal] = useState<PackageCategory | null>(null);

  // Initialize state directly from props to avoid useEffect syncing
  const [categories, setCategories] = useState<PackageCategory[]>(() => {
    if (initialContent?.package_categories) {
      try {
        const parsed = JSON.parse(initialContent.package_categories);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing package_categories', e);
      }
    }
    return DEFAULT_PACKAGE_CATEGORIES;
  });



  // Prevent body scroll when modal is open
  useEffect(() => {
    if (activeCategoryModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeCategoryModal]);

  const getWhatsAppUrl = (customMessage: string) => {
    const encodedMessage = encodeURIComponent(customMessage);
    return `https://wa.me/6281234567890?text=${encodedMessage}`;
  };

  return (
    <div className="min-h-screen bg-brand-white font-sans text-brand-charcoal selection:bg-brand-beige selection:text-brand-charcoal flex flex-col">
      {/* We pass initialContent to GlobalHeader if needed, just like in ClientTreatmentPage */}
      <GlobalHeader initialContent={initialContent} />

      <main className="flex-1">
        {/* ----------------------------------------------------------------------
            01. PREMIUM HERO SECTION
        ---------------------------------------------------------------------- */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#FAF8F5]">
          <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply">
            <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-bl from-brand-beige/60 to-transparent blur-3xl" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-brand-sage/40 to-transparent blur-3xl" />
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-charcoal/10 bg-brand-charcoal/5 mb-6">
                  <Sparkles className="w-4 h-4 text-brand-forest" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-charcoal">
                    EXCLUSIVE BUNDLES
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-brand-charcoal font-normal leading-[1.1] mb-6">
                  Curated Packages for<br />
                  <span className="italic text-brand-forest">Optimal Results</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <p className="text-base md:text-lg text-brand-charcoal/70 font-light max-w-2xl mx-auto leading-relaxed mb-10">
                  Discover our thoughtfully designed treatment combinations that deliver synergistic benefits, comprehensive care, and exceptional value for your beauty journey.
                </p>
                
                <a
                  href={getWhatsAppUrl("Hello SHAZ Clinic, I would like to consult about which package is best for me.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-brand-charcoal text-white rounded-full text-xs font-bold uppercase tracking-[0.15em] hover:bg-brand-forest transition-colors"
                >
                  <span>Consult Package</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            02. PACKAGE CATEGORIES GRID
        ---------------------------------------------------------------------- */}
        <section className="py-20 md:py-32 bg-white relative">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-brand-charcoal mb-6">
                Explore Our Packages
              </h2>
              <p className="text-brand-charcoal/70 font-light leading-relaxed md:text-lg">
                Select a category below to discover the perfect combination of treatments tailored to your specific skin and beauty goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer flex flex-col h-full bg-[#FAF8F5] rounded-3xl overflow-hidden border border-brand-beige hover:border-brand-sage/60 hover:shadow-lg transition-all duration-500"
                  onClick={() => setActiveCategoryModal(category)}
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={category.img}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    
                    <div className="absolute bottom-4 left-5">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/30">
                        {category.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 className="font-serif text-2xl text-brand-charcoal mb-3 group-hover:text-brand-forest transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-brand-charcoal/70 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 mb-6 flex-1">
                      {category.shortDesc}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-brand-beige/80">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-forest flex items-center gap-1.5">
                        <Layers className="w-4 h-4" />
                        {category.packagesCount}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-brand-beige flex items-center justify-center group-hover:bg-brand-forest group-hover:border-brand-forest group-hover:text-white transition-all text-brand-charcoal/50">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------------
          03. INTERACTIVE PACKAGE DETAIL MODAL (Two-Column Layout)
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
              className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-brand-beige overflow-y-auto md:overflow-hidden z-10 max-h-[92vh] sm:h-[86vh] flex flex-col md:flex-row"
            >
              {/* Left Column (Desktop Visual & Context Panel / Mobile Header) */}
              <div className="md:w-5/12 lg:w-4/12 bg-[#FAF8F5] border-b md:border-b-0 md:border-r border-brand-beige/80 flex flex-col shrink-0 md:overflow-y-auto">
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
                      <span>{activeCategoryModal.packagesCount}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-brand-charcoal/80 font-light leading-relaxed">
                      {activeCategoryModal.fullDesc}
                    </p>
                  </div>

                  {/* Medical Trust Box & Primary WhatsApp CTA */}
                  <div className="pt-2 space-y-3 border-t border-brand-beige/60">
                    <div className="flex items-center gap-2 text-xs text-brand-charcoal/70">
                      <Gift className="w-4 h-4 text-brand-forest shrink-0" />
                      <span>Exceptional value and bundled pricing</span>
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

              {/* Right Column (Spacious Scrollable Packages List) */}
              <div className="md:w-7/12 lg:w-8/12 flex-1 flex flex-col bg-white md:overflow-hidden">
                {/* Header Bar */}
                <div className="px-6 py-4 border-b border-brand-beige flex items-center justify-between bg-white shrink-0">
                  <div>
                    <h4 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
                      Available Packages
                    </h4>
                    <p className="text-xs text-brand-charcoal/60 mt-0.5">
                      Select any package to learn more or book your session
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
                <div className="flex-1 md:overflow-y-auto p-5 sm:p-7 space-y-4 sm:space-y-5 bg-white">
                  {activeCategoryModal.packages.map((pkg, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#FAF8F5] border border-brand-beige hover:border-brand-sage/60 hover:shadow-sm transition-all duration-200"
                    >
                      {/* Title & Meta Row */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h5 className="font-serif text-lg sm:text-xl text-brand-charcoal font-medium">
                            {pkg.name}
                          </h5>
                          {pkg.tag && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-forest/10 text-brand-forest px-2.5 py-0.5 rounded-full">
                              {pkg.tag}
                            </span>
                          )}
                        </div>

                        {pkg.duration && (
                          <div className="inline-flex items-center gap-1.5 text-xs text-brand-charcoal/70 bg-white px-2.5 py-1 rounded-full border border-brand-beige shrink-0 self-start">
                            <Clock className="w-3.5 h-3.5 text-brand-forest" />
                            <span className="font-medium">{pkg.duration}</span>
                          </div>
                        )}
                      </div>

                      {/* Clear Description Text */}
                      <p className="text-xs sm:text-[15px] text-brand-charcoal/80 font-normal leading-relaxed mb-4">
                        {pkg.desc}
                      </p>

                      {/* Detailed Information Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 mb-4 mt-2 border-t border-brand-beige/60 pt-4">
                        
                        {/* Benefits */}
                        {pkg.keyBenefits && pkg.keyBenefits.length > 0 && (
                          <div className="sm:col-span-2">
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-2">Benefits</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {pkg.keyBenefits.map((benefit, bIdx) => (
                                <span key={bIdx} className="inline-flex items-start gap-1.5 text-xs text-brand-charcoal/80">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-forest shrink-0 mt-0.5" />
                                  <span>{benefit}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Treatments Included */}
                        {pkg.treatmentsIncluded && pkg.treatmentsIncluded.length > 0 && (
                          <div className="sm:col-span-2 mt-2">
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-2">Treatments Included</span>
                            <div className="flex flex-wrap items-center gap-2">
                              {pkg.treatmentsIncluded.map((treatmentItem, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-charcoal bg-white px-3 py-1.5 rounded-lg border border-brand-beige"
                                >
                                  <Plus className="w-3 h-3 text-brand-charcoal/40" />
                                  <span>{treatmentItem}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Price & Savings */}
                        <div className="bg-white p-3 rounded-xl border border-brand-beige sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                          <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-0.5">Price</span>
                            <span className="text-sm font-bold text-brand-forest">{pkg.price || 'Consult for pricing'}</span>
                          </div>
                          
                          {pkg.savings && (
                            <div className="flex items-center gap-1.5 bg-brand-forest/10 px-3 py-1.5 rounded-lg text-brand-forest">
                              <PiggyBank className="w-4 h-4" />
                              <span className="text-xs font-bold uppercase tracking-wider">{pkg.savings}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Action Row */}
                      <div className="pt-4 flex items-center justify-end">
                        <a
                          href={getWhatsAppUrl(`Hello SHAZ Clinic, I would like to book or ask about the "${pkg.name}" (${activeCategoryModal.name}).`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-charcoal transition-all shadow-sm"
                        >
                          <span>Book Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Modal Footer Bar */}
                <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-brand-beige flex items-center justify-between shrink-0">
                  <div className="text-xs text-brand-charcoal/70 hidden sm:block">
                    Want to customize a package? Ask our consultants.
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

      <GlobalFooter />
    </div>
  );
}
