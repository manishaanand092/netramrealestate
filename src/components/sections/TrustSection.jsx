import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, Users, Leaf, Eye, Star, Award } from 'lucide-react'
import NETRAM_DATA from '../../data.js'
import SectionHeading from '../ui/SectionHeading.jsx'

const { trust } = NETRAM_DATA

// ─── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

// ─── Trust stat cards ──────────────────────────────────────────────────────────
const TRUST_STATS = [
  {
    icon: <Award size={22} className="text-gold-400" />,
    value: 20,
    suffix: '+',
    label: 'Years of Expertise',
    description: 'Two decades of trusted real estate leadership',
    color: 'from-gold-500/10 to-transparent',
  },
  {
    icon: <Users size={22} className="text-gold-400" />,
    value: 1000,
    suffix: '+',
    label: 'Happy Customers',
    description: 'Thousands of successful property transactions',
    color: 'from-gold-500/10 to-transparent',
  },
  {
    icon: <ShieldCheck size={22} className="text-gold-400" />,
    value: 0,
    suffix: '',
    label: 'Consumer Complaints',
    description: 'Unmatched record of zero complaints ever',
    color: 'from-gold-500/10 to-transparent',
  },
  {
    icon: <Leaf size={22} className="text-gold-400" />,
    value: 55,
    suffix: '%',
    label: 'Green Township',
    description: 'Lush Ayurvedic landscape and open spaces',
    color: 'from-gold-500/10 to-transparent',
  },
  {
    icon: <Eye size={22} className="text-gold-400" />,
    value: 100,
    suffix: '%',
    label: 'Transparency',
    description: 'Full documentation and clear pricing always',
    color: 'from-gold-500/10 to-transparent',
  },
  {
    icon: <Star size={22} className="text-gold-400" />,
    value: 40,
    suffix: '',
    label: 'Vaastu Perfect Plots',
    description: 'Every plot direction-conscious and energy-aligned',
    color: 'from-gold-500/10 to-transparent',
  },
]

// ─── Why People Trust Netram items ────────────────────────────────────────────
const WHY_TRUST = [
  {
    emoji: '🕉️',
    title: 'Ancient Wisdom',
    body: 'Rooted in Vedic science, Tantra and Sanatan principles — not just marketing.',
  },
  {
    emoji: '📜',
    title: 'Proven Track Record',
    body: 'Thousands of successful transactions with zero consumer complaints on record.',
  },
  {
    emoji: '🌿',
    title: 'Nature-First Planning',
    body: '55% green area, Ayurvedic plants and sacred spaces built into the masterplan.',
  },
  {
    emoji: '🔍',
    title: 'Full Transparency',
    body: 'Clear pricing, complete documentation and no hidden charges — ever.',
  },
]

// ─── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ stat, index, inView }) {
  const count = useCountUp(stat.value, 1800, inView)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative glass-card gold-border-glow rounded-2xl p-6 flex flex-col gap-4 overflow-hidden cursor-default"
    >
      {/* Gradient bg on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      {/* Icon with gold ring */}
      <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/20 group-hover:border-gold-500/40 transition-all duration-300">
        {stat.icon}
      </div>

      {/* Count */}
      <div className="flex items-end gap-1">
        <span className="font-heading text-4xl font-bold text-gold-gradient leading-none">
          {count}
        </span>
        <span className="font-heading text-2xl font-bold text-gold-400 leading-none mb-0.5">
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <div>
        <p className="font-heading text-base font-bold text-white group-hover:text-gold-300 transition-colors duration-300">
          {stat.label}
        </p>
        <p className="font-body text-xs text-white/45 mt-1 leading-relaxed">
          {stat.description}
        </p>
      </div>

      {/* Gold verification tick */}
      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
        <ShieldCheck size={12} className="text-gold-400" />
      </div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function TrustSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="trust"
      ref={ref}
      className="relative bg-charcoal-900 section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14">
          <SectionHeading
            eyebrow="Trust & Credibility"
            title="Built on"
            highlight="Integrity"
            description="Two decades of transparent real estate practice, guided by ancient wisdom and modern accountability."
          />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-20">
          {TRUST_STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        {/* Why People Trust Netram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative glass-card rounded-3xl p-8 sm:p-12 border border-gold-500/15 overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/4 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center mb-10">
              <p className="font-body text-xs text-gold-400 uppercase tracking-[0.3em] mb-3">
                The Netram Difference
              </p>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Why People{' '}
                <span className="text-gold-gradient italic">Trust Netram</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_TRUST.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white/2 border border-gold-500/10 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all duration-300"
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <h4 className="font-heading text-base font-bold text-white group-hover:text-gold-300 transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="font-body text-xs text-white/45 leading-relaxed">
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Trust points ticker */}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {trust.points.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.07 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-gold-500/20 text-white/60 text-xs font-body font-medium"
                >
                  <span className="text-gold-400 text-xs">✦</span>
                  {point}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
