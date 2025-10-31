import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QuizModal } from './QuizModal';
import './NewsFeed.css';

export function NewsFeed({ searchQuery, date, yearRange, activeFilter }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchHistoricalData = async (month, day) => {
      if (!month || !day) return;
      setLoading(true);
      try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`);
        if (response.ok) {
          const data = await response.json();
          const events = (data.events || []).map(e => ({...e, type: 'event'}));
          const births = (data.births || []).map(e => ({...e, type: 'birth'}));
          const deaths = (data.deaths || []).map(e => ({...e, type: 'death'}));
          const allEvents = [].concat(events, births, deaths);
          setNews(allEvents);
        } else {
          console.warn('Wikimedia OnThisDay returned non-OK, status:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch data from any source', error);
      }
      setLoading(false);
    };

    if (date.month && date.day) {
      fetchHistoricalData(date.month, date.day);
    } else {
        const today = new Date();
        fetchHistoricalData(today.getMonth() + 1, today.getDate());
    }
  }, [date]);

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> { parts.map((part, i) => 
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold', backgroundColor: 'yellow' } : {} }>
            { part }
        </span>) 
    } </span>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const filteredNews = news.filter(item => {
    const query = searchQuery.toLowerCase();
    const text = item.text.toLowerCase();
    const year = item.year.toString();
    const yearNum = parseInt(item.year);

    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    if (!matchesFilter) {
      return false;
    }

    if (searchQuery) {
      const matchesSearch = text.includes(query) || year.includes(query);
      return matchesSearch;
    }

    const inYearRange =
      (!yearRange.from || yearNum >= parseInt(yearRange.from)) &&
      (!yearRange.to || yearNum <= parseInt(yearRange.to));
    return inYearRange;
  });

  return (
    <motion.main
      id="news-feed"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {loading ? (
        <div id="skeleton-loader">
          {[...Array(6)].map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-img"></div>
              <div className="skeleton-content">
                <div className="skeleton-line-short"></div>
                <div className="skeleton-line-long"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        filteredNews.map((item, index) => (
          <motion.div
            className="news-card lift-card holographic-on-hover formal-font"
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <img src={item.pages?.[0]?.thumbnail?.source || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%23666" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E'} alt="Event Image" className="card-image" />
            <div className="card-content">
              <span className={`category-tag tag-${item.type || 'event'}`}>{item.type || 'Event'}</span>
              <h2>{item.year}</h2>
              <p>{getHighlightedText(item.text, searchQuery)}</p>
              <div className="card-actions">
                <div className="card-footer">
                  <span className="reading-time">{calculateReadingTime(item.text)}</span>
                  <a href={item.pages?.[0]?.content_urls.desktop.page || '#'} target="_blank" rel="noopener noreferrer" className="read-more">Read More</a>
                </div>
                <button className="quiz-btn" onClick={() => setSelectedEvent(item)}>Test Your Knowledge</button>
              </div>
            </div>
          </motion.div>
        ))
      )}
      {selectedEvent && <QuizModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </motion.main>
  );
}