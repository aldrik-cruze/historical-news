import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './QuizModal.css';

const generateQuestions = (event) => {
  const questions = [];

  // Question 1: Year identification
  questions.push({
    question: `In which year did this event occur?`,
    correctAnswer: event.year.toString(),
    options: [
      event.year,
      event.year - Math.floor(Math.random() * 30 + 10),
      event.year + Math.floor(Math.random() * 30 + 10),
      event.year - Math.floor(Math.random() * 50 + 30)
    ].sort(() => Math.random() - 0.5).map(y => y.toString())
  });

  // Question 2: Century determination
  const century = Math.floor((event.year - 1) / 100) + 1;
  const centuryName = century + (century === 1 ? 'st' : century === 2 ? 'nd' : century === 3 ? 'rd' : 'th');
  questions.push({
    question: `Which century did this event take place in?`,
    correctAnswer: `${centuryName} century`,
    options: [
      `${centuryName} century`,
      `${century - 1}${century - 1 === 1 ? 'st' : century - 1 === 2 ? 'nd' : century - 1 === 3 ? 'rd' : 'th'} century`,
      `${century + 1}${century + 1 === 1 ? 'st' : century + 1 === 2 ? 'nd' : century + 1 === 3 ? 'rd' : 'th'} century`,
      `${century - 2}${century - 2 === 1 ? 'st' : century - 2 === 2 ? 'nd' : century - 2 === 3 ? 'rd' : 'th'} century`,
    ].sort(() => Math.random() - 0.5)
  });

  // Question 3: Decade identification
  const decade = Math.floor(event.year / 10) * 10;
  questions.push({
    question: `In which decade did this event occur?`,
    correctAnswer: `${decade}s`,
    options: [
      `${decade}s`,
      `${decade - 10}s`,
      `${decade + 10}s`,
      `${decade - 20}s`,
    ].sort(() => Math.random() - 0.5)
  });

  // Question 4: Era classification
  let era, eraOptions;
  if (event.year < 476) {
    era = "Ancient History";
    eraOptions = ["Ancient History", "Medieval Period", "Early Modern Period", "Contemporary Era"];
  } else if (event.year < 1500) {
    era = "Medieval Period";
    eraOptions = ["Medieval Period", "Ancient History", "Early Modern Period", "Modern Era"];
  } else if (event.year < 1800) {
    era = "Early Modern Period";
    eraOptions = ["Early Modern Period", "Medieval Period", "Modern Era", "Contemporary Era"];
  } else if (event.year < 1945) {
    era = "Modern Era";
    eraOptions = ["Modern Era", "Early Modern Period", "Contemporary Era", "Medieval Period"];
  } else {
    era = "Contemporary Era";
    eraOptions = ["Contemporary Era", "Modern Era", "Early Modern Period", "Medieval Period"];
  }
  
  questions.push({
    question: `Which historical era does this event belong to?`,
    correctAnswer: era,
    options: eraOptions.sort(() => Math.random() - 0.5)
  });

  // Question 5: Historical period context
  const halfCentury = (event.year % 100) < 50;
  const centuryHalf = halfCentury ? "first half" : "second half";
  questions.push({
    question: `In which part of the ${centuryName} century did this event occur?`,
    correctAnswer: `The ${centuryHalf}`,
    options: ["The first half", "The second half"].sort(() => Math.random() - 0.5)
  });

  return questions;
};

export const QuizModal = ({ event, onClose }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = useMemo(() => generateQuestions(event), [event]);

  // Lock body scroll when modal opens
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleAnswerSelect = (questionIndex, answer) => {
    if (!showResult) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionIndex]: answer
      }));
    }
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="quiz-modal-header">
            <h2>Test Your Knowledge</h2>
            <p>Answer {questions.length} questions about this historical event.</p>
          </div>
          
          <div className="quiz-modal-body">
            {!showResult ? (
              <div className="quiz-questions-container">
                {questions.map((q, index) => (
                  <div key={index} className="quiz-question">
                    <p><strong>Question {index + 1}:</strong> {q.question}</p>
                    <div className="quiz-options">
                      {q.options.map((option, i) => (
                        <button
                          key={i}
                          className={`quiz-option ${selectedAnswers[index] === option ? 'selected' : ''}`}
                          onClick={() => handleAnswerSelect(index, option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
              <button
                className="submit-btn"
                onClick={handleAnswerSubmit}
                disabled={Object.keys(selectedAnswers).length !== questions.length}
              >
                Submit Answers
              </button>
            )}
            <button className="close-btn" onClick={onClose}>
              {showResult ? 'Close' : 'Cancel'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
