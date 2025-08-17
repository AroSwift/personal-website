// Tests for LoadingScreen component
// Verifies basic rendering and structure

import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from './utils'
import LoadingScreen from '../components/LoadingScreen'

describe('LoadingScreen', () => {
  it('renders loading screen with name', () => {
    const mockOnComplete = vi.fn()
    render(<LoadingScreen onComplete={mockOnComplete} />)

    // Name is split into individual letters, so check for first letter
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('shows initial word', async () => {
    const mockOnComplete = vi.fn()
    render(<LoadingScreen onComplete={mockOnComplete} />)

    // The component starts with "Innovator" (index 0)
    expect(screen.getByText('Innovator')).toBeInTheDocument()

    // Wait for the word to change to "Designer" (index 1)
    await waitFor(
      () => {
        expect(screen.getByText('Designer')).toBeInTheDocument()
      },
      { timeout: 2000 }
    )
  })

  it('renders rotating words section', () => {
    const mockOnComplete = vi.fn()
    render(<LoadingScreen onComplete={mockOnComplete} />)

    // Check that the rotating words container is present
    const wordsContainer = document.querySelector(
      '.h-16.flex.items-center.justify-center'
    )
    expect(wordsContainer).toBeInTheDocument()
  })

  it('accepts onComplete callback', () => {
    const mockOnComplete = vi.fn()
    render(<LoadingScreen onComplete={mockOnComplete} />)

    // Component should render without errors
    expect(screen.getByText('Innovator')).toBeInTheDocument()
  })
})
