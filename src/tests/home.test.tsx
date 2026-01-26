// Tests for HomePage component
// Verifies main content rendering and navigation links

import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('HomePage', () => {
  it('renders main heading', () => {
    renderWithRouter(<HomePage />)

    expect(
      screen.getByText(/I build code that thinks and infrastructure that lasts/)
    ).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    renderWithRouter(<HomePage />)

    expect(screen.getByText('Selected Projects')).toBeInTheDocument()
    expect(screen.getByText('About me')).toBeInTheDocument()
  })

  it('renders current status information', () => {
    renderWithRouter(<HomePage />)

    expect(screen.getByText(/Developing agentic workflows/)).toBeInTheDocument()
    expect(screen.getByText(/Visit projects/)).toBeInTheDocument()
  })

  it('renders profile image', () => {
    renderWithRouter(<HomePage />)

    const profileImage = screen.getByAltText('Profile')
    expect(profileImage).toBeInTheDocument()
  })

  it('renders header component', () => {
    renderWithRouter(<HomePage />)

    // Header should be present (it renders navigation)
    expect(document.querySelector('header')).toBeInTheDocument()
  })
})
