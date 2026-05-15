import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react'
import NETRAM_DATA from '../data.js'

const { project, company, contact, navigation } = NETRAM_DATA

const quickLinks = navigation.slice(0, 6)

export default function Footer() {
  const handleNavClick = (item) => {
    const id = item.toLowerCase().replace(/\s+/g, '-')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="relative bg-charcoal-900 overflow-hidden">
      {/* Top separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold">
                <span className="font-heading font-bold text-charcoal-900">N</span>
              </div>
              <span className="font-heading text-2xl font-bold text-gold-gradient tracking-widest">
                NETRAM
              </span>
            </div>

            <p className="font-body text-sm text-white/50 leading-relaxed max-w-xs">
              {project.shortDescription}
            </p>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              <span className="font-body text-xs text-gold-400 uppercase tracking-widest">
                {project.status}
              </span>
            </div>

            {/* Social placeholders */}
            <div className="flex gap-3 mt-1">
              {['FB', 'IG', 'YT', 'TW'].map((s) => (
                <div
                  key={s}
                  className="w-9 h-9 rounded-full glass-card border border-gold-500/20 flex items-center justify-center text-gold-500/50 text-xs font-body font-semibold hover:border-gold-500/50 hover:text-gold-400 transition-all duration-300 cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <div className="h-px w-8 bg-gold-gradient" />
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleNavClick(link)}
                    className="font-body text-sm text-white/50 hover:text-gold-400 transition-colors duration-300 text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-widest">
              Contact
            </h4>
            <div className="h-px w-8 bg-gold-gradient" />
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-start gap-3 group"
                >
                  <Phone size={14} className="text-gold-500 mt-0.5 flex-shrink-0 group-hover:text-gold-300 transition-colors" />
                  <span className="font-body text-sm text-white/50 group-hover:text-white/80 transition-colors">
                    {contact.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-3 group"
                >
                  <Mail size={14} className="text-gold-500 mt-0.5 flex-shrink-0 group-hover:text-gold-300 transition-colors" />
                  <span className="font-body text-sm text-white/50 group-hover:text-white/80 transition-colors break-all">
                    {contact.email}
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <span className="font-body text-sm text-white/50 leading-relaxed">
                    {contact.officeAddress.line1},<br />
                    {contact.officeAddress.line2},<br />
                    {contact.officeAddress.city}, {contact.officeAddress.state} — {contact.officeAddress.pincode}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-widest">
              Developer
            </h4>
            <div className="h-px w-8 bg-gold-gradient" />
            <div className="glass-card rounded-2xl p-4 border border-gold-500/15">
              <p className="font-body text-xs text-gold-400 uppercase tracking-widest mb-2">
                Developed by
              </p>
              <p className="font-heading text-sm font-semibold text-white mb-1">
                {company.name}
              </p>
              <p className="font-body text-xs text-white/40 mb-3">
                {company.founder.name}
              </p>
              <p className="font-body text-xs text-white/40 italic leading-relaxed">
                {company.founder.title}
              </p>
            </div>
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-body text-gold-500/60 hover:text-gold-400 transition-colors"
            >
              <ExternalLink size={12} />
              {contact.website.replace('https://', '')}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/25 text-center sm:text-left">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/20 text-center">
            {project.name} — {project.location}
          </p>
          <p className="font-body text-xs text-white/20 text-center sm:text-right">
            RERA Registration Pending
          </p>
        </div>
      </div>
    </footer>
  )
}
