import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import NETRAM_DATA from '../data.js'

const { contact } = NETRAM_DATA

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const waLink = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=Hi%2C%20I%27m%20interested%20in%20Netram%20Township%20Pre-Launch%20Plots.`

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden"
        >
          {/* Top gold line */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

          <div
            className="flex gap-2.5 px-4 py-3"
            style={{
              background: 'rgba(11,11,11,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            <a
              href={`tel:${contact.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-gold-500/30 text-gold-400 font-body font-semibold text-sm active:scale-95 transition-transform duration-150"
            >
              <Phone size={16} />
              Call Now
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-body font-bold text-sm text-charcoal-900 active:scale-95 transition-transform duration-150"
              style={{
                background: 'linear-gradient(135deg, #C89B3C 0%, #E7B75F 50%, #C89B3C 100%)',
                boxShadow: '0 0 20px rgba(200,155,60,0.35)',
              }}
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>

          {/* Safe area spacer for iOS */}
          <div className="h-safe-area-inset-bottom bg-charcoal-900/92" style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
