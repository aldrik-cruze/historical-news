import React from 'react';
import { motion } from 'framer-motion';
import './Card.css'; // <-- ADD THIS IMPORT

export const Card = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      className={`modern-card glass-effect ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 100 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
