import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import VaastuSection from './VaastuSection'

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

// Mock lucide-react
vi.mock('lucide-react', () => ({
  CheckCircle2: ({ size, className }) => (
    <svg data-testid="check-icon" className={className} width={size} height={size} />
  ),
}))

describe('VaastuSection', () => {
  it('renders the section with correct id', () => {
    const { container } = render(<VaastuSection />)
    const section = container.querySelector('#vaastu')
    expect(section).toBeInTheDocument()
  })

  it('renders the vaastu title', () => {
    render(<VaastuSection />)
    expect(
      screen.getByText("India's First Direction Conscious Township")
    ).toBeInTheDocument()
  })

  it('renders the vaastu description', () => {
    render(<VaastuSection />)
    expect(
      screen.getByText('Every plot at Netram faces North, North-East or North-West only.')
    ).toBeInTheDocument()
  })

  it('renders the key point', () => {
    render(<VaastuSection />)
    expect(screen.getByText('"No South Facing Homes — Ever."')).toBeInTheDocument()
  })

  it('renders all vaastu benefits', () => {
    render(<VaastuSection />)
    const benefits = [
      'Positive Energy Flow',
      'Natural Harmony',
      'Prosperity Alignment',
      'Spiritual Balance',
    ]
    benefits.forEach((benefit) => {
      expect(screen.getByText(benefit)).toBeInTheDocument()
    })
  })

  it('renders the eyebrow text', () => {
    render(<VaastuSection />)
    expect(screen.getByText('Vaastu Perfection')).toBeInTheDocument()
  })
})
