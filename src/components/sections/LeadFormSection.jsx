import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, CheckCircle2, Send, User, Mail, Smartphone, Home, MessageSquare } from 'lucide-react'
import NETRAM_DATA from '../../data.js'

const { contact, project, plots } = NETRAM_DATA

const BENEFITS = [
  { icon: '🏡', text: 'Exclusive pre-launch pricing' },
  { icon: '📋', text: 'Complete documentation support' },
  { icon: '🚗', text: 'Free site visit arrangement' },
  { icon: '💬', text: 'Direct access to founder' },
  { icon: '🔒', text: 'Zero hidden charges' },
  { icon: '✅', text: 'Vaastu consultation included' },
]

const PLOT_OPTIONS = ['Select Plot Size', ...plots.map((p) => p.size), 'Not Sure Yet']

// Floating label input
function FloatingInput({ id, label, type = 'text', value, onChange, icon: Icon, required }) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0

  return (
    <div className="relative">
      <div
        className={`relative flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-300 ${
          focused
            ? 'border-gold-500/60 bg-gold-500/5 shadow-[0_0_20px_rgba(200,155,60,0.12)]'
            : 'border-white/10 bg-white/3 hover:border-white/20'
        }`}
      >
        {Icon && (
          <Icon
            size={16}
            className={`flex-shrink-0 transition-colors duration-300 ${
              focused ? 'text-gold-400' : 'text-white/30'
            }`}
          />
        )}
        <div className="relative flex-1">
          <label
            htmlFor={id}
            className={`absolute left-0 font-body text-xs transition-all duration-200 pointer-events-none ${
              focused || hasValue
                ? '-top-4 text-gold-400 text-[10px] tracking-wide'
                : 'top-1/2 -translate-y-1/2 text-white/35'
            }`}
          >
            {label}
            {required && <span className="text-gold-500 ml-0.5">*</span>}
          </label>
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            className="w-full bg-transparent font-body text-sm text-white outline-none pt-2"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  )
}

// Floating label select
function FloatingSelect({ id, label, value, onChange, options, icon: Icon }) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative">
      <div
        className={`relative flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-300 ${
          focused
            ? 'border-gold-500/60 bg-gold-500/5 shadow-[0_0_20px_rgba(200,155,60,0.12)]'
            : 'border-white/10 bg-white/3 hover:border-white/20'
        }`}
      >
        {Icon && (
          <Icon
            size={16}
            className={`flex-shrink-0 transition-colors duration-300 ${
              focused ? 'text-gold-400' : 'text-white/30'
            }`}
          />
        )}
        <select
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent font-body text-sm text-white outline-none appearance-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-charcoal-800 text-white">
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

// Floating label textarea
function FloatingTextarea({ id, label, value, onChange, icon: Icon }) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0

  return (
    <div className="relative">
      <div
        className={`relative flex gap-3 rounded-xl border px-4 py-3.5 transition-all duration-300 ${
          focused
            ? 'border-gold-500/60 bg-gold-500/5 shadow-[0_0_20px_rgba(200,155,60,0.12)]'
            : 'border-white/10 bg-white/3 hover:border-white/20'
        }`}
      >
        {Icon && (
          <Icon
            size={16}
            className={`flex-shrink-0 mt-1 transition-colors duration-300 ${
              focused ? 'text-gold-400' : 'text-white/30'
            }`}
          />
        )}
        <div className="relative flex-1">
          <label
            htmlFor={id}
            className={`absolute left-0 font-body text-xs transition-all duration-200 pointer-events-none ${
              focused || hasValue
                ? '-top-4 text-gold-400 text-[10px] tracking-wide'
                : 'top-2 text-white/35'
            }`}
          >
            {label}
          </label>
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rows={3}
            className="w-full bg-transparent font-body text-sm text-white outline-none resize-none pt-2"
          />
        </div>
      </div>
    </div>
  )
}

// Success popup
function SuccessPopup({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-3xl bg-charcoal-800/95 backdrop-blur-sm border border-gold-500/30 p-8 text-center"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold-500/8 to-transparent pointer-events-none" />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold mb-6"
      >
        <CheckCircle2 size={36} className="text-charcoal-900" />
      </motion.div>
      <h3 className="font-heading text-2xl font-bold text-white mb-3">
        Thank You!
      </h3>
      <p className="font-body text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
        Your enquiry has been received. Our team will contact you within 24 hours.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <a
          href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-body font-bold text-sm"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
        <button
          onClick={onClose}
          className="flex-1 py-3 rounded-xl border border-gold-500/30 text-gold-400 font-body font-semibold text-sm hover:bg-gold-500/8 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </motion.div>
  )
}

