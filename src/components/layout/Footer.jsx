import React from 'react';
import { motion } from 'framer-motion';
import { ShareButtons } from '../features/ShareButtons'; // Import ShareButtons
import './Footer.css';

export const Footer = () => {
  // Get the main site URL and Title from your package.json
  const siteUrl = "https://aldrik-cruze.github.io/historical-news";
  const siteTitle = "Historical News - On This Day";

  return (
    <footer className="site-footer formal-font">
      {/* Add the ShareButtons back in */}
      <ShareButtons url={siteUrl} title={siteTitle} />

      <motion.p
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      >
        &copy; 2025 Historical News
      </motion.p>
    </footer>
  );
};
