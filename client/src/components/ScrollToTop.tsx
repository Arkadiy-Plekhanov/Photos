import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 0);
  }, [location]);

  return null;
}