import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import NETRAM_DATA from '../../data.js'
import SectionHeading from '../ui/SectionHeading'

const { plots, contact } = NETRAM_DATA

// ─── WhatsApp href helper ─────────────────────────────────────────────────────
const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`

// ─── Standard Plot Card ───────────────────────────────────────────────────────
function PlotCard({ plot, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.03 }}
      className="group relative glass-card rounded-3xl p-8 flex flex-col gap-5 cursor-default overflow-hidden"
    >
      {/* Hover background glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold-500/0 to-gold-600/0 group-hover:from-gold-500/5 group-hover:to-gold-600/3 transition-all duration-500 pointer-events-none" />

      {/* "Limited Availability" badge */}
      <div className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
        <span className="font-body text-xs text-gold-400 font-medium tracking-wide">
          Limited Availability
        </span>
      </div>

      {/* Plot size — large Playfair Display gold-gradient */}
      <div>
        <h3 className="font-heading text-4xl sm:text-5xl font-bold text-gold-gradient leading-none">
          {plot.size}
        </h3>
        <p className="font-body text-sm text-white/50 mt-2 tracking-wide">
          {plot.type}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-gold-500/30 via-gold-500/10 to-transparent" />

      {/* Description */}
      <p className="font-body text-sm text-white/60 leading-relaxed flex-1">
        {plot.description}
      </p>

      {/* CTA — outline variant */}
      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04, borderColor: 'rgba(200,155,60,0.8)' }}
        whileTap={{ scale: 0.97 }}
        className="mt-auto block text-center px-6 py-3 rounded-full border border-gold-500/40 text-gold-400 font-body font-semibold text-sm hover:bg-gold-500/5 transition-all duration-300"
      >
        Enquire on WhatsApp →
      </motion.a>

      {/* Corner decoration */}
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold-500/0 group-hover:border-gold-500/25 rounded-br-lg transition-all duration-500 pointer-events-none" />
    </motion.div>
  )
}

// ─── Featured Plot Card (index 1 — 200 sq yards) ─────────────────────────────
function FeaturedPlotCard({ plot, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.03 }}
      // scale-105 on desktop via lg: prefix; float loop via animate prop below
      className="group relative lg:scale-105 rounded-3xl p-8 flex flex-col gap-5 cursor-default overflow-hidden bg-gold-500/5 border-shimmer"
    >
      {/* Floating glow behind card */}
      <div className="absolute inset-0 -z-10 bg-gold-500/15 rounded-3xl blur-3xl scale-110 pointer-events-none" />

      {/* Floating y-loop animation wrapper */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* "Most Popular" badge */}
      <div className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-gold-gradient">
        <span className="font-body text-xs text-charcoal-900 font-bold tracking-wide">
          ✦ Most Popular
        </span>
      </div>

      {/* Plot size — large Playfair Display gold-gradient */}
      <div>
        <h3 className="font-heading text-4xl sm:text-5xl font-bold text-gold-gradient leading-none">
          {plot.size}
        </h3>
        <p className="font-body text-sm text-gold-400/70 mt-2 tracking-wide">
          {plot.type}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-gold-500/60 via-gold-400/30 to-transparent" />

      {/* Description */}
      <p className="font-body text-sm text-white/70 leading-relaxed flex-1">
        {plot.description}
      </p>

      {/* CTA — primary variant */}
      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(200,155,60,0.5)' }}
        whileTap={{ scale: 0.97 }}
        className="mt-auto block text-center px-6 py-3 rounded-full bg-gold-gradient text-charcoal-900 font-body font-bold text-sm shadow-gold transition-all duration-300"
      >
        Book This Plot →
      </motion.a>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function PlotOptionsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="plots"
      ref={ref}
      className="relative bg-charcoal-800 section-padding overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold-500/4 rounded-full blur-[160px]" />
        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold-500/15 rounded-tl-2xl" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gold-500/15 rounded-tr-2xl" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-gold-500/15 rounded-bl-2xl" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold-500/15 rounded-br-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="mb-16">
          <SectionHeading
            eyebrow="Plot Options"
            title="Choose Your"
            highlight="Sacred Space"
          />
        </div>

        {/* Plot cards grid — 3-col desktop / 1-col mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
          {plots.map((plot, i) =>
            i === 1 ? (
              <FeaturedPlotCard
                key={plot.size}
                plot={plot}
                index={i}
                inView={inView}
              />
            ) : (
              <PlotCard
                key={plot.size}
                plot={plot}
                index={i}
                inView={inView}
              />
            )
          )}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center font-body text-xs text-white/30 tracking-wide"
        >
          * Prices and availability subject to change. Contact us for the latest pre-launch offers.
        </motion.p>
      </div>
    </section>
  )
}
