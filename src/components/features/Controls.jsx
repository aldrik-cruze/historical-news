import React, { useState, useCallback } from 'react';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import './Controls.css';

const months = [
  { value: 1, label: 'Jan' }, { value: 2, label: 'Feb' }, { value: 3, label: 'Mar' },
  { value: 4, label: 'Apr' }, { value: 5, label: 'May' }, { value: 6, label: 'Jun' },
  { value: 7, label: 'Jul' }, { value: 8, label: 'Aug' }, { value: 9, label: 'Sep' },
  { value: 10, label: 'Oct' }, { value: 11, label: 'Nov' }, { value: 12, label: 'Dec' },
];

const days = Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: String(i + 1) }));

export const Controls = React.memo(({ onDateChange, onYearRange, onSearch, theme }) => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [fromYear, setFromYear] = useState('');
  const [toYear, setToYear] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDateSubmit = useCallback(() => {
    // Submit both date and year range together
    onDateChange({ month: parseInt(month), day: parseInt(day) });
    onYearRange({ from: fromYear, to: toYear });
    setSearchQuery(''); // Clear search when filtering
  }, [month, day, fromYear, toYear, onDateChange, onYearRange]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  return (
    <div className="controls-wrapper">
      <div className="controls-row">
        {/* ----- Date and Year Filtering Combined ----- */}
        <div className="control-group date-filter-group">
          <Select label="Month" value={month} onChange={(e) => setMonth(e.target.value)} options={months} />
          <Select label="Day" value={day} onChange={(e) => setDay(e.target.value)} options={days} />
          <input
            type="number"
            placeholder="From Year"
            className="control-input"
            value={fromYear}
            onChange={(e) => setFromYear(e.target.value)}
          />
          <input
            type="number"
            placeholder="To Year"
            className="control-input"
            value={toYear}
            onChange={(e) => setToYear(e.target.value)}
          />
          <Button onClick={handleDateSubmit}>Filter</Button>
        </div>

        {/* ----- Search ----- */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search events..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
    </div>
  );
});

Controls.displayName = 'Controls';
