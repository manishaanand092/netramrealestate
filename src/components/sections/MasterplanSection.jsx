import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import NETRAM_DATA from '../../data.js'
import SectionHeading from '../ui/SectionHeading'

const { masterplan, contact } = NETRAM_DATA

// ─── WhatsApp href helper ─────────────────────────────────────────────────────
const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`

// ─── Key highlights (presentational copy, not business data) ─────────────────
const KEY_HIGHLIGHTS = [
  '40 saleable plots',
  '17 Bigha total area',
  '55% green & open area',
  '12m & 9m wide roads',
  'Temple + Ashram inside',
  'Commercial zone',
]

// ─── Floating pill labels for the image panel ─────────────────────────────────
const FLOATING_LABELS = [
  { label: '40 Plots',    position: 'top-4 left-4' },
  { label: 'Temple Zone', position: 'top-4 right-4' },
  { label: 'Green Belt',  position: 'bottom-4 left-4' },
  { label: '12m Roads',   position: 'bottom-4 right-4' },
]

// ─── Left image / blueprint panel ────────────────────────────────────────────
function BlueprintPanel({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative order-2 lg:order-1"
    >
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-gold-500/8 rounded-[2rem] blur-2xl pointer-events-none" />

      {/* Main image placeholder */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden aspect-[4/3] cursor-default"
      >
        {/* Blueprint-feel dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 via-[#0d1a2a] to-charcoal-800" />

        {/* Grid overlay — architectural blueprint feel */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(28,51,40,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(28,51,40,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Subtle radial glow at center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,51,40,0.12)_0%,transparent_70%)]" />

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass-card rounded-2xl px-6 py-4 border border-gold-500/30 text-center">
            <p className="font-heading text-2xl font-bold text-gold-gradient">Netram</p>
            <p className="font-body text-xs text-white/40 mt-1 tracking-widest uppercase">Township Layout</p>
          </div>
        </div>

        {/* Floating glassmorphism pill labels at corners */}
        {FLOATING_LABELS.map(({ label, position }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`absolute ${position} glass-card rounded-full px-3 py-1.5 border border-gold-500/30`}
          >
            <span className="font-body text-xs text-gold-400 font-medium whitespace-nowrap">
              {label}
            </span>
          </motion.div>
        ))}

        {/* Corner accent lines */}
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold-500/40 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold-500/40 rounded-bl-xl pointer-events-none" />
      </motion.div>
    </motion.div>
  )
}

// ─── Highlight bullet row ─────────────────────────────────────────────────────
function HighlightItem({ text, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.08 }}
      className="flex items-center gap-3 group"
    >
      {/* Gold dot */}
      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gold-500 group-hover:scale-125 transition-transform duration-300" />

      {/* Left-to-right line reveal */}
      <div className="relative flex-1 flex items-center gap-3">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 + index * 0.08, ease: 'easeOut' }}
          className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-8 bg-gold-500/40 origin-left"
        />
        <span className="font-body text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300 pl-10">
          {text}
        </span>
      </div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function MasterplanSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="masterplan"
      ref={ref}
      className="relative bg-charcoal-900 section-padding overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        {/* Radial glow — right side to complement left image */}
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gold-500/4 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-600/3 rounded-full blur-[80px] -translate-x-1/3" />
        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold-500/10 rounded-tl-2xl" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold-500/10 rounded-br-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Blueprint image panel */}
          <BlueprintPanel inView={inView} />

          {/* RIGHT: Content panel */}
          <div className="order-1 lg:order-2 flex flex-col gap-6">

            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                eyebrow="Masterplan"
                title={masterplan.title}
                highlight=""
                centered={false}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-body text-base text-white/60 leading-relaxed"
            >
              {masterplan.description}
            </motion.p>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex items-center gap-3 origin-left"
            >
              <div className="h-px w-16 bg-gold-gradient opacity-50" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              <div className="h-px w-8 bg-gold-gradient opacity-25" />
            </motion.div>

            {/* Key highlights list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="flex flex-col gap-3"
            >
              {KEY_HIGHLIGHTS.map((text, i) => (
                <HighlightItem key={text} text={text} index={i} inView={inView} />
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              {/* Download Brochure — outline */}
              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, borderColor: 'rgba(234,183,127,0.8)' }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 text-center px-6 py-3.5 rounded-full border border-gold-500/40 text-gold-400 font-body font-semibold text-sm hover:bg-gold-500/5 transition-all duration-300"
              >
                Download Brochure
              </motion.a>

              {/* Schedule Site Visit — primary */}
              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(200,155,60,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 text-center px-6 py-3.5 rounded-full bg-gold-gradient text-charcoal-900 font-body font-bold text-sm shadow-gold transition-all duration-300"
              >
                Schedule Site Visit
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
