import React, { useState, useEffect } from 'react';
import './Controls.css';

export const Controls = ({ onFetch }) => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  useEffect(() => {
    const today = new Date();
    setMonth(today.getMonth() + 1);
    setDay(today.getDate());
  }, []);

  const handleFetch = () => {
    onFetch(month, day, yearFrom, yearTo);
  };

  return (
    <div className="date-navigation">
      <div className="controls glass-effect">
        <div className="date-range-controls">
          <div className="year-range-group">
            <div className="input-wrapper year-range">
              <input
                type="number"
                id="year-from"
                title="From Year"
                aria-label="From Year"
                placeholder="From Year"
                value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)}
                className="year-input"
              />
            </div>
            <span className="date-separator">to</span>
            <div className="input-wrapper year-range">
              <input
                type="number"
                id="year-to"
                title="To Year"
                aria-label="To Year"
                placeholder="To Year"
                value={yearTo}
                onChange={(e) => setYearTo(e.target.value)}
                className="year-input"
              />
            </div>
          </div>
        </div>
        <div className="select-wrapper">
          <select id="month-select" title="Select Month" aria-label="Select Month" value={month} onChange={(e) => setMonth(e.target.value)}>
            {months.map((month, index) => <option key={index} value={index + 1}>{month}</option>)}
          </select>
          <i className="fas fa-chevron-down"></i>
        </div>
        <div className="select-wrapper">
          <select id="day-select" title="Select Day" aria-label="Select Day" value={day} onChange={(e) => setDay(e.target.value)}>
            {days.map(day => <option key={day} value={day}>{day}</option>)}
          </select>
          <i className="fas fa-chevron-down"></i>
        </div>
        <div className="select-wrapper provider-select">
          <select id="provider-select" title="Data Provider" aria-label="Choose history data provider">
            <option value="auto">Auto (Wikipedia → Fallback)</option>
            <option value="wikimedia">Wikipedia only</option>
            <option value="muffin">History Muffin only</option>
            <option value="cache">Use cached data only</option>
          </select>
          <i className="fas fa-database"></i>
        </div>
        <button id="fetch-button" className="primary-button glitch-on-hover" onClick={handleFetch}>
          <i className="fas fa-calendar-day"></i>
          Get History
        </button>
      </div>
    </div>
  );
};
