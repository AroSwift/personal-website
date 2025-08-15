import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";

// Home page with interactive profile image
function Home() {
  // Interactive profile image state management
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [gravityOffset, setGravityOffset] = useState({ x: 0, y: 0 });
  const profileImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize theme from localStorage on component mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    }
    // If no saved theme, keep current state (don't force light mode)
  }, []);

  /**
   * Handle mouse down on profile image to start dragging
   * Calculates initial drag position relative to image bounds
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = profileImageRef.current?.getBoundingClientRect();
    // Calculate initial drag position relative to image
    if (rect) {
      setDragPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  /**
   * Handle mouse movement during drag
   * Updates drag position for visual feedback
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && profileImageRef.current) {
      const rect = profileImageRef.current.getBoundingClientRect();
      // Update drag position for visual feedback
      setDragPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  /**
   * Handle mouse up to end dragging
   */
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    // Add global mouse event listeners when dragging
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove as any);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove as any);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  // Gravity effect - profile image follows mouse cursor when close
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!profileImageRef.current || isDragging) return;

      const rect = profileImageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from mouse to image center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Apply gravity effect - image moves towards mouse if within range
      const range = window.innerWidth < 768 ? 100 : 300; // Smaller range on mobile
      if (distance < range) {
        const strength = (range - distance) / range; // Stronger when closer
        setGravityOffset({ 
          x: deltaX * strength * 0.3, 
          y: deltaY * strength * 0.3 
        });
      } else {
        setGravityOffset({ x: 0, y: 0 });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isDragging]);

  return (
    <div className="min-h-screen text-foreground bg-background relative overflow-hidden">
      {/* Animated hue overlay */}
      <div className="animated-hue-overlay" />
      {/* Subtle warm gradient with cool accent - matching other pages */}
      <div className="absolute inset-0 bg-gradient-to-tl from-orange-100/40 via-amber-50/20 to-transparent pointer-events-none dark:from-orange-900/10 dark:via-amber-900/5 dark:to-transparent transition-all duration-800 ease-in-out" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/25 pointer-events-none dark:to-blue-900/10 transition-all duration-800 ease-in-out" />
      <div className="absolute top-1/2 left-0 w-1/2 h-3/4 bg-gradient-to-r from-cyan-100/15 via-blue-100/10 to-transparent pointer-events-none transform -translate-y-1/4 dark:from-cyan-900/10 dark:via-blue-900/5 blur-sm transition-all duration-800 ease-in-out" />

      <Header />

      {/* Main Content */}
      <main className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 xl:pt-40 min-h-screen flex flex-col relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col flex-1 justify-center lg:justify-end pb-8 sm:pb-16 lg:pb-24 xl:pb-32 relative z-10">
          <div className="flex flex-col h-full justify-center lg:justify-end">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-9">
                {/* Interactive Profile Image */}
                <motion.div
                  ref={profileImageRef}
                  className={cn(
                    "w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 xl:w-112 xl:h-112 rounded-2xl sm:rounded-3xl overflow-hidden mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16 bg-muted dark:bg-gray-800 shadow-lg hover:shadow-2xl cursor-pointer relative select-none mx-auto lg:mx-0",
                    isHovering &&
                      "border-4 border-dashed border-foreground/60 shadow-2xl",
                    !isHovering &&
                      "border-2 border-border/50 dark:border-border/30 shadow-lg",
                  )}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isHovering ? 1.05 : 1,
                    rotate: isDragging ? [0, -0.5, 0.5, -0.3, 0.3, 0] : 0,
                    x: gravityOffset.x,
                    y: gravityOffset.y,
                  }}
                  transition={{
                    duration: isDragging ? 0.3 : 0.6,
                    repeat: isDragging ? Infinity : 0,
                    repeatType: "reverse",
                    x: { type: "spring", stiffness: 150, damping: 15 },
                    y: { type: "spring", stiffness: 150, damping: 15 },
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => {
                    setIsHovering(false);
                    setIsDragging(false);
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  style={{
                    transition: isDragging ? "none" : "transform 0.3s ease-out",
                    userSelect: "none",
                  }}
                >
                  {/* Cartoon image - shown by default */}
                  <motion.img
                    src="/profile-guy.png"
                    alt="Profile"
                    className="w-full h-full object-cover relative z-10"
                    animate={{
                      opacity: isHovering ? 0 : 1,
                      clipPath: isDragging
                        ? `circle(${Math.sqrt(dragPosition.x ** 2 + dragPosition.y ** 2)}px at ${dragPosition.x}px ${dragPosition.y}px)`
                        : "circle(100% at 50% 50%)",
                    }}
                    transition={{ duration: isDragging ? 0.1 : 0 }}
                    style={{ userSelect: "none" }}
                  />

                  {/* Real image underneath - revealed on hover */}
                  <motion.img
                    src="/profile-aaron.jpg"
                    alt="Aaron Barlow"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    animate={{
                      opacity: isHovering ? 1 : 0,
                    }}
                    transition={{ duration: 0 }}
                    style={{ userSelect: "none" }}
                  />

                  {/* Hover hint text */}
                  {isHovering && !isDragging && (
                    <motion.div
                      className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap pointer-events-none"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      It's really me! 👋
                    </motion.div>
                  )}

                  {/* Dragging hint text */}
                  {isDragging && (
                    <motion.div
                      className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap pointer-events-none"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: [1, 1.1, 1],
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 0.3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      Surprise! It's really me!
                    </motion.div>
                  )}
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight tracking-tight max-w-4xl mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16 relative z-10 text-center sm:text-left"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  I build code that thinks and infrastructure that lasts.
                </motion.h1>

                {/* Action Buttons - Moved below main heading */}
                <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12 relative z-20">
                  <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-3 sm:gap-4 md:gap-6 relative z-20">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.6,
                        ease: "easeOut",
                      }}
                      className="w-[70%] sm:w-auto mx-auto sm:mx-0"
                    >
                      <Link to="/projects" className="w-full sm:w-auto">
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto border-2 border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black rounded-full px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg font-medium transition-colors duration-500"
                        >
                          Selected Projects
                        </Button>
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.7,
                        ease: "easeOut",
                      }}
                      className="w-[70%] sm:w-auto mx-auto sm:mx-0"
                    >
                      <Link to="/about" className="w-full sm:w-auto">
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto border-2 border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black rounded-full px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg font-medium transition-colors duration-500"
                        >
                          About me
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Right Column - Status Text - Aligned with main text */}
              <div className="lg:col-span-3 flex items-start lg:pt-8 xl:pt-16 2xl:pt-32 relative z-10">
                <motion.div
                  className="pt-0 w-full relative z-10 text-center sm:text-left"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {/* Current status badge */}
                  <motion.div
                    className="inline-flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 text-sm sm:text-base font-medium mb-4 sm:mb-5 border border-orange-200/50 dark:from-orange-900/40 dark:to-amber-900/40 dark:text-orange-200 dark:border-orange-800/40 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md backdrop-blur-sm"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <motion.div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-orange-500 rounded-full mr-2 sm:mr-2.5 dark:bg-orange-400 transition-colors duration-300 ease-in-out"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    Now
                  </motion.div>

                  {/* Current work description */}
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-3 sm:mb-4 relative z-10">
                    Developing agentic workflows that autonomously create and
                    publish products, podcasts, music, and more.
                  </p>

                  {/* Projects link */}
                  <p className="text-sm sm:text-base text-muted-foreground relative z-10">
                    <Link
                      to="/projects"
                      className="font-medium text-foreground hover:text-muted-foreground transition-colors underline underline-offset-4"
                    >
                      Visit projects
                    </Link>{" "}
                    for latest work
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
