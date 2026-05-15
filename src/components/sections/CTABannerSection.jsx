import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Shield, Star, CheckCircle } from 'lucide-react'
import NETRAM_DATA from '../../data.js'

const { project, contact } = NETRAM_DATA

// ─── Floating particle (reused pattern from HeroSection) ──────────────────────
function Particle({ style }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gold-500/20 blur-sm"
      style={style}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: style.duration || 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: style.delay || 0,
      }}
    />
  )
}

const particles = [
  { width: 6,  height: 6,  top: '12%', left: '8%',  duration: 7,   delay: 0   },
  { width: 4,  height: 4,  top: '20%', left: '78%', duration: 5,   delay: 1   },
  { width: 8,  height: 8,  top: '65%', left: '6%',  duration: 8,   delay: 2   },
  { width: 5,  height: 5,  top: '72%', left: '88%', duration: 6,   delay: 0.5 },
  { width: 10, height: 10, top: '38%', left: '48%', duration: 9,   delay: 3   },
  { width: 3,  height: 3,  top: '82%', left: '28%', duration: 5,   delay: 1.5 },
  { width: 7,  height: 7,  top: '8%',  left: '58%', duration: 7,   delay: 2.5 },
  { width: 4,  height: 4,  top: '52%', left: '18%', duration: 6,   delay: 0.8 },
  { width: 5,  height: 5,  top: '30%', left: '92%', duration: 7.5, delay: 1.2 },
  { width: 3,  height: 3,  top: '88%', left: '62%', duration: 5.5, delay: 3.5 },
  { width: 6,  height: 6,  top: '45%', left: '35%', duration: 8.5, delay: 0.3 },
  { width: 4,  height: 4,  top: '58%', left: '72%', duration: 6.5, delay: 2.2 },
]

// ─── Trust indicator chips ─────────────────────────────────────────────────────
const TRUST_CHIPS = [
  { label: 'Zero Complaints',  icon: <Shield  size={14} className="text-gold-400" /> },
  { label: 'Trusted Legacy',   icon: <Star    size={14} className="text-gold-400" /> },
  { label: 'Vaastu Perfect',   icon: <CheckCircle size={14} className="text-gold-400" /> },
]

// ─── Animated gold glow pulse for primary button ───────────────────────────────
const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(200,155,60,0.3)',
      '0 0 50px rgba(200,155,60,0.6)',
      '0 0 20px rgba(200,155,60,0.3)',
    ],
  },
  transition: {
    duration: 2.4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function CTABannerSection() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const inView = useInView(contentRef, { once: true, margin: '-80px' })

  // Parallax background Y movement
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  // Sanitise phone/whatsapp for href usage
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`
  const phoneHref    = `tel:${contact.phone.replace(/\s/g, '')}`

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-charcoal-900"
    >
      {/* ── Parallax background layers ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        {/* Unsplash spiritual/nature image — low opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80')",
            opacity: 0.15,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/80 via-charcoal-900/70 to-charcoal-900/90" />
        {/* Gold radial gradient from center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(200,155,60,0.12)_0%,transparent_70%)]" />
      </motion.div>

      {/* ── Subtle grid lines overlay ── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,155,60,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,155,60,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Floating particles ── */}
      {particles.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

      {/* ── Top & bottom separator lines ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent z-10 pointer-events-none" />

      {/* ── Corner accent lines ── */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold-500/15 rounded-tl-2xl pointer-events-none z-10" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gold-500/15 rounded-tr-2xl pointer-events-none z-10" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-gold-500/15 rounded-bl-2xl pointer-events-none z-10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold-500/15 rounded-br-2xl pointer-events-none z-10" />

      {/* ── Centered content ── */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center text-center gap-8"
      >
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border border-gold-500/30 text-gold-400 text-xs font-body font-semibold tracking-[0.25em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            Limited Pre-Launch Opportunity
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={1}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white"
        >
          Book Your Space In The Future Of{' '}
          <span className="text-gold-gradient italic">Conscious Living</span>
        </motion.h2>

        {/* Gold divider */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={2}
          className="flex items-center gap-3"
        >
          <div className="h-px w-16 bg-gold-gradient" />
          <div className="w-2 h-2 rounded-full bg-gold-500" />
          <div className="h-px w-16 bg-gold-gradient opacity-50" />
        </motion.div>

        {/* Subtext from data */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={3}
          className="font-body text-base sm:text-lg text-white/55 leading-relaxed max-w-2xl"
        >
          {project.shortDescription}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={4}
          className="flex flex-col sm:flex-row gap-4 mt-2"
        >
          {/* Primary — Schedule Site Visit */}
          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            animate={glowPulse.animate}
            transition={glowPulse.transition}
            whileHover={{ scale: 1.04, boxShadow: '0 0 60px rgba(200,155,60,0.7)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 bg-gold-gradient text-charcoal-900 font-body font-bold text-sm rounded-full shadow-gold text-center transition-all duration-300"
          >
            Schedule Site Visit
          </motion.a>

          {/* Outline — Talk To Expert */}
          <motion.a
            href={phoneHref}
            animate={{
              boxShadow: [
                '0 0 0px rgba(200,155,60,0)',
                '0 0 20px rgba(200,155,60,0.2)',
                '0 0 0px rgba(200,155,60,0)',
              ],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            whileHover={{ scale: 1.04, borderColor: 'rgba(200,155,60,0.8)', backgroundColor: 'rgba(200,155,60,0.06)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 border border-gold-500/40 text-gold-400 font-body font-semibold text-sm rounded-full hover:border-gold-400 hover:bg-gold-500/5 transition-all duration-300 text-center"
          >
            Talk To Expert
          </motion.a>
        </motion.div>

        {/* Trust indicator chips */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={5}
          className="flex flex-wrap justify-center gap-3 mt-2"
        >
          {TRUST_CHIPS.map((chip) => (
            <div
              key={chip.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-gold-500/20 text-white/60 text-xs font-body font-medium"
            >
              {chip.icon}
              {chip.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
