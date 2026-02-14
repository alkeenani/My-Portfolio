import { useEffect, useState, useRef } from 'react';

export const useIntersectionObserver = (options = { threshold: 0.1, rootMargin: '0px' }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Create a persistent trigger - once visible, stay visible (optional, usually better for portfolios)
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        // If you want it to toggle off when scrolling back up, remove this disconnect
        observer.disconnect(); 
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return { ref, isIntersecting };
};
