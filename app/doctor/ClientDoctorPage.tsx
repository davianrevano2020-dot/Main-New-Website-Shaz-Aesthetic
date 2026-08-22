'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Stethoscope,
  Award,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  X,
  MessageCircle,
  Search
} from 'lucide-react';
import Link from 'next/link';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

const WA_DEFAULT = "https://wa.link/o7f5yk";
const WA_PHONE = "628113889999";

interface DoctorItem {
  id: string;
  name: string;
  title: string;
  specialization: string;
  shortIntro: string;
  experience: string;
  biography: string;
  education: string[] | string;
  certifications: string[] | string;
  languages: string[] | string;
  signatureTreatments: string[] | string;
  treatmentPhilosophy: string;
  schedule: string;
  img: string;
  published: boolean;
  order: number;
}

const FALLBACK_DOCTORS: DoctorItem[] = [
  {
    id: "dr-elisabeth-zora",
    name: "Dr. Elisabeth Zora, M.Biomed (AAM)",
    title: "Head Aesthetic Physician & Master Injector",
    specialization: "Facial Harmonization & Structural Injectables",
    shortIntro: "Specializes in high-precision facial balancing, biostimulators, and advanced structural rejuvenation with natural aesthetics.",
    experience: "12+ Years Clinical Experience",
    biography: "Dr. Elisabeth Zora is a premier aesthetic physician with over a decade of clinical excellence in advanced facial aesthetics. Trained internationally in London, Seoul, and Jakarta, she is renowned for her bespoke approach to structural harmony, emphasizing subtle, undetectable rejuvenation that respects individual facial architecture.",
    education: [
      "Faculty of Medicine, Universitas Udayana (Medical Doctor)",
      "Master of Biomedical Science in Anti-Aging Medicine (M.Biomed AAM)",
      "Advanced Fellowship in Non-Surgical Facial Contouring, Seoul, South Korea"
    ],
    certifications: [
      "Indonesian Medical Association (IDI) - Registered Physician",
      "Certified Master Injector - Allergan Medical Institute (AMI)",
      "Fellow of the American Academy of Aesthetic Medicine (AAAM)",
      "Active Member of the Indonesian Society of Aesthetic Doctors (PERDESTI)"
    ],
    languages: ["English (Fluent)", "Indonesian (Native)"],
    signatureTreatments: [
      "Full-Face Structural Rejuvenation",
      "Precision Neuromodulators & Botox",
      "Polynucleotide Biostimulator & Skin Boosters",
      "ExoMind Cellular Rejuvenation"
    ],
    treatmentPhilosophy: "Aesthetic medicine is an art of subtraction and gentle refinement. My commitment is to elevate your innate beauty with complete anatomical precision, ensuring you look revitalized, radiant, and timelessly yourself.",
    schedule: "Monday – Friday: 10:00 – 18:00 WITA | Saturday: 10:00 – 15:00 WITA",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    published: true,
    order: 1
  },
  {
    id: "dr-vrety-widyari",
    name: "Dr. Vrety Widyari, Sp.D.V.E",
    title: "Dermatology & Venereology Specialist",
    specialization: "Clinical Dermatology & Precision Lasers",
    shortIntro: "Expert in complex pigmentation, laser resurfacing, melasma correction, and regenerative skin therapies.",
    experience: "10+ Years Medical Dermatology",
    biography: "Dr. Vrety Widyari is a board-certified dermatologist dedicated to evidence-based skin pathology, laser resurfacing, and pigmentary disorders. With clinical training across top national referral centers, Dr. Vrety tailors multi-modality energy device protocols for challenging skin conditions in tropical climates.",
    education: [
      "Specialist Degree in Dermatology & Venereology (Sp.D.V.E), Universitas Indonesia",
      "Faculty of Medicine, Universitas Airlangga (Medical Doctor)",
      "International Laser Dermatology Preceptorship, Singapore General Hospital"
    ],
    certifications: [
      "Board Certified Specialist - Indonesian Society of Dermatology and Venereology (PERDOSKI)",
      "Certified Laser Specialist - European Academy of Dermatology and Venereology (EADV)",
      "Member of the International Society of Dermatology (ISD)"
    ],
    languages: ["English (Fluent)", "Indonesian (Native)"],
    signatureTreatments: [
      "PicoSure & Q-Switched Precision Laser",
      "Melasma & Hyperpigmentation Protocol",
      "Acne Scar Subcision & Microneedling RF",
      "Deep Cellular Medical Peels"
    ],
    treatmentPhilosophy: "Skin health is the foundation of all aesthetic beauty. By restoring epidermal integrity and targeting deep cellular dysfunctions with precision lasers, we achieve clear, luminous, and resilient skin.",
    schedule: "Tuesday, Thursday & Saturday: 11:00 – 19:00 WITA",
    img: "https://images.unsplash.com/photo-1594824436998-d50d6ff71f92?q=80&w=800&auto=format&fit=crop",
    published: true,
    order: 2
  },
  {
    id: "dr-diah-nareswari",
    name: "Dr. Diah Nareswari, M.Biomed",
    title: "Senior Aesthetic & Skin Rejuvenation Physician",
    specialization: "Cellular Rejuvenation & Preventative Aesthetics",
    shortIntro: "Specializes in bespoke skin revitalizing cocktails, collagen stimulation, and delicate under-eye treatments.",
    experience: "8+ Years Aesthetic Practice",
    biography: "Dr. Diah Nareswari focuses on proactive, regenerative skin therapies that stimulate endogenous collagen and elastin production. Her gentle injection technique and keen eye for skin texture harmonization make her consultations highly sought after for radiant, youthful skin maintenance.",
    education: [
      "Master of Biomedical Science, Anti-Aging & Regenerative Medicine",
      "Faculty of Medicine, Universitas Udayana (Medical Doctor)",
      "Certificate in Clinical Aesthetic Dermatology, Bangkok, Thailand"
    ],
    certifications: [
      "Certified Practitioner - Asia-Pacific Aesthetic Injectables Congress",
      "Indonesian Medical Association (IDI) - Registered Physician",
      "Certified Provider for Collagen Biostimulators (Radiesse & Sculptra)"
    ],
    languages: ["English (Fluent)", "Indonesian (Native)"],
    signatureTreatments: [
      "Signature Glass Skin Protocol",
      "Under-Eye Tear Trough Refresh",
      "Profhilo & Skin Hydration Infusions",
      "Collagen Induction Therapy"
    ],
    treatmentPhilosophy: "Preventative aesthetics allows us to age gracefully while protecting our skin's biological vitality. Every treatment should feel restorative, comfortable, and tailored to your lifestyle.",
    schedule: "Monday, Wednesday & Friday: 10:00 – 18:00 WITA",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    published: true,
    order: 3
  },
  {
    id: "dr-ananda-aprilia",
    name: "Dr. Ananda Aprilia",
    title: "Aesthetic Physician & Body Sculpting Lead",
    specialization: "Non-Invasive Body Contouring & Advanced Lasers",
    shortIntro: "Dedicated to holistic body sculpting, medical laser hair removal, and personalized neck & décolletage rejuvenation.",
    experience: "7+ Years Clinical Aesthetics",
    biography: "Dr. Ananda Aprilia combines medical precision with modern body contouring modalities to sculpt harmonious silhouettes and deliver clinical-grade laser therapies. She prioritizes patient comfort, safety protocols, and personalized follow-up care.",
    education: [
      "Faculty of Medicine, Universitas Padjadjaran (Medical Doctor)",
      "Clinical Certification in Energy-Based Body Sculpting, Singapore",
      "Advanced Training in Medical Aesthetic Lasers"
    ],
    certifications: [
      "Indonesian Medical Association (IDI) - Registered Physician",
      "Certified Medical Laser Safety Officer (MLSO)",
      "Member of the Indonesian Association of Aesthetic Doctors (PERDESTI)"
    ],
    languages: ["English (Fluent)", "Indonesian (Native)"],
    signatureTreatments: [
      "Non-Surgical Body Tightening",
      "Medical Grade Laser Hair Removal",
      "Neck & Décolletage Rejuvenation",
      "Targeted Fat Dissolving & Contouring"
    ],
    treatmentPhilosophy: "Confidence comes from feeling balanced in your own body. We leverage safe, non-invasive technology to contour, tone, and refine with zero downtime and lasting elegance.",
    schedule: "Wednesday – Sunday: 10:00 – 17:00 WITA",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
    published: true,
    order: 4
  }
];

