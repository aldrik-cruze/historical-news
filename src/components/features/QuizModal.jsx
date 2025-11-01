import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './QuizModal.css';

const generateQuestions = (event) => {
  const questions = [];

  // Question 1: Year
  questions.push({
    question: `In which year did the event "${event.text}" occur?`,
    correctAnswer: event.year,
    options: [
      event.year,
      event.year - Math.floor(Math.random() * 10 + 1),
      event.year + Math.floor(Math.random() * 10 + 1),
      event.year - Math.floor(Math.random() * 20 + 11)
    ].sort(() => Math.random() - 0.5)
  });

  // Question 2: Type
  if (event.type) {
    questions.push({
      question: `What is the type of the event: "${event.text}"?`,
      correctAnswer: event.type,
      options: ['event', 'birth', 'death'].sort(() => Math.random() - 0.5)
    });
  }

  // Question 3: Century
  const century = Math.floor(event.year / 100) + 1;
  questions.push({
    question: `In which century did "${event.text}" take place?`,
    correctAnswer: `${century}th century`,
    options: [
      `${century}th century`,
      `${century - 1}th century`,
      `${century + 1}th century`,
      `${century - 2}th century`,
    ].sort(() => Math.random() - 0.5)
  });

  // Question 4: Decade
  const decade = Math.floor(event.year / 10) * 10;
  questions.push({
    question: `The event "${event.text}" happened in which decade?`,
    correctAnswer: `The ${decade}s`,
    options: [
      `The ${decade}s`,
      `The ${decade - 10}s`,
      `The ${decade + 10}s`,
      `The ${decade + 20}s`,
    ].sort(() => Math.random() - 0.5)
  });

  // Question 5: Half of century
  const half = (event.year % 100) < 50 ? "First half" : "Second half";
  questions.push({
    question: `Did "${event.text}" happen in the first or second half of its century?`,
    correctAnswer: half,
    options: ["First half", "Second half"]
  });

  return questions;
};


export const QuizModal = ({ event, onClose }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = useMemo(() => generateQuestions(event), [event]);

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
      >
        <motion.div
          className="quiz-modal-content formal-font"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h2>Test Your Knowledge</h2>
          <p>This quiz has {questions.length} questions about the selected event.</p>
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
              <motion.button
                className="submit-btn"
                onClick={handleAnswerSubmit}
                disabled={Object.keys(selectedAnswers).length !== questions.length}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit
              </motion.button>
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
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};