import os

content = """'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Tag, 
  Clock, 
  Sparkles, 
  Gift, 
  Users,
  CheckCircle2,
  Star
} from 'lucide-react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

const WA_DEFAULT = "https://wa.link/o7f5yk";

// ----------------------------------------------------------------------
// Mock Data for Promotions
// ----------------------------------------------------------------------
const PROMOTIONS = [
  {
    id: 'promo-1',
    category: 'Current Promotions',
    title: 'Radiance Glow Up',
    desc: 'Experience our signature facial treatment combined with advanced LED light therapy for an instant, luminous glow.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop',
    icon: Sparkles,
    benefits: ['Deep Cleansing', 'LED Light Therapy', 'Hydration Boost'],
    validUntil: 'Available all month',
    tag: 'Popular'
  },
  {
    id: 'promo-2',
    category: 'Limited Offers',
    title: 'Flash Sale: Laser Rejuvenation',
    desc: 'Book within the next 48 hours to receive 20% off our premium laser resurfacing treatments. Say goodbye to hyperpigmentation.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
    icon: Clock,
    benefits: ['Tone Correction', 'Collagen Stimulation', 'Zero Downtime'],
    validUntil: 'Ends in 2 days',
    tag: 'Limited'
  },
  {
    id: 'promo-3',
    category: 'Seasonal Campaigns',
    title: 'Summer Prep Package',
    desc: 'Get your skin ready for the sun with our comprehensive summer package including gentle exfoliation and intense UV-repair hydration.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71c9?q=80&w=1200&auto=format&fit=crop',
    icon: Tag,
    benefits: ['Gentle Peeling', 'Antioxidant Infusion', 'SPF Protection Guide'],
    validUntil: 'Summer Season Only',
    tag: 'Seasonal'
  }
];

export default function ClientPromotionPage({ initialContent }: { initialContent: any }) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans selection:bg-brand-sage/30 overflow-hidden">
      <GlobalHeader initialContent={initialContent} />

      <main className="flex-1">
        {/* ----------------------------------------------------------------------
            01. FESTIVE HERO SECTION
        ---------------------------------------------------------------------- */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#FAF8F5] text-brand-charcoal border-b border-brand-beige/50">
          {/* Animated Background Gradients */}
          <div className="absolute inset-0 opacity-60 pointer-events-none">
            <motion.div 
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-bl from-[#E5E0D8]/80 to-transparent blur-3xl" 
            />
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#F3E5AB]/30 to-transparent blur-3xl" 
            />
          </div>

          {/* Festive Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -40, 0], 
                  opacity: [0.2, 0.6, 0.2],
                  rotate: [0, 90, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4 + (i % 3), 
                  delay: i * 0.5 
                }}
                className="absolute w-2 h-2 rounded-sm bg-[#D4AF37]/40 blur-[1px]"
                style={{
                  top: `${20 + (i * 12)}%`,
                  left: `${15 + (i * 15)}%`
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 to-transparent mb-6 shadow-sm shadow-[#D4AF37]/5"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B8962E]">Exclusive Offers</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-6"
              >
                Celebrate Beauty <br className="hidden md:block" /> 
                <span className="italic text-[#B8962E]">with Special Privileges</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-brand-charcoal/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
              >
                Discover our curated selection of festive promotions, limited-time offers, and exclusive membership benefits designed to make you shine.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            02. FESTIVE PROMOTIONS GRID
        ---------------------------------------------------------------------- */}
        <section className="py-20 md:py-32 relative bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -left-4 w-6 h-6 text-[#D4AF37]/30"
              >
                <Star />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-6 w-4 h-4 text-[#D4AF37]/40"
              >
                <Star />
              </motion.div>
              
              <h2 className="text-3xl md:text-5xl font-serif text-brand-charcoal mb-4">Latest Campaigns</h2>
              <p className="text-brand-charcoal/70 leading-relaxed md:text-lg">
                Take advantage of our carefully designed seasonal treatments and flash offers to achieve your aesthetic goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROMOTIONS.map((promo, idx) => (
                <motion.div 
                  key={promo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative bg-[#FAF8F5] rounded-[2rem] border border-brand-beige overflow-hidden hover:border-[#D4AF37]/40 hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-500 flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/0 to-[#D4AF37]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative h-64 overflow-hidden rounded-t-[2rem]">
                    <div className="absolute inset-0 bg-brand-charcoal/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={promo.image} 
                      alt={promo.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-5 left-5 z-20">
                      <span className="bg-white/90 backdrop-blur-sm text-brand-charcoal text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                        {promo.category}
                      </span>
                    </div>
                    {promo.tag && (
                      <div className="absolute top-5 right-5 z-20">
                         <span className={`text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md ${promo.tag === 'Popular' ? 'bg-gradient-to-r from-[#D4AF37] to-[#C59B27]' : 'bg-brand-charcoal'}`}>
                          {promo.tag}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1 relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <promo.icon className="w-5 h-5 text-[#B8962E]" />
                      <span className="text-xs font-bold text-[#B8962E] uppercase tracking-widest">{promo.validUntil}</span>
                    </div>
                    <h3 className="text-2xl font-serif text-brand-charcoal mb-3 group-hover:text-[#B8962E] transition-colors">{promo.title}</h3>
                    <p className="text-brand-charcoal/70 text-sm leading-relaxed mb-6 flex-1">
                      {promo.desc}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {promo.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-sm text-brand-charcoal/80">
                          <CheckCircle2 className="w-4 h-4 text-[#B8962E] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <a 
                      href={WA_DEFAULT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-4 bg-brand-charcoal text-white rounded-xl text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#B8962E] transition-colors shadow-lg shadow-brand-charcoal/10 hover:shadow-[#B8962E]/20"
                    >
                      Claim Offer <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            03. REFERRAL PROGRAM (More Lively)
        ---------------------------------------------------------------------- */}
        <section className="py-20 md:py-32 bg-[#FAF8F5] relative overflow-hidden border-y border-brand-beige">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-[#F3E5AB]/30 to-transparent blur-3xl rounded-l-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/4 h-full bg-gradient-to-tr from-brand-sage/20 to-transparent blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="order-2 lg:order-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 text-[#B8962E] mb-8 border border-[#D4AF37]/20 shadow-sm">
                  <Users className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-brand-charcoal mb-6">
                  Refer a Friend, <br /> Share the <span className="italic text-[#B8962E]">Radiance</span>
                </h2>
                <p className="text-brand-charcoal/70 text-lg leading-relaxed mb-8">
                  At SHAZ Aesthetic Clinic, we believe that self-care is best shared. Introduce your friends to our premium treatments and you will both be rewarded with exclusive perks.
                </p>
                <div className="space-y-4 mb-10">
                  {[
                    { title: "Invite Your Friends", desc: "Share your unique referral code or link with friends who are new to SHAZ Clinic." },
                    { title: "They Get a Discount", desc: "Your friends will receive an exclusive 15% off their first signature treatment with us." },
                    { title: "You Get Rewarded", desc: "Once they complete their visit, you'll instantly receive Rp 500.000 in clinic credit." }
                  ].map((step, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 5 }}
                      className="flex gap-4 p-4 -ml-4 rounded-2xl hover:bg-white transition-colors hover:shadow-sm border border-transparent hover:border-brand-beige"
                    >
                      <div className="w-12 h-12 shrink-0 rounded-full bg-white flex items-center justify-center font-serif font-bold text-[#B8962E] text-xl border border-[#D4AF37]/30 shadow-sm">{i + 1}</div>
                      <div>
                        <h4 className="text-lg font-bold text-brand-charcoal mb-1">{step.title}</h4>
                        <p className="text-brand-charcoal/70 text-sm">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <a 
                  href={WA_DEFAULT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-charcoal text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#B8962E] transition-all shadow-xl shadow-brand-charcoal/20"
                >
                  Join Referral Program <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="order-1 lg:order-2"
              >
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-[8px] border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop" 
                    alt="Friends at clinic" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl">
                    <p className="font-serif text-brand-charcoal text-lg sm:text-xl italic mb-3 leading-snug">"I referred my sister and we both loved our treatments! The reward credit was such a nice bonus."</p>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />)}
                      </div>
                      <p className="text-xs font-bold text-brand-charcoal/60 uppercase tracking-widest ml-2">— Sarah M.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            04. FESTIVE GIFT VOUCHERS
        ---------------------------------------------------------------------- */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="bg-brand-charcoal rounded-[2.5rem] overflow-hidden relative shadow-2xl">
              {/* Elegant Pattern Background */}
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#D4AF37]/20 to-transparent mix-blend-screen" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="p-12 md:p-20 flex flex-col justify-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] mb-8 border border-[#D4AF37]/20">
                    <Gift className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight">
                    The Gift of <br /> <span className="italic text-[#D4AF37]">Timeless Elegance</span>
                  </h2>
                  <p className="text-white/70 text-lg leading-relaxed mb-10">
                    Looking for the perfect gift? SHAZ Aesthetic Clinic gift vouchers offer a luxurious experience and exceptional results. Treat your loved ones to bespoke aesthetic care.
                  </p>
                  <ul className="space-y-5 mb-12">
                    <li className="flex items-center gap-4 text-white/90">
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <span>Available in custom denominations</span>
                    </li>
                    <li className="flex items-center gap-4 text-white/90">
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <span>Beautifully packaged physical or digital cards</span>
                    </li>
                    <li className="flex items-center gap-4 text-white/90">
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <span>Valid for 12 months on all treatments</span>
                    </li>
                  </ul>
                  <div>
                    <a 
                      href={WA_DEFAULT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg shadow-[#D4AF37]/20"
                    >
                      Purchase a Voucher <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                <div className="relative min-h-[400px] lg:min-h-full flex items-center justify-center p-12">
                  {/* Glowing backdrop for the card */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#D4AF37]/20 blur-[100px] rounded-full pointer-events-none" />
                  
                  <motion.div 
                    initial={{ rotate: -5, scale: 0.9, opacity: 0, y: 20 }}
                    whileInView={{ rotate: 0, scale: 1, opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="relative w-full max-w-md aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl border border-white/30 cursor-pointer group"
                  >
                    {/* Animated Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 skew-x-12" />

                    <div className="absolute inset-0 bg-gradient-to-br from-[#E5E0D8] to-[#C5B39A]" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.2) 1px, transparent 0)', backgroundSize: '12px 12px' }} />
                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                      <div className="flex justify-between items-start">
                        <span className="font-serif text-3xl text-brand-charcoal font-bold tracking-tight">SHAZ</span>
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/60 bg-white/40 px-3 py-1 rounded-full backdrop-blur-sm">Gift Card</span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-0.5 w-16 bg-brand-charcoal/30 mb-5" />
                        <p className="font-serif text-brand-charcoal text-xl">Aesthetic Experience</p>
                        <p className="text-brand-charcoal/60 text-[10px] uppercase tracking-widest font-bold">For Your Loved Ones</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter initialContent={initialContent} />
      
      {/* Global Shimmer Animation Definition */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}} />
    </div>
  );
}
"""

with open('app/promotion/ClientPromotionPage.tsx', 'w') as f:
    f.write(content)
