import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'

const FAQS = [
  {
    q: 'What makes Netram Township unique?',
    a: "Netram is India's first Sanatan & Tantra inspired conscious township. Every plot is Vaastu-perfect, direction-conscious, and designed according to Zodiac, Prakriti and ancient Vedic principles. It combines spiritual luxury with modern amenities beside the sacred Maa Ganga.",
  },
  {
    q: 'Is the project Vaastu compliant?',
    a: 'Absolutely. Netram is India\'s first direction-conscious township where every plot faces North, North-East or North-West only. There are no South-facing homes — ever. The entire masterplan is crafted with deep expertise in Vaastu Shastra and Vedic spatial science.',
  },
  {
    q: 'Where is Netram Township located?',
    a: 'Netram Township is located in Greater Ghaziabad, Uttar Pradesh — a Ganga-touch property beside Chota Haridwar. It is 8 KM from Wave City, 4 KM from Hawa Hawai, and benefits from an upcoming 6-lane highway for future connectivity.',
  },
  {
    q: 'What amenities are included in the township?',
    a: 'Netram offers world-class amenities including a Swimming Pool, Club House, Jogging Track, Temple, Ashram, Commercial Zone, Guard Room, and 55% Green Area with Ayurvedic plants. The township is designed as a complete conscious living ecosystem.',
  },
  {
    q: 'Is this a good investment opportunity?',
    a: 'Yes. With only 40 limited plots, Ganga-touch location, upcoming 6-lane highway connectivity, and India\'s first conscious township concept, Netram offers exceptional appreciation potential. Pre-launch pricing is available for a limited time only.',
  },
  {
    q: 'Is the township spiritual-theme based?',
    a: 'Yes. Netram is deeply rooted in Sanatan wisdom — inspired by Tantra, Vaastu, Ayurveda and Vedic science. It includes a Temple and Ashram inside the township, Panch Tatva planning, Zodiac-based home design, and Ayurvedic green surroundings for holistic living.',
  },
  {
    q: 'What plot sizes are available?',
    a: 'Three plot sizes are available: 108 Sq Yards (Compact Sacred Plot), 200 Sq Yards (Premium Plot — most popular), and 226 Sq Yards (Luxury Corner Plot). All plots are Vaastu-perfect and direction-conscious.',
  },
  {
    q: 'How do I book a plot or schedule a site visit?',
    a: 'You can book a site visit or enquire about plots by calling or WhatsApp messaging our team directly. We offer complete transparency with zero hidden charges and full documentation support throughout the process.',
  },
]

function FAQItem({ faq, index, inView }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`group rounded-2xl border transition-all duration-400 overflow-hidden ${
        open
          ? 'border-gold-500/40 bg-gold-500/4 shadow-gold'
          : 'border-gold-500/12 bg-white/2 hover:border-gold-500/25 hover:bg-white/3'
      }`}
    >
      {/* Question row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span
          className={`font-heading text-base sm:text-lg font-semibold leading-snug transition-colors duration-300 ${
            open ? 'text-gold-300' : 'text-white group-hover:text-gold-300'
          }`}
        >
          {faq.q}
        </span>

        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
            open
              ? 'border-gold-500/60 bg-gold-500/15 text-gold-400'
              : 'border-gold-500/20 bg-transparent text-gold-500/50 group-hover:border-gold-500/40 group-hover:text-gold-400'
          }`}
        >
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="h-px bg-gradient-to-r from-gold-500/20 to-transparent mb-4" />
              <p className="font-body text-sm sm:text-base text-white/60 leading-relaxed">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const half = Math.ceil(FAQS.length / 2)
  const col1 = FAQS.slice(0, half)
  const col2 = FAQS.slice(half)

  return (
    <section
      id="faq"
      ref={ref}
      className="relative bg-charcoal-800 section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold-500/4 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Everything You"
            highlight="Need to Know"
            description="Answers to the most common questions about Netram Township."
          />
        </div>

        {/* Two-column FAQ grid on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <div className="flex flex-col gap-4 sm:gap-5">
            {col1.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} inView={inView} />
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:gap-5">
            {col2.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i + half} inView={inView} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-14"
        >
          <p className="font-body text-sm text-white/40 mb-4">
            Still have questions? We're here to help.
          </p>
          <a
            href="https://wa.me/919431405275?text=Hi%2C%20I%20have%20a%20question%20about%20Netram%20Township."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-gold-500/35 text-gold-400 font-body font-semibold text-sm hover:bg-gold-500/8 hover:border-gold-500/60 transition-all duration-300"
          >
            <span>💬</span>
            Ask on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
