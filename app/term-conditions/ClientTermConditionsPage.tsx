'use client';

import React from 'react';
import { motion } from 'motion/react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-12 md:mb-16">
    <h2 className="text-2xl md:text-3xl font-serif text-brand-charcoal mb-6">{title}</h2>
    <div className="space-y-4 text-brand-charcoal/80 font-light leading-relaxed">
      {children}
    </div>
  </div>
);

const BulletList = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-3 mt-4">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 shrink-0" />
        <span className="text-brand-charcoal/80 font-light leading-relaxed flex-1">{item}</span>
      </li>
    ))}
  </ul>
);

export default function ClientTermConditionsPage({ initialContent }: { initialContent?: any }) {
  const content = initialContent || {};

  return (
    <div className="min-h-screen bg-brand-white selection:bg-brand-sage/20 selection:text-brand-forest overflow-hidden flex flex-col font-sans">
      <GlobalHeader transparent={false} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[#EAE6E1] relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-charcoal mb-6">
              {content.terms_hero_title || 'Terms & Conditions'}
            </h1>
            <p className="text-brand-charcoal/70 text-lg md:text-xl font-light max-w-2xl mx-auto">
              {content.terms_hero_subtitle || 'Terms governing your use of our website and clinic services'}
            </p>
            <div className="mt-8 pt-8 border-t border-brand-charcoal/10 inline-block">
              <p className="text-xs font-bold tracking-widest text-brand-charcoal/60 uppercase">
                {content.terms_effective_date ? `Effective Date: ${content.terms_effective_date}` : 'Effective Date: 1 September 2026'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white flex-grow">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            
            <Section title="1. Acceptance of Terms">
              <p>
                These Terms & Conditions ("Terms") govern your access to and use of the website 
                <a href="https://shazaestheticbali.com" className="text-[#D4AF37] hover:text-brand-charcoal transition-colors ml-1">shazaestheticbali.com</a> (the 
                "Website") and the aesthetic medicine, dermatology, and salon services (the "Services") provided by SHAZ 
                Aesthetic Clinic & Salon ("SHAZ", "we", "us", or "our") at our clinic in Seminyak, Bali, Indonesia. By accessing our 
                Website, booking a consultation, or receiving treatment, you agree to be bound by these Terms. If you do not 
                agree, please refrain from using our Website or Services.
              </p>
            </Section>

            <Section title="2. Eligibility">
              <p>
                Our Services are intended for individuals aged 18 years and above. Patients under the age of 18 may only receive 
                treatment with the written consent and presence of a parent or legal guardian, subject to clinical assessment and 
                applicable medical regulations.
              </p>
            </Section>

            <Section title="3. Consultations and Medical Assessment">
              <BulletList items={[
                "All aesthetic and dermatology treatments at SHAZ require a prior consultation with one of our licensed doctors or practitioners.",
                "Our doctors reserve the right to decline, postpone, or modify any treatment based on medical assessment, contraindications, or if a treatment is deemed unsuitable for your health condition.",
                "You are required to disclose accurate and complete information regarding your medical history, allergies, medications, and any relevant health conditions. SHAZ is not liable for complications arising from incomplete or inaccurate disclosures.",
                "Treatment outcomes vary between individuals due to biological, lifestyle, and anatomical factors. SHAZ does not guarantee specific aesthetic results."
              ]} />
            </Section>

            <Section title="4. Bookings, Appointments, and Cancellations">
              <BulletList items={[
                "Appointments may be booked via WhatsApp, our Website, or in person, and are subject to availability.",
                "We recommend rescheduling or cancelling appointments at least 24 hours in advance. Late cancellations, no-shows, or repeated rescheduling may be subject to a cancellation fee or forfeiture of deposit, as communicated at the time of booking.",
                "SHAZ reserves the right to reschedule appointments due to doctor availability, medical emergencies, or operational circumstances, and will make reasonable efforts to notify you promptly."
              ]} />
            </Section>

            <Section title="5. Payments, Packages, and Refunds">
              <BulletList items={[
                "Full or partial payment may be required at the time of booking or prior to treatment, depending on the service or package selected.",
                "Prices for treatments and packages are as listed on our Website or as communicated by our client care team, and are subject to change without prior notice, except for services already booked and confirmed.",
                "Treatment packages and prepaid sessions are non-transferable to third parties unless expressly agreed by SHAZ in writing.",
                "Refunds, where applicable, are assessed on a case-by-case basis in accordance with our internal refund policy, which will be explained to you upon request or at the point of purchase. Fees for services already rendered are generally non-refundable."
              ]} />
            </Section>

            <Section title="6. Patient Responsibilities and Aftercare">
              <BulletList items={[
                "You agree to follow all pre-treatment and aftercare instructions provided by our doctors and practitioners.",
                "Failure to follow aftercare instructions may affect treatment outcomes and increase the risk of complications, for which SHAZ shall not be held liable.",
                "You agree to promptly inform SHAZ of any adverse reactions or complications following treatment, so that appropriate medical follow-up can be provided."
              ]} />
            </Section>

            <Section title="7. Use of Photographs and Testimonials">
              <p>
                With your separate, explicit consent, SHAZ may capture and use before-and-after photographs, videos, or 
                testimonials for medical documentation, treatment tracking, and, where consented, for marketing and 
                promotional purposes across our Website and social media platforms (Instagram, TikTok). You may withdraw this 
                consent at any time by contacting us, without affecting materials already published prior to withdrawal, which we 
                will make reasonable efforts to remove upon request.
              </p>
            </Section>

            <Section title="8. Website Use">
              <BulletList items={[
                "The content on our Website, including text, images, logos, and design, is the property of SHAZ or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use our content for commercial purposes without prior written consent.",
                "You agree not to use our Website for any unlawful purpose or in any manner that could damage, disable, or impair the Website.",
                "Information on our Website, including treatment descriptions, is provided for general informational purposes only and does not constitute medical advice. Please consult our doctors directly for personalized medical guidance."
              ]} />
            </Section>

            <Section title="9. Limitation of Liability">
              <p>
                To the fullest extent permitted under applicable Indonesian law, SHAZ shall not be liable for any indirect, 
                incidental, or consequential damages arising from your use of our Website or Services, including but not limited 
                to dissatisfaction with aesthetic outcomes that were achieved in accordance with accepted medical standards and 
                with your informed consent. Nothing in these Terms limits SHAZ's liability for negligence causing injury, to the 
                extent such limitation is not permitted by law.
              </p>
            </Section>

            <Section title="10. Indemnity">
              <p>
                You agree to indemnify and hold SHAZ, its doctors, staff, and affiliates harmless from any claims, damages, or 
                expenses arising from your breach of these Terms, provision of inaccurate medical information, or failure to follow 
                aftercare instructions.
              </p>
            </Section>

            <Section title="11. Privacy">
              <p>
                Your use of our Website and Services is also governed by our Privacy Policy, which explains how we collect, use, 
                and protect your personal and medical information. By using our Services, you consent to the practices described 
                therein.
              </p>
            </Section>

            <Section title="12. Governing Law and Dispute Resolution">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the Republic of Indonesia. Any 
                disputes arising from these Terms or your use of our Services shall first be attempted to be resolved amicably 
                through good-faith discussion, and, failing that, shall be subject to the exclusive jurisdiction of the applicable 
                courts in Bali, Indonesia.
              </p>
            </Section>

            <Section title="13. Amendments">
              <p>
                SHAZ reserves the right to amend or update these Terms at any time. Any changes will be posted on this page with 
                a revised effective date, and continued use of our Website or Services after such changes constitutes your 
                acceptance of the updated Terms.
              </p>
            </Section>

            <Section title="14. Contact Us">
              <p>
                For questions regarding these Terms & Conditions, please contact us:
              </p>
              <BulletList items={[
                <><strong>Email:</strong> <a href={`mailto:${content.terms_contact_email || 'shazaestheticbali@gmail.com'}`} className="text-[#D4AF37] hover:text-brand-charcoal transition-colors">{content.terms_contact_email || 'shazaestheticbali@gmail.com'}</a></>,
                <><strong>WhatsApp / Phone:</strong> <a href={`https://wa.me/${(content.terms_contact_phone || '+62 823-4217-6585').replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="text-[#D4AF37] hover:text-brand-charcoal transition-colors">{content.terms_contact_phone || '+62 823-4217-6585'}</a></>,
                <><strong>Clinic Address:</strong> {content.terms_contact_address || 'Seminyak, Bali, Indonesia'}</>
              ]} />
              <p className="mt-8 pt-6 border-t border-brand-charcoal/10 text-sm italic text-brand-charcoal/60">
                Last updated: {content.terms_last_updated || '1 September 2026'}
              </p>
            </Section>

          </motion.div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
