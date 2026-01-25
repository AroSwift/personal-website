import React, { useState, useEffect } from 'react'
import { m, AnimatePresence, useAnimationControls } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: (theme: 'dark' | 'light') => void
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [showThemeSelector, setShowThemeSelector] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light' | null>(
    null
  )

  const line = useAnimationControls()
  const topText = useAnimationControls()
  const botText = useAnimationControls()

  useEffect(() => {
    const ease: [number, number, number, number] = [0.4, 0, 0.2, 1]

    const run = async () => {
      // Show theme selector after half a second
      setTimeout(() => {
        setShowThemeSelector(true)
      }, 500)

      // Phase 1: Line grows and text starts emerging simultaneously
      await Promise.all([
        line.start({
          scaleX: [0, 1],
          transition: { duration: 0.9, ease },
        }),
        // Text starts appearing while line grows
        topText.start({
          y: [0, -20],
          opacity: [0, 1],
          transition: { duration: 0.37, ease, delay: 0.7 },
        }),
        botText.start({
          y: [0, 10],
          opacity: [0, 1],
          transition: { duration: 0.37, ease, delay: 0.7 },
        }),
      ])

      // Phase 3: Line shrinks
      await line.start({
        scaleX: 0.17,
        transition: { duration: 0.45, ease },
      })
    }

    run()
  }, [line, topText, botText])

  const handleThemeSelect = (theme: 'dark' | 'light') => {
    setSelectedTheme(theme)

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
      }, 0) // Set to 0ms for immediate transition

      return () => clearTimeout(completeTimer)
    }
  }, [isExiting, onComplete, selectedTheme])

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-4 sm:py-0">
      {/* Simple container for line and text */}
      <div className="relative z-50 mx-auto w-full max-w-[1100px] flex flex-col items-center justify-center sm:h-[60vh] sm:min-h-[480px]">
        {/* PORTFOLIO OF - emerges above the line */}
        <m.div
          className="text-center -mb-1 sm:-mb-2"
          initial={{ y: 0, opacity: 0 }}
          animate={topText}
        >
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-[0.1em]">
            Portfolio of
          </p>
        </m.div>

        {/* THE LINE - grows from center dot, positioned between texts */}
        <m.div
          className="h-px w-full max-w-[763px] bg-white/80 my-2 sm:my-0"
          style={{ transformOrigin: '50% 50%' }}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={line}
        />

        {/* AARON BARLOW - emerges below the line */}
        <m.div
          className="text-center -mt-2 sm:-mt-4"
          initial={{ y: 0, opacity: 0 }}
          animate={botText}
        >
          <h1 className="font-light tracking-tight text-white text-[min(16vw,120px)] sm:text-[min(14vw,140px)] md:text-[min(12vw,140px)] leading-none px-2">
            Aaron Barlow
          </h1>
        </m.div>

        {/* Reserved space for buttons to prevent layout shifts */}
        <div className="h-28 sm:h-36 flex items-center justify-center w-full px-4 mt-2 sm:mt-0">
          <AnimatePresence>
            {showThemeSelector && (
              <m.div
                className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 w-full max-w-sm"
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1],
                  opacity: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
                  y: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                  scale: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
                }}
              >
                <p className="text-xs sm:text-sm text-white/60">
                  Choose your theme
                </p>
                <div className="flex gap-2.5 sm:gap-3 md:gap-4 w-full justify-center">
                  <m.button
                    className="flex-1 sm:flex-initial min-h-[44px] px-3.5 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-all duration-200 text-xs sm:text-sm md:text-base"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.15)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleThemeSelect('dark')}
                  >
                    Dark Mode
                  </m.button>
                  <m.button
                    className="flex-1 sm:flex-initial min-h-[44px] px-3.5 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl border border-black/10 bg-white/85 text-black shadow-sm hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 transition-all duration-200 text-xs sm:text-sm md:text-base"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleThemeSelect('light')}
                  >
                    Light Mode
                  </m.button>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
