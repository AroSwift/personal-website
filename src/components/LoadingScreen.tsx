import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

/**
 * LoadingScreen Component
 * Displays an animated loading sequence with rotating words and progress bar
 * Shows on first visit to the site
 */
const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  // Track which word is currently displayed in the rotation
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // Control when content becomes visible after initial delay
  const [showContent, setShowContent] = useState(false);
  // Show the first word prominently before name animation
  const [showFirstWord, setShowFirstWord] = useState(false);
  // Control when name animation starts
  const [showName, setShowName] = useState(false);
  // Trigger exit animation sequence
  const [isExiting, setIsExiting] = useState(false);

  // Words to cycle through during loading animation
  const words = ["Architect", "Orchestrator", "Inventor", "Engineer"];

  // Timing delays between word transitions (slower for more dramatic effect)
  const delays = [1000, 800, 650, 500]; // Slower transitions

  useEffect(() => {
    // Initial delay before showing first word
    const showTimer = setTimeout(() => {
      setShowFirstWord(true);
    }, 300);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showFirstWord) return;

    // Show first word for 1.5 seconds, then start name animation
    const nameTimer = setTimeout(() => {
      setShowName(true);
      setShowContent(true);
    }, 1500);

    return () => clearTimeout(nameTimer);
  }, [showFirstWord]);

  useEffect(() => {
    if (!showContent) return;

    // Cycle through words with decreasing delays (skip first word since it's already shown)
    if (currentWordIndex < words.length - 1) {
      const timer = setTimeout(() => {
        setCurrentWordIndex((prev) => prev + 1);
      }, delays[currentWordIndex]);

      return () => clearTimeout(timer);
    } else {
      // Start exit animation after showing the last word
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 1000); // Slightly longer delay for smoother transition

      return () => clearTimeout(exitTimer);
    }
  }, [currentWordIndex, showContent, words.length, delays]);

  useEffect(() => {
    if (isExiting) {
      // Complete loading sequence after exit animation finishes
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 1500); // Longer duration for smoother exit

      return () => clearTimeout(completeTimer);
    }
  }, [isExiting, onComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        initial={{ y: 0 }}
        animate={{ y: isExiting ? "-100%" : 0 }}
        exit={{ y: "-100%" }}
        transition={{
          duration: isExiting ? 1.5 : 0,
          ease: [0.25, 0.46, 0.45, 0.94], // Smoother cubic-bezier for exit
        }}
      >
        {/* First Word - Prominently Displayed */}
        <AnimatePresence mode="wait">
          {showFirstWord && !showName && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white/90 tracking-wide">
                {words[0]}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Name Animation */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showName ? 1 : 0, y: showName ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-none">
            {/* Animate each letter individually for staggered effect */}
            {"Aaron Barlow".split("").map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.05, // Staggered delay for each letter
                  ease: "easeOut",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Rotating Words Section - Skip first word since it's shown prominently */}
        <motion.div
          className="h-16 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <AnimatePresence mode="wait">
            {currentWordIndex > 0 && (
              <motion.p
                key={currentWordIndex}
                className="text-2xl sm:text-3xl md:text-4xl font-light text-white/80 tracking-wide"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.1 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                {words[currentWordIndex]}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress Bar Animation */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 0.6 : 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div className="w-32 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white/60 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 4.0, // Slightly longer for smoother feel
                ease: "easeInOut",
                delay: 1.6,
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
