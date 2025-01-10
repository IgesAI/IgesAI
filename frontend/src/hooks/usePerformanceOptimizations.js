import { useEffect, useCallback } from 'react';

export const usePerformanceOptimizations = () => {
  // Debounce function
  const debounce = useCallback((func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }, []);

  // Throttle function
  const throttle = useCallback((func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  // Optimize animations when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.classList.add('reduce-animations');
      } else {
        document.body.classList.remove('reduce-animations');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      // Clear any cached data that's no longer needed
      window.sessionStorage.removeItem('battleCache');
    };
  }, []);

  return { debounce, throttle };
}; 