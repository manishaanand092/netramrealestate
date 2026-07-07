import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, MapPin, Star, Leaf, Sparkles, Volume2, VolumeX } from 'lucide-react'
import NETRAM_DATA from '../../data.js'

const { heroSection, project, contact } = NETRAM_DATA

// Floating particle component
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
  { width: 6, height: 6, top: '15%', left: '10%', duration: 7, delay: 0 },
  { width: 4, height: 4, top: '25%', left: '80%', duration: 5, delay: 1 },
  { width: 8, height: 8, top: '60%', left: '5%', duration: 8, delay: 2 },
  { width: 5, height: 5, top: '70%', left: '90%', duration: 6, delay: 0.5 },
  { width: 10, height: 10, top: '40%', left: '50%', duration: 9, delay: 3 },
  { width: 3, height: 3, top: '80%', left: '30%', duration: 5, delay: 1.5 },
  { width: 7, height: 7, top: '10%', left: '60%', duration: 7, delay: 2.5 },
  { width: 4, height: 4, top: '50%', left: '20%', duration: 6, delay: 0.8 },
]

const badgeIcons = {
  'Near Maa Ganga': <MapPin size={12} />,
  '55% Green Area': <Leaf size={12} />,
  'Vaastu Perfect': <Star size={12} />,
  'Limited Pre-Launch': <Sparkles size={12} />,
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HeroSection() {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setMuted(videoRef.current.muted)
    }
  }
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal-900"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder image overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')] bg-cover bg-center opacity-10" />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-900/95 to-charcoal-800/90" />
        {/* Gold radial glow left */}
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-gold-500/8 rounded-full blur-[120px] -translate-x-1/2" />
        {/* Gold radial glow right */}
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gold-600/6 rounded-full blur-[100px] translate-x-1/3" />
        {/* Top center glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold-500/5 rounded-full blur-[80px]" />
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

      {/* Decorative grid lines */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(200,155,60,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,155,60,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Text Content */}
          <div className="flex flex-col gap-6">
            {/* Status badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 w-fit"
            >
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-gold-500/30 text-gold-400 text-xs font-body font-medium tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                {project.status} — {project.type}
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-white"
            >
              Where{' '}
              <span className="text-gold-gradient italic">Sanatan Wisdom</span>
              <br />
              Meets Modern Living
            </motion.h1>

            {/* Divider */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="flex items-center gap-3"
            >
              <div className="h-px w-12 bg-gold-gradient" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              <div className="h-px w-24 bg-gold-gradient opacity-50" />
            </motion.div>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="font-body text-base sm:text-lg text-white/60 leading-relaxed max-w-xl"
            >
              {heroSection.subheading}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-col sm:flex-row gap-4 mt-2"
            >
              <motion.a
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(200,155,60,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-4 bg-gold-gradient text-charcoal-900 font-body font-bold text-sm rounded-full shadow-gold text-center transition-all duration-300"
              >
                {heroSection.ctaPrimary}
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  document.getElementById('masterplan')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-7 py-4 border border-gold-500/40 text-gold-400 font-body font-semibold text-sm rounded-full hover:border-gold-400 hover:bg-gold-500/5 transition-all duration-300 text-center"
              >
                {heroSection.ctaSecondary}
              </motion.button>
            </motion.div>

            {/* Badges */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="flex flex-wrap gap-2 mt-2"
            >
              {heroSection.badges.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 px-3 py-1.5 glass-card rounded-full text-xs font-body text-gold-300 border border-gold-500/20"
                >
                  {badgeIcons[badge] || <Star size={10} />}
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Profile Video */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-sm"
            >
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gold-500/10 rounded-3xl blur-3xl scale-110" />

              <div className="relative glass-card rounded-3xl border border-gold-500/20 shadow-[0_20px_80px_rgba(0,0,0,0.6)] overflow-hidden">
                <video
                  ref={videoRef}
                  src="/profile video/Netram Profile Video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto block"
                  style={{ display: 'block' }}
                />
                {/* Subtle bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-charcoal-900/60 to-transparent pointer-events-none" />
                {/* Gold top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent pointer-events-none" />
                {/* Mute / Unmute toggle */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card-dark border border-gold-500/30 text-gold-400 hover:border-gold-500/60 hover:text-gold-300 transition-all duration-300"
                  aria-label={muted ? 'Unmute video' : 'Mute video'}
                >
                  {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                  <span className="font-body text-[10px] font-medium tracking-wide">
                    {muted ? 'Unmute' : 'Mute'}
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-body text-xs text-white/30 tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} className="text-gold-500/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
