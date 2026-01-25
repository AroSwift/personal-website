// Tests for HomePage component
// Verifies basic rendering and component integration

import { describe, it, expect } from 'vitest'
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

    expect(screen.getByText(/Developing agentic workflows/)).toBeInTheDocument()
    expect(screen.getByText(/Visit projects/)).toBeInTheDocument()
  })

  it('renders profile image', () => {
    render(<HomePage />)

    const profileImage = screen.getByAltText('Profile photo of Aaron Barlow')
    expect(profileImage).toBeInTheDocument()
  })

  it('renders header component', () => {
    render(<HomePage />)

    // Header should be present (it renders navigation)
    expect(document.querySelector('header')).toBeInTheDocument()
  })
})
