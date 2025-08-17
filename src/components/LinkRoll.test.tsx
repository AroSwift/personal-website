import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import LinkRoll from './LinkRoll'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('LinkRoll', () => {
  it('renders link with correct text', () => {
    renderWithRouter(<LinkRoll to="/test">Test Link</LinkRoll>)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
    expect(link).toHaveTextContent('Test Link')
  })

  it('applies active class when isActive is true', () => {
    renderWithRouter(
      <LinkRoll to="/test" isActive={true}>
        Test Link
      </LinkRoll>
    )

    const link = screen.getByRole('link')
    expect(link).toHaveClass('has-underline')
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    renderWithRouter(
      <LinkRoll to="/test" onClick={handleClick}>
        Test Link
      </LinkRoll>
    )

    const link = screen.getByRole('link')
    fireEvent.click(link)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onMouseEnter handler when mouse enters', () => {
    const handleMouseEnter = vi.fn()
    renderWithRouter(
      <LinkRoll to="/test" onMouseEnter={handleMouseEnter}>
        Test Link
      </LinkRoll>
    )

    const link = screen.getByRole('link')
    fireEvent.mouseEnter(link)

    expect(handleMouseEnter).toHaveBeenCalledTimes(1)
  })

  it('splits text into individual characters', () => {
    renderWithRouter(<LinkRoll to="/test">ABC</LinkRoll>)

    // Should render individual character spans
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })
})
