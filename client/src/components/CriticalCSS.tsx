import { useEffect } from 'react';

export default function CriticalCSS() {
  useEffect(() => {
    // Remove the immediate hero section since React has loaded
    const immediateHero = document.getElementById('immediate-hero');
    if (immediateHero) {
      immediateHero.style.opacity = '0';
      setTimeout(() => {
        immediateHero.style.display = 'none';
        document.body.classList.add('app-loaded');
      }, 300);
    }
  }, []);

  return null;
}