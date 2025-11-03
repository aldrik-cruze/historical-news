import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './QuizModal.css';

const generateQuestions = (event) => {
  const questions = [];
  const eventText = event.text || '';
  const eventYear = event.year;
  
  // Extract key information from the event text
  const words = eventText.split(' ');
  const hasNumbers = /\d+/.test(eventText);
  const hasNames = /[A-Z][a-z]+ [A-Z][a-z]+/.test(eventText);
  
  // Question 1: Main event content - Fill in the blank
  const blankQuestion = createFillInBlankQuestion(eventText, eventYear);
  if (blankQuestion) questions.push(blankQuestion);
  
  // Question 2: Specific year
  questions.push({
    question: `In which year did this event occur: "${eventText.substring(0, 60)}${eventText.length > 60 ? '...' : ''}"?`,
    correctAnswer: eventYear,
    options: generateYearOptions(eventYear)
  });
  
  // Question 3: Who/What/Where question based on content
  const whoWhatQuestion = createWhoWhatWhereQuestion(eventText, event);
  if (whoWhatQuestion) questions.push(whoWhatQuestion);
  
  // Question 4: Event impact or consequence
  const impactQuestion = createImpactQuestion(eventText, eventYear, event);
  if (impactQuestion) questions.push(impactQuestion);
  
  // Question 5: Key details from the text
  const detailQuestion = createDetailQuestion(eventText, event);
  if (detailQuestion) questions.push(detailQuestion);
  
  // Question 6: Historical significance
  const significanceQuestion = createSignificanceQuestion(eventText, eventYear);
  if (significanceQuestion) questions.push(significanceQuestion);

  return questions.slice(0, 5); // Return 5 best questions
};

// Helper: Create fill-in-the-blank question
const createFillInBlankQuestion = (text, year) => {
  const words = text.split(' ');
  if (words.length < 5) return null;
  
  // Find a meaningful word to blank out (not common words)
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  const meaningfulWords = words.filter(w => 
    w.length > 4 && 
    !commonWords.includes(w.toLowerCase()) &&
    /^[A-Za-z]+$/.test(w)
  );
  
  if (meaningfulWords.length === 0) return null;
  
  const targetWord = meaningfulWords[Math.floor(Math.random() * Math.min(3, meaningfulWords.length))];
  const blankText = text.replace(targetWord, '_____');
  
  // Generate wrong options
  const wrongOptions = generateSimilarWords(targetWord);
  
  return {
    question: `Fill in the blank: "${blankText}"`,
    correctAnswer: targetWord,
    options: [targetWord, ...wrongOptions].sort(() => Math.random() - 0.5)
  };
};

// Helper: Generate year options
const generateYearOptions = (correctYear) => {
  const options = [correctYear];
  const offsets = [-1, 1, -5, 5, -10, 10, -50, 50];
  
  while (options.length < 4) {
    const offset = offsets[Math.floor(Math.random() * offsets.length)];
    const wrongYear = correctYear + offset;
    if (!options.includes(wrongYear) && wrongYear > 0 && wrongYear <= new Date().getFullYear()) {
      options.push(wrongYear);
    }
  }
  
  return options.sort(() => Math.random() - 0.5);
};

// Helper: Generate similar words for distractors
const generateSimilarWords = (word) => {
  const words = [
    'established', 'founded', 'created', 'formed', 'launched', 'started',
    'discovered', 'invented', 'developed', 'introduced', 'announced',
    'completed', 'finished', 'ended', 'concluded', 'terminated',
    'began', 'commenced', 'initiated', 'opened', 'started',
    'signed', 'ratified', 'approved', 'adopted', 'enacted'
  ];
  
  const filtered = words.filter(w => w !== word.toLowerCase());
  return filtered.sort(() => Math.random() - 0.5).slice(0, 3);
};

