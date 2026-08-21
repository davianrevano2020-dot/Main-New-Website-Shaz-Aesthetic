'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const WA_LINK = "https://wa.link/o7f5yk";
const DEFAULT_LOGO = "https://thinkgenc.com/image-file/shaz-logo-transparan.svg";
const DEFAULT_MENU = [
  { id: '1', label: 'About', url: '#about', newTab: false },
  { id: '2', label: 'Treatments', url: '#treatments', newTab: false },
  { id: '3', label: 'Packages', url: '#packages', newTab: false },
  { id: '4', label: 'Doctors', url: '#doctors', newTab: false },
  { id: '5', label: 'Reviews', url: '#reviews', newTab: false },
];

export default function GlobalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logo, setLogo] = useState(DEFAULT_LOGO);
  const [menuItems, setMenuItems] = useState(DEFAULT_MENU);
  const [ctaText, setCtaText] = useState('Book Consultation');
  const [ctaLink, setCtaLink] = useState(WA_LINK);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Fetch global content
    fetch('/api/content')
      .then(res => res.json())
      .then(json => {
        if (json.status === 'success' && json.data) {
          if (json.data.global_logo) {
            setLogo(json.data.global_logo);
          }
          if (json.data.global_cta_text) {
            setCtaText(json.data.global_cta_text);
          }
          if (json.data.global_cta_link) {
            setCtaLink(json.data.global_cta_link);
          }
          if (json.data.global_menu) {
            try {
              const parsed = JSON.parse(json.data.global_menu);
              if (Array.isArray(parsed) && parsed.length > 0) {
                setMenuItems(parsed);
              }
            } catch (e) {
              console.error("Failed to parse global_menu", e);
            }
          }
        }
      })
      .catch(err => console.log("Using default header data (fetch failed)"));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent ${
        isScrolled ? 'bg-brand-white/95 backdrop-blur-md shadow-sm py-4 border-brand-beige/50' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <a href="#" aria-label="SHAZ Home" className="relative z-50">
          <img 
            src={logo} 
            alt="SHAZ Logo" 
            className={`w-auto object-contain ${isScrolled ? "h-7 md:h-8" : "h-8 md:h-10 transition-all duration-500"}`} 
          />
        </a>
        
        <nav className="hidden lg:flex items-center gap-10 text-xs font-bold tracking-widest uppercase">
          {menuItems.map(item => (
            <a 
              key={item.id}
              href={item.url} 
              target={item.newTab ? "_blank" : undefined}
              rel={item.newTab ? "noopener noreferrer" : undefined}
              className="hover:text-brand-sage transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a 
            href={ctaLink}
            target="_blank" rel="noopener noreferrer"
            className="bg-brand-forest text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-brand-charcoal transition-colors inline-flex items-center gap-2"
          >
            {ctaText}
          </a>
        </div>

        <button 
          className="lg:hidden p-2 -mr-2 relative z-50 text-brand-charcoal"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full h-screen bg-brand-white border-t border-brand-beige shadow-2xl flex flex-col pt-10 px-6 pb-32"
          >
            <nav className="flex flex-col gap-8 text-2xl font-serif text-brand-charcoal">
              {menuItems.map(item => (
                <a 
                  key={item.id}
                  href={item.url} 
                  target={item.newTab ? "_blank" : undefined}
                  rel={item.newTab ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto">
              <a 
                href={ctaLink}
                target="_blank" rel="noopener noreferrer"
                className="w-full bg-brand-forest text-white px-8 py-5 rounded-full text-center text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2"
              >
                {ctaText}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
