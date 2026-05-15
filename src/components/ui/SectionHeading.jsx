import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * SectionHeading — Reusable animated section header
 *
 * Props:
 *   eyebrow    {string}  Small uppercase label above heading
 *   title      {string}  Main heading (first part, white)
 *   highlight  {string}  Italic gold gradient part of heading
 *   description {string} Optional subtitle paragraph
 *   centered   {boolean} Default true — centers all content
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  centered = true,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const alignClass = centered ? 'text-center items-center' : 'text-left items-start'
  const dividerOrigin = centered ? 'origin-center' : 'origin-left'

  return (
    <div ref={ref} className={`flex flex-col gap-4 ${alignClass}`}>
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="font-body text-xs text-gold-400 uppercase tracking-[0.3em]"
      >
        {eyebrow}
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
      >
        {title}{' '}
        <span className="text-gold-gradient italic">{highlight}</span>
      </motion.h2>

      {/* Animated gold divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`flex items-center gap-3 ${dividerOrigin}`}
      >
        <div className="h-px w-16 bg-gold-gradient opacity-60" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
        <div className="h-px w-16 bg-gold-gradient opacity-60" />
      </motion.div>

      {/* Optional description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-base text-white/50 leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
