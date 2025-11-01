import React from 'react';
import { motion } from 'framer-motion';

export const Select = ({
  options,
  icon,
  label,
  className = '',
  ...props
}) => {
  return (
    <div className={`modern-select-wrapper ${className}`}>
      {label && <label className="select-label">{label}</label>}
      <div className="select-container">
        <select className="modern-select" {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {icon && <span className="select-icon">{icon}</span>}
      </div>
    </div>
  );
};
