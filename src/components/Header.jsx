import React from 'react';
import './Header.css';

export const Header = ({ onThemeToggle, theme, searchQuery, setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <header className="site-header header-animated">
      <div className="header-content">
        <h1 className="neon glitch-on-hover title-white-bold title-font">On This Day</h1>
        <p className="subtitle">Discover history's memorable moments</p>
      </div>
      <div className="header-tools">
        <button onClick={onThemeToggle} className="theme-toggle" title="Toggle theme">
          <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
        <div className="search-container">
          <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search historical events..." className="search-input" aria-label="Search historical events" />
          <button onClick={clearSearch} className="clear-search-btn" title="Clear search" aria-label="Clear search">
            <i className="fas fa-times" aria-hidden="true"></i>
            <span className="sr-only">Clear search</span>
          </button>
          <button id="search-btn" className="search-btn" title="Search">
            <i className="fas fa-search" aria-hidden="true"></i>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </header>
  );
};