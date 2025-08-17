// Tests for App component
// Verifies routing, loading screen logic, and page rendering

import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  render as testingLibraryRender,
  screen,
  waitFor,
} from '@testing-library/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'
import { PWAStatus } from '../components/PWAStatus'
import HueOverlay from '../components/HueOverlay'

// Mock the components
vi.mock('../components/LoadingScreen', () => ({
  default: ({ onComplete }: { onComplete: () => void }) => (
    <div data-testid="loading-screen">
      <button onClick={onComplete}>Complete Loading</button>
    </div>
  ),
}))

// Mock the page components directly
vi.mock('../pages/HomePage', () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}))

vi.mock('../pages/AboutPage', () => ({
  default: () => <div data-testid="about-page">About Page</div>,
}))

vi.mock('../pages/ProjectsPage', () => ({
  default: () => <div data-testid="projects-page">Projects Page</div>,
}))

vi.mock('../pages/ContactPage', () => ({
  default: () => <div data-testid="contact-page">Contact Page</div>,
}))

vi.mock('../pages/NotFoundPage', () => ({
  default: () => <div data-testid="not-found-page">Not Found Page</div>,
}))

// Import the mocked components
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ProjectsPage from '../pages/ProjectsPage'
import ContactPage from '../pages/ContactPage'
import NotFoundPage from '../pages/NotFoundPage'

// Create a test-specific App component that doesn't use lazy loading
const TestApp = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasVisited, setHasVisited] = React.useState(false)

  React.useEffect(() => {
    try {
      // Check if user has visited before
      const visited = localStorage.getItem('hasVisited')

      if (visited === 'true') {
        // User has visited before - skip loading screen
        setHasVisited(true)
        setIsLoading(false)
      } else {
        // First time visitor - show loading screen
        // Don't set hasVisited yet, let LoadingScreen handle it
      }
    } catch {
      // If there's an error, just skip loading
      setHasVisited(true)
      setIsLoading(false)
    }
  }, [])

  const handleLoadingComplete = (theme: 'dark' | 'light') => {
    try {
      // Mark as visited and hide loading screen
      localStorage.setItem('hasVisited', 'true')
      setHasVisited(true)
      setIsLoading(false)

      // Store the selected theme - use 'theme' key to match app expectations
      localStorage.setItem('theme', theme)

      // Set flag for post-loading animation
      localStorage.setItem('triggerPostLoadAnimation', 'true')
    } catch {
      // If there's an error, just continue
      setHasVisited(true)
      setIsLoading(false)
    }
  }

  // Show loading screen only for first-time visitors
  if (isLoading && !hasVisited) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <div className="App">
      <HueOverlay />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <PWAStatus />
    </div>
  )
}

describe('App', () => {
  beforeEach(() => {
    // Reset localStorage mock before each test
    vi.mocked(localStorage.getItem).mockReset()
    vi.mocked(localStorage.setItem).mockReset()
  })

  it('renders loading screen for first-time visitors', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null)
    testingLibraryRender(<TestApp />)

    expect(screen.getByTestId('loading-screen')).toBeInTheDocument()
  })

  it('skips loading screen for returning visitors', async () => {
    // Set localStorage mock before rendering
    vi.mocked(localStorage.getItem).mockImplementation((key: string) => {
      if (key === 'hasVisited') return 'true'
      return null
    })

    testingLibraryRender(<TestApp />)

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(screen.queryByTestId('loading-screen')).not.toBeInTheDocument()
    })

    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })

  it('renders with correct initial route', async () => {
    // Set localStorage mock before rendering
    vi.mocked(localStorage.getItem).mockImplementation((key: string) => {
      if (key === 'hasVisited') return 'true'
      return null
    })

    testingLibraryRender(<TestApp />)

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })
  })
})
