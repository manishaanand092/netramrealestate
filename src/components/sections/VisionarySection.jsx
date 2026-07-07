import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote, Award, Star, Shield } from 'lucide-react'
import NETRAM_DATA from '../../data.js'

const { company, trust, project } = NETRAM_DATA

// Timeline — project milestones only, no personal references
const TIMELINE = [
  { year: '2005', label: 'Real Estate Legacy Founded', icon: '🏢' },
  { year: '2012', label: 'Vedic Planning Research', icon: '📜' },
  { year: '2018', label: 'Thousands of Transactions', icon: '🤝' },
  { year: '2024', label: 'Netram Township Launched', icon: '🏡' },
]

const CREDENTIALS = [
  { icon: <Shield size={16} className="text-gold-400" />, label: 'Zero Consumer Complaints' },
  { icon: <Award size={16} className="text-gold-400" />, label: 'Vedic Architecture Expertise' },
  { icon: <Star size={16} className="text-gold-400" />, label: 'Thousands of Successful Transactions' },
]

// Floating spiritual particles
function Particle({ style }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gold-500/25 blur-sm pointer-events-none"
      style={style}
      animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: style.dur || 6, repeat: Infinity, ease: 'easeInOut', delay: style.del || 0 }}
    />
  )
}

const PARTICLES = [
  { width: 5,  height: 5,  top: '10%', left: '5%',  dur: 7,   del: 0   },
  { width: 4,  height: 4,  top: '25%', left: '12%', dur: 5.5, del: 1   },
  { width: 6,  height: 6,  top: '60%', left: '8%',  dur: 8,   del: 2   },
  { width: 3,  height: 3,  top: '80%', left: '15%', dur: 6,   del: 0.5 },
  { width: 5,  height: 5,  top: '40%', left: '3%',  dur: 7.5, del: 1.5 },
  { width: 4,  height: 4,  top: '70%', left: '20%', dur: 5,   del: 3   },
]

export default function VisionarySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const imgRef = useRef(null)
  const imgInView = useInView(imgRef, { once: true, margin: '-80px' })

  return (
    <section
      id="visionary-behind-netram"
      className="relative bg-charcoal-800 section-padding overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold-500/4 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gold-600/3 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT — Visual panel */}
          <motion.div
            ref={imgRef}
            initial={{ opacity: 0, x: -60 }}
            animate={imgInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            {/* Floating particles */}
            {PARTICLES.map((p, i) => <Particle key={i} style={p} />)}

            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gold-500/8 blur-[60px] scale-110 pointer-events-none" />

            {/* Circular glowing frame */}
            <div className="relative mx-auto max-w-sm lg:max-w-md">
              {/* Outer decorative ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-16px] rounded-full border border-dashed border-gold-500/20 pointer-events-none"
              />
              {/* Inner ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-6px] rounded-full border border-gold-500/15 pointer-events-none"
              />

              {/* Profile video */}
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4]">
                <video
                  src="/profile video/Netram Profile Video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-transparent to-transparent pointer-events-none" />

                {/* Project identity overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="glass-card-dark rounded-2xl p-4 border border-gold-500/25">
                    <p className="font-heading text-xl font-bold text-white mb-0.5">
                      Netram Township
                    </p>
                    <p className="font-body text-xs text-gold-400 tracking-wide">
                      {project.type}
                    </p>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 right-4 w-14 h-14 border-t-2 border-r-2 border-gold-500/40 rounded-tr-xl pointer-events-none" />
                <div className="absolute top-4 left-4 w-14 h-14 border-t-2 border-l-2 border-gold-500/40 rounded-tl-xl pointer-events-none" />
              </div>

              {/* Floating project badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 sm:-right-8 glass-card border border-gold-500/30 rounded-2xl p-3 shadow-gold"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">🕉️</div>
                  <div className="font-body text-xs text-gold-400 font-semibold whitespace-nowrap">Vedic Design</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -bottom-4 -left-4 sm:-left-8 glass-card border border-gold-500/30 rounded-2xl p-3 shadow-gold"
              >
                <div className="text-center">
                  <div className="font-heading text-xl font-bold text-gold-gradient">0</div>
                  <div className="font-body text-xs text-white/50 whitespace-nowrap">Complaints</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — Content */}
          <div ref={ref} className="order-1 lg:order-2 flex flex-col gap-7">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-body text-xs text-gold-400 uppercase tracking-[0.3em]"
            >
              The Vision Behind Netram
            </motion.p>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              A Legacy of{' '}
              <span className="text-gold-gradient italic">Conscious</span>
              <br />
              Real Estate
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

            {/* Description — company focused, no personal bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-base text-white/60 leading-relaxed"
            >
              Netram Township has built a trusted legacy of thousands of successful real estate transactions, guided by a commitment to transparency, integrity and zero consumer complaints.
            </motion.p>

            {/* Spiritual context */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-body text-sm text-white/45 leading-relaxed italic"
            >
              Rooted in deep knowledge of Jyotish, Tantra and Vedic science, Netram Township is the culmination of years of research into conscious, spiritually aligned living.
            </motion.p>

            {/* Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {CREDENTIALS.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-gold-500/20 text-white/70 text-xs font-body font-medium"
                >
                  {c.icon}
                  {c.label}
                </div>
              ))}
            </motion.div>

            {/* Premium quote block — no personal attribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="relative glass-card rounded-2xl p-6 border-l-2 border-gold-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none" />
              <Quote size={28} className="text-gold-500/40 mb-3" />
              <p className="font-heading text-lg sm:text-xl text-white/85 italic leading-relaxed relative z-10">
                "Netram is not just a township — it is a conscious way of living."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="h-px w-8 bg-gold-gradient" />
                <p className="font-body text-xs text-gold-400 font-semibold tracking-wide">
                  — {company.name}
                </p>
              </div>
            </motion.div>

            {/* Timeline — project milestones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                  className="group flex flex-col items-center text-center gap-2 p-3 rounded-xl glass-card border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-heading text-sm font-bold text-gold-gradient">{item.year}</span>
                  <span className="font-body text-xs text-white/45 leading-tight">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
