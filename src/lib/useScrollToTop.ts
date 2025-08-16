import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that smoothly scrolls to the top of the page
 * whenever the route changes
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to top with easing
    const scrollToTop = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) return; // Already at top

      // Use smooth scrolling with custom easing
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      // Fallback for browsers that don't support smooth scrolling
      if (!window.CSS?.supports('scroll-behavior', 'smooth')) {
        // Custom smooth scroll implementation
        const duration = 800; // Duration in milliseconds
        const startTime = window.performance.now();
        const startScrollY = currentScrollY;

        const easeInOutCubic = (t: number): number => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animateScroll = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeInOutCubic(progress);

          const newScrollY = startScrollY - startScrollY * easedProgress;
          window.scrollTo(0, newScrollY);

          if (progress < 1) {
            window.requestAnimationFrame(animateScroll);
          }
        };

        window.requestAnimationFrame(animateScroll);
      }
    };

    // Small delay to ensure the new page content is rendered
    const timeoutId = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);
};
