import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { NewsFeed } from './components/NewsFeed';
import { FilterControls } from './components/FilterControls';
import { Footer } from './components/Footer';
import { ExtraFeatures } from './components/ExtraFeatures';

function App() {
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState({ month: '', day: '' });
  const [yearRange, setYearRange] = useState({ from: '', to: '' });
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleFetch = useCallback((month, day, yearFrom, yearTo) => {
    setDate({ month, day });
    setYearRange({ from: yearFrom, to: yearTo });
  }, []);

  return (
    <div className="app-container">
      <Header onThemeToggle={toggleTheme} theme={theme} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="content-container">
        <Controls onFetch={handleFetch} />
        <FilterControls activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <NewsFeed searchQuery={searchQuery} date={date} yearRange={yearRange} activeFilter={activeFilter} />
      </main>
      <Footer />
      <ExtraFeatures />
    </div>
  );
}

export default App;
