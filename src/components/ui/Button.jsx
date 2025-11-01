import React from 'react';
import { motion } from 'framer-motion';
import './Button.css'; // <-- ADD THIS IMPORT

export const Button = ({
  children,
  variant = 'primary',
  icon,
  className = '',
  ...props
}) => {
  return (
    <motion.button
      className={`modern-button ${variant} ${className}`}
      whileHover={{ scale: 1.02 }} // This will now combine with CSS hover
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400 }}
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{children}</span>
    </motion.button>
  );
};
