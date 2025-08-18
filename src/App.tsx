import React, { useState, useEffect, lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import { PWAStatus } from './components/PWAStatus'
import HueOverlay from './components/HueOverlay'

// Lazy load page components for route-based code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Loading component for lazy-loaded routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-transparent border-t-gray-800 border-r-gray-800 dark:border-t-white dark:border-r-white mx-auto"></div>
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">Loading...</p>
    </div>
  </div>
)

// Meta tag configurations for SEO
const metaTagsConfig = {
  '/': {
    title: 'Aaron Barlow - HPC Software Engineer & AI Developer',
    description:
      'Aaron Barlow is an HPC Software Engineer at Oak Ridge National Laboratory, building agentic AI workflows and enabling exascale computing. View projects and experience.',
    keywords:
      'Aaron Barlow, HPC Software Engineer, AI Developer, Oak Ridge National Laboratory, agentic workflows, exascale computing',
    ogTitle: 'Aaron Barlow - HPC Software Engineer & AI Developer',
    ogDescription:
      'Aaron Barlow is an HPC Software Engineer at Oak Ridge National Laboratory, building agentic AI workflows and enabling exascale computing.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Aaron Barlow - HPC Software Engineer & AI Developer',
    twitterDescription:
      'Aaron Barlow is an HPC Software Engineer at Oak Ridge National Laboratory, building agentic AI workflows and enabling exascale computing.',
  },
  '/404': {
    title: 'Page Not Found - Aaron Barlow',
    description:
      "The page you are looking for could not be found. Navigate back to Aaron Barlow's portfolio or explore other sections.",
    keywords: '404, page not found, Aaron Barlow, portfolio',
    ogTitle: 'Page Not Found - Aaron Barlow',
    ogDescription:
      "The page you are looking for could not be found. Navigate back to Aaron Barlow's portfolio or explore other sections.",
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'Page Not Found - Aaron Barlow',
    twitterDescription:
      "The page you are looking for could not be found. Navigate back to Aaron Barlow's portfolio or explore other sections.",
  },
  '/about': {
    title: 'About Aaron Barlow - HPC Software Engineer',
    description:
      "Learn about Aaron Barlow's experience as an HPC Software Engineer at Oak Ridge National Laboratory, skills, education, and professional background.",
    keywords:
      'Aaron Barlow, about, HPC Software Engineer, Oak Ridge National Laboratory, experience, skills, education',
    ogTitle: 'About Aaron Barlow - HPC Software Engineer',
    ogDescription:
      "Learn about Aaron Barlow's experience as an HPC Software Engineer at Oak Ridge National Laboratory, skills, education, and professional background.",
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'About Aaron Barlow - HPC Software Engineer',
    twitterDescription:
      "Learn about Aaron Barlow's experience as an HPC Software Engineer at Oak Ridge National Laboratory, skills, education, and professional background.",
  },
  '/projects': {
    title: 'Projects by Aaron Barlow - AI Automation & HPC Solutions',
    description:
      "Explore Aaron Barlow's projects including AI automation workflows, HPC platform engineering, and performance optimization at scale.",
    keywords:
      'Aaron Barlow, projects, AI automation, HPC, agentic workflows, performance optimization',
    ogTitle: 'Projects by Aaron Barlow - AI Automation & HPC Solutions',
    ogDescription:
      "Explore Aaron Barlow's projects including AI automation workflows, HPC platform engineering, and performance optimization at scale.",
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Projects by Aaron Barlow - AI Automation & HPC Solutions',
    twitterDescription:
      "Explore Aaron Barlow's projects including AI automation workflows, HPC platform engineering, and performance optimization at scale.",
  },
  '/contact': {
    title: 'Contact Aaron Barlow - Get in Touch',
    description:
      'Get in touch with Aaron Barlow. Contact information, social media links, and ways to connect for collaboration opportunities.',
    keywords: 'Aaron Barlow, contact, email, LinkedIn, GitHub, collaboration',
    ogTitle: 'Contact Aaron Barlow - Get in Touch',
    ogDescription:
      'Get in touch with Aaron Barlow. Contact information, social media links, and ways to connect for collaboration opportunities.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Contact Aaron Barlow - Get in Touch',
    twitterDescription:
      'Get in touch with Aaron Barlow. Contact information, social media links, and ways to connect for collaboration opportunities.',
  },
}

// Function to update meta tags
const updateMetaTags = (pathname: string) => {
  const config = metaTagsConfig[pathname as keyof typeof metaTagsConfig]
  if (!config) return

  // Update document title
  document.title = config.title

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = name
      document.head.appendChild(meta)
    }
    meta.content = content
  }

  const updatePropertyMetaTag = (property: string, content: string) => {
    let meta = document.querySelector(
      `meta[property="${property}"]`
    ) as HTMLMetaElement
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('property', property)
      document.head.appendChild(meta)
    }
    meta.content = content
  }

  // Update meta tags
  updateMetaTag('description', config.description)
  updateMetaTag('keywords', config.keywords)
  updatePropertyMetaTag('og:title', config.ogTitle)
  updatePropertyMetaTag('og:description', config.ogDescription)
  updatePropertyMetaTag('og:type', config.ogType)
  updateMetaTag('twitter:card', config.twitterCard)
  updateMetaTag('twitter:title', config.twitterTitle)
  updateMetaTag('twitter:description', config.twitterDescription)
}

// Component to handle meta tag updates
const MetaTagManager = () => {
  const location = useLocation()

  useEffect(() => {
    updateMetaTags(location.pathname)
  }, [location.pathname])

  // Initialize meta tags on first load
  useEffect(() => {
    updateMetaTags(location.pathname)
  }, [location.pathname])

  return null
}

// Component to handle scroll to top (must be inside Router context)
const ScrollToTopInner = () => {
  const location = useLocation()

  useEffect(() => {
    // Simple scroll to top with smooth behavior
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [location.pathname])

  return null
}

// Main app content component that handles loading state
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
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
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <PWAStatus />
    </div>
  )
}

function App() {
  return (
    <Router>
      <MetaTagManager />
      <ScrollToTopInner />
      <AppContent />
    </Router>
  )
}

export default App
