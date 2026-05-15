import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import NETRAM_DATA from '../../data.js'

const { philosophy } = NETRAM_DATA

function PhilosophyCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative glass-card gold-border-glow rounded-2xl p-6 sm:p-8 flex flex-col gap-4 cursor-default overflow-hidden"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/0 to-gold-600/0 group-hover:from-gold-500/5 group-hover:to-gold-600/3 transition-all duration-500" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500/50 transition-all duration-500" />

      {/* Icon */}
      <div className="relative w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-3xl group-hover:bg-gold-500/20 group-hover:border-gold-500/40 group-hover:shadow-gold transition-all duration-300">
        {item.icon}
      </div>

      {/* Title */}
      <h3 className="relative font-heading text-lg sm:text-xl font-bold text-white group-hover:text-gold-300 transition-colors duration-300">
        {item.title}
      </h3>

      {/* Divider */}
      <div className="relative h-px bg-gradient-to-r from-gold-500/30 to-transparent w-12 group-hover:w-full transition-all duration-500" />

      {/* Description */}
      <p className="relative font-body text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
        {item.description}
      </p>

      {/* Corner decoration */}
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-gold-500/0 group-hover:border-gold-500/30 rounded-br-lg transition-all duration-500" />
    </motion.div>
  )
}

export default function PhilosophySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="philosophy" className="relative py-20 sm:py-28 lg:py-36 bg-charcoal-900 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(200,155,60,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-body text-xs text-gold-400 uppercase tracking-[0.3em] mb-3"
          >
            Our Philosophy
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {philosophy.title.split(' ').slice(0, 3).join(' ')}{' '}
            <span className="text-gold-gradient italic">
              {philosophy.title.split(' ').slice(3).join(' ')}
            </span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center gap-3 origin-center"
          >
            <div className="h-px w-16 bg-gold-gradient opacity-60" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <div className="h-px w-16 bg-gold-gradient opacity-60" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-base text-white/50 mt-5 max-w-2xl mx-auto leading-relaxed"
          >
            Every element of Netram Township is thoughtfully designed around ancient Vedic principles,
            creating a living environment that nurtures body, mind and spirit.
          </motion.p>
        </div>

        {/* Philosophy grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {philosophy.items.map((item, i) => (
            <PhilosophyCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-14"
        >
          <p className="font-body text-sm text-white/40 mb-5">
            Experience a life aligned with the cosmos
          </p>
          <motion.a
            href={`https://wa.me/${NETRAM_DATA.contact.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(200,155,60,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold-gradient text-charcoal-900 font-body font-bold text-sm rounded-full shadow-gold transition-all duration-300"
          >
            Discover Your Sacred Space →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
