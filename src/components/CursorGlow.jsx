import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Premium three-layer cursor system (desktop / fine pointer only):
 *   1. Large ambient glow blob  — slow spring, gold radial gradient
 *   2. Cursor ring              — medium spring, expands on hover
 *   3. Cursor dot               — fast spring, gold fill
 *
 * On interactive elements (buttons, links, [data-cursor-hover]):
 *   - Ring scales up to 2.5×
 *   - Dot scales down (hidden inside ring)
 *   - Glow intensifies
 */
export default function CursorGlow() {
  const [isPointerFine, setIsPointerFine] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // Raw mouse position
  const rawX = useMotionValue(-400)
  const rawY = useMotionValue(-400)

  // Glow blob — very slow, dreamy lag
  const glowX = useSpring(rawX, { stiffness: 55, damping: 22, mass: 0.8 })
  const glowY = useSpring(rawY, { stiffness: 55, damping: 22, mass: 0.8 })

  // Ring — medium lag
  const ringX = useSpring(rawX, { stiffness: 140, damping: 18, mass: 0.5 })
  const ringY = useSpring(rawY, { stiffness: 140, damping: 18, mass: 0.5 })

  // Dot — snappy, near-instant
  const dotX = useSpring(rawX, { stiffness: 600, damping: 28 })
  const dotY = useSpring(rawY, { stiffness: 600, damping: 28 })

  const checkPointer = useCallback(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setIsPointerFine(mq.matches)
    return mq
  }, [])

  useEffect(() => {
    const mq = checkPointer()
    const handleChange = (e) => setIsPointerFine(e.matches)
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [checkPointer])

  useEffect(() => {
    if (!isPointerFine) return

    const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, [data-cursor-hover]'

    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }

    const onEnter = (e) => {
      if (e.target.closest(INTERACTIVE)) setIsHovering(true)
    }

    const onLeave = (e) => {
      if (e.target.closest(INTERACTIVE)) setIsHovering(false)
    }

    const onDown = () => setIsClicking(true)
    const onUp   = () => setIsClicking(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onEnter, { passive: true })
    document.addEventListener('mouseout', onLeave, { passive: true })
    window.addEventListener('mousedown', onDown, { passive: true })
    window.addEventListener('mouseup', onUp, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [isPointerFine, rawX, rawY])

  if (!isPointerFine) return null

  const GLOW_SIZE = 380
  const RING_SIZE = 36
  const DOT_SIZE  = 8

  return (
    <>
      {/* Layer 1 — Ambient glow blob */}
      <motion.div
        aria-hidden="true"
        className="cursor-glow pointer-events-none"
        style={{
          x: glowX,
          y: glowY,
          translateX: -(GLOW_SIZE / 2),
          translateY: -(GLOW_SIZE / 2),
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          opacity: isHovering ? 0.12 : 0.07,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Layer 2 — Cursor ring */}
      <motion.div
        aria-hidden="true"
        className="cursor-ring pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: -(RING_SIZE / 2),
          translateY: -(RING_SIZE / 2),
          width: RING_SIZE,
          height: RING_SIZE,
          scale: isClicking ? 0.8 : isHovering ? 2.2 : 1,
          opacity: isHovering ? 0.9 : 0.55,
          borderColor: isHovering
            ? 'rgba(231, 183, 95, 0.8)'
            : 'rgba(200, 155, 60, 0.5)',
          transition: 'scale 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease, border-color 0.25s ease',
        }}
      />

      {/* Layer 3 — Cursor dot */}
      <motion.div
        aria-hidden="true"
        className="cursor-dot pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: -(DOT_SIZE / 2),
          translateY: -(DOT_SIZE / 2),
          width: DOT_SIZE,
          height: DOT_SIZE,
          scale: isClicking ? 0.6 : isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
          transition: 'scale 0.2s ease, opacity 0.2s ease',
        }}
      />
    </>
  )
}
