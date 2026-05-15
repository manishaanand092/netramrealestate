import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, X, Calendar } from 'lucide-react'
import NETRAM_DATA from '../data.js'
import { useRipple } from '../hooks/useRipple.js'

const { contact } = NETRAM_DATA

export default function StickyEnquiryBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const createRipple = useRipple()

  useEffect(() => {
    const handleScroll = () => {
      if (!dismissed) setVisible(window.scrollY > 700)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dismissed])

  const waLink = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=Hi%2C%20I%27m%20interested%20in%20Netram%20Township.%20Please%20share%20details.`

  const scrollToForm = () => {
    document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: -56, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -56, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 32 }}
          className="fixed top-0 left-0 right-0 z-[150] hidden lg:flex h-9"
          role="banner"
          aria-label="Enquiry bar"
        >
          <div
            className="w-full border-b border-gold-500/15"
            style={{
              background: 'rgba(11,11,11,0.94)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between gap-4">
              {/* Scarcity message */}
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span className="font-body text-xs text-white/55">
                  <span className="text-gold-400 font-semibold">Only 40 Plots</span>
                  {' '}— Limited Pre-Launch Pricing Available
                </span>
              </div>

              {/* CTA buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={(e) => { createRipple(e); scrollToForm() }}
                  className="relative overflow-hidden flex items-center gap-1.5 px-5 py-2 rounded-full bg-gold-gradient text-charcoal-900 font-body font-bold text-xs shadow-gold hover:shadow-gold-lg transition-all duration-300 ripple-container"
                >
                  <Calendar size={12} />
                  Book Site Visit
                </button>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gold-500/30 text-gold-400 font-body font-semibold text-xs hover:bg-gold-500/8 hover:border-gold-500/55 transition-all duration-300"
                >
                  <MessageCircle size={12} />
                  WhatsApp
                </a>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/8 text-white/45 font-body font-semibold text-xs hover:border-white/20 hover:text-white/65 transition-all duration-300"
                >
                  <Phone size={12} />
                  Call
                </a>
              </div>

              {/* Dismiss */}
              <button
                onClick={() => setDismissed(true)}
                className="text-white/20 hover:text-white/45 transition-colors duration-300 flex-shrink-0"
                aria-label="Dismiss bar"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
