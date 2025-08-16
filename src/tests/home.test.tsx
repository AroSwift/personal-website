// Tests for HomePage component
// Verifies main content rendering and navigation links

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from './utils'
import HomePage from '../pages/HomePage'

describe('HomePage', () => {
  it('renders main heading', () => {
    render(<HomePage />)

    expect(
      screen.getByText(/I build code that thinks and infrastructure that lasts/)
    ).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<HomePage />)

    expect(screen.getByText('Selected Projects')).toBeInTheDocument()
    expect(screen.getByText('About me')).toBeInTheDocument()
  })

  it('renders current status information', () => {
    render(<HomePage />)

    expect(screen.getByText('Now')).toBeInTheDocument()
    expect(
      screen.getByText(/Developing agentic workflows/)
    ).toBeInTheDocument()
  })

  it('renders profile image', () => {
    render(<HomePage />)

    const profileImage = screen.getByAltText('Profile')
    expect(profileImage).toBeInTheDocument()
  })

  it('renders header component', () => {
    render(<HomePage />)

    // Header should be present (it renders navigation)
    expect(document.querySelector('header')).toBeInTheDocument()
  })
})