export default function LeadFormSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    plotSize: PLOT_OPTIONS[0],
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  const waLink = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(project.name)}%20Pre-Launch%20Plots.%20Please%20share%20details.`

  return (
    <section
      id="enquire"
      ref={ref}
      className="relative bg-charcoal-900 section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gold-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — Content */}
          <div className="flex flex-col gap-8">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-body text-xs text-gold-400 uppercase tracking-[0.3em]"
            >
              Limited Pre-Launch Opportunity
            </motion.p>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              Claim Your{' '}
              <span className="text-gold-gradient italic">Sacred Space</span>
              <br />
              Today
            </motion.h2>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-3 origin-left"
            >
              <div className="h-0.5 w-16 bg-gold-gradient" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              <div className="h-0.5 w-8 bg-gold-gradient opacity-40" />
            </motion.div>

            {/* Persuasive copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-base text-white/60 leading-relaxed"
            >
              Only 40 plots available at pre-launch pricing. Once these are gone, they're gone forever. Secure your Vaastu-perfect plot beside Maa Ganga before the public launch.
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-lg flex-shrink-0">{b.icon}</span>
                  <span className="font-body text-sm text-white/65">{b.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick connect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-body font-bold text-sm hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all duration-300"
              >
                <MessageCircle size={18} />
                WhatsApp Quick Connect
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gold-500/30 text-gold-400 font-body font-semibold text-sm hover:bg-gold-500/8 hover:border-gold-500/60 transition-all duration-300"
              >
                <Phone size={18} />
                {contact.phone}
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              {['Zero Complaints', 'Trusted Legacy', 'Vaastu Perfect'].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-gold-500/20 text-white/50 text-xs font-body"
                >
                  <CheckCircle2 size={11} className="text-gold-400" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative glass-card rounded-3xl p-7 sm:p-9 border border-gold-500/20 overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none" />
              {/* Corner accents */}
              <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-gold-500/25 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-gold-500/25 rounded-bl-xl pointer-events-none" />

              <div className="relative z-10">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
                  Book a Free Site Visit
                </h3>
                <p className="font-body text-xs text-white/40 mb-7">
                  Fill in your details and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <FloatingInput
                    id="name"
                    label="Full Name"
                    value={form.name}
                    onChange={set('name')}
                    icon={User}
                    required
                  />
                  <FloatingInput
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    icon={Smartphone}
                    required
                  />
                  <FloatingInput
                    id="email"
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    icon={Mail}
                  />
                  <FloatingSelect
                    id="plotSize"
                    label="Interested Plot Size"
                    value={form.plotSize}
                    onChange={set('plotSize')}
                    options={PLOT_OPTIONS}
                    icon={Home}
                  />
                  <FloatingTextarea
                    id="message"
                    label="Message (optional)"
                    value={form.message}
                    onChange={set('message')}
                    icon={MessageSquare}
                  />

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-gold-gradient text-charcoal-900 font-body font-bold text-sm shadow-gold hover:shadow-gold-lg transition-all duration-300 disabled:opacity-70"
                    >
                      {loading ? (
                        <span className="w-4 h-4 border-2 border-charcoal-900/40 border-t-charcoal-900 rounded-full animate-spin" />
                      ) : (
                        <Send size={16} />
                      )}
                      {loading ? 'Sending...' : 'Book Site Visit'}
                    </motion.button>
                    <motion.a
                      href={`tel:${contact.phone}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border border-gold-500/35 text-gold-400 font-body font-semibold text-sm hover:bg-gold-500/8 hover:border-gold-500/60 transition-all duration-300"
                    >
                      <Phone size={16} />
                      Request Callback
                    </motion.a>
                  </div>

                  <p className="font-body text-xs text-white/25 text-center">
                    Your information is 100% secure and will never be shared.
                  </p>
                </form>
              </div>

              {/* Success overlay */}
              <AnimatePresence>
                {submitted && <SuccessPopup onClose={() => setSubmitted(false)} />}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
