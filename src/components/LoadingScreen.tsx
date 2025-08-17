import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: (theme: 'dark' | 'light') => void
}

// Simple, classy shutter that opens from the center using a hexagonal clip-path
const HEX_CLOSED =
  'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)'
const HEX_OPEN = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showThemeSelector, setShowThemeSelector] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light' | null>(
    null
  )

  const words = ['Innovator', 'Designer', 'Architect', 'Engineer']

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowContent(true)
      setShowName(true)
    }, 500)

    return () => clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    if (!showContent) return

    const delays = [800, 800, 800, 800]

    if (currentWordIndex < words.length - 1) {
      const timer = setTimeout(() => {
        setCurrentWordIndex(prev => prev + 1)
      }, delays[currentWordIndex])

      return () => clearTimeout(timer)
    } else {
      // Wait for the last word to fully animate in, then add extra delay
      // to ensure smooth transition before showing theme selector
      const themeTimer = setTimeout(() => {
        setShowThemeSelector(true)
      }, 1300) // Give users time to read the last word

      return () => clearTimeout(themeTimer)
    }
  }, [currentWordIndex, showContent, words.length])

  const handleThemeSelect = (theme: 'dark' | 'light') => {
    setSelectedTheme(theme)

    // Immediately apply the theme to the entire app
    if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }

    setIsExiting(true)
  }

  useEffect(() => {
    if (isExiting) {
      const completeTimer = setTimeout(() => {
        onComplete(selectedTheme || 'dark')
      }, 1250) // Match the shutter animation duration

      return () => clearTimeout(completeTimer)
    }
  }, [isExiting, onComplete, selectedTheme])

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Main Background that contracts to a circle around theme button */}
      <motion.div
        className="fixed inset-0 z-20 bg-black"
        initial={{
          clipPath: 'circle(100% at 50% 50%)',
        }}
        animate={{
          clipPath: isExiting
            ? 'circle(0% at 80% 20%)'
            : 'circle(100% at 50% 50%)',
        }}
        transition={{
          duration: 1.0,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.2,
        }}
      />

      {/* Content Container */}
      <div className="relative z-50">
        {/* Main Name Animation */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: showName ? (isExiting ? 0 : 1) : 0,
            y: showName ? (isExiting ? 0 : 0) : 30,
            color: isExiting ? '#000000' : '#ffffff',
            backgroundColor: isExiting ? '#000000' : 'rgba(0, 0, 0, 0)', // Use rgba instead of transparent
          }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-none">
            {'Aaron Barlow'.split('').map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.05,
                  ease: 'easeOut',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Rotating Words Section */}
        <motion.div
          className="h-16 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{
            opacity:
              showContent && !showThemeSelector ? (isExiting ? 0 : 1) : 0,
          }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentWordIndex}
              className="text-2xl sm:text-3xl md:text-4xl font-light text-white/80 tracking-wide"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.1 }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
              }}
            >
              {words[currentWordIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Theme Selector - Positioned in same area as words */}
        <AnimatePresence>
          {showThemeSelector && (
            <motion.div
              className="h-16 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{
                opacity: isExiting ? 0 : 1,
                y: isExiting ? -10 : 0,
                scale: isExiting ? 0.95 : 1,
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1,
              }}
            >
              <motion.p
                className="text-lg text-white/70 mb-2 font-light"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{ marginTop: '15%' }}
              >
                Choose your theme
              </motion.p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  className="px-6 py-2 rounded-xl border border-white/20 text-white/90 hover:text-white hover:border-white/40 transition-all duration-500 font-light backdrop-blur-sm"
                  whileHover={{
                    backgroundColor: 'rgb(36, 35, 36)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleThemeSelect('dark')}
                  transition={{
                    duration: 0.03,
                    ease: 'easeInOut',
                  }}
                >
                  Dark Mode
                </motion.button>
                <motion.button
                  className="px-6 py-2 rounded-xl border border-white/20 text-white/90 hover:text-white hover:border-white/40 transition-all duration-500 font-light backdrop-blur-sm"
                  whileHover={{
                    backgroundColor: 'rgb(209, 209, 209)',
                    color: 'rgb(0, 0, 0)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleThemeSelect('light')}
                  transition={{
                    duration: 0.03,
                    ease: 'easeInOut',
                  }}
                >
                  Light Mode
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Clean Hexagonal Shutter Overlay */}
      <motion.div
        className="fixed inset-0 z-30 bg-black pointer-events-none"
        style={{ willChange: 'clip-path' }}
        initial={{ clipPath: HEX_OPEN }}
        animate={{
          clipPath: isExiting ? HEX_CLOSED : HEX_OPEN,
        }}
        transition={{
          duration: 1.25,
          ease: [0.65, 0, 0.35, 1],
        }}
      />

      {/* Smooth Black Background Overlay for Content Area */}
      <motion.div
        className="fixed inset-0 z-20 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isExiting ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
          delay: 0.1,
        }}
      />
    </div>
  )
}

export default LoadingScreen
