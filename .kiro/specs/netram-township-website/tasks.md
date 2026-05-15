# Implementation Plan: Netram Township Website — Phase 2

## Overview

Implement eight new sections, two global utility components (LoadingScreen, CursorGlow), three reusable UI primitives (SectionHeading, AnimatedButton, GlassCard), SEO meta tags, CSS utilities, and property-based tests using fast-check. All new code follows the existing design system: charcoal/gold palette, glassmorphism cards, Framer Motion animations, Playfair Display + Poppins fonts, and data sourced exclusively from `src/data.js`.

## Tasks

- [x] 1. Install fast-check and set up testing infrastructure
  - Install `fast-check`, `vitest`, `@testing-library/react`, and `@testing-library/jest-dom` as dev dependencies
  - Add `test` script to `package.json`: `"test": "vitest --run"`
  - Create `vite.config.js` test configuration block (environment: `jsdom`, globals: `true`, setupFiles)
  - Create `src/test/setup.js` with `@testing-library/jest-dom` import
  - _Requirements: 1.1 (data-driven architecture underpins all tests)_

- [ ] 2. Create reusable UI primitives
  - [x] 2.1 Create `src/components/ui/SectionHeading.jsx`
    - Accept props: `eyebrow`, `title`, `highlight`, `description` (optional), `centered` (default `true`)
    - Render eyebrow as small uppercase gold label with `tracking-[0.3em]`
    - Render heading with white `title` + italic gold-gradient `highlight` in Playfair Display
    - Render animated gold divider (two lines + center dot)
    - Render optional `description` in Poppins `text-white/50`
    - Use `useInView` + Framer Motion stagger fade-up for entrance animation
    - _Requirements: 12.1, 12.2, 12.3_

  - [ ] 2.2 Create `src/components/ui/AnimatedButton.jsx`
    - Accept props: `href`, `onClick`, `variant` (`primary` | `outline` | `ghost`), `children`, `className`, `target`
    - `primary`: `bg-gold-gradient text-charcoal-900 font-bold shadow-gold` with `whileHover` scale + glow
    - `outline`: `border border-gold-500/40 text-gold-400` with hover border brighten + `bg-gold-500/5`
    - `ghost`: transparent with gold text, hover underline
    - Render as `<a>` when `href` is provided, `<button>` otherwise
    - Apply `whileHover={{ scale: 1.04 }}` and `whileTap={{ scale: 0.97 }}` via Framer Motion
    - _Requirements: 12.1, 12.5_

  - [ ] 2.3 Create `src/components/ui/GlassCard.jsx`
    - Accept props: `children`, `className`, `hover` (default `true`), `glow` (default `true`)
    - Apply `glass-card` utility class from `index.css`
    - When `glow` is true, apply `gold-border-glow` class
    - When `hover` is true, wrap with `motion.div` applying `whileHover={{ y: -6, scale: 1.02 }}`
    - _Requirements: 12.4_

- [x] 3. Create LoadingScreen component
  - [x] 3.1 Create `src/components/LoadingScreen.jsx`
    - Full-screen `charcoal-900` background with `fixed inset-0 z-[100]`
    - Center: "N" logo with gold gradient, pulsing ring animation (`animate-pulse-gold`)
    - "NETRAM" text with letter-by-letter stagger reveal using Framer Motion `variants`
    - Tagline fade-in after letters complete
    - Exit: `opacity: 0` fade-out via Framer Motion `exit` prop
    - _Requirements: 12.1_

  - [x] 3.2 Wire LoadingScreen into `App.jsx`
    - Add `isLoading` state (default `true`) in `App.jsx`
    - `useEffect` sets `isLoading` to `false` after 1800ms
    - Wrap `<LoadingScreen />` in `<AnimatePresence>` — renders only when `isLoading` is `true`
    - _Requirements: 12.1_

