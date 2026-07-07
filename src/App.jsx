import React, { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// ── Critical above-the-fold components (eager) ────────────────────────────────
import Navbar from './components/Navbar'
import HeroSection from './components/sections/HeroSection'
import LoadingScreen from './components/LoadingScreen'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'

// ── Below-the-fold sections (lazy) ───────────────────────────────────────────
const StatsSection       = lazy(() => import('./components/sections/StatsSection'))
const VisionSection      = lazy(() => import('./components/sections/VisionSection'))
const PhilosophySection  = lazy(() => import('./components/sections/PhilosophySection'))
const PanchTatvaSection  = lazy(() => import('./components/sections/PanchTatvaSection'))
const VaastuSection      = lazy(() => import('./components/sections/VaastuSection'))
const AmenitiesSection   = lazy(() => import('./components/sections/AmenitiesSection'))
const PlotOptionsSection = lazy(() => import('./components/sections/PlotOptionsSection'))
const PricingSection     = lazy(() => import('./components/sections/PricingSection'))
const MasterplanSection  = lazy(() => import('./components/sections/MasterplanSection'))
const SiteVisualsSection = lazy(() => import('./components/sections/SiteVisualsSection'))
const LocationSection    = lazy(() => import('./components/sections/LocationSection'))
const WhyInvestSection   = lazy(() => import('./components/sections/WhyInvestSection'))
const TrustSection       = lazy(() => import('./components/sections/TrustSection'))
const LifestyleSection   = lazy(() => import('./components/sections/LifestyleSection'))
const TestimonialsSection = lazy(() => import('./components/sections/TestimonialsSection'))
const FAQSection         = lazy(() => import('./components/sections/FAQSection'))
const LeadFormSection    = lazy(() => import('./components/sections/LeadFormSection'))
const CTABannerSection   = lazy(() => import('./components/sections/CTABannerSection'))
const LuxuryFooter       = lazy(() => import('./components/sections/LuxuryFooter'))

// ── Utility components (lazy) ─────────────────────────────────────────────────
const FloatingWhatsApp   = lazy(() => import('./components/FloatingWhatsApp'))
const FloatingBookVisit  = lazy(() => import('./components/FloatingBookVisit'))
const ScrollToTop        = lazy(() => import('./components/ScrollToTop'))
const StickyMobileCTA    = lazy(() => import('./components/StickyMobileCTA'))
const StickyEnquiryBar   = lazy(() => import('./components/StickyEnquiryBar'))
const ExitIntentPopup    = lazy(() => import('./components/ExitIntentPopup'))

// ── Minimal section skeleton (prevents layout shift during lazy load) ─────────
function SectionSkeleton() {
  return (
    <div
      className="w-full"
      style={{ minHeight: '4rem' }}
      aria-hidden="true"
    />
  )
}

// ── Animated section divider ──────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div className="relative h-px overflow-visible pointer-events-none" aria-hidden="true">
      <div className="section-divider" />
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold-500/40 text-[10px] px-3"
        style={{ background: '#0B0B0B' }}
      >
        ✦
      </span>
    </div>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-charcoal-900 text-white overflow-x-hidden">
      {/* ── Loading screen ── */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {/* ── Global overlays (always rendered, lightweight) ── */}
      <ScrollProgress />
      <CursorGlow />

      {/* ── Page reveal after loading ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* ── Sticky conversion bar (desktop) ── */}
        <Suspense fallback={null}>
          <StickyEnquiryBar />
        </Suspense>

        {/* ── Navigation ── */}
        <Navbar />

        {/* ── Main content ── */}
        <main id="main-content">
          {/* Hero — eager, above fold */}
          <HeroSection />

          <Suspense fallback={<SectionSkeleton />}>
            <StatsSection />
            <SectionDivider />
            <VisionSection />
            <SectionDivider />
            <PhilosophySection />
            <SectionDivider />
            <PanchTatvaSection />
            <SectionDivider />
            <VaastuSection />
            <SectionDivider />
            <AmenitiesSection />
            <SectionDivider />
            <PlotOptionsSection />
            <SectionDivider />
            <PricingSection />
            <SectionDivider />
            <MasterplanSection />
            <SectionDivider />
            <SiteVisualsSection />
            <SectionDivider />
            <LocationSection />
            <SectionDivider />
            <WhyInvestSection />
            <SectionDivider />
            <TrustSection />
            <SectionDivider />
            <LifestyleSection />
            <SectionDivider />
            <TestimonialsSection />
            <SectionDivider />
            <FAQSection />
            <SectionDivider />
            <LeadFormSection />
            <CTABannerSection />
          </Suspense>
        </main>

        {/* ── Footer ── */}
        <Suspense fallback={<SectionSkeleton />}>
          <LuxuryFooter />
        </Suspense>

        {/* ── Floating / sticky conversion elements ── */}
        <Suspense fallback={null}>
          <FloatingWhatsApp />
          <FloatingBookVisit />
          <ScrollToTop />
          <StickyMobileCTA />
          <ExitIntentPopup />
        </Suspense>
      </motion.div>
    </div>
  )
}
