import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar } from 'lucide-react'

export default function FloatingBookVisit() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 800)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    const el = document.getElementById('enquire')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: 60 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToForm}
          className="fixed right-5 sm:right-8 bottom-44 sm:bottom-28 z-50 hidden sm:flex items-center gap-2 px-5 py-3 rounded-full bg-gold-gradient text-charcoal-900 font-body font-bold text-sm shadow-gold hover:shadow-gold-lg transition-all duration-300"
          aria-label="Book a site visit"
        >
          <Calendar size={16} />
          Book Visit
        </motion.button>
      )}
    </AnimatePresence>
  )
}
