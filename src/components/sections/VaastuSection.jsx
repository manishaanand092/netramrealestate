import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import NETRAM_DATA from '../../data.js'
import SectionHeading from '../ui/SectionHeading.jsx'

const { vaastu } = NETRAM_DATA

// Compass directions with their positions and gold/muted styling
const COMPASS_DIRECTIONS = [
  { label: 'N', pos: 'top-2 left-1/2 -translate-x-1/2', gold: true },
  { label: 'E', pos: 'right-2 top-1/2 -translate-y-1/2', gold: true },
  { label: 'W', pos: 'left-2 top-1/2 -translate-y-1/2', gold: true },
  { label: 'S', pos: 'bottom-2 left-1/2 -translate-x-1/2', gold: false },
]

export default function VaastuSection() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const leftInView = useInView(leftRef, { once: true, margin: '-80px' })
  const rightInView = useInView(rightRef, { once: true, margin: '-80px' })

  return (
    <section
      id="vaastu"
      className="relative py-20 sm:py-28 lg:py-36 bg-charcoal-800 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold-500/4 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-600/3 rounded-full blur-[100px] translate-x-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Image panel with compass ── */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -60 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            {/* Main image panel */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 via-charcoal-600 to-charcoal-700" />
              {/* Subtle image overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-transparent to-transparent" />

              {/* Compass UI — centered in the panel */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Outer rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-52 h-52 rounded-full border border-gold-500/20"
                  style={{
                    backgroundImage:
                      'repeating-conic-gradient(rgba(200,155,60,0.06) 0deg 10deg, transparent 10deg 20deg)',
                  }}
                />

                {/* Compass circle */}
                <div className="relative w-44 h-44 rounded-full border-2 border-gold-500/40 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center shadow-[0_0_40px_rgba(200,155,60,0.15)]">
                  {/* Direction labels */}
                  {COMPASS_DIRECTIONS.map(({ label, pos, gold }) => (
                    <span
                      key={label}
                      className={`absolute font-body text-xs font-bold tracking-widest ${pos} ${
                        gold ? 'text-gold-400' : 'text-white/30'
                      }`}
                    >
                      {label}
                    </span>
                  ))}

                  {/* Compass needle */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-0.5 h-10 bg-gradient-to-b from-gold-400 to-transparent rounded-full" />
                    <div className="w-2 h-2 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(234,183,127,0.7)] -mt-1" />
                    <div className="w-0.5 h-6 bg-gradient-to-b from-transparent to-white/20 rounded-full" />
                  </div>

                  {/* Tick marks */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-full"
                      style={{ transform: `rotate(${i * 30}deg)` }}
                    >
                      <div
                        className={`absolute top-1 left-1/2 -translate-x-1/2 rounded-full ${
                          i % 3 === 0
                            ? 'w-0.5 h-2 bg-gold-500/60'
                            : 'w-px h-1.5 bg-gold-500/25'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Corner accent lines — matching VisionSection pattern */}
              <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-gold-500/40 rounded-tr-xl" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-gold-500/40 rounded-bl-xl" />

              {/* Bottom label card */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card-dark rounded-2xl p-3 border border-gold-500/20 text-center">
                  <p className="font-body text-xs text-gold-400 uppercase tracking-[0.2em]">
                    Direction Conscious Design
                  </p>
                  <p className="font-body text-xs text-white/40 mt-0.5">
                    North · North-East · North-West
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 sm:top-8 sm:-right-8 glass-card border border-gold-500/30 rounded-2xl p-4 shadow-gold"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🧭</div>
                <div className="font-body text-xs text-white/50">Vaastu</div>
                <div className="font-body text-xs text-gold-400 font-semibold">Perfect</div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Content panel ── */}
          <div ref={rightRef} className="order-1 lg:order-2 flex flex-col gap-6">
            {/* Section heading */}
            <SectionHeading
              eyebrow="Vaastu Perfection"
              title={vaastu.title}
              highlight=""
              centered={false}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={rightInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-body text-base text-white/60 leading-relaxed"
            >
              {vaastu.description}
            </motion.p>

            {/* Key point glass card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={rightInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="glass-card rounded-2xl p-6 border-l-2 border-gold-500 bg-gold-500/5"
            >
              <p className="font-heading text-xl sm:text-2xl font-bold italic text-white/90 leading-snug">
                "{vaastu.keyPoint}"
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-6 h-px bg-gold-500/60" />
                <span className="font-body text-xs text-gold-400 uppercase tracking-[0.2em]">
                  Core Principle
                </span>
              </div>
            </motion.div>

            {/* Benefits chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={rightInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {vaastu.benefits?.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -16 }}
                  animate={rightInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                  className="flex items-center gap-3 glass-card rounded-xl px-4 py-3 border border-gold-500/15 hover:border-gold-500/35 transition-colors duration-300"
                >
                  <CheckCircle2 size={16} className="text-gold-500 flex-shrink-0" />
                  <span className="font-body text-sm text-white/70">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