- [x] 4. Create CursorGlow component and update index.css
  - [x] 4.1 Create `src/components/CursorGlow.jsx`
    - Use `useMotionValue` for `x` and `y`, updated on `mousemove` event
    - Apply `useSpring` with `stiffness: 80, damping: 20` for smooth lag
    - Render a `300×300px` fixed `pointer-events-none` div with radial gold gradient, `opacity-[0.06]`, centered on cursor
    - Only mount when `window.matchMedia('(pointer: fine)').matches` is true (desktop only)
    - _Requirements: 12.1_

  - [x] 4.2 Update `src/index.css` with new utilities
    - Add `.animate-spin-reverse` keyframe: `spin 30s linear infinite reverse`
    - Add `.cursor-glow` utility class for the radial gradient blob
    - Add `@keyframes borderShimmer` for animated gold border on featured plot card
    - Add `.border-shimmer` utility applying the shimmer animation
    - _Requirements: 12.1, 12.3_

  - [x] 4.3 Add CursorGlow to `App.jsx`
    - Import `CursorGlow` and render it before `<Navbar />` in `App.jsx`
    - _Requirements: 12.1_

- [x] 5. Implement PanchTatvaSection
  - [x] 5.1 Create `src/components/sections/PanchTatvaSection.jsx`
    - Import `panchTatva` from `../../data.js`
    - Section `id="panch-tatva"`, background `charcoal-900` with radial gold glow at center
    - Render `SectionHeading` with eyebrow "The Five Elements", title from `panchTatva.title`, description from `panchTatva.description`
    - Center element: two concentric `div` rings with `animate-spin-slow` and `animate-spin-reverse` CSS classes, inner circle with "🕉" symbol and gold gradient border
    - Map `panchTatva.elements` to five `glass-card gold-border-glow` cards, each with large emoji icon, element name in Playfair Display, and hardcoded one-line description
    - Element descriptions: Earth="Grounded foundations & stability", Water="Sacred Ganga flow & abundance", Fire="Transformative energy & vitality", Air="Breath of life & freedom", Space="Infinite consciousness & expansion"
    - Desktop: absolute-positioned cards around the center circle; mobile: vertical stack below circle
    - Framer Motion stagger entrance (0.15s delay each) + `y: [0, -10, 0]` float loop per card
    - Hover: `scale: 1.08`, gold glow intensifies
    - Reuse particle pattern (12 small floating gold dots) from HeroSection
    - _Requirements: 13.1, 13.2_

  - [ ]* 5.2 Write property test for PanchTatvaSection — Property 1
    - **Property 1: Panch Tatva elements are fully rendered**
    - Use `fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 10 })` to generate arbitrary element arrays
    - Render `PanchTatvaSection` with mocked data module returning generated elements
    - Assert every generated element name appears in the rendered output
    - **Validates: Requirements 13.2**

- [x] 6. Implement VaastuSection
  - [x] 6.1 Create `src/components/sections/VaastuSection.jsx`
    - Import `vaastu` from `../../data.js`
    - Section `id="vaastu"`, background `charcoal-800`
    - Split layout: LEFT image panel (aspect 4/5, rounded-3xl, dark gradient + subtle image overlay at opacity 20%), RIGHT content panel
    - Left panel: floating compass UI — circular div with N/S/E/W labels, gold border, `rotate: [0, 360]` over 30s loop via Framer Motion; corner accent lines matching VisionSection pattern
    - Right panel: `SectionHeading` with eyebrow "Vaastu Perfection", title from `vaastu.title`
    - Render `vaastu.description` as body paragraph
    - Render `vaastu.keyPoint` inside a `glass-card` with left gold border (2px), large italic Playfair Display text, subtle gold background tint `bg-gold-500/5`
    - Map `vaastu.benefits` to four chips, each with `CheckCircle2` icon from lucide-react
    - Left panel entrance: `x: -60 → 0`; right panel: stagger fade-up
    - _Requirements: 14.1, 14.2, 14.3_

  - [ ]* 6.2 Write property test for VaastuSection — Property 2
    - **Property 2: Vaastu content is fully rendered**
    - Use `fc.record({ keyPoint: fc.string({ minLength: 1 }), benefits: fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 8 }) })` to generate arbitrary vaastu objects
    - Render `VaastuSection` with mocked data module
    - Assert rendered output contains `keyPoint` and every string in `benefits`
    - **Validates: Requirements 14.2, 14.3**

