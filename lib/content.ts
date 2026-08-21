import fs from 'fs';
import path from 'path';
import { getPrismaClient } from '../prisma';

const dataFilePath = path.join(process.cwd(), 'data', 'content.json');

export function getFallbackData(): Record<string, any> {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error reading fallback data:", err);
  }
  return {
    hero_image: "https://img.shazaestheticbali.com/header-background-banner.jpg",
    hero_title: "Beauty, Refined by Medical Expertise",
    hero_subtitle: "PREMIUM AESTHETIC CLINIC IN SEMINYAK",
    hero_button1_text: "Book Consultation",
    hero_button1_link: "https://wa.link/o7f5yk",
    hero_button2_text: "Discover SHAZ",
    hero_button2_link: "#about",
    about_title: "WHERE SCIENCE MEETS ARTISTRY",
    about_description: "We believe that true beauty begins with confidence and health. At SHAZ, we combine medical innovation with luxury aesthetics to deliver transformative yet natural-looking results.",
    experience_kicker: "The Experience",
    experience_title: "A Sanctuary for Your Transformation.",
    experience_description: "From the moment you step through our doors, you are enveloped in an environment designed entirely for your comfort and peace of mind. We seamlessly merge clinical excellence with sensory luxury, ensuring every visit feels like a retreat.",
    experience_button_text: "Explore Our Clinics",
    experience_button_link: "#locations",
    experience_image1: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    experience_image2: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop",
    experience_image3: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop",
    experience_image4: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
    // About Page defaults
    about_hero_badge: "ABOUT SHAZ CLINIC & SALON",
    about_hero_title: "Where Medical Science Meets Luxury Artistry",
    about_hero_subtitle: "Bali's premier destination for advanced medical aesthetics, bespoke dermatological treatments, and luxury salon experiences.",
    about_hero_image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop",
    about_story_badge: "OUR STORY & PHILOSOPHY",
    about_story_title: "Redefining Aesthetic Wellness in Seminyak",
    about_story_p1: "At SHAZ, we believe that true beauty begins with health, balance, and confidence. Founded by medical aesthetic physicians with a vision for uncompromising quality, our clinic merges evidence-based dermatology with refined, sensory indulgence.",
    about_story_p2: "Every treatment protocol is tailored to your unique anatomical harmony. We never adopt a one-size-fits-all approach—instead, our certified doctors utilize precision diagnostics and world-class technology to achieve subtle, natural, and timeless results.",
    about_story_image1: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    about_story_image2: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop",
    about_values_badge: "OUR CORE VALUES",
    about_values_title: "The 4 Pillars of the SHAZ Standard",
    about_team_badge: "MEDICAL EXPERTISE",
    about_team_title: "Meet Our Certified Physicians & Specialists",
    about_team_subtitle: "Passionate doctors dedicated to clinical excellence, evidence-based dermatology, and personalized care.",
    about_facility_badge: "OUR SANCTUARY",
    about_facility_title: "Designed for Tranquility and Clinical Precision",
    about_facility_description: "Step into our serene, air-conditioned private suites equipped with cutting-edge aesthetic devices, ergonomic treatment beds, and calming aromatherapeutic touches.",
    about_facility_image1: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop",
    about_facility_image2: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop",
    about_facility_image3: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000&auto=format&fit=crop",
    about_cta_badge: "EXPERIENCE SHAZ",
    about_cta_title: "Ready to Begin Your Aesthetic Journey?",
    about_cta_subtitle: "Book a comprehensive consultation with our medical doctors in Seminyak, Bali or chat directly with our client care team.",
    about_cta_button_text: "Book Consultation via WhatsApp",
    about_cta_button_link: "https://wa.link/o7f5yk",

    // Doctor Page Defaults
    doctor_hero_badge: "CERTIFIED MEDICAL EXPERTS",
    doctor_hero_title: "Meet Our Certified Physicians & Dermatologists",
    doctor_hero_subtitle: "Bali's leading aesthetic practitioners combining evidence-based medical science, anatomical mastery, and delicate artistic precision.",
    doctor_hero_image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop",
    doctor_trust_badge: "THE SHAZ CLINICAL STANDARD",
    doctor_trust_title: "Where Medical Integrity Meets Refined Artistry",
    doctor_trust_description: "Every injector, laser therapist, and clinical consultant at SHAZ is a certified medical doctor with extensive accredited training in facial anatomy, dermatological pharmacology, and non-surgical rejuvenation.",
    doctor_cta_badge: "PERSONALIZED MEDICAL CONSULTATION",
    doctor_cta_title: "Begin Your Treatment with a Dedicated Doctor",
    doctor_cta_subtitle: "Schedule a comprehensive 1-on-1 skin diagnostic with our aesthetic physicians in Seminyak, or connect with our clinical concierge.",
    doctor_cta_button_text: "Book Consultation with Our Doctors",
    doctor_cta_button_link: "https://wa.link/o7f5yk",
    doctor_page_doctors: JSON.stringify([
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
    ])
  };
}

export async function getSiteContent(): Promise<Record<string, any>> {
  const fallback = getFallbackData();
  try {
    const prisma = getPrismaClient();
    const fetchPromise = prisma.siteContent.findMany();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Database connection timeout (1500ms)")), 1500);
    });
    
    const contents = await Promise.race([fetchPromise, timeoutPromise]) as any[];
    if (Array.isArray(contents) && contents.length > 0) {
      const contentMap = contents.reduce((acc: any, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
      return { ...fallback, ...contentMap };
    }
    return fallback;
  } catch (error) {
    return fallback;
  }
}
