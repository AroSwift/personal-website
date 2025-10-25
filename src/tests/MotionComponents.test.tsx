// Tests for MotionComponents component
// Verifies theme selector, button interactions, and animation states

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from './utils'
import MotionComponents from '../components/MotionComponents'

describe('MotionComponents', () => {
  const mockOnThemeSelect = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading animation elements', () => {
    render(
      <MotionComponents
        showThemeSelector={false}
        isExiting={false}
        onThemeSelect={mockOnThemeSelect}
      />
    )
    
    expect(screen.getByText('Portfolio of')).toBeInTheDocument()
    expect(screen.getByText('Aaron Barlow')).toBeInTheDocument()
  })

  it('shows theme selector when showThemeSelector is true', () => {
    render(
      <MotionComponents
        showThemeSelector={true}
        isExiting={false}
        onThemeSelect={mockOnThemeSelect}
      />
    )
    
    expect(screen.getByText('Choose your theme')).toBeInTheDocument()
    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
    expect(screen.getByText('Light Mode')).toBeInTheDocument()
  })

  it('hides theme selector when showThemeSelector is false', () => {
    render(
      <MotionComponents
        showThemeSelector={false}
        isExiting={false}
        onThemeSelect={mockOnThemeSelect}
      />
    )
    
    expect(screen.queryByText('Choose your theme')).not.toBeInTheDocument()
    expect(screen.queryByText('Dark Mode')).not.toBeInTheDocument()
    expect(screen.queryByText('Light Mode')).not.toBeInTheDocument()
  })

  it('calls onThemeSelect with dark when dark mode button clicked', () => {
    render(
      <MotionComponents
        showThemeSelector={true}
        isExiting={false}
        onThemeSelect={mockOnThemeSelect}
      />
    )
    
    const darkModeButton = screen.getByText('Dark Mode')
    fireEvent.click(darkModeButton)
    
    expect(mockOnThemeSelect).toHaveBeenCalledWith('dark')
  })

  it('calls onThemeSelect with light when light mode button clicked', () => {
    render(
      <MotionComponents
        showThemeSelector={true}
        isExiting={false}
        onThemeSelect={mockOnThemeSelect}
      />
    )
    
    const lightModeButton = screen.getByText('Light Mode')
    fireEvent.click(lightModeButton)
    
    expect(mockOnThemeSelect).toHaveBeenCalledWith('light')
  })

  it('renders exit animation overlay when isExiting is true', () => {
    render(
      <MotionComponents
        showThemeSelector={false}
        isExiting={true}
        onThemeSelect={mockOnThemeSelect}
      />
    )
    
    // The component should render without errors when exiting
    expect(screen.getByText('Portfolio of')).toBeInTheDocument()
    expect(screen.getByText('Aaron Barlow')).toBeInTheDocument()
  })

  it('renders exit animation overlay when isExiting is false', () => {
    render(
      <MotionComponents
        showThemeSelector={false}
        isExiting={false}
        onThemeSelect={mockOnThemeSelect}
      />
    )
    
    // The component should render without errors when not exiting
    expect(screen.getByText('Portfolio of')).toBeInTheDocument()
    expect(screen.getByText('Aaron Barlow')).toBeInTheDocument()
  })

  it('renders with all props set to true', () => {
    render(
      <MotionComponents
        showThemeSelector={true}
        isExiting={true}
        onThemeSelect={mockOnThemeSelect}
      />
    )
    
    expect(screen.getByText('Portfolio of')).toBeInTheDocument()
    expect(screen.getByText('Aaron Barlow')).toBeInTheDocument()
    expect(screen.getByText('Choose your theme')).toBeInTheDocument()
    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
    expect(screen.getByText('Light Mode')).toBeInTheDocument()
  })

  it('renders with all props set to false', () => {
    render(
      <MotionComponents
        showThemeSelector={false}
        isExiting={false}
        onThemeSelect={mockOnThemeSelect}
      />
    )
    
    expect(screen.getByText('Portfolio of')).toBeInTheDocument()
    expect(screen.getByText('Aaron Barlow')).toBeInTheDocument()
    expect(screen.queryByText('Choose your theme')).not.toBeInTheDocument()
  })

  it('handles multiple theme selections', () => {
    render(
      <MotionComponents
        showThemeSelector={true}
        isExiting={false}
        onThemeSelect={mockOnThemeSelect}
      />
    )
    
    const darkModeButton = screen.getByText('Dark Mode')
    const lightModeButton = screen.getByText('Light Mode')
    
    fireEvent.click(darkModeButton)
    fireEvent.click(lightModeButton)
    fireEvent.click(darkModeButton)
    
    expect(mockOnThemeSelect).toHaveBeenCalledTimes(3)
    expect(mockOnThemeSelect).toHaveBeenNthCalledWith(1, 'dark')
    expect(mockOnThemeSelect).toHaveBeenNthCalledWith(2, 'light')
    expect(mockOnThemeSelect).toHaveBeenNthCalledWith(3, 'dark')
  })

  it('renders theme selector buttons with correct accessibility', () => {
    render(
      <MotionComponents
        showThemeSelector={true}
        isExiting={false}
        onThemeSelect={mockOnThemeSelect}
      />
    )
    
    const darkModeButton = screen.getByText('Dark Mode')
    const lightModeButton = screen.getByText('Light Mode')
    
    expect(darkModeButton).toBeInTheDocument()
    expect(lightModeButton).toBeInTheDocument()
    expect(darkModeButton.tagName).toBe('BUTTON')
    expect(lightModeButton.tagName).toBe('BUTTON')
  })

  it('renders loading text with correct styling', () => {
    render(
      <MotionComponents
        showThemeSelector={false}
        isExiting={false}
        onThemeSelect={mockOnThemeSelect}
      />
    )
    
    expect(screen.getByText('Portfolio of')).toBeInTheDocument()
    expect(screen.getByText('Aaron Barlow')).toBeInTheDocument()
  })

  it('renders theme selector with correct text', () => {
    render(
      <MotionComponents
        showThemeSelector={true}
        isExiting={false}
        onThemeSelect={mockOnThemeSelect}
      />
    )
    
    expect(screen.getByText('Choose your theme')).toBeInTheDocument()
  })
})
