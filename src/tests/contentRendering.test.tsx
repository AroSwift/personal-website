/**
 * Intensive content-rendering tests.
 * Verifies that data-driven content appears correctly: companies, schools,
 * presentations, PDF links, images, project titles, and key copy.
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from './utils'

// Shared mocks for pages that use framer-motion and UI components
vi.mock('framer-motion', () => {
  const motion = {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    img: ({ alt, ...props }: any) => <img alt={alt || ''} {...props} />,
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
  ExternalLink: () => <span data-testid="icon-external" />,
  Mail: () => <span data-testid="icon-mail" />,
  Github: () => <span data-testid="icon-github" />,
  Linkedin: () => <span data-testid="icon-linkedin" />,
  Copy: () => <span data-testid="icon-copy" />,
  Check: () => <span data-testid="icon-check" />,
  Eye: () => <span data-testid="icon-eye" />,
  FileText: () => <span data-testid="icon-file" />,
  Calendar: () => <span data-testid="icon-calendar" />,
  MapPin: () => <span data-testid="icon-mappin" />,
  Home: () => <span data-testid="icon-home" />,
  ArrowLeft: () => <span data-testid="icon-arrow" />,
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, asChild, ...props }: any) =>
    asChild ? <>{children}</> : <button {...props}>{children}</button>,
}))

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}))

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  CardHeader: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  CardTitle: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
}))

vi.mock('../components/layout/Header', () => ({
  default: () => <header data-testid="header">Header</header>,
}))

vi.mock('../components/layout/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}))

// ---------------------------------------------------------------------------
// AboutPage – data-driven content from aboutData
// ---------------------------------------------------------------------------
import AboutPage from '../pages/AboutPage'

describe('Content rendering: AboutPage', () => {
  it('renders all experience companies', () => {
    render(<AboutPage />)
    const ornl = screen.getAllByText('Oak Ridge National Laboratory')
    expect(ornl.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Bank of America')).toBeInTheDocument()
  })

  it('renders experience roles and locations', () => {
    render(<AboutPage />)
    expect(screen.getByText('HPC Software Engineer')).toBeInTheDocument()
    expect(
      screen.getByText('Global Technology Summer Analyst (ML Engineer Intern)')
    ).toBeInTheDocument()
  })

  it('renders experience banner images with correct src', () => {
    render(<AboutPage />)
    const imgs = screen.getAllByRole('img')
    const aboutImgs = imgs.filter(
      (el) =>
        el.getAttribute('src')?.startsWith('/about/') &&
        el.getAttribute('alt')?.includes('office')
    )
    expect(aboutImgs.length).toBeGreaterThanOrEqual(1)
    const ornl = imgs.find((i) => i.getAttribute('src') === '/about/ornl.webp')
    const bofa = imgs.find((i) => i.getAttribute('src') === '/about/bofa.webp')
    expect(ornl).toBeInTheDocument()
    expect(bofa).toBeInTheDocument()
  })

  it('renders all education schools and degrees', () => {
    render(<AboutPage />)
    expect(
      screen.getByText('East Tennessee State University')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Pellissippi State Community College')
    ).toBeInTheDocument()
    expect(screen.getByText('B.S. in Computer Science')).toBeInTheDocument()
    expect(
      screen.getByText(/Associate of Science, Computer and Information Sciences/)
    ).toBeInTheDocument()
  })

  it('renders education banner images with correct src', () => {
    render(<AboutPage />)
    const etsu = document.querySelector('img[src="/about/etsu.webp"]')
    const pscc = document.querySelector('img[src="/about/pscc.webp"]')
    expect(etsu).toBeInTheDocument()
    expect(pscc).toBeInTheDocument()
  })

  it('renders technical talks with titles and PDF links', () => {
    render(<AboutPage />)
    expect(
      screen.getByText(
        /Employing a Software-Driven Approach to Scalable HPC System Management/
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Employing DevOps in HPC Operational Management/)
    ).toBeInTheDocument()
    const pdfLinks = screen.getAllByRole('link', {
      name: /View Presentation/i,
    })
    expect(pdfLinks).toHaveLength(2)
    expect(pdfLinks[0]).toHaveAttribute(
      'href',
      '/presentations/cug-2025-hpc-system-management.pdf'
    )
    expect(pdfLinks[1]).toHaveAttribute(
      'href',
      '/presentations/nlit-2024-devops-hpc.pdf'
    )
  })

  it('renders skills and organizations', () => {
    render(<AboutPage />)
    expect(screen.getByText('Ruby')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('Kubernetes')).toBeInTheDocument()
    expect(
      screen.getByText(/ORNL Pathways to Computing Internship Program Workshop/)
    ).toBeInTheDocument()
  })

  it('renders About hero profile image with valid src', () => {
    render(<AboutPage />)
    const heroImg = screen.getByAltText('Aaron Barlow')
    expect(heroImg).toHaveAttribute('src', '/profile-aaron-800.webp')
  })
})

// ---------------------------------------------------------------------------
// ProjectsPage – work projects, personal projects, achievements
// ---------------------------------------------------------------------------
import ProjectsPage from '../pages/ProjectsPage'

describe('Content rendering: ProjectsPage', () => {
  it('renders work project titles', () => {
    render(<ProjectsPage />)
    expect(
      screen.getByText('American Science Cloud Hub & Portal')
    ).toBeInTheDocument()
    expect(screen.getByText('myOLCF')).toBeInTheDocument()
    expect(screen.getByText('RATS')).toBeInTheDocument()
  })

  it('renders personal project titles', () => {
    render(<ProjectsPage />)
    expect(screen.getByText('AI Podcast Production Pipeline')).toBeInTheDocument()
    expect(screen.getByText('Anthologia')).toBeInTheDocument()
    expect(screen.getByText('Project Cadenza')).toBeInTheDocument()
  })

  it('renders achievement titles', () => {
    render(<ProjectsPage />)
    expect(screen.getByText('Cost Savings')).toBeInTheDocument()
    expect(screen.getByText('Exascale Computing')).toBeInTheDocument()
  })

  it('renders Visit links with correct href for projects with links', () => {
    render(<ProjectsPage />)
    const myOLCF = screen.getByRole('link', {
      name: /Visit myOLCF \(opens in new tab\)/i,
    })
    expect(myOLCF).toHaveAttribute('href', 'https://my.olcf.ornl.gov')
  })
})

// ---------------------------------------------------------------------------
// ContactPage – copy, links, buttons
// ---------------------------------------------------------------------------
import ContactPage from '../pages/ContactPage'

describe('Content rendering: ContactPage', () => {
  it('renders main heading and intro copy', () => {
    render(<ContactPage />)
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
    expect(
      screen.getByText(/I enjoy connecting with new people/)
    ).toBeInTheDocument()
  })

  it('renders Resume and Reach out links with correct href', () => {
    render(<ContactPage />)
    const resume = screen.getByRole('link', { name: /My Resume/i })
    expect(resume).toHaveAttribute(
      'href',
      'https://aroswift.github.io/resume/resume.pdf'
    )
    const reachOut = screen.getByRole('link', { name: /Reach out/i })
    expect(reachOut).toHaveAttribute(
      'href',
      'https://linkedin.com/in/allaaronbarlow/'
    )
  })

  it('renders Copy email button', () => {
    render(<ContactPage />)
    expect(
      screen.getByRole('button', { name: /Copy email/i })
    ).toBeInTheDocument()
  })

  it('renders social platform links', () => {
    render(<ContactPage />)
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/AroSwift'
    )
  })
})

// ---------------------------------------------------------------------------
// HomePage – hero, images, CTAs
// ---------------------------------------------------------------------------
import HomePage from '../pages/HomePage'

describe('Content rendering: HomePage', () => {
  it('renders hero heading and status', () => {
    render(<HomePage />)
    expect(
      screen.getByText(/I build code that thinks and infrastructure that lasts/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Developing agentic workflows/)
    ).toBeInTheDocument()
  })

  it('renders profile image with expected alt and src', () => {
    render(<HomePage />)
    const img = screen.getByAltText('Profile photo of Aaron Barlow')
    expect(img).toHaveAttribute('src', '/profile-guy-800.webp')
  })

  it('renders CTA links to Projects and About', () => {
    render(<HomePage />)
    expect(screen.getByRole('link', { name: /Selected Projects/i })).toHaveAttribute(
      'href',
      '/projects'
    )
    expect(screen.getByRole('link', { name: /About me/i })).toHaveAttribute(
      'href',
      '/about'
    )
  })
})

// ---------------------------------------------------------------------------
// NotFoundPage – 404 copy and navigation
// ---------------------------------------------------------------------------
import NotFoundPage from '../pages/NotFoundPage'

describe('Content rendering: NotFoundPage', () => {
  it('renders 404 and message', () => {
    render(<NotFoundPage />)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText(/Oops! Page Not Found/i)).toBeInTheDocument()
  })

  it('renders Back to Home and About Me links', () => {
    render(<NotFoundPage />)
    expect(screen.getByRole('link', { name: /Back to Home/i })).toHaveAttribute(
      'href',
      '/'
    )
    expect(screen.getByRole('link', { name: /About Me/i })).toHaveAttribute(
      'href',
      '/about'
    )
  })

  it('renders Projects and Contact links', () => {
    render(<NotFoundPage />)
    expect(screen.getByRole('link', { name: /^Projects$/i })).toHaveAttribute(
      'href',
      '/projects'
    )
    expect(screen.getByRole('link', { name: /^Contact$/i })).toHaveAttribute(
      'href',
      '/contact'
    )
  })
})
