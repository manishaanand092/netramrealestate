import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { LayoutGrid, Leaf, Home, Maximize } from 'lucide-react'
import NETRAM_DATA from '../../data.js'

const { stats, project } = NETRAM_DATA

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    const isNumeric = typeof target === 'number'
    if (!isNumeric) {
      setCount(target)
      return
    }
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

const statItems = [
  {
    icon: <LayoutGrid size={24} />,
    value: stats.totalPlots,
    suffix: '+',
    label: 'Total Plots',
    description: 'Carefully planned saleable plots',
  },
  {
    icon: <Leaf size={24} />,
    value: 55,
    suffix: '%',
    label: 'Green Area',
    description: 'Open & landscaped green spaces',
  },
  {
    icon: <Home size={24} />,
    value: stats.preLaunchUnits,
    suffix: '',
    label: 'Pre-Launch Units',
    description: 'Exclusive early-bird opportunity',
  },
  {
    icon: <Maximize size={24} />,
    value: 17,
    suffix: ' Bigha',
    label: 'Project Area',
    description: 'Total township land area',
  },
]

function StatCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(item.value, 2000, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative glass-card gold-border-glow rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center cursor-default"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gold-500/0 group-hover:bg-gold-500/5 transition-all duration-500" />

      {/* Icon */}
      <div className="relative w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-5 group-hover:bg-gold-500/20 group-hover:border-gold-500/40 transition-all duration-300">
        {item.icon}
      </div>

      {/* Number */}
      <div className="relative font-heading text-4xl sm:text-5xl font-bold text-gold-gradient mb-1">
        {count}{item.suffix}
      </div>

      {/* Label */}
      <div className="font-body text-base font-semibold text-white/90 mb-2">
        {item.label}
      </div>

      {/* Description */}
      <div className="font-body text-xs text-white/40 leading-relaxed">
        {item.description}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold-gradient group-hover:w-3/4 transition-all duration-500 rounded-full" />
    </motion.div>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="stats" className="relative py-20 sm:py-28 bg-charcoal-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/4 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs text-gold-400 uppercase tracking-[0.3em] mb-3">
            By The Numbers
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            A Township Built on{' '}
            <span className="text-gold-gradient italic">Sacred Numbers</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-gold-gradient opacity-60" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <div className="h-px w-16 bg-gold-gradient opacity-60" />
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statItems.map((item, i) => (
            <StatCard key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-10 font-body text-sm text-white/30 italic"
        >
          "{project.shortDescription}"
        </motion.p>
      </div>
    </section>
  )
}
