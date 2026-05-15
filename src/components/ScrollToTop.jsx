import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          whileHover={{ scale: 1.12, boxShadow: '0 0 24px rgba(200,155,60,0.35)' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 left-4 sm:bottom-8 sm:left-7 z-50 w-11 h-11 rounded-full flex items-center justify-center text-gold-400 transition-all duration-300"
          style={{
            background: 'rgba(11,11,11,0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(200,155,60,0.28)',
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={18} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
