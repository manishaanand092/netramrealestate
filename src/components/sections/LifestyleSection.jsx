import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading.jsx'

// Lifestyle blocks — presentational copy
const LIFESTYLE_BLOCKS = [
  {
    emoji: '🌅',
    title: 'Morning Beside Maa Ganga',
    body: 'Begin every day with the sacred sound of flowing Ganga waters. A spiritual awakening built into your daily routine.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    accent: 'from-blue-900/60',
    size: 'lg',
  },
  {
    emoji: '🌿',
    title: 'Ayurvedic Green Surroundings',
    body: 'Walk through healing gardens of Tulsi, Neem and Ashwagandha. Nature as your daily medicine.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    accent: 'from-green-900/60',
    size: 'sm',
  },
  {
    emoji: '🧘',
    title: 'Meditation & Yoga',
    body: 'A dedicated ashram space for daily practice. Align your mind, body and spirit in the heart of the township.',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
    accent: 'from-purple-900/60',
    size: 'sm',
  },
  {
    emoji: '🏛️',
    title: 'Luxury Conscious Community',
    body: 'Live among like-minded souls who value consciousness, nature and elevated living. Your tribe awaits.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    accent: 'from-amber-900/60',
    size: 'sm',
  },
  {
    emoji: '🛕',
    title: 'Sacred Architecture',
    body: 'Every structure designed with Vaastu precision and Tantric energy principles. Your home as a temple.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
    accent: 'from-orange-900/60',
    size: 'sm',
  },
]

// Parallax image card
function LifestyleCard({ block, index, inView }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const isLarge = block.size === 'lg'

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-3xl overflow-hidden cursor-default ${
        isLarge ? 'aspect-[4/3] sm:aspect-[16/9]' : 'aspect-[4/3]'
      }`}
    >
      {/* Parallax image */}
      <motion.div
        className="absolute inset-[-10%] bg-cover bg-center"
        style={{
          backgroundImage: `url('${block.image}')`,
          y: imgY,
        }}
      />

      {/* Dark overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${block.accent} via-charcoal-900/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500`} />

      {/* Hover zoom */}
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Gold shimmer line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500/60 transition-all duration-500" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <motion.div
          initial={{ y: 10, opacity: 0.8 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-3xl mb-3 block">{block.emoji}</span>
          <h3 className={`font-heading font-bold text-white leading-tight mb-2 ${isLarge ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
            {block.title}
          </h3>
          <p className={`font-body text-white/65 leading-relaxed ${isLarge ? 'text-sm sm:text-base max-w-lg' : 'text-sm'}`}>
            {block.body}
          </p>
        </motion.div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-gold-500/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
}

export default function LifestyleSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [large, ...rest] = LIFESTYLE_BLOCKS

  return (
    <section
      id="lifestyle"
      ref={ref}
      className="relative bg-charcoal-800 section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gold-500/4 rounded-full blur-[120px] translate-x-1/3" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14">
          <SectionHeading
            eyebrow="Lifestyle Experience"
            title="Live the"
            highlight="Sacred Life"
            description="Every morning at Netram is a spiritual experience. A life where luxury and consciousness coexist in perfect harmony."
          />
        </div>

        {/* Magazine-style layout */}
        {/* Hero card — full width */}
        <div className="mb-5">
          <LifestyleCard block={large} index={0} inView={inView} />
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          {rest.slice(0, 2).map((block, i) => (
            <LifestyleCard key={block.title} block={block} index={i + 1} inView={inView} />
          ))}
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {rest.slice(2).map((block, i) => (
            <LifestyleCard key={block.title} block={block} index={i + 3} inView={inView} />
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-14"
        >
          <p className="font-heading text-xl sm:text-2xl text-white/60 italic">
            "This is not just a home.{' '}
            <span className="text-gold-gradient not-italic font-bold">This is a way of life.</span>"
          </p>
        </motion.div>
      </div>
    </section>
  )
}
