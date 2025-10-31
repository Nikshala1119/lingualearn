import React, { useState } from 'react';
import { useProgress } from './ProgressContext';
import './QuizCard.css';

function QuizCard({ lesson, onComplete }) {
  const { addXP, completeLesson } = useProgress();
  
  // STATE HOOKS
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const questions = lesson.questions;
  const question = questions[currentQuestion];
  
  // Handle answer selection
  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const correct = index === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };
  
  // Move to next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  };
  
  // Complete lesson
  const handleComplete = () => {
    // Calculate XP based on performance
    const percentage = (score / questions.length) * 100;
    let earnedXP = lesson.xp;
    
    if (percentage === 100) {
      earnedXP = Math.round(lesson.xp * 1.5); // 50% bonus for perfect score
    }
    
    addXP(earnedXP);
    completeLesson(lesson.id, score, questions.length);
    onComplete(score, questions.length, earnedXP);
  };
  
  const isQuizComplete = currentQuestion === questions.length - 1 && showResult;
  const percentage = Math.round((score / questions.length) * 100);
  
  return (
    <div className="quiz-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => onComplete(score, questions.length, 0)}>
        ← Back
      </button>
      
      {/* Progress Bar */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>
      
      {/* Score Display */}
      <div className="score-display">
        <span>{lesson.icon} {lesson.languageName} - {lesson.title}</span>
        <span>Question {currentQuestion + 1}/{questions.length}</span>
      </div>
      
      {/* Question Card */}
      <div className="question-card">
        <h2 className="question-text">{question.question}</h2>
        
        {/* Options */}
        <div className="options-container">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${
                selectedAnswer === index 
                  ? isCorrect 
                    ? 'correct' 
                    : 'incorrect'
                  : ''
              } ${
                showResult && index === question.correctAnswer 
                  ? 'correct' 
                  : ''
              }`}
              onClick={() => handleAnswerClick(index)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
        
        {/* Result Feedback */}
        {showResult && (
          <div className={`result-feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
            {isCorrect ? '🎉 Correct! Great job!' : '❌ Not quite! Keep learning!'}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="action-buttons">
          {showResult && !isQuizComplete && (
            <button className="next-btn" onClick={handleNext}>
              Next Question →
            </button>
          )}
          
          {isQuizComplete && (
            <div className="completion-message">
              <div className="completion-icon">
                {percentage === 100 ? '🏆' : percentage >= 70 ? '🌟' : '💪'}
              </div>
              <h3>Lesson Complete!</h3>
              <div className="score-summary">
                <div className="score-circle">
                  <div className="score-percentage">{percentage}%</div>
                  <div className="score-fraction">{score}/{questions.length}</div>
                </div>
              </div>
              <p className="completion-message-text">
                {percentage === 100 
                  ? "Perfect! You're a star! 🌟" 
                  : percentage >= 70 
                  ? "Great work! Keep it up! 💪"
                  : "Good effort! Practice makes perfect! 📚"}
              </p>
              <div className="xp-earned">
                +{percentage === 100 ? Math.round(lesson.xp * 1.5) : lesson.xp} XP
              </div>
              <button className="continue-btn" onClick={handleComplete}>
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizCard;