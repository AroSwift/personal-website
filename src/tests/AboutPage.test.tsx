// Tests for AboutPage component
// Verifies profile, experience, skills, education, presentations, and navigation

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from './utils'

// Mock external dependencies
vi.mock('framer-motion', () => {
  const motion = {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    img: ({ children, alt, ...props }: any) => (
      <img alt={alt || ''} {...props}>
        {children}
      </img>
    ),
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
    main: ({ children, ...props }: any) => <main {...props}>{children}</main>,
  }
  return {
    motion,
    LazyMotion: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    domAnimation: {},
    m: { ...motion },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

vi.mock('lucide-react', () => ({
  ExternalLink: () => <div data-testid="external-link-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
  Github: () => <div data-testid="github-icon" />,
  Eye: () => <div data-testid="eye-icon" />,
  FileText: () => <div data-testid="file-text-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  MapPin: () => <div data-testid="map-pin-icon" />,
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

import AboutPage from '../pages/AboutPage'

describe('AboutPage', () => {
  it('renders main heading', () => {
    render(<AboutPage />)
    expect(screen.getByText('Aaron Barlow')).toBeInTheDocument()
  })

  it('renders profile image', () => {
    render(<AboutPage />)
    const profileImage = screen.getByAltText('Aaron Barlow')
    expect(profileImage).toBeInTheDocument()
  })

  it('displays personal information', () => {
    render(<AboutPage />)
    expect(screen.getByText('He/Him')).toBeInTheDocument()
    expect(
      screen.getByText('HPC Software Engineer @ Oak Ridge National Laboratory')
    ).toBeInTheDocument()
  })

  it('renders experience section', () => {
    render(<AboutPage />)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders skills section', () => {
    render(<AboutPage />)
    expect(screen.getByText('Skills & Technologies')).toBeInTheDocument()
  })

  it('renders education section', () => {
    render(<AboutPage />)
    expect(screen.getByText('Education')).toBeInTheDocument()
  })

  it('renders technical talks section', () => {
    render(<AboutPage />)
    expect(screen.getByText('Technical Talks')).toBeInTheDocument()
  })

  it('renders organizations section', () => {
    render(<AboutPage />)
    expect(screen.getByText('Organizations & Community')).toBeInTheDocument()
  })

  it('includes header and footer components', () => {
    render(<AboutPage />)
    expect(document.querySelector('header')).toBeInTheDocument()
    expect(document.querySelector('footer')).toBeInTheDocument()
  })
})
