import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import NETRAM_DATA from '../../data.js'
import SectionHeading from '../ui/SectionHeading'

const { trust } = NETRAM_DATA

// ─── Investment reason cards (presentational copy — not business data) ─────────
const INVEST_REASONS = [
  {
    number: '01',
    title: 'Spiritual Living',
    description: 'Align your home with cosmic energies',
    stat: 'Vaastu Perfect',
    icon: '🕉️',
  },
  {
    number: '02',
    title: 'Future Growth Potential',
    description: 'Upcoming 6-lane highway connectivity',
    stat: '6-Lane Highway',
    icon: '📈',
  },
  {
    number: '03',
    title: 'Prime Location',
    description: 'Ganga-touch property near Chota Haridwar',
    stat: 'Ganga Touch',
    icon: '📍',
  },
  {
    number: '04',
    title: 'Conscious Township Concept',
    description: "India's first of its kind",
    stat: '#1 In India',
    icon: '🌟',
  },
  {
    number: '05',
    title: 'Limited Inventory',
    description: 'Only 40 plots — exclusivity guaranteed',
    stat: '40 Plots Only',
    icon: '💎',
  },
  {
    number: '06',
    title: 'Luxury Community',
    description: 'Premium amenities, Vaastu-perfect design',
    stat: 'Premium Living',
    icon: '🏡',
  },
]

// ─── Count-up hook (reused from StatsSection pattern) ─────────────────────────
function useCountUp(target, duration = 1600, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])

  return count
}

// ─── Single investment reason card ────────────────────────────────────────────
function InvestCard({ reason, index, inView }) {
  const numericPart = parseInt(reason.number, 10)
  const displayNum = useCountUp(numericPart, 1200, inView)
  const displayStr = String(displayNum).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative bg-charcoal-800 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 cursor-default overflow-hidden border border-white/5 hover:border-gold-500/20 transition-all duration-500"
    >
      {/* Gold gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500/60 transition-all duration-500 pointer-events-none" />
      {/* Subtle top accent — always visible, thin */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent pointer-events-none" />

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/0 to-gold-600/0 group-hover:from-gold-500/5 group-hover:to-gold-600/3 transition-all duration-500 pointer-events-none" />

      {/* Large gold-gradient number — count-up on scroll reveal */}
      <div className="font-heading text-5xl sm:text-6xl font-bold text-gold-gradient leading-none select-none">
        {displayStr}
      </div>

      {/* Icon */}
      <div className="text-2xl">{reason.icon}</div>

      {/* Title */}
      <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-gold-300 transition-colors duration-300 leading-snug">
        {reason.title}
      </h3>

      {/* Description */}
      <p className="font-body text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300 flex-1">
        {reason.description}
      </p>

      {/* Bottom stat chip */}
      <div className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/25 bg-gold-500/8 mt-auto">
        <span className="w-1 h-1 rounded-full bg-gold-400" />
        <span className="font-body text-xs text-gold-400 font-medium tracking-wide">
          {reason.stat}
        </span>
      </div>

      {/* Corner decoration */}
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-gold-500/0 group-hover:border-gold-500/25 rounded-br-lg transition-all duration-500 pointer-events-none" />
    </motion.div>
  )
}

// ─── Horizontal trust ticker ───────────────────────────────────────────────────
function TrustTicker({ points, inView }) {
  // Duplicate for seamless loop
  const doubled = [...points, ...points]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="relative mt-16 overflow-hidden"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-charcoal-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-charcoal-900 to-transparent z-10 pointer-events-none" />

      {/* Scrolling track */}
      <div className="flex gap-6 animate-ticker whitespace-nowrap">
        {doubled.map((point, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card border border-gold-500/15 flex-shrink-0"
          >
            <span className="text-gold-400 text-sm">✦</span>
            <span className="font-body text-sm text-white/70 font-medium">
              {point}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function WhyInvestSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="why-invest"
      ref={ref}
      className="relative bg-charcoal-900 section-padding overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gold-500/4 rounded-full blur-[140px]" />
        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold-500/10 rounded-tl-2xl" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gold-500/10 rounded-tr-2xl" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-gold-500/10 rounded-bl-2xl" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold-500/10 rounded-br-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Scarcity banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gold-500/30 bg-gold-500/8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-body text-sm font-semibold text-gold-300 tracking-wide">
              Only 40 Plots Available — Limited Pre-Launch Opportunity
            </span>
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Section heading */}
        <div className="mb-14">
          <SectionHeading
            eyebrow="Why Smart Investors Choose Netram"
            title="Six Reasons to"
            highlight="Invest Now"
          />
        </div>

        {/* Investment reason cards — 3-col desktop / 2-col tablet / 1-col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {INVEST_REASONS.map((reason, i) => (
            <InvestCard
              key={reason.number}
              reason={reason}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Trust ticker */}
        <TrustTicker points={trust.points} inView={inView} />
      </div>
    </section>
  )
}
