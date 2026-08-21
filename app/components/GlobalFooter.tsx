'use client';

import React, { useState, useEffect } from 'react';

interface GlobalFooterProps {
  initialContent?: Record<string, any>;
}

export default function GlobalFooter({ initialContent }: GlobalFooterProps) {
  const [content, setContent] = useState<any>(initialContent || {});

  useEffect(() => {
    if (!initialContent) {
      const fetchContent = async () => {
        try {
          const res = await fetch('/api/content');
          const json = await res.json();
          if (json.status === 'success' && json.data) {
            setContent(json.data);
          }
        } catch (err) {
          console.log('Using default footer content');
        }
      };
      fetchContent();
    }
  }, [initialContent]);

  return (
    <footer className="w-full">
      {/* CTA Section */}
      <div className="bg-[#4C5C44] text-white py-24 md:py-32 relative overflow-hidden">
        {/* Diagonal Background effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#596A51] transform -skew-y-12 origin-top-left scale-150 translate-y-1/2 opacity-50"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            {content.footer_title || "Your SHAZ Experience Begins Here."}
          </h2>
          <p className="text-[#EAE6E1]/80 text-lg font-light mb-12 max-w-2xl mx-auto">
            {content.footer_subtitle || "Schedule a personalized consultation with our medical experts and discover a treatment plan tailored entirely to you."}
          </p>
          <a
            href={content.footer_button_link || "#"}
            className="inline-block bg-white text-[#4C5C44] font-bold tracking-widest text-xs uppercase px-10 py-4 rounded-full hover:bg-[#EAE6E1] transition-colors shadow-lg"
          >
            {content.footer_button_text || "BOOK CONSULTATION"}
          </a>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="bg-[#3A3632] text-white/80 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Logo & Tagline */}
            <div className="md:col-span-4">
              {content.footer_logo ? (
                <img src={content.footer_logo} alt="SHAZ Logo" className="h-10 mb-6" />
              ) : (
                <div className="font-serif text-3xl text-white mb-6">SHAZ</div>
              )}
              <p className="text-sm font-light">
                {content.footer_tagline || "Refined by Medical Expertise."}
              </p>
            </div>

            {/* Links Grid */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              
              {/* Explore */}
              <div>
                <h4 className="text-white font-bold tracking-widest text-xs uppercase mb-6">Explore</h4>
                <ul className="space-y-4 text-sm font-light">
                  <li><a href={content.footer_explore_1_link || "#treatments"} className="hover:text-white transition-colors">{content.footer_explore_1_text || "Treatments"}</a></li>
                  <li><a href={content.footer_explore_2_link || "#packages"} className="hover:text-white transition-colors">{content.footer_explore_2_text || "Packages"}</a></li>
                  <li><a href={content.footer_explore_3_link || "#doctors"} className="hover:text-white transition-colors">{content.footer_explore_3_text || "Our Doctors"}</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white font-bold tracking-widest text-xs uppercase mb-6">Contact</h4>
                <ul className="space-y-4 text-sm font-light">
                  <li><a href={content.footer_contact_whatsapp_link || "#"} className="hover:text-white transition-colors">{content.footer_contact_whatsapp || "WhatsApp Us"}</a></li>
                  <li><a href={`mailto:${content.footer_contact_email || "hello@shazaestheticbali.com"}`} className="hover:text-white transition-colors">{content.footer_contact_email || "hello@shazaestheticbali.com"}</a></li>
                  <li><a href={`tel:${content.footer_contact_phone || "+62 811 388 999 9"}`} className="hover:text-white transition-colors">{content.footer_contact_phone || "+62 811 388 999 9"}</a></li>
                </ul>
              </div>

              {/* Follow */}
              <div>
                <h4 className="text-white font-bold tracking-widest text-xs uppercase mb-6">Follow</h4>
                <ul className="space-y-4 text-sm font-light">
                  <li><a href={content.footer_social_instagram_link || "#"} className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href={content.footer_social_tiktok_link || "#"} className="hover:text-white transition-colors">TikTok</a></li>
                  <li><a href={content.footer_social_facebook_link || "#"} className="hover:text-white transition-colors">Facebook</a></li>
                </ul>
              </div>
              
            </div>
          </div>

          {/* Bottom Row */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light">
            <p>{content.footer_copyright || "© 2026 SHAZ Aesthetic Clinic. All rights reserved."}</p>
            <div className="flex items-center gap-6">
              <a href={content.footer_privacy_link || "#"} className="hover:text-white transition-colors">Privacy Policy</a>
              <a href={content.footer_terms_link || "#"} className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