// Helper: Create Who/What/Where question
const createWhoWhatWhereQuestion = (text, event) => {
  const textLower = text.toLowerCase();
  
  // Try to extract a country/place name
  const places = ['United States', 'America', 'Britain', 'England', 'France', 'Germany', 'Russia', 'China', 'Japan', 'India', 'Italy', 'Spain', 'Mexico', 'Brazil', 'Canada', 'Australia'];
  const foundPlace = places.find(place => text.includes(place));
  
  if (foundPlace) {
    return {
      question: `Which country or region was primarily involved in this event?`,
      correctAnswer: foundPlace,
      options: [foundPlace, 'France', 'Germany', 'United States'].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4).sort(() => Math.random() - 0.5)
    };
  }
  
  // Try to extract what happened (action verbs)
  if (textLower.match(/signed|treaty|agreement|accord/)) {
    return {
      question: `What type of action occurred in this event?`,
      correctAnswer: 'A treaty or agreement was signed',
      options: ['A treaty or agreement was signed', 'A battle was fought', 'A discovery was made', 'A building was constructed'].sort(() => Math.random() - 0.5)
    };
  } else if (textLower.match(/battle|war|fought|attack|invasion/)) {
    return {
      question: `What type of action occurred in this event?`,
      correctAnswer: 'A military conflict took place',
      options: ['A military conflict took place', 'A peace treaty was signed', 'A scientific discovery was made', 'An artistic work was created'].sort(() => Math.random() - 0.5)
    };
  } else if (textLower.match(/discover|invent|create|develop|patent/)) {
    return {
      question: `What type of action occurred in this event?`,
      correctAnswer: 'An invention or discovery was made',
      options: ['An invention or discovery was made', 'A war began', 'A treaty was signed', 'A leader was elected'].sort(() => Math.random() - 0.5)
    };
  } else if (textLower.match(/born|birth/)) {
    return {
      question: `What type of event is this?`,
      correctAnswer: 'Birth of a notable person',
      options: ['Birth of a notable person', 'Death of a leader', 'Start of a war', 'Signing of a treaty'].sort(() => Math.random() - 0.5)
    };
  } else if (textLower.match(/died|death|pass/)) {
    return {
      question: `What type of event is this?`,
      correctAnswer: 'Death of a notable person',
      options: ['Death of a notable person', 'Birth of a leader', 'Discovery of new land', 'Invention of technology'].sort(() => Math.random() - 0.5)
    };
  }
  
  // Default: Ask about what was established/founded
  if (textLower.match(/found|establish|create|form/)) {
    return {
      question: `What happened in this event?`,
      correctAnswer: 'Something was founded or established',
      options: ['Something was founded or established', 'Something was destroyed', 'Someone was born', 'A war ended'].sort(() => Math.random() - 0.5)
    };
  }
  
  return null;
};

// Helper: Create impact/consequence question
const createImpactQuestion = (text, year, event) => {
  const textLower = text.toLowerCase();
  
  // Analyze based on keywords for historical impact
  if (textLower.match(/first|pioneer|initial|debut|inaugural/)) {
    return {
      question: `What was the long-term significance of this event?`,
      correctAnswer: 'It set a precedent for future events',
      options: [
        'It set a precedent for future events',
        'It ended an existing tradition',
        'It had minimal historical impact',
        'It was quickly forgotten'
      ].sort(() => Math.random() - 0.5)
    };
  } else if (textLower.match(/revolution|uprising|revolt|independence/)) {
    return {
      question: `How did this event likely affect society?`,
      correctAnswer: 'It brought major political change',
      options: [
        'It brought major political change',
        'It had no lasting effect',
        'It only affected the arts',
        'It was purely economic'
      ].sort(() => Math.random() - 0.5)
    };
  } else if (textLower.match(/invent|discover|breakthrough|advancement/)) {
    return {
      question: `What was the primary impact of this event?`,
      correctAnswer: 'Advancement in science or technology',
      options: [
        'Advancement in science or technology',
        'Political reformation',
        'Military conquest',
        'Religious conversion'
      ].sort(() => Math.random() - 0.5)
    };
  } else if (textLower.match(/treaty|peace|alliance|agreement/)) {
    return {
      question: `What was the intended outcome of this event?`,
      correctAnswer: 'To establish peace or cooperation',
      options: [
        'To establish peace or cooperation',
        'To start a conflict',
        'To make a scientific discovery',
        'To create art'
      ].sort(() => Math.random() - 0.5)
    };
  } else if (textLower.match(/law|constitution|legislation|act\s/)) {
    return {
      question: `What area did this event primarily affect?`,
      correctAnswer: 'Legal and governmental systems',
      options: [
        'Legal and governmental systems',
        'Sports and entertainment',
        'Natural environment only',
        'Fashion and trends'
      ].sort(() => Math.random() - 0.5)
    };
  }
  
  // Default: Based on event type
  if (event.type === 'birth') {
    return {
      question: `Why might this person's birth be historically significant?`,
      correctAnswer: 'They likely made important contributions later in life',
      options: [
        'They likely made important contributions later in life',
        'They were born in an unusual location',
        'Their birth had no significance',
        'They were the first person ever born'
      ].sort(() => Math.random() - 0.5)
    };
  } else if (event.type === 'death') {
    return {
      question: `Why is this person's death recorded in history?`,
      correctAnswer: 'They had significant impact during their lifetime',
      options: [
        'They had significant impact during their lifetime',
        'They lived longer than anyone else',
        'It was the first death ever recorded',
        'Their death had no historical importance'
      ].sort(() => Math.random() - 0.5)
    };
  }
  
  // Final default
  return {
    question: `In what way did this event influence history?`,
    correctAnswer: 'It contributed to the development of its time period',
    options: [
      'It contributed to the development of its time period',
      'It had no influence on history',
      'It only affected one person',
      'It was completely forgotten'
    ].sort(() => Math.random() - 0.5)
  };
};

