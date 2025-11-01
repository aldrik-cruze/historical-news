import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { QuizModal } from './QuizModal';
import { Button } from '../ui/Button';
import './NewsFeed.css';

const ITEMS_PER_PAGE = 12;

// Create a separate Card component to hold its own animation logic
function NewsCard({ item, searchQuery, onQuizClick }) {
  // 1. Hooks for 3D hover effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Transform mouse position into 3D rotation
  const rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
  const rotateY = useTransform(mouseX, [-150, 150], [-10, 10]);

  // 3. Transform mouse position for the glow effect
  const glowX = useTransform(mouseX, [-200, 200], ["-100%", "100%"]);
  const glowY = useTransform(mouseY, [-200, 200], ["-100%", "100%"]);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const rect = currentTarget.getBoundingClientRect();
    // Calculate mouse position relative to the card center
    mouseX.set(clientX - rect.left - rect.width / 2);
    mouseY.set(clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    // Reset to center
    mouseX.set(0);
    mouseY.set(0);
  }

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const getHighlightedText = (text, highlight) => {
    if (!highlight) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> { parts.map((part, i) =>
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold', backgroundColor: 'var(--accent-light)' } : {} }>
            { part }
        </span>)
    } </span>;
  }

  // Card animation: fade in and slide up when scrolled into view
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 14
      }
    }
  };

  return (
    <motion.div
      className="news-card formal-font"
      key={`${item.year}-${item.text.slice(0, 20)}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible" // Animate when it scrolls into view
      viewport={{ once: true, amount: 0.3 }} // Trigger animation at 30% visibility
      layout="position"
      exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}

      // 4. Apply 3D hover logic
      style={{
        perspective: 800, // Apply perspective for 3D
        rotateX, // Apply transforms from hooks
        rotateY
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img
        src={item.pages?.[0]?.thumbnail?.source || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%23666" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E'}
        alt="Event Image"
        className="card-image"
        loading="lazy"
      />
      <div className="card-content">
        <div className="card-header">
          <span className={`category-tag tag-${item.type || 'event'}`}>{item.type || 'Event'}</span>
          <h2>{item.year}</h2>
        </div>
        <p>{getHighlightedText(item.text, searchQuery)}</p>
        <div className="card-actions">
          <div className="card-footer">
            <span className="reading-time">{calculateReadingTime(item.text)}</span>
            <a href={item.pages?.[0]?.content_urls.desktop.page || '#'} target="_blank" rel="noopener noreferrer" className="read-more">Read More</a>
          </div>
          <Button
            className="quiz-btn"
            onClick={() => onQuizClick(item)}
            variant="primary"
          >
            Test Your Knowledge
          </Button>
        </div>
      </div>

      {/* 5. The mouse-following glow effect */}
      <motion.div
        className="card-glow"
        style={{
          "--glow-x": glowX,
          "--glow-y": glowY
        }}
      />
    </motion.div>
  );
}


export function NewsFeed({ searchQuery, date, yearRange, activeFilter }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const cache = useRef(new Map());
  const loadMoreRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);

  // Function to fetch data for a specific date
  const fetchDateData = async (month, day) => {
    const cacheKey = `${month}-${day}`;
    
    if (cache.current.has(cacheKey)) {
      return cache.current.get(cacheKey);
    }

    try {
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`);
      if (response.ok) {
        const data = await response.json();
        const events = (data.events || []).map(e => ({...e, type: 'event'}));
        const births = (data.births || []).map(e => ({...e, type: 'birth'}));
        const deaths = (data.deaths || []).map(e => ({...e, type: 'death'}));
        const allEvents = [].concat(events, births, deaths);
        
        cache.current.set(cacheKey, allEvents);
        return allEvents;
      }
    } catch (error) {
      console.error(`Failed to fetch data for ${month}/${day}`, error);
    }
    return [];
  };

  // Fetch data when search query changes - use Wikipedia search API
  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      const performSearch = async () => {
        setIsSearching(true);
        setLoading(true);
        
        try {
          // Use Wikipedia search API for better results
          const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(searchQuery)}&srlimit=50`;
          const response = await fetch(searchUrl);
          
          if (response.ok) {
            const data = await response.json();
            const searchResults = data.query?.search || [];
            
            // Convert search results to our event format
            const events = searchResults.map(result => ({
              text: result.title + ': ' + result.snippet.replace(/<[^>]*>/g, ''),
              year: extractYearFromSnippet(result.snippet) || new Date().getFullYear(),
              type: 'event',
              pages: [{
                thumbnail: { source: '' },
                content_urls: {
                  desktop: {
                    page: `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title.replace(/ /g, '_'))}`
                  }
                }
              }]
            }));
            
            // Also search through cached date data for more relevant results
            const allCachedData = [];
            cache.current.forEach(value => {
              allCachedData.push(...value);
            });
            
            const query = searchQuery.toLowerCase();
            const filteredCached = allCachedData.filter(item => 
              item.text.toLowerCase().includes(query) || 
              item.year.toString().includes(query)
            );
            
            // Combine and deduplicate results
            const combinedResults = [...filteredCached, ...events];
            const uniqueResults = combinedResults.filter((item, index, self) =>
              index === self.findIndex(t => t.text === item.text)
            );
            
            setNews(uniqueResults);
          } else {
            // Fallback to the old method if API fails
            await fallbackSearch();
          }
        } catch (error) {
          console.error('Search failed:', error);
          await fallbackSearch();
        }
        
        setVisibleCount(ITEMS_PER_PAGE);
        setLoading(false);
        setIsSearching(false);
      };
      
      // Fallback search method
      const fallbackSearch = async () => {
        const allResults = [];
        const today = new Date();
        
        // Search through entire year (sample every 7 days)
        const daysToFetch = [];
        for (let month = 1; month <= 12; month++) {
          const daysInMonth = new Date(today.getFullYear(), month, 0).getDate();
          for (let day = 1; day <= daysInMonth; day += 7) {
            daysToFetch.push({ month, day });
          }
        }

        for (const { month, day } of daysToFetch) {
          const data = await fetchDateData(month, day);
          allResults.push(...data);
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        setNews(allResults);
      };
      
      // Helper function to extract year from snippet
      const extractYearFromSnippet = (snippet) => {
        const yearMatch = snippet.match(/\b(1[0-9]{3}|20[0-2][0-9])\b/);
        return yearMatch ? parseInt(yearMatch[0]) : null;
      };

      performSearch();
    }
  }, [searchQuery]);

  // Fetch data for specific date when not searching
  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      // Skip normal date fetch when searching
      return;
    }

    const fetchHistoricalData = async (month, day) => {
      if (!month || !day) return;
      
      setLoading(true);
      const data = await fetchDateData(month, day);
      setNews(data);
      setVisibleCount(ITEMS_PER_PAGE);
      setLoading(false);
    };

    const today = new Date();
    const effectiveMonth = date.month || (today.getMonth() + 1);
    const effectiveDay = date.day || today.getDate();
    fetchHistoricalData(effectiveMonth, effectiveDay);

  }, [date, searchQuery]);

  const fullFilteredNews = useMemo(() => {
    return news.filter(item => {
      const query = searchQuery.toLowerCase();
      const text = item.text.toLowerCase();
      const year = item.year.toString();
      const yearNum = parseInt(item.year);

      // First, apply event/birth/death type filter (always active)
      const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
      if (!matchesFilter) return false;

      // When searching, only check if search query matches
      if (searchQuery && searchQuery.trim()) {
        const matchesSearch = text.includes(query) || year.includes(query);
        return matchesSearch;
      }

      // When not searching, apply year range filtering
      if (yearRange.from || yearRange.to) {
        const inYearRange =
          (!yearRange.from || yearNum >= parseInt(yearRange.from)) &&
          (!yearRange.to || yearNum <= parseInt(yearRange.to));
        return inYearRange;
      }

      // No search and no year range - show all items (that passed filter check)
      return true;
    });
  }, [news, searchQuery, yearRange, activeFilter]);

  const visibleNews = useMemo(() => {
    return fullFilteredNews.slice(0, visibleCount);
  }, [fullFilteredNews, visibleCount]);

  useEffect(() => {
    if (loading || visibleCount >= fullFilteredNews.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE);
        }
      },
      { rootMargin: "0px 0px 400px 0px" }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loading, visibleCount, fullFilteredNews]);

  // Main container for the feed
  const feedVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Stagger the *skeleton* loaders, not the cards (cards animate on view)
        staggerChildren: 0.05
      }
    }
  };

  // Skeleton loader card animation
  const skeletonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 14
      }
    }
  };

  return (
    <>
      <motion.main
        id="news-feed"
        variants={feedVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        {loading ? (
          <div id="skeleton-loader">
            {isSearching && (
              <div style={{ 
                gridColumn: '1 / -1', 
                textAlign: 'center', 
                padding: '2rem',
                color: 'var(--primary-color)',
                fontWeight: '600',
                fontSize: '1.1rem'
              }}>
                🔍 Searching across multiple dates for "{searchQuery}"...
              </div>
            )}
            {[...Array(6)].map((_, i) => (
              <motion.div className="skeleton-card" key={i} variants={skeletonVariants} />
            ))}
          </div>
        ) : visibleNews.length === 0 ? (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '4rem 2rem',
            color: 'var(--text-secondary)',
            fontSize: '1.1rem'
          }}>
            {searchQuery ? `No results found for "${searchQuery}"` : 'No events found for this date.'}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {visibleNews.map((item) => (
              <NewsCard
                key={`${item.year}-${item.text.slice(0, 20)}`}
                item={item}
                searchQuery={searchQuery}
                onQuizClick={setSelectedEvent}
              />
            ))}
          </AnimatePresence>
        )}
      </motion.main>

      {!loading && visibleCount < fullFilteredNews.length && (
        <div ref={loadMoreRef} style={{ height: "100px", width: "100%" }} />
      )}

      {selectedEvent && <QuizModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </>
  );
}
