import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'

// Testimonials — presentational copy
const TESTIMONIALS = [
  {
    name: 'Rajesh Sharma',
    location: 'Delhi',
    initials: 'RS',
    rating: 5,
    text: 'Netram Township is unlike anything I have seen. The Vaastu planning and spiritual concept resonated deeply with our family values. The vision behind this project is truly extraordinary.',
    plot: '200 Sq Yards',
  },
  {
    name: 'Priya Agarwal',
    location: 'Noida',
    initials: 'PA',
    rating: 5,
    text: 'The transparency and professionalism of the Netram team is unmatched. Zero hidden charges, complete documentation. We felt completely at peace throughout the process.',
    plot: '108 Sq Yards',
  },
  {
    name: 'Amit Verma',
    location: 'Ghaziabad',
    initials: 'AV',
    rating: 5,
    text: 'Living beside Maa Ganga with Vaastu-perfect planning was my dream. Netram made it real. The location, the concept, the community — everything is premium and conscious.',
    plot: '226 Sq Yards',
  },
  {
    name: 'Sunita Mishra',
    location: 'Lucknow',
    initials: 'SM',
    rating: 5,
    text: 'As someone who values Sanatan traditions, Netram speaks to my soul. The Panch Tatva planning and Zodiac-based design is something I never thought I would find in a township.',
    plot: '200 Sq Yards',
  },
  {
    name: 'Vikram Singh',
    location: 'Meerut',
    initials: 'VS',
    rating: 5,
    text: 'The investment potential here is exceptional. Upcoming 6-lane highway, Ganga proximity, limited plots — this is the kind of opportunity that comes once in a decade.',
    plot: '108 Sq Yards',
  },
  {
    name: 'Kavita Joshi',
    location: 'Haridwar',
    initials: 'KJ',
    rating: 5,
    text: 'The knowledge of Tantra and Vaastu is evident in every detail of Netram. This is not just real estate — it is a sacred living experience.',
    plot: '226 Sq Yards',
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-gold-400 fill-gold-400" />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial, isActive }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative glass-card rounded-3xl p-7 sm:p-8 flex flex-col gap-5 border transition-all duration-500 ${
        isActive
          ? 'border-gold-500/40 shadow-gold bg-gold-500/4'
          : 'border-gold-500/15'
      }`}
    >
      {/* Gold glow on active */}
      {isActive && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold-500/6 to-transparent pointer-events-none" />
      )}

      {/* Quote icon */}
      <Quote size={24} className="text-gold-500/40 flex-shrink-0" />

      {/* Text */}
      <p className="font-body text-sm sm:text-base text-white/70 leading-relaxed italic flex-1 relative z-10">
        "{testimonial.text}"
      </p>

      {/* Rating */}
      <StarRating count={testimonial.rating} />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-gold-500/20 to-transparent" />

      {/* Author */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0 shadow-gold">
          <span className="font-heading font-bold text-charcoal-900 text-sm">
            {testimonial.initials}
          </span>
        </div>
        <div>
          <p className="font-heading text-sm font-bold text-white">{testimonial.name}</p>
          <p className="font-body text-xs text-white/40">{testimonial.location}</p>
        </div>
        <div className="ml-auto">
          <span className="px-3 py-1 rounded-full text-xs font-body font-medium text-gold-400 border border-gold-500/25 bg-gold-500/8">
            {testimonial.plot}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Show 3 cards at a time on desktop, 1 on mobile
  const VISIBLE = 3
  const total = TESTIMONIALS.length

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  // Auto-slide
  useEffect(() => {
    if (isPaused || !inView) return
    const id = setInterval(next, 4000)
    return () => clearInterval(id)
  }, [isPaused, inView, next])

  // Get visible indices
  const visibleIndices = Array.from({ length: VISIBLE }, (_, i) => (activeIndex + i) % total)

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative bg-charcoal-900 section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gold-500/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14">
          <SectionHeading
            eyebrow="What Our Buyers Say"
            title="Voices of"
            highlight="Trust"
            description="Real experiences from families who chose conscious living at Netram Township."
          />
        </div>

        {/* Carousel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Desktop: 3 cards */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {visibleIndices.map((idx, pos) => (
                <TestimonialCard
                  key={`${idx}-${pos}`}
                  testimonial={TESTIMONIALS[idx]}
                  isActive={pos === 1}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile: 1 card */}
          <div className="sm:hidden">
            <AnimatePresence mode="wait">
              <TestimonialCard
                key={activeIndex}
                testimonial={TESTIMONIALS[activeIndex]}
                isActive={true}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-6 mt-10"
        >
          {/* Prev */}
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full glass-card border border-gold-500/25 flex items-center justify-center text-gold-400 hover:border-gold-500/60 hover:text-gold-300 hover:shadow-gold transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-6 h-2 bg-gold-500'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="w-11 h-11 rounded-full glass-card border border-gold-500/25 flex items-center justify-center text-gold-400 hover:border-gold-500/60 hover:text-gold-300 hover:shadow-gold transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
