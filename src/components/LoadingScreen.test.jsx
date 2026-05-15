import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoadingScreen from './LoadingScreen'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

describe('LoadingScreen', () => {
  it('renders the NETRAM letters', () => {
    render(<LoadingScreen />)
    // Each letter is rendered individually
    const letters = ['N', 'E', 'T', 'R', 'A', 'M']
    letters.forEach((letter) => {
      const elements = screen.getAllByText(letter)
      expect(elements.length).toBeGreaterThan(0)
    })
  })

  it('renders the project tagline', () => {
    render(<LoadingScreen />)
    expect(
      screen.getByText('Where Sanatan Wisdom Meets Modern Living')
    ).toBeInTheDocument()
  })

  it('renders the N logo', () => {
    render(<LoadingScreen />)
    // The "N" logo appears in the logo circle
    const nElements = screen.getAllByText('N')
    expect(nElements.length).toBeGreaterThan(0)
  })
})