- [x] 7. Implement AmenitiesSection
  - [x] 7.1 Create `src/components/sections/AmenitiesSection.jsx`
    - Import `amenities` from `../../data.js`
    - Section `id="amenities"`, background `charcoal-900` with subtle dot pattern (same as PhilosophySection)
    - Render `SectionHeading` with eyebrow "World-Class Amenities", title "Everything You", highlight "Deserve"
    - Map `amenities` array to `GlassCard` components in a 4-col (desktop) / 2-col (tablet) / 1-col (mobile) grid
    - Each card: 16×16 rounded-2xl gold-tinted emoji icon box, amenity `name` in Playfair Display bold, hardcoded premium description per amenity
    - Premium descriptions: Commercial Zone="Curated retail & lifestyle spaces", Swimming Pool="Resort-style aquatic retreat", Club House="Exclusive members' social hub", Jogging Track="Scenic wellness pathway", Temple="Sacred spiritual sanctuary", 55% Green Area="Lush Ayurvedic landscape", Guard Room="24/7 premium security", Ashram="Meditation & yoga retreat"
    - Animated bottom border line on hover (width 0 → 75%)
    - Stagger entrance: 0.1s delay per card; hover: `y: -8, scale: 1.02`
    - _Requirements: 15.1, 15.2_

  - [ ]* 7.2 Write property test for AmenitiesSection — Property 3
    - **Property 3: All amenities are rendered**
    - Use `fc.array(fc.record({ name: fc.string({ minLength: 1 }), icon: fc.constant('🏠') }), { minLength: 1, maxLength: 12 })` to generate arbitrary amenity arrays
    - Render `AmenitiesSection` with mocked data module
    - Assert every `amenity.name` appears in the rendered output
    - **Validates: Requirements 15.1**

- [x] 8. Implement PlotOptionsSection
  - [x] 8.1 Create `src/components/sections/PlotOptionsSection.jsx`
    - Import `plots` and `contact` from `../../data.js`
    - Section `id="plots"`, background `charcoal-800`
    - Render `SectionHeading` with eyebrow "Plot Options", title "Choose Your", highlight "Sacred Space"
    - Map `plots` array to cards in a 3-col (desktop) / 1-col (mobile) grid
    - Standard card: `glass-card` rounded-3xl, "Limited Availability" gold pill badge, `plot.size` in large Playfair Display gold-gradient text, `plot.type` subtitle, divider, `plot.description`, `AnimatedButton` outline variant linking to WhatsApp
    - Featured card (index 1, 200 sq yards): `scale-105` on desktop, gold gradient border with shimmer animation, "Most Popular" badge, `bg-gold-500/5` background, `AnimatedButton` primary variant, floating glow behind card
    - Featured card: subtle `y: [0, -6, 0]` float loop
    - Stagger fade-up entrance; hover: `scale: 1.03`
    - _Requirements: 16.1, 16.2_

  - [ ]* 8.2 Write property test for PlotOptionsSection — Property 4
    - **Property 4: All plot options are rendered**
    - Use `fc.array(fc.record({ size: fc.string({ minLength: 1 }), type: fc.string({ minLength: 1 }), description: fc.string() }), { minLength: 1, maxLength: 6 })` to generate arbitrary plot arrays
    - Render `PlotOptionsSection` with mocked data module
    - Assert every `plot.size` and `plot.type` appears in the rendered output
    - **Validates: Requirements 16.1**

