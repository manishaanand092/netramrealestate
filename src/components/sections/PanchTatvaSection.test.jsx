import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PanchTatvaSection from './PanchTatvaSection'

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

describe('PanchTatvaSection', () => {
  it('renders the section with correct id', () => {
    const { container } = render(<PanchTatvaSection />)
    const section = container.querySelector('#panch-tatva')
    expect(section).toBeInTheDocument()
  })

  it('renders all five elements from data', () => {
    render(<PanchTatvaSection />)
    const elements = ['Earth', 'Water', 'Fire', 'Air', 'Space']
    elements.forEach((element) => {
      const matches = screen.getAllByText(element)
      expect(matches.length).toBeGreaterThan(0)
    })
  })

  it('renders the section eyebrow text', () => {
    render(<PanchTatvaSection />)
    expect(screen.getByText('The Five Elements')).toBeInTheDocument()
  })

  it('renders the panchTatva description', () => {
    render(<PanchTatvaSection />)
    expect(
      screen.getByText(
        'The township is planned according to Panch Tatva — Earth, Water, Fire, Air and Space.'
      )
    ).toBeInTheDocument()
  })
})
