'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

const defaultFaqs = [
  {
    category: 'Booking & Policies',
    question: 'How do I book an appointment for a treatment?',
    answer: 'You can seamlessly book an appointment through our online booking portal, by reaching out via WhatsApp, or by calling our clinics directly. We highly recommend booking in advance to secure your preferred date and time.'
  },
  {
    category: 'Booking & Policies',
    question: 'What is your cancellation and rescheduling policy?',
    answer: 'We value the time of our medical professionals and patients. We kindly request at least 24 hours notice for any cancellations or rescheduling. Late cancellations or no-shows may be subject to a nominal fee.'
  },
  {
    category: 'Consultation & Treatments',
    question: 'Do I need a consultation before my first treatment?',
    answer: 'Yes, a comprehensive consultation is an essential first step. Our medical experts will evaluate your unique facial anatomy and skin condition, listen to your goals, and tailor a highly personalized treatment plan designed specifically for you.'
  },
  {
    category: 'Consultation & Treatments',
    question: 'Who will be performing my aesthetic treatments?',
    answer: 'All procedures at SHAZ Aesthetic Clinic are performed exclusively by our team of certified, highly trained medical doctors and aesthetic nurses, ensuring the highest standards of safety, precision, and natural-looking results.'
  },
  {
    category: 'Recovery & Aftercare',
    question: 'Will there be any downtime after my procedure?',
    answer: 'Downtime varies depending on the specific treatment. Many of our non-invasive procedures require minimal to zero downtime, allowing you to return to your daily routine immediately. Your doctor will provide a detailed timeline during your consultation.'
  },
  {
    category: 'Recovery & Aftercare',
    question: 'What does the recovery process involve?',
    answer: 'Post-treatment care is crucial for optimal results. We provide comprehensive, step-by-step aftercare instructions tailored to your procedure. Our medical team remains accessible for any follow-up questions to ensure a smooth, comfortable recovery.'
  },
  {
    category: 'Billing & Insurance',
    question: 'Where can I find information about pricing?',
    answer: 'Our pricing is highly individualized based on the custom treatment plan designed for you. During your initial consultation, we will provide a fully transparent, detailed cost breakdown before proceeding with any treatment.'
  },
  {
    category: 'Billing & Insurance',
    question: 'What forms of payment do you accept?',
    answer: 'We accept all major credit and debit cards, secure bank transfers, and cash. For details regarding installment plans or specialized financing, please consult with our front desk concierge.'
  },
  {
    category: 'Billing & Insurance',
    question: 'Do you accept health insurance for aesthetic procedures?',
    answer: 'Because our treatments are primarily cosmetic and aesthetic in nature, they are generally not covered by standard health insurance providers. We ensure complete transparency regarding costs prior to your procedure.'
  },
  {
    category: 'Facilities',
    question: 'Is parking available at your clinic locations?',
    answer: 'Yes, we offer complimentary, secure private parking for all patients at both our Main Clinic in Seminyak/Kerobokan and our Canggu branch, ensuring a stress-free arrival.'
  }
];

interface ClientFaqPageProps {
  initialContent?: Record<string, any>;
}

export default function ClientFaqPage({ initialContent }: ClientFaqPageProps) {
  const content = initialContent || {};
  
  let faqs = defaultFaqs;
  try {
    if (content.faq_list) {
      const parsed = JSON.parse(content.faq_list);
      if (Array.isArray(parsed) && parsed.length > 0) {
        faqs = parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse faqs', e);
  }
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-white selection:bg-[#D4AF37]/20 selection:text-brand-charcoal flex flex-col">
      <GlobalHeader initialContent={initialContent} />

      <main className="flex-grow pt-32 pb-20">
        
        {/* HERO SECTION */}
        <section className="relative px-6 py-16 md:py-24">
          <div className="max-w-7xl mx-auto text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-brand-forest font-semibold tracking-[0.2em] text-xs uppercase mb-4 block"
            >
              {content.faq_hero_subtitle || 'Knowledge Base'}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-tight max-w-3xl mx-auto mb-6"
            >
              {content.faq_hero_title || 'Frequently Asked Questions'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-charcoal/60 max-w-xl mx-auto text-lg leading-relaxed"
            >
              {content.faq_hero_description || 'Find clear, detailed answers regarding our booking process, consultations, treatments, recovery, and clinic policies.'}
            </motion.p>
          </div>
        </section>

        {/* FAQ LIST SECTION */}
        <section className="px-6 py-12">
          <div className="max-w-3xl mx-auto">
            {(() => {
              const elements: React.ReactNode[] = [];
              let currentCategory = '';

              faqs.forEach((faq, index) => {
                // Add category header if it changes
                if (faq.category !== currentCategory) {
                  currentCategory = faq.category;
                  elements.push(
                    <motion.h3 
                      key={`cat-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-brand-forest font-semibold tracking-widest text-xs uppercase mt-16 mb-6 first:mt-0"
                    >
                      {currentCategory}
                    </motion.h3>
                  );
                }

                // Add FAQ item
                elements.push(
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="border-b border-brand-beige last:border-b-0"
                  >
                    <button 
                      onClick={() => toggleFaq(index)} 
                      className="w-full flex items-center justify-between py-6 text-left group focus:outline-none"
                    >
                      <span className={`font-serif text-lg md:text-xl transition-colors pr-8 ${openIndex === index ? 'text-[#D4AF37]' : 'text-brand-charcoal group-hover:text-[#D4AF37]'}`}>
                        {faq.question}
                      </span>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${openIndex === index ? 'bg-brand-charcoal border-brand-charcoal text-white transform rotate-180' : 'bg-transparent border-brand-beige text-brand-charcoal group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]'}`}>
                         <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pr-12">
                            <p className="text-brand-charcoal/70 leading-relaxed md:text-lg">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              });

              return elements;
            })()}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-6 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-[#F9F8F6] rounded-2xl p-10 md:p-16 text-center border border-brand-beige"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-brand-beige text-brand-charcoal">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-4">{content.faq_cta_title || 'Still have questions?'}</h2>
            <p className="text-brand-charcoal/60 mb-8 max-w-lg mx-auto text-lg">
              {content.faq_cta_description || "Can\"Can't find the answer you'rapos;t find the answer you\"Can't find the answer you'rapos;re looking for? Our team is always here to help you with any inquiries."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={initialContent?.global_cta_link || "https://wa.link/o7f5yk"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-white rounded-lg hover:bg-brand-charcoal transition-colors flex items-center justify-center gap-2"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link 
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-brand-charcoal text-brand-charcoal rounded-lg hover:bg-brand-charcoal hover:text-white transition-colors flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      <GlobalFooter initialContent={initialContent} />
    </div>
  );
}
