import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading.jsx'

// All images from public/site-visuals — filenames match exactly
const SITE_VISUALS = [
  '/site-visuals/Site Visual 1.jpeg',
  '/site-visuals/Site Visual 2.jpeg',
  '/site-visuals/Site Visual 3.jpeg',
  '/site-visuals/Site Visual 4.jpeg',
  '/site-visuals/Site visual 5.jpeg',
  '/site-visuals/Site Visual 6.jpeg',
  '/site-visuals/Site Visual 7.jpeg',
  '/site-visuals/Site visual 8.jpeg',
  '/site-visuals/Site Visual 9.jpeg',
  '/site-visuals/Site Visual 10.jpeg',
  '/site-visuals/Site Visual 11.jpeg',
  '/site-visuals/Site Visual 12.jpeg',
  '/site-visuals/Site Visual 13.jpeg',
  '/site-visuals/Site Visual 14.jpeg',
  '/site-visuals/Site Visual 15.jpeg',
]

export default function SiteVisualsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="site-visuals"
      ref={ref}
      className="relative bg-charcoal-800 section-padding overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12">
          <SectionHeading
            eyebrow="Gallery"
            title="Site"
            highlight="Visuals"
          />
        </div>

        {/* Responsive gallery grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {SITE_VISUALS.map((src, i) => (
            <div
              key={src}
              className="relative overflow-hidden rounded-2xl border border-gold-500/15 group"
            >
              <img
                src={src}
                alt={`Netram Township Site Visual ${i + 1}`}
                loading="lazy"
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ display: 'block' }}
              />
              {/* Subtle gold overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
