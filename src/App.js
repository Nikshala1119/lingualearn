import React, { useState } from 'react';
import './App.css';
import { ProgressProvider } from './ProgressContext';
import HomeScreen from './HomeScreen';
import QuizCard from './QuizCard';
import InstallPWA from './InstallPWA';
import OfflineIndicator from './OfflineIndicator';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'quiz'
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleStartLesson = (lesson) => {
    setSelectedLesson(lesson);
    setCurrentView('quiz');
  };

  const handleCompleteLesson = (score, total, xp) => {
    setCurrentView('home');
    setSelectedLesson(null);
  };

  return (
    <ProgressProvider>
      <div className="App">
        <header className="app-header">
          <h1>🌍 LinguaLearn</h1>
          <p>Master languages one lesson at a time</p>
        </header>
        
        <main className="app-main">
          {currentView === 'home' ? (
            <HomeScreen onStartLesson={handleStartLesson} />
          ) : (
            <QuizCard 
              lesson={selectedLesson} 
              onComplete={handleCompleteLesson}
            />
          )}
        </main>
        
        {/* PWA Install Banner */}
        <InstallPWA />
      </div>
    </ProgressProvider>
  );
}

export default App;