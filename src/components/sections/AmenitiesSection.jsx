import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import NETRAM_DATA from '../../data.js'
import SectionHeading from '../ui/SectionHeading'

const { amenities } = NETRAM_DATA

// ─── Premium descriptions (presentational copy, not business data) ────────────
const AMENITY_DESCRIPTIONS = {
  'Commercial Zone': 'Curated retail & lifestyle spaces',
  'Swimming Pool': 'Resort-style aquatic retreat',
  'Club House': "Exclusive members' social hub",
  'Jogging Track': 'Scenic wellness pathway',
  'Temple': 'Sacred spiritual sanctuary',
  '55% Green Area': 'Lush Ayurvedic landscape',
  'Guard Room': '24/7 premium security',
  'Ashram': 'Meditation & yoga retreat',
}

// ─── Single amenity card ──────────────────────────────────────────────────────
function AmenityCard({ amenity, index, inView }) {
  const description = AMENITY_DESCRIPTIONS[amenity.name] ?? ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative glass-card gold-border-glow rounded-2xl p-6 sm:p-8 flex flex-col gap-4 cursor-default overflow-hidden"
    >
      {/* Hover background glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/0 to-gold-600/0 group-hover:from-gold-500/5 group-hover:to-gold-600/3 transition-all duration-500 pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500/50 transition-all duration-500 pointer-events-none" />

      {/* Icon box — 16×16 (w-16 h-16) gold-tinted rounded-2xl */}
      <div className="relative w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-3xl group-hover:bg-gold-500/20 group-hover:border-gold-500/40 group-hover:shadow-gold transition-all duration-300 flex-shrink-0">
        {amenity.icon}
      </div>

      {/* Name */}
      <h3 className="relative font-heading text-lg sm:text-xl font-bold text-white group-hover:text-gold-300 transition-colors duration-300">
        {amenity.name}
      </h3>

      {/* Description */}
      <p className="relative font-body text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300 flex-1">
        {description}
      </p>

      {/* Animated bottom border line — width 0 → 75% on hover */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-0 group-hover:w-3/4 bg-gold-gradient transition-all duration-500 ease-out" />
        <div className="absolute inset-0 bg-gold-500/10" />
      </div>

      {/* Corner decoration */}
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-gold-500/0 group-hover:border-gold-500/30 rounded-br-lg transition-all duration-500 pointer-events-none" />
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function AmenitiesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="amenities"
      ref={ref}
      className="relative bg-charcoal-900 section-padding overflow-hidden"
    >
      {/* Background texture — subtle dot pattern (same as PhilosophySection) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(200,155,60,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gold-500/4 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="mb-16">
          <SectionHeading
            eyebrow="World-Class Amenities"
            title="Everything You"
            highlight="Deserve"
          />
        </div>

        {/* Amenities grid — 4-col desktop / 2-col tablet / 1-col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {amenities.map((amenity, i) => (
            <AmenityCard
              key={amenity.name}
              amenity={amenity}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
