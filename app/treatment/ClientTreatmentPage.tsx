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
    name: 'Skin & Facial',
    badge: 'Medical Skin Health',
    shortDesc: `Advanced medical facials, deep pore detox, exosome cellular infusions, and bespoke hydration therapies for clear, glowing, and resilient skin.`,
    fullDesc: `Our medical-grade facials combine deep extraction, advanced peptide infusions, and exosome cellular therapies tailored to your skin barrier, acne profile, and hydration needs in tropical climates.`,
    img: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1000&auto=format&fit=crop',
    treatmentsCount: '24 Treatments',
    whatsappMessage: `Hello SHAZ Clinic, I would like to inquire and book a consultation for Facial treatments.`,
    featuredTreatments: [
      {
        name: `Glass & Glow Therapy (Skin Boost)`,
        desc: `Skin Boost Therapy delivers a powerful surge of hydration, deeply nourishing the skin to enhance its texture and overall quality. Stimulates collagen and elastin production for long-term improvements in texture, tone, and resilience.`,
        duration: `45 Mins`,
        tag: `Most Popular`,
        suitableFor: `Dull, dehydrated skin lacking elasticity`,
        procedure: `Consultation, cleansing, hydration-boosting injectable/serum application, soothing mask`,
        downtime: `Minimal downtime, slight redness possible`,
        expectedResults: `Hydrated, radiant skin with improved elasticity over following weeks`,
        price: `on consultation`,
        keyBenefits: [`Deep hydration`, `Collagen stimulation`, `Improved elasticity`, `Reduced fine lines`],
      },
      {
        name: `Age Reverse Therapy`,
        desc: `A premier treatment designed to reduce the appearance of fine lines and wrinkles by relaxing targeted facial muscles, softening expression lines and rejuvenating the skin's overall look.`,
        duration: `30 Mins`,
        suitableFor: `Fine lines, wrinkles, expression lines`,
        procedure: `Consultation, targeted muscle-relaxing injections`,
        downtime: `Minimal downtime, possible mild swelling`,
        expectedResults: `Smoother, more youthful complexion within days`,
        price: `on consultation`,
        keyBenefits: [`Softened expression lines`, `Natural-looking results`, `Non-surgical`],
      },
      {
        name: `Deep Focus Intensif Face`,
        desc: `An advanced treatment with RF microneedling technology designed to target and smooth deep lines and wrinkles. Infused with DNA and Hyaluronic Acid (HA) to promote skin repair, hydration, and relax facial muscles for expression lines.`,
        duration: `60 Mins`,
        suitableFor: `Deep wrinkles, expression lines, scars`,
        procedure: `Numbing, RF microneedling pass, DNA/HA infusion`,
        downtime: `1-2 days mild redness`,
        expectedResults: `Long-lasting facial rejuvenation, smoother contours`,
        price: `Rp 4.500.000`,
        keyBenefits: [`RF microneedling`, `Deep hydration`, `Facial contouring`],
      },
      {
        name: `Deep Focus Fractional Acne`,
        desc: `Uses EndyMed's RF microneedling technology to effectively target and treat acne and acne scars, stimulating collagen production and promoting faster healing.`,
        duration: `45 Mins`,
        suitableFor: `Active acne and acne scars`,
        procedure: `Cleansing, numbing, RF microneedling`,
        downtime: `1-3 days redness/peeling`,
        expectedResults: `Reduced breakouts, improved texture, minimized scarring`,
        price: `Rp 3.000.000 / Rp 6.500.000 (Set of 3)`,
        keyBenefits: [`Collagen stimulation`, `Scar reduction`, `Faster healing`],
      },
      {
        name: `Acne Injection`,
        desc: `A quick and effective way to reduce inflammation and speed up the healing process of stubborn breakouts, delivering immediate relief by reducing swelling and redness.`,
        duration: `15 Mins`,
        suitableFor: `Inflamed, stubborn breakouts (1-5 spots)`,
        procedure: `Spot injection into acne lesion(s)`,
        downtime: `No downtime`,
        expectedResults: `Visible reduction in swelling/redness within 24-48 hours`,
        price: `Rp 250.000 (1-5 Spot)`,
        keyBenefits: [`Fast relief`, `Reduced inflammation`, `Targeted treatment`],
      },
      {
        name: `Subcision (Subsicion)`,
        desc: `A minimally invasive treatment designed to break down the fibrotic tissue beneath acne scars, releasing the skin and allowing it to smooth out naturally.`,
        duration: `30 Mins`,
        suitableFor: `Depressed / rolling acne scars`,
        procedure: `Numbing, subcision needle technique under scars`,
        downtime: `2-5 days bruising/swelling possible`,
        expectedResults: `Smoother, more even skin texture over following weeks`,
        price: `Start from Rp 1.000.000`,
        keyBenefits: [`Targets root cause`, `Improved texture`, `Reduced scar depth`],
      },
      {
        name: `TCA Cross`,
        desc: `Occurs during a TCA chemical peel, where the skin turns white as the acid penetrates, causing controlled protein coagulation. Signals the peel is actively exfoliating the skin, revealing smoother, more even-toned skin beneath.`,
        duration: `30 Mins`,
        suitableFor: `Acne scars, textured skin`,
        procedure: `Cleansing, targeted TCA application to scars`,
        downtime: `3-7 days peeling`,
        expectedResults: `Reduced fine lines, improved texture, diminished acne scars`,
        price: `Rp 350.000 (Small) / Rp 500.000 (Medium) / Rp 600.000 (Large)`,
        keyBenefits: [`Deep exfoliation`, `Scar improvement`, `Even tone`],
      },
      {
        name: `Keloid Therapy`,
        desc: `Uses triamcinolone in intralesional injections to reduce the size and thickness of keloid scars, softening and flattening raised scars while minimizing discomfort.`,
        duration: `20 Mins`,
        suitableFor: `Keloid / hypertrophic scars`,
        procedure: `Intralesional triamcinolone injection`,
        downtime: `No downtime, may repeat over sessions`,
        expectedResults: `Gradual reduction in keloid prominence over weeks`,
        price: `Rp 500.000 (Small) / Rp 1.500.000 (Medium) / Rp 3.000.000 (Large)`,
        keyBenefits: [`Softens raised scars`, `Improves comfort`, `Minimal downtime`],
      },
      {
        name: `Allure Facial – Calm & Balance`,
        desc: `Designed to promote a calm, balanced complexion, offering gentle and soothing care for easily irritated or reactive skin types, reducing redness and inflammation while deeply hydrating.`,
        duration: `60 Mins`,
        suitableFor: `Sensitive, reactive skin`,
        procedure: `Cleansing, gentle exfoliation, calming serum, mask`,
        downtime: `No downtime`,
        expectedResults: `Refreshed, soothed complexion with reduced irritation`,
        price: `Rp 600.000 / Rp 1.500.000 (Set of 3)`,
        keyBenefits: [`Calms redness`, `Deep hydration`, `Gentle formulation`],
      },
      {
        name: `Hermosa Facial – Balance & Clarity`,
        desc: `Crafted to balance oil production, reduce inflammation, and promote clearer, healthier skin. Targets clogged pores and helps calm irritated, oily/acne-prone skin.`,
        duration: `60 Mins`,
        suitableFor: `Oily, acne-prone skin`,
        procedure: `Cleansing, extraction, oil-balancing treatment, mask`,
        downtime: `No downtime`,
        expectedResults: `Reduced shine, minimized breakouts, healthier glow`,
        price: `Rp 600.000 / Rp 1.500.000 (Set of 3)`,
        keyBenefits: [`Oil control`, `Pore clarity`, `Reduced breakouts`],
      },
      {
        name: `Palma Facial`,
        desc: `Achieve a visibly younger look with Palma Facial. Specialized formula works to reduce the appearance of fine lines and wrinkles, leaving skin revitalized, smoother, and more radiant.`,
        duration: `60 Mins`,
        suitableFor: `Early signs of aging, dull skin`,
        procedure: `Cleansing, anti-aging serum infusion, massage, mask`,
        downtime: `No downtime`,
        expectedResults: `Smoother, more radiant, revitalized skin`,
        price: `Rp 700.000 / Rp 1.800.000 (Set of 3)`,
        keyBenefits: [`Reduces fine lines`, `Revitalizing`, `Radiance boost`],
      },
      {
        name: `Exosome Facial`,
        desc: `An innovative skin rejuvenation treatment combining gentle exfoliation, deep cleansing, and infusion of plant-derived antioxidants using nutrient-rich botanical exosomes to stimulate natural cellular regeneration.`,
        duration: `75 Mins`,
        tag: `Advanced`,
        suitableFor: `All skin types seeking regeneration`,
        procedure: `Cleansing, exfoliation, exosome serum infusion, LED/mask`,
        downtime: `No downtime`,
        expectedResults: `Smoother, radiant, youthful-looking skin`,
        price: `Rp 950.000 / Rp 2.250.000 (Set of 3)`,
        keyBenefits: [`Cellular regeneration`, `Antioxidant protection`, `Suitable for all skin types`],
      },
      {
        name: `Black Diamond Facial`,
        desc: `A luxurious, high-performance treatment designed to combat signs of aging. Infused with shea butter and micro magnets, delivering intense nourishment while promoting skin rejuvenation and firmness.`,
        duration: `75 Mins`,
        tag: `Most Popular`,
        suitableFor: `Aging, dull, dehydrated skin`,
        procedure: `Deep cleansing, exfoliation, micro-magnet massage, hydration mask`,
        downtime: `No downtime`,
        expectedResults: `Deeply hydrated, smooth, youthful, radiant complexion`,
        price: `Rp 850.000 / Rp 2.100.000 (Set of 3)`,
        keyBenefits: [`Deep cleansing`, `Intense nourishment`, `Anti-aging`],
      },
      {
        name: `Uplifting Facial with EndyMed`,
        desc: `Uses advanced radiofrequency technology to lift, tighten, and firm the skin. Stimulates collagen production, improving elasticity and reducing the appearance of sagging.`,
        duration: `60 Mins`,
        suitableFor: `Sagging skin, loss of firmness`,
        procedure: `Cleansing, EndyMed RF facial pass, soothing mask`,
        downtime: `No downtime, mild warmth/redness`,
        expectedResults: `More sculpted, lifted contour with firmer skin`,
        price: `Rp 1.800.000 / Rp 4.500.000 (Set of 3)`,
        keyBenefits: [`Skin tightening`, `Collagen boost`, `Lifted contour`],
      },
      {
        name: `Exosome Endymed Uplifting Facial`,
        desc: `A facial with exosome to enhance healing followed by a picosecond laser treatment — a powerful combination for skin rejuvenation, evening out skin tone, breaking down pigmentation and boosting collagen and elastin production.`,
        duration: `75 Mins`,
        suitableFor: `Uneven tone, pigmentation, aging skin`,
        procedure: `Exosome application, picosecond laser pass`,
        downtime: `Minimal, slight redness`,
        expectedResults: `Rejuvenated, even-toned skin with boosted collagen`,
        price: `Rp 2.000.000 / Rp 5.000.000 (Set of 3)`,
        keyBenefits: [`Combined exosome + laser`, `Even skin tone`, `Collagen boost`],
      },
      {
        name: `Exosome Picosecond Facial`,
        desc: `A facial with exosome to enhance healing followed by a picosecond laser treatment — a powerful combination for skin rejuvenation, evening out skin tone, breaking down pigmentation and boosting collagen and elastin production.`,
        duration: `75 Mins`,
        suitableFor: `Pigmentation, uneven tone, aging skin`,
        procedure: `Exosome application, picosecond laser pass`,
        downtime: `Minimal, slight redness`,
        expectedResults: `Rejuvenated, even-toned, youthful skin`,
        price: `Rp 3.000.000 / Rp 8.500.000 (Set of 3)`,
        keyBenefits: [`Advanced regeneration`, `Pigmentation reduction`, `Collagen boost`],
      },
      {
        name: `Facial Acupressure Massage`,
        desc: `A soothing treatment that stimulates key pressure points to promote circulation, reduce tension, and restore balance to the skin, improving lymphatic drainage and detoxifying the complexion.`,
        duration: `45 Mins`,
        suitableFor: `Tension, dull skin, poor circulation`,
        procedure: `Pressure-point facial massage sequence`,
        downtime: `No downtime`,
        expectedResults: `Refreshed, rejuvenated skin with natural glow, deep relaxation`,
        price: `Rp 250.000`,
        keyBenefits: [`Improved circulation`, `Lymphatic drainage`, `Relaxation`],
      },
      {
        name: `Mandelage Platinum Peel`,
        desc: `A refined peeling therapy that combines the power of mandelic acid to gently exfoliate and renew the skin. Ideal for sensitive skin types, helps reduce mild acne and improve texture.`,
        duration: `30 Mins`,
        suitableFor: `Sensitive, acne-prone skin`,
        procedure: `Cleansing, mandelic acid peel application, neutralization`,
        downtime: `Minimal, slight flaking possible`,
        expectedResults: `Smoother, more even complexion with healthy glow`,
        price: `Rp 700.000`,
        keyBenefits: [`Gentle exfoliation`, `Reduces mild acne`, `Suitable for sensitive skin`],
      },
      {
        name: `Youth Skin Peel`,
        desc: `An advanced peeling therapy designed to rejuvenate and refresh the complexion, utilizing a blend of potent ingredients to exfoliate dead skin cells and reveal a brighter, more youthful layer.`,
        duration: `30 Mins`,
        suitableFor: `Dull skin, fine lines, uneven texture`,
        procedure: `Cleansing, chemical peel application, soothing finish`,
        downtime: `1-3 days mild peeling`,
        expectedResults: `Smoother, luminous complexion with renewed elasticity`,
        price: `Rp 800.000`,
        keyBenefits: [`Cellular turnover`, `Diminishes fine lines`, `Enhanced vitality`],
      },
      {
        name: `Bright Advance Peel`,
        desc: `An advanced peeling treatment designed to improve skin tone, texture, and early signs of aging. Formulated with glycolic acid, phytic acid, and prickly pear flower extract to reduce hyperpigmentation and soften fine lines.`,
        duration: `30 Mins`,
        suitableFor: `Rosacea-prone skin, hyperpigmentation`,
        procedure: `Cleansing, layered acid peel application`,
        downtime: `Minimal, mild redness`,
        expectedResults: `Smoother, more radiant, refreshed, even-looking complexion`,
        price: `Rp 800.000`,
        keyBenefits: [`Reduces hyperpigmentation`, `Soothes rosacea`, `Brightening`],
      },
      {
        name: `Body Peel`,
        desc: `An effective peeling therapy designed to address mild to severe acne, uneven complexion, brightening, and fine lines on the body by exfoliating the skin's surface and promoting cellular turnover.`,
        duration: `45 Mins`,
        suitableFor: `Body acne, uneven tone (back)`,
        procedure: `Cleansing, body chemical peel application`,
        downtime: `2-5 days peeling`,
        expectedResults: `Clearer, more radiant complexion with reduced blemishes`,
        price: `Rp 1.000.000 (Half Back) / Rp 1.300.000 (Full Back)`,
        keyBenefits: [`Full-body exfoliation`, `Reduces blemishes`, `Improved texture`],
      },
      {
        name: `Booty Peel`,
        desc: `Achieve smoother, brighter, and more even-toned skin with the Booty Peel treatment, specifically formulated for the delicate skin on the booty area, gently exfoliating and removing dead skin cells.`,
        duration: `30 Mins`,
        suitableFor: `Uneven complexion, acne on booty area`,
        procedure: `Cleansing, targeted peel application`,
        downtime: `2-4 days peeling`,
        expectedResults: `Revitalized, glowing, more even-toned skin`,
        price: `Rp 1.000.000`,
        keyBenefits: [`Even tone`, `Smooths texture`, `Long-lasting results`],
      },
      {
        name: `Body Extraction`,
        desc: `Focused on white and blackhead extractions, designed to deeply cleanse and purify the skin, effectively targeting clogged pores and breakouts through gentle exfoliation and impurity removal.`,
        duration: `45 Mins`,
        suitableFor: `Body acne, congested pores`,
        procedure: `Steam, manual extraction, soothing application`,
        downtime: `1-2 days mild redness`,
        expectedResults: `Refreshed, revitalized skin with visibly reduced blemishes`,
        price: `Rp 600.000`,
        keyBenefits: [`Deep pore cleansing`, `Prevents future breakouts`, `Smoother texture`],
      },
      {
        name: `Cauter Therapy`,
        desc: `A specialized procedure designed to remove skin imperfections such as warts, skin tags, and other benign lesions using heat-based technology, targeting unwanted growths without damaging surrounding skin.`,
        duration: `20 Mins`,
        suitableFor: `Warts, skin tags, benign lesions`,
        procedure: `Local prep, cauterization of lesion(s)`,
        downtime: `3-7 days scabbing/healing`,
        expectedResults: `Clearer, more refined complexion with removed lesions`,
        price: `Rp 450.000 (Small) / Rp 850.000 (Medium) / Rp 1.200.000 (Large)`,
        keyBenefits: [`Precise removal`, `Minimal scarring`, `Fast procedure`],
      },
    ]
  },
  {
    id: 'injectables',
    slug: 'injectables',
    name: 'Injectables',
    badge: 'Aesthetic Enhancements',
    shortDesc: `Doctor-administered injectables for volume restoration, wrinkle reduction, skin boosting, and subtle facial contouring.`,
    fullDesc: `Achieve natural, harmonious results with our premium injectables. From muscle relaxants smoothing dynamic lines to dermal fillers and skin boosters that deeply hydrate and restore lost volume.`,
    img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000&auto=format&fit=crop',
    treatmentsCount: '27 Treatments',
    whatsappMessage: `Hello SHAZ Clinic, I would like to book a consultation for Injectables.`,
    featuredTreatments: [
      {
        name: `ExoMind Mind Therapy`,
        desc: `A non-invasive neuromodulation treatment using advanced Transcranial Magnetic Stimulation (TMS) technology to stimulate targeted brain areas associated with mood, focus, motivation, and emotional well-being.`,
        duration: `30 Mins`,
        tag: `New in Bali`,
        suitableFor: `Stress, low focus, mood support (non-clinical wellness use)`,
        procedure: `Seated TMS session with magnetic pulse delivery`,
        downtime: `No downtime, return to activities immediately`,
        expectedResults: `Improved mental clarity, reduced stress, enhanced focus`,
        price: `Rp 4.000.000 (Single) / Rp 10.000.000 (Set of 3) / Rp 16.000.000 (Set of 6)`,
        keyBenefits: [`FDA-cleared TMS technology`, `Non-invasive`, `No downtime`],
      },
      {
        name: `Innertrue Collagen Boost`,
        desc: `Designed to revitalize your skin from within, promoting elasticity, hydration, and a natural glow. Supports the body's collagen production, reducing fine lines and wrinkles while enhancing overall skin health.`,
        duration: `45 Mins`,
        tag: `Premium`,
        suitableFor: `Aging skin needing deep collagen support`,
        procedure: `Consultation, injectable collagen-stimulating treatment`,
        downtime: `Minimal, slight swelling possible`,
        expectedResults: `Smoother, more youthful complexion over following weeks`,
        price: `Rp 10.000.000`,
        keyBenefits: [`Collagen stimulation`, `Elasticity boost`, `Hydration`],
      },
      {
        name: `Profhilo (Super Hydration)`,
        desc: `A breakthrough treatment designed to stimulate collagen and elastin production, providing intense hydration and restoring skin firmness for a natural, lifted look.`,
        duration: `30 Mins`,
        tag: `Most Popular`,
        suitableFor: `Dehydrated, sagging skin`,
        procedure: `Consultation, bio-remodeling injections (BAP-technique points)`,
        downtime: `Minimal, small bumps resolve within hours-days`,
        expectedResults: `Smoother, plumper, more youthful skin over 4-6 weeks`,
        price: `Rp 7.700.000 / Rp 21.300.000 (Set of 3)`,
        keyBenefits: [`Deep hydration`, `Skin firmness`, `Natural lifted look`],
      },
      {
        name: `Nucleofill Strong`,
        desc: `A powerful bio-stimulating treatment enriched with polynucleotide (PN), designed to deeply regenerate, lift, and protect the skin by stimulating collagen production and revitalizing skin cells.`,
        duration: `30 Mins`,
        suitableFor: `Aging skin needing structural support`,
        procedure: `Consultation, PN injections across target area`,
        downtime: `Minimal, slight swelling/redness`,
        expectedResults: `Smoother, more youthful appearance with improved firmness`,
        price: `Rp 5.500.000 / Rp 13.500.000 (Set of 3)`,
        keyBenefits: [`Bio-stimulation`, `Improved elasticity`, `Fewer injections needed`],
      },
      {
        name: `Mesomelasma`,
        desc: `A specialized mesotherapy treatment designed to target melasma and other forms of hyperpigmentation by delivering potent skin-brightening agents directly into affected areas.`,
        duration: `30 Mins`,
        suitableFor: `Melasma, hyperpigmentation`,
        procedure: `Consultation, mesotherapy micro-injections`,
        downtime: `Minimal, slight redness`,
        expectedResults: `Lightened dark spots, more even skin tone over sessions`,
        price: `Rp 1.500.000`,
        keyBenefits: [`Targets melasma`, `Brightening`, `Even skin tone`],
      },
      {
        name: `Growth Factor Therapy`,
        desc: `A cutting-edge treatment that stimulates the skin's natural healing and regeneration process. Introduces bioactive proteins that promote cell renewal, boost collagen, and address anti-aging, scars, hyperpigmentation, dermatitis, and hair loss.`,
        duration: `45 Mins`,
        suitableFor: `Anti-aging, scars, hyperpigmentation, hair thinning`,
        procedure: `Consultation, growth factor micro-injections`,
        downtime: `Minimal, slight redness`,
        expectedResults: `Improved texture, radiance, and regeneration over weeks`,
        price: `Rp 3.000.000`,
        keyBenefits: [`Cell renewal`, `Collagen boost`, `Multi-concern treatment`],
      },
      {
        name: `Restylane Vital Light`,
        desc: `A hyaluronic acid-based treatment designed to restore the skin's natural hydration and radiance, delivering a subtle, natural-looking glow while smoothing fine lines. Effective for face, neck, and hands.`,
        duration: `30 Mins`,
        suitableFor: `Dehydrated skin on face, neck, hands`,
        procedure: `Consultation, HA micro-injections`,
        downtime: `Minimal, slight swelling`,
        expectedResults: `Hydrated, plumper, more youthful-looking skin`,
        price: `Rp 4.800.000`,
        keyBenefits: [`Deep hydration`, `Natural glow`, `Works on delicate areas`],
      },
      {
        name: `Glow and Shine Therapy`,
        desc: `Encompasses a range of skin treatments designed to enhance radiance and luminosity, boosting hydration and addressing dullness for a healthier, more vibrant appearance.`,
        duration: `30 Mins`,
        suitableFor: `Dull, lackluster skin`,
        procedure: `Consultation, hydrating/brightening injectable treatment`,
        downtime: `Minimal`,
        expectedResults: `Healthier, more vibrant, radiant appearance`,
        price: `Rp 2.500.000`,
        keyBenefits: [`Radiance boost`, `Hydration`, `Addresses dullness`],
      },
      {
        name: `DNA Salmon PDRN + HA Meso Rejuve`,
        desc: `Combines the regenerative power of salmon DNA with hyaluronic acid to deliver exceptional skin rejuvenation, promoting deep hydration, stimulating collagen production, and enhancing skin elasticity.`,
        duration: `30 Mins`,
        suitableFor: `Aging, dull, dehydrated skin`,
        procedure: `Consultation, PDRN + HA mesotherapy injections`,
        downtime: `Minimal, slight redness`,
        expectedResults: `Improved texture, reduced fine lines, radiant complexion`,
        price: `Rp 1.500.000`,
        keyBenefits: [`Regenerative PDRN`, `Deep hydration`, `Collagen stimulation`],
      },
      {
        name: `Jelly Glow`,
        desc: `A complex rejuvenator for intensive anti-aging, formulated with Defined Cell Culture Media 4 (DCCM4), Polynucleotide (PN), and Hyaluronic Acid (HA). Activates skin self-rejuvenation and improves elasticity and density.`,
        duration: `30 Mins`,
        suitableFor: `Intensive anti-aging needs`,
        procedure: `Consultation, DCCM4/PN/HA injections`,
        downtime: `Minimal, slight redness`,
        expectedResults: `Smoother, repaired texture with improved density`,
        price: `Rp 4.000.000`,
        keyBenefits: [`Triple-action formula`, `Deep moisture`, `Collagen stimulation`],
      },
      {
        name: `Botox Allergan`,
        desc: `A renowned treatment designed to diminish the appearance of fine lines and wrinkles by temporarily relaxing muscles responsible for facial expressions — forehead, crow's feet, and frown lines.`,
        duration: `20 Mins`,
        tag: `Premium`,
        suitableFor: `Forehead lines, crow's feet, frown lines`,
        procedure: `Consultation, targeted muscle-relaxing injections`,
        downtime: `Minimal, avoid lying down for 4 hours`,
        expectedResults: `Smoother, more youthful appearance within 3-7 days`,
        price: `Rp 95.000 (1 Unit)`,
        keyBenefits: [`Premium brand`, `Precise results`, `Minimal downtime`],
      },
      {
        name: `Botox Korea`,
        desc: `Korean botulinum toxin often used in aesthetic procedures, working by inhibiting nerve signals that move muscles, producing a smoothing and relaxing effect on the treated area.`,
        duration: `20 Mins`,
        suitableFor: `Fine lines, wrinkles, expression lines`,
        procedure: `Consultation, targeted muscle-relaxing injections`,
        downtime: `Minimal, avoid lying down for 4 hours`,
        expectedResults: `Reduced fine lines and wrinkles within days`,
        price: `Rp 50.000 (1 Unit)`,
        keyBenefits: [`Budget-friendly option`, `Smoothing effect`, `Minimal downtime`],
      },
      {
        name: `No Sweat Therapy – Underarm`,
        desc: `A highly effective solution for managing underarm hyperhidrosis using Botox injections that temporarily block nerve signals responsible for overactive sweat glands.`,
        duration: `30 Mins`,
        suitableFor: `Underarm hyperhidrosis (excessive sweating)`,
        procedure: `Consultation, targeted Botox injections in underarm area`,
        downtime: `No downtime`,
        expectedResults: `Dramatic decrease in sweating lasting months`,
        price: `Rp 4.000.000`,
        keyBenefits: [`Long-lasting relief`, `No downtime`, `Confidence boost`],
      },
      {
        name: `No Sweat Therapy – Hand`,
        desc: `An effective solution for palmar hyperhidrosis, using Botox injections that target overactive sweat glands in the palms by blocking nerve signals responsible for excess sweat production.`,
        duration: `30 Mins`,
        suitableFor: `Palmar hyperhidrosis (sweaty hands)`,
        procedure: `Consultation, targeted Botox injections in palms`,
        downtime: `Minimal downtime`,
        expectedResults: `Noticeably drier hands with lasting results`,
        price: `Rp 4.500.000`,
        keyBenefits: [`Improved comfort`, `Enhanced confidence`, `Lasting results`],
      },
      {
        name: `No Sweat Therapy – Feet`,
        desc: `An effective treatment for plantar hyperhidrosis, using Botox injections to target overactive sweat glands in the feet, temporarily blocking nerve signals responsible for excess sweat production.`,
        duration: `30 Mins`,
        suitableFor: `Plantar hyperhidrosis (sweaty feet)`,
        procedure: `Consultation, targeted Botox injections in feet`,
        downtime: `Minimal discomfort`,
        expectedResults: `Significantly drier feet with long-lasting results`,
        price: `Rp 4.500.000`,
        keyBenefits: [`Long-lasting results`, `Improved comfort in shoes`, `Boosted confidence`],
      },
      {
        name: `Restylane Kysse (Lip Filler)`,
        desc: `A dermal filler designed to enhance lip volume and smooth lines around the mouth, providing natural-looking, fuller lips while maintaining soft, flexible movement.`,
        duration: `30 Mins`,
        tag: `Most Popular`,
        suitableFor: `Thin lips, lip asymmetry, lip lines`,
        procedure: `Consultation, numbing, lip filler injection`,
        downtime: `1-3 days swelling`,
        expectedResults: `Beautifully plump, natural-finish lips`,
        price: `Rp 4.800.000`,
        keyBenefits: [`Natural movement`, `Long-lasting`, `Defined lip shape`],
      },
      {
        name: `Restylane Lyft`,
        desc: `A dermal filler designed to restore volume and lift to the cheeks and midface, smoothing wrinkles and providing a subtle lift to enhance facial contours.`,
        duration: `30 Mins`,
        suitableFor: `Volume loss in cheeks/midface`,
        procedure: `Consultation, numbing, filler injection`,
        downtime: `1-3 days swelling/bruising possible`,
        expectedResults: `Natural-looking volume and youthful contour`,
        price: `Rp 5.000.000`,
        keyBenefits: [`Volume restoration`, `Facial contouring`, `Long-lasting`],
      },
      {
        name: `Teosyal RHA – Ultra Deep`,
        desc: `A premium dermal filler featuring Resilient Hyaluronic Acid technology, specially designed for deep facial areas, providing natural-looking volume while adapting to facial movements.`,
        duration: `30 Mins`,
        tag: `Premium`,
        suitableFor: `Deep volume loss areas`,
        procedure: `Consultation, numbing, deep-plane filler injection`,
        downtime: `1-3 days swelling possible`,
        expectedResults: `Natural-looking volume lasting up to 15 months`,
        price: `Rp 6.000.000`,
        keyBenefits: [`Long-lasting up to 15 months`, `Adapts to movement`, `Minimal downtime`],
      },
      {
        name: `Teosyal RHA 4`,
        desc: `Premium dermal filler with Resilient Hyaluronic Acid technology for deep facial areas, providing natural-looking volume that adapts to facial movements.`,
        duration: `30 Mins`,
        suitableFor: `Deep volume loss areas`,
        procedure: `Consultation, numbing, filler injection`,
        downtime: `1-3 days swelling possible`,
        expectedResults: `Natural-looking volume, long-lasting results`,
        price: `Rp 5.500.000`,
        keyBenefits: [`Natural adaptability`, `Long-lasting`, `Minimal downtime`],
      },
      {
        name: `Teosyal RHA 3`,
        desc: `Premium dermal filler with Resilient Hyaluronic Acid technology, providing natural-looking volume with adaptability to facial expressions for moderate depth areas.`,
        duration: `30 Mins`,
        suitableFor: `Moderate volume loss areas`,
        procedure: `Consultation, numbing, filler injection`,
        downtime: `1-3 days swelling possible`,
        expectedResults: `Natural-looking volume, long-lasting results`,
        price: `Rp 5.300.000`,
        keyBenefits: [`Natural adaptability`, `Long-lasting`, `Minimal downtime`],
      },
      {
        name: `Teosyal RHA 2`,
        desc: `Premium dermal filler with Resilient Hyaluronic Acid technology, ideal for finer lines and lighter volume correction with natural movement.`,
        duration: `30 Mins`,
        suitableFor: `Fine lines, lighter volume correction`,
        procedure: `Consultation, numbing, filler injection`,
        downtime: `1-2 days swelling possible`,
        expectedResults: `Natural, subtle volume correction`,
        price: `Rp 5.000.000`,
        keyBenefits: [`Subtle natural results`, `Long-lasting`, `Minimal downtime`],
      },
      {
        name: `Filler Dissolve – Small`,
        desc: `Uses hyaluronidase to safely and effectively dissolve unwanted dermal fillers. Ideal for minor adjustments, targeting small areas to refine and restore natural look.`,
        duration: `20 Mins`,
        suitableFor: `Minor filler correction`,
        procedure: `Consultation, hyaluronidase injection`,
        downtime: `Minimal, slight swelling`,
        expectedResults: `Smooth transition back to natural contours`,
        price: `Rp 900.000`,
        keyBenefits: [`Precise correction`, `Quick procedure`, `Restores natural look`],
      },
      {
        name: `Filler Dissolve – Medium`,
        desc: `Uses hyaluronidase to safely dissolve unwanted dermal fillers, suitable for moderate adjustments providing comprehensive removal for a balanced appearance.`,
        duration: `20 Mins`,
        suitableFor: `Moderate filler correction`,
        procedure: `Consultation, hyaluronidase injection`,
        downtime: `Minimal, slight swelling`,
        expectedResults: `Balanced, natural appearance restored`,
        price: `Rp 1.500.000`,
        keyBenefits: [`Comprehensive removal`, `Balanced results`, `Minimally invasive`],
      },
      {
        name: `Filler Dissolve – Large`,
        desc: `Uses hyaluronidase to safely dissolve unwanted dermal fillers, suitable for moderate to large adjustments providing comprehensive removal for a balanced appearance.`,
        duration: `30 Mins`,
        suitableFor: `Large-area filler correction`,
        procedure: `Consultation, hyaluronidase injection`,
        downtime: `Minimal, slight swelling`,
        expectedResults: `Comprehensive correction, balanced appearance`,
        price: `Rp 2.000.000`,
        keyBenefits: [`Comprehensive removal`, `Full correction`, `Precise and tailored`],
      },
      {
        name: `Thread Lift – Premium`,
        desc: `A sophisticated non-surgical procedure designed to rejuvenate and enhance appearance by lifting and tightening sagging skin, using dissolvable threads to stimulate natural collagen production.`,
        duration: `60 Mins`,
        tag: `Premium`,
        suitableFor: `Sagging skin on face, neck, jawline`,
        procedure: `Consultation, numbing, thread insertion (2 pcs)`,
        downtime: `3-5 days mild swelling/bruising`,
        expectedResults: `Refined, youthful contour with improved firmness`,
        price: `Rp 2.500.000 (2 pcs)`,
        keyBenefits: [`Immediate lift`, `Collagen stimulation`, `Long-lasting`],
      },
      {
        name: `Nose Thread Lift`,
        desc: `An advanced thread lift option offering a more pronounced lift and long-lasting results, designed to restore volume, improve skin elasticity, and create a more defined nose contour.`,
        duration: `45 Mins`,
        suitableFor: `Nose contouring, bridge definition`,
        procedure: `Consultation, numbing, thread insertion`,
        downtime: `3-5 days mild swelling`,
        expectedResults: `More defined, lifted nose contour`,
        price: `Rp 4.000.000`,
        keyBenefits: [`Non-surgical nose lift`, `Long-lasting`, `Minimal downtime`],
      },
      {
        name: `PRP Injection`,
        desc: `A natural and effective way to revitalize skin using platelets derived from your own blood, stimulating collagen production and accelerating healing to smooth fine lines and improve texture.`,
        duration: `45 Mins`,
        suitableFor: `Fine lines, dull or tired-looking skin`,
        procedure: `Blood draw, centrifuge separation, PRP injection`,
        downtime: `1-2 days mild swelling`,
        expectedResults: `Firmer, brighter, more radiant skin`,
        price: `Rp 3.500.000 (Single) / Rp 6.000.000 (Set of 3)`,
        keyBenefits: [`Uses your own natural growth factors`, `Minimal downtime`, `Non-invasive`],
      },
    ]
  },
  {
    id: 'laser',
    slug: 'laser',
    name: 'Laser',
    badge: 'Energy-Based Devices',
    shortDesc: `High-precision laser technology for targeted pigmentation removal, vascular correction, acne scar resurfacing, and total skin brightening.`,
    fullDesc: `Harnessing advanced clinical energy devices and non-ablative wavelengths, our laser suite effectively clears melasma, sun spots, broken capillaries, and uneven texture with minimal downtime.`,
    img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059c98b?q=80&w=1000&auto=format&fit=crop',
    treatmentsCount: '6 Treatments',
    whatsappMessage: `Hello SHAZ Clinic, I would like to inquire about Laser treatments and skin resurfacing.`,
    featuredTreatments: [
      {
        name: `PRP RF Microneedling`,
        desc: `Deep Focus Fractional PRP Treatment combines advanced microneedling with PRP to rejuvenate and repair skin, using EndyMed's RF microneedling technology alongside PRP for accelerated healing.`,
        duration: `60 Mins`,
        suitableFor: `Fine lines, uneven texture, dullness`,
        procedure: `Blood draw, RF microneedling, PRP application`,
        downtime: `1-3 days redness`,
        expectedResults: `Smoother, more youthful appearance with firmer skin`,
        price: `Rp 5.000.000 (Single) / Rp 12.000.000 (Set of 3)`,
        keyBenefits: [`Combined RF + PRP`, `Collagen stimulation`, `Enhanced healing`],
      },
      {
        name: `Pico Laser – Rejuvenation`,
        desc: `Offers a gentle yet powerful solution to revitalize skin. By targeting fine lines, pigmentation, and uneven texture, the laser stimulates collagen production and restores a youthful glow.`,
        duration: `30 Mins`,
        tag: `Most Popular`,
        suitableFor: `Fine lines, pigmentation, uneven texture`,
        procedure: `Cleansing, pico laser passes, soothing gel/mask`,
        downtime: `Minimal, mild redness a few hours`,
        expectedResults: `Smoother, brighter, more radiant skin`,
        price: `Rp 3.000.000 (Single) / Rp 8.000.000 (Set of 3) / Rp 10.000.000 (Set of 5)`,
        keyBenefits: [`Collagen stimulation`, `Minimal downtime`, `Improved radiance`],
      },
      {
        name: `Pico Laser – Melasma`,
        desc: `An advanced solution for treating melasma, effectively targeting and breaking down excess pigmentation without harming surrounding skin, reducing dark patches and restoring even skin tone.`,
        duration: `30 Mins`,
        suitableFor: `Melasma, dark patches`,
        procedure: `Cleansing, targeted pico laser passes`,
        downtime: `Minimal discomfort`,
        expectedResults: `Clearer, brighter, more even skin over sessions`,
        price: `Rp 3.000.000 (Single) / Rp 9.000.000 (Set of 3) / Rp 12.500.000 (Set of 5)`,
        keyBenefits: [`Targets melasma specifically`, `Minimal downtime`, `Even skin tone`],
      },
      {
        name: `Pico Laser – Tattoo Removal (Extra Small)`,
        desc: `Uses ultrashort pulses to break down ink particles with precision, gradually fading unwanted tattoos while minimizing damage to surrounding skin.`,
        duration: `30 Mins`,
        suitableFor: `Small/extra-small tattoos`,
        procedure: `Cleansing, pico laser passes over tattoo area`,
        downtime: `Minimal, scabbing possible`,
        expectedResults: `Gradual tattoo fading over multiple sessions`,
        price: `Rp 800.000 (Single) / Rp 1.800.000 (Set of 3)`,
        keyBenefits: [`Precise ink breakdown`, `Fewer sessions needed`, `Minimal downtime`],
      },
      {
        name: `Pico Laser – Tattoo Removal (Small)`,
        desc: `Uses ultrashort pulses to break down ink particles with precision, gradually fading unwanted tattoos while minimizing damage to surrounding skin.`,
        duration: `30 Mins`,
        suitableFor: `Small tattoos`,
        procedure: `Cleansing, pico laser passes over tattoo area`,
        downtime: `Minimal, scabbing possible`,
        expectedResults: `Gradual tattoo fading over multiple sessions`,
        price: `Rp 1.500.000 (Single) / Rp 3.850.000 (Set of 3)`,
        keyBenefits: [`Precise ink breakdown`, `Efficient fading`, `Minimal downtime`],
      },
      {
        name: `Pico Laser – Tattoo Removal (Medium)`,
        desc: `Uses ultrashort pulses to break down ink particles with precision, gradually fading unwanted tattoos while minimizing damage to surrounding skin.`,
        duration: `45 Mins`,
        suitableFor: `Medium-sized tattoos`,
        procedure: `Cleansing, pico laser passes over tattoo area`,
        downtime: `Minimal, scabbing possible`,
        expectedResults: `Gradual tattoo fading over multiple sessions`,
        price: `Rp 2.500.000 (Single) / Rp 6.400.000 (Set of 3)`,
        keyBenefits: [`Precise ink breakdown`, `Efficient fading`, `Minimal downtime`],
      },
    ]
  },
  {
    id: 'body',
    slug: 'body',
    name: 'Body',
    badge: 'Contouring & Wellness',
    shortDesc: `Non-invasive body contouring, lymphatic drainage, radiofrequency skin tightening, and localized slimming protocols designed for your silhouette.`,
    fullDesc: `Sculpt, tone, and firm your body with our non-surgical aesthetic wellness therapies that combine lymphatic detox, targeted fat metabolism, and deep collagen stimulation.`,
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop',
    treatmentsCount: '20 Treatments',
    whatsappMessage: `Hello SHAZ Clinic, I would like to book a consultation for Body Contouring & Tightening.`,
    featuredTreatments: [
      {
        name: `Pico Laser – Tattoo Removal (Large)`,
        desc: `Uses ultrashort pulses to break down ink particles with precision, gradually fading unwanted tattoos while minimizing damage to surrounding skin.`,
        duration: `60 Mins`,
        suitableFor: `Large tattoos`,
        procedure: `Cleansing, pico laser passes over tattoo area`,
        downtime: `Minimal, scabbing possible`,
        expectedResults: `Gradual tattoo fading over multiple sessions`,
        price: `Rp 3.500.000 (Single) / Rp 8.950.000 (Set of 3)`,
        keyBenefits: [`Precise ink breakdown`, `Efficient fading`, `Minimal downtime`],
      },
      {
        name: `EMS Body Sculpting (Tummy, Booty, Arms)`,
        desc: `EMS treatment effectively tones and sculpts the tummy, booty, and arms by stimulating muscle contractions, enhancing definition, and improving strength without downtime.`,
        duration: `30 Mins`,
        tag: `Most Popular`,
        suitableFor: `Muscle toning, body contouring`,
        procedure: `EMS device application over target muscle groups`,
        downtime: `No downtime`,
        expectedResults: `Firmer, more contoured body visible within a few sessions`,
        price: `Rp 850.000 (Single) / Rp 2.400.000 (Set of 3) / Rp 3.500.000 (Set of 5) / Rp 6.500.000 (Set of 10)`,
        keyBenefits: [`Non-invasive muscle toning`, `No downtime`, `Visible results in weeks`],
      },
      {
        name: `Deep Focus Full Face Contouring`,
        desc: `Powered by the EndyMed machine, offers a non-invasive way to lift and sculpt the face using radiofrequency technology, tightening skin and enhancing facial contours.`,
        duration: `45 Mins`,
        suitableFor: `Facial sagging, loss of definition`,
        procedure: `Cleansing, EndyMed RF pass over full face`,
        downtime: `No downtime, mild warmth`,
        expectedResults: `More youthful, defined facial contour`,
        price: `Rp 1.700.000 (Single) / Rp 4.500.000 (Set of 3) / Rp 6.000.000 (Set of 5)`,
        keyBenefits: [`Non-invasive lifting`, `Improved elasticity`, `Defined contours`],
      },
      {
        name: `Deep Focus Half/Lower Face Contouring`,
        desc: `Non-invasive radiofrequency contouring focused on the lower/half face to tighten skin and enhance jawline and lower facial definition.`,
        duration: `30 Mins`,
        suitableFor: `Lower face sagging, jawline definition`,
        procedure: `Cleansing, EndyMed RF pass over lower/half face`,
        downtime: `No downtime`,
        expectedResults: `More defined jawline and lower facial contour`,
        price: `Rp 1.500.000 (Single) / Rp 3.600.000 (Set of 3) / Rp 5.000.000 (Set of 5)`,
        keyBenefits: [`Targeted contouring`, `Non-invasive`, `No downtime`],
      },
      {
        name: `Deep Focus Neck Contouring`,
        desc: `Non-invasive radiofrequency treatment targeting the neck area to tighten skin, reduce sagging, and improve overall neck contour.`,
        duration: `30 Mins`,
        suitableFor: `Neck sagging, loose skin`,
        procedure: `Cleansing, EndyMed RF pass over neck`,
        downtime: `No downtime`,
        expectedResults: `Tighter, more defined neck contour`,
        price: `Rp 1.500.000 (Single) / Rp 4.000.000 (Set of 3)`,
        keyBenefits: [`Neck-specific tightening`, `Non-invasive`, `No downtime`],
      },
      {
        name: `Deep Focus Decolletage Contouring`,
        desc: `Non-invasive radiofrequency treatment for the decolletage area to tighten skin and improve texture and firmness.`,
        duration: `30 Mins`,
        suitableFor: `Decolletage sagging, uneven texture`,
        procedure: `Cleansing, EndyMed RF pass over decolletage`,
        downtime: `No downtime`,
        expectedResults: `Firmer, smoother decolletage skin`,
        price: `Rp 1.100.000 (Single) / Rp 2.950.000 (Set of 3)`,
        keyBenefits: [`Targeted decolletage care`, `Non-invasive`, `No downtime`],
      },
      {
        name: `Deep Focus Body Contouring (Abs/Thigh/Arms/Butt/Calf)`,
        desc: `Uses advanced radiofrequency technology to tighten skin and reduce stubborn fat in targeted areas, giving smoother, firmer skin and a more contoured silhouette with immediate results.`,
        duration: `45 Mins`,
        suitableFor: `Localized fat, loose skin on body`,
        procedure: `EndyMed RF pass over target body area`,
        downtime: `No downtime`,
        expectedResults: `1-3 cm reduction in treated area, smoother contour`,
        price: `Rp 2.500.000 (Single) / Rp 6.600.000 (Set of 3) / Rp 10.000.000 (Set of 5) / Rp 15.000.000 (Set of 10)`,
        keyBenefits: [`Immediate 1-3cm reduction`, `Non-invasive`, `Firmer skin`],
      },
      {
        name: `Deep Focus Brafat / Love Handle Contouring`,
        desc: `Targeted radiofrequency body contouring designed for stubborn brafat and love handle areas, tightening skin and reducing localized fat for a more sculpted silhouette.`,
        duration: `30 Mins`,
        suitableFor: `Brafat, love handles`,
        procedure: `EndyMed RF pass over target area`,
        downtime: `No downtime`,
        expectedResults: `Smoother, more sculpted silhouette`,
        price: `Rp 1.500.000 (Single) / Rp 4.000.000 (Set of 3) / Rp 5.500.000 (Set of 5) / Rp 9.000.000 (Set of 10)`,
        keyBenefits: [`Targeted fat reduction`, `Non-invasive`, `No downtime`],
      },
      {
        name: `Diamond Contour / Meso Lipo – Contour Prime`,
        desc: `Acts as a powerful fat burner targeting localized fat deposits through precise micro-injections that deliver active ingredients directly into problem areas, promoting fat cell breakdown.`,
        duration: `30 Mins`,
        suitableFor: `Localized fat deposits`,
        procedure: `Consultation, micro-injection lipolytic treatment`,
        downtime: `Minimal, slight swelling`,
        expectedResults: `Slimmer, more sculpted silhouette over sessions`,
        price: `Rp 900.000`,
        keyBenefits: [`Targeted fat breakdown`, `Non-invasive`, `Body contouring`],
      },
      {
        name: `Diamond Contour / Meso Lipo – Contour Platinum`,
        desc: `An enhanced version of the Meso Lipo fat-burning treatment, using precise micro-injections for more comprehensive localized fat reduction and body contouring.`,
        duration: `45 Mins`,
        suitableFor: `Larger localized fat deposits`,
        procedure: `Consultation, micro-injection lipolytic treatment`,
        downtime: `Minimal, slight swelling`,
        expectedResults: `Slimmer, more sculpted silhouette over sessions`,
        price: `Rp 2.500.000`,
        keyBenefits: [`Enhanced fat breakdown`, `Body contouring`, `Confidence boost`],
      },
      {
        name: `Diamond Contour / Meso Lipo – Contour Super Platinum`,
        desc: `The most intensive Meso Lipo option for maximum localized fat reduction, using precise micro-injections delivering active ingredients for comprehensive body contouring.`,
        duration: `60 Mins`,
        tag: `Premium`,
        suitableFor: `Significant localized fat deposits`,
        procedure: `Consultation, extensive micro-injection lipolytic treatment`,
        downtime: `Minimal, slight swelling`,
        expectedResults: `Maximum slimming and sculpting effect over sessions`,
        price: `Rp 3.000.000`,
        keyBenefits: [`Maximum fat reduction`, `Comprehensive contouring`, `Confident silhouette`],
      },
      {
        name: `Foot Reflexology`,
        desc: `A therapeutic treatment that focuses on stimulating specific pressure points on the feet corresponding to different areas of the body, promoting relaxation and improving circulation.`,
        duration: `30/60/90 Mins`,
        suitableFor: `Stress, tension, poor circulation`,
        procedure: `Foot pressure-point massage sequence`,
        downtime: `No downtime`,
        expectedResults: `Calm, balanced feeling with reduced stress`,
        price: `Rp 150.000 (30 Min) / Rp 250.000 (60 Min) / Rp 400.000 (90 Min)`,
        keyBenefits: [`Improved circulation`, `Deep relaxation`, `Stress relief`],
      },
      {
        name: `Balinese Massage`,
        desc: `Combines gentle stretches, acupressure, and aromatherapy to restore balance and harmony to the body, working deeply to release tension and improve circulation.`,
        duration: `30/60/90/120 Mins`,
        tag: `Most Popular`,
        suitableFor: `Muscle tension, stress, relaxation`,
        procedure: `Traditional Balinese massage technique with aromatherapy oils`,
        downtime: `No downtime`,
        expectedResults: `Deep relaxation, eased muscle stiffness, renewed vitality`,
        price: `Rp 180.000 (30 Min) / Rp 350.000 (60 Min) / Rp 450.000 (90 Min) / Rp 600.000 (120 Min)`,
        keyBenefits: [`Traditional technique`, `Aromatherapy`, `Deep relaxation`],
      },
      {
        name: `Sport Massage`,
        desc: `A targeted therapy designed to relieve muscle tension, improve flexibility, and aid in the recovery process after physical activity, working to prevent injury and reduce soreness.`,
        duration: `60/90 Mins`,
        suitableFor: `Athletes, active individuals, muscle recovery`,
        procedure: `Deep tissue massage technique targeting muscle groups`,
        downtime: `No downtime`,
        expectedResults: `Improved mobility, reduced fatigue, faster recovery`,
        price: `Rp 450.000 (60 Min) / Rp 650.000 (90 Min)`,
        keyBenefits: [`Deep tissue relief`, `Injury prevention`, `Faster recovery`],
      },
      {
        name: `IV Drip – Jet Lag Recovery`,
        desc: `An IV drip therapy specifically designed to combat fatigue and disorientation from long-distance travel, delivering fluids, vitamins, and electrolytes to restore balance and boost energy.`,
        duration: `45 Mins`,
        suitableFor: `Post-travel fatigue`,
        procedure: `IV line insertion, vitamin/electrolyte infusion`,
        downtime: `No downtime`,
        expectedResults: `Refreshed, recharged, improved alertness`,
        price: `Rp 1.100.000`,
        keyBenefits: [`Rapid rehydration`, `Boosted energy`, `Restored balance`],
      },
      {
        name: `IV Drip – Pre-Party Boost`,
        desc: `An invigorating IV drip therapy designed to prepare you for a night of celebration, delivering vitamins, minerals, and hydration to enhance energy and vitality.`,
        duration: `45 Mins`,
        suitableFor: `Pre-event energy boost`,
        procedure: `IV line insertion, customized vitamin infusion`,
        downtime: `No downtime`,
        expectedResults: `Revitalized, luminous complexion, increased stamina`,
        price: `Rp 1.100.000`,
        keyBenefits: [`Energy boost`, `Luminous complexion`, `Increased stamina`],
      },
      {
        name: `IV Drip – Hangover Recovery`,
        desc: `An effective IV drip therapy designed to alleviate discomfort of post-celebration fatigue, replenishing fluids, electrolytes, and vitamins to combat dehydration.`,
        duration: `45 Mins`,
        tag: `Most Popular`,
        suitableFor: `Hangover, dehydration`,
        procedure: `IV line insertion, restorative electrolyte/vitamin infusion`,
        downtime: `No downtime`,
        expectedResults: `Rapid relief from headaches and fatigue`,
        price: `Rp 1.300.000`,
        keyBenefits: [`Fast relief`, `Rehydration`, `Renewed clarity`],
      },
      {
        name: `IV Drip – Bali Belly Recovery`,
        desc: `An essential IV drip therapy tailored to alleviate discomfort of digestive issues often experienced while traveling, delivering fluids, electrolytes, and nutrients to rehydrate the body.`,
        duration: `45 Mins`,
        suitableFor: `Digestive upset, traveler's illness`,
        procedure: `IV line insertion, rehydration/electrolyte infusion`,
        downtime: `No downtime`,
        expectedResults: `Reduced nausea and bloating, restored energy`,
        price: `Rp 1.500.000`,
        keyBenefits: [`Digestive relief`, `Rehydration`, `Restored energy`],
      },
      {
        name: `IV Drip – Forever Young`,
        desc: `A rejuvenating IV drip therapy designed to promote vitality and enhance natural glow, combining antioxidants, vitamins, and hydration to support skin health and combat aging.`,
        duration: `45 Mins`,
        suitableFor: `Anti-aging, skin vitality support`,
        procedure: `IV line insertion, antioxidant/vitamin infusion`,
        downtime: `No downtime`,
        expectedResults: `Invigorated feeling with radiant complexion`,
        price: `Rp 900.000`,
        keyBenefits: [`Antioxidant boost`, `Radiant complexion`, `Youthful enthusiasm`],
      },
      {
        name: `IV Drip – Active Fit Boost`,
        desc: `A dynamic IV drip therapy tailored for those seeking to enhance physical performance and recovery, delivering essential nutrients, electrolytes, and hydration to support muscle function.`,
        duration: `45 Mins`,
        suitableFor: `Athletes, active lifestyle support`,
        procedure: `IV line insertion, nutrient/electrolyte infusion`,
        downtime: `No downtime`,
        expectedResults: `Increased energy, reduced fatigue, improved recovery`,
        price: `Rp 800.000`,
        keyBenefits: [`Muscle function support`, `Reduced fatigue`, `Faster recovery`],
      },
    ]
  },
  {
    id: 'hair',
    slug: 'hair',
    name: 'Hair',
    badge: 'Scalp & Follicle Therapy',
    shortDesc: `Clinical scalp revitalizing protocols, medical hair restoration, PRP treatments, and regenerative follicle stimulation for thicker, healthier hair.`,
    fullDesc: `Address thinning hair, receding hairlines, and stressed scalp microenvironments through scientifically proven regenerative therapies and customized medical serums.`,
    img: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1000&auto=format&fit=crop',
    treatmentsCount: '20 Treatments',
    whatsappMessage: `Hello SHAZ Clinic, I would like to consult about Hair & Scalp Restoration treatments.`,
    featuredTreatments: [
      {
        name: `IV Drip – Slim & Fit`,
        desc: `A specialized IV drip therapy designed to support weight management and fitness journey, combining vitamins, minerals, and nutrients that promote metabolism and boost energy.`,
        duration: `45 Mins`,
        suitableFor: `Weight management support`,
        procedure: `IV line insertion, metabolism-supporting infusion`,
        downtime: `No downtime`,
        expectedResults: `Revitalized, improved stamina, renewed focus`,
        price: `Rp 850.000`,
        keyBenefits: [`Metabolism support`, `Boosted energy`, `Hydration`],
      },
      {
        name: `Laser Hair Removal – Areola`,
        desc: `Laser Hair Removal offers a long-lasting solution to unwanted hair, using precise laser technology to target and reduce hair growth at the root for smoother, silkier skin over time.`,
        duration: `15 Mins`,
        suitableFor: `Unwanted hair on areola area`,
        procedure: `Skin prep, targeted laser passes over area`,
        downtime: `No downtime, mild redness possible`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 350.000 (Single) / Rp 950.000 (Set 3) / Rp 1.500.000 (Set 5) / Rp 2.500.000 (Set 10)`,
        keyBenefits: [`Long-lasting reduction`, `Precise targeting`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Belly Button`,
        desc: `Laser Hair Removal targets and reduces hair growth at the root around the belly button area, leaving skin smoother with fewer ingrown hairs over time.`,
        duration: `15 Mins`,
        suitableFor: `Unwanted hair around belly button`,
        procedure: `Skin prep, targeted laser passes over area`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 350.000 (Single) / Rp 950.000 (Set 3) / Rp 1.500.000 (Set 5) / Rp 2.500.000 (Set 10)`,
        keyBenefits: [`Long-lasting reduction`, `Precise targeting`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Chin`,
        desc: `Laser Hair Removal targets and reduces unwanted chin hair growth at the root, leaving skin smoother and reducing ingrown hairs over time.`,
        duration: `15 Mins`,
        suitableFor: `Unwanted chin hair`,
        procedure: `Skin prep, targeted laser passes over chin`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 350.000 (Single) / Rp 950.000 (Set 3) / Rp 1.500.000 (Set 5) / Rp 2.500.000 (Set 10)`,
        keyBenefits: [`Long-lasting reduction`, `Precise targeting`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Upper Lip`,
        desc: `Laser Hair Removal targets and reduces unwanted upper lip hair growth at the root, leaving skin smoother with a sleek, hair-free look.`,
        duration: `15 Mins`,
        tag: `Most Popular`,
        suitableFor: `Unwanted upper lip hair`,
        procedure: `Skin prep, targeted laser passes over upper lip`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 400.000 (Single) / Rp 1.125.000 (Set 3) / Rp 1.750.000 (Set 5) / Rp 3.000.000 (Set 10)`,
        keyBenefits: [`Long-lasting reduction`, `Precise targeting`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Upper Lip & Chin`,
        desc: `Combined laser hair removal for upper lip and chin, targeting and reducing hair growth at the root for smoother, hair-free skin.`,
        duration: `20 Mins`,
        suitableFor: `Unwanted upper lip and chin hair`,
        procedure: `Skin prep, targeted laser passes over both areas`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 500.000 (Single) / Rp 1.350.000 (Set 3) / Rp 2.000.000 (Set 5) / Rp 3.500.000 (Set 10)`,
        keyBenefits: [`Combined treatment value`, `Long-lasting reduction`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Lower Face`,
        desc: `Laser Hair Removal targets and reduces unwanted hair growth across the lower face at the root, leaving skin smoother and more refined.`,
        duration: `20 Mins`,
        suitableFor: `Unwanted lower face hair`,
        procedure: `Skin prep, targeted laser passes over lower face`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 650.000 (Single) / Rp 1.650.000 (Set 3) / Rp 2.500.000 (Set 5) / Rp 4.200.000 (Set 10)`,
        keyBenefits: [`Long-lasting reduction`, `Precise targeting`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Full Face`,
        desc: `Laser Hair Removal targets and reduces unwanted hair growth across the full face at the root, leaving skin smoother with a sleek, hair-free look.`,
        duration: `30 Mins`,
        suitableFor: `Unwanted full face hair`,
        procedure: `Skin prep, targeted laser passes over full face`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 850.000 (Single) / Rp 2.400.000 (Set 3) / Rp 3.650.000 (Set 5) / Rp 6.500.000 (Set 10)`,
        keyBenefits: [`Long-lasting reduction`, `Complete coverage`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Underarm Woman`,
        desc: `Laser Hair Removal targets and reduces unwanted underarm hair growth at the root, leaving skin smoother with fewer ingrown hairs over time.`,
        duration: `15 Mins`,
        tag: `Most Popular`,
        suitableFor: `Unwanted underarm hair (woman)`,
        procedure: `Skin prep, targeted laser passes over underarms`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 400.000 (Single) / Rp 1.100.000 (Set 3) / Rp 1.700.000 (Set 5) / Rp 3.000.000 (Set 10)`,
        keyBenefits: [`Long-lasting reduction`, `Precise targeting`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Underarm Man`,
        desc: `Laser Hair Removal targets and reduces unwanted underarm hair growth at the root, leaving skin smoother with fewer ingrown hairs over time.`,
        duration: `15 Mins`,
        suitableFor: `Unwanted underarm hair (man)`,
        procedure: `Skin prep, targeted laser passes over underarms`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 400.000 (Single) / Rp 1.100.000 (Set 3) / Rp 1.700.000 (Set 5) / Rp 3.000.000 (Set 10)`,
        keyBenefits: [`Long-lasting reduction`, `Precise targeting`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Bikini Line Woman/Man`,
        desc: `Laser Hair Removal targets and reduces unwanted bikini line hair growth at the root, leaving skin smoother with fewer ingrown hairs over time.`,
        duration: `20 Mins`,
        suitableFor: `Unwanted bikini line hair`,
        procedure: `Skin prep, targeted laser passes over bikini area`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 800.000 (Single) / Rp 2.250.000 (Set 3) / Rp 3.500.000 (Set 5) / Rp 6.000.000 (Set 10)`,
        keyBenefits: [`Long-lasting reduction`, `Precise targeting`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Brazilian Woman/Man`,
        desc: `Laser Hair Removal offers complete Brazilian-area hair reduction, targeting hair growth at the root for smoother, longer-lasting results than traditional hair removal methods.`,
        duration: `30 Mins`,
        suitableFor: `Unwanted Brazilian-area hair`,
        procedure: `Skin prep, targeted laser passes over full area`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 1.000.000 (Single) / Rp 2.700.000 (Set 3) / Rp 4.250.000 (Set 5) / Rp 7.500.000 (Set 10)`,
        keyBenefits: [`Complete coverage`, `Long-lasting reduction`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Chest Male`,
        desc: `Laser Hair Removal targets and reduces unwanted chest hair growth at the root, leaving skin smoother with fewer ingrown hairs over time.`,
        duration: `30 Mins`,
        suitableFor: `Unwanted chest hair (male)`,
        procedure: `Skin prep, targeted laser passes over chest`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 1.000.000 (Single) / Rp 2.850.000 (Set 3) / Rp 4.500.000 (Set 5) / Rp 7.500.000 (Set 10)`,
        keyBenefits: [`Long-lasting reduction`, `Precise targeting`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Abs Male`,
        desc: `Laser Hair Removal targets and reduces unwanted abdominal hair growth at the root, leaving skin smoother with fewer ingrown hairs over time.`,
        duration: `30 Mins`,
        suitableFor: `Unwanted abs/stomach hair (male)`,
        procedure: `Skin prep, targeted laser passes over abdomen`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 1.200.000 (Single) / Rp 3.300.000 (Set 3) / Rp 5.000.000 (Set 5) / Rp 9.000.000 (Set 10)`,
        keyBenefits: [`Long-lasting reduction`, `Precise targeting`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Back`,
        desc: `Laser Hair Removal targets and reduces unwanted back hair growth at the root, leaving skin smoother with fewer ingrown hairs over time.`,
        duration: `40 Mins`,
        suitableFor: `Unwanted back hair`,
        procedure: `Skin prep, targeted laser passes over back`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 1.700.000 (Single) / Rp 4.500.000 (Set 3) / Rp 7.000.000 (Set 5) / Rp 12.000.000 (Set 10)`,
        keyBenefits: [`Full back coverage`, `Long-lasting reduction`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Half Arm`,
        desc: `Laser Hair Removal targets and reduces unwanted arm hair growth at the root, leaving skin smoother and silkier over time.`,
        duration: `20 Mins`,
        suitableFor: `Unwanted half-arm hair`,
        procedure: `Skin prep, targeted laser passes over half arm`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 850.000 (Single) / Rp 2.400.000 (Set 3) / Rp 3.600.000 (Set 5) / Rp 6.500.000 (Set 10)`,
        keyBenefits: [`Long-lasting reduction`, `Precise targeting`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Full Arm`,
        desc: `Laser Hair Removal targets and reduces unwanted arm hair growth at the root across the full arm, leaving skin smoother and silkier over time.`,
        duration: `30 Mins`,
        suitableFor: `Unwanted full-arm hair`,
        procedure: `Skin prep, targeted laser passes over full arm`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 1.500.000 (Single) / Rp 4.000.000 (Set 3) / Rp 6.000.000 (Set 5) / Rp 10.000.000 (Set 10)`,
        keyBenefits: [`Full coverage`, `Long-lasting reduction`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Full Leg`,
        desc: `Laser Hair Removal targets and reduces unwanted leg hair growth at the root across the full leg, leaving skin smoother and silkier over time.`,
        duration: `45 Mins`,
        suitableFor: `Unwanted full-leg hair`,
        procedure: `Skin prep, targeted laser passes over full leg`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 2.500.000 (Single) / Rp 6.500.000 (Set 3) / Rp 10.000.000 (Set 5) / Rp 18.000.000 (Set 10)`,
        keyBenefits: [`Full coverage`, `Long-lasting reduction`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Half Leg`,
        desc: `Laser Hair Removal targets and reduces unwanted leg hair growth at the root, leaving skin smoother and silkier over time.`,
        duration: `30 Mins`,
        suitableFor: `Unwanted half-leg hair`,
        procedure: `Skin prep, targeted laser passes over half leg`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth, smoother skin over sessions`,
        price: `Rp 1.500.000 (Single) / Rp 3.600.000 (Set 3) / Rp 5.500.000 (Set 5) / Rp 9.500.000 (Set 10)`,
        keyBenefits: [`Long-lasting reduction`, `Precise targeting`, `Minimal maintenance`],
      },
      {
        name: `Laser Hair Removal – Full Body Man`,
        desc: `Comprehensive Laser Hair Removal covering the full body for men, targeting and reducing hair growth at the root for smoother, silkier skin with results that last much longer than traditional methods.`,
        duration: `90 Mins`,
        tag: `Premium`,
        suitableFor: `Full-body hair reduction (male)`,
        procedure: `Skin prep, targeted laser passes across full body`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth across the body, smoother skin over sessions`,
        price: `Rp 7.000.000 (Single) / Rp 20.400.000 (Set 3) / Rp 32.500.000 (Set 5) / Rp 50.000.000 (Set 10)`,
        keyBenefits: [`Complete full-body coverage`, `Long-lasting reduction`, `Minimal maintenance`],
      },
    ]
  },
  {
    id: 'salon',
    slug: 'salon',
    name: 'Salon',
    badge: 'Luxury Memberships',
    shortDesc: `Exclusive membership packages offering bundled treatments, salon credit, and gym access.`,
    fullDesc: `Invest in your ongoing wellness with our premium membership packages designed to deliver continuous value, bundled facial and machine treatments, and exclusive lifestyle perks.`,
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop',
    treatmentsCount: '6 Treatments',
    whatsappMessage: `Hello SHAZ Clinic, I would like to inquire about Salon Membership Packages.`,
    featuredTreatments: [
      {
        name: `Laser Hair Removal – Full Body Woman`,
        desc: `Comprehensive Laser Hair Removal covering the full body for women, targeting and reducing hair growth at the root for smoother, silkier skin with results that last much longer than traditional methods.`,
        duration: `90 Mins`,
        tag: `Premium`,
        suitableFor: `Full-body hair reduction (female)`,
        procedure: `Skin prep, targeted laser passes across full body`,
        downtime: `No downtime`,
        expectedResults: `Reduced hair growth across the body, smoother skin over sessions`,
        price: `Rp 6.000.000 (Single) / Rp 17.400.000 (Set 3) / Rp 27.500.000 (Set 5) / Rp 40.000.000 (Set 10)`,
        keyBenefits: [`Complete full-body coverage`, `Long-lasting reduction`, `Minimal maintenance`],
      },
      {
        name: `Bronze Membership Package`,
        desc: `An exclusive membership package valued at 16 million (total worth 20 million+), bundling facial and machine treatments with gym access and salon credit for ongoing value.`,
        duration: `Membership`,
        tag: `Package`,
        suitableFor: `Clients wanting bundled treatment + lifestyle perks`,
        procedure: `1 Facial Treatment, 1 Machine Treatment, 1-Month Gym Membership, 500K Shaz Salon Voucher, 20% OFF Raw Café`,
        downtime: `N/A (package)`,
        expectedResults: `Ongoing access to treatments, gym, salon credit, and café discount`,
        price: `Rp 15.000.000`,
        keyBenefits: [`Best value bundle`, `Gym access`, `Salon voucher included`, `Café discount`],
      },
      {
        name: `Silver Membership Package`,
        desc: `An exclusive membership package valued at 27 million (total worth 32 million+), bundling facial and machine treatments with extended gym access and higher salon credit.`,
        duration: `Membership`,
        tag: `Package`,
        suitableFor: `Clients wanting bundled treatment + lifestyle perks`,
        procedure: `1 Facial Treatment, 1 Machine Treatment, 3-Month Gym Membership, 1 Mil Shaz Salon Voucher, 20% OFF Raw Café`,
        downtime: `N/A (package)`,
        expectedResults: `Ongoing access to treatments, gym, salon credit, and café discount`,
        price: `Rp 25.000.000`,
        keyBenefits: [`Extended gym access`, `Higher salon voucher`, `Great value`, `Café discount`],
      },
      {
        name: `Gold Membership Package`,
        desc: `An exclusive membership package valued at 38 million (total worth 48 million+), bundling multiple facial and machine treatments with 6-month gym access and generous salon credit.`,
        duration: `Membership`,
        tag: `Package`,
        suitableFor: `Clients wanting premium bundled treatment + lifestyle perks`,
        procedure: `2 Facial Treatments, 2 Machine Treatments, 6-Month Gym Membership, 2 Mil Shaz Salon Voucher, 20% OFF Raw Café`,
        downtime: `N/A (package)`,
        expectedResults: `Ongoing access to treatments, gym, salon credit, and café discount`,
        price: `Rp 35.000.000`,
        keyBenefits: [`More treatments included`, `6-month gym access`, `Generous salon voucher`, `Café`],
      },
      {
        name: `Platinum Membership Package`,
        desc: `An exclusive membership package valued at 55 million (total worth 75 million+), bundling multiple facial and machine treatments with a full year of gym access and personal training sessions.`,
        duration: `Membership`,
        tag: `Package`,
        suitableFor: `Clients wanting comprehensive treatment + fitness bundle`,
        procedure: `3 Facial Treatments, 3 Machine Treatments, 1-Year Gym Membership, 5 Personal Training Sessions, 3 Mil Shaz Salon Voucher, 20% OFF Raw Café`,
        downtime: `N/A (package)`,
        expectedResults: `Full-year access to treatments, gym, personal training, and salon credit`,
        price: `Rp 50.000.000`,
        keyBenefits: [`1-year gym membership`, `Personal training included`, `High-value bundle`, `Café`],
      },
      {
        name: `Royal Membership Package`,
        desc: `The most exclusive membership package valued at 82 million (total worth 120 million+), bundling extensive facial and machine treatments with 2 years of gym access and 10 personal training sessions.`,
        duration: `Membership`,
        tag: `Package · Best Value`,
        suitableFor: `Clients wanting the ultimate treatment + fitness bundle`,
        procedure: `5 Facial Treatments, 6 Machine Treatments, 2-Year Gym Membership, 10 Personal Training Sessions, 5 Mil Shaz Salon Voucher, 20% OFF Raw Café`,
        downtime: `N/A (package)`,
        expectedResults: `2-year access to treatments, gym, personal training, and salon credit`,
        price: `Rp 75.000.000`,
        keyBenefits: [`Maximum treatments included`, `2-year gym membership`, `10 PT sessions`, `Highest`],
      },
    ]
  },
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
    const waNumber = initialContent?.global_whatsapp_number || "628113889999";
    const msg = customMsg || "Hello SHAZ Aesthetic Clinic, I would like to book a consultation for your treatments.";
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
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
              <div className="md:w-7/12 lg:w-8/12 flex-1 flex flex-col bg-white md:overflow-hidden">
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
                <div className="flex-1 md:overflow-y-auto p-5 sm:p-7 space-y-4 sm:space-y-5 bg-white">
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
