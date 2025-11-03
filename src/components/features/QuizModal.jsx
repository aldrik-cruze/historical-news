import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './QuizModal.css';

const generateQuestions = (event) => {
  const questions = [];

  // Question 1: Exact Year
  questions.push({
    question: `In which year did the event "${event.text}" occur?`,
    correctAnswer: event.year.toString(),
    options: [
      event.year,
      event.year - Math.floor(Math.random() * 10 + 1),
      event.year + Math.floor(Math.random() * 10 + 1),
      event.year - Math.floor(Math.random() * 20 + 11)
    ].map(y => y.toString()).sort(() => Math.random() - 0.5),
    difficulty: 'medium'
  });

  // Question 2: Type Classification
  if (event.type) {
    questions.push({
      question: `What category does "${event.text}" belong to?`,
      correctAnswer: event.type.charAt(0).toUpperCase() + event.type.slice(1),
      options: ['Event', 'Birth', 'Death'].sort(() => Math.random() - 0.5),
      difficulty: 'easy'
    });
  }

  // Question 3: Century
  const century = Math.floor(event.year / 100) + 1;
  const centurySuffix = (num) => {
    if (num === 1) return '1st';
    if (num === 2) return '2nd';
    if (num === 3) return '3rd';
    return `${num}th`;
  };
  questions.push({
    question: `In which century did "${event.text}" take place?`,
    correctAnswer: `${centurySuffix(century)} century`,
    options: [
      `${centurySuffix(century)} century`,
      `${centurySuffix(century - 1)} century`,
      `${centurySuffix(century + 1)} century`,
      `${centurySuffix(century - 2)} century`,
    ].sort(() => Math.random() - 0.5),
    difficulty: 'medium'
  });

  // Question 4: Decade
  const decade = Math.floor(event.year / 10) * 10;
  questions.push({
    question: `The event "${event.text}" happened in which decade?`,
    correctAnswer: `${decade}s`,
    options: [
      `${decade}s`,
      `${decade - 10}s`,
      `${decade + 10}s`,
      `${decade + 20}s`,
    ].sort(() => Math.random() - 0.5),
    difficulty: 'easy'
  });

  // Question 5: Half of century (more complex)
  const half = (event.year % 100) < 50 ? "First half" : "Second half";
  const quarterCentury = Math.floor((event.year % 100) / 25);
  const quarterNames = ["First quarter", "Second quarter", "Third quarter", "Fourth quarter"];
  questions.push({
    question: `More precisely, "${event.text}" occurred in which quarter of its century?`,
    correctAnswer: quarterNames[quarterCentury],
    options: quarterNames,
    difficulty: 'hard'
  });

  // Question 6: Time period before/after
  const currentYear = new Date().getFullYear();
  const yearsAgo = currentYear - event.year;
  let timeAnswer;
  if (yearsAgo < 100) timeAnswer = "Less than 100 years ago";
  else if (yearsAgo < 500) timeAnswer = "100-500 years ago";
  else if (yearsAgo < 1000) timeAnswer = "500-1000 years ago";
  else timeAnswer = "More than 1000 years ago";
  
  questions.push({
    question: `How long ago from today did "${event.text}" occur?`,
    correctAnswer: timeAnswer,
    options: ["Less than 100 years ago", "100-500 years ago", "500-1000 years ago", "More than 1000 years ago"],
    difficulty: 'hard'
  });

  // Question 7: Historical era/period
  let era;
  if (event.year < 500) era = "Ancient Era";
  else if (event.year < 1500) era = "Medieval Period";
  else if (event.year < 1800) era = "Early Modern Period";
  else if (event.year < 1900) era = "Industrial Age";
  else if (event.year < 2000) era = "20th Century";
  else era = "21st Century";

  questions.push({
    question: `Which historical period does "${event.text}" belong to?`,
    correctAnswer: era,
    options: ["Ancient Era", "Medieval Period", "Early Modern Period", "Industrial Age", "20th Century", "21st Century"]
      .filter(e => e === era || Math.random() > 0.5)
      .slice(0, 4)
      .concat(era)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort(() => Math.random() - 0.5),
    difficulty: 'hard'
  });

  // Question 8: Year range
  const rangeStart = Math.floor(event.year / 50) * 50;
  questions.push({
    question: `"${event.text}" occurred between which years?`,
    correctAnswer: `${rangeStart}-${rangeStart + 49}`,
    options: [
      `${rangeStart}-${rangeStart + 49}`,
      `${rangeStart - 50}-${rangeStart - 1}`,
      `${rangeStart + 50}-${rangeStart + 99}`,
      `${rangeStart - 100}-${rangeStart - 51}`,
    ].sort(() => Math.random() - 0.5),
    difficulty: 'hard'
  });

  return questions;
};


