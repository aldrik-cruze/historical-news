import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import './FilterControls.css';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'event', label: 'Events' },
  { id: 'birth', label: 'Births' },
  { id: 'death', label: 'Deaths' },
];

export const FilterControls = React.memo(({ activeFilter, onFilterChange, isSearchActive }) => {
  const handleFilterClick = useCallback((filterId) => {
    onFilterChange(filterId);
  }, [onFilterChange]);

  return (
    <nav className="filter-controls">
      {isSearchActive && (
        <div className="search-mode-indicator">
          <span>🔍 Search Mode - Date filtering disabled</span>
        </div>
      )}
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
          onClick={() => handleFilterClick(filter.id)}

          // Add layout prop for smooth re-positioning
          layout

          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {activeFilter === filter.id && (
            <motion.div
              className="active-filter-highlight"

              // Add layoutId to make the highlight slide
              layoutId="active-filter-highlight"

              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          <span className="filter-label">{filter.label}</span>
        </motion.button>
      ))}
    </nav>
  );
});

FilterControls.displayName = 'FilterControls';
