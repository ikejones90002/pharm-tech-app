import React from 'react';
import './styles/index.css';
import Navbar from './components/Navbar';
import FlashcardSection from './components/FlashcardSection';
import StudyNotesSection from './components/StudyNotesSection';
import QuizSection from './components/QuizSection';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <FlashcardSection />
      <StudyNotesSection />
      <QuizSection />
    </div>
  );
};

export default App;
