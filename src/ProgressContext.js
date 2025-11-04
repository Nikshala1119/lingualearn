import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const ProgressContext = createContext();

// Custom hook to use progress context
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

// Provider Component
export const ProgressProvider = ({ children }) => {
  // Initialize state from localStorage
  const [totalXP, setTotalXP] = useState(() => {
    const saved = localStorage.getItem('totalXP');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('streak');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [lastActiveDate, setLastActiveDate] = useState(() => {
    return localStorage.getItem('lastActiveDate') || null;
  });
  
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : [];
  });

  // Update streak based on activity
  const updateStreak = () => {
    const today = new Date().toDateString();
    
    if (lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();
      
      if (lastActiveDate === yesterdayStr) {
        // Consecutive day - increase streak
        setStreak(prev => prev + 1);
      } else if (lastActiveDate !== null) {
        // Missed a day - reset streak
        setStreak(1);
      } else {
        // First time
        setStreak(1);
      }
      
      setLastActiveDate(today);
    }
  };

  // Add XP and update streak
  const addXP = (amount) => {
    setTotalXP(prev => prev + amount);
    updateStreak();
  };

  // Mark lesson as completed
  const completeLesson = (lessonId, score, totalQuestions) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  };

  // Reset progress (for testing)
  const resetProgress = () => {
    setTotalXP(0);
    setStreak(0);
    setLastActiveDate(null);
    setCompletedLessons([]);
  };

  // Save to localStorage whenever state changes (for production)
  useEffect(() => {
    // In production, uncomment these:
    // localStorage.setItem('totalXP', totalXP);
    // localStorage.setItem('streak', streak);
    // localStorage.setItem('lastActiveDate', lastActiveDate);
    // localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  }, [totalXP, streak, lastActiveDate, completedLessons]);

  const value = {
    totalXP,
    streak,
    completedLessons,
    addXP,
    completeLesson,
    resetProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};