// Tests for AboutPage component
// Verifies profile, experience, skills, education, presentations, and navigation

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from './utils'

// Mock external dependencies
vi.mock('framer-motion', () => {
  const MOTION_KEYS = new Set([
    'whileInView',
    'viewport',
    'initial',
    'animate',
    'transition',
  ])
  const stripMotion = ({ children, ...props }: any) => {
    const rest: Record<string, any> = {}
    for (const [k, v] of Object.entries(props)) {
      if (!MOTION_KEYS.has(k)) rest[k] = v
    }
    return { children, rest }
  }
  const elements = {
    div: (props: any) => {
      const { children, rest } = stripMotion(props)
      return <div {...rest}>{children}</div>
    },
    h1: (props: any) => {
      const { children, rest } = stripMotion(props)
      return <h1 {...rest}>{children}</h1>
    },
    h2: (props: any) => {
      const { children, rest } = stripMotion(props)
      return <h2 {...rest}>{children}</h2>
    },
    h3: (props: any) => {
      const { children, rest } = stripMotion(props)
      return <h3 {...rest}>{children}</h3>
    },
    p: (props: any) => {
      const { children, rest } = stripMotion(props)
      return <p {...rest}>{children}</p>
    },
    span: (props: any) => {
      const { children, rest } = stripMotion(props)
      return <span {...rest}>{children}</span>
    },
    img: (props: any) => {
      const { children, rest } = stripMotion(props)
      return <img {...rest}>{children}</img>
    },
    button: (props: any) => {
      const { children, rest } = stripMotion(props)
      return <button {...rest}>{children}</button>
    },
    a: (props: any) => {
      const { children, rest } = stripMotion(props)
      return <a {...rest}>{children}</a>
    },
    section: (props: any) => {
      const { children, rest } = stripMotion(props)
      return <section {...rest}>{children}</section>
    },
    main: (props: any) => {
      const { children, rest } = stripMotion(props)
      return <main {...rest}>{children}</main>
    },
  }
  return {
    motion: elements,
    m: elements,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

vi.mock('lucide-react', () => ({
  ExternalLink: () => <div data-testid="external-link-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
  Eye: () => <div data-testid="eye-icon" />,
  FileText: () => <div data-testid="file-text-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  MapPin: () => <div data-testid="map-pin-icon" />,
  BookOpen: () => <div data-testid="book-open-icon" />,
  Users: () => <div data-testid="users-icon" />,
}))

vi.mock('@/components/ui/brand-icons', () => ({
  GitHubLogoIcon: () => <div data-testid="github-icon" />,
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
    expect(
      screen.getByRole('heading', { level: 1, name: 'Aaron Barlow' })
    ).toBeInTheDocument()
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

  it('renders publications section with CUG 2026 paper', () => {
    render(<AboutPage />)
    expect(screen.getByText('Publications')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Centralizing Scheduler Policy at the OLCF: A Facility-Wide Approach to Consistent Multi-Workload Configuration'
      )
    ).toBeInTheDocument()
    const paperLink = screen.getByRole('link', { name: /Read Centralizing/i })
    expect(paperLink).toHaveAttribute(
      'href',
      'https://doi.org/10.1145/3837730.3837751'
    )
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