// Helper: Create detail question
const createDetailQuestion = (text, event) => {
  // Extract potential names from text
  const nameMatch = text.match(/([A-Z][a-z]+ [A-Z][a-z]+)/);
  if (nameMatch) {
    const name = nameMatch[0];
    return {
      question: `Who was involved in this event?`,
      correctAnswer: name,
      options: [name, 'Abraham Lincoln', 'Albert Einstein', 'Winston Churchill'].sort(() => Math.random() - 0.5)
    };
  }
  
  // Extract numbers
  const numberMatch = text.match(/\b(\d{1,4})\b/);
  if (numberMatch && numberMatch[1] !== event.year.toString()) {
    return {
      question: `What number is mentioned in this event?`,
      correctAnswer: numberMatch[1],
      options: generateNumberOptions(parseInt(numberMatch[1]))
    };
  }
  
  // Default to decade question
  const decade = Math.floor(event.year / 10) * 10;
  return {
    question: `In which decade did this event occur?`,
    correctAnswer: `The ${decade}s`,
    options: [
      `The ${decade}s`,
      `The ${decade - 10}s`,
      `The ${decade + 10}s`,
      `The ${decade + 20}s`
    ].sort(() => Math.random() - 0.5)
  };
};

// Helper: Generate number options
const generateNumberOptions = (correctNumber) => {
  const options = [correctNumber.toString()];
  const offsets = [-1, 1, -5, 5, -10, 10];
  
  while (options.length < 4) {
    const offset = offsets[Math.floor(Math.random() * offsets.length)];
    const wrongNumber = (correctNumber + offset).toString();
    if (!options.includes(wrongNumber) && parseInt(wrongNumber) > 0) {
      options.push(wrongNumber);
    }
  }
  
  return options.sort(() => Math.random() - 0.5);
};

// Helper: Create significance question
const createSignificanceQuestion = (text, year) => {
  const textLower = text.toLowerCase();
  
  if (textLower.includes('first') || textLower.includes('began')) {
    return {
      question: `What was the historical significance of this event?`,
      correctAnswer: 'It was a beginning or first occurrence',
      options: [
        'It was a beginning or first occurrence',
        'It ended a major conflict',
        'It was a continuation of existing practice',
        'It had no major significance'
      ].sort(() => Math.random() - 0.5)
    };
  } else if (textLower.includes('end') || textLower.includes('concluded') || textLower.includes('died')) {
    return {
      question: `What was the historical significance of this event?`,
      correctAnswer: 'It marked an ending or conclusion',
      options: [
        'It marked an ending or conclusion',
        'It started a new era',
        'It was a beginning or first occurrence',
        'It had no major significance'
      ].sort(() => Math.random() - 0.5)
    };
  } else {
    // Default: Time period question
    let period = 'Ancient times';
    if (year >= 1900) period = '20th-21st century';
    else if (year >= 1800) period = '19th century';
    else if (year >= 1700) period = '18th century';
    else if (year >= 1600) period = '17th century';
    else if (year >= 1500) period = 'Renaissance era';
    else if (year >= 1000) period = 'Medieval period';
    
    return {
      question: `This event occurred during which historical period?`,
      correctAnswer: period,
      options: ['Ancient times', 'Medieval period', 'Renaissance era', '19th century', '20th-21st century']
        .filter(p => p === period || Math.random() > 0.5)
        .slice(0, 4)
        .sort(() => Math.random() - 0.5)
    };
  }
};


export const QuizModal = ({ event, onClose }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = useMemo(() => generateQuestions(event), [event]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    // Save original body overflow
    const originalOverflow = document.body.style.overflow;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Hide header when modal is open
    const header = document.querySelector('.site-header');
    if (header) {
      header.style.display = 'none';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = originalOverflow;
      
      // Show header again
      if (header) {
        header.style.display = '';
      }
    };
  }, []);

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleAnswerSubmit = () => {
    setShowResult(true);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="quiz-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="quiz-modal-content formal-font"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="quiz-modal-header">
            <h2>Test Your Knowledge</h2>
            <p>This quiz has {questions.length} questions about the selected event.</p>
          </div>
          
          <div className="quiz-modal-body">
            {!showResult ? (
              <>
                <div className="quiz-questions-container">
                  {questions.map((q, index) => (
                    <div key={index} className="quiz-question">
                      <p>{index + 1}. {q.question}</p>
                      <div className="quiz-options">
                        {q.options.map((option, i) => (
                          <motion.button
                            key={i}
                            className={`quiz-option ${selectedAnswers[index] === option ? 'selected' : ''}`}
                            onClick={() => handleAnswerSelect(index, option)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                className="quiz-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3>Your Score: {calculateScore()} / {questions.length}</h3>
                <ul>
                  {questions.map((q, index) => (
                    <li key={index} className={selectedAnswers[index] === q.correctAnswer ? 'correct' : 'incorrect'}>
                      <strong>Question {index + 1}:</strong> {q.question}
                      <br />
                      <strong>Your answer:</strong> {selectedAnswers[index] || "Not answered"}
                      <br />
                      <strong>Correct answer:</strong> {q.correctAnswer}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
          
          <div className="quiz-modal-footer">
            {!showResult && (
              <motion.button
                className="submit-btn"
                onClick={handleAnswerSubmit}
                disabled={Object.keys(selectedAnswers).length !== questions.length}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit
              </motion.button>
            )}
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};