# Design Document — Netram Township Website (Phase 2: New Sections)

## Overview

This design document covers the second phase of the Netram Township website — eight new sections plus global enhancements. The existing codebase (Hero, Stats, Vision, Philosophy sections + Navbar, Footer, FloatingWhatsApp, ScrollToTop, StickyMobileCTA) is preserved unchanged. All new sections follow the same premium design system: dark charcoal backgrounds, gold (#C89B3C / #E7B75F) accents, Playfair Display headings, Poppins body text, Framer Motion animations, and glassmorphism cards.

All content is sourced exclusively from `src/data.js` (which mirrors `data.js` at the root). No content is hardcoded in component files.

---

## Architecture

### Component Structure

```
src/
  components/
    ui/                          ← NEW: Reusable primitives
      SectionHeading.jsx
      AnimatedButton.jsx
      GlassCard.jsx
    sections/                    ← Existing + new sections
      HeroSection.jsx            (unchanged)
      StatsSection.jsx           (unchanged)
      VisionSection.jsx          (unchanged)
      PhilosophySection.jsx      (unchanged)
      PanchTatvaSection.jsx      ← NEW
      VaastuSection.jsx          ← NEW
      AmenitiesSection.jsx       ← NEW
      PlotOptionsSection.jsx     ← NEW
      MasterplanSection.jsx      ← NEW
      LocationSection.jsx        ← NEW
      WhyInvestSection.jsx       ← NEW
      CTABannerSection.jsx       ← NEW
  App.jsx                        (updated — adds new sections + LoadingScreen)
  LoadingScreen.jsx              ← NEW
  CursorGlow.jsx                 ← NEW
  index.css                      (updated — cursor glow, scrollbar, lazy load)
index.html                       (updated — OG tags)
```

### Data Flow

All sections import `NETRAM_DATA` from `../../data.js` and destructure only the keys they need. No prop drilling — each section is self-contained.

### Section Order in App.jsx

```
<LoadingScreen />
<CursorGlow />
<Navbar />
<main>
  <HeroSection />          id="hero"
  <StatsSection />         id="stats"
  <VisionSection />        id="vision"
  <PhilosophySection />    id="philosophy"
  <PanchTatvaSection />    id="panch-tatva"
  <VaastuSection />        id="vaastu"
  <AmenitiesSection />     id="amenities"
  <PlotOptionsSection />   id="plots"
  <MasterplanSection />    id="masterplan"
  <LocationSection />      id="location"
  <WhyInvestSection />     id="why-invest"
  <CTABannerSection />     id="contact"
</main>
<Footer />
<FloatingWhatsApp />
<ScrollToTop />
<StickyMobileCTA />
```

---

## Components and Interfaces

### Reusable UI Primitives

#### `SectionHeading` Props
```ts
{
  eyebrow: string        // Small uppercase label above heading
  title: string          // Main heading (first part, white)
  highlight: string      // Italic gold gradient part of heading
  description?: string   // Optional subtitle paragraph
  centered?: boolean     // Default true
}
```

#### `AnimatedButton` Props
```ts
{
  href?: string          // External link
  onClick?: () => void   // Click handler
  variant: 'primary' | 'outline' | 'ghost'
  children: ReactNode
  className?: string
  target?: string
}
```

#### `GlassCard` Props
```ts
{
  children: ReactNode
  className?: string
  hover?: boolean        // Enable hover lift + glow (default true)
  glow?: boolean         // Enable gold border glow (default true)
}
```

### Section Components

Each section component:
- Imports `NETRAM_DATA` from `../../data.js`
- Uses `useRef` + `useInView` for scroll-reveal
- Uses Framer Motion for all animations
- Has a unique `id` attribute for anchor navigation
- Is fully responsive via Tailwind breakpoints

---

## Data Models

All data is read-only from `src/data.js`. The relevant keys for new sections:

```js
NETRAM_DATA.panchTatva     // { title, description, elements: string[] }
NETRAM_DATA.vaastu         // { title, description, keyPoint, benefits: string[] }
NETRAM_DATA.amenities      // Array<{ name, icon }>
NETRAM_DATA.plots          // Array<{ size, type, description }>
NETRAM_DATA.masterplan     // { title, description }
NETRAM_DATA.locationAdvantages  // Array<{ title, description }>
NETRAM_DATA.contact        // { phone, whatsapp, email, ... }
NETRAM_DATA.project        // { highlights, ... }
NETRAM_DATA.stats          // { roads, greenArea, totalPlots, ... }
```

The `data.js` file does not need modification — all required content already exists.

---

## Section Designs

### 1. PanchTatvaSection

**Layout**: Full-width dark section. Center: large animated circular mandala/ring element. Five floating cards positioned around it (top, top-right, bottom-right, bottom-left, top-left). On mobile: vertical stack of five cards below a centered circle.

**Visual Design**:
- Background: `charcoal-900` with radial gold glow at center
- Center element: Two concentric rotating rings (slow CSS animation), inner circle with "☯" or "🕉" symbol, gold gradient border
- Five element cards: `glass-card` with gold border, each card has a large emoji icon, element name in Playfair Display, and a one-line description
- Element-to-color mapping: Earth=amber, Water=blue, Fire=red, Air=cyan, Space=purple (subtle tints on card borders)
- Particle background: 12 small floating gold dots (reuse particle pattern from HeroSection)

**Animations**:
- Center rings: `animate-spin-slow` (20s) and reverse spin (30s)
- Cards: Framer Motion stagger (0.15s delay each), `y: [0, -10, 0]` float loop
- Hover: `scale: 1.08`, gold glow intensifies
- Section entrance: `useInView` fade-up

**Data**: `panchTatva.title`, `panchTatva.description`, `panchTatva.elements`

**Element descriptions** (hardcoded in component since not in data.js):
- Earth: "Grounded foundations & stability"
- Water: "Sacred Ganga flow & abundance"
- Fire: "Transformative energy & vitality"
- Air: "Breath of life & freedom"
- Space: "Infinite consciousness & expansion"

---

### 2. VaastuSection

**Layout**: Split layout — LEFT: architectural image placeholder with floating compass UI, RIGHT: content.

**Left Panel**:
- Aspect ratio 4/5, rounded-3xl, dark gradient background + subtle image overlay (opacity 20%)
- Floating compass: Circular SVG-style compass with N/S/E/W labels, gold border, slow rotation animation
- Direction indicators: Four small badges (N, NE, NW highlighted in gold; S in red/muted) positioned around the compass
- Corner accent lines (same pattern as VisionSection)

**Right Panel**:
- Eyebrow: "Vaastu Perfection"
- Heading: `vaastu.title`
- Description: `vaastu.description`
- **Highlight quote box**: Full-width glass card with left gold border (2px), large italic text: `vaastu.keyPoint` ("No South Facing Homes — Ever"), gold background tint
- Benefits list: Four benefit chips from `vaastu.benefits`, each with a gold checkmark icon
- Animated gold divider between sections

**Animations**:
- Left panel: `x: -60 → 0` on scroll reveal
- Right panel: stagger fade-up
- Quote box: subtle gold border pulse animation (keyframe)
- Compass: `rotate: [0, 360]` over 30s loop

---

### 3. AmenitiesSection

**Layout**: Section heading centered, then 4-col grid (desktop) / 2-col (tablet) / 1-col (mobile).

**Card Design**:
- `glass-card gold-border-glow` rounded-2xl, padding 6-8
- Large emoji icon in a 16×16 rounded-2xl gold-tinted box
- Amenity name in Playfair Display, bold, white
- Short premium description (generated per amenity in component since data.js only has name+icon)
- Animated bottom border line on hover (width 0 → 75%)
- Background texture: subtle dot pattern (same as PhilosophySection)

**Premium descriptions** (hardcoded in component):
- Commercial Zone: "Curated retail & lifestyle spaces"
- Swimming Pool: "Resort-style aquatic retreat"
- Club House: "Exclusive members' social hub"
- Jogging Track: "Scenic wellness pathway"
- Temple: "Sacred spiritual sanctuary"
- 55% Green Area: "Lush Ayurvedic landscape"
- Guard Room: "24/7 premium security"
- Ashram: "Meditation & yoga retreat"

**Animations**:
- Stagger entrance: 0.1s delay per card
- Hover: `y: -8, scale: 1.02`
- Icon box: gold glow on hover

---

### 4. PlotOptionsSection

**Layout**: Section heading, then 3-column card grid (desktop) / 1-column (mobile). Center card (200 sq yards) is featured.

**Standard Card**:
- `glass-card` rounded-3xl, padding 8
- Top: "Limited Availability" badge (gold pill)
- Plot size in large Playfair Display gold gradient text
- Plot type subtitle
- Divider line
- Description paragraph
- CTA button: `AnimatedButton` outline variant → WhatsApp link

**Featured Card (200 sq yards)**:
- Slightly larger scale (`scale-105` on desktop)
- Gold gradient border (animated shimmer)
- "Most Popular" badge in gold
- Background: subtle gold tint `bg-gold-500/5`
- CTA button: `AnimatedButton` primary variant
- Floating glow behind card

**Animations**:
- Cards: stagger fade-up
- Featured card: subtle `y: [0, -6, 0]` float loop
- Hover: `scale: 1.03`, glow intensifies
- Badge: pulse animation

---

### 5. MasterplanSection

**Layout**: Split — LEFT: large masterplan image placeholder with zoom hover + floating labels, RIGHT: content.

**Left Panel**:
- Aspect ratio 1/1 or 4/3, rounded-3xl
- Dark gradient background with grid overlay (architectural blueprint feel)
- `overflow-hidden` with `whileHover: { scale: 1.03 }` zoom effect
- Floating info labels (glassmorphism pills) positioned on the image:
  - "40 Plots" (top-left)
  - "Temple Zone" (top-right)
  - "Green Belt" (bottom-left)
  - "12m Roads" (bottom-right)
- Corner accent lines

**Right Panel**:
- Eyebrow: "Masterplan"
- Heading: `masterplan.title`
- Description: `masterplan.description`
- Key highlights list (animated bullet points with gold dot + line reveal):
  - 40 saleable plots
  - 17 Bigha total area
  - 55% green & open area
  - 12m & 9m wide roads
  - Temple + Ashram inside
  - Commercial zone
- Two CTA buttons side by side:
  - "Download Brochure" (outline) → WhatsApp
  - "Schedule Site Visit" (primary) → WhatsApp

**Animations**:
- Left panel: `x: -60 → 0`
- Right panel: stagger fade-up
- Bullet points: stagger with left-to-right line reveal
- Floating labels: individual float animations

---

### 6. LocationSection

**Layout**: Split — LEFT: map placeholder with animated pins, RIGHT: location cards stack.

**Left Panel**:
- Aspect ratio 1/1, rounded-3xl, dark background
- Styled as a premium map placeholder: subtle grid lines, gold dot for project location, concentric circle ripple animation
- 4 animated pin markers at different positions, each with a pulsing ring
- "Netram Township" label card floating at center

**Right Panel**:
- Eyebrow: "Location Advantages"
- Heading: "Perfectly Connected, Divinely Located"
- Location cards from `locationAdvantages`:
  - Each card: `glass-card` with left gold border, icon (MapPin/Navigation), title, description
  - Animated connecting line between cards (vertical gold line with dot)
- Maa Ganga highlight card: special treatment with blue-gold gradient border, wave emoji

**Animations**:
- Map pins: stagger pulse entrance
- Location cards: stagger slide-in from right
- Connecting line: height animates from 0 to full on scroll reveal
- Hover: card lifts, border brightens

---

### 7. WhyInvestSection

**Layout**: Section heading, then 3-column grid (desktop) / 2-column (tablet) / 1-column (mobile) of dark premium cards.

**Investment Reason Cards** (content hardcoded in component — not in data.js):
1. Spiritual Living — "Align your home with cosmic energies"
2. Future Growth Potential — "Upcoming 6-lane highway connectivity"
3. Prime Location — "Ganga-touch property near Chota Haridwar"
4. Conscious Township Concept — "India's first of its kind"
5. Limited Inventory — "Only 40 plots — exclusivity guaranteed"
6. Luxury Community — "Premium amenities, Vaastu-perfect design"

**Card Design**:
- Background: `charcoal-800` with subtle gold gradient top border
- Large number/icon in gold gradient (01, 02, 03...)
- Title in Playfair Display
- Description in Poppins
- Bottom stat or growth indicator (e.g., "6-Lane Highway", "40 Plots Only")
- Hover: gold glow, slight lift

**Conversion Psychology Elements**:
- Section eyebrow: "Why Smart Investors Choose Netram"
- Scarcity indicator: "Only 40 Plots Available" banner at top
- Trust points from `trust.points` displayed as a horizontal ticker/row below cards

**Animations**:
- Cards: stagger fade-up
- Number: count-up animation on scroll reveal
- Scarcity banner: subtle pulse

---

### 8. CTABannerSection

**Layout**: Full-width cinematic section, min-height 60vh.

**Background**:
- Dark overlay on a spiritual/nature image (Unsplash placeholder, opacity 15%)
- Gold radial gradient overlay from center
- Particle effects (reuse particle component)
- Subtle grid lines overlay

**Content** (centered):
- Eyebrow: "Limited Pre-Launch Opportunity"
- Heading: "Book Your Space In The Future Of Conscious Living"
- Subtext: Short description from `project.shortDescription`
- Two CTA buttons:
  - "Schedule Site Visit" → WhatsApp (primary, animated glow)
  - "Talk To Expert" → tel: link (outline)
- Trust indicators row: "Zero Complaints", "Trusted Legacy", "Vaastu Perfect"

**Animations**:
- Parallax background: `useScroll` + `useTransform` for subtle Y movement
- Buttons: animated gold glow pulse on idle
- Content: fade-up on scroll reveal
- Background particles: floating gold dots

---

### 9. LoadingScreen

**Design**:
- Full-screen `charcoal-900` background
- Center: Netram "N" logo with gold gradient, pulsing ring animation
- "NETRAM" text with letter-by-letter reveal
- Tagline fade-in
- Exit: fade-out after 1.8s, unmounts after animation completes

**Implementation**: State in `App.jsx` — `isLoading` boolean, set to false after 1800ms. `AnimatePresence` handles exit animation.

---

### 10. CursorGlow

**Design**:
- Fixed div following mouse cursor (desktop only — hidden on touch devices)
- 300×300px radial gradient blob, gold color, opacity 0.06, pointer-events-none
- Smooth follow using `useMotionValue` + `useSpring` for lag effect
- Only renders when `window.matchMedia('(pointer: fine)')` is true

---

## Global Enhancements

### index.css Updates
- Premium scrollbar already exists (gold thumb) — no change needed
- Add `cursor: none` on desktop for custom cursor (optional, only if CursorGlow is enabled)
- Lazy loading: sections use `useInView` with `once: true` — already the pattern

### index.html Updates
- Add Open Graph meta tags: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`
- Add Twitter Card meta tags
- Add `<meta name="keywords">` from `seo.keywords`
- Add `<meta name="theme-color">` with gold color

### App.jsx Updates
- Import and render all new sections in correct order
- Add `LoadingScreen` with `AnimatePresence`
- Add `CursorGlow`
- Wrap `<main>` content — no other changes

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Panch Tatva elements are fully rendered

*For any* `panchTatva.elements` array in the data module, every element name in that array SHALL appear in the rendered PanchTatvaSection output.

**Validates: Requirements 13.2**

---

### Property 2: Vaastu content is fully rendered

*For any* `vaastu` data object, the rendered VaastuSection SHALL contain the `vaastu.keyPoint` string and every string in `vaastu.benefits`.

**Validates: Requirements 14.2, 14.3**

---

### Property 3: All amenities are rendered

*For any* `amenities` array in the data module, every `amenity.name` in that array SHALL appear in the rendered AmenitiesSection output.

**Validates: Requirements 15.1**

---

### Property 4: All plot options are rendered

*For any* `plots` array in the data module, every `plot.size` and `plot.type` in that array SHALL appear in the rendered PlotOptionsSection output.

**Validates: Requirements 16.1**

---

### Property 5: Masterplan content is fully rendered

*For any* `masterplan` data object, the rendered MasterplanSection SHALL contain both `masterplan.title` and `masterplan.description`.

**Validates: Requirements 17.1**

---

### Property 6: All location advantages are rendered

*For any* `locationAdvantages` array in the data module, every `item.title` and `item.description` SHALL appear in the rendered LocationSection output.

**Validates: Requirements 18.1**

---

### Property 7: CTA buttons link to correct contact data

*For any* `contact` data object, the CTA buttons in CTABannerSection SHALL contain href values derived from `contact.whatsapp` and `contact.phone`.

**Validates: Requirements 20.2**

---

## Error Handling

### Missing Data Keys
- All section components use optional chaining (`?.`) and nullish coalescing (`??`) when accessing data
- If an array is empty, sections render gracefully with no cards (no crash)
- If a string is undefined, it falls back to an empty string

### Image Loading
- All image placeholders use CSS gradients as primary background — no `<img>` tags that could 404
- Unsplash URLs used as `background-image` with `opacity-10/20` — if they fail to load, the gradient background is still visible

### Animation Failures
- All Framer Motion animations use `initial` + `animate` pattern — if JS is slow, the element is still visible (not hidden)
- `useInView` with `once: true` ensures animations only fire once, preventing re-trigger issues

---

## Testing Strategy

### Unit Tests (Example-Based)
- Verify PanchTatvaSection renders all 5 element names from data
- Verify VaastuSection renders the keyPoint text
- Verify AmenitiesSection renders all 8 amenity names
- Verify PlotOptionsSection renders all 3 plot sizes
- Verify MasterplanSection renders title and description
- Verify LocationSection renders all 4 location advantage titles
- Verify CTABannerSection renders both CTA buttons
- Verify LoadingScreen renders on initial mount and disappears after timeout
- Verify index.html contains og:title, og:description, og:image meta tags

### Property-Based Tests
PBT is applicable for the data-rendering properties (Properties 1–7 above). The feature involves pure rendering functions where input variation (different data.js content) should always produce output containing the input data. A property-based testing library such as **fast-check** (JavaScript) would be appropriate.

Each property test:
- Generates arbitrary data objects matching the shape of the relevant data.js key
- Renders the component with that data
- Asserts the rendered output contains all expected strings
- Runs minimum 100 iterations

Tag format: `Feature: netram-township-website, Property {N}: {property_text}`

### Visual / Manual Tests
- Responsive layout at 320px, 768px, 1024px, 1440px
- Hover animations on all interactive cards
- Loading screen entrance and exit
- Cursor glow on desktop
- Scroll-reveal animations for all new sections
- Mobile sticky CTA visibility
- WhatsApp and phone links open correctly

### Integration Tests
- Navigation links scroll to correct section IDs
- WhatsApp links contain correct phone number from data.js
- Phone links contain correct phone number from data.js
