import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Clock } from 'lucide-react'
import NETRAM_DATA from '../../data.js'
import SectionHeading from '../ui/SectionHeading.jsx'

const { contact } = NETRAM_DATA

const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=Hi%2C%20I%27d%20like%20to%20book%20at%20pre-launch%20pricing%20for%20Netram%20Township.`

export default function PricingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative bg-charcoal-900 section-padding overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold-500/4 rounded-full blur-[140px]" />
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold-500/10 rounded-tl-2xl" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gold-500/10 rounded-tr-2xl" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-gold-500/10 rounded-bl-2xl" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold-500/10 rounded-br-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="mb-14">
          <SectionHeading
            eyebrow="Investment Opportunity"
            title="Pricing &"
            highlight="Investment Opportunity"
            description="Secure your plot at exclusive pre-launch pricing before official launch."
          />
        </div>

        {/* Pricing cards + savings badge */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">

          {/* ── Card 1: Pre-Launch Price (featured) ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03 }}
            className="group relative w-full max-w-sm lg:scale-105 rounded-3xl p-8 flex flex-col gap-5 cursor-default overflow-hidden bg-gold-500/5 border-shimmer"
          >
            {/* Floating glow */}
            <div className="absolute inset-0 -z-10 bg-gold-500/15 rounded-3xl blur-3xl scale-110 pointer-events-none" />
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold-500/0 to-gold-600/0 group-hover:from-gold-500/8 group-hover:to-gold-600/4 transition-all duration-500 pointer-events-none" />

            {/* Badge — removed per request */}

            {/* Label */}
            <p className="font-body text-xs text-gold-400 uppercase tracking-[0.25em]">
              Pre-Launch Price
            </p>

            {/* Price */}
            <div>
              <div className="font-heading text-4xl sm:text-5xl font-bold text-gold-gradient leading-none">
                ₹50,000
              </div>
              <p className="font-body text-sm text-gold-400/70 mt-2 tracking-wide">
                per Sq. Yard
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-gold-500/60 via-gold-400/30 to-transparent" />

            {/* Feature points */}
            <ul className="flex flex-col gap-2.5 flex-1">
              {[
                'Exclusive early investor pricing',
                'Priority plot selection',
                'Pre-launch documentation support',
                'Zero hidden charges',
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                  <span className="font-body text-sm text-white/70">{point}</span>
                </li>
              ))}
            </ul>

            {/* Corner decoration */}
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold-500/0 group-hover:border-gold-500/30 rounded-br-lg transition-all duration-500 pointer-events-none" />
          </motion.div>

          {/* ── Savings badge — between cards ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex-shrink-0"
          >
            <div className="flex flex-col items-center gap-1 px-5 py-4 rounded-2xl glass-card border border-gold-500/30 shadow-gold text-center mx-auto w-fit">
              <TrendingUp size={18} className="text-gold-400" />
              <p className="font-heading text-base font-bold text-gold-gradient leading-tight">
                Save
              </p>
              <p className="font-heading text-lg font-bold text-white leading-tight">
                ₹5,000
              </p>
              <p className="font-body text-[10px] text-white/40 uppercase tracking-widest">
                per Sq. Yard
              </p>
            </div>
            {/* Connecting lines — hidden on mobile */}
            <div className="hidden lg:block absolute top-1/2 -left-6 w-6 h-px bg-gradient-to-l from-gold-500/30 to-transparent -translate-y-1/2" />
            <div className="hidden lg:block absolute top-1/2 -right-6 w-6 h-px bg-gradient-to-r from-gold-500/30 to-transparent -translate-y-1/2" />
          </motion.div>

          {/* ── Card 2: Launch Price ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03 }}
            className="group relative w-full max-w-sm glass-card rounded-3xl p-8 flex flex-col gap-5 cursor-default overflow-hidden"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold-500/0 to-gold-600/0 group-hover:from-gold-500/5 group-hover:to-gold-600/3 transition-all duration-500 pointer-events-none" />

            {/* Badges — Limited Time Offer + Revising Soon */}
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10">
                <Clock size={11} className="text-gold-400" />
                <span className="font-body text-xs text-gold-400 font-medium tracking-wide">
                  Limited Time Offer
                </span>
              </div>
              <div className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/20 bg-gold-500/6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse flex-shrink-0" />
                <span className="font-body text-xs text-gold-400/80 font-medium tracking-wide">
                  Revising Soon
                </span>
              </div>
            </div>

            {/* Label */}
            <p className="font-body text-xs text-white/40 uppercase tracking-[0.25em]">
              Launch Price
            </p>

            {/* Price */}
            <div>
              <div className="font-heading text-4xl sm:text-5xl font-bold text-white/60 leading-none">
                ₹55,000
              </div>
              <p className="font-body text-sm text-white/35 mt-2 tracking-wide">
                per Sq. Yard
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-gold-500/20 via-gold-500/8 to-transparent" />

            {/* Feature points */}
            <ul className="flex flex-col gap-2.5 flex-1">
              {[
                'Post-launch public pricing',
                'Standard plot selection',
                'Regular documentation process',
                'Zero hidden charges',
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0" />
                  <span className="font-body text-sm text-white/40">{point}</span>
                </li>
              ))}
            </ul>

            {/* Corner decoration */}
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold-500/0 group-hover:border-gold-500/20 rounded-br-lg transition-all duration-500 pointer-events-none" />
          </motion.div>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 text-center font-body text-sm text-white/45 leading-relaxed max-w-xl mx-auto"
        >
          Book during the pre-launch phase and benefit from early investor pricing before the official launch.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex justify-center mt-8"
        >
          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(200,155,60,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="px-9 py-4 bg-gold-gradient text-charcoal-900 font-body font-bold text-sm rounded-full shadow-gold transition-all duration-300"
          >
            Book at Pre-Launch Price →
          </motion.a>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-6 text-center font-body text-xs text-white/20 tracking-wide"
        >
          * Pricing is indicative and subject to change. Contact us for the latest confirmed rates.
        </motion.p>
      </div>
    </section>
  )
}
