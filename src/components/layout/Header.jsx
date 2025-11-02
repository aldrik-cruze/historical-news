import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Controls } from '../features/Controls';
import './Header.css';

export const Header = ({ onDateChange, onSearch, onYearChange, onToggleTheme, theme }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Only show header when at the very top, hide when scrolling down
          if (currentScrollY <= 50) {
            setIsHidden(false);
          } else {
            setIsHidden(true);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const controlsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 70,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.header
      className={`site-header ${isHidden ? 'header-hidden' : ''}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Decorative background elements */}
      <div className="header-bg-shapes">
        <motion.div 
          className="shape shape-1"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="shape shape-2"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main header content */}
      <div className="header-content">
        {/* Title section with theme toggle */}
        <motion.div className="header-title-wrapper" variants={titleVariants}>
          <div className="header-title-section">
            <div className="title-icon-wrapper">
              <motion.div 
                className="title-icon"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                📰
              </motion.div>
            </div>
            <h1 className="header-title" onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>
              <span className="title-main">Historical News</span>
              <motion.span 
                className="title-decoration"
                animate={{
                  scaleX: [0, 1],
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                }}
              />
            </h1>
          </div>

          {/* Theme toggle button - moved next to title */}
          <button 
            onClick={onToggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            <motion.span
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </motion.span>
          </button>
        </motion.div>

        {/* Controls section */}
        <motion.div 
          variants={controlsVariants} 
          className="controls-container"
        >
          <Controls
            onDateChange={onDateChange}
            onYearRange={onYearChange}
            onSearch={onSearch}
            theme={theme}
          />
        </motion.div>
      </div>
    </motion.header>
  );
};
