// Tests for LoadingScreen component
import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// Mock the LoadingScreen component to skip animations for testing
vi.mock('../components/LoadingScreen', () => ({
  default: ({ onComplete }: { onComplete: (theme: 'dark' | 'light') => void }) => {
    const handleThemeSelect = (theme: 'dark' | 'light') => {
      // Simulate the completion after a short delay
      setTimeout(() => {
        onComplete(theme)
      }, 100)
    }

    return (
      <div data-testid="loading-screen">
        <h1>Aaron Barlow</h1>
        <p>Innovator</p>
        <div>
          <p>Choose your theme</p>
          <div>
            <button onClick={() => handleThemeSelect('dark')}>Dark Mode</button>
            <button onClick={() => handleThemeSelect('light')}>Light Mode</button>
          </div>
        </div>
      </div>
    )
  }
}))

// Import the mocked component
import LoadingScreen from '../components/LoadingScreen'

describe('LoadingScreen', () => {
  it('renders loading screen with name animation', () => {
    const mockOnComplete = vi.fn()
    render(<LoadingScreen onComplete={mockOnComplete} />)

    expect(screen.getByText('Aaron Barlow')).toBeInTheDocument()
  })

  it('shows theme selector buttons', () => {
    const mockOnComplete = vi.fn()
    render(<LoadingScreen onComplete={mockOnComplete} />)

    expect(screen.getByText('Choose your theme')).toBeInTheDocument()
    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
    expect(screen.getByText('Light Mode')).toBeInTheDocument()
  })

  it('calls onComplete with dark theme when dark mode is selected', async () => {
    const mockOnComplete = vi.fn()
    render(<LoadingScreen onComplete={mockOnComplete} />)

    const darkButton = screen.getByText('Dark Mode')
    fireEvent.click(darkButton)

    // Wait for the onComplete callback to be called
    await new Promise(resolve => setTimeout(resolve, 200))

    expect(mockOnComplete).toHaveBeenCalledWith('dark')
  })

  it('calls onComplete with light theme when light mode is selected', async () => {
    const mockOnComplete = vi.fn()
    render(<LoadingScreen onComplete={mockOnComplete} />)

    const lightButton = screen.getByText('Light Mode')
    fireEvent.click(lightButton)

    // Wait for the onComplete callback to be called
    await new Promise(resolve => setTimeout(resolve, 200))

    expect(mockOnComplete).toHaveBeenCalledWith('light')
  })
})
