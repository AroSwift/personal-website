import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Check localStorage first, then fallback to current DOM state
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Fallback to current DOM state
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    // Add a subtle delay for better visual feedback
    setTimeout(() => {
      document.documentElement.classList.toggle("dark");
    }, 50);
    
    localStorage.setItem("theme", newTheme);
  };

  // Navigation links
  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getPageSuffix = () => {
    switch (location.pathname) {
      case "/about":
        return "About";
      case "/projects":
        return "Projects";
      case "/contact":
        return "Contact";
      default:
        return null;
    }
  };

  const pageSuffix = getPageSuffix();

  // Calculate background opacity based on scroll position
  const getBackgroundOpacity = () => {
    if (scrollY < 150) return 0;
    if (scrollY > 350) return 0.9;
    return ((scrollY - 150) / 200) * 0.9;
  };

  const backgroundOpacity = getBackgroundOpacity();
  const shouldShowBackground = backgroundOpacity > 0;

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50", className)}>
      {/* Background overlay with cool hue */}
      {shouldShowBackground && (
        <div
          className="absolute inset-0 backdrop-blur-xl transition-all duration-500 ease-out"
          style={{
            backgroundColor:
              theme === "dark"
                ? `rgba(30, 30, 30, ${backgroundOpacity})` // Less dark black for dark mode
                : `rgba(248, 250, 252, ${backgroundOpacity})`, // Cool off-white for light mode
            opacity: backgroundOpacity,
          }}
        />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {/* Logo/Name with letter wave animation */}
          <Link to="/" className="cursor-pointer">
            <h1
              className="font-px-grotesk font-medium tracking-tight hover:text-muted-foreground transition-colors text-xl sm:text-2xl md:text-3xl"
              onMouseEnter={() => {
                const letters = document.querySelectorAll(
                  ".header-name-letter",
                );
                letters.forEach((letter, index) => {
                  setTimeout(() => {
                    letter.classList.add("letter-wave-animation");
                  }, index * 40);
                });
              }}
            >
              {"Aaron Barlow".split("").map((letter, index) => (
                <span
                  key={index}
                  className="header-name-letter inline-block transition-all duration-300 ease-out"
                  onAnimationEnd={(e) => {
                    if (e.target instanceof HTMLElement) {
                      e.target.classList.remove("letter-wave-animation");
                    }
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
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
                transition={{ duration: 0.4, ease: "easeOut" }}
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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "relative py-1 text-base lg:text-lg xl:text-xl transition-colors group overflow-hidden font-px-grotesk font-medium",
                isActive(link.path)
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-foreground"
                  : "text-foreground hover:text-muted-foreground",
              )}
              onMouseEnter={(e) => {
                const letters = e.currentTarget.querySelectorAll(".nav-letter");
                letters.forEach((letter, index) => {
                  setTimeout(() => {
                    letter.classList.add("letter-wave-animation");
                  }, index * 40);
                });
              }}
            >
              <span className="inline-block relative">
                {link.name.split("").map((letter, index) => (
                  <span
                    key={index}
                    className="nav-letter inline-block transition-all duration-300 ease-out"
                    onAnimationEnd={(e) => {
                      if (e.target instanceof HTMLElement) {
                        e.target.classList.remove("letter-wave-animation");
                      }
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 ml-16 lg:ml-24 xl:ml-32">
          {/* Dark / light switch icon */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full transition-all duration-500 ease-in-out w-12 h-12 hover:scale-110 active:scale-95"
          >
            <motion.div
              initial={false}
              animate={{
                rotate: theme === "light" ? 0 : 180,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 0.6, ease: "easeInOut" },
                scale: { duration: 0.2, ease: "easeOut" },
              }}
            >
              {theme === "light" ? (
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-border/20 bg-background/95 backdrop-blur-sm"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "block py-3 text-lg transition-colors border-b border-border/10 last:border-b-0",
                      isActive(link.path)
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
