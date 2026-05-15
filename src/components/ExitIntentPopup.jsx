import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Phone } from 'lucide-react'
import NETRAM_DATA from '../data.js'

const { contact, project } = NETRAM_DATA

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const triggered = useRef(false)

  useEffect(() => {
    // Show after 30s if not dismissed
    const timer = setTimeout(() => {
      if (!triggered.current && !dismissed) {
        triggered.current = true
        setVisible(true)
      }
    }, 30000)

    // Mouse leave (exit intent) — desktop only
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !triggered.current && !dismissed) {
        triggered.current = true
        setVisible(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [dismissed])

  const dismiss = () => {
    setVisible(false)
    setDismissed(true)
  }

  const waLink = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(project.name)}%20Pre-Launch%20Plots.`

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-[300] bg-charcoal-900/80 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[301] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md glass-card rounded-3xl p-8 border border-gold-500/30 overflow-hidden shadow-gold-lg">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/8 to-transparent pointer-events-none" />
              {/* Corner accents */}
              <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-gold-500/30 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b border-l border-gold-500/30 rounded-bl-xl pointer-events-none" />

              {/* Close */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/25 transition-all duration-300 z-10"
                aria-label="Close"
              >
                <X size={14} />
              </button>

              <div className="relative z-10 flex flex-col items-center text-center gap-5">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold">
                  <span className="text-2xl">🏡</span>
                </div>

                {/* Eyebrow */}
                <p className="font-body text-xs text-gold-400 uppercase tracking-[0.25em]">
                  Wait — Don't Miss Out
                </p>

                {/* Heading */}
                <h3 className="font-heading text-2xl font-bold text-white leading-tight">
                  Only{' '}
                  <span className="text-gold-gradient italic">40 Plots</span>
                  <br />
                  Available
                </h3>

                {/* Body */}
                <p className="font-body text-sm text-white/55 leading-relaxed max-w-xs">
                  Pre-launch pricing ends soon. Secure your Vaastu-perfect plot beside Maa Ganga before the public launch.
                </p>

                {/* Gold divider */}
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gold-gradient" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  <div className="h-px w-12 bg-gold-gradient opacity-50" />
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={dismiss}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gold-gradient text-charcoal-900 font-body font-bold text-sm shadow-gold"
                  >
                    <MessageCircle size={16} />
                    WhatsApp Us
                  </a>
                  <a
                    href={`tel:${contact.phone}`}
                    onClick={dismiss}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-gold-500/35 text-gold-400 font-body font-semibold text-sm hover:bg-gold-500/8 transition-all duration-300"
                  >
                    <Phone size={16} />
                    Call Now
                  </a>
                </div>

                <button
                  onClick={dismiss}
                  className="font-body text-xs text-white/25 hover:text-white/45 transition-colors duration-300"
                >
                  No thanks, I'll miss this opportunity
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
