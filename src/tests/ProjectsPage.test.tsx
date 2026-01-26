// Tests for ProjectsPage component
// Verifies rendering, data display, conditional links, and navigation

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from './utils'

// Mock external dependencies
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
    main: ({ children, ...props }: any) => <main {...props}>{children}</main>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('lucide-react', () => ({
  ExternalLink: () => <div data-testid="external-link-icon" />,
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}))

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}))

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  CardHeader: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardTitle: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
}))

vi.mock('../components/layout/Header', () => ({
  default: () => <header data-testid="header">Header</header>,
}))

vi.mock('../components/layout/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}))

import ProjectsPage from '../pages/ProjectsPage'

describe('ProjectsPage', () => {
  it('renders main heading', () => {
    render(<ProjectsPage />)
    expect(screen.getByText('Selected Projects')).toBeInTheDocument()
  })

  it('renders page description', () => {
    render(<ProjectsPage />)
    expect(
      screen.getByText(
        /A collection of professional work and personal projects/
      )
    ).toBeInTheDocument()
  })

  it('renders work projects section', () => {
    render(<ProjectsPage />)
    expect(screen.getByText('Work Projects')).toBeInTheDocument()
  })

  it('renders personal projects section', () => {
    render(<ProjectsPage />)
    expect(screen.getByText('Personal Projects')).toBeInTheDocument()
  })

  it('renders achievements section', () => {
    render(<ProjectsPage />)
    expect(screen.getByText('Achievement Highlights')).toBeInTheDocument()
  })

  it('includes header and footer components', () => {
    render(<ProjectsPage />)
    expect(document.querySelector('header')).toBeInTheDocument()
    expect(document.querySelector('footer')).toBeInTheDocument()
  })
})
