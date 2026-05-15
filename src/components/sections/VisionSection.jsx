import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Quote } from 'lucide-react'
import NETRAM_DATA from '../../data.js'

const { project, company, trust } = NETRAM_DATA

const highlightPoints = project.highlights.slice(0, 6)

export default function VisionSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const imageRef = useRef(null)
  const imageInView = useInView(imageRef, { once: true, margin: '-80px' })

  return (
    <section id="vision" className="relative py-20 sm:py-28 lg:py-36 bg-charcoal-800 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold-500/4 rounded-full blur-[100px] translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-600/3 rounded-full blur-[80px] -translate-x-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -60 }}
            animate={imageInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            {/* Main image placeholder */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
              {/* Placeholder gradient image */}
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 via-charcoal-600 to-charcoal-700" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80')] bg-cover bg-center opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent" />

              {/* Overlay content */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card-dark rounded-2xl p-4 border border-gold-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0">
                      <span className="font-heading font-bold text-charcoal-900 text-sm">VS</span>
                    </div>
                    <div>
                      <p className="font-body font-semibold text-white text-sm">{company.founder.name}</p>
                      <p className="font-body text-xs text-gold-400">{company.founder.title}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-gold-500/40 rounded-tr-xl" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-gold-500/40 rounded-bl-xl" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 sm:top-8 sm:-right-8 glass-card border border-gold-500/30 rounded-2xl p-4 shadow-gold"
            >
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-gold-gradient">108</div>
                <div className="font-body text-xs text-white/50 mt-0.5">Sacred Number</div>
              </div>
            </motion.div>

            {/* Second floating badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -right-4 sm:bottom-16 sm:-right-8 glass-card border border-gold-500/30 rounded-2xl p-4 shadow-gold"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🛕</div>
                <div className="font-body text-xs text-white/50">Temple Inside</div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Content */}
          <div ref={ref} className="order-1 lg:order-2 flex flex-col gap-6">
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-body text-xs text-gold-400 uppercase tracking-[0.3em]"
            >
              Our Vision
            </motion.p>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              India's First{' '}
              <span className="text-gold-gradient italic">Conscious</span>
              <br />
              Township
            </motion.h2>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-3 origin-left"
            >
              <div className="h-0.5 w-16 bg-gold-gradient" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              <div className="h-0.5 w-8 bg-gold-gradient opacity-40" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-base text-white/60 leading-relaxed"
            >
              {project.fullDescription}
            </motion.p>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="glass-card rounded-2xl p-5 border-l-2 border-gold-500"
            >
              <Quote size={20} className="text-gold-500/50 mb-2" />
              <p className="font-body text-sm text-white/70 italic leading-relaxed">
                "{company.founder.vision}"
              </p>
              <p className="font-body text-xs text-gold-400 mt-3">— {company.founder.name}</p>
            </motion.div>

            {/* Highlight points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {highlightPoints.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.07 }}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle2 size={16} className="text-gold-500 flex-shrink-0" />
                  <span className="font-body text-sm text-white/70">{point}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
