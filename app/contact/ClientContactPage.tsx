'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  MapPin, Phone, Mail, Clock, MessageCircle, AlertCircle, 
  Instagram, Send, Loader2, CheckCircle2
} from 'lucide-react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

interface ClientContactPageProps {
  initialContent?: Record<string, any>;
}

export default function ClientContactPage({ initialContent }: ClientContactPageProps) {
  const content = initialContent || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error: any) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      alert(error.message || 'Failed to send message. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-white selection:bg-[#D4AF37]/20 selection:text-brand-charcoal flex flex-col">
      <GlobalHeader initialContent={content} />

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
              {content.contact_hero_subtitle || 'Get In Touch'}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-tight max-w-3xl mx-auto mb-6"
            >
              {content.contact_hero_title || "We're Here for You"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-charcoal/60 max-w-xl mx-auto text-lg leading-relaxed"
            >
              {content.contact_hero_description || 'Whether you have a question about our treatments, pricing, or want to schedule a consultation, our team is ready to assist you.'}
            </motion.p>
          </div>
        </section>

        {/* MAIN CONTENT GRID */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* LEFT: CONTACT FORM */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-[#F9F8F6] p-8 md:p-12 rounded-2xl border border-brand-beige"
              >
                <h3 className="text-2xl font-serif text-brand-charcoal mb-8">{content.contact_form_title || 'Send Us a Message'}</h3>
                
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16 px-4"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-2xl font-serif text-brand-charcoal mb-2">Message Sent!</h4>
                    <p className="text-brand-charcoal/60">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 text-sm text-brand-forest uppercase tracking-wider font-semibold hover:text-brand-charcoal transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-xs font-medium text-brand-charcoal/60 uppercase tracking-wider mb-2">Full Name</label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal transition-colors"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-xs font-medium text-brand-charcoal/60 uppercase tracking-wider mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal transition-colors"
                          placeholder="+62 811..."
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-brand-charcoal/60 uppercase tracking-wider mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal transition-colors"
                        placeholder="jane@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-medium text-brand-charcoal/60 uppercase tracking-wider mb-2">Subject</label>
                      <select 
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal transition-colors appearance-none"
                      >
                        <option value="" disabled>Select a topic</option>
                        <option value="Consultation">Book a Consultation</option>
                        <option value="Pricing">Pricing & Packages</option>
                        <option value="Feedback">Feedback / Review</option>
                        <option value="Other">Other Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-medium text-brand-charcoal/60 uppercase tracking-wider mb-2">Your Message</label>
                      <textarea 
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal transition-colors resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-brand-charcoal text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-white transition-all duration-300 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>

              {/* RIGHT: CONTACT INFORMATION */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-12"
              >
                <div>
                  <h3 className="text-2xl font-serif text-brand-charcoal mb-8">{content.contact_info_title || 'Contact Information'}</h3>
                  <div className="space-y-6">
                    
                    {/* WhatsApp */}
                    <div className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-white transition-colors text-brand-charcoal">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-charcoal mb-1">WhatsApp</h4>
                        <a href={content.contact_whatsapp_link || 'https://wa.link/o7f5yk'} target="_blank" rel="noopener noreferrer" className="text-brand-charcoal/60 hover:text-[#D4AF37] transition-colors">
                          {content.contact_whatsapp_number || '+62 811 388 8888'}
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-white transition-colors text-brand-charcoal">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-charcoal mb-1">Phone</h4>
                        <a href={content.contact_phone_link || 'tel:+628113888888'} className="text-brand-charcoal/60 hover:text-[#D4AF37] transition-colors">
                          {content.contact_phone_number || '+62 811 388 8888'}
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-white transition-colors text-brand-charcoal">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-charcoal mb-1">Email</h4>
                        <a href={`mailto:${content.contact_email || 'hello@shazaestheticbali.com'}`} className="text-brand-charcoal/60 hover:text-[#D4AF37] transition-colors">
                          {content.contact_email || 'hello@shazaestheticbali.com'}
                        </a>
                      </div>
                    </div>

                    {/* Address 1: Main Clinic */}
                    <div className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-white transition-colors text-brand-charcoal">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-charcoal mb-1">{content.contact_address1_title || 'Shaz Main Clinic'}</h4>
                        <p className="text-brand-charcoal/60 leading-relaxed text-sm whitespace-pre-line">
                          {content.contact_address1_text || 'Jl. Petitenget No.12, Kerobokan Kelod,\nKec. Kuta Utara, Kab. Badung,\nBali 80361'}
                        </p>
                        <a 
                          href={content.contact_address1_link || 'https://maps.google.com/?q=Jl.+Petitenget+No.12,+Kerobokan+Kelod,+Bali'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-sm font-semibold text-brand-forest hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
                        >
                          Get Directions
                        </a>
                      </div>
                    </div>

                    {/* Address 2: Canggu */}
                    <div className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-white transition-colors text-brand-charcoal">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-charcoal mb-1">{content.contact_address2_title || 'Shaz Aesthetic Canggu'}</h4>
                        <p className="text-brand-charcoal/60 leading-relaxed text-sm whitespace-pre-line">
                          {content.contact_address2_text || 'Jl. Subak Sari No.1, Canggu,\nKec. Kuta Utara, Kab. Badung,\nBali 80361'}
                        </p>
                        <a 
                          href={content.contact_address2_link || 'https://maps.google.com/?q=Jl.+Subak+Sari+No.1,+Canggu,+Bali'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-sm font-semibold text-brand-forest hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
                        >
                          Get Directions
                        </a>
                      </div>
                    </div>

                  </div>
                </div>

                <hr className="border-brand-beige" />

                {/* Operating Hours & Emergency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-brand-forest" />
                      <h4 className="font-semibold text-brand-charcoal">{content.contact_hours_title || 'Operating Hours'}</h4>
                    </div>
                    <ul className="space-y-2 text-brand-charcoal/60 text-sm">
                      <li className="flex justify-between">
                        <span>{content.contact_hours_days || 'Monday - Sunday'}</span>
                        <span>{content.contact_hours_time || '09.00 AM - 07.00 PM'}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <h4 className="font-semibold text-brand-charcoal">{content.contact_emergency_title || 'Emergency Contact'}</h4>
                    </div>
                    <p className="text-brand-charcoal/60 text-sm mb-2">
                      {content.contact_emergency_text || 'For urgent medical concerns after treatment.'}
                    </p>
                    <a href={`tel:${(content.contact_emergency_phone || '+62 811 388 8889').replace(/\s/g, '')}`} className="text-brand-charcoal font-semibold hover:text-red-500 transition-colors">
                      {content.contact_emergency_phone || '+62 811 388 8889'}
                    </a>
                  </div>
                </div>



              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <GlobalFooter initialContent={content} />
    </div>
  );
}
