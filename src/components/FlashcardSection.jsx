import { useState, useEffect } from "react";
import "../styles/index.css";

const flashcards = [
  {
    front: "What is the generic name, class, and use of Zestril or Prinivil?",
    back: "Generic: lisinopril\nClass: ACE inhibitor\nUse: HTN, CHF, MI",
  },
  {
    front: "What is the generic name, class, and use of Synthroid?",
    back: "Generic: levothyroxine\nClass: Thyroid\nUse: Hypothyroidism",
  },
  {
    front: "What is the generic name, class, and use of Glucophage?",
    back: "Generic: metformin\nClass: Biguanide\nUse: Type 2 diabetes",
  },
  {
    front: "What is the generic name, class, and use of Lipitor?",
    back: "Generic: atorvastatin\nClass: Statin\nUse: Hypercholesterolemia",
  },
];

export default function FlashcardSection() {
  const [currentFlash, setCurrentFlash] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (soundEnabled) {
      const audio = new Audio(
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      );
      audio.play();
    }
  }, [currentFlash, soundEnabled]);

  const handleNext = () => {
    setFlipped(false);
    setCurrentFlash((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <div className="section">
      <div
        className={`flashcard card ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="card-inner">
          <div className="card-front">
            {flashcards[currentFlash].front}
          </div>
          <div className="card-back">
            {flashcards[currentFlash].back}
          </div>
        </div>
      </div>
      <button onClick={handleNext}>Next Flashcard</button>
      <label style={{ display: "block", textAlign: "center" }}>
        🔊 Sound:
        <input
          type="checkbox"
          checked={soundEnabled}
          onChange={(e) => setSoundEnabled(e.target.checked)}
        />
      </label>
    </div>
  );
}
