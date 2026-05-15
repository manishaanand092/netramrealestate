import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Scroll progress bar — gold gradient, pinned above everything.
 * Uses a spring for smooth deceleration.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] pointer-events-none"
    >
      {/* Gradient bar */}
      <div
        className="w-full h-full"
        style={{
          background: 'linear-gradient(90deg, #C89B3C 0%, #E7B75F 50%, #F5D98B 100%)',
        }}
      />
      {/* Trailing glow */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-4 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(231,183,95,0.8) 0%, transparent 70%)',
          filter: 'blur(4px)',
        }}
      />
    </motion.div>
  )
}
