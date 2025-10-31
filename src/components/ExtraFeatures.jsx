import React, { useEffect, useState } from 'react';

export const ExtraFeatures = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll Progress Indicator
      const scrollIndicator = document.getElementById('scrollIndicator');
      if (scrollIndicator) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollIndicator.style.transform = `scaleX(${scrolled / 100})`;
      }

      // Back to Top Button
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Parallax Effect for Cards (simplified)
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.news-card');
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;

      cards.forEach((card, index) => {
        if (card.matches(':hover')) {
          const moveX = mouseX * 10;
          const moveY = mouseY * 10;
          card.style.setProperty('--rotate-x', `${-moveY}deg`);
          card.style.setProperty('--rotate-y', `${moveX}deg`);
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className="aurora-effect"></div>
      <div className="particle-container" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 1 }}>
{[...Array(15)].map((_, i) => (
            <div className="particle" key={i}></div>
          ))}
      </div>
      <div className="scroll-indicator" id="scrollIndicator"></div>
    </>
  );
};