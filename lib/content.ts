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
    about_cta_button_link: "https://wa.link/o7f5yk"
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