- [x] 9. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Implement MasterplanSection
  - [x] 10.1 Create `src/components/sections/MasterplanSection.jsx`
    - Import `masterplan`, `stats`, and `contact` from `../../data.js`
    - Section `id="masterplan"`, background `charcoal-900`
    - Split layout: LEFT large image placeholder (aspect 4/3, rounded-3xl), RIGHT content
    - Left panel: dark gradient background with grid overlay (blueprint feel), `overflow-hidden`, `whileHover: { scale: 1.03 }` zoom, four floating glassmorphism pill labels ("40 Plots", "Temple Zone", "Green Belt", "12m Roads") at corners, corner accent lines
    - Right panel: `SectionHeading` with eyebrow "Masterplan", title from `masterplan.title`
    - Render `masterplan.description` as body paragraph
    - Key highlights list (6 items) with animated gold dot + left-to-right line reveal on scroll: "40 saleable plots", "17 Bigha total area", "55% green & open area", "12m & 9m wide roads", "Temple + Ashram inside", "Commercial zone"
    - Two `AnimatedButton` side by side: "Download Brochure" (outline) → WhatsApp, "Schedule Site Visit" (primary) → WhatsApp
    - Left panel: `x: -60 → 0`; right panel: stagger fade-up; bullet points: stagger with line reveal
    - _Requirements: 17.1, 17.2_

  - [ ]* 10.2 Write property test for MasterplanSection — Property 5
    - **Property 5: Masterplan content is fully rendered**
    - Use `fc.record({ title: fc.string({ minLength: 1 }), description: fc.string({ minLength: 1 }) })` to generate arbitrary masterplan objects
    - Render `MasterplanSection` with mocked data module
    - Assert rendered output contains both `masterplan.title` and `masterplan.description`
    - **Validates: Requirements 17.1**

- [x] 11. Implement LocationSection
  - [x] 11.1 Create `src/components/sections/LocationSection.jsx`
    - Import `locationAdvantages` and `contact` from `../../data.js`
    - Section `id="location"`, background `charcoal-800`
    - Split layout: LEFT styled map placeholder (aspect 1/1, rounded-3xl), RIGHT location cards stack
    - Left panel: subtle grid lines, gold dot for project location, concentric circle ripple animation, 4 animated pin markers with pulsing rings at different positions, "Netram Township" glassmorphism label card at center
    - Right panel: `SectionHeading` with eyebrow "Location Advantages", title "Perfectly Connected,", highlight "Divinely Located"
    - Map `locationAdvantages` to `glass-card` cards with left gold border, `MapPin` icon, `item.title`, `item.description`
    - Animated vertical connecting gold line between cards (height animates from 0 to full on scroll reveal)
    - First card (Maa Ganga): special blue-gold gradient border treatment
    - Map pins: stagger pulse entrance; location cards: stagger slide-in from right; hover: card lifts, border brightens
    - _Requirements: 18.1, 18.2_

  - [ ]* 11.2 Write property test for LocationSection — Property 6
    - **Property 6: All location advantages are rendered**
    - Use `fc.array(fc.record({ title: fc.string({ minLength: 1 }), description: fc.string({ minLength: 1 }) }), { minLength: 1, maxLength: 8 })` to generate arbitrary locationAdvantages arrays
    - Render `LocationSection` with mocked data module
    - Assert every `item.title` and `item.description` appears in the rendered output
    - **Validates: Requirements 18.1**

