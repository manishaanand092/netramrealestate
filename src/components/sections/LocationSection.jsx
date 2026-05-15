import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin } from 'lucide-react'
import NETRAM_DATA from '../../data.js'
import SectionHeading from '../ui/SectionHeading.jsx'

const { locationAdvantages, contact } = NETRAM_DATA

// ─── Animated pin positions on the map placeholder ───────────────────────────
const MAP_PINS = [
  { top: '20%', left: '25%', delay: 0.2, label: 'Maa Ganga' },
  { top: '35%', left: '65%', delay: 0.35, label: 'Wave City' },
  { top: '60%', left: '40%', delay: 0.5, label: 'Highway' },
  { top: '70%', left: '72%', delay: 0.65, label: 'Hawa Hawai' },
]

// ─── Map placeholder panel ────────────────────────────────────────────────────
function MapPanel({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative order-2 lg:order-1"
    >
      {/* Outer ambient glow */}
      <div className="absolute -inset-4 bg-gold-500/6 rounded-[2rem] blur-2xl pointer-events-none" />

      {/* Map container */}
      <div className="relative rounded-3xl overflow-hidden aspect-square max-w-md mx-auto lg:mx-0">
        {/* Dark map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1520] via-charcoal-700 to-[#0a1018]" />

        {/* Subtle grid lines — map feel */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(200,155,60,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200,155,60,1) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Radial ambient glow at center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,155,60,0.07)_0%,transparent_65%)]" />

        {/* Concentric circle ripple animation — project location indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-gold-500/20"
              initial={{ width: 40, height: 40, opacity: 0.6 }}
              animate={{
                width: [40, 40 + ring * 60],
                height: [40, 40 + ring * 60],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2.5,
                delay: ring * 0.7,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Gold dot — project location */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative z-10 w-3 h-3 rounded-full bg-gold-500 shadow-[0_0_16px_rgba(200,155,60,0.9)]"
          />
        </div>

        {/* Animated pin markers */}
        {MAP_PINS.map((pin) => (
          <motion.div
            key={pin.label}
            className="absolute"
            style={{ top: pin.top, left: pin.left }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: pin.delay + 0.3 }}
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute -inset-2 rounded-full border border-gold-500/40"
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Pin dot */}
            <div className="relative w-2.5 h-2.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(200,155,60,0.7)]" />
          </motion.div>
        ))}

        {/* "Netram Township" glassmorphism label — center */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+28px)] z-20"
        >
          <div className="glass-card rounded-xl px-4 py-2 border border-gold-500/35 shadow-[0_0_20px_rgba(200,155,60,0.12)] whitespace-nowrap">
            <p className="font-heading text-sm font-bold text-gold-gradient">Netram Township</p>
            <p className="font-body text-[10px] text-white/40 text-center tracking-widest uppercase mt-0.5">
              Greater Ghaziabad
            </p>
          </div>
          {/* Connector line from label to dot */}
          <div className="mx-auto w-px h-4 bg-gradient-to-b from-gold-500/50 to-transparent" />
        </motion.div>

        {/* Corner accent lines */}
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold-500/40 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold-500/40 rounded-bl-xl pointer-events-none" />

        {/* Bottom label */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="glass-card-dark rounded-xl p-2.5 border border-gold-500/20 text-center">
            <p className="font-body text-[10px] text-gold-400 uppercase tracking-[0.2em]">
              Greater Ghaziabad · Uttar Pradesh
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Single location advantage card ──────────────────────────────────────────
function LocationCard({ item, index, inView, isFirst }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.3 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className={`group relative glass-card rounded-2xl p-5 flex items-start gap-4 cursor-default transition-all duration-300
        ${isFirst
          ? 'border-l-2 border-l-blue-400/70 hover:border-l-blue-300 hover:shadow-[0_0_30px_rgba(96,165,250,0.12)]'
          : 'border-l-2 border-l-gold-500/50 hover:border-l-gold-400 hover:shadow-[0_0_30px_rgba(200,155,60,0.15)]'
        }
      `}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
        ${isFirst
          ? 'bg-blue-500/10 border border-blue-400/25 group-hover:bg-blue-500/20 group-hover:border-blue-400/50'
          : 'bg-gold-500/10 border border-gold-500/20 group-hover:bg-gold-500/20 group-hover:border-gold-500/40'
        }
      `}>
        <MapPin
          size={16}
          className={isFirst ? 'text-blue-400' : 'text-gold-400'}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 min-w-0">
        <h3 className={`font-heading text-base font-bold leading-snug transition-colors duration-300
          ${isFirst ? 'text-blue-200 group-hover:text-blue-100' : 'text-white group-hover:text-gold-200'}
        `}>
          {item.title}
        </h3>
        <p className="font-body text-sm text-white/55 leading-relaxed group-hover:text-white/75 transition-colors duration-300">
          {item.description}
        </p>
      </div>

      {/* Hover right-arrow accent */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={`w-1.5 h-1.5 rounded-full ${isFirst ? 'bg-blue-400' : 'bg-gold-500'}`} />
      </div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function LocationSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="location"
      ref={ref}
      className="relative bg-charcoal-800 section-padding overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        {/* Left glow — complements the map panel */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold-500/4 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        {/* Right glow — behind the cards */}
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[100px] translate-x-1/3" />
        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold-500/10 rounded-tl-2xl" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold-500/10 rounded-br-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Map placeholder */}
          <MapPanel inView={inView} />

          {/* RIGHT: Content panel */}
          <div className="order-1 lg:order-2 flex flex-col gap-8">

            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                eyebrow="Location Advantages"
                title="Perfectly Connected,"
                highlight="Divinely Located"
                centered={false}
              />
            </motion.div>

            {/* Location cards with animated connecting line */}
            <div className="relative flex flex-col gap-4">
              {/* Animated vertical gold connecting line */}
              <div className="absolute left-[1.25rem] top-0 bottom-0 w-px overflow-hidden pointer-events-none">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                  className="w-full h-full bg-gradient-to-b from-gold-500/50 via-gold-500/20 to-transparent origin-top"
                />
              </div>

              {locationAdvantages?.map((item, index) => (
                <LocationCard
                  key={item.title}
                  item={item}
                  index={index}
                  inView={inView}
                  isFirst={index === 0}
                />
              ))}
            </div>

            {/* CTA nudge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center gap-4 pt-2"
            >
              <motion.a
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(200,155,60,0.45)' }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-full bg-gold-gradient text-charcoal-900 font-body font-bold text-sm shadow-gold transition-all duration-300"
              >
                Schedule Site Visit
              </motion.a>
              <motion.a
                href={`tel:${contact.phone}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-full border border-gold-500/40 text-gold-400 font-body font-semibold text-sm hover:bg-gold-500/5 hover:border-gold-500/70 transition-all duration-300"
              >
                Call Now
              </motion.a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
