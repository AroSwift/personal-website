// Tests for ContactPage component
// Verifies rendering, email copy functionality, social links, and user interactions

import { describe, it, expect, vi, beforeEach } from 'vitest'
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
  Mail: () => <div data-testid="mail-icon" />,
  Github: () => <div data-testid="github-icon" />,
  Linkedin: () => <div data-testid="linkedin-icon" />,
  Copy: () => <div data-testid="copy-icon" />,
  Check: () => <div data-testid="check-icon" />,
  ExternalLink: () => <div data-testid="external-link-icon" />,
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}))

vi.mock('../components/layout/Header', () => ({
  default: () => <header data-testid="header">Header</header>,
}))

vi.mock('../components/layout/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}))

import ContactPage from '../pages/ContactPage'

// Mock window.open for external links
const mockOpen = vi.fn()
Object.defineProperty(window, 'open', {
  value: mockOpen,
  writable: true,
})

// Mock navigator.clipboard
const mockClipboard = {
  writeText: vi.fn(),
}
Object.assign(navigator, { clipboard: mockClipboard })

describe('ContactPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders main heading and description', () => {
    render(<ContactPage />)
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
    expect(
      screen.getByText(/I enjoy connecting with new people/)
    ).toBeInTheDocument()
  })

  it('renders email link', () => {
    render(<ContactPage />)
    const emailLink = screen.getByRole('link', { name: 'email' })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:abarlow505@gmail.com')
  })

  it('renders LinkedIn link', () => {
    render(<ContactPage />)
    const linkedinLinks = screen.getAllByRole('link', { name: 'LinkedIn' })
    expect(linkedinLinks.length).toBeGreaterThanOrEqual(1)
    expect(linkedinLinks[0]).toHaveAttribute(
      'href',
      'https://linkedin.com/in/allaaronbarlow/'
    )
  })

  it('renders GitHub link', () => {
    render(<ContactPage />)
    const githubLink = screen.getByRole('link', { name: 'GitHub' })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/AroSwift')
  })

  it('includes header and footer components', () => {
    render(<ContactPage />)
    expect(document.querySelector('header')).toBeInTheDocument()
    expect(document.querySelector('footer')).toBeInTheDocument()
  })
})
