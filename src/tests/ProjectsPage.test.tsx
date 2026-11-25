// Tests for ProjectsPage component
// Verifies rendering, data display, conditional links, and navigation

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
    expect(
      screen.getByText('Turio — Autonomous Hydroponics & AI Robotics')
    ).toBeInTheDocument()
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
