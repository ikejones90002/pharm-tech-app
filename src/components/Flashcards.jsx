import React, { useState } from 'react';
import flashcards from './CardInfo';

function Flashcards() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const next = () => {
    setFlipped(false);
    setIndex((index + 1) % flashcards.length);
  };

  return (
    <div className="flashcard-container">
      <div className={`card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
        <div className="card-front">{flashcards[index].front}</div>
        <div className="card-back">{flashcards[index].back}</div>
      </div>
      <button onClick={next}>Next</button>
    </div>
  );
}

export default Flashcards;
