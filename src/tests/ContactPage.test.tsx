// Tests for ContactPage component
// Verifies rendering, email copy functionality, social links, and user interactions

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from './utils'

// Mock external dependencies
const MOTION_PROP_KEYS = new Set([
  'whileHover',
  'whileTap',
  'whileDrag',
  'whileFocus',
  'whileInView',
  'initial',
  'animate',
  'exit',
  'transition',
  'variants',
  'layout',
  'layoutId',
])

const filterMotionProps = (props: Record<string, any>) => {
  const result: Record<string, any> = {}
  for (const [key, value] of Object.entries(props)) {
    if (!MOTION_PROP_KEYS.has(key)) {
      result[key] = value
    }
  }
  return result
}

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => (
      <div {...filterMotionProps(props)}>{children}</div>
    ),
    h1: ({ children, ...props }: any) => (
      <h1 {...filterMotionProps(props)}>{children}</h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 {...filterMotionProps(props)}>{children}</h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 {...filterMotionProps(props)}>{children}</h3>
    ),
    p: ({ children, ...props }: any) => (
      <p {...filterMotionProps(props)}>{children}</p>
    ),
    span: ({ children, ...props }: any) => (
      <span {...filterMotionProps(props)}>{children}</span>
    ),
    button: ({ children, ...props }: any) => (
      <button {...filterMotionProps(props)}>{children}</button>
    ),
    a: ({ children, ...props }: any) => (
      <a {...filterMotionProps(props)}>{children}</a>
    ),
    section: ({ children, ...props }: any) => (
      <section {...filterMotionProps(props)}>{children}</section>
    ),
    main: ({ children, ...props }: any) => (
      <main {...filterMotionProps(props)}>{children}</main>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('lucide-react', () => ({
  Mail: () => <div data-testid="mail-icon" />,
  Copy: () => <div data-testid="copy-icon" />,
  Check: () => <div data-testid="check-icon" />,
  ExternalLink: () => <div data-testid="external-link-icon" />,
}))

vi.mock('@radix-ui/react-icons', () => ({
  GitHubLogoIcon: () => <div data-testid="github-icon" />,
  LinkedInLogoIcon: () => <div data-testid="linkedin-icon" />,
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

  it('renders email button', () => {
    render(<ContactPage />)
    const emailButton = screen.getByRole('button', { name: 'email' })
    expect(emailButton).toBeInTheDocument()
  })

  it('renders LinkedIn link', () => {
    render(<ContactPage />)
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' })
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://linkedin.com/in/allaaronbarlow/'
    )
  })

  it('renders GitHub link', () => {
    render(<ContactPage />)
    const githubLink = screen.getByRole('link', { name: 'GitHub' })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/AroSwift')
  })

  it('opens button links without exposing window.opener', () => {
    render(<ContactPage />)

    fireEvent.click(screen.getByRole('button', { name: 'email' }))
    expect(mockOpen).toHaveBeenCalledWith(
      'mailto:abarlow505@gmail.com',
      '_blank',
      'noopener,noreferrer'
    )

    fireEvent.click(screen.getByRole('button', { name: 'My Resume' }))
    expect(mockOpen).toHaveBeenCalledWith(
      'https://aroswift.github.io/resume/resume.pdf',
      '_blank',
      'noopener,noreferrer'
    )

    fireEvent.click(screen.getByRole('button', { name: 'Reach out' }))
    expect(mockOpen).toHaveBeenCalledWith(
      'https://linkedin.com/in/allaaronbarlow/',
      '_blank',
      'noopener,noreferrer'
    )
  })

  it('includes header and footer components', () => {
    render(<ContactPage />)
    expect(document.querySelector('header')).toBeInTheDocument()
    expect(document.querySelector('footer')).toBeInTheDocument()
  })
})
