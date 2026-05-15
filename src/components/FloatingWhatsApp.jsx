import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import NETRAM_DATA from '../data.js'

const { contact, project } = NETRAM_DATA

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false)

  const waLink = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(project.name)}%20Pre-Launch%20Plots.%20Please%20share%20details.`

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-8 sm:right-7 z-50 flex flex-col items-end gap-3">
      {/* Tooltip card */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 16, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.92 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative glass-card-dark border border-gold-500/25 rounded-2xl p-4 max-w-[210px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-white/25 hover:text-white/55 transition-colors"
              aria-label="Close tooltip"
            >
              <X size={11} />
            </button>
            <p className="font-body text-xs text-white/65 leading-relaxed pr-3">
              Chat for{' '}
              <span className="text-gold-400 font-semibold">exclusive pre-launch pricing</span>
              {' '}& free site visit.
            </p>
            {/* Arrow */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-charcoal-800 border-r border-b border-gold-500/20 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: 'spring', stiffness: 220, damping: 18 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-full flex items-center justify-center"
        style={{
          background: '#25D366',
          boxShadow: '0 4px 24px rgba(37,211,102,0.45)',
        }}
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse rings */}
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: 'rgba(37,211,102,0.3)' }}
        />
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: 'rgba(37,211,102,0.15)', animationDelay: '0.6s' }}
        />
        <MessageCircle size={26} className="text-white relative z-10" fill="white" />
      </motion.a>
    </div>
  )
}