interface ClientDoctorPageProps {
  initialContent?: Record<string, any>;
}

const parseDoctorsFromContent = (data?: Record<string, any>): DoctorItem[] => {
  if (!data?.doctor_page_doctors) return FALLBACK_DOCTORS;
  try {
    const parsed = typeof data.doctor_page_doctors === 'string' 
      ? JSON.parse(data.doctor_page_doctors) 
      : data.doctor_page_doctors;
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.filter((d: any) => d.published !== false);
    }
  } catch (e) {
    console.error('Error parsing doctors:', e);
  }
  return FALLBACK_DOCTORS;
};

export default function ClientDoctorPage({ initialContent = {} }: ClientDoctorPageProps) {
  const [content, setContent] = useState<Record<string, any>>(initialContent);
  const [doctors, setDoctors] = useState<DoctorItem[]>(() => parseDoctorsFromContent(initialContent));
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (!initialContent || Object.keys(initialContent).length === 0) {
      fetch('/api/content')
        .then(res => res.json())
        .then(json => {
          if (json.status === 'success' && json.data) {
            setContent(json.data);
            setDoctors(parseDoctorsFromContent(json.data));
          }
        })
        .catch(() => {});
    }
  }, [initialContent]);

  // Helper to build booking WhatsApp URL
  const getBookingUrl = (doctorName?: string) => {
    if (!doctorName) return content.doctor_cta_button_link || WA_DEFAULT;
    const waNumber = content.global_whatsapp_number || "628113889999";
    const text = `Hello SHAZ Aesthetic Clinic Seminyak, I would like to book a medical consultation with ${doctorName}.`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  };

  // Extract unique specializations for filter tabs
  const specializations = ['All', 'Facial Harmonization', 'Dermatology & Lasers', 'Cellular Rejuvenation', 'Body Contouring'];

  // Filtered doctors
  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(doc.signatureTreatments) && doc.signatureTreatments.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    if (!matchesSearch) return false;

    if (selectedSpecialty === 'All') return true;
    if (selectedSpecialty === 'Facial Harmonization') {
      return doc.specialization.toLowerCase().includes('facial') || doc.specialization.toLowerCase().includes('injectable') || doc.title.toLowerCase().includes('injector');
    }
    if (selectedSpecialty === 'Dermatology & Lasers') {
      return doc.specialization.toLowerCase().includes('dermatology') || doc.specialization.toLowerCase().includes('laser') || doc.title.toLowerCase().includes('dermatology');
    }
    if (selectedSpecialty === 'Cellular Rejuvenation') {
      return doc.specialization.toLowerCase().includes('cellular') || doc.specialization.toLowerCase().includes('rejuvenation') || doc.specialization.toLowerCase().includes('skin');
    }
    if (selectedSpecialty === 'Body Contouring') {
      return doc.specialization.toLowerCase().includes('body') || doc.specialization.toLowerCase().includes('contouring');
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans text-brand-charcoal selection:bg-brand-sage selection:text-white flex flex-col">
      {/* Global Header */}
      <GlobalHeader initialContent={content} />

      <main className="flex-1">
        {/* ----------------------------------------------------------------------
            01. HERO BANNER (Refined Editorial & Architectural Layout - Light Warm Canvas)
        ---------------------------------------------------------------------- */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[#FAF8F5] overflow-hidden border-b border-brand-beige/60">
          {/* Subtle Ambient Background Gradients (Neutral/Warm) */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#EBE7DF]/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#E8ECE5]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand-charcoal/50 mb-6">
              <Link href="/" className="hover:text-brand-forest transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-brand-charcoal/30" />
              <span className="text-brand-forest">Medical Faculty</span>
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
                  <Stethoscope className="w-3.5 h-3.5 text-brand-forest" />
                  <span>{content.doctor_hero_badge || "CERTIFIED MEDICAL EXPERTS"}</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal leading-[1.12] mb-6">
                  {content.doctor_hero_title || "Meet Our Certified Physicians & Dermatologists"}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-brand-charcoal/70 font-light leading-relaxed mb-8 max-w-xl">
                  {content.doctor_hero_subtitle || "Bali's leading aesthetic practitioners combining evidence-based medical science, anatomical mastery, and delicate artistic precision."}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                  <a
                    href={content.doctor_cta_button_link || WA_DEFAULT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#4C5C44] text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-brand-charcoal transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md shadow-[#4C5C44]/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{content.doctor_cta_button_text || "Book Consultation"}</span>
                  </a>
                  <a
                    href="#specialists"
                    className="bg-white border border-brand-beige text-brand-charcoal px-7 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:border-brand-sage hover:bg-brand-beige/40 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Browse Doctors</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Hero Visual with Overlaid Floating Trust Badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="lg:col-span-5 relative"
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-neutral-100 border border-brand-beige/80 shadow-xl shadow-black/5">
                  <img
                    src={content.doctor_hero_image || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop"}
                    alt="SHAZ Aesthetic Clinic Doctors & Specialists"
                    className="w-full h-full object-cover object-top"
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
                          100% Medical Doctors
                        </div>
                        <div className="text-[11px] text-brand-charcoal/60 truncate">
                          Indonesian Medical Association (IDI) Registered
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
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs uppercase tracking-wider text-brand-charcoal">Certified Doctors</div>
                  <div className="text-[11px] text-brand-charcoal/60 leading-snug mt-0.5">Licensed IDI Physicians</div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-brand-beige/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-forest/10 flex items-center justify-center text-brand-forest shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs uppercase tracking-wider text-brand-charcoal">Global Training</div>
                  <div className="text-[11px] text-brand-charcoal/60 leading-snug mt-0.5">Seoul & London Fellowships</div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-brand-beige/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-forest/10 flex items-center justify-center text-brand-forest shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs uppercase tracking-wider text-brand-charcoal">Natural Harmony</div>
                  <div className="text-[11px] text-brand-charcoal/60 leading-snug mt-0.5">Facial Architecture</div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-brand-beige/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-forest/10 flex items-center justify-center text-brand-forest shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs uppercase tracking-wider text-brand-charcoal">1-on-1 Consultation</div>
                  <div className="text-[11px] text-brand-charcoal/60 leading-snug mt-0.5">Personalized Diagnostics</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            02. DOCTOR LISTING & FILTER BAR (Responsive Cards, No Overlapping)
        ---------------------------------------------------------------------- */}
        <section id="specialists" className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-12 scroll-mt-24">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="text-brand-forest font-bold tracking-[0.2em] text-xs uppercase mb-2 block">
              OUR SPECIALISTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal leading-tight mb-4">
              Select Your Aesthetic Physician & Specialist
            </h2>
            <p className="text-sm sm:text-base text-brand-charcoal/70 font-light max-w-2xl mx-auto">
              Consult your skin conditions, facial aesthetics, or body contouring with our certified medical team in Seminyak, Bali.
            </p>
          </div>

          {/* Controls Bar: Filters & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-brand-beige">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
              {specializations.map(spec => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                    selectedSpecialty === spec
                      ? 'bg-brand-forest text-white shadow-sm'
                      : 'bg-white text-brand-charcoal/70 border border-brand-beige hover:border-brand-sage hover:text-brand-charcoal'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-charcoal/40" />
              <input
                type="text"
                placeholder="Search doctor or treatment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-white border border-brand-beige rounded-full text-xs placeholder:text-brand-charcoal/40 focus:outline-none focus:border-brand-forest focus:ring-1 focus:ring-brand-forest transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/40 hover:text-brand-charcoal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Doctors Grid - Anti-Stacking Tablet/Mobile Optimized Card Layout */}
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-brand-beige p-8">
              <Stethoscope className="w-12 h-12 text-brand-forest/30 mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-brand-charcoal mb-2">No Specialists Found</h3>
              <p className="text-sm text-brand-charcoal/60 max-w-md mx-auto mb-6">
                Try adjusting your search terms or select another specialty filter.
              </p>
              <button
                onClick={() => { setSelectedSpecialty('All'); setSearchQuery(''); }}
                className="px-6 py-2.5 bg-brand-forest text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-charcoal transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredDoctors.map((doctor, index) => {
                const treatments = Array.isArray(doctor.signatureTreatments)
                  ? doctor.signatureTreatments
                  : (doctor.signatureTreatments ? doctor.signatureTreatments.split(',') : []);

                return (
                  <motion.div
                    key={doctor.id || index}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-beige shadow-sm hover:shadow-lg hover:border-brand-sage/40 transition-all duration-300 flex flex-col justify-between h-full group"
                  >
                    {/* Top Section: Photo & Header Badges */}
                    <div>
                      {/* Photo Container */}
                      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-neutral-100 mb-5">
                        <img
                          src={doctor.img}
                          alt={doctor.name}
                          className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                        {/* Top Left: Certified Doctor Stamp */}
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-forest shadow-sm flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-forest" />
                          <span>Certified Doctor</span>
                        </div>

                        {/* Bottom Right: Experience Badge */}
                        {doctor.experience && (
                          <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide">
                            {doctor.experience}
                          </div>
                        )}
                      </div>

                      {/* Doctor Credentials & Description */}
                      <div className="space-y-3">
                        {/* Specialization Kicker */}
                        <span className="text-[11px] font-bold tracking-[0.15em] text-brand-sage uppercase block">
                          {doctor.specialization || "Aesthetic & Medical Specialist"}
                        </span>

                        {/* Doctor Name */}
                        <h3 className="font-serif text-xl sm:text-2xl text-brand-charcoal leading-snug group-hover:text-brand-forest transition-colors">
                          {doctor.name}
                        </h3>

                        {/* Clinical Title */}
                        {doctor.title && (
                          <p className="text-xs font-semibold text-brand-forest/90">
                            {doctor.title}
                          </p>
                        )}

                        {/* Short Intro */}
                        <p className="text-brand-charcoal/70 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                          {doctor.shortIntro || doctor.biography}
                        </p>

                        {/* Focus Treatments */}
                        {treatments.length > 0 && (
                          <div className="pt-2">
                            <div className="text-[10px] font-bold tracking-widest text-brand-charcoal/50 uppercase mb-2">
                              Focus Treatments:
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {treatments.slice(0, 3).map((tr, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="bg-[#F4F1EC] text-brand-charcoal/80 text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-lg"
                                >
                                  {tr.trim()}
                                </span>
                              ))}
                              {treatments.length > 3 && (
                                <span className="text-[10px] font-bold text-brand-forest self-center px-1">
                                  +{treatments.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Consultation Schedule */}
                        {doctor.schedule && (
                          <div className="text-[11px] text-brand-charcoal/60 flex items-start gap-1.5 pt-3 pb-1 border-t border-brand-beige/60">
                            <span className="font-semibold text-brand-forest shrink-0">Schedule:</span>
                            <span className="leading-snug">{doctor.schedule}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action: WhatsApp Consultation Booking (No View Profile button) */}
                    <div className="pt-5 mt-4 border-t border-brand-beige/40">
                      <a
                        href={getBookingUrl(doctor.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#4C5C44] text-white text-center py-3.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-charcoal transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Book with This Doctor</span>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* ----------------------------------------------------------------------
            03. CLINICAL EXCELLENCE & TRUST SECTION
        ---------------------------------------------------------------------- */}
        <section className="py-24 bg-[#ECE8E1] border-y border-brand-beige/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-16">
              <span className="text-brand-forest font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
                {content.doctor_trust_badge || "THE SHAZ CLINICAL STANDARD"}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-charcoal leading-tight mb-6">
                {content.doctor_trust_title || "Where Medical Integrity Meets Refined Artistry"}
              </h2>
              <p className="text-brand-charcoal/70 text-base md:text-lg font-light leading-relaxed">
                {content.doctor_trust_description || "Every injector, laser therapist, and clinical consultant at SHAZ is a certified medical doctor with extensive accredited training in facial anatomy, dermatological pharmacology, and non-surgical rejuvenation."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-3xl p-8 border border-brand-beige shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-brand-forest/10 flex items-center justify-center text-brand-forest mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-brand-charcoal mb-3">100% Certified Doctors</h4>
                <p className="text-brand-charcoal/70 text-sm leading-relaxed">
                  All treatments and injectables are exclusively carried out by licensed medical doctors—never delegated to unlicensed practitioners.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-brand-beige shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-brand-forest/10 flex items-center justify-center text-brand-forest mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-brand-charcoal mb-3">Continuous Education</h4>
                <p className="text-brand-charcoal/70 text-sm leading-relaxed">
                  Our doctors routinely participate in international masterclasses across London, Seoul, and Monaco to master modern techniques.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-brand-beige shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-brand-forest/10 flex items-center justify-center text-brand-forest mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-brand-charcoal mb-3">Anatomical Harmony</h4>
                <p className="text-brand-charcoal/70 text-sm leading-relaxed">
                  We prioritize natural proportions over exaggerated trends, enhancing your innate structure with understated elegance.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-brand-beige shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-brand-forest/10 flex items-center justify-center text-brand-forest mb-6">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-brand-charcoal mb-3">Holistic Follow-Up</h4>
                <p className="text-brand-charcoal/70 text-sm leading-relaxed">
                  From initial 3D skin analysis to post-procedure check-ins, our clinical team monitors your healing and progress at every step.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            04. PRE-FOOTER CTA BANNER (SCHEDULE CONSULTATION)
        ---------------------------------------------------------------------- */}
        <section className="py-24 bg-brand-forest text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-brand-beige text-xs font-bold tracking-[0.2em] uppercase mb-6">
              {content.doctor_cta_badge || "PERSONALIZED MEDICAL CONSULTATION"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              {content.doctor_cta_title || "Begin Your Treatment with a Dedicated Doctor"}
            </h2>
            <p className="text-brand-beige/80 text-base md:text-lg font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              {content.doctor_cta_subtitle || "Schedule a comprehensive 1-on-1 skin diagnostic with our aesthetic physicians in Seminyak, or connect with our clinical concierge."}
            </p>
            <a
              href={content.doctor_cta_button_link || WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-brand-forest font-bold tracking-widest text-xs uppercase px-10 py-4 rounded-full hover:bg-brand-beige transition-colors shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{content.doctor_cta_button_text || "Book Consultation with Our Doctors"}</span>
            </a>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <GlobalFooter initialContent={content} />
    </div>
  );
}
