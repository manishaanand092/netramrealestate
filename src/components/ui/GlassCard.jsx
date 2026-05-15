import React from 'react'
import { motion } from 'framer-motion'

/**
 * GlassCard — reusable glassmorphism card
 *
 * Props:
 *   children
 *   className
 *   hover    {boolean}  — enable lift + glow on hover (default true)
 *   glow     {boolean}  — enable gold border glow class (default true)
 *   luxury   {boolean}  — use luxury-card class instead of glass-card (default false)
 *   as       {string}   — HTML element to render (default 'div')
 */
export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = true,
  luxury = false,
  as: Tag = 'div',
}) {
  const baseClass = luxury ? 'luxury-card' : 'glass-card'
  const glowClass = glow ? 'gold-border-glow' : ''

  const classes = [baseClass, glowClass, 'rounded-2xl', className]
    .filter(Boolean)
    .join(' ')

  if (hover) {
    return (
      <motion.div
        className={classes}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {children}
      </motion.div>
    )
  }

  return <Tag className={classes}>{children}</Tag>
}
