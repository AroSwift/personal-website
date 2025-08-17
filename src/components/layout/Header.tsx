import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import LinkRoll from '@/components/LinkRoll'

interface HeaderProps {
  className?: string
}

const Header = ({ className = '' }: HeaderProps) => {
  const location = useLocation()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [hasTriggeredPostLoadAnimation, setHasTriggeredPostLoadAnimation] =
    useState(false)

  const themeIconAnimation = useAnimation()

  useEffect(() => {
    // Check localStorage first, then fallback to current DOM state
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } else {
      // Fallback to current DOM state
      const isDark = document.documentElement.classList.contains('dark')
      setTheme(isDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial mobile state
    handleResize()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Check for post-loading animation trigger
  useEffect(() => {
    const checkForPostLoadAnimation = () => {
      const shouldTrigger = localStorage.getItem('triggerPostLoadAnimation')
      if (shouldTrigger === 'true' && !hasTriggeredPostLoadAnimation) {
        setHasTriggeredPostLoadAnimation(true)

        // Clear the flag
        localStorage.removeItem('triggerPostLoadAnimation')

        // Run the sophisticated spinning animation
        const runAnimation = async () => {
          // Phase 1: Fast spin (3 rotations in 600ms)
          await themeIconAnimation.start({
            rotate: 1080, // 3 * 360 degrees
            scale: [1, 1.15, 1],
            transition: {
              rotate: { duration: 0.6, ease: 'linear' },
              scale: { duration: 0.3, ease: 'easeOut' },
            },
          })

          // Phase 2: Deceleration (1 rotation in 800ms with easing)
          await themeIconAnimation.start({
            rotate: 1440, // 4 * 360 degrees
            scale: 1,
            transition: {
              rotate: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }, // Smooth deceleration
              scale: { duration: 0.2, ease: 'easeOut' },
            },
          })

          // Phase 3: Settling (smooth stop in 400ms)
          await themeIconAnimation.start({
            rotate: 1440, // Keep final rotation
            scale: 1,
            transition: {
              rotate: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }, // Bounce-like settling
              scale: { duration: 0.2, ease: 'easeOut' },
            },
          })
        }

        // Small delay to ensure smooth transition from loading screen
        setTimeout(() => {
          runAnimation()
        }, 300)
      }
    }

    // Check immediately
    checkForPostLoadAnimation()

    // Also check periodically for the first few seconds
    const interval = setInterval(checkForPostLoadAnimation, 100)
    setTimeout(() => clearInterval(interval), 3000)

    return () => clearInterval(interval)
  }, [hasTriggeredPostLoadAnimation, themeIconAnimation])

  // Handle normal theme toggle animation
  useEffect(() => {
    if (!hasTriggeredPostLoadAnimation) {
      // Only apply normal theme toggle animation if post-loading animation hasn't triggered
      themeIconAnimation.set({
        rotate: theme === 'light' ? 0 : 180,
        scale: 1,
      })
    }
  }, [theme, hasTriggeredPostLoadAnimation, themeIconAnimation])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'

    // Update DOM immediately to prevent flickering
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Update React state
    setTheme(newTheme)

    // Save to localStorage
    localStorage.setItem('theme', newTheme)
  }

  // Navigation links
  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const getPageSuffix = () => {
    switch (location.pathname) {
      case '/about':
        return 'About'
      case '/projects':
        return 'Projects'
      case '/contact':
        return 'Contact'
      default:
        return null
    }
  }

  const pageSuffix = getPageSuffix()

  // Always show background with full opacity on mobile only
  const backgroundOpacity = 0.9
  const shouldShowBackground = isMobile

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50', className)}>
      {/* Background overlay with cool hue */}
      {shouldShowBackground && (
        <div
          className="absolute inset-0 backdrop-blur-xl transition-all duration-500 ease-out"
          style={{
            backgroundColor:
              theme === 'dark'
                ? `rgba(5, 5, 5, ${backgroundOpacity})` // Much darker black for dark mode
                : `rgba(248, 250, 252, ${backgroundOpacity})`, // Cool off-white for light mode
          }}
        />
      )}
      {/* Subtle animated background for dark mode */}
      {theme === 'dark' && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="animated-hue-overlay-slow"
            style={{ opacity: 0.03 }}
          />
        </div>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {/* Logo/Name with letter wave animation */}
          <Link to="/" className="cursor-pointer">
            <h1
              className="font-px-grotesk font-medium tracking-tight hover:text-muted-foreground transition-colors text-xl sm:text-2xl md:text-3xl"
            >
              <span className='header-name-text inline-block align-top'>
                {'Aaron Barlow'.split('').map((letter, index) => (
                  <span
                    key={index}
                    className='header-name-char inline-block relative overflow-hidden align-top'
                    style={{ ['--idx' as any]: index }}
                  >
                    <span className='header-name-glyph header-name-glyph-original block'>
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                    <span className='header-name-glyph header-name-glyph-new block absolute left-0'>
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  </span>
                ))}
              </span>
            </h1>
          </Link>
          {/* Page suffix indicator */}
          <AnimatePresence mode="wait">
            {pageSuffix && (
              <motion.div
                key={pageSuffix}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <span className="text-muted-foreground">—</span>
                <span className="text-muted-foreground text-sm sm:text-base">
                  {pageSuffix}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12 ml-auto">
          {navLinks.map(link => (
            <LinkRoll
              key={link.name}
              to={link.path}
              className={cn(
                'relative py-1 text-base lg:text-lg xl:text-xl font-px-grotesk font-medium',
                isActive(link.path)
                  ? 'text-foreground has-underline'
                  : 'text-foreground hover:text-muted-foreground'
              )}
            >
              {link.name}
            </LinkRoll>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 ml-16 lg:ml-24 xl:ml-32">
          {/* Dark / light switch icon with enhanced animation */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="rounded-full transition-all duration-500 ease-in-out w-12 h-12 hover:scale-110 active:scale-95"
          >
            <motion.div
              animate={themeIconAnimation}
              initial={{ rotate: 0, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </motion.div>
          </Button>

          {/* Mobile menu toggle button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label={
              mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'
            }
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-border/20 backdrop-blur-xl"
            style={{
              backgroundColor: theme === 'dark'
                ? 'rgba(5, 5, 5, 0.9) !important'
                : 'rgba(248, 250, 252, 0.9) !important'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map(link => (
                  <LinkRoll
                    key={link.name}
                    to={link.path}
                    className={cn(
                      'block py-3 text-lg border-b border-border/10 last:border-b-0',
                      isActive(link.path)
                        ? 'text-foreground font-medium has-underline'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </LinkRoll>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
