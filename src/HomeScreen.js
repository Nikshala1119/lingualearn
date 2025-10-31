import React from 'react';
import { useProgress } from './ProgressContext';
import { getAllLessons } from './lessonData';
import './HomeScreen.css';

function HomeScreen({ onStartLesson }) {
  const { totalXP, streak, completedLessons } = useProgress();
  const allLessons = getAllLessons();

  return (
    <div className="home-screen">
      {/* Stats Header */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-value">{streak}</div>
            <div className="stat-label">Day Streak</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">{totalXP}</div>
            <div className="stat-label">Total XP</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{completedLessons.length}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="lessons-section">
        <h2 className="section-title">Choose Your Lesson</h2>
        
        <div className="lessons-grid">
          {allLessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            
            return (
              <div 
                key={lesson.id} 
                className={`lesson-card ${isCompleted ? 'completed' : ''}`}
                onClick={() => onStartLesson(lesson)}
              >
                <div className="lesson-icon">{lesson.icon}</div>
                
                <div className="lesson-info">
                  <h3 className="lesson-language">{lesson.languageName}</h3>
                  <p className="lesson-title">{lesson.title}</p>
                  
                  <div className="lesson-meta">
                    <span className="lesson-xp">+{lesson.xp} XP</span>
                    <span className="lesson-questions">
                      {lesson.questions.length} questions
                    </span>
                  </div>
                </div>
                
                {isCompleted && (
                  <div className="completed-badge">
                    <span>✓</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;