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

const SubSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mt-8 mb-6">
    <h3 className="text-xl font-serif text-brand-charcoal mb-4">{title}</h3>
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

export default function ClientPrivacyPolicyPage({ initialContent }: { initialContent?: any }) {
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
              {content.privacy_hero_title || 'Privacy Policy'}
            </h1>
            <p className="text-brand-charcoal/70 text-lg md:text-xl font-light max-w-2xl mx-auto">
              {content.privacy_hero_subtitle || 'How we collect, use, and protect your personal and medical information'}
            </p>
            <div className="mt-8 pt-8 border-t border-brand-charcoal/10 inline-block">
              <p className="text-xs font-bold tracking-widest text-brand-charcoal/60 uppercase">
                {content.privacy_effective_date ? `Effective Date: ${content.privacy_effective_date}` : 'Effective Date: 1 September 2026'}
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
            
            <Section title="1. Introduction">
              <p>
                SHAZ Aesthetic Clinic & Salon ("SHAZ", "we", "us", or "our") operates the website 
                <a href="https://shazaestheticbali.com" className="text-[#D4AF37] hover:text-brand-charcoal transition-colors ml-1">shazaestheticbali.com</a> and 
                provides aesthetic medicine, dermatology, and salon services from our clinic in Seminyak, Bali, Indonesia ("Clinic").
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
                website, communicate with us through WhatsApp or other channels, book a consultation, or receive treatment at 
                our Clinic.
              </p>
              <p>
                By using our website or booking a consultation or treatment with us, you acknowledge that you have read and 
                understood this Privacy Policy. If you do not agree with any part of this Policy, please do not use our website or 
                services.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <SubSection title="2.1 Information You Provide Directly">
                <BulletList items={[
                  "Full name, gender, date of birth, and contact details (phone number, email address, WhatsApp number)",
                  "Identity information such as ID/passport number, when required for medical records or invoicing",
                  "Health and medical information, including medical history, allergies, current medications, skin conditions, previous aesthetic or cosmetic procedures, and any information disclosed during consultation",
                  "Photographs and imaging (before/after photos, skin analysis scans) taken for treatment planning, documentation, and progress tracking",
                  "Payment and billing information, including invoicing details (we do not store full card numbers; payments are processed by our payment partners)",
                  "Messages, enquiries, and correspondence sent via WhatsApp, email, Instagram, TikTok, or our website contact/booking forms",
                  "Reviews, testimonials, or feedback you choose to share with us"
                ]} />
              </SubSection>

              <SubSection title="2.2 Information Collected Automatically">
                <BulletList items={[
                  "Website usage data such as pages visited, time spent, referring website, and general location, collected via cookies and analytics tools",
                  "Device and browser information, including IP address, browser type, and operating system"
                ]} />
              </SubSection>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <BulletList items={[
                "Schedule, confirm, and manage your consultations and treatment appointments",
                "Enable our doctors and aesthetic practitioners to assess your suitability for treatments and design bespoke, individualized treatment protocols",
                "Maintain accurate medical records as required by applicable healthcare regulations in Indonesia",
                "Process payments, issue invoices, and manage packages or membership benefits",
                "Communicate with you regarding appointments, aftercare instructions, promotions, and clinic updates (where you have consented to receive such communications)",
                "Improve our website, services, and patient experience",
                "Comply with legal, regulatory, and medical record-keeping obligations",
                "Protect the safety, rights, and property of our patients, staff, and Clinic"
              ]} />
            </Section>

            <Section title="4. Legal Basis for Processing">
              <p>
                We process your personal data on the basis of: your consent (particularly for medical treatment and marketing 
                communications); the necessity of processing to perform our services to you; compliance with legal and medical 
                regulatory obligations in Indonesia; and our legitimate interests in operating and improving our Clinic and website, 
                provided such interests do not override your fundamental rights.
              </p>
            </Section>

            <Section title="5. Sensitive and Medical Information">
              <p>
                Given the nature of our services, we collect health-related and, at times, sensitive personal information. We treat 
                this information with heightened confidentiality. Access to medical records and treatment photographs is 
                restricted to doctors, licensed practitioners, and authorized clinic staff directly involved in your care. Before-and-after 
                photographs are only used for external marketing, social media, or promotional purposes with your explicit, 
                separate, written consent, and you may withdraw that consent at any time.
              </p>
            </Section>

            <Section title="6. How We Share Your Information">
              <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>
              <BulletList items={[
                "With doctors, nurses, and staff within SHAZ who are directly involved in providing your care",
                "With third-party service providers who support our operations, such as payment processors, appointment/booking platforms, IT and hosting providers, and courier services for product delivery, under confidentiality obligations",
                "With regulatory authorities, insurers, or legal bodies where required by Indonesian law, court order, or to protect health and safety",
                "With your explicit consent, such as when sharing before/after images for marketing purposes"
              ]} />
            </Section>

            <Section title="7. Data Storage and Security">
              <p>
                We implement reasonable administrative, technical, and physical safeguards designed to protect your personal 
                and medical information from unauthorized access, alteration, disclosure, or destruction. Medical records and 
                treatment photographs are stored in access-controlled systems. While we take data protection seriously, no 
                method of electronic storage or transmission is completely secure, and we cannot guarantee absolute security.
              </p>
              <p>
                We retain your personal and medical information for as long as necessary to fulfil the purposes described in this 
                Policy, including to comply with applicable Indonesian healthcare record-keeping requirements, after which it will 
                be securely deleted or anonymized.
              </p>
            </Section>

            <Section title="8. Cookies and Website Tracking">
              <p>
                <a href="https://shazaestheticbali.com" className="text-[#D4AF37] hover:text-brand-charcoal transition-colors">shazaestheticbali.com</a> may use cookies and similar tracking technologies to enhance your browsing experience, 
                analyze website traffic, and understand visitor behavior. You can control or disable cookies through your browser 
                settings; however, doing so may affect certain website functionality.
              </p>
            </Section>

            <Section title="9. Your Rights">
              <p>
                Subject to applicable Indonesian data protection law (including Law No. 27 of 2022 on Personal Data Protection), 
                you have the right to:
              </p>
              <BulletList items={[
                "Access and request a copy of the personal information we hold about you",
                "Request correction of inaccurate or incomplete information",
                "Request deletion of your personal information, subject to our legal and medical record-keeping obligations",
                "Withdraw consent for marketing communications or use of your images at any time",
                "Object to or request restriction of certain processing activities",
                <>Lodge a concern with us directly by contacting <a href="mailto:shazaestheticbali@gmail.com" className="text-[#D4AF37] hover:text-brand-charcoal transition-colors">shazaestheticbali@gmail.com</a></>
              ]} />
            </Section>

            <Section title="10. Children's Privacy">
              <p>
                Our services are intended for adults. Where treatment is sought for or by a minor, we require the consent and 
                presence of a parent or legal guardian, in accordance with our clinical and legal obligations.
              </p>
            </Section>

            <Section title="11. Third-Party Links">
              <p>
                Our website may contain links to third-party platforms such as Instagram, TikTok, or WhatsApp. We are not 
                responsible for the privacy practices of these third-party platforms, and we encourage you to review their 
                respective privacy policies.
              </p>
            </Section>

            <Section title="12. Changes to This Privacy Policy">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal 
                requirements, or other operational reasons. Any changes will be posted on this page with a revised effective date. 
                We encourage you to review this Policy periodically.
              </p>
            </Section>

            <Section title="13. Contact Us">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal 
                information, please contact us:
              </p>
              <BulletList items={[
                <><strong>Email:</strong> <a href={`mailto:${content.privacy_contact_email || 'shazaestheticbali@gmail.com'}`} className="text-[#D4AF37] hover:text-brand-charcoal transition-colors">{content.privacy_contact_email || 'shazaestheticbali@gmail.com'}</a></>,
                <><strong>WhatsApp / Phone:</strong> <a href={`https://wa.me/${(content.privacy_contact_phone || '+62 823-4217-6585').replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="text-[#D4AF37] hover:text-brand-charcoal transition-colors">{content.privacy_contact_phone || '+62 823-4217-6585'}</a></>,
                <><strong>Clinic Address:</strong> {content.privacy_contact_address || 'Seminyak, Bali, Indonesia'}</>
              ]} />
              <p className="mt-8 pt-6 border-t border-brand-charcoal/10 text-sm italic text-brand-charcoal/60">
                Last updated: {content.privacy_last_updated || '1 September 2026'}
              </p>
            </Section>

          </motion.div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
