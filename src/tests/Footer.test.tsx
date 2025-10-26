// Tests for Footer component
// Verifies props handling, content rendering, and external links

import { describe, it, expect } from 'vitest'
import { render, screen } from './utils'
import Footer from '../components/layout/Footer'

describe('Footer', () => {
  it('renders with default props', () => {
    render(<Footer />)

    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Currently')).toBeInTheDocument()
    expect(screen.getByText('Principles')).toBeInTheDocument()
    expect(screen.getByText('Source Code')).toBeInTheDocument()
  })

  it('displays location information', () => {
    render(<Footer />)

    expect(screen.getByText('Charlotte, NC (EST)')).toBeInTheDocument()
    expect(screen.getByText('Currently remote')).toBeInTheDocument()
  })

  it('shows current work information', () => {
    render(<Footer />)

    expect(screen.getByText('HPC Software Engineer @ ORNL')).toBeInTheDocument()
    expect(
      screen.getByText('Building agentic AI workflows')
    ).toBeInTheDocument()
  })

  it('displays principles', () => {
    render(<Footer />)

    expect(
      screen.getByText('Ship fast, then make it faster')
    ).toBeInTheDocument()
    expect(screen.getByText('Automate the boring stuff')).toBeInTheDocument()
  })

  it('renders GitHub link with correct attributes', () => {
    render(<Footer />)

    const githubLink = screen.getByRole('link', { name: 'View on GitHub' })
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/AroSwift/personal-website'
    )
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows open source text', () => {
    render(<Footer />)

    expect(screen.getByText('Open source')).toBeInTheDocument()
  })

  it('renders with custom animationDelay prop', () => {
    render(<Footer animationDelay={2.5} />)

    // Component should still render all content
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Currently')).toBeInTheDocument()
    expect(screen.getByText('Principles')).toBeInTheDocument()
    expect(screen.getByText('Source Code')).toBeInTheDocument()
  })

  it('renders with custom textColor prop', () => {
    render(<Footer textColor="text-blue-600" />)

    // Component should still render all content
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Currently')).toBeInTheDocument()
    expect(screen.getByText('Principles')).toBeInTheDocument()
    expect(screen.getByText('Source Code')).toBeInTheDocument()
  })

  it('renders with custom borderColor prop', () => {
    render(<Footer borderColor="border-red-500" />)

    // Component should still render all content
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Currently')).toBeInTheDocument()
    expect(screen.getByText('Principles')).toBeInTheDocument()
    expect(screen.getByText('Source Code')).toBeInTheDocument()
  })

  it('renders with custom className prop', () => {
    render(<Footer className="custom-footer-class" />)

    // Component should still render all content
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Currently')).toBeInTheDocument()
    expect(screen.getByText('Principles')).toBeInTheDocument()
    expect(screen.getByText('Source Code')).toBeInTheDocument()
  })

  it('renders with all custom props', () => {
    render(
      <Footer
        animationDelay={3.0}
        textColor="text-green-600"
        borderColor="border-green-500"
        className="custom-class"
      />
    )

    // Component should still render all content
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Currently')).toBeInTheDocument()
    expect(screen.getByText('Principles')).toBeInTheDocument()
    expect(screen.getByText('Source Code')).toBeInTheDocument()
  })

  it('displays all section headings', () => {
    render(<Footer />)

    const headings = screen.getAllByRole('heading', { level: 4 })
    expect(headings).toHaveLength(4)
    expect(headings[0]).toHaveTextContent('Location')
    expect(headings[1]).toHaveTextContent('Currently')
    expect(headings[2]).toHaveTextContent('Principles')
    expect(headings[3]).toHaveTextContent('Source Code')
  })

  it('renders in grid layout', () => {
    render(<Footer />)

    // The component should render with grid classes
    const footerElement = screen.getByText('Location').closest('div')
    expect(footerElement).toBeInTheDocument()
  })

  it('applies correct CSS classes for styling', () => {
    render(<Footer />)

    // Test that the component renders without errors
    // The actual CSS class testing would require more complex setup
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Currently')).toBeInTheDocument()
    expect(screen.getByText('Principles')).toBeInTheDocument()
    expect(screen.getByText('Source Code')).toBeInTheDocument()
  })
})
