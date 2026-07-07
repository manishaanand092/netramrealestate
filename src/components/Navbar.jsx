import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import NETRAM_DATA from '../data.js'
import { useRipple } from '../hooks/useRipple.js'

const { navigation, contact } = NETRAM_DATA

// Enquiry bar height in px — must match StickyEnquiryBar
const ENQUIRY_BAR_HEIGHT = 36

// Smooth scroll to section by id
function scrollToSection(item) {
  const id = item.toLowerCase().replace(/\s+/g, '-')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Desktop nav link with animated underline
function NavLink({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative text-sm font-body font-medium text-white/65 hover:text-gold-300 transition-colors duration-300 group py-1 px-0.5"
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-gradient group-hover:w-full transition-all duration-350 ease-out" />
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // Track whether the enquiry bar is currently visible (desktop only, after 700px scroll)
  const [enquiryBarVisible, setEnquiryBarVisible] = useState(false)
  const createRipple = useRipple()

  const handleScroll = useCallback(() => {
    const y = window.scrollY
    setScrolled(y > 40)
    // Mirror the StickyEnquiryBar visibility logic (> 700px, desktop)
    setEnquiryBarVisible(y > 700 && window.innerWidth >= 1024)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [handleScroll])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (item) => {
    setMenuOpen(false)
    scrollToSection(item)
  }

  const waLink = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: 0,
          // Slide navbar down by enquiry bar height when bar is visible on desktop
          top: enquiryBarVisible ? ENQUIRY_BAR_HEIGHT : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 z-[160] transition-[background,border,box-shadow] duration-500 ${
          scrolled
            ? 'bg-charcoal-900/96 backdrop-blur-2xl shadow-[0_4px_40px_rgba(0,0,0,0.7)] border-b border-gold-500/10'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Scroll progress line inside navbar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/0 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">

            {/* Logo */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 group"
              aria-label="Go to top"
            >
              <img
                src="/logo/Netam Logo.png"
                alt="Netram Township"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </motion.button>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-7">
              {navigation.slice(0, 6).map((item) => (
                <NavLink
                  key={item}
                  label={item}
                  onClick={() => handleNavClick(item)}
                />
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-1.5 text-white/50 hover:text-gold-400 transition-colors duration-300 text-xs font-body"
              >
                <Phone size={13} />
                <span>{contact.phone}</span>
              </a>

              <motion.a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(200,155,60,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={createRipple}
                className="relative overflow-hidden px-5 py-2.5 bg-gold-gradient text-charcoal-900 font-body font-bold text-sm rounded-full shadow-gold transition-all duration-300 ripple-container"
              >
                Book Now
              </motion.a>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 text-gold-400 hover:text-gold-300 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-charcoal-900/98 backdrop-blur-2xl flex flex-col pt-20 px-6 pb-10 overflow-y-auto"
          >
            {/* Background glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Nav links */}
            <nav className="flex flex-col gap-0.5 mt-4 relative z-10">
              {navigation.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => handleNavClick(item)}
                  className="text-left py-4 px-2 text-lg font-body font-medium text-white/75 hover:text-gold-400 border-b border-white/5 transition-colors duration-300 flex items-center justify-between group"
                >
                  <span>{item}</span>
                  <span className="text-gold-500/0 group-hover:text-gold-500/60 transition-colors duration-300 text-sm">→</span>
                </motion.button>
              ))}
            </nav>

            {/* Mobile CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="mt-8 flex flex-col gap-3 relative z-10"
            >
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center justify-center gap-2 py-3.5 px-6 border border-gold-500/35 rounded-full text-gold-400 font-body font-semibold text-sm hover:bg-gold-500/8 transition-all duration-300"
              >
                <Phone size={16} />
                {contact.phone}
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 bg-gold-gradient text-charcoal-900 font-body font-bold rounded-full text-center shadow-gold text-sm"
              >
                Book Now — Free Site Visit
              </a>
            </motion.div>

            {/* Footer note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto pt-8 text-center font-body text-xs text-white/20 relative z-10"
            >
              Only 40 plots available — Limited Pre-Launch
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