export const QuizModal = ({ event, onClose }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = useMemo(() => generateQuestions(event), [event]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
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

  const getScoreMessage = () => {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect! 🎉 You're a history expert!";
    if (percentage >= 80) return "Excellent! 🌟 Great knowledge!";
    if (percentage >= 60) return "Good job! 👍 Keep learning!";
    if (percentage >= 40) return "Not bad! 📚 Room for improvement!";
    return "Keep trying! 💪 History is fascinating!";
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
          <div className="quiz-header">
            <h2>🎓 Test Your Knowledge</h2>
            <button className="close-btn-top" onClick={onClose} aria-label="Close quiz">×</button>
          </div>
          <p className="quiz-intro">Answer {questions.length} questions about this historical event</p>
          
          {!showResult ? (
            <>
              <div className="quiz-questions-container">
                {questions.map((q, index) => (
                  <motion.div 
                    key={index} 
                    className="quiz-question"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="question-header">
                      <span className="question-number">Q{index + 1}</span>
                      <span className={`difficulty-badge ${q.difficulty}`}>
                        {q.difficulty}
                      </span>
                    </div>
                    <p className="question-text">{q.question}</p>
                    <div className="quiz-options">
                      {q.options.map((option, i) => (
                        <motion.button
                          key={i}
                          className={`quiz-option ${selectedAnswers[index] === option ? 'selected' : ''}`}
                          onClick={() => handleAnswerSelect(index, option)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.button
                className="submit-btn"
                onClick={handleAnswerSubmit}
                disabled={Object.keys(selectedAnswers).length !== questions.length}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {Object.keys(selectedAnswers).length === questions.length 
                  ? '✓ Submit Answers' 
                  : `Answer ${questions.length - Object.keys(selectedAnswers).length} more question${questions.length - Object.keys(selectedAnswers).length !== 1 ? 's' : ''}`
                }
              </motion.button>
            </>
          ) : (
            <motion.div
              className="quiz-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="score-display">
                <h3>Your Score</h3>
                <div className="score-circle">
                  <span className="score-number">{calculateScore()}</span>
                  <span className="score-total">/ {questions.length}</span>
                </div>
                <p className="score-message">{getScoreMessage()}</p>
              </div>
              
              <div className="answers-review">
                <h4>Review Your Answers</h4>
                {questions.map((q, index) => {
                  const isCorrect = selectedAnswers[index] === q.correctAnswer;
                  return (
                    <motion.div 
                      key={index} 
                      className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="answer-header">
                        <span className="answer-icon">{isCorrect ? '✓' : '✗'}</span>
                        <span className="answer-label">Question {index + 1}</span>
                      </div>
                      <p className="answer-question">{q.question}</p>
                      <div className="answer-details">
                        <p><strong>Your answer:</strong> <span className={isCorrect ? 'text-correct' : 'text-incorrect'}>{selectedAnswers[index] || "Not answered"}</span></p>
                        {!isCorrect && <p><strong>Correct answer:</strong> <span className="text-correct">{q.correctAnswer}</span></p>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              <motion.button 
                className="retry-btn"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close Quiz
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
