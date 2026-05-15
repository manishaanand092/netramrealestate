import React from 'react'
import { motion } from 'framer-motion'
import NETRAM_DATA from '../data.js'

const { project } = NETRAM_DATA

const LETTERS = 'NETRAM'.split('')

// Gold light streaks
const STREAKS = [
  { left: '20%', height: '35%', delay: 0.2, duration: 1.8 },
  { left: '50%', height: '55%', delay: 0.5, duration: 2.2 },
  { left: '75%', height: '28%', delay: 0.8, duration: 1.6 },
]

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal-900 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(200,155,60,0.14) 0%, rgba(200,155,60,0.04) 50%, transparent 75%)',
        }}
      />

      {/* Gold light streaks */}
      {STREAKS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-px pointer-events-none"
          style={{
            left: s.left,
            height: s.height,
            background: 'linear-gradient(180deg, transparent, rgba(200,155,60,0.5), transparent)',
          }}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '200vh', opacity: [0, 0.8, 0] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,155,60,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,155,60,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Logo mark */}
      <div className="relative flex items-center justify-center mb-10">
        {/* Outer pulse ring 1 */}
        <motion.div
          className="absolute rounded-full border border-gold-500/20"
          style={{ width: 110, height: 110 }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Outer pulse ring 2 */}
        <motion.div
          className="absolute rounded-full border border-gold-500/12"
          style={{ width: 140, height: 140 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />

        {/* Logo circle */}
        <motion.div
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: 80,
            height: 80,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(200,155,60,0.45)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 40px rgba(200,155,60,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 40% 35%, rgba(200,155,60,0.2), transparent 65%)',
            }}
          />
          <span
            className="font-heading text-4xl font-bold text-gold-gradient relative z-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            N
          </span>
        </motion.div>
      </div>

      {/* NETRAM — letter-by-letter stagger */}
      <motion.div
        className="flex items-center gap-[0.15em] mb-5"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
        }}
      >
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="text-4xl font-bold tracking-[0.22em] text-gold-gradient"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1, ease: 'easeOut' }}
        className="text-xs tracking-[0.35em] uppercase text-white/35 mb-12"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {project.tagline}
      </motion.p>

      {/* Loading bar */}
      <motion.div
        className="relative overflow-hidden rounded-full"
        style={{
          width: 140,
          height: 1,
          background: 'rgba(200,155,60,0.15)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #C89B3C, #E7B75F, #C89B3C, transparent)',
          }}
          initial={{ x: '-100%', width: '60%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.2 }}
        />
      </motion.div>
    </motion.div>
  )
}
