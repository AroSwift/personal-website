import React from 'react'
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion'

interface MotionComponentsProps {
  showThemeSelector: boolean
  isExiting: boolean
  onThemeSelect: (theme: 'dark' | 'light') => void
}

const MotionComponents = ({
  showThemeSelector,
  isExiting,
  onThemeSelect,
}: MotionComponentsProps) => {
  const line = useAnimationControls()
  const topText = useAnimationControls()
  const botText = useAnimationControls()

  React.useEffect(() => {
    const ease: [number, number, number, number] = [0.4, 0, 0.2, 1]

    const run = async () => {
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

  return (
    <>
      {/* Simple container for line and text */}
      <div className="relative z-50 mx-auto w-[min(92vw,1100px)] h-[60vh] min-h-[480px] flex flex-col items-center justify-center">
        {/* PORTFOLIO OF - emerges above the line */}
        <motion.div
          className="text-center -mb-2"
          initial={{ y: 0, opacity: 0 }}
          animate={topText}
        >
          <p className="text-3xl md:text-4xl text-white tracking-[0.1em]">
            Portfolio of
          </p>
        </motion.div>

        {/* THE LINE - grows from center dot, positioned between texts */}
        <motion.div
          className="h-px w-full max-w-[763px] bg-white/80"
          style={{ transformOrigin: '50% 50%' }}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={line}
        />

        {/* AARON BARLOW - emerges below the line */}
        <motion.div
          className="text-center -mt-4"
          initial={{ y: 0, opacity: 0 }}
          animate={botText}
        >
          <h1 className="font-light tracking-tight text-white text-[min(12vw,140px)] leading-none">
            Aaron Barlow
          </h1>
        </motion.div>

        {/* Reserved space for buttons to prevent layout shifts */}
        <div className="h-36 flex items-center justify-center">
          <AnimatePresence>
            {showThemeSelector && (
              <motion.div
                className="flex flex-col items-center gap-4"
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
                <p className="text-sm text-white/60">Choose your theme</p>
                <div className="flex gap-4">
                  <motion.button
                    className="px-5 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-all duration-200"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.15)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onThemeSelect('dark')}
                  >
                    Dark Mode
                  </motion.button>
                  <motion.button
                    className="px-5 py-3 rounded-xl border border-black/10 bg-white/85 text-black shadow-sm hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 transition-all duration-200"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onThemeSelect('light')}
                  >
                    Light Mode
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hexagonal Shutter Overlay - below stage */}
      <motion.div
        className="fixed inset-0 z-0 bg-black pointer-events-none"
        style={{ willChange: 'clip-path' }}
        initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        animate={{
          clipPath: isExiting
            ? 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)'
            : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
        transition={{
          duration: 1.25,
          ease: [0.65, 0, 0.35, 1],
        }}
      />
    </>
  )
}

export default MotionComponents
