import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { NewsFeed } from './components/features/NewsFeed';
import { Footer } from './components/layout/Footer';
import { FilterControls } from './components/features/FilterControls';
import { ExtraFeatures } from './components/features/ExtraFeatures';

// Import all necessary CSS files (updated paths)
import './App.css';
import './styles/toast.css';
import './styles/utilities.css';
import './components/layout/Header.css';
import './components/features/Controls.css';
import './components/features/FilterControls.css';
import './components/features/NewsFeed.css';
import './components/features/QuizModal.css';
import './components/layout/Footer.css';
import './components/features/ShareButtons.css';
import './components/ui/Button.css';
import './components/ui/Select.css';
import './components/ui/Card.css';

// Use a NAMED export to match your main.jsx
export function App() {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return {
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [yearRange, setYearRange] = useState({ from: '', to: '' });
  const [activeFilter, setActiveFilter] = useState('all');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSearchQuery(''); // Clear search when date changes
    setYearRange({ from: '', to: '' }); // Clear year range
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleYearChange = (range) => {
    setYearRange(range);
    setSearchQuery(''); // Clear search when year range changes
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="app">
      <ExtraFeatures />
      <Header
        onDateChange={handleDateChange}
        onSearch={handleSearch}
        onYearChange={handleYearChange}
        onToggleTheme={toggleTheme}
        theme={theme}
      />
      <main>
        <FilterControls
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          isSearchActive={!!searchQuery}
        />
        <NewsFeed
          searchQuery={searchQuery}
          date={date}
          yearRange={yearRange}
          activeFilter={activeFilter}
        />
      </main>
      <Footer />
    </div>
  );
}

// Add default export for compatibility
export default App;
