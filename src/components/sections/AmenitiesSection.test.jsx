import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AmenitiesSection from './AmenitiesSection'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  useInView: () => true,
  AnimatePresence: ({ children }) => <>{children}</>,
}))

describe('AmenitiesSection', () => {
  it('renders the section with correct id', () => {
    const { container } = render(<AmenitiesSection />)
    const section = container.querySelector('#amenities')
    expect(section).toBeInTheDocument()
  })

  it('renders all amenity names from data', () => {
    render(<AmenitiesSection />)
    const amenityNames = [
      'Commercial Zone',
      'Swimming Pool',
      'Club House',
      'Jogging Track',
      'Temple',
      '55% Green Area',
      'Guard Room',
      'Ashram',
    ]
    amenityNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })

  it('renders the section heading eyebrow', () => {
    render(<AmenitiesSection />)
    expect(screen.getByText('World-Class Amenities')).toBeInTheDocument()
  })

  it('renders the section title', () => {
    render(<AmenitiesSection />)
    expect(screen.getByText('Everything You')).toBeInTheDocument()
  })

  it('renders the section highlight', () => {
    render(<AmenitiesSection />)
    expect(screen.getByText('Deserve')).toBeInTheDocument()
  })

  it('renders premium descriptions for amenities', () => {
    render(<AmenitiesSection />)
    expect(screen.getByText('Resort-style aquatic retreat')).toBeInTheDocument()
    expect(screen.getByText('Sacred spiritual sanctuary')).toBeInTheDocument()
  })
})
