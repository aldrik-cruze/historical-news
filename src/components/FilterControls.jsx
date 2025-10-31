import React from 'react';
import './FilterControls.css';

export const FilterControls = ({ activeFilter, setActiveFilter }) => {
  const filters = ['all', 'event', 'birth', 'death'];

  return (
    <nav className="filter-controls glass-effect">
      {filters.map(filter => (
        <button
          key={filter}
          className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
          data-filter={filter}
          onClick={() => setActiveFilter(filter)}
        >
          <i className={`fas fa-${filter === 'all' ? 'globe' : filter === 'event' ? 'history' : filter === 'birth' ? 'baby' : 'monument'}`}></i>
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </nav>
  );
};