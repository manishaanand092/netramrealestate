import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PlotOptionsSection from './PlotOptionsSection'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
  useInView: () => true,
  AnimatePresence: ({ children }) => <>{children}</>,
}))

describe('PlotOptionsSection', () => {
  it('renders the section with correct id', () => {
    const { container } = render(<PlotOptionsSection />)
    const section = container.querySelector('#plots')
    expect(section).toBeInTheDocument()
  })

  it('renders all plot sizes from data', () => {
    render(<PlotOptionsSection />)
    expect(screen.getByText('108 Sq Yards')).toBeInTheDocument()
    expect(screen.getByText('200 Sq Yards')).toBeInTheDocument()
    expect(screen.getByText('226 Sq Yards')).toBeInTheDocument()
  })

  it('renders all plot types from data', () => {
    render(<PlotOptionsSection />)
    expect(screen.getByText('Compact Sacred Plot')).toBeInTheDocument()
    expect(screen.getByText('Premium Plot')).toBeInTheDocument()
    expect(screen.getByText('Luxury Corner Plot')).toBeInTheDocument()
  })

  it('renders the section heading eyebrow', () => {
    render(<PlotOptionsSection />)
    expect(screen.getByText('Plot Options')).toBeInTheDocument()
  })

  it('renders the section title and highlight', () => {
    render(<PlotOptionsSection />)
    expect(screen.getByText('Choose Your')).toBeInTheDocument()
    expect(screen.getByText('Sacred Space')).toBeInTheDocument()
  })

  it('renders the featured card with Most Popular badge', () => {
    render(<PlotOptionsSection />)
    expect(screen.getByText('✦ Most Popular')).toBeInTheDocument()
  })

  it('renders WhatsApp enquiry links', () => {
    render(<PlotOptionsSection />)
    const whatsappLinks = screen.getAllByText(/Enquire on WhatsApp/i)
    expect(whatsappLinks.length).toBeGreaterThan(0)
  })
})
