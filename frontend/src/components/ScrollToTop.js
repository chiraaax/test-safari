import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
      // Custom smooth scroll function with easing for very smooth and swift animation
      const smoothScrollToTop = () => {
        const startPosition = window.pageYOffset;
        const startTime = performance.now();
        const duration = 400; // Duration in milliseconds (swift: 400ms)
  
        // Easing function for smooth acceleration and deceleration (ease-in-out-cubic)
        const easeInOutCubic = (t) => {
          return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
  
        const animateScroll = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = easeInOutCubic(progress);
          
          window.scrollTo(0, startPosition * (1 - ease));
  
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };
  
        requestAnimationFrame(animateScroll);
      };
  
      // Small delay to ensure route transition starts first
      const timeoutId = setTimeout(() => {
        smoothScrollToTop();
      }, 10);
  
      return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;