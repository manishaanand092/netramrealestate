import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SectionHeading from './SectionHeading'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
}))

describe('SectionHeading', () => {
  it('renders eyebrow text', () => {
    render(<SectionHeading eyebrow="Test Eyebrow" title="Title" />)
    expect(screen.getByText('Test Eyebrow')).toBeInTheDocument()
  })

  it('renders title text', () => {
    render(<SectionHeading eyebrow="Eyebrow" title="Main Title" />)
    expect(screen.getByText('Main Title')).toBeInTheDocument()
  })

  it('renders highlight text when provided', () => {
    render(<SectionHeading eyebrow="Eyebrow" title="Title" highlight="Highlight" />)
    expect(screen.getByText('Highlight')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(
      <SectionHeading
        eyebrow="Eyebrow"
        title="Title"
        description="Optional description text"
      />
    )
    expect(screen.getByText('Optional description text')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    render(<SectionHeading eyebrow="Eyebrow" title="Title" />)
    expect(screen.queryByText('Optional description text')).not.toBeInTheDocument()
  })

  it('renders without highlight when not provided', () => {
    render(<SectionHeading eyebrow="Eyebrow" title="Title" />)
    // Should not throw and title should still be present
    expect(screen.getByText('Title')).toBeInTheDocument()
  })
})