- [x] 12. Implement WhyInvestSection
  - [x] 12.1 Create `src/components/sections/WhyInvestSection.jsx`
    - Import `trust` from `../../data.js`
    - Section `id="why-invest"`, background `charcoal-900`
    - Scarcity banner at top: "Only 40 Plots Available" with subtle pulse animation
    - `SectionHeading` with eyebrow "Why Smart Investors Choose Netram", title "Six Reasons to", highlight "Invest Now"
    - Six hardcoded investment reason cards in 3-col (desktop) / 2-col (tablet) / 1-col (mobile) grid:
      1. Spiritual Living — "Align your home with cosmic energies"
      2. Future Growth Potential — "Upcoming 6-lane highway connectivity"
      3. Prime Location — "Ganga-touch property near Chota Haridwar"
      4. Conscious Township Concept — "India's first of its kind"
      5. Limited Inventory — "Only 40 plots — exclusivity guaranteed"
      6. Luxury Community — "Premium amenities, Vaastu-perfect design"
    - Card design: `charcoal-800` background, subtle gold gradient top border, large gold-gradient number (01–06), title in Playfair Display, description in Poppins, bottom stat chip
    - Hover: gold glow, `y: -6`
    - Trust points from `trust.points` as horizontal scrolling ticker row below cards
    - Stagger fade-up entrance; number: count-up animation on scroll reveal
    - _Requirements: 19.1, 19.2_

- [x] 13. Implement CTABannerSection
  - [x] 13.1 Create `src/components/sections/CTABannerSection.jsx`
    - Import `project` and `contact` from `../../data.js`
    - Section `id="contact"`, min-height `60vh`, full-width cinematic layout
    - Background: dark overlay on Unsplash spiritual/nature image (opacity 15%), gold radial gradient overlay from center, particle effects (reuse pattern from HeroSection), subtle grid lines overlay
    - Parallax background: `useScroll` + `useTransform` for subtle Y movement
    - Centered content: eyebrow "Limited Pre-Launch Opportunity", heading "Book Your Space In The Future Of Conscious Living", subtext from `project.shortDescription`
    - Two `AnimatedButton` components: "Schedule Site Visit" (primary) → `https://wa.me/${contact.whatsapp}`, "Talk To Expert" (outline) → `tel:${contact.phone}`
    - Trust indicators row: three chips — "Zero Complaints", "Trusted Legacy", "Vaastu Perfect"
    - Buttons: animated gold glow pulse on idle; content: fade-up on scroll reveal
    - _Requirements: 20.1, 20.2_

  - [ ]* 13.2 Write property test for CTABannerSection — Property 7
    - **Property 7: CTA buttons link to correct contact data**
    - Use `fc.record({ phone: fc.string({ minLength: 5 }), whatsapp: fc.string({ minLength: 5 }) })` to generate arbitrary contact objects
    - Render `CTABannerSection` with mocked data module
    - Assert rendered output contains href values derived from `contact.whatsapp` and `contact.phone`
    - **Validates: Requirements 20.2**

- [x] 14. Update App.jsx with all new sections
  - Import all new section components and render them in the correct order after `PhilosophySection`:
    `PanchTatvaSection`, `VaastuSection`, `AmenitiesSection`, `PlotOptionsSection`, `MasterplanSection`, `LocationSection`, `WhyInvestSection`, `CTABannerSection`
  - Ensure each section has the correct `id` attribute matching the navigation links in `data.js`
  - _Requirements: 1.1, 2.6_

- [x] 15. Update index.html with SEO meta tags
  - Add `<meta name="description">` from `seo.description` in `data.js`
  - Add `<meta name="keywords">` joining `seo.keywords` array
  - Add `<meta name="theme-color" content="#C89B3C">`
  - Add Open Graph tags: `og:title`, `og:description`, `og:type="website"`, `og:url`, `og:image`
  - Add Twitter Card tags: `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`
  - Update `<title>` to match `seo.title`
  - _Requirements: 1.1_

- [x] 16. Final checkpoint — Ensure all tests pass
  - Run `npm test` and confirm all property-based tests and unit tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at logical milestones
- Property tests (Properties 1–7) validate that data-driven rendering is correct for any valid input shape — they complement, not replace, unit tests
- All content must be sourced from `src/data.js`; no company names, phone numbers, or section content may be hardcoded in component files (exception: premium descriptions and investment reasons that are presentational copy, not business data)
- The existing four sections (Hero, Stats, Vision, Philosophy) and all utility components (Navbar, Footer, FloatingWhatsApp, ScrollToTop, StickyMobileCTA) remain unchanged
