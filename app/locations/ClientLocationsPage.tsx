'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Sparkles, Phone, ArrowRight } from 'lucide-react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import Image from 'next/image';
import Link from 'next/link';

const DEFAULT_LOCATIONS = [
  {
    id: 'shaz-main',
    name: 'Shaz Main Clinic',
    address: 'Jl. Petitenget No.12, Kerobokan Kelod, Kec. Kuta Utara, Kab. Badung, Bali 80361',
    hours: 'Monday - Sunday, 10:00 - 19:00',
    facilities: ['Premium Treatment Rooms', 'Private Consultation', 'Post-Treatment Lounge', 'Valet Parking'],
    phone: '+62 811 388 9999',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80', // Premium clinic placeholder
    mapQuery: 'Jl. Petitenget No.12, Kerobokan Kelod, Bali',
  },
  {
    id: 'shaz-canggu',
    name: 'Shaz Aesthetic Canggu',
    address: 'Jl. Subak Sari No.1, Canggu, Kec. Kuta Utara, Kab. Badung, Bali 80361',
    hours: 'Monday - Sunday, 10:00 - 19:00',
    facilities: ['Aesthetic Rooms', 'VIP Suite', 'Product Boutique', 'Parking Area'],
    phone: '+62 811 388 8888',
    image: 'https://images.unsplash.com/photo-1582885918730-221666e1471b?auto=format&fit=crop&q=80', // Premium clinic placeholder
    mapQuery: 'Jl. Subak Sari No.1, Canggu, Bali',
  }
];

export default function ClientLocationsPage({ initialContent }: { initialContent?: any }) {
  // Hero section data
  const heroTitle = initialContent?.locations_hero_title || "Visit Our";
  const heroSubtitle = initialContent?.locations_hero_subtitle || "Locations.";
  const heroDesc = initialContent?.locations_hero_desc || "Step into a world of refined elegance and absolute comfort. Each of our locations in Bali is meticulously designed to provide you with the ultimate aesthetic experience.";
  const heroBadge = initialContent?.locations_hero_badge || "Our Spaces";

  // Branches data
  let locations = DEFAULT_LOCATIONS;
  if (initialContent?.locations_branches) {
    try {
      const parsed = JSON.parse(initialContent.locations_branches);
      if (Array.isArray(parsed) && parsed.length > 0) {
        locations = parsed;
      }
    } catch (e) {
      console.error("Failed to parse locations_branches", e);
    }
  }

  return (
    <div className="min-h-screen bg-brand-white selection:bg-[#D4AF37]/20 selection:text-brand-charcoal overflow-hidden">
      <GlobalHeader initialContent={initialContent} />

      <main className="pt-32 pb-20">
        {/* HERO SECTION */}
        <section className="relative px-6 py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-brand-sage/5 blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#D4AF37]/5 blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em]">{heroBadge}</span>
                <div className="h-[1px] w-8 bg-[#D4AF37]" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-serif text-brand-charcoal leading-tight mb-6">
                {heroTitle} <br />
                <span className="italic text-brand-charcoal/80">{heroSubtitle}</span>
              </h1>
              
              <p className="text-lg text-brand-charcoal/70 leading-relaxed max-w-2xl mx-auto">
                {heroDesc}
              </p>
            </motion.div>
          </div>
        </section>

        {/* LOCATIONS LIST */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-24">
              {locations.map((location, index) => (
                <motion.div 
                  key={location.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  
                  transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                  className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
                >
                  {/* Image Column */}
                  <div className={`w-full lg:w-1/2 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-brand-beige/20">
                      {location.image && (
                        <Image 
                          src={location.image}
                          alt={location.name}
                          fill
                          referrerPolicy="no-referrer"
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-brand-charcoal/10 hover:bg-transparent transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`w-full lg:w-1/2 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h2 className="text-3xl md:text-4xl font-serif text-brand-charcoal mb-8">{location.name}</h2>
                    
                    <div className="space-y-6 mb-10">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                        <div>
                          <h4 className="text-sm font-bold text-brand-charcoal mb-1 uppercase tracking-wider">Address</h4>
                          <p className="text-brand-charcoal/70">{location.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Clock className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                        <div>
                          <h4 className="text-sm font-bold text-brand-charcoal mb-1 uppercase tracking-wider">Opening Hours</h4>
                          <p className="text-brand-charcoal/70">{location.hours}</p>
                        </div>
                      </div>

                      {location.facilities && location.facilities.length > 0 && (
                        <div className="flex items-start gap-4">
                          <Sparkles className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                          <div>
                            <h4 className="text-sm font-bold text-brand-charcoal mb-1 uppercase tracking-wider">Facilities</h4>
                            <p className="text-brand-charcoal/70">{location.facilities.join(' • ')}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        <Phone className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                        <div>
                          <h4 className="text-sm font-bold text-brand-charcoal mb-1 uppercase tracking-wider">Contact</h4>
                          <p className="text-brand-charcoal/70">{location.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      {location.phone && (
                        <Link
                          href={`https://wa.me/${location.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-charcoal text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all shadow-lg hover:shadow-[#D4AF37]/20"
                        >
                          Book Appointment
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                      
                      {location.address && (
                        <Link
                          href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-brand-charcoal/20 text-brand-charcoal rounded-full text-sm font-bold uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                        >
                          Get Directions
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MAP EMBEDS */}
        <section className="py-24 bg-brand-white">
          <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-16">
              <h2 className="text-3xl font-serif text-brand-charcoal mb-4">Find Us on the Map</h2>
              <p className="text-brand-charcoal/60">Navigate to our clinics easily via Google Maps.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {locations.map((location) => (
                <div key={`${location.id}-map`} className="bg-white p-4 rounded-3xl shadow-xl border border-brand-beige">
                  <h3 className="text-lg font-serif text-brand-charcoal mb-4 px-2">{location.name}</h3>
                  <div className="w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden bg-brand-beige/30">
                    {location.mapQuery ? (
                      <iframe 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        loading="lazy" 
                        allowFullScreen 
                        referrerPolicy="no-referrer-when-downgrade" 
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      ></iframe>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-charcoal/40 font-medium">
                        No map data provided
                      </div>
                    )}
                  </div>
                </div>
               ))}
            </div>
          </div>
        </section>

      </main>

      <GlobalFooter initialContent={initialContent} />
    </div>
  );
}
