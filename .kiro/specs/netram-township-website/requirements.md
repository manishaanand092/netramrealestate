# Requirements Document

## Introduction

Netram Township Website is a premium luxury real estate frontend built with React + Vite + Tailwind CSS. It presents India's first Sanatan & Tantra inspired conscious township (Netram Township by Prakriti Guru Estate LLP) to prospective buyers. The site must feel cinematic, spiritually luxurious, and conversion-focused — driving enquiries via WhatsApp and phone calls. All content is sourced dynamically from `src/data.js`.

## Glossary

- **Website**: The React + Vite single-page application for Netram Township
- **Navbar**: The sticky top navigation component
- **Hero_Section**: The fullscreen opening section of the website
- **Stats_Section**: The animated statistics display section
- **Vision_Section**: The split-layout section presenting the project vision
- **Philosophy_Section**: The grid section presenting the six philosophy pillars
- **Footer**: The bottom section with links, contact, and legal info
- **WhatsApp_Button**: The floating WhatsApp contact button
- **Mobile_CTA**: The sticky bottom call-to-action bar on mobile devices
- **ScrollToTop_Button**: The button that scrolls the page back to the top
- **Data_Module**: The `src/data.js` file containing all project content
- **Gold_Accent**: The primary brand color (#C89B3C / #E7B75F) used for highlights
- **Glassmorphism_Card**: A card with frosted-glass background, blur, and gold border

---

## Requirements

### Requirement 1: Data-Driven Content Architecture

**User Story:** As a developer, I want all website content sourced from a single data module, so that content updates require changes in only one place.

#### Acceptance Criteria

1. THE Website SHALL import all project content exclusively from `src/data.js`
2. THE Website SHALL NOT hardcode any company name, phone number, address, tagline, or section content directly inside component files
3. WHEN `src/data.js` is updated, THE Website SHALL reflect the updated content without requiring changes to component files
4. THE Data_Module SHALL export a default object containing project, company, contact, heroSection, stats, philosophy, navigation, and other content keys

---

### Requirement 2: Navbar

**User Story:** As a visitor, I want a clear and elegant navigation bar, so that I can easily move between sections of the website.

#### Acceptance Criteria

1. THE Navbar SHALL be fixed to the top of the viewport at all times (sticky)
2. WHEN the page scroll position is 0, THE Navbar SHALL render with a transparent background
3. WHEN the page is scrolled more than 40 pixels, THE Navbar SHALL transition to a dark semi-transparent background with backdrop blur
4. THE Navbar SHALL display the brand logo text "NETRAM" sourced from the Data_Module
5. THE Navbar SHALL render navigation links sourced from the `navigation` array in the Data_Module
6. WHEN a navigation link is clicked, THE Navbar SHALL smooth-scroll to the corresponding section
7. THE Navbar SHALL display a "Book Now" CTA button that opens the WhatsApp contact link
8. WHEN the viewport width is below 1024px, THE Navbar SHALL replace the horizontal menu with a hamburger icon
9. WHEN the hamburger icon is clicked, THE Navbar SHALL display a full-screen slide-in mobile menu with all navigation links
10. WHEN a mobile menu link is clicked, THE Navbar SHALL close the mobile menu and scroll to the target section

---

### Requirement 3: Hero Section

**User Story:** As a prospective buyer, I want a visually stunning hero section, so that I immediately understand the premium nature of the project and am compelled to enquire.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy the full viewport height (100vh minimum)
2. THE Hero_Section SHALL display the heading, subheading, and CTA button labels sourced from `heroSection` in the Data_Module
3. THE Hero_Section SHALL render a primary CTA button linking to the WhatsApp contact number
4. THE Hero_Section SHALL render a secondary CTA button that scrolls to the masterplan section
5. THE Hero_Section SHALL display project status badges sourced from `heroSection.badges` in the Data_Module
6. THE Hero_Section SHALL render a floating Glassmorphism_Card on the right side showing key project highlights
7. WHEN the page loads, THE Hero_Section SHALL animate content with fade-up and stagger transitions using Framer Motion
8. THE Hero_Section SHALL display animated floating particles as background decoration
9. THE Hero_Section SHALL include a scroll indicator animation at the bottom
10. THE Hero_Section SHALL render a dark background with Gold_Accent radial glow overlays

---

### Requirement 4: Stats Section

**User Story:** As a prospective buyer, I want to see key project numbers at a glance, so that I can quickly assess the scale and quality of the township.

#### Acceptance Criteria

1. THE Stats_Section SHALL display total plots, green area percentage, pre-launch units, and project area sourced from `stats` in the Data_Module
2. WHEN a Stats_Section card enters the viewport, THE Stats_Section SHALL animate the numeric values counting up from zero to their target values
3. THE Stats_Section SHALL render each stat inside a Glassmorphism_Card with hover lift animation
4. WHEN a stat card is hovered, THE Stats_Section SHALL apply a gold border glow effect
5. THE Stats_Section SHALL use a 4-column grid on desktop and a 2-column grid on mobile

---

### Requirement 5: Vision Section

**User Story:** As a prospective buyer, I want to understand the project's vision and the founder's background, so that I can trust the developer's credibility.

#### Acceptance Criteria

1. THE Vision_Section SHALL display a split layout with an image placeholder on the left and text content on the right
2. THE Vision_Section SHALL display the project's full description sourced from `project.fullDescription` in the Data_Module
3. THE Vision_Section SHALL display the founder's vision quote sourced from `company.founder.vision` in the Data_Module
4. THE Vision_Section SHALL display project highlight points sourced from `project.highlights` in the Data_Module
5. WHEN the Vision_Section enters the viewport, THE Vision_Section SHALL animate content with scroll-reveal transitions
6. THE Vision_Section SHALL display floating badge cards with animated vertical movement
7. THE Vision_Section SHALL include gold divider lines between content elements

---

### Requirement 6: Philosophy Section

**User Story:** As a prospective buyer, I want to understand the spiritual and design philosophy of the township, so that I can evaluate alignment with my values.

#### Acceptance Criteria

1. THE Philosophy_Section SHALL display all philosophy items sourced from `philosophy.items` in the Data_Module
2. THE Philosophy_Section SHALL render each philosophy item as a Glassmorphism_Card with icon, title, and description
3. THE Philosophy_Section SHALL use a 3-column grid on desktop, 2-column on tablet, and 1-column on mobile
4. WHEN a philosophy card is hovered, THE Philosophy_Section SHALL apply a gold border glow and lift the card upward
5. WHEN the Philosophy_Section enters the viewport, THE Philosophy_Section SHALL stagger-animate each card with fade-up transitions
6. THE Philosophy_Section SHALL display a section heading sourced from `philosophy.title` in the Data_Module

---

### Requirement 7: Floating WhatsApp Button

**User Story:** As a prospective buyer, I want a persistent WhatsApp contact button, so that I can reach the sales team at any point while browsing.

#### Acceptance Criteria

1. THE WhatsApp_Button SHALL be fixed to the bottom-right corner of the viewport at all times
2. THE WhatsApp_Button SHALL link to the WhatsApp number sourced from `contact.whatsapp` in the Data_Module with a pre-filled enquiry message
3. THE WhatsApp_Button SHALL display a pulsing animation ring to draw attention
4. WHEN the WhatsApp_Button is hovered, THE WhatsApp_Button SHALL scale up and display a tooltip with a call-to-action message
5. THE WhatsApp_Button SHALL appear with a spring entrance animation after a 2-second delay on page load

---

### Requirement 8: Sticky Mobile CTA Bar

**User Story:** As a mobile visitor, I want persistent call and WhatsApp buttons at the bottom of the screen, so that I can contact the sales team without scrolling back to the top.

#### Acceptance Criteria

1. THE Mobile_CTA SHALL only be visible on viewport widths below 640px (sm breakpoint)
2. WHEN the page is scrolled more than 300 pixels, THE Mobile_CTA SHALL slide up into view from the bottom
3. THE Mobile_CTA SHALL display a "Call Now" button linking to the phone number from the Data_Module
4. THE Mobile_CTA SHALL display a "WhatsApp" button linking to the WhatsApp number from the Data_Module
5. THE Mobile_CTA SHALL use a dark glassmorphism background with a gold top border

---

### Requirement 9: Scroll-to-Top Button

**User Story:** As a visitor who has scrolled far down the page, I want a scroll-to-top button, so that I can quickly return to the top without manual scrolling.

#### Acceptance Criteria

1. WHEN the page scroll position exceeds 400 pixels, THE ScrollToTop_Button SHALL appear with a scale-in animation
2. WHEN the page scroll position is below 400 pixels, THE ScrollToTop_Button SHALL disappear with a scale-out animation
3. WHEN the ScrollToTop_Button is clicked, THE Website SHALL smooth-scroll to the top of the page
4. THE ScrollToTop_Button SHALL be fixed to the bottom-left corner of the viewport

---

### Requirement 10: Footer

**User Story:** As a visitor, I want a comprehensive footer with contact details and quick links, so that I can find important information and navigate the site from the bottom.

#### Acceptance Criteria

1. THE Footer SHALL display the project short description sourced from `project.shortDescription` in the Data_Module
2. THE Footer SHALL display quick navigation links sourced from the `navigation` array in the Data_Module
3. THE Footer SHALL display contact details (phone, email, address) sourced from `contact` in the Data_Module
4. THE Footer SHALL display developer information sourced from `company` in the Data_Module
5. THE Footer SHALL display a copyright notice with the current year and company name
6. THE Footer SHALL use a dark glassmorphism style with gold separator lines
7. THE Footer SHALL render a 4-column grid on desktop and stacked columns on mobile

---

### Requirement 11: Responsive Design

**User Story:** As a visitor on any device, I want the website to display correctly and beautifully, so that I have a premium experience regardless of screen size.

#### Acceptance Criteria

1. THE Website SHALL render correctly on viewport widths from 320px (mobile) to 1920px (desktop)
2. THE Website SHALL use Tailwind CSS responsive breakpoints (sm, md, lg, xl) for all layout changes
3. WHEN rendered on mobile, THE Website SHALL stack multi-column layouts into single columns
4. THE Website SHALL use the Playfair Display font for all headings and Poppins for all body text
5. THE Website SHALL maintain touch-friendly tap targets of at least 44px on mobile

---

### Requirement 12: Animation and Visual Quality

**User Story:** As a visitor, I want smooth, elegant animations throughout the site, so that the premium brand impression is reinforced at every interaction.

#### Acceptance Criteria

1. THE Website SHALL use Framer Motion for all entrance animations, hover effects, and transitions
2. WHEN any section enters the viewport, THE Website SHALL trigger scroll-reveal animations using Framer Motion's `useInView` hook
3. THE Website SHALL apply gold gradient text to key headings using CSS background-clip technique
4. THE Website SHALL render Glassmorphism_Cards using backdrop-filter blur with gold border accents
5. WHEN interactive elements are hovered, THE Website SHALL apply smooth scale and glow transitions within 300ms
6. THE Website SHALL display subtle background glow effects using large blurred radial gradients in Gold_Accent color
