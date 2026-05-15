import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import NETRAM_DATA from '../../data.js'
import SectionHeading from '../ui/SectionHeading'

const { panchTatva } = NETRAM_DATA

// ─── Element metadata ────────────────────────────────────────────────────────
const ELEMENT_META = {
  Earth: {
    emoji: '🌍',
    description: 'Grounded foundations & stability',
    borderColor: 'rgba(217, 119, 6, 0.45)',   // amber
    glowColor: 'rgba(217, 119, 6, 0.15)',
  },
  Water: {
    emoji: '💧',
    description: 'Sacred Ganga flow & abundance',
    borderColor: 'rgba(59, 130, 246, 0.45)',   // blue
    glowColor: 'rgba(59, 130, 246, 0.15)',
  },
  Fire: {
    emoji: '🔥',
    description: 'Transformative energy & vitality',
    borderColor: 'rgba(239, 68, 68, 0.45)',    // red/orange
    glowColor: 'rgba(239, 68, 68, 0.15)',
  },
  Air: {
    emoji: '💨',
    description: 'Breath of life & freedom',
    borderColor: 'rgba(6, 182, 212, 0.45)',    // cyan
    glowColor: 'rgba(6, 182, 212, 0.15)',
  },
  Space: {
    emoji: '🌌',
    description: 'Infinite consciousness & expansion',
    borderColor: 'rgba(139, 92, 246, 0.45)',   // purple
    glowColor: 'rgba(139, 92, 246, 0.15)',
  },
}

// Pentagon positions (desktop): top-center, top-right, bottom-right, bottom-left, top-left
const DESKTOP_POSITIONS = [
  'top-0 left-1/2 -translate-x-1/2',   // Earth — top-center
  'top-[15%] right-0',                  // Water — top-right
  'bottom-[15%] right-0',               // Fire  — bottom-right
  'bottom-[15%] left-0',                // Air   — bottom-left
  'top-[15%] left-0',                   // Space — top-left
]

// ─── Particle data ────────────────────────────────────────────────────────────
const particles = [
  { width: 6,  height: 6,  top: '8%',  left: '7%',  duration: 7,  delay: 0   },
  { width: 4,  height: 4,  top: '20%', left: '85%', duration: 5,  delay: 1   },
  { width: 8,  height: 8,  top: '55%', left: '4%',  duration: 8,  delay: 2   },
  { width: 5,  height: 5,  top: '72%', left: '92%', duration: 6,  delay: 0.5 },
  { width: 10, height: 10, top: '38%', left: '48%', duration: 9,  delay: 3   },
  { width: 3,  height: 3,  top: '82%', left: '28%', duration: 5,  delay: 1.5 },
  { width: 7,  height: 7,  top: '12%', left: '62%', duration: 7,  delay: 2.5 },
  { width: 4,  height: 4,  top: '48%', left: '18%', duration: 6,  delay: 0.8 },
  { width: 5,  height: 5,  top: '65%', left: '55%', duration: 8,  delay: 1.2 },
  { width: 6,  height: 6,  top: '30%', left: '35%', duration: 7,  delay: 3.5 },
  { width: 3,  height: 3,  top: '90%', left: '70%', duration: 5,  delay: 0.3 },
  { width: 8,  height: 8,  top: '5%',  left: '45%', duration: 9,  delay: 2.2 },
]

function Particle({ style }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gold-500/20 blur-sm"
      style={{ width: style.width, height: style.height, top: style.top, left: style.left }}
      animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
      transition={{
        duration: style.duration || 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: style.delay || 0,
      }}
    />
  )
}

// ─── Element Card ─────────────────────────────────────────────────────────────
function ElementCard({ element, index, inView }) {
  const meta = ELEMENT_META[element]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      // Float loop — staggered start delays
      style={{ originX: 0.5, originY: 0.5 }}
    >
      {/* Inner float animation wrapper */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.6,
        }}
        className="glass-card gold-border-glow rounded-2xl p-5 flex flex-col items-center text-center gap-3 w-[160px] cursor-default"
        style={{
          borderColor: meta.borderColor,
          boxShadow: `0 0 20px ${meta.glowColor}`,
        }}
      >
        <span className="text-4xl leading-none">{meta.emoji}</span>
        <h3 className="font-heading text-base font-bold text-white">{element}</h3>
        <p className="font-body text-xs text-white/50 leading-relaxed">{meta.description}</p>
      </motion.div>
    </motion.div>
  )
}

// ─── Mandala / Concentric Rings ───────────────────────────────────────────────
function MandalaCenter() {
  return (
    <div className="relative flex items-center justify-center w-[280px] h-[280px]">
      {/* Outer ring — slow clockwise spin */}
      <div
        className="animate-spin-slow absolute inset-0 rounded-full"
        style={{
          border: '1px dashed rgba(200, 155, 60, 0.35)',
          boxShadow: '0 0 30px rgba(200, 155, 60, 0.08)',
        }}
      />

      {/* Inner ring — slow counter-clockwise spin */}
      <div
        className="animate-spin-reverse absolute rounded-full"
        style={{
          width: '200px',
          height: '200px',
          border: '1px solid rgba(200, 155, 60, 0.25)',
          boxShadow: '0 0 20px rgba(200, 155, 60, 0.06)',
        }}
      />

      {/* Innermost circle — Om symbol */}
      <div
        className="relative z-10 w-[120px] h-[120px] rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(200,155,60,0.12) 0%, rgba(11,11,11,0.8) 70%)',
          border: '2px solid transparent',
          backgroundClip: 'padding-box',
          boxShadow: '0 0 40px rgba(200, 155, 60, 0.25), inset 0 0 20px rgba(200, 155, 60, 0.08)',
        }}
      >
        {/* Gold gradient border via pseudo-element workaround using a wrapper */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #C89B3C 0%, #E7B75F 50%, #C89B3C 100%)',
            padding: '2px',
            borderRadius: '50%',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
        <span
          className="text-4xl select-none"
          style={{
            background: 'linear-gradient(135deg, #C89B3C 0%, #E7B75F 50%, #C89B3C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 8px rgba(200,155,60,0.5))',
          }}
        >
          🕉
        </span>
      </div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function PanchTatvaSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="panch-tatva"
      ref={ref}
      className="relative bg-charcoal-900 section-padding overflow-hidden"
    >
      {/* Radial gold glow at center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(200,155,60,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section heading */}
        <SectionHeading
          eyebrow="The Five Elements"
          title="Balanced by the Five"
          highlight="Elements"
          description={panchTatva.description}
        />

        {/* ── Desktop layout: pentagon around mandala ── */}
        <div className="hidden lg:block mt-20">
          <div className="relative min-h-[600px] mx-auto max-w-[700px]">
            {/* Mandala — centered absolutely */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <MandalaCenter />
            </div>

            {/* Pentagon cards */}
            {panchTatva.elements.map((element, index) => (
              <div
                key={element}
                className={`absolute ${DESKTOP_POSITIONS[index]}`}
              >
                <ElementCard element={element} index={index} inView={inView} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile layout: mandala + vertical stack ── */}
        <div className="lg:hidden mt-12 flex flex-col items-center gap-8">
          <MandalaCenter />
          <div className="flex flex-col items-center gap-4 w-full">
            {panchTatva.elements.map((element, index) => (
              <ElementCard key={element} element={element} index={index} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
