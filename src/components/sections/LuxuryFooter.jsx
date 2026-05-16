import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, ExternalLink, Send, Instagram, Facebook, Youtube, Twitter } from 'lucide-react'
import NETRAM_DATA from '../../data.js'

const { project, company, contact, navigation, seo } = NETRAM_DATA

const QUICK_LINKS = navigation.slice(0, 6)
const LEGAL_LINKS = ['Privacy Policy', 'Terms of Use', 'Disclaimer', 'RERA Info']

const SOCIAL = [
  { icon: <Instagram size={16} />, label: 'Instagram', href: '#' },
  { icon: <Facebook size={16} />, label: 'Facebook', href: '#' },
  { icon: <Youtube size={16} />, label: 'YouTube', href: '#' },
  { icon: <Twitter size={16} />, label: 'Twitter', href: '#' },
]

function handleNavClick(item) {
  const id = item.toLowerCase().replace(/\s+/g, '-')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function LuxuryFooter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="relative bg-charcoal-900 overflow-hidden">
      {/* Top gold separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/4 rounded-full blur-[120px] pointer-events-none" />

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold-500/10 rounded-tl-2xl pointer-events-none" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gold-500/10 rounded-tr-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">

          {/* Brand column — 4 cols */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold flex-shrink-0">
                <span className="font-heading font-bold text-charcoal-900 text-lg">N</span>
              </div>
              <div>
                <span className="font-heading text-2xl font-bold text-gold-gradient tracking-widest block leading-none">
                  NETRAM
                </span>
                <span className="font-body text-[10px] text-white/30 tracking-[0.2em] uppercase">
                  Township
                </span>
              </div>
            </div>

            {/* About */}
            <p className="font-body text-sm text-white/45 leading-relaxed max-w-xs">
              {project.shortDescription}
            </p>

            {/* Status badge */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              <span className="font-body text-xs text-gold-400 uppercase tracking-widest">
                {project.status} — {project.launchType}
              </span>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full glass-card border border-gold-500/20 flex items-center justify-center text-gold-500/50 hover:border-gold-500/50 hover:text-gold-400 hover:shadow-gold transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Developer info */}
            <div className="glass-card rounded-2xl p-4 border border-gold-500/12">
              <p className="font-body text-[10px] text-gold-400 uppercase tracking-widest mb-1">
                Developed by
              </p>
              <p className="font-heading text-sm font-semibold text-white">{company.name}</p>
              <p className="font-body text-xs text-white/25 italic mt-0.5">{project.type}</p>
            </div>
          </div>

          {/* Quick Links — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <div className="h-px w-8 bg-gold-gradient" />
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleNavClick(link)}
                    className="font-body text-sm text-white/45 hover:text-gold-400 transition-colors duration-300 text-left flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-500/30 group-hover:bg-gold-500 transition-colors duration-300" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — 3 cols */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-widest">
              Contact Us
            </h4>
            <div className="h-px w-8 bg-gold-gradient" />
            <ul className="flex flex-col gap-4">
              <li>
                <a href={`tel:${contact.phone}`} className="flex items-start gap-3 group">
                  <div className="w-7 h-7 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-all duration-300">
                    <Phone size={12} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="font-body text-[10px] text-white/30 uppercase tracking-wide mb-0.5">Phone</p>
                    <span className="font-body text-sm text-white/55 group-hover:text-white/80 transition-colors">
                      {contact.phone}
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-start gap-3 group">
                  <div className="w-7 h-7 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-all duration-300">
                    <Mail size={12} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="font-body text-[10px] text-white/30 uppercase tracking-wide mb-0.5">Email</p>
                    <span className="font-body text-sm text-white/55 group-hover:text-white/80 transition-colors break-all">
                      {contact.email}
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={12} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="font-body text-[10px] text-white/30 uppercase tracking-wide mb-0.5">Office</p>
                    <span className="font-body text-sm text-white/45 leading-relaxed">
                      {contact.officeAddress.line1},<br />
                      {contact.officeAddress.line2},<br />
                      {contact.officeAddress.city}, {contact.officeAddress.state} — {contact.officeAddress.pincode}
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-body text-gold-500/50 hover:text-gold-400 transition-colors"
                >
                  <ExternalLink size={12} />
                  {contact.website.replace('https://', '')}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter — 3 cols */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-widest">
              Stay Updated
            </h4>
            <div className="h-px w-8 bg-gold-gradient" />
            <p className="font-body text-sm text-white/40 leading-relaxed">
              Get exclusive pre-launch updates, pricing and spiritual living insights.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-xl p-4 border border-gold-500/25 text-center"
              >
                <span className="text-2xl block mb-2">✨</span>
                <p className="font-body text-sm text-gold-400 font-semibold">You're subscribed!</p>
                <p className="font-body text-xs text-white/35 mt-1">We'll keep you updated.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 bg-white/4 border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/25 outline-none focus:border-gold-500/50 focus:bg-gold-500/4 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="w-11 h-11 rounded-xl bg-gold-gradient flex items-center justify-center flex-shrink-0 shadow-gold hover:shadow-gold-lg transition-all duration-300"
                    aria-label="Subscribe"
                  >
                    <Send size={14} className="text-charcoal-900" />
                  </button>
                </div>
                <p className="font-body text-[10px] text-white/20">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}

            {/* Project highlights mini */}
            <div className="mt-2 flex flex-col gap-2">
              {project.highlights.slice(0, 4).map((h) => (
                <div key={h} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold-500/50 flex-shrink-0" />
                  <span className="font-body text-xs text-white/35">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gold separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent mb-8" />

        {/* Legal disclaimer */}
        <div className="glass-card rounded-2xl p-5 border border-gold-500/10 mb-8">
          <p className="font-body text-[11px] text-white/25 leading-relaxed text-center">
            <span className="text-gold-500/50 font-semibold">Legal Disclaimer: </span>
            This website is for informational purposes only. All images, renders and specifications are indicative and subject to change without notice. RERA registration is pending. Buyers are advised to verify all details independently before making any investment decisions. {company.name} reserves the right to modify project details at any time.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/20 text-center sm:text-left">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-4">
            {LEGAL_LINKS.map((link) => (
              <button
                key={link}
                className="font-body text-xs text-white/20 hover:text-white/45 transition-colors duration-300"
              >
                {link}
              </button>
            ))}
          </div>

          <p className="font-body text-xs text-white/20 text-center sm:text-right italic">
            Crafted with consciousness ✦
          </p>
        </div>
      </div>
    </footer>
  )
}
